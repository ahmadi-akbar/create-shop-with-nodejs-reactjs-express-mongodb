import express from 'express';
import seo from "#root/seo"
const router = express.Router();
// var postController from '../../controllers/post');
// var categoryController from '../../controllers/category');
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

    // postController.allS(req, res, next).then((d) => {
    req.params.limit = 200;
    // categoryController.allS(req, res, next).then((f) => {
    res.render('index', {
        title: seo['resume']['title'][req.headers.lan],
        description: seo['resume']['description'][req.headers.lan],
        image: seo['resume']['image'][req.headers.lan],
        url: seo['resume']['url'][req.headers.lan],
        width: '512',
        height: '512',
        name: seo['resume']['name'][req.headers.lan],
        lng:req.headers.lan,
        list: [],
        categories: []
    });
    // });
    // });
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    // res.send('hi');Œ

});

// router.get('/resume', (req, res, next) => {
//     // res.sendFile(path.join(__dirname, 'build', 'index.html'));
//     // res.send('hi');
//     res.render('index', {
//         title: 'resume',
//         description: 'description',
//         image: 'image',
//         url: 'url',
//     });
// });



export default router;