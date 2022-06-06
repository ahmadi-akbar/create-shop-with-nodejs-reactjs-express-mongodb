import express from 'express';
import seo from "#root/seo"
const router = express.Router();
import postController from '#controllers/post';
import categoryController from '#controllers/category';

router.get('/', (req, res, next) => {

    //console.log('req.headers["accept-language"]', req.headers,req.headers['x-forwarded-for']);
    res.render('index', {
        title: seo['home']['title'][req.headers.lan],
        description: seo['home']['description'][req.headers.lan],
        image: seo['home']['image'][req.headers.lan],
        url: seo['home']['url'][req.headers.lan],
        width: '512',
        height: '512',
        name: seo['home']['name'][req.headers.lan],
        lng:req.headers.lan,
    });
    // postController.allS(req, res, next).then((d) => {
    //     req.params.limit=200;
    //     categoryController.allS(req, res, next).then((f) => {
    //         res.render('index', {
    //             title: seo['home']['title'][req.headers.lan],
    //             description: seo['home']['description'][req.headers.lan],
    //             image: seo['home']['image'][req.headers.lan],
    //             url: seo['home']['url'][req.headers.lan],
    //             width: '512',
    //             height: '512',
    //             name: seo['home']['name'][req.headers.lan],
    //             lng:req.headers.lan,
    //             list: d,
    //             categories: f
    //         });
    //     });
    // });


});

router.get('/mag', function(req, res) {
    console.log('mag')
});

router.get('/errors', function(req, res) {
    res.render('index', {
        title: seo['home']['title'][req.headers.lan],
        description: seo['home']['description'][req.headers.lan],
        image: seo['home']['image'][req.headers.lan],
        url: seo['home']['url'][req.headers.lan],
        width: '512',
        height: '256',
        name: seo['home']['name'][req.headers.lan],
        lng:req.headers.lan,
        list: [],
        categories: []
    });
});


export default router;