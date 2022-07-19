const { customerCreate, customerUpdate, customerDelete, customers } = require("../controllers/customer");


function customerRoute(app) {
    // Create
    app.post("/customerCreate",customerCreate );

    app.get("/customers", customers);

    // Update
    app.post("/customerUpdate", customerUpdate);

    // Delete
    app.post("/customerDelete", customerDelete);
};

module.exports = customerRoute;