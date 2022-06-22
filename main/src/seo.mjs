import path from "path";
import fs from "fs";

import config from "#c/config";

let readFilePromise = function() {
  // let file = path///.join(__dirname, "/../public_media/site_setting/", "config.js");

  return new Promise(function(ok, notOk) {
    let c=config;
    // console.log(/'c',c);

    ok(c);

    // fs.readFile(file, function(err, data) {
    //   if (err) {
    //     notOk(err);
    //   } else {
    //     console.log('file',file,data);
    //
    //     ok(data);
    //   }
    // });
  });
};

let seo = {
  "readFilePromise": readFilePromise,
  "home": {
    title: {
      fa: ""
    },
    description: {
      fa: ""
    },
    image: {

    },
    url: {

    },
    width: "512",
    height: "512",
    name: {

    }
  }
};
export default seo;