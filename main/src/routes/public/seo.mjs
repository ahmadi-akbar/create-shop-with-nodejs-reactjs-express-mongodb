import express from 'express';
//import seo from "#root/seo"
const router = express.Router();
// var postController from '../../controllers/post');
// var categoryController from '../../controllers/category');
import global from '#root/global';
//const html2pug from 'html2pug');
// var request from "request");

// const puppeteer from 'puppeteer');
//const puppeteerFirefox from 'puppeteer-firefox');
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
router.get('/', async (req, res, next) => {
    // const firefoxOptions = {
    //     product: 'firefox',
    //     extraPrefsFirefox: {
    //         // Enable additional Firefox logging from its protocol implementation
    //         // 'remote.log.level': 'Trace',
    //     },
    //     // Make browser logs visible
    //     dumpio: true,
    // };
    //
    // (async () => {
    //     const browser = await puppeteer.launch(firefoxOptions);
    //
    //     const page = await browser.newPage();
    //     console.log(await browser.version());
    //
    //     await page.goto('https://news.ycombinator.com/');
    //
    //     // Extract articles from the page.
    //     const resultsSelector = '.titlelink';
    //     const links = await page.evaluate((resultsSelector) => {
    //         const anchors = Array.from(document.querySelectorAll(resultsSelector));
    //         return anchors.map((anchor) => {
    //             const title = anchor.textContent.trim();
    //             return `${title} - ${anchor.href}`;
    //         });
    //     }, resultsSelector);
    //     console.log(links.join('\n'));
    //
    //     await browser.close();
    // })();
    res.json({success: true});


    // (async () => {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //
    //     await page.goto('https://www.npmjs.com/');
    //
    //     const textContent = await page.evaluate(() => {
    //         return document.querySelector('.npm-expansions').textContent
    //     });
    //
    //     console.log(textContent); /* No Problem Mate */
    //     res.json({success:true,textContent:textContent});
    //     browser.close();
    // })();
 //   const html = '<header><h1 class="title">Hello World!</h1></header>'
   // const pug = html2pug(html, {tabs: true});
   // console.log('pug', pug);
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