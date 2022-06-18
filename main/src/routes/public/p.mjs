// console.log('#f main/src/seo.mjs')

import express from "express";
import seo from "#root/seo";
import productController from "#controllers/product";
import global from "#root/global";
import moment from "moment-jalaali";

const router = express.Router();
const m = moment();
m.locale("fa");

// router.get("/", (req, res, next) => {
export const the_public_route=(req, res, next)=> {
  console.log("go through home...");
  let body = res.locals.body;
  if (body) {
    body = body.replace('</head>', `<title>${'ttl'}</title></head>`);
    body = body.replace('</head>', `<meta name="description" content="${'metadescription'}" /></head>`);
    console.log('d.description', ' send... ');
    return res.status(200).send(body);
  } else {
    console.log('render...');
    return res.status(200).render('index');
  }
}
// });
router.get("/:_theCategory/:_slug", (req, res, next) => {
  console.log("go through product...");
  seo.readFilePromise().then(data => {
    productController.viewOneS(req, res, next).then((d) => {
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


export default router;