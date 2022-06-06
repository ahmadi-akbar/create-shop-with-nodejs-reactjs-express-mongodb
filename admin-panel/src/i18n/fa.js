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
    title:"عنوان",
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
      CanceledByTheUser:"لغو شده توسط کاربر",
      UnsuccessfulPayment:"پرداخت ناموفق",
      ExcessiveEffortInAShortPeriodOfTime:"در مدت زمان کوتاه درخواست زیاد ارسال شده",
      ValidationError:"خطا در احراز اطلاعات",
      PaidApproved:"پرداخت تایید شده",
      PaidNotApproved:"پرداخت شده و تایید نشده",
      InternalError:"خطای داخلی",
      WaitingForPayment:"در انتظار پرداخت",
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
      phoneNumber:"شماره تماس",
      activationCode:"کد فعال سازی",
      firstName:"نام",
      lastName:"نام خانوادگی",
      email:"ایمیل",
      internationalCode:"کدملی",
      createdAt:"ساخته شده در",
      updatedAt:"بروزرسانی در",
      active:"فعال/غیرفعال",
    },
    user: {
      _id:"شناسه",
      phoneNumber:"شماره تماس",
      activationCode:"کد فعال سازی",
      firstName:"نام",
      lastName:"نام خانوادگی",
      email:"ایمیل",
      username:"نام کاربری",
      createdAt:"ساخته شده در",
      updatedAt:"بروزرسانی در",
      nickname:"لقب",
      active:"فعال/غیرفعال",
      password:"رمز عبور"
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
      firstCategory:"دسته اول",
      secondCategory:"دسته دوم",
      thirdCategory:"دسته سوم",
      search: "نام نوشته/برگه...",
      category: "دسته",
      image: "عکس",
      title: "عنوان",
      excerpt: "چکیده",
      description: "توضیحات",
      label: "برچسب",
      labels: "برچسب ها",
      type: "نوع",
      photo: "عکس",
      status: "وضعیت",
      processing: "پیش نویس",
      published: "منتشر شده",
      deleted: "حذف شده",
      slug: "نامک",
      url: "آدرس اینترنتی",
      date: "تاریخ",
      copy: "کپی",
      createdAt: "ساخته شده در",
      updatedAt: "بروزرسانی در",
      activities: "فعالیت ها",
      viewsCount: "تعداد بازدید ها",
      updated: "بروزرسانی",
      created: "ساخته شده",
      categories: "دسته بندی ها",
      post:"نوشته",
      page:"برگه",
      kind:"نوع",
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
      inStock: "در انبار",
      outOfStock:"موجود نیست"
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
      user: "کاربر",
      message: "پیام",
      status: "وضعیت",
      sender: "ارسال کننده",
      receiver: "دریافت کننده",
      updatedAt: "بروزرسانی در",
      createdAt: "ساخته شده در"

    },
    transaction: {
      date: "تاریخ",
      amount: "مجموع",
      statusCode: "کد وضعیت",
      authority: "توکن پرداخت",
      status: "وضعیت",
      referenceId: "شناسه مرجع",
      orderNumber: "شماره سفارش",
      updatedAt: "بروزرسانی در",
      createdAt: "ساخته شده در"

    }
  }
};

export default customFarsiMessages;
