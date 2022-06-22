import cookieParser from "cookie-parser";
import logger from "morgan";
import busboy from "connect-busboy";
import path from "path";

const __dirname = path.resolve();
// const viewsFolder = path.join(__dirname, "./src/views");
// const publicFolder = path.join(__dirname, "./public");
const buildFolder = path.join(__dirname, "./build");
const assetsFolder = path.join(__dirname, "./src/client/assets/img");
const public_mediaFolder = path.join(__dirname, "./public_media");

let configHandle = (express, app) => {
  app.disable("x-powered-by");
  app.use(logger("dev"));

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(busboy());
  app.use(express.static(public_mediaFolder, { maxage: "1y" }));
<<<<<<< HEAD
  app.use(express.static(buildFolder));
  // app.use(express.static(publicFolder, { maxage: "1y" }));
  app.set("view engine", "pug");

  // app.use(express.static("img"));
  app.use(express.static(assetsFolder));
  // app.use(function (req,res,next) {
  //     let ua = req.get('user-agent')
  // if (isbot(ua)) {
    //         console.log('BOT => ', ua);
    //         app.set("views", viewsFolder+'/bot');
  // } else {
    //         app.set("views", viewsFolder);
    //
  // }
  //     next();
  // })
=======
  app.use(express.static(buildFolder,{  index: false}));
  app.set("view engine", "pug");
  // app.use(express.static(assetsFolder));
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
  console.log("==> configHandle");
};
export default configHandle;