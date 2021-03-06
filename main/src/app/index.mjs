import express from "express";
import db from "#root/app/db";
import path from "path";
import ssrHandle from "#root/app/ssrHandle";
import configHandle from "#root/app/configHandle";
import routeHandle from "#root/app/routeHandle";
import headerHandle from "#root/app/headerHandle";
// import uploadHandle from "#root/app/uploadHandle";

console.log("new date", new Date());

let app = express();

db();
headerHandle(app);

ssrHandle(app);


app.use(function(err, req, res, next) {
  //console.log('here....');
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
configHandle(express, app);
routeHandle(app);

export default app;
