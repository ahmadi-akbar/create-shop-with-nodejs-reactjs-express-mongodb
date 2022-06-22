import mongoose from "mongoose";
<<<<<<< HEAD
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
=======
import dotenv from "dotenv";
import path from 'path';
dotenv.config({ silent: process.env.NODE_ENV === 'production' ,
  path: path.join(__dirname, '../../', `.env`),
});
// console.log(process.env.NODE_ENV)
mongoose.Promise = global.Promise;
// console.log('process.env',process.env.mongodbConnectionUrl);
// console.log('process.env.BASE_URL',process.env.BASE_URL);
let connection = process.env.mongodbConnectionUrl;
let options = {
    useNewUrlParser: true,
    dbName: 'arvandshop'
};
export default async () => await mongoose
    .connect(connection, options)
    .then(async () => await console.log("==> db connection successful to",process.env.dbName))
    .catch(err => console.error(err,"db name:",process.env.dbName));
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
