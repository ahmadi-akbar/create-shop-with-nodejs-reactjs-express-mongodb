import express from "express";
import seo from "#root/seo";

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log('readFilePromise');
  seo.readFilePromise().then(data => {
    res.render("index", {
      title: seo["home"]["title"][req.headers.lan],
      description: seo["home"]["description"][req.headers.lan],
      image: seo["home"]["image"][req.headers.lan],
      url: seo["home"]["url"][req.headers.lan],
      width: "512",
      height: "512",
      name: seo["home"]["name"][req.headers.lan],
      lng: req.headers.lan
    });
    console.log("data", data);
  });

});

router.get("/mag", function(req, res) {
  console.log("mag");
});

router.get("/errors", function(req, res) {
  res.render("index", {
    title: seo["home"]["title"][req.headers.lan],
    description: seo["home"]["description"][req.headers.lan],
    image: seo["home"]["image"][req.headers.lan],
    url: seo["home"]["url"][req.headers.lan],
    width: "512",
    height: "256",
    name: seo["home"]["name"][req.headers.lan],
    lng: req.headers.lan,
    list: [],
    categories: []
  });
});


export default router;