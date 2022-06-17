const isSSR = typeof window === 'undefined';

if (isSSR) var window = {};

export default isSSR
  ? {}
  : {
      SHOP_URL: window.SHOP_URL,
      defaultImg: 'https://www.shop.com/not-found.png',
      SnapChatIcon: 'https://www.shop.com/snapchat.svg',
      BASE_URL: window.BASE_URL,
    };
