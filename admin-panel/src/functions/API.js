import axios from 'axios';

export const BASE_URL = window.REACT_APP_BASE_URL;
export const ShopURL = window.REACT_APP_SHOP_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // add Authorization token to header
  transformRequest: [
    (data, headers) => {
      headers.token = localStorage.getItem('token') || '';
      return data;
    },
  ],
});
