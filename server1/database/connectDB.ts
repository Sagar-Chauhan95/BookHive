import mongoose from "mongoose";

function connect_DB() {

    // if (process.env.COMPASS_URL) {

    mongoose.connect("mongodb://localhost:27017/demo")
        .then(_ => console.log("Successfull connection to database"))
        .catch(error => console.log("Unsuccessfull connection to DB", error));
    // } else {
    //     console.log("Absence of MONGO_URL");
    // }
}

export default connect_DB;