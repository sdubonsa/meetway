const Event = require('../models/event');
const RSVP = require('../models/rsvp');

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are already logged in!');
        return res.redirect('/users/profile')
    }
}

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'You must be logged in to access this page.');
        return res.redirect('/users/login');
    }
}

exports.isAuthor = (req, res, next) => {
    Event.findById(req.params.id)
    .then(event=>{
        if (event) {
            if(event.host == req.session.user) {
                return next();
            } else {
                let err = new Error('You are not authorized to edit this event.');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
}

exports.isNotAuthor = (req, res, next) => {
    Event.findById(req.params.id)
    .then(event=>{
        if (event) {
            if(event.host != req.session.user) {
                return next();
            } else {
                let err = new Error('This is your event. You cannot RSVP to your own event.');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
}

exports.rsvp = (req, res, next) => {
    RSVP.findOne({event: req.params.id, user: req.session.user})
    .then(rsvp=>{
        if (rsvp) {
            // update rsvp
            rsvp.status = req.body.status;
            rsvp.save()
            .then(rsvp=>{
                req.flash('success', 'Your RSVP has been updated.');
                return res.redirect('/events/' + req.params.id);
            })
            .catch(err=>next(err));
        } else {
            return next();
        }
    })
    .catch(err=>next(err));
};