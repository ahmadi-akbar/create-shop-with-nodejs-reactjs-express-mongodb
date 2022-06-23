import mongoose from "mongoose";
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
