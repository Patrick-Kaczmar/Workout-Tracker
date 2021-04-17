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

        try {
            let dbExercise = await db.Exercise.create({
                type: req.body.type, name: req.body.name,
                weight: req.body.weight, sets: req.body.sets,
                reps: req.body.reps, duration: req.body.duration, distance: req.body.distance,
            });

            await db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: dbExercise["_id"] } }, { new: true })
            res.json(dbExercise)
        } catch (err) {
            console.log(err);
        }
    });

    app.get("/api/workouts/range", (req, res) => {

        db.Workout.find({}).populate("exercises").then(results => {
            let lastSevenWorkouts = []
            results.reverse()
            for (let i = 0; i < 7; i++) {
                lastSevenWorkouts.push(results[i])
            }
            res.json(lastSevenWorkouts)
            console.log(lastSevenWorkouts)
        })

    //     db.Workout.aggregate([
    //         {
    //             $lookup: {
    //                 from: db.Exercise,
    //                 localField: "exercises",
    //                 foreignField: "_id",
    //                 as: "totalTime"
    //             }
    //         }
    //     ]).then(results => {
    //         console.log(results)
    //         res.json(results)
    //         console.log(results)
    //         console.log(results.totalTime)
    //     }).catch(err => {
    //         res.json(err)
    //     })
    })

}