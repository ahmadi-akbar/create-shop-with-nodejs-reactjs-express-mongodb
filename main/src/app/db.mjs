import mongoose from "mongoose";
import VARIABLE from '#v/variables';
mongoose.Promise = global.Promise;
let connection = VARIABLE.mongodbConnectionUrl;
let options = {
    useNewUrlParser: true,
    dbName: VARIABLE.dbName
};
export default async () => await mongoose
    .connect(connection, options)
    .then(async () => await console.log("==> db connection successful to",VARIABLE.dbName))
    .catch(err => console.error(err,"db name:",VARIABLE.dbName));
