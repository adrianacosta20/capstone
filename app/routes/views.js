const Clients = require('../models/clients');
const Jobs = require('../models/jobs');

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

    app.get('/home', isLoggedIn, function (req, res) {
        
            res.render('home.ejs', {
                message: req.flash('signupMessage'),
                user: req.user,
            });
    });

    app.get('/get-clients', isLoggedIn, function (req, res) {
        Clients.find({}, function (err, clients) {
            if (err) {
                console.log(err);
            };

            res.send(clients)
        });
    });

    app.get('/get-jobs', isLoggedIn, function (req, res) {
        Jobs.find({}, function (err, jobs) {
            if (err) {
                console.log(err);
            };

            res.send(jobs)
        });
    });

    app.post('/show-job', isLoggedIn, function(req , res){
        console.log('>>>>', req.body);
        Jobs.find({ _id: req.body.id }, function(err, job){
            if(err) return console.log(err);
            res.send(job);
        });
    });

    app.post("/update-client", isLoggedIn, (req, res)=>{
        console.log('>>>>>>>>', req.body);
        Clients.updateOne({ _id: req.body.id }, { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phone: req.body.phone }, { new: true }, function(err, client) {
            if(err){
                return  console.log(err);
            };
            res.send({
                success: true
            });
          });
    });

    app.post("/new-client", isLoggedIn, (req, res) => {
        console.log('>>>>>>>>> ', req.body); 
        var newClient = new Clients(req.body);
        newClient.save({},function(err, newClient){
            if(err){
                console.log(err)
            };
            if(newClient){
                res.send(newClient);
            };
        }); 
    });

    app.post("/new-job", isLoggedIn, (req, res) => {
        console.log('>>>>>>>>> ', req.body); 
        var newJob = new Jobs(req.body);
        newJob.save({},function(err, newJob){
            if(err){
                console.log(err)
            };
            if(newJob){
                res.send(newJob);
            };
        }); 
    });

    app.post("/remove-client", isLoggedIn, (req,res) => {
        console.log('>>>>>>>>>', req.body.id);
        Clients.remove({_id: req.body.id}, function(err){
            if(err){
                console.log(err);
                return res.send({
                    success: false
                });
            };
            res.send({
                success: true
            });
        });

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
