import { Admin, Resource, useTranslate } from "react-admin";
import resources from "@/resource";
import { authProvider, dataProvider, theme } from "@/functions";
import englishMessages from "@/i18n/en";
import farsiMessages from "@/i18n/fa";
import themeReducer from "./themeReducer";
import languageReducer from "./languageReducer";
import Types from "@/functions/types";

import polyglotI18nProvider from "ra-i18n-polyglot";
import "@/assets/global.css";
import {MainLayout,Menu} from './layout';
import '@/assets/rtl.css';
// import englishMessages from 'ra-language-english';
// import frenchMessages from 'ra-language-french';

const messages = {
  fa: farsiMessages,
  en: englishMessages
};

var dl = Types()["default_locale"];
// console.clear();

console.log("default_locale", dl, messages[dl]);
const localeMain = localStorage.getItem("locale");
console.log("localeMain", localeMain);
const i18nProvider = polyglotI18nProvider(
  locale => {
    if (localeMain) {
      locale = localeMain;
    }
    return messages[locale] ? messages[locale] : messages.en;
  },
  dl
);
// const i18nProvider={
//     changeLocale: locale => {
//         console.log('changeLocale',locale)
//
//         //return promis
//     },
//     getLocale: (x) => {
//         console.log('getLocale',x)
//
//         // return string
//     },
// };
console.log("i18nProvider", i18nProvider);
// const i18nProvider = polyglotI18nProvider(locale => {
//     console.log('locale', dl,englishMessages);
//
//     if (locale === 'fa') {
//         return import('./i18n/fa').then(messages => messages.default);
//         // let x=import('@/i18n/' + locale+'.js').then(messages => messages.default);
//         // console.log('x',x);
//         // return [
//         // return await x;
//         //     import('@/assets/rtl.css').then(messages => console.log(messages.default))
//         // ];
//     }
//     return englishMessages;
//
//     // Always fallback on default_language
// }, dl);


export default function App() {
  const translate = useTranslate();
  const { Action,Attributes,Category,Customer,MainDashboard,Media,Order,OrderCart,Post,Product,Settings,Sms,Transaction,User } = resources;
// console.log('OrderCart',OrderCart);
  return (
    <Admin
      title={translate('websiteName')}
      disableTelemetry
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={MainDashboard}
      layout={MainLayout}
      customReducers={{ theme: themeReducer, locale: languageReducer }}
      i18nProvider={i18nProvider}

      // customSagas={[ bitcoinSaga ]}
      // customRoutes={[
      //     <Route
      //         path="/settings"
      //         component={Settings.edit}
      //         noLayout
      //     />
      // ]}
    >
      <Resource name="attributes" {...Attributes} options={{label: translate('pos.menu.attributes')}}/>
      <Resource name="category" {...Category} options={{label: translate('pos.menu.categories')}}/>
      <Resource name="product" {...Product} options={{label: translate('pos.menu.products')}}/>
      <Resource name="post" options={{ label: translate('pos.menu.posts') }} {...Post} />
      <Resource name="customer" options={{label: translate('pos.menu.customers')}} {...Customer} />
      <Resource name="user" options={{label: translate('pos.menu.users')}} {...User} />
      <Resource name="media" options={{label: translate('pos.menu.medias')}} {...Media} />
      <Resource name="order" options={{label: translate('pos.menu.orders')}} {...Order} />
      <Resource name="ordercart" options={{ label: translate("pos.menu.cart") }} {...OrderCart} />
      <Resource name="transaction" options={{ label: translate("pos.menu.transactions") }} {...Transaction} />
      <Resource name="sms" options={{ label: translate("pos.menu.sms") }} {...Sms} />
      <Resource name="settings" options={{ label: translate("pos.menu.settings") }} {...Settings} />
      <Resource name="action" options={{ label: translate("pos.menu.actions") }} {...Action} />

    </Admin>
  );
}
