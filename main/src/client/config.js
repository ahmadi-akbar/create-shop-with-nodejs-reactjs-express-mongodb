const isSSR = typeof window === "undefined";
if (isSSR) var window = {};
// console.log('window.SHOP_URL',window.SHOP_URL);

export default isSSR
  ? {
    BASE_URL: "https://arvandguarantee.shop",
    SHOP_URL: "https://arvandguarantee.shop/",
    FRONT_ROUTE: "https://arvandguarantee.shop/customer",
    setting: {
      separator: "|",
      siteName: "arvandshop"

    }
  }
  : {
    SHOP_URL: window.SHOP_URL,
    defaultImg: "https://arvandguarantee.shop/site_setting/img/not-found.png",
    BASE_URL: window.BASE_URL,
    FRONT_ROUTE: window.FRONT_ROUTE,
    setting: {
      separator: "|",
      siteName: "arvandshop"
    }
  };
