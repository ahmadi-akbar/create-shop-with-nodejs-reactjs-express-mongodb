import { Admin, Resource, useTranslate,CustomRoutes} from "react-admin";
import resources from "@/resource";
import { authProvider, dataProvider, theme } from "@/functions";
import englishMessages from "@/i18n/en";
import farsiMessages from "@/i18n/fa";
import themeReducer from "./themeReducer";
import languageReducer from "./languageReducer";
import Types from "@/functions/types";
import {Route} from "react-router-dom";

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

let dl = Types()["default_locale"];

const localeMain = localStorage.getItem("locale");
const i18nProvider = polyglotI18nProvider(
  locale => {
    if (localeMain) {
      locale = localeMain;
    }
    return messages[locale] ? messages[locale] : messages.en;
  },
  dl
);

export default function App() {
  const translate = useTranslate();
  const { Action,Attributes,Category,Configuration,Customer,MainDashboard,Media,Order,OrderCart,Post,Product,Settings,Sms,Transaction,User } = resources;
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
      <CustomRoutes>
        <Route path="/configuration" element={<Configuration />} />
      {/*<Resource name="configuration" options={{ label: translate("pos.menu.actions") }} {...Configuration} />*/}
      </CustomRoutes>
    </Admin>
  );
}
