import store from '#c/functions/store';

export default function SidebarItem() {
  const { token, phoneNumber, firstName, lastName } = store.getState().store;

  let profile = phoneNumber;
  if (firstName || lastName) profile = firstName + ' ' + lastName;

  if (token) {
    return [
<<<<<<< HEAD
      // {
      //   title: 'Products',
      //   htmlBefore: '<i class="material-icons mr-1">vertical_split</i>',
      //   to: '/',
      // },
      //  {
      //   title: "products",
      //   htmlBefore: '<i class="material-icons">shopping_cart</i>',
      //   to: "/products",
      // },
      //
      // {
      //   title: profile,
      //   htmlBefore: '<i class="material-icons mr-1">&#xE7FD;</i>',
      //   to: '/profile',
      // },
      // {
      //   title: 'Cart',
      //   htmlBefore: '<i class="material-icons mr-1">shopping_basket</i>',
      //   to: '/submit-order',
      // },
      // {
      //   title: 'my posts',
      //   htmlBefore: '<i class="material-icons">&#xE8B8;</i>',
      //   to: '/my-posts',
      // },
=======
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      {
        title: 'my orders',
        htmlBefore: '<i class="material-icons mr-1">list_alt</i>',
        to: '/my-orders',
      },
    ];
  } else {
    return [
<<<<<<< HEAD
      // {
      //   title: 'Products',
      //   htmlBefore: '<i class="material-icons mr-1">vertical_split</i>',
      //   to: '/',
      // },
      // {
      //   title: 'Login / Register',
      //   htmlBefore: '<i class="material-icons mr-1">person</i>',
      //   to: '/login',
      // },
      // {
      //   title: 'Cart',
      //   htmlBefore: '<i class="material-icons mr-1">shopping_cart</i>',
      //   to: '/submit-order',
      // },
=======
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    ];
  }
}
