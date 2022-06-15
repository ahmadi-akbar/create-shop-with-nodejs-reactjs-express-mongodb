const logger = require( "morgan");
// const busboy = require( "connect-busboy");
// const cookieParser = require( "cookie-parser");

console.log("#f main/src/bin/installer.js");
const path = require("path");
const fs = require("fs");
const http = require("http");
const config = require("./src/variables/config.json");
let Wizard = {

  filePath: path.join(__dirname, "/../../public_media/site_setting/", "config.js"),
  getter: async function(name = Wizard.filePath) {
    console.log("#() upsertFile");
    try {
      // try to read file
      console.log("try to read file==>");
      return await fs.promises.readFile(name);
    } catch (error) {
      // create empty file, because it wasn't found
      const writedata = config;

      console.log("create empty file, because it wasn't found==>");
      await fs.promises.writeFile(name, "export default ()=> (" + JSON.stringify(writedata, null, 4) + ")", "utf8");
      // return
    }
  }

};

const express = require("express");
let app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
let port = normalizePort(3000);
app.set("port", port);
let server = http.createServer(app);
// const router = express.Router();
const viewsFolder = path.join(__dirname, "views");
// console.log("__dirname", __dirname, viewsFolder);
app.disable("x-powered-by");
app.use(logger("dev"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(busboy());
app.set("view engine", "pug");

app.set("views", viewsFolder);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// const global =  require("../global.mjs");
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  console.log("Listening on " + bind);
  // setter();
}

app.get("/", (req, res, next) => {
  console.log("*** GET");
  getter();
  res.render("wizard");
});
app.post("/", (req, res, next) => {
  console.log("*** POST");
  setter(req.body,res);
});

function setter(obj,res=false) {
  if(!obj)
    obj={};
  console.log("==>() create config.js ",obj);

  // if(req && req.body){
  //   obj=req.body;
  // }
  let private_obj=obj;
  let variables_path = path.join(__dirname, "./", "variables.js");
  try {
    fs.promises.writeFile(variables_path, "export default " + JSON.stringify(private_obj, null, 4) , "utf8");
    console.log("variables.js created...");
    // if(res)
    //   return res.render("wizard", {
    //     success: true
    //   });

  }
  catch (err) {
    console.log("variables.js IS NOT created...", err);
    // if(res)
    //   return res.render("wizard", {
    //     success: false,
    //     err: err
    //   });
  }
  if (obj.ADMIN_URL)
    delete obj.ADMIN_URL;
  if (obj.mongodbConnectionUrl)
    delete obj.mongodbConnectionUrl;
  if (obj.dbName)
    delete obj.dbName;
  if (obj.SERVER_PORT)
    delete obj.SERVER_PORT;
  if (obj.CLIENT_PORT)
    delete obj.CLIENT_PORT;
  if (obj.CLIENT_PORT)
    delete obj.CLIENT_PORT;
  if (obj.ADMIN_USERNAME)
    delete obj.ADMIN_USERNAME;
  if (obj.ADMIN_PASSWORD)
    delete obj.ADMIN_PASSWORD;
  let writedata = config;
  // console.log(writedata)
  writedata = ({ ...writedata, ...obj});
  if(obj.BASE_URL){
    writedata["FRONT_ROUTE"]= obj.BASE_URL+"/customer";

  }
  console.log("writeData:",writedata);
  // const writedata = global.config({ ...obj, FRONT_ROUTE: obj.BASE_URL + "/customer" });
  let configPath = path.join(__dirname, "public_media/site_setting/", "config.js");
  try {
    fs.promises.writeFile(configPath, "export default ()=> (" + JSON.stringify(writedata, null, 4) + ")", "utf8");
    console.log("data is written successfully in the file");
    if(res)
    return res.render("wizard", {
      success: true
    });

  }
  catch (err) {
    console.log("not able to write data in the file ", err);
    if(res)
      return res.render("wizard", {
      success: false,
      err: err
    });
  }
}
function getter() {

  // if(req && req.body){
  //   obj=req.body;
  // }
  // if (obj.ADMIN_URL)
  //   delete obj.ADMIN_URL;
  // let writedata = config;
  // // console.log(writedata)
  // writedata = ({ ...writedata, ...obj, "FRONT_ROUTE": obj.FRONT_ROUTE });
  // if (obj.BASE_URL)
  //   writedata["BASE_URL"] = obj.BASE_URL + "/customer";
  // // const writedata = global.config({ ...obj, FRONT_ROUTE: obj.BASE_URL + "/customer" });
  let configPath = path.join(__dirname, "../../public_media/site_setting/", "config.js");
  try {
    // try to read file
    console.log("try to read file==>");
    return fs.promises.configPath("configPath");
  } catch (error) {
    // create empty file, because it wasn't found
  }


}

// });
//   console.log(Wizard.isItInstalled().then(x => {
//     console.log("done...");
//   }));

// }