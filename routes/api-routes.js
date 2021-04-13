const db = require("../models");


module.exports = function (app) {

    app.get("/all", (req, res) => {
        db.Workout.find({}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
    });

};