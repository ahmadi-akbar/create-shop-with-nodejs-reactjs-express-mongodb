import express from 'express';
const router = express.Router();
import seo from "#root/seo"

import global from '#root/global';
//
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
//         res.json({success: false, message: 'auth!'});
//
//     }
// }
// router.get('/myPost/:id', postController.viewOneMyPost);
// router.get('/', postController.allW);
// router.get('/postsByCat/:_id/:offset/:limit', postController.postsByCat);
// router.get('/postsByCat/:_id/:offset/:limit/:search', postController.postsByCat);
// router.get('/all/:offset/:limit', postController.allW);
// router.get('/all/:offset/:limit/:search', postController.allW);
// router.get('/myPosts/:offset/:limit', postController.allWCustomer);
// router.get('/view/:id', postController.viewOne);
// router.get('/getContactData/:id', postController.getContactData);
// router.get('/:offset/:limit/', postController.allW);
// router.get('/:offset/:limit/:search', postController.allW);
// router.get('/:id', postController.viewOne);
//
//
// router.get('/count', postController.count);
// router.post('/fileUpload', postController.fileUpload);
// router.post('/estekhdam', postController.estekhdam);
// // router.post('/login', userController.login);
// // router.get('/all/:offset/:limit', postController.all);
// router.use(loggingMiddleware);
// router.post('/', postController.createByCustomer);
//
// //
// //
// router.put('/:id', postController.edit);
// router.delete('/:id', postController.deleteByCustomer);


router.get('/', (req, res, next) => {
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
  // res.send('hi');Œ
  res.render('index', {
    // title: 'login',
    // description: 'description',
    // image: 'image',
    // url: 'url',
    title: seo['home']['title'][req.headers.lan],
    description: seo['home']['description'][req.headers.lan],
    image: seo['home']['image'][req.headers.lan],
    url: seo['home']['url'][req.headers.lan],
    width: '512',
    height: '512',
    name: seo['home']['name'][req.headers.lan],
    lng:req.headers.lan,
    list: [],
    categories: []
  });
});

export default router;