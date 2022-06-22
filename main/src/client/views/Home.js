import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Col, Row } from "shards-react";
import InfiniteScroll from "react-infinite-scroller";
import {
  eid,
  slide1Img,
  slide2Img,
  slide3Img,
  slide4Img,
  slide5Img,
  slideOffer1Img,
  slideOffer2Img,
  slideOffer3Img,
  slideOffer4Img,
  slideOffer5Img,
  slideOffer6Img,
  slideOffer8Img,
  valentineDays
} from "#c/assets/index";
import BallotIcon from "@mui/icons-material/Ballot";
import LoadingComponent from "#c/components/components-overview/LoadingComponent";
import Product from "#c/views/Product";
import Swiper from "#c/components/swiper";
import Sort from "#c/components/archive/Sort";
import Story from "#c/components/Home/Story";
import {
  enableAdmin,
  enableAgent,
  enableSell,
  fetchCats,
  getPosts,
  getPostsByCat,
  isClient,
  loadPosts,
  loadProducts,
  SaveData,
  setCountry
} from "#c/functions/index";
import SidebarNavItems from "#c/components/layout/MainSidebar/SidebarNavItems";
import ProductsSlider, { ProductsSliderServer } from "#c/components/components-overview/ProductsSlider";
import PostSlider, { PostSliderServer } from "#c/components/components-overview/PostSlider";

import { withTranslation } from "react-i18next";
import PostCard from "#c/components/Home/PostCard";
import { useSelector } from "react-redux";

