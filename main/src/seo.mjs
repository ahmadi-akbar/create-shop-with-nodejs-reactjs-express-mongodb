import path from "path";
import fs from "fs";

import config from "#c/config";

let readFilePromise = function() {
  // let file = path///.join(__dirname, "/../public_media/site_setting/", "config.js");

  return new Promise(function(ok, notOk) {
    let c=config;
    // console.log(/'c',c);

    ok(c);

    // fs.readFile(file, function(err, data) {
    //   if (err) {
    //     notOk(err);
    //   } else {
    //     console.log('file',file,data);
    //
    //     ok(data);
    //   }
    // });
  });
};

let seo = {
  "readFilePromise": readFilePromise,
  "home": {
    title: {
      fa: "آروند شاپ - فروش محصولات اپل، سرفیس و لوازم جانبی"
    },
    description: {
      fa: "فروش لوازم جانبی، خرید آیفون، خرید ایرپاد، قیمت موبایل، خرید سرفیس، کنسول بازی، سرفیس پرو، سرفیس لپتاپ، پلی استیشن ۵"
    },
    image: {
      fa: "http://localhost:3001/assets/icon-512x512.png",
      en: "http://localhost:3001/assets/icon-512x512.png",
      tu: "http://localhost:3001/assets/icon-512x512.png",
      ar: "http://localhost:3001/assets/icon-512x512.png"

    },
    url: {
      fa: "http://localhost:3001/",
      en: "http://localhost:3001/",
      tu: "http://localhost:3001/",
      ar: "http://localhost:3001/"
    },
    width: "512",
    height: "512",
    name: {
      tu: "arvandshop",
      en: "arvandshop",
      fa: "آروند شاپ",
      ar: "آروند شاپ"
    }
  },
  "p": {
    title: {
      fa: "آروند شاپ ـ ",
      en: "arvandshop _ ",
      tu: "arvandshop _ ",
      ar: "آروند شاپ ـ "
    },
    description: {
      fa: "فروش لوازم جانبی، خرید آیفون، خرید ایرپاد، قیمت موبایل، خرید سرفیس، کنسول بازی، سرفیس پرو، سرفیس لپتاپ، پلی استیشن ۵"

    },
    image: {
      fa: "http://localhost:3001/assets/icon-512x512.png",
      en: "http://localhost:3001/assets/icon-512x512.png",
      tu: "http://localhost:3001/assets/icon-512x512.png",
      ar: "http://localhost:3001/assets/icon-512x512.png"

    },
    url: {
      fa: "http://localhost:3001/",
      en: "http://localhost:3001/",
      tu: "http://localhost:3001/",
      ar: "http://localhost:3001/"
    },
    width: "512",
    height: "512",
    name: {
      tu: "arvandshop",
      en: "arvandshop",
      fa: "آروند شاپ",
      ar: "آروند شاپ"
    }
  },
  "post": {
    title: {
      fa: "آروند شاپ ـ ",
      en: "arvandshop _ ",
      tu: "arvandshop _ ",
      ar: "آروند شاپ ـ "
    },
    description: {
      fa: "فروش لوازم جانبی، خرید آیفون، خرید ایرپاد، قیمت موبایل، خرید سرفیس، کنسول بازی، سرفیس پرو، سرفیس لپتاپ، پلی استیشن ۵"

    },
    image: {
      fa: "http://localhost:3001/assets/icon-512x512.png",
      en: "http://localhost:3001/assets/icon-512x512.png",
      tu: "http://localhost:3001/assets/icon-512x512.png",
      ar: "http://localhost:3001/assets/icon-512x512.png"

    },
    url: {
      fa: "http://localhost:3001/",
      en: "http://localhost:3001/",
      tu: "http://localhost:3001/",
      ar: "http://localhost:3001/"
    },
    width: "512",
    height: "512",
    name: {
      tu: "arvandshop",
      en: "arvandshop",
      fa: "آروند شاپ",
      ar: "آروند شاپ"
    }
  }

};
export default seo;