import express from 'express';
const router = express.Router();
import seo from "#root/seo"
import productController from '#controllers/product';
import global from '#root/global';
import moment from 'moment-jalaali';
const m = moment();
m.locale('fa');
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

router.get('/:_id/:title', (req, res, next) => {
  //  console.log('req.headers["accept-language"]', req.headers.lan);
    productController.viewOneS(req, res, next).then((d) => {
        console.log(d);
        res.render('p', {
            _id:req.params._id,
            title: d.title + ' - (' + m.format('jD jMMMM') +') '+ seo['p']['title'][req.headers.lan] ,
            description: d.description || seo['p']['description'][req.headers.lan],
            image: global.domain + '/' + d.image || seo['p']['image'][req.headers.lan],
            product_name: d.title,
            product_price: d.product_price,
            product_old_price: d.product_old_price,
            availability: d.availability,
            url: global.domain + '/'+req.params._id+'/'+encodeURIComponent(d.title) ,
            width: '512',
            height: '512',
            name: d.title || seo['p']['title'][req.headers.lan],
            lng: req.headers.lan,
            list: [],
            categories: []
        });
    });
});



export default router;