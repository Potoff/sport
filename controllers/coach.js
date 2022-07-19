const { models } = require("mongoose");
const encryptPassword = require("../utils/encryptPassword");

async function coachs(req, res){
    const Coach = req.app.get("models").Coach;
    const CoachsList = await Coach.find().populate("user");
    res.json(CoachsList);
};

async function coachCreate (req, res) {
    try {
        if (!req.body.password) {
            return res.json("No Password");
        }
        if (req.role !== "manager") {
            return res.json("Unauthorized");
        }
        const models = req.app.get("models");
        const { token, salt, hash } = encryptPassword(req.body.password);

        const User = req.app.get("models").User;

        const NewUser = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            token,
            salt,
            hash,
        }).save();
        const newCoach = await new models.Coach({user: NewUser._id}).save();
        return res.json(newCoach);
    } catch (error) {
        res.json(error.message);
    }
};

async function coachUpdate(req, res) {
    if (req.role !== "manager"){
        return res.json("Unauthorized");
    }

    try {
        if (!req.body._id) {
            return res.json("No _id provided");
        }
        const Coach = req.app.get("models").Coach;
        let toModifyCoach = await Coach.findById(req.body._id);
        if (!toModifyCoach){
            return res.json("Coach not found");
        }
        const toModifyKeys = Object.keys(req.body.toModify);
        for (const key of toModifyKeys) {
            toModifyCoach[key] = req.body.toModify[key];
        }
        await toModifyCoach.save();
        res.json(toModifyCoach);
    } catch(error) {
        return res.json(error.message);
    }
};

async function coachDelete(req, res) {
    if (req.role !== "manager"){
        return res.json("Unauthorized");
    }
    if (!req.body._id) {
        return res.json("No _id provided");
    }
    const Coach = req.app.get("models").Coach;

    let toDeleteCoach = await Coach.findById(req.body._id);

    if(!toDeleteCoach) {
        return res.json("Coach not found");
    }
    let toDeleteUser = await models.User.findById(toDeleteCoach.user);

    await toDeleteUser.remove();
    await toDeleteCoach.remove();
    res.json("Successfully deleted");

};

module.exports = {
    coachCreate,
    coachUpdate,
    coachDelete,
    coachs
};