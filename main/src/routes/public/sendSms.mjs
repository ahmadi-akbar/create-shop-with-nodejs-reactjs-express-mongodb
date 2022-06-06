import express from 'express';
const router = express.Router();
import seo from "#root/seo"

// const shell from 'shelljs')
import global from '#root/global';

router.get('/', (req, res, next) => {
    // console.log('here');
    // shell.exec('bash /home/idehweb/asekar/boy/tutorial/script.sh')
    // res.json({
    //     'jhgh': 'frgbh'
    // })

    res.render('index', {
        title: seo['home']['title'][req.headers.lan],
        description: seo['home']['description'][req.headers.lan],
        image: seo['home']['image'][req.headers.lan],
        url: seo['home']['url'][req.headers.lan],
        width: '512',
        height: '512',
        name: seo['home']['name'][req.headers.lan],
        lng: req.headers.lan,
        list: [],
        categories: []
    });
});

export default router;