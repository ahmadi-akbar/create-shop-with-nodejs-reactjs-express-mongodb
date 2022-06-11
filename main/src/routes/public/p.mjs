import express from 'express';
const router = express.Router();
import seo from "#root/seo"
import productController from '#controllers/product';
import global from '#root/global';
import moment from 'moment-jalaali';
const m = moment();
m.locale('fa');

router.get('/:_id/:title', (req, res, next) => {
   console.log('go through product...', req.headers.lan);
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