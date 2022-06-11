import _404 from "#routes/public/_404";
import blog from "#routes/public/blog";
import category from "#routes/public/category";
import login from "#routes/public/login";
import order from "#routes/public/order";
import p from "#routes/public/p";
import posts from "#routes/public/posts";
import products from "#routes/public/products";
import profile from "#routes/public/profile";
import submitOrder from "#routes/public/submit-order";
import transaction from "#routes/public/transaction";


export default {
    order,
    '':posts,
    '404':_404,
    category,
    p,
    products,
    blog,
    submitOrder,
    login,
    profile,
    transaction
};
