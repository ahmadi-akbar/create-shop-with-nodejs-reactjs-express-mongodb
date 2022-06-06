import mongoose from "mongoose";

mongoose.Promise = global.Promise;
let connection = "mongodb://127.0.0.1:27017";
let options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // dbName: "gameboss"
    dbName: "arvandshop"
};
export default async () => await mongoose
    .connect(connection, options)
    .then(async () => await console.log("==> db connection succesful"))
    .catch(err => console.error(err));
