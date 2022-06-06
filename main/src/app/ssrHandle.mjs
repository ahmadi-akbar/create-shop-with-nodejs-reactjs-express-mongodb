import path from "path";
import isbot from "isbot";
// import app from "./index";
import fs from "fs";
import "ignore-styles";
import * as ReactDOMServer from "react-dom/server";
import * as React from "react";
import { StaticRouter } from "react-router-dom/server";
import { matchPath } from "react-router-dom";
import AppSSR from "#c/AppSSR";
import routes from "#c/ssrRoutes";

import { Provider } from "react-redux";

import { persistor, store } from "#c/functions/store";

const __dirname = path.resolve();
const viewsFolder = path.join(__dirname, "./views");


const ssrHandle = (app) => {

  app.get("/", (req, res, next) => {
    ssrParse(req, res, next);
  });
  app.get("/p/:_id/:title", (req, res,next) => {
    ssrParse(req, res, next);
  });

  app.get("/post/:_id/:title", (req, res,next) => {
    ssrParse(req, res, next);
  });

  app.get("/page/:_id/:title", (req, res,next) => {
    ssrParse(req, res, next);
  });
};
const ssrParse = (req, res, next) => {
  let ua = req.get("user-agent");
  console.log("in home...");

  if (isbot(ua)) {
    console.log("we need SSR...");

    console.log("BOT => ", ua);
    fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred");
      }
      const context = {};
      let cccc = [];
      const dataRequirements =
        routes
          .filter(route => {
            return (matchPath(route, req.url));
          })
          .map(route => {
            return route;
          })
          .filter(comp => {
            return comp.server;
          })
          .map(comp => {
            console.log("typeof comp.server", typeof comp.server);
            if (typeof comp.server === "object") {
              comp.server.forEach(s => {
                console.log('s.params',s.params);
                cccc.push(store.dispatch(s.func(s.params)))
              });
              return cccc
            } else {
              cccc.push(store.dispatch(comp.server(comp.params)));
              return store.dispatch(comp.server(comp.params));

            }
            // return store.dispatch(comp.server(comp.parameter))
          }); // dispatch data requirement
      console.log("dataRequirements", cccc);
      Promise.all(cccc).then(() => {
        const renderedData = ReactDOMServer.renderToString(<Provider store={store}>
          <StaticRouter context={context} location={req.url}>
            <AppSSR url={req.url}/></StaticRouter></Provider>);
        console.log("res.send ==============>");
        return res.send(
          data.replace(
            "<div id=\"root\"></div>",
            `<div id="root">${renderedData}</div>`
          )
        );
      });
    });
  } else {
    console.log("no need to ssr...");
    next();
  }
};
export default ssrHandle;