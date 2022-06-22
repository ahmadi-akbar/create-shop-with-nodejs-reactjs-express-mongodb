import React from "react";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { addBookmark, getContactData } from "#c/functions/index";
import Theprice from "#c/components/single-post/Theprice";
<<<<<<< HEAD
=======
import TheChip from "#c/components/single-post/combinations-type/TheChip";
import TheList from "#c/components/single-post/combinations-type/TheList";
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

import { Col, Row } from "shards-react";
import store from "#c/functions/store";
import AddToCardButton from "#c/components/components-overview/AddToCardButton";
<<<<<<< HEAD

import { dFormat, PriceFormat } from "#c/functions/utils";
=======
import { dFormat, PriceFormat } from "#c/functions/utils";
import {isSSR} from "#c/config";
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

class SidebarActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      email: "",
      lan: store.getState().store.lan,
      optionsId: {},
      combinationsTemp: {}

    };
  }

  handleGetContactData = () => {
    const { _id } = this.props;
    getContactData(_id).then((d) => {
      this.setState(d.customer);
    });
  };

  bookmark = () => {
    const { t, _id } = this.props;
    addBookmark(_id).then((d) => {
      toast.success(t("successfully done!"));
    });
  };
  handleCombinations = (theid, val) => {
    const { t, options, combinations } = this.props;
    let { optionsId, combinationsTemp } = this.state;

    let combt = {};
    // console.log('val', val, optionsId);
    optionsId[theid] = (val.id);
    // console.log('optionsId', optionsId);
    if (options.length === Object.keys(optionsId).length) {
      let tt = [];
      Object.keys(optionsId).forEach(function(op, index) {
        tt.push(optionsId[op]);
      });
      // console.log('tt', tt);
      combinations.map(comb => {
        if (comb.optionsId.every(elem => tt.includes(elem))) {
          // console.log('comb exist', comb);
          combt = comb;
        }
      });
      // console.log('comb', combt);
      this.setState({ combinationsTemp: combt });

    }

    this.setState({ optionsId: optionsId });
  };
<<<<<<< HEAD
  handleOptions = (combination) => {
    const { t, options } = this.props;
    let arr = [];
    if (combination && combination.options) {
      Object.keys(combination.options).forEach(function(op, index) {
        if (combination.options[op])
          arr.push(<div className={"option-title"} key={index}>
            <span>{op}</span><span>:</span><span>{combination.options[op]}</span>
          </div>);
      });
    }
    return arr;
  };
  handleTitles = (combination) => {
    const { t, options } = this.props;
    let arr = [];

    if (combination && combination.options) {
      Object.keys(combination.options).forEach(function(op, index) {
        arr.push(combination.options[op]);
      });
    }
    if (arr.join(","))
      return arr;
  };
=======


>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

  render() {
    const { phoneNumber, email, lan, optionsId, combinationsTemp } = this.state;
    let { t, updatedAt, countryChoosed, type, _id, firstCategory, in_stock, quantity, secondCategory, thirdCategory, title, photos, price, salePrice, options, combinations, method, single = true } = this.props;
    let mixcombandoptions = [];

    if (price) price = PriceFormat(price);
    if (salePrice) salePrice = PriceFormat(salePrice);
    let ti = dFormat(updatedAt, t);
    return (
<<<<<<< HEAD
      [<Row key={0}>
        {type == "variable" && combinations && <Col lg={12} md={12} sm={12} xs={12}>
          <div>

            {combinations.map((comp, key) => {
              let inS = ((comp.in_stock == "0" || comp.in_stock == null) ? false : true);
              if (!inS && !single)
                return;
              return (<div key={key} className={"option-wrap posrel"}>
                <div className={"the-option-title"}>{this.handleOptions(comp)}</div>
                <div className={"the-option-left-box"}>
                  <div className={"the-option-price"}>
                    <Theprice className={"single single-let " + comp.salePrice + " - " + comp.price} price={comp.price}
                              in_stock={inS}
                              salePrice={comp.salePrice}/>
                  </div>
                  {inS && method === "list" && !single && <>
                    <div className={"the-option-actions " + inS}>
                      <AddToCardButton item={{
                        _id: _id + "DDD" + comp.id,
                        title: {
                          [lan]: title[lan] + " - " + this.handleTitles(comp)
                        },
                        // mainTitle: title,
                        photos: photos,
                        single: true,
                        in_stock: inS,
                        quantity: parseInt(comp.quantity),
                        price: comp.price,
                        type: "variable",
                        // comb_id:comp.id,
                        salePrice: comp.salePrice
                      }}/>
                    </div>
                  </>}
                  {single && <>
                    <div className={"the-option-actions " + inS}>
                      <AddToCardButton item={{
                        _id: _id + "DDD" + comp.id,
                        title: {
                          [lan]: title[lan] + " - " + this.handleTitles(comp)
                        },
                        photos: photos,
                        single: true,
                        in_stock: inS,
                        quantity: parseInt(comp.quantity),
                        price: comp.price,
                        type: "variable",
                        // comb_id:comp.id,
                        salePrice: comp.salePrice
                      }}/>
                    </div>
                  </>}
                </div>
                <div className=" hr-bottom"></div>
              </div>);
            })}

          </div>
=======
      [<div key={0}>
        {type == "variable" && combinations && <Col lg={12} md={12} sm={12} xs={12}>
          <Row>
            {Boolean(!isSSR && combinations.length>0) && <TheChip _id={_id} title={title} photos={photos} options={options} single={single} method={method} combinations={combinations} t={t} />}
            {Boolean(isSSR && combinations.length>0) && <TheList _id={_id} title={title} photos={photos} options={options} single={single} method={method} combinations={combinations} t={t}/>}

          </Row>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        </Col>}
        {type == "normal" &&
        <Col lg={12} md={12} sm={12} xs={12} className="mb-3 mt-3"><AddToCardButton item={{
          _id: _id,
          title: title,
          photos: photos,
          single: true,
          in_stock: in_stock,
          quantity: quantity,
          price: price,
          salePrice: salePrice
        }}/></Col>
        }

<<<<<<< HEAD
      </Row>]
=======
      </div>]
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    );
  }
}

export default withTranslation()(SidebarActions);
