const db = require("../models");


module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).populate("exercises")
            .then(response => {
                res.json(response)
            })
    });


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
                    finalResult.push(response[i])
                }
                console.log(finalResult);
                finalResult.reverse()
                res.json(finalResult);
            });
    })

}