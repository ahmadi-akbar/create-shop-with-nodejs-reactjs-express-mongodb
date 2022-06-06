import farsiMessages from "ra-language-farsi";

console.log("running english language...");

const customFarsiMessages = {
  ...farsiMessages,
  websiteName: "Gameboss",
  lan: "fa",
  dir: "rtl",
  comma: ",",
  pos: {
    search: "جستجو",
    configuration: "تنظیمات",
    language: "زبان",
    theme: {
      name: "پوسته",
      light: "روشن",
      dark: "تاریک"
    },
    dashboard: {
      monthly_revenue: "Monthly Revenue",
      month_history: "30 Day Revenue History",
      new_orders: "New Orders",
      pending_reviews: "Pending Reviews",
      all_reviews: "See all reviews",
      new_customers: "New Customers",
      all_customers: "See all customers",
      pending_orders: "Pending Orders",
      order: {
        items:
          "by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items"
      },
      welcome: {
        title: "Welcome to the react-admin e-commerce demo",
        subtitle:
          "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
        ra_button: "react-admin site",
        demo_button: "Source for this demo"
      }
    },
    menu: {
      attributes: "ویژگی ها",
      categories: "دسته ها",
      createPost: "post ساخت",
      settings: "تنظیمات",
      actions: "فعالیت ها",
      dashboard: "داشبرد",
      sections: "بخش ها",
      addAttribute: "افزودن ویژگی",
      allAttributes: "همه ویژگی ها",
      addCategory: "افزودن دسته",
      allCategories: "همه دسته ها",
      medias: "رسانه ها",
      addMedia: "افزودن رسانه",
      allMedias: "همه رسانه ها",
      products: "محصولات",
      addProduct: "افزودن محصول",
      allProducts: "همه محصولات",
      allOrders: "همه سفارشات",
      cart: "سبد خرید رها شده",
      addOrder: "افزودن سفارش",
      addCustomer: "افزودن مشتری",
      customers: "مشتریان",
      allCustomers: "همه مشتریان",
      orders: "سفارشات",
      transactions: "تراکنش ها",
      allTransactions: "همه تراکنش ها",
      allSms: "همه پیامک ها",
      sendSms: "ارسال پیامک",
      sms: "پیامک",
      post: "نوشته/برگه",
      posts: "نوشته ها/برگه ها",
      allPost: "همه نوشت/برگه ها",
      more: "بیشتر",
      users: "کاربران",
      allUsers: "همه کاربران",
      addUser: "افزودن کاربر",
      siteActions: "فعالیت های سایت",
      siteSettings: "تنظیمات سایت"

    },
    currency:{
      toman:"تومان",
      rial:"ریال",
      dollar:"دلار"
    },
    paymentStatus:{
      SuccessfulOperation:"عملیات موفق",
      CanceledByTheUser:"Canceled by the user",
      UnsuccessfulPayment:"Unsuccessful payment",
      ExcessiveEffortInAShortPeriodOfTime:"Excessive effort in a short period of time",
      ValidationError:"Validation error",
      PaidApproved:"Paid approved",
      PaidNotApproved:"Paid not approved",
      InternalError:"Internal error",
      WaitingForPayment:"Waiting for payment",
    },
    OrderPaymentStatus:{
      notpaid:"پرداخت نشده",
      unsuccessful:"پرداخت ناموفق",
      paid:"پرداخت شده",

    },
    OrderStatus:{
      cart:"سبد خرید",
      checkout:"تسویه حساب",
      processing:"در دست بررسی",
      confirmed:"تایید شده",
      indoing:"تایید شده",
      makingready:"درحال آماده سازی",
      inpeyk:"ارسال شده",
      complete:"تحویل شده",
      cancel:"لغو شده",

    },
  },
  components:{
    JsonDiffer:{
      fieldName:"نام فیلد",
      new:"جدید",
      old:"قدیم",
    }
  },
  resources: {
    action: {
      user: "کاربر",
      title: "عنوان",
      customer: "مشتری",
      product: "محصول",
      phoneNumber: "شماره تماس",
      firstName: "نام",
      lastName: "نام خانوادگی",
      nickname: "لقب",
      username: "نام کاربری",
      difference: "تفاوت داده ها",
      createdAt: "در تاریخ"

    },

    dashboard: {
      yourActions: "فعالیت های شما",
      priceAnnLast30Days: "میزان درآمد ۳۰ روز گذشته",
      countOrdersSuccess30Days: "تعداد سفارشات موفق ۳۰ روز گذشته",
      countUsers: "تعداد کاربران",
      dollarPrice: "قیمت دلار",
      orders: "سفارشات",
      countAnnLast30Days: "میزان درآمد ۳۰ روز گذشته",
      countPayedLast30Days: "تعداد پرداخت های موفق ۳۰ روز گذشته",
      monthly_revenue: "Monthly Revenue",
      month_history: "30 Day Revenue History",
      new_orders: "New Orders",
      pending_reviews: "Pending Reviews",
      all_reviews: "See all reviews",
      new_customers: "New Customers",
      all_customers: "See all customers",
      pending_orders: "Pending Orders",
      order: {

        items:
          "by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items"
      },
      welcome: {
        hi: "سلام",
        title: "خوش آمدید",
        subtitle:
          "ویرایش محصولات، نمایش دیدگاه ها و...",
        ra_button: "react-admin site",
        demo_button: "Source for this demo"
      },

    },
    attributes: {
      slug: "نامک",
      name: "نام ویژگی",
      values: "مقادیر"
    },
    category: {
      slug: "نامک",
      name: "نام دسته بندی",
      values: "مقادیر",
      parent: "دسته مادر",
      order: "ترتیب",
      addxpercent: "x درصد اضافه کن",
      minusxpercent: "x درصد کم کن",
      addxprice: "x مبلغ اضافه کن",
      minusxprice: "x مبلغ کم کن"
    },
    customers: {
      phoneNumber:"phone number",
      activationCode:"activation code",
      firstName:"first name",
      lastName:"last name",
      email:"email",
      internationalCode:"international code",
      createdAt:"created at",
      updatedAt:"updated at",
      active:"active/deactive",
    },

    order: {
      orderNumber:"شماره سفارش",
      customerData:"اطلاعات مشتری",
      total:"مجموع پرداختی",
      paid:"پرداخت شده",
      status:"وضعیت سفارش",
      paymentStatus:"وضعیت پرداخت",
      date:"تاریخ",
      createdAt:"انتشار در",
      updatedAt:"بروزرسانی در",
      customerFirstName:"نام مشتری",
      customerLastName:"نام خانوادگی مشتری",
      allOrders:"همه سفارشات",
      processing:"در دست بررسی",
      confirmed:"تایید شده",
      makingready:"در حال آماده سازی",
      inpeyk:"ارسال شده",
      complete:"تکمیل شده",
      canceled:"لغو شده",
      orderNumberOrMobileNumber:"order number or mobile number",
    },
    post: {
      firstCategory:"first category",
      secondCategory:"second category",
      thirdCategory:"third category",
      search: "post name...",
      category: "category",
      image: "image",
      title: "title",
      excerpt: "excerpt",
      description: "description",
      price: "price",
      salePrice: "sale price",
      label: "label",
      labels: "labels",
      story: "story",
      miniTitle: "Short title",
      type: "type",
      photo: "photo",
      extra_attr: "extra attributes",
      sources: "Robot Sources",
      status: "status",
      processing: "processing",
      published: "published",
      deleted: "deleted",
      addAttr: "add attribute",
      slug: "slug",
      createComb: "create combinations",
      stock: "stock status",
      quantity: "quantity",
      combinations: "combinations",
      url: "url",
      prices: "prices",
      date: "date",
      copy: "copy",
      createdAt: "created at",
      updatedAt: "updated at",
      activities: "activities",
      viewsCount: "number of visits",
      updated: "updated",
      created: "created",
      categories: "categories",
      inStock: "in stock",
      post:"post",
      page:"page",
      kind:"kind",
    },

    product: {

      search: "نام محصول...",
      category: "دسته بندی",
      image: "تصویر",
      title: "عنوان",
      excerpt: "چکیده",
      description: "توضیحات",
      price: "قیمت",
      salePrice: "قیمت تخفیف خورده",
      label: "برچسب",
      labels: "برچسب ها",
      story: "استوری",
      miniTitle: "عنوان کوتاه",
      type: "نوع",
      photo: "رسانه",
      extra_attr: "ویژگی های اضافه",
      sources: "منابع ربات",
      status: "وضعیت",
      processing: "پیش نویس",
      published: "منتشرشده",
      deleted: "حذف شده",
      addAttr: "افزودن ویژگی",
      slug: "نامک",
      createComb: "ساخت متغیر ها",
      stock: "وضعیت انبار",
      quantity: "تعداد",
      combinations: "ترکیب ها",
      url: "آدرس ها",
      prices: "قیمت ها",
      date: "تاریخ",
      copy: "کپی",
      createdAt: "ساخته شده در",
      updatedAt: "بروزرسانی در",
      activities: "فعالیت ها",
      viewsCount: "تعداد بازدید",
      updated: "بروزرسانی شد",
      created: "ساخته شد",
      categories: "دسته بندی ها",
      firstCategory:"دسته اول",
      secondCategory:"دسته دوم",
      thirdCategory:"دسته سوم",
      inStock: "در انبار"
    },

    reviews: {

    },

    settings: {
      activeCategory: "دسته های فعال",
      siteStatus: "وضعیت سایت",
      siteActiveMessage: "پیام برای کاربر وقتی سایت غیر فعاله",
      siteActive: "وضعیت سایت",
      title: "عنوان",
      theid: "شناسه",
      description: "توضیحات",
      city: "شهر",
      is_isnt: "هست / نیست",
      priceLessThanCondition: "قیمت کمتر از شرط",
      condition: "شرط",
      priceMoreThanCondition: "قیمت بیشتر از شرط",
    },
    sms: {
      user: "user",
      message: "message",
      status: "status",
      sender: "sender",
      receiver: "receiver",
      updatedAt: "updated at",
      createdAt: "created at"

    },
    transaction: {
      date: "date",
      amount: "amount",
      statusCode: "status code",
      authority: "authority",
      status: "status",
      referenceId: "reference id",
      orderNumber: "order number",
      updatedAt: "updated at",
      createdAt: "created at"

    }
  }
};

export default customFarsiMessages;
