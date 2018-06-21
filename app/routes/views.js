const Clients = require('../models/clients');

module.exports = function (app, db) {

    app.get('/', function (req, res) {
        if (req.user) {
            res.redirect('/home');
        }
        else {
            res.render('index.ejs');
        };
    });

    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // app.get('/home', isLoggedIn, function (req, res) {
    //     Clients.find({}, function (err, clients) {
    //         res.render('home.ejs', {
    //             message: req.flash('signupMessage'),
    //             user: req.user,
    //             clients: clients
    //         });
    //     });

    // });

    app.get('/home', isLoggedIn, function (req, res) {
        Clients.find({}, function (err, data) {
            if (err) {
                console.log(err);
            };
            if (data) {
                res.render('home.ejs', {
                    data: JSON.stringify(data),
                    message: req.flash('signupMessage'),
                    user: req.user
                })
            }
        })
    });

    app.post("/new-client", isLoggedIn, (req, res) => {
        // var newClient = new Clients(req.body);
        // newClient.save({},function(err, newClient){
        //     if(err){
        //         console.log(err)
        //     };
        //     if(newClient){
        //         res.send("New Client Added")
        //     };
        // }); 
        console.log('here',req.body);
        res.send("Created New Client")
    });

   

    app.get('/logout', isLoggedIn, function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/password-recovery', function (req, res) {
        res.render('password-recovery.ejs', { message: req.flash('passwordRecoveryMessage') });
    });

    app.get('/password-reset', function (req, res) {
        res.render('password-reset.ejs', { message: req.flash('passwordResetMessage') });
    });

    app.get('/update-profile', isLoggedIn, function (req, res) {
        res.render('update-profile.ejs', {
            user: req.user,
            message: req.flash('updateProfileMessage')
        });
    });

    app.get('*', function (req, res) {
        res.render('404.ejs');
    });

};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    } else {
        // if they aren't redirect them to the home page
        res.redirect('/');
    };
};
