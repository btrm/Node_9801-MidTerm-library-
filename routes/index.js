module.exports = (app) => {

    app.use('/', require('./home.route'));

    app.use('/api/v1', require('./api'));

}