const db = require("../models");

// finds the data on all the previously created workouts and displays the information for the latest one on the homepage
module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(response => {
                res.json(response)
            })
    });

    // creates a new workout using the user data provided from the request body
    app.post("/api/workouts", ({ body }, res) => {
        const workout = new db.Workout(body);
        db.Workout.create(workout)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    })

    // Updates the most recent workout with a new exercise when the user continues a workout
    app.put("/api/workouts/:id", async (req, res) => {

        db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
            .then(dbWorkout => {
                console.log(dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    // gets the total duration of all the exercises in a workout and adds it as a field, then sends back a json response of the last 7 workouts for the stats page
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate(
            [
                {
                    $addFields: {
                        totalDuration: { $sum: "$exercises.duration" }
                    }
                }
            ]
        )
            .then((response) => {
                const finalResult = []
                response.reverse()
                for(let i = 0; i < 7; i++) {
                    if (response[i] == undefined) {
                        continue
                    }
                    else {finalResult.push(response[i])}
                }
                finalResult.reverse()
                console.log(finalResult);
                res.json(finalResult);
            });
    })
}