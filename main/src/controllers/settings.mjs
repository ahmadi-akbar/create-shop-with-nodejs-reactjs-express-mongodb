import Settings from '#models/settings';
import global from '#root/global';

var self = ( {
    all: function (req, res, next) {
        let offset = 0;
        if (req.params.offset) {
            offset = parseInt(req.params.offset);
        }

        Settings.find(function (err, settingss) {

            if (err || !settingss) {
                res.json({
                    success: false,
                    message: 'error!'
                });
                return 0;
            }
            Settings.countDocuments({}, function (err, count) {
                console.log('countDocuments', count);
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
                res.json(settingss);
                return 0;


            });

        }).skip(offset).sort({_id: -1}).limit(parseInt(req.params.limit));
    },
    last: function (req, res, next) {
        console.log('last setting ==> ');
        let offset = 0;
        if (req.params.offset) {
            offset = parseInt(req.params.offset);
        }

        Settings.find(function (err, settingss) {
            // console.log('Settings find==> ');

            if (err || !settingss) {
                res.json({
                    success: false,
                    message: 'error!'
                });
                return 0;
            }
            // console.log('settingss',settingss);
            if (settingss && settingss[0] && settingss[0].data)
                res.json(settingss[0].data);
            else
                res.json([]);
            return 0;


        }).skip(offset).sort({_id: -1}).limit(1);
        // res.json([]);
    },
    submitDollarPrice: function (req, res, next) {
        let offset = 0;
        if (req.params.offset) {
            offset = parseInt(req.params.offset);
        }

        Settings.find(function (err, settingss) {

            if (err || !settingss) {
                res.json({
                    success: false,
                    message: 'error!'
                });
                return 0;
            }
            console.log('dollar price',req.params.price);
            if (settingss && settingss[0] && settingss[0].data) {
                Settings.findByIdAndUpdate(settingss[0]._id, {
                    dollarPrice:req.params.price
                }, function (err, settings) {
                    if (err || !settings) {
                        res.json({
                            success: false,
                            message: 'error!',
                            err: err
                        });
                        return 0;
                    }

                    res.json(settings);
                    return 0;


                });
            } else
                res.json([]);
            return 0;


        }).skip(offset).sort({_id: -1}).limit(1);
    },
    submitDerhamPrice: function (req, res, next) {
        let offset = 0;
        if (req.params.offset) {
            offset = parseInt(req.params.offset);
        }

        Settings.find(function (err, settingss) {

            if (err || !settingss) {
                res.json({
                    success: false,
                    message: 'error!'
                });
                return 0;
            }
            console.log('dollar price',req.params.price);
            if (settingss && settingss[0] && settingss[0].data) {
                Settings.findByIdAndUpdate(settingss[0]._id, {
                    derhamPrice:req.params.price
                }, function (err, settings) {
                    if (err || !settings) {
                        res.json({
                            success: false,
                            message: 'error!',
                            err: err
                        });
                        return 0;
                    }

                    res.json(settings);
                    return 0;


                });
            } else
                res.json([]);
            return 0;


        }).skip(offset).sort({_id: -1}).limit(1);
    },
    dollar: function (req, res, next) {
        console.log('get dollar');
        let offset = 0;
        if (req.params.offset) {
            offset = parseInt(req.params.offset);
        }

        Settings.find({},'dollarPrice derhamPrice',function (err, settingss) {

            if (err || !settingss) {
                res.json({
                    success: false,
                    message: 'error!',
                    err:err
                });
                return 0;
            }
            console.log('dollar price' ,settingss);
            if (settingss && settingss[0] && settingss[0].dollarPrice) {
                res.json({"dollarPrice":settingss[0].dollarPrice,"derhamPrice":settingss[0].derhamPrice});

            } else
                res.json([]);
            return 0;


        }).skip(offset).sort({_id: -1}).limit(1);
    },
    viewOne: function (req, res, next) {

        Settings.findById(req.params.id,
            function (err, settings) {
                if (err || !settings) {
                    res.json({
                        success: false,
                        message: 'error!'
                    });
                    return 0;
                }
                res.json(settings);
                return 0;

            });
    },
    siteStatus: function (req, res, next) {

        global.checkSiteStatus().then(function (response) {
            res.json(response);
        }).catch(function (err) {
            res.json(err);
        });
    },
    update: function (req, res, next) {


            res.json({
                success:false
            });

    },
    create: function (req, res, next) {
        // return new Promise(function (resolve, reject) {
        console.log('settings create');
        Settings.create(req.body, function (err, settings) {
            if (err || !settings) {
                res.json({
                    err: err,
                    success: false,
                    message: 'error!'
                });
                return 0;
            }
            res.json(settings);
            return 0;
        });
        // });

    },
    destroy: function (req, res, next) {
        Settings.findByIdAndDelete(req.params.id,
            function (err, settings) {
                if (err || !settings) {
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

    },
    edit: function (req, res, next) {
        Settings.findByIdAndUpdate(req.params.id, req.body, function (err, settings) {
            if (err || !settings) {
                res.json({
                    success: false,
                    message: 'error!',
                    err: err
                });
                return 0;
            }

            res.json(settings);
            return 0;


        });
    },
    count: function (req, res, next) {
        Settings.countDocuments({}, function (err, count) {
            console.log('countDocuments', count);
            if (err) {
                res.json({
                    success: false,
                    err: err
                })

            }
            res.json({
                success: true,
                count: count
            })


        });
    },

});
export default self;