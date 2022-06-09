import posts from "#routes/public/posts";
import addNewPost from "#routes/public/add-new-post";
import category from "#routes/public/category";
import blog from "#routes/public/blog";
import p from "#routes/public/p";
import login from "#routes/public/login";
import resume from "#routes/public/resume";
import sendSms from "#routes/public/sendSms";
import makeMoney from "#routes/public/make-money";
import submitOrder from "#routes/public/submit-order";
import myPosts from "#routes/public/my-posts";
import profile from "#routes/public/profile";
import link from "#routes/public/link";
import products from "#routes/public/products";
import transaction from "#routes/public/transaction";
import instagram from "#routes/public/instagram";
import order from "#routes/public/order";
import seo from "#routes/public/seo";
import _404 from "#routes/public/_404";

export default {
    order,
    '':posts,
    '404':_404,
    addNewPost,
    category,
    p,
    products,
    blog,
    submitOrder,
    link,
    makeMoney,
    login,
    myPosts,
    resume,
    profile,
    transaction,
    instagram,
    sendSms,
    seo
};
