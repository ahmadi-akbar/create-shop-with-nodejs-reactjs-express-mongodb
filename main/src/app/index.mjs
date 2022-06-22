import express from "express";
import db from "#root/app/db";
import path from "path";
<<<<<<< HEAD
import ssrHandle from "#root/app/ssrHandle";
import configHandle from "#root/app/configHandle";
import routeHandle from "#root/app/routeHandle";
import headerHandle from "#root/app/headerHandle";
=======
// import ssrHandle from "#root/app/ssrHandle";
import configHandle from "#root/app/configHandle";
import routeHandle from "#root/app/routeHandle";
import headerHandle from "#root/app/headerHandle";
import { the_public_route } from "../routes/public/p";
import router from "../routes/public/p";
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
// import uploadHandle from "#root/app/uploadHandle";

console.log("new date", new Date());

let app = express();

db();
<<<<<<< HEAD
headerHandle(app);

ssrHandle(app);


app.use(function(err, req, res, next) {
  //console.log('here....');
=======
app.get("/", (req, res, next) => {
  console.log('#r home /')
  next();
});
headerHandle(app);
configHandle(express, app);



app.use(function(err, req, res, next) {
  console.log('here....');
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
  if (req.busboy) {
    req.pipe(req.busboy);

    req.busboy.on("file", function (
      fieldname,
      file,
      filename,
      encoding,
      mimetype
    ) {
      // ...
      // console.log('on file app', mimetype,filename);

      let fstream;
      let name = (global.getFormattedTime() + filename).replace(/\s/g, '');

      if (mimetype.includes('image')) {
        // name+=".jpg"
      }
      if (mimetype.includes('video')) {
        // name+="mp4";
      }
      let filePath = path.join(__dirname, "/public_media/customer/", name);
      fstream = fs.createWriteStream(filePath);
      file.pipe(fstream);
      fstream.on("close", function () {
        // console.log('Files saved');
        let url = "customer/" + name;
        let obj = [{name: name, url: url, type: mimetype}];
        req.photo_all = obj;
        next();
      });
    });
  } else {
    next();
  }
});
<<<<<<< HEAD
configHandle(express, app);
routeHandle(app);
=======
// ssrHandle(app);

routeHandle(app);
// app.set("view engine", "pug");
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

export default app;
