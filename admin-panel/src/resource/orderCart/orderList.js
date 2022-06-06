import {
  Datagrid,
  EditButton,
  Filter,
  FunctionField,
  ListContextProvider,
  NumberField,
  Pagination,
  SearchInput,
  SelectField,
  SelectInput,
  TextField,
  TextInput,
  useListContext
} from "react-admin";
import { Divider, Tab, Tabs } from "@mui/material";
import { List, OrderPaymentStatus,PaymentStatusField, OrderStatus, PrintOrder, PrintPack, SimpleForm, StatusField } from "@/components";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { dateFormat } from "@/functions";
import { BASE_URL } from "@/functions/API";
import { makeStyles } from "@mui/styles";


const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;


const TabbedDatagrid = (props) => {
  const listContext = useListContext();
  const { ids, filterValues, setFilters, displayedFilters } = listContext;
  const classes = useDatagridStyles();

  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState([]
  );

  const totals = 0;

  useEffect(() => {
    if (ids && ids !== filterValues.status) {
      switch (filterValues.status) {
        case "cart":
          console.log('ids',ids);
          setCart(ids);
          break;
        case "checkout":
          setCheckout(ids);
          break;
        default:
          setCart("cart");

      }
    }
  }, [ids, filterValues.status]);

  const handleChange = useCallback(
    (event, value) => {
      setFilters &&
      setFilters(
        { ...filterValues, status: value },
        displayedFilters
      );
    },
    [displayedFilters, filterValues, setFilters]
  );

  const selectedIds =
    filterValues.status === "cart"
      ? cart
      : filterValues.status === "checkout"
      ? checkout
      : cart;
// console.log('filterValues.status',filterValues.status);
if(!filterValues.status){
  filterValues.status='cart'
}
  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.status}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map(choice => (
          <Tab
            key={choice.id}
            label={
              totals[choice.name]
                ? `${choice.name} (${totals[choice.name]})`
                : choice.name
            }
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider/>

      <div>
        {/*{filterValues.status === 'cart' && (*/}
        <ListContextProvider
          value={{ ...listContext, ids: cart }}
        >
          <Datagrid {...props} optimized rowClick="edit">
            {/*<TextField source="id"/>*/}
            <TextField source="orderNumber" label={"شماره سفارش"}/>

            <FunctionField label="اطلاعات مشتری"
                           render={record => (
                             <div className='theDate'>
                               {record.customer && <div>{record.customer.firstName && <div>
                                 {record.customer.firstName}
                               </div>}
                                 {(!record.customer.firstName && record.customer_data.firstName) &&
                                 <div>
                                   {record.customer_data.firstName}
                                 </div>}

                                 {record.customer.lastName && <div>
                                   {record.customer.lastName}
                                 </div>}
                                 {(!record.customer.lastName && record.customer_data.lastName) &&
                                 <div>
                                   {record.customer_data.lastName}
                                 </div>}
                                 {record.customer.phoneNumber &&
                                 <a href={"/#/customer/" + record.customer._id}>{record.customer.phoneNumber}</a>}


                               </div>}</div>
                           )}/>
            <NumberField source="sum" label={"مجموع سفارش"}/>
            <NumberField source="amount" label={"پرداختی"}/>

            <SelectField source="status" choices={OrderStatus()}
                         label="وضعیت سفارش" optionText={<StatusField/>}
            />
            <SelectField source="paymentStatus" choices={OrderPaymentStatus()}
                         label="وضعیت پرداخت" optionText={<PaymentStatusField/>}
            />

            {/*<TextField source="status" label={'وضعیت سفارش'}/>*/}
            <FunctionField label="منتشر شده در"
                           render={record => `${dateFormat(record.createdAt)}`}/>
            <FunctionField label="بروزرسانی شده در"
                           render={record => `${dateFormat(record.updatedAt)}`}/>

            {/*<BooleanField source="active" />*/}
            <EditButton/>
          </Datagrid>

        </ListContextProvider>
        {/*)}*/}

      </div>

    </Fragment>
  );
};

const useDatagridStyles = makeStyles({
  total: { fontWeight: "bold" }
});

const tabs = [
  { id: "cart", name: "سبد خرید" },
  { id: "checkout", name: "در حال ثبت سفارش" }
];

const orderList = (props) => (
  <List
    {...props}
    filters={
      <Filter {...props}>
        <SearchInput source="search" placeholder={"شماره سفارش یا موبایل"} alwaysOn/>
        <TextInput source="firstName" label={"نام مشتری"} placeholder={"نام"}/>
        <TextInput source="lastName" label={"نام خانوادگی"} placeholder={"نام خانوادگی"}/>
        <SelectInput source="status" label={"وضعیت سفارش"} emptyValue={null} choices={OrderStatus()}
                     alwaysOn/>
        {/*<SelectInput source="paymentStatus" label={'وضعیت پرداخت'}  emptyValue={null}*/}
        {/*choices={typeChoices3} alwaysOn/>*/}
        {/*<BooleanInput source="is_published" alwaysOn />*/}
      </Filter>
    } pagination={<PostPagination/>}
  >
    <TabbedDatagrid/>
  </List>
);
export default orderList;
