import Post from "#models/post";
import Media from "#models/media";
<<<<<<< HEAD
import global from '#root/global';
=======
import global from "#root/global";
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
import requestIp from "request-ip";
import _ from "lodash";

var self = ({
  all: function(req, res, next) {
<<<<<<< HEAD
    console.log("kjhgfdsdfgh");
=======
    // console.log("kjhgfdsdfgh");
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    let offset = 0;
    if (req.params.offset) {
      offset = parseInt(req.params.offset);
    }

    let search = {};
    if (req.query.type) {
      search["type"] = req.query.type;
    } else {
      search["type"] = "";
    }
    Post.find(search, function(err, posts) {
      if (err || !posts) {
        res.json({
          success: false,
          message: "error!"
        });
        return 0;
      }
      Post.countDocuments(search, function(err, count) {
<<<<<<< HEAD
        console.log("countDocuments", count);
=======
        // console.log("countDocuments", count);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        if (err || !count) {
          res.json({
            success: false,
            message: "error!"
          });
          return 0;
        }
        res.setHeader(
          "X-Total-Count",
          count
        );
        res.json(posts);
        return 0;


      });

    }).skip(offset).sort({ createdAt: -1 }).limit((req.params.limit));
  },
  allW: function(req, res, next) {
<<<<<<< HEAD
    console.log("jhgfdghjk", req.query.search);
=======
    // conso/le.log("jhgfdghjk", req.query.search);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    let offset = 0;
    if (req.params.offset) {
      offset = parseInt(req.params.offset);
    }

    let search = {};
    search["status"] = "published";

    search["title." + req.headers.lan] = {
      $exists: true
      // "$regex": req.query.search,
      // "$options": "i"
    };
    // search["description." + req.headers.lan] = {
    //   $exists: true
    // };
    if (req.query.search) {


      // search = {"title":{
      //
      //         [req.headers.lan]:{"$regex": req.query.search, "$options": "i"}
      //     }};

      search["title." + req.headers.lan] = {
        $exists: true,
        "$regex": req.query.search,
        "$options": "i"
      };


    }

<<<<<<< HEAD
    search["kind"]='post';
    console.log(search);
    Post.find(search, "_id title updatedAt createdAt status  excerpt", function(err, posts) {
=======
    search["kind"] = "post";
    // console.log(search);
    Post.find(search, "_id title updatedAt createdAt status  excerpt thumbnail", function(err, posts) {
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      if (err || !posts) {
        res.json([]);
        return 0;
      }
      Post.countDocuments(search, function(err, count) {
<<<<<<< HEAD
        console.log("countDocuments", count);
=======
        // console.log("countDocuments", count);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        if (err || !count) {
          res.json([]);
          return 0;
        }
        res.setHeader(
          "X-Total-Count",
          count
        );
        res.json(posts);
        return 0;


      });

    }).skip(offset).sort({ createdAt: -1 }).limit(parseInt(req.params.limit)).lean();
  },
  allS: function(req, res, next) {
    return new Promise(function(resolve, reject) {
<<<<<<< HEAD
      console.log("jhgfdghjk", req.query.search);
=======
      // console.log("jhgfdghjk", req.query.search);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      let offset = 0;
      if (req.params.offset) {
        offset = parseInt(req.params.offset);
      }

      let search = {};
      search["status"] = "published";

      search["title." + req.headers.lan] = {
        $exists: true
        // "$regex": req.query.search,
        // "$options": "i"
      };
      search["description." + req.headers.lan] = {
        $exists: true
      };
      if (req.query.search) {


        // search = {"title":{
        //
        //         [req.headers.lan]:{"$regex": req.query.search, "$options": "i"}
        //     }};

        search["title." + req.headers.lan] = {
          $exists: true,
          "$regex": req.query.search,
          "$options": "i"
        };


      }
      if (req.query.type) {
        search["type"] = req.query.type;
      }
<<<<<<< HEAD
      console.log(search);
=======
      // console.log(search);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      Post.find(search, "_id title updatedAt status catChoosed firstCategory files price type", function(err, posts) {
        if (err || !posts) {
          resolve([]);
          return 0;
        }
        Post.countDocuments(search, function(err, count) {
<<<<<<< HEAD
          console.log("countDocuments", count);
=======
          // console.log("countDocuments", count);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
          if (err || !count) {
            resolve([]);

            return 0;
          }
          res.setHeader(
            "X-Total-Count",
            count
          );
          _.forEach(posts, (c) => {
            c.title = c["title"][req.headers.lan];
            c.firstCategory = {
              _id: c.firstCategory._id,
              name: c["catChoosed"][0]["name"]
            };
            delete c.catChoosed;
            if (c.files) {
              _.forEach(c.files, (f) => {
                if (f)
                  if (f.type === "image/jpeg" || f.type === "image/png") {
                    c.backgroundImage = f.url;

                    delete c.files;

                    return;
                  }

              });
            }
            // c.firstCategory.name = c['catChoosed'][0]['name'];
          });
          // _.forEach(posts, (c) => {
          //     console.log(c.title)
          //     // c.description =c['description'][req.headers.lan];
          // });
          // posts.map(resource => ({ ...resource, id: resource._id }))
          resolve(posts);
          // return 0;


        });

      }).skip(offset).sort({ createdAt: -1 }).limit(parseInt(req.params.limit)).lean();
    });
  },
  postsByCat: function(req, res, next) {
<<<<<<< HEAD
    console.log("postsByCat...");
    console.log("jhgfdghjk", req.query.search);
=======
    // console.log("postsByCat...");
    // console.log("jhgfdghjk", req.query.search);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    let offset = 0;
    if (req.params.offset) {
      offset = parseInt(req.params.offset);
    }

    let search = {};
    if (req.query.type) {
      search["type"] = req.query.type;
    }
    search["status"] = "published";
    search["$or"] = [{
      firstCategory: req.params._id
    }, {
      secondCategory: req.params._id
    }, {
      thirdCategory: req.params._id
    }];
    if (req.query.search) {

      search = { "title": { "$regex": req.query.search, "$options": "i" } };


    }
<<<<<<< HEAD
    console.log(search);
=======
    // console.log(search);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    search["title." + req.headers.lan] = {
      $exists: true
    };
    search["description." + req.headers.lan] = {
      $exists: true
    };

    if (req.query.country) {

      search["country"] = req.query.country;

    }
    // '_id title photos updatedAt createdAt status',
    Post.find(search, "_id title updatedAt createdAt status catChoosed countryChoosed firstCategory files price type", function(err, posts) {
      if (err) {
        res.json([]);
        return 0;
      }
      if (!posts) {
        posts = [];
      }
      Post.countDocuments(search, function(err, count) {
<<<<<<< HEAD
        console.log("countDocuments", count);
=======
        // console.log("countDocuments", count);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        if (err) {
          res.json([]);
          return 0;
        }
        if (!count) {
          count = 0;
        }
        res.setHeader(
          "X-Total-Count",
          count
        );
        _.forEach(posts, (c) => {
          //     c.title = c['title'][req.headers.lan];
          //     c.description = c['description'][req.headers.lan];
          //     c.firstCategory.name = c['firstCategory']['name'][req.headers.lan];
          //
          c.title = c["title"][req.headers.lan];
          c.firstCategory = {
            _id: c.firstCategory._id,
            name: c["catChoosed"][0]["name"]
          };
          delete c.catChoosed;
          if (c.files) {
            _.forEach(c.files, (f) => {
              if (f.type === "image/jpeg" || f.type === "image/png") {
                c.backgroundImage = f.url;
                delete c.files;

                return;
              }

            });
          }
        });

        // posts.map(resource => ({ ...resource, id: resource._id }))
        res.json(posts);
        return 0;


      });

    }).skip(offset).sort({ createdAt: -1 }).limit(parseInt(req.params.limit)).lean();
  },
  postsByCatS: function(req, res, next) {
    return new Promise(function(resolve, reject) {


      let offset = 0;
      if (req.params.offset) {
        offset = parseInt(req.params.offset);
      }

      let search = {};
      search["status"] = "published";
      search["$or"] = [{
        firstCategory: req.params._id
      }, {
        secondCategory: req.params._id
      }, {
        thirdCategory: req.params._id
      }];
      if (req.query.search) {

        search = { "title": { "$regex": req.query.search, "$options": "i" } };


      }
<<<<<<< HEAD
      console.log(search);
=======
      // console.log(search);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      search["title." + req.headers.lan] = {
        $exists: true
      };
      search["description." + req.headers.lan] = {
        $exists: true
      };
      if (req.query.type) {
        search["type"] = req.query.type;
      }
      // '_id title photos updatedAt createdAt status',
      Post.find(search, "_id title updatedAt createdAt status catChoosed firstCategory files type price", function(err, posts) {
        if (err) {
          resolve([]);

        }
        if (!posts) {
          posts = [];
        }
        Post.countDocuments(search, function(err, count) {
<<<<<<< HEAD
          console.log("countDocuments", count);
=======
          // console.log("countDocuments", count);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
          if (err) {
            resolve([]);
          }
          if (!count) {
            count = 0;
          }
          res.setHeader(
            "X-Total-Count",
            count
          );
          _.forEach(posts, (c) => {
            //     c.title = c['title'][req.headers.lan];
            //     c.description = c['description'][req.headers.lan];
            //     c.firstCategory.name = c['firstCategory']['name'][req.headers.lan];
            //
            c.title = c["title"][req.headers.lan];
            c.firstCategory = {
              _id: c.firstCategory._id,
              name: c["catChoosed"][0]["name"]
            };
            delete c.catChoosed;
            if (c.files) {
              _.forEach(c.files, (f) => {
                if (f.type === "image/jpeg" || f.type === "image/png") {
                  c.backgroundImage = f.url;
                  delete c.files;

                  return;
                }

              });
            }
          });

          // posts.map(resource => ({ ...resource, id: resource._id }))
          resolve(posts);
          return 0;


        });

      }).skip(offset).sort({ createdAt: -1 }).limit(parseInt(req.params.limit)).lean();
    });
  },
  allWCustomer: function(req, res, next) {
<<<<<<< HEAD
    console.log("allWCustomer");
=======
    // console.log("allWCustomer");
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    let offset = 0;
    if (req.params.offset) {
      offset = parseInt(req.params.offset);
    }

    let search = {};
    search["title." + req.headers.lan] = {
      $exists: true
    };
    search["description." + req.headers.lan] = {
      $exists: true
    };
    search["customer"] = req.headers.customer._id;
    // search['status']='published';
    if (req.query.type) {
      search["type"] = req.query.type;
    }
    Post.find(search, "_id title photos updatedAt createdAt status views getContactData price type files", function(err, posts) {
      if (err || !posts) {
        res.json([]);
        return 0;
      }

      Post.countDocuments(search, function(err, count) {
<<<<<<< HEAD
        console.log("countDocuments", count);
=======
        // console.log("countDocuments", count);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        if (err || !count) {
          res.json([]);
          return 0;
        }
        res.setHeader(
          "X-Total-Count",
          count
        );

        _.forEach(posts, (c) => {
<<<<<<< HEAD
          console.log(c.title);
=======
          // console.log(c.title);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
          // c.views = 0;
          c.title = c["title"][req.headers.lan];
          // console.log('views', c.views);

          if (c.views) {

            c.views = c.views.length;
          } else {
            c.views = 0;
          }
          if (c.getContactData) {

            c.getContactData = c.getContactData.length;
          } else {
            c.getContactData = 0;
          }
          // c.description =c['description'][req.headers.lan];
        });
        // posts.map(resource => ({ ...resource, id: resource._id }))
        res.json(posts);
        return 0;


      });

    }).populate("firstCategory", "name").populate("customer", "nickname photos").skip(offset).sort({ createdAt: -1 }).limit(parseInt(req.params.limit)).lean();
  },
  viewOneAdmin: function(req, res, next) {

    Post.findById(req.params.id,
      function(err, post) {
        if (err || !post) {
          res.json({
            success: false,
            message: "error!"
          });
          return 0;
        }
        res.json(post);
        return 0;
      }).lean();
  },
  viewOne: function(req, res, next) {
<<<<<<< HEAD

    Post.findById(req.params.id,
      function(err, post) {
        if (err || !post) {
          res.json({
            success: false,
            message: "error!"
          });
          return 0;
=======
    console.log("viewOne ", req.params.id);
    Post.findById(req.params.id,
      function(err, post) {
        if (err || !post) {
          return res.json({
            post: post,
            err: err,
            success: false,
            message: "error!"
          });
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        }

        let views = post.views;
        if (!views) {
          views = [];
        }

        views.push({
          userIp: requestIp.getClientIp(req),
          createdAt: new Date()
        });
<<<<<<< HEAD
=======
        console.log("findByIdAndUpdate");
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        Post.findByIdAndUpdate(req.params.id, {
            "$set": {
              // getContactData: post.getContactData,
              views: views
            }
          },
          {
            "fields": { "_id": 1 }
          }, function(err, updatedPost) {
            delete post.views;
<<<<<<< HEAD
            res.json(post);
            return 0;
=======
            return res.json(post);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
          });

      }).lean();
  },
  viewOneF: function(req, res, next) {

    Post.findById(req.params.id, "title _id price addToCard customer",
      function(err, post) {
        if (err || !post) {
          res.json({
            success: false,
            message: "error!"
          });
          return 0;
        }
        // _.forEach(categorys, (c) => {
        post.title = post["title"][req.headers.lan];
        let addToCard = post.addToCard;
        if (!addToCard) {
          addToCard = [];
        }

        addToCard.push({
          userIp: requestIp.getClientIp(req),
          createdAt: new Date()
        });
        Post.findByIdAndUpdate(req.params.id, {
            "$set": {
              // getContactData: post.getContactData,
              addToCard: addToCard
            }
          },
          {
            "fields": { "_id": 1 }
          }, function(err, updatedPost) {
          });
        delete post.addToCard;
        post.seller = post.customer;
        delete post.customer;

        // Post.findOne({_id: {$lt: req.params.id}}, '_id title', function (err, pl) {
        //   if (pl && pl._id && pl.title)
        //     post.nextPost = {_id: pl._id, title: pl.title[req.headers.lan]};
        //   return 0;
        // }).sort({_id: 1}).limit(1)

        res.json(post);

      }).lean();
  },
  viewOneS: function(req, res, next) {
    return new Promise(function(resolve, reject) {

      Post.findById(req.params._id, "title description",
        function(err, post) {
          if (err || !post) {
            resolve({});
            return 0;
          }
          // _.forEach(categorys, (c) => {
          post.title = post["title"][req.headers.lan];
          post.description = post["description"][req.headers.lan];
          // console.log(c);
          // });
          delete post.data;
          delete post.transaction;
          resolve(post);
          return 0;

        }).lean();
    });
  },
  getContactData: function(req, res, next) {

    Post.findById(req.params.id, "customer getContactData",
      function(err, post) {
        if (err || !post) {
          res.json({
            success: false,
            message: "error!"
          });
          return 0;
        }
        if (!post.getContactData) {
          post.getContactData = [];
        }

        post.getContactData.push({
          userIp: requestIp.getClientIp(req),
          createdAt: new Date()
        });
        Post.findByIdAndUpdate(req.params.id, {
            "$set": {
              getContactData: post.getContactData
            }
          },
          {
            "fields": { "_id": 1 }
          }, function(err, updatedPost) {
          });
        delete post.getContactData;
        res.json(post);
        return 0;

      }).populate("customer", "email phoneNumber").lean();
  },
  viewOneMyPost: function(req, res, next) {
<<<<<<< HEAD
    console.log("web uiwgeh  efkv", req.params.id);
    Post.findById(req.params.id,
      function(err, post) {
        console.log("post", post);
        console.log("err", err);
=======
    // console.log("web uiwgeh  efkv", req.params.id);
    Post.findById(req.params.id,
      function(err, post) {
        // console.log("post", post);
        // console.log("err", err);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        if (err || !post) {
          res.json({
            success: false,
            message: "error!",
            err: err
          });
          return 0;
        }
        post.title = post["title"][req.headers.lan];
        post.description = post["description"][req.headers.lan];
        post.files = post["files"];
        res.json(post);
        return 0;

      });
  },
  createByCustomer: function(req, res, next) {

    req.body.customer = req.headers.customer._id;
    if (!req.headers.lan) {
      req.headers.lan = "fa";
    }
    let { description, title } = req.body;
    delete req.body.description;
    req.body.description = {
      [req.headers.lan]: description
    };
    delete req.body.title;
    // req.body.description[req.headers.lan]=description;
    req.body.title = {
      [req.headers.lan]: title
    };
    // req.body.title[req.headers.lan]=title;
    // console.log()
<<<<<<< HEAD
    console.log("creating post...", req.body.description, "..„");
=======
    // console.log("creating post...", req.body.description, "..„");
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    req.body.status = "published";
    let code = Math.floor(100000 + Math.random() * 900000);
    req.body.postNumber = code;
    Post.create(req.body, function(err, post) {
      if (err || !post) {
        res.json({
          err: err,
          success: false,
          message: "error!"
        });
        return 0;
      }
      let $text;
      // $text = "زومی روم" + "\n" + "آگهی شما با عنوان " + '"' + req.body.title[req.headers.lan] + '"' + " ایجاد شد و بزودی توسط مدیر سیستم تایید می شود." + "\n" + "نهایت زمان انتظار تایید: ۳۰ دقیقه";
      // global.sendSms(req.headers.customer.phoneNumber, $text).then(function (uid) {
      //
      // });
      $text = "نیکان" + "\n" + "آگهی با عنوان " + "\"" + req.body.title[req.headers.lan] + "\"" + " ایجاد شد و در انتظار بررسی شما است.";
      // global.sendSms("9120539945", $text).then(function (uid) {
      //
      // });
      // $text = "زومی روم" + "\n" + "آگهی با عنوان " + '"' + req.body.title[req.headers.lan] + '"' + " ایجاد شد و در انتظار بررسی شما است.";
      // global.sendSms("9128093545", $text).then(function (uid) {

      // });
      let objd = {};
      // $tz = req.headers.customer.phoneNumber + "\n";
      // $tz += $text;
      objd.message = $text;
<<<<<<< HEAD
      console.log("objd", objd);
      global.notifateToTelegram(objd).then(function(f) {
        console.log("f", f);
=======
      // console.log("objd", objd);
      global.notifateToTelegram(objd).then(function(f) {
        // console.log("f", f);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        // res.json({success: true});
        // return 0;
      });
      res.json(post);
      return 0;

    });
  },
  create: function(req, res, next) {

    // req.body.customer = req.headers.customer._id;
    // console.log('creating post...', req.body);
    Post.create(req.body, function(err, post) {
      if (err || !post) {
<<<<<<< HEAD
        res.json({
=======
        return res.json({
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
          err: err,
          success: false,
          message: "error!"
        });
<<<<<<< HEAD
        return 0;
      }
      res.json(post);
      return 0;
=======
      }
      return res.json(post);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

    });
  },
  destroy: function(req, res, next) {
    Post.findByIdAndDelete(req.params.id,
      function(err, post) {
        if (err || !post) {
          res.json({
            success: false,
            message: "error!"
          });
          return 0;
        }
        res.json({
          success: true,
          message: "Deleted!"
        });
        return 0;


      }
    );
  },
  edit: function(req, res, next) {
<<<<<<< HEAD
    req.body.status = "published";
=======
    // req.body.status = "published";
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    req.body.customer = req.headers.customer._id;
    if (!req.headers.lan) {
      req.headers.lan = "fa";
    }
<<<<<<< HEAD
    let { description, title } = req.body;
    delete req.body.description;
    req.body.description = {
      [req.headers.lan]: description
    };
    delete req.body.title;
    // req.body.description[req.headers.lan]=description;
    req.body.title = {
      [req.headers.lan]: title
    };
    // req.body.title[req.headers.lan]=title;
    // console.log()
    console.log("creating post...", req.body.description, "..„");
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if (err || !post) {
        res.json({
          success: false,
          message: "error!"
        });
        return 0;
      }

      res.json(post);
      return 0;
=======
    // let { description, title } = req.body;
    // delete req.body.description;
    // req.body.description = {
    //   [req.headers.lan]: description
    // };
    // delete req.body.title;
    // req.body.description[req.headers.lan]=description;
    // req.body.title = {
    //   [req.headers.lan]: title
    // };
    // req.body.title[req.headers.lan]=title;
    // console.log()
    // console.log("creating post...", req.body.description, "..„");
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, post) {
      if (err || !post) {
        return res.json({
          success: false,
          message: "error!"
        });
      }

      return res.json(post);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

    });
  },
  editAdmin: function(req, res, next) {
<<<<<<< HEAD
    // if (!req.headers.lan) {
    //   req.headers.lan = "fa";
    // }
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if (err || !post) {
        res.json({
          success: false,
          message: "error!"
        });
        return 0;
      }
      res.json(post);
      return 0;
=======
    if (!req.headers.lan) {
      req.headers.lan = "fa";
    }
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, post) {
      if (err || !post) {
        return res.json({
          success: false,
          message: "error!"
        });
      }
      return res.json(post);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

    });
  },
  telegram: function(req, res, next) {
    if (!req.headers.lan) {
      req.headers.lan = "fa";
    }
    Post.findById(req.params.id, function(err, post) {
      if (err || !post) {
        res.json({
          success: false,
          message: "error!"
        });
        return 0;
      }

      let objd = {};
      $tz = post.title[req.headers.lan] + "\n";
      $tz += post.description[req.headers.lan];
      objd.message = $tz;
// let im='';
      if (post.files) {
        if (post.files[0]) {
          objd.media = post.files[0].url;
        }
      }
<<<<<<< HEAD
      console.log("objd", objd);
      global.publishToTelegram(objd).then(function(f) {
        console.log("f", f);
=======
      // console.log("objd", objd);
      global.publishToTelegram(objd).then(function(f) {
        // console.log("f", f);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      });


      res.json(objd);
      return 0;

    });
  },
  deleteByCustomer: function(req, res, next) {
    Post.findByIdAndUpdate(req.params.id, {
      status: "deleted"
    }, function(err, post) {
      if (err || !post) {
        res.json({
          success: false,
          message: "error!"
        });
        return 0;
      }

      res.json({
        success: true,
        message: "deleted!"
      });
      return 0;

    });
  },
  count: function(req, res, next) {
    Post.countDocuments({}, function(err, count) {
<<<<<<< HEAD
      console.log("countDocuments", count);
=======
      // console.log("countDocuments", count);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      if (err || !count) {
        res.json({
          success: false,
          message: "error!"
        });
        return 0;
      }

      res.json({
        success: true,
        count: count
      });
      return 0;


    });
  },
  copy: function(req, res, next) {
    if (!req.headers.lan) {
      req.headers.lan = "fa";
    }

    Post.findById(req.params.id, function(err, post) {
      if (err || !post) {
        res.json({
          success: false,
          message: "error!"
        });
        return 0;
      }
      delete post._id;
      Post.create(post, function(err, post) {
        if (err || !post) {
          res.json({
            err: err,
            success: false,
            message: "error!"
          });
          return 0;
        }
<<<<<<< HEAD
        console.log("req.headers", req.headers);
=======
        // console.log("req.headers", req.headers);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        if (req.headers.user && req.headers.token) {
          let action = {
            user: req.headers.user._id,
            title: "copy post " + post._id,
            data: post,
            history: req.body,
            post: post._id
          };
          global.submitAction(action);
        }
        res.json(post);
        return 0;

      });


    }).lean();
  },
  fileUpload: function(req, res, next) {
    // console.log(req.files);
    // console.log('we are here')
    //
    // req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //     // ...
    //     console.log('on file')
    // });
    // req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    //     // ...
    //     console.log('on filed')
    //
    // });
    // console.log('req.body',req.body);
    // console.log('req.params',req.params);
    // let fstream;
    // req.pipe(req.busboy);
    // // var busboy = new Busboy({ headers: req.headers });
    // busboy.on('file', function (fieldname, file, filename) {
    //     let name = getFormattedTime() + filename;
    //     let filePath = path.join(__dirname, '/../customer/', name);
    //     fstream = fs.createWriteStream(filePath);
    //     file.pipe(fstream);
    //     fstream.on('close', function () {
    //         console.log('Files saved');
    //         let url = 'customer/' + name;
    //         let obj = [{'name': name, 'url': url}];
    //
    //
    let photos = req.photo_all;
<<<<<<< HEAD
    console.log(photos, req.body);
=======
    // console.log(photos, req.body);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

    if (photos && photos[0]) {
      Media.create({
        name: photos[0].name,
        url: photos[0].url,
        type: photos[0].type

      }, function(err, media) {


        if (err) {
          // console.log('==> pushSalonPhotos() got response err');


          res.json({
            err: err,
            success: false,
            message: "error"
          });

        } else {
          res.json({
            success: true,
            media: media

          });
        }
      });
    } else {
      res.json({
        success: false,
        message: "upload faild!"
      });
    }
    //
    //     });
    // });


  }

});
export default self;