import Category from '#models/category';
import Post from '#models/post';
import _ from 'lodash';
import request from '#root/request';
import Mongoose from 'mongoose';
var self = ( {
    importcats: async function (req, res, next) {
        return;
        // console.log('importcats');
        await request({
            method: 'GET',
                url: "http://arvandguarantee.shop/wp-json/akbar/v1/allcats",
                body: {},
            json: true
        }, function async (error, response, parsedBody) {
            console.log('parsedBody');
            if (parsedBody)
                _.forEach(parsedBody, async function (value, key) {


                    await Category.create({
                        name: {
                            fa: value.name
                        },
                        slug: value.slug
                    }, async function (err, category) {
                        if (err || !category) {
                            await console.log('err', err);
                        }
                        // await console.log('key:', key);
                        // await console.log('value:', value.name);
                        if (value.children) {
                            await _.forEach(value.children, async function (child, key2) {


                                await Category.create({
                                    name: {
                                        fa: child.name
                                    },
                                    slug: child.slug,
                                    parent: category._id
                                }, async function (err, category2) {
                                    if (err || !category2) {
                                        await console.log('err', err);
                                    }
                                    // await console.log('    key2:', key2);
                                    // await console.log('    child2:', child.name);
                                    if (child.children) {
                                        await _.forEach(child.children, async function (ch, key3) {


                                            await Category.create({
                                                name: {
                                                    fa: ch.name
                                                },
                                                slug: ch.slug,
                                                parent: category2._id
                                            }, async function (err, category3) {
                                                if (err || !category3) {
                                                    await console.log('err', err);
                                                }
                                                // await console.log('    key2:', key3);
                                                // await console.log('    child2:', ch.name);

                                            });
                                        });
                                    }
                                });
                            });
                        }

                    });


                });
        }).catch(async function (err) {
            console.log('err:', err);
            await res.json({
                success: false,
                err: err
            });
        });

    },
    all: function (req, res, next) {
        if (req.query.f) {
            self.s(req, res, next);
        } else {
            console.log('fetch all...');
            let offset = 0;
            if (req.params.offset) {
                offset = parseInt(req.params.offset);
            }

            let search = {};
            // search["name." + req.headers.lan] = {
            //   $exists: true
            // };
            if (req.query.Search) {

                search["name." + req.headers.lan] = {
                    $exists: true,
                    "$regex": req.query.Search,
                    "$options": "i"
                };
            }
            // console.log('search', search);
            Category.find(search, function (err, categorys) {
                // console.log('err', err);
                // console.log('categorys', categorys);
                if (err || !categorys) {
                    res.json({
                        success: false,
                        message: 'error!',
                        categorys: categorys
                    });
                    return 0;
                }
                Category.countDocuments({}, function (err, count) {
                    // console.log('countDocuments', count);
                    if (err || !count) {
                        res.json({
                            success: false,
                            message: 'error!'
                        });
                        return 0;
                    }
                    res.setHeader(
                        "X-Total-Count",
                        count
                    );
                    res.json(categorys);
                    return 0;


                });

            }).skip(offset).sort({_id: -1}).limit(parseInt(req.params.limit));
        }
    },
    f: function (req, res, next) {
        // console.log('fetch all f...');
        let offset = 0;
        if (req.params.offset) {
            offset = parseInt(req.params.offset);
        }

        let search = {};
        search["parent"] = {
            $exists: false
        };
        // console.log('search', search);
        Category.find(search, function (err, categorys) {
            // console.log('err', err);
            // console.log('categorys', categorys);
            if (err || !categorys) {
                res.json({
                    success: false,
                    message: 'error!',
                    categorys: categorys
                });
                return 0;
            }
            Category.countDocuments({}, function (err, count) {
                // console.log('countDocuments', count);
                if (err || !count) {
                    res.json({
                        success: false,
                        message: 'error!'
                    });
                    return 0;
                }
                res.setHeader(
                    "X-Total-Count",
                    count
                );
                res.json(categorys);
                return 0;


            });

        }).skip(offset).sort({_id: -1}).limit(parseInt(req.params.limit));
    },

    allS: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            let offset = 0;
            if (req.params.offset) {
                offset = parseInt(req.params.offset);
            }

            let search = {};
            search["name." + req.headers.lan] = {
                $exists: true
            };
            Category.find(search, function (err, categorys) {
                if (err || !categorys) {
                    resolve([]);

                }
                Category.countDocuments({}, function (err, count) {
                    // console.log('countDocuments', count);
                    if (err || !count) {
                        resolve([]);

                    }
                    res.setHeader(
                        "X-Total-Count",
                        count
                    );
                    _.forEach(categorys, (c) => {
                        c.name = c['name'][req.headers.lan];
                        // console.log(c);
                    });
                    resolve(categorys);


                });

            }).skip(offset).sort({_id: -1}).limit(parseInt(req.params.limit));
        });
    },
    allSXml: async function () {
        let XTL = [{
            url: '/',
            lastMod: new Date(),
            changeFreq: 'hourly'
        },
            {
                url: '/add-new-post',
                lastMod: new Date(),
                changeFreq: 'monthly'
            }], offset = 0, search = {};
        return new Promise(async function (resolve, reject) {

            await Category.find(search, async function (err, categorys) {
                if (err || !categorys) {
                    return await ([]);
                }
                // await console.log("allSXml1", "allSXml1")
                let cd = new Date();
                await _.forEach(categorys, async (c) => {
                    await XTL.push({
                        url: '/category/' + c._id + '/' + c.name['fa'],
                        lastMod: cd,
                        changeFreq: 'daily'
                    });
                });
                search['active'] = true;
                await Post.find(search, async function (err, posts) {
                    await _.forEach(posts, async (p) => {
                        await XTL.push({
                            url: '/p/' + p._id + '/' + p.title['fa'],
                            lastMod: p.updatedAt,
                            changeFreq: 'weekly'
                        });
                    });
                    resolve(XTL);
                }).skip(offset).sort({_id: -1});


            }).skip(offset).sort({_id: -1});
        });
    },
    level:

        function (req, res, next) {
            let offset = 0;
            if (req.params.offset) {
                offset = parseInt(req.params.offset);
            }

            let search = {};
            if (!req.params.catId) {
                search['parent'] = null;
            } else {
                search['parent'] = req.params.catId;
            }
            search["name." + req.headers.lan] = {
                $exists: true
            };
            // console.log(search);
            Category.find(search, function (err, categorys) {
                if (err || !categorys) {
                    res.json({
                        success: false,
                        message: 'error!'
                    });
                    return 0;
                }
                Category.countDocuments({}, function (err, count) {
                    // console.log('countDocuments', count);
                    if (err || !count) {
                        res.json({
                            success: false,
                            message: 'error!'
                        });
                        return 0;
                    }
                    res.setHeader(
                        "X-Total-Count",
                        count
                    );
                    _.forEach(categorys, (c) => {
                        c.name = c['name'][req.headers.lan];
                        // console.log(c);
                    });
                    res.json(categorys);
                    return 0;


                });

            }).skip(offset).sort({_id: -1}).limit(parseInt(req.params.limit));
        }

    ,
    s: function (req, res, next) {
        // console.log('s()...');
        let offset = 0;
        if (req.params.offset) {
            offset = parseInt(req.params.offset);
        }

        let search = {};
        if (!req.params._id) {
            search['parent'] = null;
        } else {
            search['parent'] = req.params._id;
        }
        // search["name." + req.headers.lan] = {
        //     $exists: true
        // };

        console.log('jhgfghj', search);
        Category.find(search, function (err, categorys) {
            if (err) {
                res.json({
                  err:err,
                    success: false,
                    message: 'error!',
                  categorys
                });
                // res.json([]);
                return 0;
            }
            if (!categorys) {
                categorys = [];
                // res.json({
                //     success: true,
                //     message: 'error!'
                // });
                // return 0;
            }
            // console.log(categorys);
            _.forEach(categorys, (c) => {
                c.name = c['name'][req.headers.lan];
                // console.log(c);
            });
            // categorys.push({});
            Category.countDocuments({}, function (err, count) {
                // console.log('countDocuments', count);
                if (err || !count) {
                    res.json({
                        success: false,
                        message: 'error!'
                    });
                    return 0;
                }
                res.setHeader(
                    "X-Total-Count",
                    count
                );
                if (req.params._id)
                    Category.findById(req.params._id, function (err, mainCat) {
                        // console.log('here');
                        // if (categorys && categorys.length >= 0) {
                        //   if (mainCat) {
                        //     mainCat.back = true;
                        //     mainCat.name = mainCat['name'][req.headers.lan];
                        //     categorys[categorys.length] = mainCat;
                        //   }
                        // }
                        res.json(categorys.reverse());
                        return 0;
                    }).lean();
                else {
                    res.json(categorys.reverse());
                    return 0;
                }


            });

        }).skip(offset).sort({_id: -1}).limit(req.params.limit).lean();
    },
    sidebar: function (req, res, next) {
        // console.log('sidebar()...');
        let offset = 0;
        if (req.params.offset) {
            offset = parseInt(req.params.offset);
        }

        let search = {};
        if (!req.params.catId) {
            search['parent'] = null;
        } else {
            search['parent'] = req.params.catId;
        }
        search["name." + req.headers.lan] = {
            $exists: true
        };
        // console.log('jhgfghj', search);
        Category.find(search, function (err, categorys) {
            if (err) {
                res.json({
                    success: false,
                    message: 'error!'
                });
                return 0;
            }
            if (!categorys) {
                categorys = [];
                // res.json({
                //     success: true,
                //     message: 'error!'
                // });
                // return 0;
            }
            // console.log(categorys);
            _.forEach(categorys, (c) => {
                c.name = c['name'][req.headers.lan];
                // console.log(c);
            });
            Category.countDocuments({}, function (err, count) {
                // console.log('countDocuments', count);
                if (err || !count) {
                    res.json({
                        success: false,
                        message: 'error!'
                    });
                    return 0;
                }
                res.setHeader(
                    "X-Total-Count",
                    count
                );
                if (req.params.catId)
                    Category.findById(req.params.catId, function (err, mainCat) {
                        // console.log('here');
                        if (categorys && categorys.length >= 0) {
                            if (mainCat) {
                                mainCat.back = true;
                                mainCat.name = mainCat['name'][req.headers.lan];
                                categorys[categorys.length] = mainCat;
                            }
                        }
                        res.json(categorys.reverse());
                        return 0;
                    }).lean();
                else {
                    res.json(categorys.reverse());
                    return 0;
                }


            });

        }).skip(offset).sort({_id: -1}).limit(parseInt(req.params.limit));
    }
    ,
    sidebarS: function (req, res, next) {
        return new Promise(function (resolve, reject) {

            let offset = 0;
            if (req.params.offset) {
                offset = parseInt(req.params.offset);
            }

            let search = {};
            if (!req.params.catId) {
                search['parent'] = null;
            } else {
                search['parent'] = req.params.catId;
            }
            search["name." + req.headers.lan] = {
                $exists: true
            };
            // console.log('jhgfghj', search);
            Category.find(search, function (err, categorys) {
                if (err) {
                    resolve([]);
                    return 0;
                }
                if (!categorys) {
                    categorys = [];

                }
                _.forEach(categorys, (c) => {
                    c.name = c['name'][req.headers.lan];
                });
                Category.countDocuments({}, function (err, count) {
                    // console.log('countDocuments', count);
                    if (err || !count) {
                        res.json({
                            success: false,
                            message: 'error!'
                        });
                        return 0;
                    }
                    res.setHeader(
                        "X-Total-Count",
                        count
                    );
                    if (req.params.catId)
                        Category.findById(req.params.catId, function (err, mainCat) {
                            // console.log('here');
                            if (categorys && categorys.length >= 0) {
                                if (mainCat) {
                                    mainCat.back = true;
                                    mainCat.name = mainCat['name'][req.headers.lan];
                                    categorys[categorys.length] = mainCat;
                                }
                            }
                            resolve(categorys.reverse());
                            return 0;
                        }).lean();
                    else {
                        resolve(categorys.reverse());
                        return 0;
                    }


                });

            }).skip(offset).sort({_id: -1}).limit(parseInt(req.params.limit));
        });
    }
    ,
    viewOne: function (req, res, next) {

        Category.findById(req.params.id,
            function (err, category) {
                if (err || !category) {
                    res.json({
                        success: false,
                        message: 'error!'
                    });
                    return 0;
                }
                res.json(category);
                return 0;

            });
    }
    ,
    exparty: function (req, res, next) {

        // Category.findById(req.params.id,
        //     function (err, category) {
        //         if (err || !category) {
        //             res.json({
        //                 success: false,
        //                 message: 'error!'
        //             });
        //             return 0;
        //         }
        // req.body.map((obj,i)=>{
        //
        // })
        // let s =[
        //     {
        //         "_id": "5e5e6d57c87f80559141f282",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "??e??itli",
        //             "ar": "??????????",
        //             "en": "miscellaneous"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6d3dc87f80559141f281",
        //         "name": {
        //             "fa": "???????? ?? ??????????",
        //             "tu": "Sanat ve Medya",
        //             "ar": "???????? ????????????????",
        //             "en": "Art and Media"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6d2ec87f80559141f280",
        //         "name": {
        //             "fa": "???????????? ?? ???????????? ?? ??????????????",
        //             "tu": "Sa??l??k ve G??zellik",
        //             "ar": "?????????? ??????????????",
        //             "en": "Health & Beauty"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6ce3c87f80559141f27f",
        //         "name": {
        //             "fa": "?????? ?? ??????",
        //             "tu": "ta????ma",
        //             "ar": "transport",
        //             "en": "transport"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6ca0c87f80559141f27e",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "e??itici",
        //             "ar": "??????????",
        //             "en": "educational"
        //         },
        //         "slug": null,
        //         "__v": 0,
        //         "parent": "5e5b78e4596ddb1e01531471"
        //     },
        //     {
        //         "_id": "5e5e6c8cc87f80559141f27d",
        //         "name": {
        //             "fa": "?????????? ?? ?????? ?? ????????????",
        //             "tu": "End??stri, Teknik ve M??hendislik",
        //             "ar": "???????????? ?????????? ??????????????",
        //             "en": "Industrial, Technical and Engineering"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6c80c87f80559141f27c",
        //         "name": {
        //             "fa": "?????????????????? ?? ????????",
        //             "tu": "Pazarlama ve Sat????",
        //             "ar": "?????????????? ??????????????????",
        //             "en": "Marketing and Sales"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6c70c87f80559141f27b",
        //         "name": {
        //             "fa": "???????? ?? ???????????????? ?? ??????????",
        //             "tu": "Finans, Muhasebe ve Hukuk",
        //             "ar": "?????????????? ?????????????????? ????????????????????",
        //             "en": "Finance, Accounting and Legal"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6c5ec87f80559141f27a",
        //         "name": {
        //             "fa": "???????????? ?? ???????????? ??????????????",
        //             "tu": "Bilgisayar ve Bilgi Teknolojisi",
        //             "ar": "?????????????????? ???????????????????? ??????????????????",
        //             "en": "Computer and Information Technology"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6c4fc87f80559141f279",
        //         "name": {
        //             "fa": "?????????? ?????????????? ?? ??????????????",
        //             "tu": "Ma??aza & Restoran Hizmetleri",
        //             "ar": "?????????? ?????????????? ????????????????",
        //             "en": "Shop & Restaurant Services"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6c3ec87f80559141f278",
        //         "name": {
        //             "fa": "???????????? ???????????? ?? ????????????????",
        //             "tu": "Mimarl??k, ??n??aat ve ??n??aat",
        //             "ar": "?????????????? ?????????????????? ???????????????? ????????????????????",
        //             "en": "Architecture, Civil and Construction"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6c28c87f80559141f277",
        //         "name": {
        //             "fa": "???????????????? ?? ??????????",
        //             "tu": "Bek??i ve Temizlik",
        //             "ar": "?????????? ?????????????? ????????????????",
        //             "en": "Caretaker and Cleaning"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6c15c87f80559141f276",
        //         "name": {
        //             "fa": "?????????? ?? ????????????",
        //             "tu": "Y??netim ve Y??netim",
        //             "ar": "?????????????? ????????????????",
        //             "en": "Administration and Management"
        //         },
        //         "parent": "5e5b78e4596ddb1e01531471",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b9dc87f80559141f275",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "ila??",
        //             "ar": "????????",
        //             "en": "medicine"
        //         },
        //         "parent": "5e5e6b2ec87f80559141f26e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b7fc87f80559141f274",
        //         "name": {
        //             "fa": "????????????????? ?? ??????????????",
        //             "tu": "Kahve D??kkan?? ve Restoran",
        //             "ar": "???????? ?????? ??????????",
        //             "en": "Coffee Shop & Restaurant"
        //         },
        //         "parent": "5e5e6b2ec87f80559141f26e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b73c87f80559141f273",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "end??striyel",
        //             "ar": "Industrial",
        //             "en": "industrial"
        //         },
        //         "parent": "5e5e6b2ec87f80559141f26e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b65c87f80559141f272",
        //         "name": {
        //             "fa": "???????? ??????",
        //             "tu": "ofis",
        //             "ar": "office",
        //             "en": "office"
        //         },
        //         "parent": "5e5e6b2ec87f80559141f26e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b56c87f80559141f271",
        //         "parent": "5e5e6b2ec87f80559141f26e",
        //         "name": {
        //             "fa": "???????????????? ?? ????????????????? ????????????",
        //             "tu": "Kuaf??rler ve G??zellik Salonlar??",
        //             "ar": "???????????? ???????????????? ??????????",
        //             "en": "Hairdressers and Beauty Salons"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b4ac87f80559141f270",
        //         "name": {
        //             "fa": "?????????????? ?? ??????????",
        //             "tu": "D??kkan ve D??kkan",
        //             "ar": "???????? ??????????",
        //             "en": "Shop and Shop"
        //         },
        //         "parent": "5e5e6b2ec87f80559141f26e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b3ac87f80559141f26f",
        //         "name": {
        //             "fa": "???????? ??????????",
        //             "tu": "toptan sat????",
        //             "ar": "wholesale",
        //             "en": "wholesale"
        //         },
        //         "parent": "5e5e6b22c87f80559141f26d",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b2ec87f80559141f26e",
        //         "name": {
        //             "fa": "?????????????? ?? ?????????????????????",
        //             "tu": "Ekipman ve Makineler",
        //             "ar": "?????????????? ??????????????",
        //             "en": "Equipment and Machinery"
        //         },
        //         "parent": "5e5e6b22c87f80559141f26d",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b22c87f80559141f26d",
        //         "name": {
        //             "fa": "???????? ?????? ?? ??????",
        //             "tu": "???? ????in",
        //             "ar": "??????????????",
        //             "en": "For Business"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b0cc87f80559141f26c",
        //         "name": {
        //             "fa": "????????",
        //             "tu": "nesneler",
        //             "ar": "????????????",
        //             "en": "objects"
        //         },
        //         "parent": "5e5e6af4c87f80559141f26a",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6b01c87f80559141f26b",
        //         "name": {
        //             "fa": "??????????????",
        //             "tu": "hayvanlar",
        //             "ar": "Animals",
        //             "en": "animals"
        //         },
        //         "parent": "5e5e6af4c87f80559141f26a",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6af4c87f80559141f26a",
        //         "name": {
        //             "fa": "????????????????????",
        //             "tu": "Eksik",
        //             "ar": "??????????",
        //             "en": "Missing"
        //         },
        //         "parent": "5e5e6a59c87f80559141f262",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6adec87f80559141f269",
        //         "name": {
        //             "fa": "????????????????",
        //             "tu": "ara??t??rma",
        //             "ar": "??????????",
        //             "en": "research"
        //         },
        //         "parent": "5e5e6acec87f80559141f268",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6acec87f80559141f268",
        //         "name": {
        //             "fa": "??????????????????",
        //             "tu": "g??n??ll??",
        //             "ar": "????????",
        //             "en": "voluntary"
        //         },
        //         "parent": "5e5e6a59c87f80559141f262",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6aaac87f80559141f267",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "spor",
        //             "ar": "????????",
        //             "en": "sports"
        //         },
        //         "parent": "5e5e6a66c87f80559141f263",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6a93c87f80559141f266",
        //         "name": {
        //             "fa": "???????????? ?? ??????????",
        //             "tu": "M??zik ve Tiyatro",
        //             "ar": "???????????????? ??????????????",
        //             "en": "Music and Theater"
        //         },
        //         "parent": "5e5e6a66c87f80559141f263",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6a85c87f80559141f265",
        //         "name": {
        //             "fa": "???????????????? ?? ??????????",
        //             "tu": "Toplant?? ve Konferans",
        //             "ar": "???????????????? ????????????????",
        //             "en": "Meeting and Conference"
        //         },
        //         "parent": "5e5e6a66c87f80559141f263",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6a76c87f80559141f264",
        //         "name": {
        //             "fa": "????????",
        //             "tu": "a????k art??rma",
        //             "ar": "????????????",
        //             "en": "auction"
        //         },
        //         "parent": "5e5e6a66c87f80559141f263",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6a66c87f80559141f263",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "etkinlik",
        //             "ar": "event",
        //             "en": "event"
        //         },
        //         "parent": "5e5e6a59c87f80559141f262",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6a59c87f80559141f262",
        //         "name": {
        //             "fa": "??????????????",
        //             "tu": "sosyal",
        //             "ar": "social",
        //             "en": "social"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6a39c87f80559141f261",
        //         "name": {
        //             "fa": "????????????? ????????",
        //             "tu": "oyuncaklar",
        //             "ar": "toys",
        //             "en": "toys"
        //         },
        //         "parent": "5e5e68e6c87f80559141f24e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6a1bc87f80559141f260",
        //         "name": {
        //             "fa": "???????? ?? ?????????? ??????????",
        //             "tu": "Spor ve Fitness",
        //             "ar": "?????????????? ???????????????? ??????????????",
        //             "en": "Sport and Fitness"
        //         },
        //         "parent": "5e5e68e6c87f80559141f24e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6a0dc87f80559141f25f",
        //         "name": {
        //             "fa": "???????? ????????????",
        //             "tu": "M??zik Aletleri",
        //             "ar": "???????????? ??????????????????",
        //             "en": "Musical Instruments"
        //         },
        //         "parent": "5e5e68e6c87f80559141f24e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e69fac87f80559141f25e",
        //         "name": {
        //             "fa": "?????????????? ?? ????????????",
        //             "tu": "Koleksiyonluk ve E??lence",
        //             "ar": "?????????????? ????????????",
        //             "en": "Collectibles and Entertainment"
        //         },
        //         "parent": "5e5e68e6c87f80559141f24e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e69e9c87f80559141f25d",
        //         "name": {
        //             "fa": "??????????????",
        //             "tu": "hayvanlar",
        //             "ar": "Animals",
        //             "en": "animals"
        //         },
        //         "parent": "5e5e68e6c87f80559141f24e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e69bdc87f80559141f25c",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "Dergiler",
        //             "ar": "Magazines",
        //             "en": "Magazines"
        //         },
        //         "parent": "5e5e697fc87f80559141f257",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e69b2c87f80559141f25b",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "dini",
        //             "ar": "??????????????",
        //             "en": "religious"
        //         },
        //         "parent": "5e5e697fc87f80559141f257",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e69a4c87f80559141f25a",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "tarihsel",
        //             "ar": "????????????",
        //             "en": "historical"
        //         },
        //         "parent": "5e5e697fc87f80559141f257",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6997c87f80559141f259",
        //         "name": {
        //             "fa": "????????",
        //             "tu": "edebi",
        //             "ar": "????????",
        //             "en": "literary"
        //         },
        //         "parent": "5e5e697fc87f80559141f257",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e698dc87f80559141f258",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "e??itici",
        //             "ar": "??????????",
        //             "en": "educational"
        //         },
        //         "parent": "5e5e697fc87f80559141f257",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e697fc87f80559141f257",
        //         "name": {
        //             "fa": "???????? ?? ????????",
        //             "tu": "Kitap ve Dergi",
        //             "ar": "????????",
        //             "en": "Book and Magazine"
        //         },
        //         "parent": "5e5e68e6c87f80559141f24e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e696bc87f80559141f256",
        //         "name": {
        //             "fa": "?????? ?? ??????????",
        //             "tu": "Tur ve Kiralama",
        //             "ar": "???????? ????????????",
        //             "en": "Tour and Charter"
        //         },
        //         "parent": "5e5e68e6c87f80559141f24e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e694ac87f80559141f255",
        //         "name": {
        //             "fa": "?????????????? ???????? ?? ????????",
        //             "tu": "Otob??s, Metro ve Tren",
        //             "ar": "?????????? ?????????? ?????????? ??????????",
        //             "en": "Bus, Subway and Train"
        //         },
        //         "parent": "5e5e68f2c87f80559141f24f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e693ec87f80559141f254",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "spor",
        //             "ar": "sports",
        //             "en": "sports"
        //         },
        //         "parent": "5e5e68f2c87f80559141f24f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6925c87f80559141f253",
        //         "name": {
        //             "fa": "?????????? ?? ?????????????? ??????????",
        //             "tu": "Spor alanlar?? ve yar????malar",
        //             "ar": "?????????????? ???????????????????? ????????????????",
        //             "en": "Sports venues and competitions"
        //         },
        //         "parent": "5e5e68f2c87f80559141f24f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6918c87f80559141f252",
        //         "name": {
        //             "fa": "???????? ???????? ?? ??????????",
        //             "tu": "Hediye Kart?? ve ??ndirim",
        //             "ar": "?????????? ?????????????? ????????????",
        //             "en": "Gift Card and Discount"
        //         },
        //         "parent": "5e5e68f2c87f80559141f24f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e690cc87f80559141f251",
        //         "name": {
        //             "fa": "?????????? ?? ??????????",
        //             "tu": "Tiyatro ve Sinema",
        //             "ar": "???????????? ????????????????",
        //             "en": "Theater and Cinema"
        //         },
        //         "parent": "5e5e68f2c87f80559141f24f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e68fdc87f80559141f250",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "Konser",
        //             "ar": "???????? ??????????????",
        //             "en": "Concert"
        //         },
        //         "parent": "5e5e68f2c87f80559141f24f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e68f2c87f80559141f24f",
        //         "name": {
        //             "fa": "????????",
        //             "tu": "bilet",
        //             "ar": "??????????",
        //             "en": "ticket"
        //         },
        //         "parent": "5e5e68e6c87f80559141f24e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e68e6c87f80559141f24e",
        //         "name": {
        //             "fa": "???????????? ?? ??????????",
        //             "tu": "Bo?? Zaman ve E??lence",
        //             "ar": "?????????????? ????????????????",
        //             "en": "Leisure and Entertainment"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e68d2c87f80559141f24d",
        //         "name": {
        //             "fa": "?????????? ??????????????",
        //             "tu": "k??rtasiye",
        //             "ar": "??????????????????",
        //             "en": "stationery"
        //         },
        //         "parent": "5e5e67a1c87f80559141f23e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e68bbc87f80559141f24c",
        //         "name": {
        //             "fa": "?????????? ?? ???????? ??????",
        //             "tu": "bebek mobilyalar??",
        //             "ar": "???????? ??????????",
        //             "en": "baby furniture"
        //         },
        //         "parent": "5e5e6872c87f80559141f248",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e68b0c87f80559141f24b",
        //         "name": {
        //             "fa": "?????????? ??????",
        //             "tu": "bebek sandalyesi",
        //             "ar": "???????? ??????????",
        //             "en": "baby chair"
        //         },
        //         "parent": "5e5e6872c87f80559141f248",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e68a0c87f80559141f24a",
        //         "name": {
        //             "fa": "???????????? ?? ?????????? ??????????",
        //             "tu": "??ocuk Arabalar?? ve Aksesuarlar??",
        //             "ar": "?????????? ????????????????????",
        //             "en": "Prams and Accessories"
        //         },
        //         "parent": "5e5e6872c87f80559141f248",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6886c87f80559141f249",
        //         "name": {
        //             "fa": "?????????? ????????",
        //             "tu": "oyuncaklar",
        //             "ar": "toys",
        //             "en": "toys"
        //         },
        //         "parent": "5e5e6872c87f80559141f248",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6872c87f80559141f248",
        //         "name": {
        //             "fa": "?????????? ?????? ?? ?????????? ????????",
        //             "tu": "??ocuk Oyuncaklar??",
        //             "ar": "?????????? ??????????????",
        //             "en": "Kids' Toys"
        //         },
        //         "parent": "5e5e67a1c87f80559141f23e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e684ec87f80559141f247",
        //         "name": {
        //             "fa": "?????? ?? ???????? ??????",
        //             "tu": "bebek ayakkab??lar?? ve giysileri",
        //             "ar": "?????????? ???????????? ??????????",
        //             "en": "baby shoes and clothes"
        //         },
        //         "parent": "5e5e67a1c87f80559141f23e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6834c87f80559141f246",
        //         "name": {
        //             "fa": "?????????????? ?????????????? ?? ????????????",
        //             "tu": "Kozmetik, Sa??l??k",
        //             "ar": "???????????????? ?????????????? ????????????",
        //             "en": "Cosmetics, Health"
        //         },
        //         "parent": "5e5e67a1c87f80559141f23e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e681bc87f80559141f245",
        //         "name": {
        //             "fa": "??????????????",
        //             "tu": "yapay elmas",
        //             "ar": "?????????? ????????????",
        //             "en": "rhinestones"
        //         },
        //         "parent": "5e5e67f3c87f80559141f242",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e680fc87f80559141f244",
        //         "name": {
        //             "fa": "??????????????",
        //             "tu": "m??cevher",
        //             "ar": "??????????????",
        //             "en": "jewelry"
        //         },
        //         "parent": "5e5e67f3c87f80559141f242",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6804c87f80559141f243",
        //         "name": {
        //             "fa": "????????",
        //             "tu": "saat",
        //             "ar": "????????",
        //             "en": "clock"
        //         },
        //         "parent": "5e5e67f3c87f80559141f242",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e67f3c87f80559141f242",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "dekoratif",
        //             "ar": "????????????????",
        //             "en": "decorative"
        //         },
        //         "parent": "5e5e67a1c87f80559141f23e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e67e2c87f80559141f241",
        //         "name": {
        //             "fa": "????????",
        //             "tu": "elbise",
        //             "ar": "??????????",
        //             "en": "dress"
        //         },
        //         "parent": "5e5e67b9c87f80559141f23f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e67cbc87f80559141f240",
        //         "name": {
        //             "fa": "??????/??????/????????????",
        //             "tu": "??anta / ayakkab?? / kemer",
        //             "ar": "?????????? / ?????????? / ????????",
        //             "en": "bag / shoes / belt"
        //         },
        //         "parent": "5e5e67b9c87f80559141f23f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e67b9c87f80559141f23f",
        //         "name": {
        //             "fa": "???????? ?????? ?? ????????",
        //             "tu": "??anta, ayakkab?? ve k??yafet",
        //             "ar": "?????????? ???????????? ????????????",
        //             "en": "bags, shoes and clothes"
        //         },
        //         "parent": "5e5e67a1c87f80559141f23e",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e67a1c87f80559141f23e",
        //         "name": {
        //             "fa": "?????????? ????????",
        //             "tu": "Ki??isel e??yalar",
        //             "ar": "?????????????? ??????????",
        //             "en": "Personal belongings"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e675dc87f80559141f23d",
        //         "name": {
        //             "fa": "???????????? ????????????",
        //             "tu": "??al????ma Dan????manl??????",
        //             "ar": "?????????? ??????????????",
        //             "en": "Study Counseling"
        //         },
        //         "parent": "5e5e66dec87f80559141f237",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e674bc87f80559141f23c",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "spor",
        //             "ar": "??????????????",
        //             "en": "sports"
        //         },
        //         "parent": "5e5e66dec87f80559141f237",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e673cc87f80559141f23b",
        //         "name": {
        //             "fa": "????????",
        //             "tu": "sanat",
        //             "ar": "art",
        //             "en": "art"
        //         },
        //         "parent": "5e5e66dec87f80559141f237",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6726c87f80559141f23a",
        //         "name": {
        //             "fa": "???????????????????",
        //             "tu": "Yaz??l??m",
        //             "ar": "Software",
        //             "en": "Software"
        //         },
        //         "parent": "5e5e66dec87f80559141f237",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6710c87f80559141f239",
        //         "name": {
        //             "fa": "???????? ?????????? ?? ??????????????",
        //             "tu": "Okul ve ??niversite Dersleri",
        //             "ar": "???????????? ?????????????? ??????????????????",
        //             "en": "School and University Courses"
        //         },
        //         "parent": "5e5e66dec87f80559141f237",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6701c87f80559141f238",
        //         "name": {
        //             "fa": "???????? ??????????",
        //             "tu": "yabanc?? dil",
        //             "ar": "?????? ????????????",
        //             "en": "foreign language"
        //         },
        //         "parent": "5e5e66dec87f80559141f237",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e66dec87f80559141f237",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "e??itici",
        //             "ar": "??????????",
        //             "en": "educational"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e66ccc87f80559141f236",
        //         "name": {
        //             "fa": "?????????????? ?? ????????????????",
        //             "tu": "bah??ecilik ve a??a?? dikimi",
        //             "ar": "?????????????? ???????????? ??????????????",
        //             "en": "horticulture and tree planting"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e66b7c87f80559141f235",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "t??mar",
        //             "ar": "grooming",
        //             "en": "grooming"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e66a1c87f80559141f234",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "E??lence",
        //             "ar": "Entertainment",
        //             "en": "Entertainment"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e668bc87f80559141f233",
        //         "name": {
        //             "fa": "???????????????? ?? ????????????",
        //             "tu": "Kuaf??r ve G??zellik",
        //             "ar": "?????????? ?????????? ??????????????",
        //             "en": "Hairdresser and Beauty"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e666bc87f80559141f232",
        //         "name": {
        //             "fa": "???????? ?? ??????????",
        //             "tu": "El Sanatlar?? ve Beceriler",
        //             "ar": "?????????? ??????????????????",
        //             "en": "Crafts and Skills"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6657c87f80559141f231",
        //         "name": {
        //             "fa": "?????? ?? ??????",
        //             "tu": "ta????ma",
        //             "ar": "transport",
        //             "en": "transport"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e662bc87f80559141f230",
        //         "name": {
        //             "fa": "?????????????? ??????????????????? ?? ??????????????????? ???????? ????????????",
        //             "tu": "Cep Telefonu Yaz??l??m ve Donan??m Onar??m??",
        //             "ar": "?????????? ?????????? ???????????? ?????????????? ????????????????",
        //             "en": "Mobile Phone Software and Hardware Repair"
        //         },
        //         "parent": "5e5e65c8c87f80559141f22a",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e661ec87f80559141f22f",
        //         "name": {
        //             "fa": "?????????? ??????????????????? ?? ??????????????????? ????????????????",
        //             "tu": "Bilgisayar Yaz??l??m ve Donan??m Hizmetleri",
        //             "ar": "?????????? ?????????????????? ????????????????",
        //             "en": "Computer Software and Hardware Services"
        //         },
        //         "parent": "5e5e65c8c87f80559141f22a",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6611c87f80559141f22e",
        //         "name": {
        //             "fa": "?????????? ?????????? ???????? ??????????????",
        //             "tu": "??nternet Geni?? Bant Hizmetleri",
        //             "ar": "?????????? ???????????????? ?????? ???????????? ????????????",
        //             "en": "Internet Broadband Services"
        //         },
        //         "parent": "5e5e65c8c87f80559141f22a",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6603c87f80559141f22d",
        //         "name": {
        //             "fa": "?????????????? ?? ?????????? ????????",
        //             "tu": "Web Hosting ve Tasar??m",
        //             "ar": "?????????????? ???????????? ??????????????",
        //             "en": "Web Hosting and Design"
        //         },
        //         "parent": "5e5e65c8c87f80559141f22a",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e65f2c87f80559141f22c",
        //         "name": {
        //             "fa": "???????? ?????????? ?? ????????",
        //             "tu": "Site ve Site Sat????lar??",
        //             "ar": "???????????? ???????????? ??????????????",
        //             "en": "Site and Site Sales"
        //         },
        //         "parent": "5e5e65c8c87f80559141f22a",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e65ddc87f80559141f22b",
        //         "name": {
        //             "fa": "????????/????????????????/????????",
        //             "tu": "Finans / Muhasebe / Sigorta",
        //             "ar": "?????????? / ???????????? / ??????????",
        //             "en": "Finance / Accounting / Insurance"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e65c8c87f80559141f22a",
        //         "name": {
        //             "fa": "?????????? ??????????????????? ?? ????????????",
        //             "tu": "Bilgisayar ve Mobil Hizmetler",
        //             "ar": "?????????? ?????????????????? ???????????????? ????????????????",
        //             "en": "Computer & Mobile Services"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e65bec87f80559141f229",
        //         "name": {
        //             "fa": "??????????????/??????????",
        //             "tu": "Kabul / T??ren",
        //             "ar": "?????????????? / ????????????",
        //             "en": "Reception / Ceremony"
        //         },
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e65aec87f80559141f228",
        //         "parent": "5e5e6055c87f80559141f1f9",
        //         "name": {
        //             "fa": "?????????? ?? ??????????",
        //             "tu": "motor ve makine",
        //             "ar": "???????????? ????????????",
        //             "en": "engine and machine"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6598c87f80559141f227",
        //         "name": {
        //             "fa": "?????????? ??????????????",
        //             "tu": "Bah??e Aletleri",
        //             "ar": "?????????? ??????????????",
        //             "en": "Gardening Tools"
        //         },
        //         "parent": "5e5e654fc87f80559141f222",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6589c87f80559141f226",
        //         "name": {
        //             "fa": "???????? ?? ??????????",
        //             "tu": "Bah??e ve sundurma",
        //             "ar": "???????????? ??????????????",
        //             "en": "Yard and porch"
        //         },
        //         "parent": "5e5e654fc87f80559141f222",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e657ec87f80559141f225",
        //         "name": {
        //             "fa": "????????????????",
        //             "tu": "mutfak",
        //             "ar": "kitchen",
        //             "en": "kitchen"
        //         },
        //         "parent": "5e5e654fc87f80559141f222",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e656ec87f80559141f224",
        //         "name": {
        //             "fa": "?????????? ?????????????? ?????????????? ?? ??????",
        //             "tu": "So??utma ve gazl?? ??s??tma sistemi",
        //             "ar": "???????? ?????????? ???????????? ??????????",
        //             "en": "Cooling and gas heating system"
        //         },
        //         "parent": "5e5e654fc87f80559141f222",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6563c87f80559141f223",
        //         "name": {
        //             "fa": "?????????? ?????????????? ?? ????????",
        //             "tu": "Sauna ve Banyo",
        //             "ar": "?????????? ??????????",
        //             "en": "Sauna & Bathroom"
        //         },
        //         "parent": "5e5e654fc87f80559141f222",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e654fc87f80559141f222",
        //         "name": {
        //             "fa": "?????????????? ?? ????????",
        //             "tu": "Bina ve avlu",
        //             "ar": "???????? ??????????",
        //             "en": "Building and yard"
        //         },
        //         "parent": "5e5e6043c87f80559141f1f8",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e653cc87f80559141f221",
        //         "name": {
        //             "fa": "??????????????",
        //             "tu": "onar??mlar",
        //             "ar": "repairs",
        //             "en": "repairs"
        //         },
        //         "parent": "5e5e6526c87f80559141f21f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6531c87f80559141f220",
        //         "name": {
        //             "fa": "?????????? ?? ?????????? ?? ??????",
        //             "tu": "temizlik ve diki?? ve ??t??",
        //             "ar": "?????????????? ???????????????? ??????????",
        //             "en": "cleaning and sewing and ironing"
        //         },
        //         "parent": "5e5e6526c87f80559141f21f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6526c87f80559141f21f",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "ara??",
        //             "ar": "tool",
        //             "en": "tool"
        //         },
        //         "parent": "5e5e6043c87f80559141f1f8",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e64fcc87f80559141f21e",
        //         "name": {
        //             "fa": "?????????? ???????????????? ?? ?????? ??????????",
        //             "tu": "??ama????r makinesi ve kurutucu",
        //             "ar": "?????????? ??????????",
        //             "en": "washing machine and dryer"
        //         },
        //         "parent": "5e5e63f8c87f80559141f219",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6437c87f80559141f21d",
        //         "name": {
        //             "fa": "?????????????????? ?? ??????",
        //             "tu": "Mikrodalga ve Gaz",
        //             "ar": "???????????????? ????????",
        //             "en": "Microwave & Gas"
        //         },
        //         "parent": "5e5e63f8c87f80559141f219",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e642bc87f80559141f21c",
        //         "name": {
        //             "fa": "?????????? ?????????? ?? ??????????????",
        //             "tu": "Yemekler",
        //             "ar": "??????????",
        //             "en": "Dishes"
        //         },
        //         "parent": "5e5e63f8c87f80559141f219",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e641ac87f80559141f21b",
        //         "name": {
        //             "fa": "?????????? ?? ??????????",
        //             "tu": "Buzdolab??",
        //             "ar": "??????????",
        //             "en": "Refrigerator"
        //         },
        //         "parent": "5e5e63f8c87f80559141f219",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e640bc87f80559141f21a",
        //         "name": {
        //             "fa": "?????????? ??????????????",
        //             "tu": "Bula????k makinesi",
        //             "ar": "?????????? ??????????",
        //             "en": "Dishwasher"
        //         },
        //         "parent": "5e5e63f8c87f80559141f219",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e63f8c87f80559141f219",
        //         "parent": "5e5e6043c87f80559141f1f8",
        //         "name": {
        //             "fa": "?????????? ????????????????",
        //             "tu": "Mutfak Gere??leri",
        //             "ar": "?????????? ????????????",
        //             "en": "Kitchen Appliances"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e624ac87f80559141f218",
        //         "name": {
        //             "fa": "?????? ???????????????? ?? ?????????? ?????????? ??????",
        //             "tu": "Televizyon Masalar?? ve Aksesuarlar??",
        //             "ar": "?????????? ?????????????????? ??????????????????",
        //             "en": "Television Desks and Accessories"
        //         },
        //         "parent": "5e5e61d3c87f80559141f20f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e623cc87f80559141f217",
        //         "name": {
        //             "fa": "???????????? ?? ?????????? ??????????",
        //             "tu": "Mobilya ve Sandalyeler",
        //             "ar": "???????? ????????????",
        //             "en": "Furniture and Chairs"
        //         },
        //         "parent": "5e5e61d3c87f80559141f20f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6223c87f80559141f216",
        //         "name": {
        //             "fa": "?????? ?? ???????? ????????",
        //             "tu": "Yatak ve Yatak",
        //             "ar": "???????? ??????????",
        //             "en": "Bed and Bed"
        //         },
        //         "parent": "5e5e61d3c87f80559141f20f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6215c87f80559141f215",
        //         "name": {
        //             "fa": "???????? ?? ????????????",
        //             "tu": "perdeler ve masa??st?? bilgisayarlar",
        //             "ar": "?????????? ????????????",
        //             "en": "curtains and desktops"
        //         },
        //         "parent": "5e5e61d3c87f80559141f20f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e620ac87f80559141f214",
        //         "name": {
        //             "fa": "?????? ?? ????????",
        //             "tu": "Gard??rop ve B??fe",
        //             "ar": "?????????? ?????????? ????????????",
        //             "en": "Wardrobe and Buffet"
        //         },
        //         "parent": "5e5e61d3c87f80559141f20f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6200c87f80559141f213",
        //         "name": {
        //             "fa": "?????? ?? ????????",
        //             "tu": "kilim ve hal??",
        //             "ar": "???????? ??????????",
        //             "en": "rugs and carpet"
        //         },
        //         "parent": "5e5e61d3c87f80559141f20f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e61f6c87f80559141f212",
        //         "name": {
        //             "fa": "?????? ?? ??????????",
        //             "tu": "masa ve sandalye",
        //             "ar": "?????????? ??????????",
        //             "en": "table and chair"
        //         },
        //         "parent": "5e5e61d3c87f80559141f20f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e61e9c87f80559141f211",
        //         "name": {
        //             "fa": "?????????? ??????????????",
        //             "tu": "Ayd??nlatma Aksesuarlar??",
        //             "ar": "???????????????? ??????????????",
        //             "en": "Lighting Accessories"
        //         },
        //         "parent": "5e5e61d3c87f80559141f20f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e61dfc87f80559141f210",
        //         "name": {
        //             "fa": "???????????? ?? ???????? ????????",
        //             "tu": "Dekoratif ve Sanat Eserleri",
        //             "ar": "?????????? ???????? ??????????????",
        //             "en": "Decorative and Artwork"
        //         },
        //         "parent": "5e5e61d3c87f80559141f20f",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e61d3c87f80559141f20f",
        //         "name": {
        //             "fa": "?????????? ?? ?????????????? ????????",
        //             "tu": "Ev Dekorasyonu",
        //             "ar": "?????????????? ??????????????",
        //             "en": "Home Decoration"
        //         },
        //         "parent": "5e5e6043c87f80559141f1f8",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e61b4c87f80559141f20e",
        //         "name": {
        //             "fa": "???????? ????????????",
        //             "tu": "masa??st?? telefonu",
        //             "ar": "???????? ??????????",
        //             "en": "desktop phone"
        //         },
        //         "parent": "5e5e6029c87f80559141f1f7",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6191c87f80559141f20d",
        //         "name": {
        //             "fa": "???????????? ????????????????",
        //             "tu": "CCTV",
        //             "ar": "CCTV",
        //             "en": "CCTV"
        //         },
        //         "parent": "5e5e6137c87f80559141f206",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6182c87f80559141f20c",
        //         "name": {
        //             "fa": "???????????????? ?? ????????????????",
        //             "tu": "TV ve Projekt??r",
        //             "ar": "TV & Projector",
        //             "en": "TV & Projector"
        //         },
        //         "parent": "5e5e6137c87f80559141f206",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6177c87f80559141f20b",
        //         "name": {
        //             "fa": "?????????? ?? ?????? ?????????? DVD",
        //             "tu": "Video ve DVD Oynat??c??",
        //             "ar": "???????? ?????????? DVD",
        //             "en": "Video and DVD Player"
        //         },
        //         "parent": "5e5e6137c87f80559141f206",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e616bc87f80559141f20a",
        //         "name": {
        //             "fa": "?????????? ???????? ??????????",
        //             "tu": "ev ses sistemi",
        //             "ar": "???????? ???????? ??????????",
        //             "en": "home audio system"
        //         },
        //         "parent": "5e5e6137c87f80559141f206",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e615cc87f80559141f209",
        //         "name": {
        //             "fa": "??????????????????? ??????????",
        //             "tu": "Mobil Oynat??c??",
        //             "ar": "Mobile Player",
        //             "en": "Mobile Player"
        //         },
        //         "parent": "5e5e6137c87f80559141f206",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6152c87f80559141f208",
        //         "name": {
        //             "fa": "???????????? ?????????? ?? ???????????????????????",
        //             "tu": "Video Kamera",
        //             "ar": "???????????? ??????????????",
        //             "en": "Camcorder"
        //         },
        //         "parent": "5e5e6137c87f80559141f206",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6146c87f80559141f207",
        //         "parent": "5e5e6137c87f80559141f206",
        //         "name": {
        //             "fa": "???????? ?? ????????????",
        //             "tu": "Filmler ve M??zik",
        //             "ar": "?????????? ??????????????",
        //             "en": "Movies and Music"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6137c87f80559141f206",
        //         "name": {
        //             "fa": "???????? ?? ????????????",
        //             "tu": "Ses ve Video",
        //             "ar": "?????????? ????????????????",
        //             "en": "Audio and Video"
        //         },
        //         "parent": "5e5e6029c87f80559141f1f7",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e611ac87f80559141f205",
        //         "name": {
        //             "fa": "???????????? ??????????? ?????????????? ?? ????????????",
        //             "tu": "Konsol, Video ve ??evrimi??i Oyun",
        //             "ar": "???????? ???????????? ???????????????? ???????????????? ?????? ????????????????",
        //             "en": "Console, Video and Online Game"
        //         },
        //         "parent": "5e5e6029c87f80559141f1f7",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e60fec87f80559141f204",
        //         "parent": "5e5e60b9c87f80559141f1ff",
        //         "name": {
        //             "fa": "????????????/??????????/??????/??????",
        //             "tu": "Yaz??c?? / Taray??c?? / Kopyalama / Faks",
        //             "ar": "?????????? / ???????? ???????? / ?????? / ????????",
        //             "en": "Printer / Scanner / Copy / Fax"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e60f3c87f80559141f203",
        //         "name": {
        //             "fa": "???????? ?? ?????????????? ????????",
        //             "tu": "Modem ve A?? Donan??m??",
        //             "ar": "???????????? ???????????? ????????????",
        //             "en": "Modem and Network Equipment"
        //         },
        //         "parent": "5e5e60b9c87f80559141f1ff",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e60e3c87f80559141f202",
        //         "name": {
        //             "fa": "?????????? ?? ?????????? ??????????",
        //             "tu": "Par??alar ve Aksesuarlar",
        //             "ar": "?????? ???????? ????????????????????",
        //             "en": "Parts and Accessories"
        //         },
        //         "parent": "5e5e60b9c87f80559141f1ff",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e60d8c87f80559141f201",
        //         "name": {
        //             "fa": "???????????? ????????????",
        //             "tu": "Masa??st?? Bilgisayar",
        //             "ar": "?????????????? ?????? ????????????",
        //             "en": "Desktop Computer"
        //         },
        //         "parent": "5e5e60b9c87f80559141f1ff",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e60cac87f80559141f200",
        //         "name": {
        //             "fa": "???????????? ??????????",
        //             "tu": "mobil",
        //             "ar": "mobile",
        //             "en": "mobile"
        //         },
        //         "parent": "5e5e60b9c87f80559141f1ff",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e60b9c87f80559141f1ff",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "bilgisayar",
        //             "ar": "??????????????",
        //             "en": "computer"
        //         },
        //         "parent": "5e5e6029c87f80559141f1f7",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e60a2c87f80559141f1fe",
        //         "name": {
        //             "fa": "?????? ????????",
        //             "tu": "SIM",
        //             "ar": "SIM",
        //             "en": "SIM"
        //         },
        //         "parent": "5e5e6076c87f80559141f1fa",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6096c87f80559141f1fd",
        //         "name": {
        //             "fa": "?????????? ?????????? ???????????? ?? ????????",
        //             "tu": "Mobil ve Tablet Aksesuarlar??",
        //             "ar": "???????????? ???????????? ?????????????? ???????????????????? ????????????",
        //             "en": "Mobile & Tablet Accessories"
        //         },
        //         "parent": "5e5e6076c87f80559141f1fa",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e608bc87f80559141f1fc",
        //         "parent": "5e5e6076c87f80559141f1fa",
        //         "name": {
        //             "fa": "????????",
        //             "tu": "tablet",
        //             "ar": "tablet",
        //             "en": "tablet"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6082c87f80559141f1fb",
        //         "name": {
        //             "fa": "???????? ????????????",
        //             "tu": "cep telefonu",
        //             "ar": "???????? ??????????",
        //             "en": "mobile phone"
        //         },
        //         "parent": "5e5e6076c87f80559141f1fa",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6076c87f80559141f1fa",
        //         "name": {
        //             "fa": "???????????? ?? ????????",
        //             "tu": "Mobil ve Tablet",
        //             "ar": "?????????????? ???????????????? ??????????????",
        //             "en": "Mobile & Tablet"
        //         },
        //         "parent": "5e5e6029c87f80559141f1f7",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6055c87f80559141f1f9",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "Hizmetler",
        //             "ar": "??????????????",
        //             "en": "Services"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6043c87f80559141f1f8",
        //         "name": {
        //             "fa": "?????????? ???? ????????",
        //             "tu": "ev ile ilgili",
        //             "ar": "?????? ?????? ??????????????",
        //             "en": "home related"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e6029c87f80559141f1f7",
        //         "name": {
        //             "fa": "?????????? ????????????????????",
        //             "tu": "elektronik",
        //             "ar": "????????????????????",
        //             "en": "electronics"
        //         },
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5fa6c87f80559141f1f6",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "a????r",
        //             "ar": "????????",
        //             "en": "heavy"
        //         },
        //         "parent": "5e5e5c84c87f80559141f1ef",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5f68c87f80559141f1f5",
        //         "name": {
        //             "fa": "?????????????????",
        //             "tu": "Kiralama",
        //             "ar": "??????????",
        //             "en": "Rental"
        //         },
        //         "parent": "5e5e5c84c87f80559141f1ef",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5f4dc87f80559141f1f4",
        //         "name": {
        //             "fa": "????????????",
        //             "tu": "klasik",
        //             "ar": "??????????????",
        //             "en": "classic"
        //         },
        //         "parent": "5e5e5c84c87f80559141f1ef",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5f2fc87f80559141f1f3",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "binicilik",
        //             "ar": "????????",
        //             "en": "riding"
        //         },
        //         "parent": "5e5e5c84c87f80559141f1ef",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5effc87f80559141f1f2",
        //         "name": {
        //             "fa": "???????? ?? ?????????? ??????????",
        //             "tu": "Tekneler ve Aksesuarlar",
        //             "ar": "?????????? ????????????????????",
        //             "en": "Boats and Accessories"
        //         },
        //         "parent": "5e5b78ea596ddb1e01531472",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5ef0c87f80559141f1f1",
        //         "name": {
        //             "fa": "???????????????????? ?? ?????????? ??????????",
        //             "tu": "Motosiklet ve Aksesuarlar??",
        //             "ar": "???????????? ?????????? ????????????????????????",
        //             "en": "Motorcycle & Accessories"
        //         },
        //         "parent": "5e5b78ea596ddb1e01531472",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5ee2c87f80559141f1f0",
        //         "name": {
        //             "fa": "?????????? ???????? ?? ?????????? ?????????? ??????????",
        //             "tu": "Otomobil Par??alar?? ve Aksesuarlar??",
        //             "ar": "?????? ???????? ???????????????? ????????????????????????",
        //             "en": "Auto Parts and Accessories"
        //         },
        //         "parent": "5e5b78ea596ddb1e01531472",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5c84c87f80559141f1ef",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "araba",
        //             "ar": "car",
        //             "en": "car"
        //         },
        //         "parent": "5e5b78ea596ddb1e01531472",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5af2c87f80559141f1ee",
        //         "name": {
        //             "fa": "?????????????????",
        //             "tu": "sat??c??",
        //             "ar": "????????",
        //             "en": "reseller"
        //         },
        //         "parent": "5e5e599cc87f80559141f1dc",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5ae4c87f80559141f1ed",
        //         "name": {
        //             "fa": "???????? ???????? ?? ??????????",
        //             "tu": "Finans ve Hukuk",
        //             "ar": "Finance and Legal",
        //             "en": "Finance and Legal"
        //         },
        //         "parent": "5e5e599cc87f80559141f1dc",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5ad3c87f80559141f1ec",
        //         "name": {
        //             "fa": "???????????? ???? ????????",
        //             "tu": "Olu??turmaya Katk??da Bulunun",
        //             "ar": "???????? ???? ????????????",
        //             "en": "Contribute to Build"
        //         },
        //         "parent": "5e5e599cc87f80559141f1dc",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5ac5c87f80559141f1eb",
        //         "name": {
        //             "fa": "?????????? ??????????",
        //             "tu": "Emlak Ofisi",
        //             "ar": "?????????????? ????????????????",
        //             "en": "Real Estate Agency"
        //         },
        //         "parent": "5e5e599cc87f80559141f1dc",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5aa7c87f80559141f1ea",
        //         "name": {
        //             "fa": "???????? ?????? ?? ???????? ????????????",
        //             "tu": "Ofis ve E??itim Alan??",
        //             "ar": "?????????? ???????????? ????????????????",
        //             "en": "Office and Training Space"
        //         },
        //         "parent": "5e5e5982c87f80559141f1db",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5a7ec87f80559141f1e9",
        //         "name": {
        //             "fa": "???????? ?? ??????",
        //             "tu": "villa ve bah??e",
        //             "ar": "???????? ????????????",
        //             "en": "villa and garden"
        //         },
        //         "parent": "5e5e5982c87f80559141f1db",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5a72c87f80559141f1e8",
        //         "name": {
        //             "fa": "???????????????? ?? ??????????",
        //             "tu": "Daire ve S??it",
        //             "ar": "Apartment & Suite",
        //             "en": "Apartment & Suite"
        //         },
        //         "parent": "5e5e5982c87f80559141f1db",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5a61c87f80559141f1e7",
        //         "name": {
        //             "fa": "??????????????? ?????????????? ?? ??????????",
        //             "tu": "End??striyel, Tar??msal ve Ticari",
        //             "ar": "???????????? ?????????????? ??????????????",
        //             "en": "Industrial, Agricultural and Commercial"
        //         },
        //         "parent": "5e5e5972c87f80559141f1da",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5a52c87f80559141f1e6",
        //         "name": {
        //             "fa": "?????????? ?? ????????",
        //             "tu": "ma??aza ve kabin",
        //             "ar": "???????? ????????",
        //             "en": "shop and booth"
        //         },
        //         "parent": "5e5e5972c87f80559141f1da",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5a3ec87f80559141f1e5",
        //         "name": {
        //             "fa": "???????? ???????? ???????? ?????????? ?? ??????",
        //             "tu": "ofis, ofis ve ofis",
        //             "ar": "???????????? ?????????????? ??????????????",
        //             "en": "office, office and office"
        //         },
        //         "parent": "5e5e5972c87f80559141f1da",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5a27c87f80559141f1e4",
        //         "name": {
        //             "fa": "??????????????? ?????????????? ?? ??????????",
        //             "tu": "End??striyel, Tar??msal ve Ticari",
        //             "ar": "???????????? ?????????????? ??????????????",
        //             "en": "Industrial, Agricultural and Commercial"
        //         },
        //         "parent": "5e57e3dcc2a97ec9dde7f1c5",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5a1cc87f80559141f1e3",
        //         "name": {
        //             "fa": "?????????? ?? ????????",
        //             "tu": "ma??aza ve kabin",
        //             "ar": "???????? ????????",
        //             "en": "shop and booth"
        //         },
        //         "parent": "5e57e3dcc2a97ec9dde7f1c5",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5a0dc87f80559141f1e2",
        //         "name": {
        //             "fa": "???????? ???????? ???????? ?????????? ?? ??????",
        //             "tu": "ofis, ofis ve ofis",
        //             "ar": "???????????? ?????????????? ??????????????",
        //             "en": "office, office and office"
        //         },
        //         "parent": "5e57e3dcc2a97ec9dde7f1c5",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e59f7c87f80559141f1e1",
        //         "name": {
        //             "fa": "???????? ?? ????????",
        //             "tu": "Ev ve Villa",
        //             "ar": "???????????? ??????????????",
        //             "en": "Home and Villa"
        //         },
        //         "parent": "5e57e20ac2a97ec9dde7f1c4",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e59ebc87f80559141f1e0",
        //         "name": {
        //             "fa": "????????????????",
        //             "tu": "daire",
        //             "ar": "apartment",
        //             "en": "apartment"
        //         },
        //         "parent": "5e57e20ac2a97ec9dde7f1c4",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e59cdc87f80559141f1df",
        //         "name": {
        //             "fa": "???????? ?? ??????????",
        //             "tu": "D??nya ve Koloni",
        //             "ar": "?????????? ????????????????????",
        //             "en": "Earth and Colony"
        //         },
        //         "parent": "5e57deb3c2a97ec9dde7f1c3",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e59bec87f80559141f1de",
        //         "name": {
        //             "fa": "???????? ?? ????????",
        //             "tu": "Ev ve Villa",
        //             "ar": "???????????? ??????????????",
        //             "en": "Home and Villa"
        //         },
        //         "parent": "5e57deb3c2a97ec9dde7f1c3",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e59b3c87f80559141f1dd",
        //         "name": {
        //             "fa": "????????????????",
        //             "tu": "daire",
        //             "ar": "apartment",
        //             "en": "apartment"
        //         },
        //         "parent": "5e57deb3c2a97ec9dde7f1c3",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e599cc87f80559141f1dc",
        //         "name": {
        //             "fa": "?????????? ??????????",
        //             "tu": "Gayrimenkul Hizmetleri",
        //             "ar": "?????????????? ????????????????",
        //             "en": "Real Estate Services"
        //         },
        //         "parent": "5e57dd1cc2a97ec9dde7f1c2",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5982c87f80559141f1db",
        //         "name": {
        //             "fa": "?????????? ?????????? ??????",
        //             "tu": "k??sa s??reli kiralama",
        //             "ar": "?????????? ???????? ??????????",
        //             "en": "short term rental"
        //         },
        //         "parent": "5e57dd1cc2a97ec9dde7f1c2",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5e5972c87f80559141f1da",
        //         "name": {
        //             "fa": "?????????? ?????????? ?? ??????????",
        //             "tu": "Ticari ve Ticari Kiralama",
        //             "ar": "?????????? ?????????? ????????????",
        //             "en": "Commercial & Commercial Rental"
        //         },
        //         "parent": "5e57dd1cc2a97ec9dde7f1c2",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5b78ea596ddb1e01531472",
        //         "name": {
        //             "fa": "?????????? ??????????",
        //             "tu": "Ara??lar",
        //             "ar": "????????????????",
        //             "en": "Vehicles"
        //         },
        //         "slug": "estate",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e5b78e4596ddb1e01531471",
        //         "name": {
        //             "fa": "?????????????? ?? ??????????????",
        //             "tu": "istihdam ve istihdam",
        //             "ar": "?????????????? ????????????????",
        //             "en": "employment and employment"
        //         },
        //         "slug": "estate",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e57e3dcc2a97ec9dde7f1c5",
        //         "name": {
        //             "fa": "???????? ?????????? ??????????",
        //             "tu": "ticari ofis sat??????",
        //             "ar": "?????? ?????????? ????????????",
        //             "en": "commercial office sale"
        //         },
        //         "slug": "commercial-office-sale",
        //         "parent": "5e57dd1cc2a97ec9dde7f1c2",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "5e57e20ac2a97ec9dde7f1c4",
        //         "name": {
        //             "fa": "?????????? ????????????",
        //             "tu": "Konut Kiralama",
        //             "ar": "?????????? ????????",
        //             "en": "Residential Rental"
        //         },
        //         "slug": "residential-rental-property",
        //         "__v": 0,
        //         "parent": "5e57dd1cc2a97ec9dde7f1c2"
        //     },
        //     {
        //         "_id": "5e57deb3c2a97ec9dde7f1c3",
        //         "name": {
        //             "fa": "???????? ????????????",
        //             "tu": "Konut Sat????lar??",
        //             "ar": "???????????? ??????????",
        //             "en": "Residential Sales"
        //         },
        //         "slug": "residential-property-sale",
        //         "__v": 0,
        //         "parent": "5e57dd1cc2a97ec9dde7f1c2"
        //     },
        //     {
        //         "_id": "5e57dd1cc2a97ec9dde7f1c2",
        //         "name": {
        //             "fa": "??????????",
        //             "tu": "emlak",
        //             "ar": "????????????",
        //             "en": "real estate"
        //         },
        //         "slug": "estate",
        //         "__v": 0
        //     }
        // ];
        // Category.create(s, function (err, category) {
        //     if (err || !category) {
        //         res.json({
        //             err: err,
        //             success: false,
        //             message: 'error!'
        //         });
        //         return 0;
        //     }
        //     res.json(category);
        //     return 0;
        //
        // });
        // let count = 0;
        // let j = [];
        // _.forEach(s, (obj, i) => {
        //     // if(i>=150&&i<200) {
        //     //     j.push({
        //     //         // fa:obj.name.fa,
        //     //         _id:obj._id,
        //     //         ar: obj.name.fa
        //     //     })
        //     // }
        //     if (req.body[i]._id == s[i]._id)
        //         s[i].name = {
        //             "fa": obj.name.fa,
        //             // "en":obj.name.fa,
        //             // "ar":obj.name.fa,
        //             "tu": obj.name.tu,
        //             "ar": req.body[i].ar,
        //             "en": obj.name.en
        //         }
        //
        //
        // })
        // res.json({
        //     res:req.body,
        //     count:count
        // });
        res.json(s);
        return 0;


        // });
    }
    ,
    create: function (req, res, next) {
        // console.log('creating category...', req.body);
      if(req.body.parent=="")
        delete req.body.parent
        Category.create(req.body, function (err, category) {
            if (err || !category) {
                res.json({
                    err: err,
                    success: false,
                    message: 'error!'
                });
                return 0;
            }
            res.json(category);
            return 0;

        });
    }
    ,
    destroy: function (req, res, next) {
        Category.findByIdAndDelete(req.params.id,
            function (err, category) {
                if (err || !category) {
                    res.json({
                        success: false,
                        message: 'error!'
                    });
                    return 0;
                }
                res.json({
                    success: true,
                    message: 'Deleted!'
                });
                return 0;


            }
        );
    }
    ,
    edit: function (req, res, next) {
        Category.findByIdAndUpdate(req.params.id, req.body, function (err, category) {
            if (err || !category) {
                res.json({
                    success: false,
                    message: 'error!',
                  err:err
                });
                return 0;
            }

            res.json(category);
            return 0;

        });
    }
    ,
    count: function (req, res, next) {
        Category.countDocuments({}, function (err, count) {
            // console.log('countDocuments', count);
            if (err || !count) {
                res.json({
                    success: false,
                    message: 'error!'
                });
                return 0;
            }

            res.json({
                success: true,
                count: count
            });
            return 0;


        });
    }
    ,


});
export default self;
