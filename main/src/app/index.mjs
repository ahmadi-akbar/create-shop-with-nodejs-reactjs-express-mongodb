import express from "express";
import db from "#root/app/db";
import path from "path";
import ssrHandle from "#root/app/ssrHandle";
import configHandle from "#root/app/configHandle";
import routeHandle from "#root/app/routeHandle";
import headerHandle from "#root/app/headerHandle";
import uploadHandle from "#root/app/uploadHandle";

console.log("new date", new Date());

var app = express();

db();

ssrHandle(app);
configHandle(express, app);
headerHandle(app);

app.use(function(err, req, res, next) {
  uploadHandle(err, req, res, next);
});

routeHandle(app);

export default app;
