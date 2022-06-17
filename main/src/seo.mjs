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
      fa: "https://arvandguarantee.shop/assets/icon-512x512.png",
      en: "https://arvandguarantee.shop/assets/icon-512x512.png",
      tu: "https://arvandguarantee.shop/assets/icon-512x512.png",
      ar: "https://arvandguarantee.shop/assets/icon-512x512.png"

    },
    url: {
      fa: "https://arvandguarantee.shop/",
      en: "https://arvandguarantee.shop/",
      tu: "https://arvandguarantee.shop/",
      ar: "https://arvandguarantee.shop/"
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
      fa: "https://arvandguarantee.shop/assets/icon-512x512.png",
      en: "https://arvandguarantee.shop/assets/icon-512x512.png",
      tu: "https://arvandguarantee.shop/assets/icon-512x512.png",
      ar: "https://arvandguarantee.shop/assets/icon-512x512.png"

    },
    url: {
      fa: "https://arvandguarantee.shop/",
      en: "https://arvandguarantee.shop/",
      tu: "https://arvandguarantee.shop/",
      ar: "https://arvandguarantee.shop/"
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
      fa: "https://arvandguarantee.shop/assets/icon-512x512.png",
      en: "https://arvandguarantee.shop/assets/icon-512x512.png",
      tu: "https://arvandguarantee.shop/assets/icon-512x512.png",
      ar: "https://arvandguarantee.shop/assets/icon-512x512.png"

    },
    url: {
      fa: "https://arvandguarantee.shop/",
      en: "https://arvandguarantee.shop/",
      tu: "https://arvandguarantee.shop/",
      ar: "https://arvandguarantee.shop/"
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