const Home = (props) => {
  let { match, location, history, t, url } = props;
  let params = useParams();
  history = useNavigate();
  url = isClient ? new URL(window.location.href) : "";

  let search = isClient ? (url.searchParams.get("search") || "") : "";
  const [tracks, settracks] = useState([]);
  // let showSlide = true;

  let [showSlide, setShowSlide] = useState(true);

  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [single, set_single] = useState(false);
  const [single_id, set_single_id] = useState("");
  const [attrP, setAttr] = useState("");
  const [valueP, setValue] = useState("");
  const [offset, setoffset] = useState(-24);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [catid, setcatid] = useState(params._id);
  const [load, setLoad] = useState(null);
  //
  const postCardMode = useSelector((st) => st.store.postCardMode);
  // const theAttr = useSelector((st) => st.store.attr);
  // const theValue = useSelector((st) => st.store.value);
  // console.log("theAttr", theAttr, "theValue", theValue);
  if (isClient)
    useEffect(() => {

      let url = new URL(window.location.href);
      let eAd = url.searchParams.get("enableAdmin") || "";
      if (eAd) {
        console.log('enableAdmin');
        enableAdmin(true);
      }


    }, []);

  const loadProductItems = async (page, catId = catid,filter={}) => {

<<<<<<< HEAD
    console.log("==> loadProductItems():", offset, search, catId,filter);
=======
    // console.log("==> loadProductItems():", offset, search, catId,filter);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

    // if(!loadingMoreItems){
    let newOffset = (await offset) + 24;
    if (!catId && !showSlide) {
      let trackss = [...tracks];

      await setoffset(newOffset);
      await setInitialLoad(false);
      await setLoadingMoreItems(true);
      getPosts(newOffset, 48, search || "",filter).then((resp) => {
        setLoadingMoreItems(false);
        afterGetData(resp);
      });
      return;
    } else {
      await setoffset(newOffset);
      await setInitialLoad(false);
      await setLoadingMoreItems(true);
      getPostsByCat(newOffset, 24, catId, search || "",filter).then((resp) => {
        setLoadingMoreItems(false);
        afterGetData(resp);
      });


    }
    // }
  };
  if (isClient) {

    let attr = url.searchParams.get("attr") || "";
    let value = url.searchParams.get("value") || "";
    if (attr !== attrP)
      setAttr(attr);
    if (value !== valueP)
      setValue(value);
<<<<<<< HEAD
    console.log("attr", attr);
    console.log("value", value);
    // loadProductItems(0, catid,{
    //   attr,value
    // });
=======
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

  }
  useEffect(() => {
    loadProductItems(0, catid);
  }, [catid]);


  useEffect(() => {
    console.log("match.params._id", match, "and:", catid);
    if (params._id !== catid) {
      setcatid(params._id);
      sethasMoreItems(true);
      settracks([]);
      setoffset(-24);
    }
  }, [params._id, catid]);
  useEffect(() => {
    console.log("we changed value...");
    setoffset(-24);

    // settracks([]);
    sethasMoreItems(true);
    settracks([]);

    loadProductItems(0, catid,{
      attr:attrP,
      value:valueP
    });
  }, [attrP, valueP]);

  const afterGetData = (resp) => {
    let trackss = [...tracks];
    if (resp.length < 24) sethasMoreItems(false);
<<<<<<< HEAD
    console.log("resp", resp);
=======
    // console.log("resp", resp);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    if (resp && resp.length) {
      resp.forEach((item) => {
        trackss.push(item);
      });
      settracks(trackss);
      if (resp && resp.length < 1) sethasMoreItems(false);
    } else {
      sethasMoreItems(false);
      setLoad(false);
    }
  };

  const loader = (
    <div className="loadNotFound loader " key={23}>
      {t("loading...")}
      <LoadingComponent height={30} width={30} type="spin" color="#3d5070"/>
    </div>
  );
  // console.log("Home", catid, search);
  if (catid || search)
    showSlide = false;


  return (<div className="main-content-container fghjkjhgf ">

      {(showSlide) && <div className="page-header relative ">
        <Swiper
          perPage={1}
          arrows={true}
          breakpoints={{
            1024: {
              perPage: 1
            },
            768: {

              perPage: 1
            },
            640: {

              perPage: 1
            },
            320: {

              perPage: 1
            }
          }}
          className={"p-0 m-0"}
        >

          <div className={''}>
            <div className={'relative w-full h-screen'}>
              <div className={'jhgfdfgtyhu'} style={{
                backgroundImage: `url('${valentineDays}')`,
              }}>
                <div className={'gfdsasdf'}>
                  <h1
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    خرید آیفون، سرفیس در آروندگارانتی
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className={''}>
            <div className={'relative w-full h-screen'}>
              <div className={'jhgfdfgtyhu'} style={{
                backgroundImage: `url('${eid}')`,
              }}>
                <div className={'gfdsasdf'}>
                  <h3
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    خرید انواع گیفت کارت اپل و...
                  </h3>

                </div>
              </div>
            </div>
          </div>



          <div className={''}>
            <div className={'relative w-full h-screen'}>
              <div className={'jhgfdfgtyhu'} style={{
                backgroundImage: `url('${slide1Img}')`,
              }}>
                <div className={'gfdsasdf'}>
                  <h3
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    رایانه های رومیزی، لپتاپ</h3>
                  <p className="text-sm lg:text-base xl:text-lg text-heading kuytfgyhui">
                    آیمک، سرفیس استدیو، مک بوک، سرفیس بوک
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={''}>
            <div className={'relative w-full h-screen'}>
              <div className={'jhgfdfgtyhu'} style={{
                backgroundImage: `url('${slide2Img}')`,
              }}>
                <div className={'gfdsasdf'}>
                  <h3
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    گوشی هوشمند و تبلت</h3>
                  <p className="text-sm lg:text-base xl:text-lg text-heading kuytfgyhui">
                    آیفون، آیپد، سرفیس، سامسونگ، شیائومی
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={''}>
            <div className={'relative w-full h-screen'}>
              <div className={'jhgfdfgtyhu'} style={{
                backgroundImage: `url('${slide3Img}')`,
              }}>
                <div className={'gfdsasdf'}>
                  <h3
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    کنسول های بازی</h3>
                  <p className="text-sm lg:text-base xl:text-lg text-heading kuytfgyhui">
                    پلی استیشن، ایکس باکس، نینتندو، نصب بازی ها
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={''}>
            <div className={'relative w-full h-screen'}>
              <div className={'jhgfdfgtyhu'} style={{
                backgroundImage: `url('${slide4Img}')`,
              }}>
                <div className={'gfdsasdf'}>
                  <h3
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    ساعت و مچ بند هوشمند</h3>
                  <p className="text-sm lg:text-base xl:text-lg text-heading kuytfgyhui">
                    ساعت هوشمند اپل (iWatch)
                    ،
                    سامسونگ
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={''}>
            <div className={'relative w-full h-screen'}>
              <div className={'jhgfdfgtyhu'} style={{
                backgroundImage: `url('${slide5Img}')`,
              }}>
                <div className={'gfdsasdf'}>
                  <h3
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    لوازم جانبی</h3>
                  <p className="text-sm lg:text-base xl:text-lg text-heading kuytfgyhui">
                    هدفون و هندزفری، کیف و کاور، موس و کیبورد، کابل و شارژر
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Swiper>


      </div>}

<<<<<<< HEAD
      {(showSlide) && <div className="relative mt-3 mb-3 p-3">
=======
      {(showSlide) && <div className="relative mt-3 p-3">
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        <Story/>
      </div>}
      <Row className={"m-0"}>
        <Col tag="aside" lg={{ size: 3 }} md={{ size: 4 }} className={"sidebar white mobilenone"}>
          <Row className={""}>
            <Col lg={{ size: 12 }} md={{ size: 12 }}>
              <SidebarNavItems/>
            </Col>
          </Row>
        </Col>

        {(showSlide) && <Col
          className="main-content iuytfghj"
          lg={{ size: 9 }}
          md={{ size: 8 }}
          sm="12"
          tag="main">


          <Row className={'mt-3 juytrfvbh pr-15'}>
            <Col
              className="ghjhtgfrdsfg bg-color-full bg-right"
              lg={{size: 4}}
              md={{size: 3}}
              sm="12">
              <Link to={'category/61d58e37d931414fd78c7fbb/لپ%20تاپ'}>
                <h2 className={' fgfdfv title mb-3'}>
                  {'خرید لپ تاپ، مک بوک، سرفیس و...'}
                </h2>
                <div className={'the-circle-inside'}></div>
                <div className={'the-circle-inside second'}></div>
                <img src={slideOffer1Img} className={'mb-3'}/>
              </Link>
            </Col>
            <Col
              className="ghjhtgfrdsfg "
              lg={{size: 8}}
              md={{size: 9}}
              sm="12">
              <ProductsSlider cat_id={'61d58e38d931414fd78c7fca'} delay={1100}/>
            </Col>
          </Row>
          <Row className={'mt-3 juytrfvbh pl-15'}>

            <Col
              className="ghjhtgfrdsfg"
              lg={{size: 8}}
              md={{size: 9}}
              sm="12">
              <ProductsSlider cat_id={'61d58e37d931414fd78c7fbd'} delay={1200}/>
            </Col>
            <Col
              className="ghjhtgfrdsfg bg-color-full bg-left"
              lg={{size: 4}}
              md={{size: 3}}
              sm="12">
              <Link to={'category/61d58e37d931414fd78c7fbd/گوشی%20هوشمند'}>
                <h2 className={' fgfdfv title mb-3'}>
                  {'خرید گوشی هوشمند، آیفون و...'}
                </h2>
                <div className={'the-circle-inside'}></div>
                <div className={'the-circle-inside second'}></div>
                <img src={slideOffer2Img}/>
              </Link>
            </Col>
          </Row>
          <Row className={'mt-3 juytrfvbh pr-15'}>
            <Col
              className="ghjhtgfrdsfg bg-color-full bg-right"
              lg={{size: 4}}
              md={{size: 3}}
              sm="12">
              <Link to={'category/61d58e37d931414fd78c7fb7/تبلت'}>
                <h2 className={' fgfdfv title mb-3'}>
                  {'خرید تبلت، آیپد و...'}
                </h2>
                <div className={'the-circle-inside'}></div>
                <div className={'the-circle-inside second'}></div>
                <img src={slideOffer3Img}/>
              </Link>
            </Col>

            <Col
              className="ghjhtgfrdsfg"
              lg={{size: 8}}
              md={{size: 9}}
              sm="12">
              <ProductsSlider cat_id={'61d58e37d931414fd78c7fb7'} delay={2500}/>
            </Col>
          </Row>
          <Row className={'mt-3 juytrfvbh pl-15'}>
            <Col
              className="ghjhtgfrdsfg "
              lg={{size: 8}}
              md={{size: 9}}
              sm="12">
              <ProductsSlider cat_id={'61d58e37d931414fd78c7fb9'} delay={2300}/>
            </Col>

            <Col
              className="ghjhtgfrdsfg bg-color-full bg-left"
              lg={{size: 4}}
              md={{size: 3}}
              sm="12">
              <Link to={'category/61d58e37d931414fd78c7fb9/ساعت%20و%20مچ%E2%80%8Cبند%20هوشمند'}>
                <h2 className={' fgfdfv title mb-3'}>
                  {'خرید ساعت هوشمند، اپل واچ، گلکسی واچ و...'}
                </h2>
                <div className={'the-circle-inside'}></div>
                <div className={'the-circle-inside second'}></div>
                <img src={slideOffer4Img}/>
              </Link>
            </Col>
          </Row>
          <Row className={'mt-3 juytrfvbh pr-15'}>
            <Col
              className="ghjhtgfrdsfg bg-color-full bg-right"
              lg={{size: 4}}
              md={{size: 3}}
              sm="12">
              <Link to={'category/61d58e37d931414fd78c7fbc/کنسول%20های%20بازی'}>
                <h2 className={' fgfdfv title mb-3'}>
                  {'خرید کنسول بازی'}
                </h2>
                <div className={'the-circle-inside'}></div>
                <div className={'the-circle-inside second'}></div>
                <img src={slideOffer5Img}/>
              </Link>
            </Col>

            <Col
              className="ghjhtgfrdsfg"
              lg={{size: 8}}
              md={{size: 9}}
              sm="12">
              <ProductsSlider cat_id={'61d58e37d931414fd78c7fbc'} delay={2100}/>
            </Col>
          </Row>
          <Row className={'mt-3 juytrfvbh pl-15'}>

            <Col
              className="ghjhtgfrdsfg"
              lg={{size: 8}}
              md={{size: 9}}
              sm="12">
              <ProductsSlider cat_id={'61d58e37d931414fd78c7fba'} delay={3000}
                              include={['61d71de1365a2313a16147e2', '61d71c94365a2313a161449d', '61d71de8365a2313a1614806', '61d71de6365a2313a16147f2', '61d71d68365a2313a1614675', '61d71d00365a2313a161458c', '61d71c60365a2313a161443b']}/>
            </Col>
            <Col
              className="ghjhtgfrdsfg bg-color-full bg-left"
              lg={{size: 4}}
              md={{size: 3}}
              sm="12">
              <Link to={'category/61d58e37d931414fd78c7fba/لوازم%20جانبی'}>
                <h2 className={' fgfdfv title mb-3'}>
                  {'خرید لوازم جانبی'}
                </h2>
                <div className={'the-circle-inside'}></div>
                <div className={'the-circle-inside second'}></div>
                <img src={slideOffer6Img}/>
              </Link>
            </Col>
          </Row>
          <Row className={"mt-3 juytrfvbh pl-15"}>

            <Col
              className="ghjhtgfrdsfg"
              lg={{ size: 12 }}
              md={{ size: 12 }}
              sm="12">
              <div className={"title mb-3 p-2"}>
                <BallotIcon className={"mr-2"}/> {t("Latest from blog")}
              </div>
              <PostSlider delay={2000}/>
            </Col>
          </Row>



        </Col>}


        {(!showSlide) && <Col
          className="main-content iuytfghj pb-5 "
          lg={{ size: 9 }}
          md={{ size: 8 }}
          sm="12"
          tag="main">
          <Sort/>
          <InfiniteScroll
            pageStart={0}
            initialLoad={initialLoad}
            loadMore={() =>
              !initialLoad && !loadingMoreItems ? loadProductItems() : null
            }
            hasMore={hasMoreItems}
            catid={catid}
            loader={loader}
            offset={offset}
            className={"row p-3 productsmobile "}
            element="div">
            {tracks && tracks.map((i, idxx) => (
              <Col key={idxx} lg="2"
                   md="3"
                   sm="4"
                   xs="6" className={"nbghjk post-style-" + postCardMode}>

                <PostCard item={i} method={postCardMode}/>

              </Col>
            ))}
          </InfiniteScroll>

          {single && (
            <div className={"kjuyhgfdfgh modallllll " + single}>
              <div className="col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                <Product match={{ params: { _id: single_id } }}></Product>
              </div>
            </div>
          )}
        </Col>}
      </Row>
    </div>
  );
};
export const HomeServer = [
  {
    func: loadProducts,
    params: "61d58e38d931414fd78c7fca"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fbd"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fb7"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fb9"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fbc"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fba"
  },
  {
    func: loadPosts,
    params: null
  },
  {
    func: fetchCats,
    params: null
  }];
// export const HomeServer = loadProducts;
// export const HomeServerArgument = "61d58e37d931414fd78c7fba";
// export const HomeServer = fetchData("61d58e37d931414fd78c7fba");
export default withTranslation()(Home);
