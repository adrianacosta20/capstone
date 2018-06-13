module.exports = function (app, passport, db) {

    // INITIALIZE MY AUTHENTICATION ROUTES
    require('./authentication')(app, passport);

    // INITIALIZE MY VIEWS ROUTES
    require('./views')(app, db);

    // INITIALIZE MYSQL
    // require('./mysql')(app, mysqldb);
};