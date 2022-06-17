const isSSR = typeof window === 'undefined';

if (isSSR) var window = {};

export default isSSR
  ? {
    BASE_URL:'http://localhost:3001',
    SHOP_URL:'http://localhost:3001/',
    FRONT_ROUTE:'http://localhost:3001/customer'
  }
  : {
      SHOP_URL: window.SHOP_URL,
      defaultImg: 'https://www.shop.com/not-found.png',
      SnapChatIcon: 'https://www.shop.com/snapchat.svg',
      BASE_URL: window.BASE_URL,
      FRONT_ROUTE:window.FRONT_ROUTE
    };
