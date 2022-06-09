import express from 'express';
const router = express.Router();
import seo from "#root/seo"

import global from '#root/global';


router.get('/', (req, res, next) => {
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
  // res.send('hi');Œ
  res.render('index', {
    // title: 'login',
    // description: 'description',
    // image: 'image',
    // url: 'url',
    title: '404',
    description: '404',
    image: '',
    url: '',
    width: '512',
    height: '512',
    name: '404',
    lng:req.headers.lan,
    list: [],
    categories: []
  });
});

export default router;