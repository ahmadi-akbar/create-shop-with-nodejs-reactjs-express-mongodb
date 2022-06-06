import express from 'express';
const router = express.Router();
import seo from "#root/seo"

import global from '#root/global';

// function loggingMiddleware(req, res, next) {
//     console.log('==>loggingMiddleware', req.headers.token);
//     if (req.headers.token) {
//         global.checkCustomerAuthentication(req.headers.token).then(function (response) {
//             req.headers.customer = response.customer;
//             console.log('user auth pass:', response.customer._id);
//             next();
//         }).catch(function (err) {
//             res.json({success: false, message: 'auth!'});
//         });
//     } else {
//         res.redirect({success: false, message: 'auth!'});
//
//     }
// }
//
// router.use(loggingMiddleware);

router.get('/', (req, res, next) => {

  res.render('index', {
    title: seo['makeMoney']['title'][req.headers.lan],
    description: seo['makeMoney']['description'][req.headers.lan],
    image: seo['makeMoney']['image'][req.headers.lan],
    url: seo['makeMoney']['url'][req.headers.lan],
    width: '512',
    height: '512',
    name: seo['makeMoney']['name'][req.headers.lan],
    lng: req.headers.lan,
    list: [],
    categories: []
  });
});

export default router;