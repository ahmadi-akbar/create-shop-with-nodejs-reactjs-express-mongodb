// console.log('#f main/src/seo.mjs')
<<<<<<< HEAD
=======
console.log("#f public/p");

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
// import config from "#c/config";
// import {the_public_route} from "#routes/public/p";
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

import express from "express";
import seo from "#root/seo";
import productController from "#controllers/product";
import global from "#root/global";
import moment from "moment-jalaali";
<<<<<<< HEAD
=======
// import isbot from "isbot/index";
// import * as ReactDOMServer from "react-dom/server";
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

const router = express.Router();
const m = moment();
m.locale("fa");

<<<<<<< HEAD
router.get("/:_theCategory/:_slug", (req, res, next) => {
  console.log("go through product...");
  seo.readFilePromise().then(data => {
    productController.viewOneS(req, res, next).then((d) => {
      // console.log('res.locals.body 2',res.locals.body);
      // let theHtml=req.headers.htmlSend;
      console.log('d',d);
      let obj={
        _id: d._id,
        title: d.title + " " + data.setting.separator + " (" + m.format("jD jMMMM") + ") " + data.setting.siteName,
        description: d.description || "",
        image: global.domain + "/" + d.image || data.setting.logo,
        product_name: d.title,
        product_price: d.product_price,
        product_old_price: d.product_old_price,
        availability: d.availability,
        url: global.domain + "/" + req.params._id + "/" + encodeURIComponent(d.title),
        width: "512",
        height: "512",
        name: d.title || "",
        metadescription: d.metadescription || "",
        keywords: d.keywords || "",
        lng: req.headers.lan,
        list: [],
        categories: [],
        html: global.body || ""
      };
      let body=res.locals.body;
      if(body) {
        body = body.replace('</head>', `<title>${obj.title}</title></head>`);
        body = body.replace('</head>', `<meta name="description" content="${obj.metadescription}" /></head>`);
        console.log(d.description,' send... ',obj.description);
        res.status(200).send(body);
      }else{
        console.log('render...');
        res.status(200).render('index',obj);
      }
    });
  });
});


=======
// router.get("/", (req, res, next) => {

export const the_public_route=(req, res, next)=> {

  console.log("go through home...");
  let body = res.locals.body;
  if (body) {
    body = body.replace('</head>', `<title>${'ttl'}</title></head>`);
    body = body.replace('</head>', `<meta name="description" content="${'metadescription'}" /></head>`);
    console.log(' send... ');
    return res.status(200).send(body);
  } else {
    console.log('render...');
    return res.status(200).render('index');
  }
};
export const the_product_route=(req, res, next)=> {

};
// });

router.get("/:_theCategory/:_slug",  (req, res, next) => {
  console.log("#r /:_theCategory/:_slug");
   ssrParse(req,res,next).then(e=>{

     seo.readFilePromise().then(data => {
       productController.viewOneS(req, res, next).then((d) => {
         let obj={
           _id: d._id,
           title: d.title + " " + data.setting.separator + " (" + m.format("jD jMMMM") + ") " + data.setting.siteName,
           description: d.description || "",
           image: global.domain + "/" + d.image || data.setting.logo,
           product_name: d.title,
           product_price: d.product_price,
           product_old_price: d.product_old_price,
           availability: d.availability,
           url: global.domain + "/" + req.params._id + "/" + encodeURIComponent(d.title),
           width: "512",
           height: "512",
           name: d.title || "",
           metadescription: d.metadescription || "",
           keywords: d.keywords || "",
           lng: req.headers.lan,
           list: [],
           categories: [],
           html: global.body || ""
         };
         let body=res.locals.body;
         if(body) {
           body = body.replace('</head>', `<title>${obj.title}</title></head>`);
           body = body.replace('</head>', `<meta name="description" content="${obj.metadescription}" /></head>`);
           console.log(' send... ');
           return res.status(200).send(body);
         }else{
           console.log('render...');
           return res.status(200).render('index',obj);
         }
       });
     });
   });

});


router.get("/:slug/:slug2/:slug3/", (req, res, next) => {
  console.log('#r /:slug/:slug2/:slug3/')

  the_public_route(req, res, next);
});
// router.get("/:slug/:slug2/", (req, res, next) => {
//   console.log('#r /:slug/:slug2/')
//
//   the_public_route(req, res, next);
// });
router.get("/", (req, res, next) => {
  console.log('#r /')
  ssrParse(req,res,next).then(e=>{
    the_public_route(req,res,next);
  });
});
router.get("/:slug/", (req, res, next) => {
  console.log('#r /:slug/',req.params)
  // the_public_route(req, res, next);
  ssrParse(req,res,next);

});




const ssrParse = (req, res, next) => {
  return new Promise(function(resolve, reject) {

    let ua = req.get("user-agent");
    if (!req.headers.lan)
      req.headers.lan = "fa";
    console.log("==> () ssrParse");

    if (isbot(ua)) {
      console.log("it is bot, we need SSR...");

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
              if (req.params._firstCategory && req.params._id) {
                route.server[0].params = req.params._id;
              }
              return route;
            })
            .filter(comp => {
              return comp.server;
            })
            .map(comp => {
              console.log("typeof comp.server", typeof comp.server);
              if (typeof comp.server === "object") {
                comp.server.forEach(s => {
                  console.log("s.params", s.params);
                  cccc.push(store.dispatch(s.func(s.params)));
                });
                return cccc;
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
          res.locals.renderedData = renderedData;
          res.locals.body = data.replace(
            "<div id=\"root\"></div>",
            `<div id="root">${renderedData}</div>`
          );
          // return the_public_route(req,res,next);
          // res.locals.body=data;
          // console.log("res.locals.body",res.locals.body);
          // req.headers.htmlSend='xxxs';
          // console.log('req',req);
          // return res.json(req);
          resolve();
          // return res.send(
          //   res.locals.body
          // );
        });
      });
    }
    else {
      console.log("no need to ssr...");
      resolve();
    }
  });
};
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
export default router;