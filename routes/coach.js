const { coachCreate, coachUpdate, coachDelete, coachs} = require("../controllers/coach");


function coachRoute(app) {
    //Read
    app.get("/coachs", coachs)

    // Create
    app.post("/coachCreate",coachCreate );

    // Update
    app.post("/coachUpdate", coachUpdate);

    // Delete
    app.post("/coachDelete", coachDelete);
};

module.exports = coachRoute;