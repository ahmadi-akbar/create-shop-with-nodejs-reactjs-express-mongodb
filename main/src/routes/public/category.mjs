import express from 'express';
import seo from "#root/seo"
const router = express.Router();
import postController from '#controllers/post';
import categoryController from '#controllers/category';
import useragent from 'useragent';

router.get('/:catId/:name', (req, res, next) => {
  console.log('get category....')

    var agent = useragent.parse(req.headers['user-agent']);
    console.log('agent',agent)
    // console.log('req.headers["accept-language"]', req.headers.lan);
    postController.postsByCatS(req, res, next).then((d) => {
        req.params.limit=200;
        categoryController.sidebarS(req, res, next).then((f) => {
            // console.log('f', f,req.params._id);
            res.render('index', {
                title: '',
                description: '',
                image: '',
                url: '',
                width: '512',
                height: '512',
                lng:req.headers.lan,
                name: '',
                list: d,
                categories: f
            });
        });
    });


});
router.get('/:catId/:catName', (req, res, next) => {
  console.log('get category2....')

  if (!req.headers.lan) {
        let lngs = req.acceptsLanguages();
        if (lngs.includes('ar')) {
            req.headers.lan = 'ar';
        } else if (lngs.includes('tu')) {
            req.headers.lan = 'tu';
        } else if (lngs.includes('fa')) {
            req.headers.lan = 'fa';
        } else {
            req.headers.lan = 'en';
        }
    }
    // console.log('req.headers["accept-language"]', req.headers.lan);
    postController.postsByCatS(req, res, next).then((d) => {
        req.params.limit=200;
        categoryController.sidebarS(req, res, next).then((f) => {
            // console.log('f', f,req.params._id);
            res.render('index', {
                title: seo['category']['title'][req.headers.lan]+" "+f[0].name,
                description: seo['category']['description'][req.headers.lan],
                image: seo['category']['image'][req.headers.lan],
                url: seo['category']['url'][req.headers.lan],
                width: '512',
                height: '512',
                name: seo['category']['name'][req.headers.lan],
                list: d,
                categories: f
            });
        });
    });


});



export default router;