import productCreate from "./productCreate";
import productEdit from "./productEdit";
import productList from "./productList";
import { Storefront,LocalMall } from "@mui/icons-material";

const Product = {
  list:productList,
  edit:productEdit,
  create:productCreate,
  icon: Storefront,
  createIcon: LocalMall,
};
export default Product;