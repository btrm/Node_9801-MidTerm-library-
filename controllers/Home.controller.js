module.exports = {
    index: function (req, res) {
        res.json({
            status: true,
            data: {},
            msg: "Welcome, Home!"
        });
    }
};
