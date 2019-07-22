const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if ('auth' in req.headers && req.headers.auth){
        jwt.verify(req.headers.auth, req.app.get('secretKey'), function(err, user){
            if(err) return next(err);
            req.session = user;
            next();
        });
    } else {
        res.status(401).send({
            status: false,
            msg: 'Authentication failed!!!' 
        });
    }
}