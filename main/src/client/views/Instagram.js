import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';

import {Col, Container, Row} from 'shards-react';
import InfiniteScroll from 'react-infinite-scroller';
import {
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
} from '#c/assets/index';
// Import Swiper styles
import LoadingComponent from '#c/components/components-overview/LoadingComponent';
import Product from '#c/views/Product';
import Swiper from '#c/components/swiper';
import {enableAgent,enableAdmin, enableSell, getPosts, getPostsByCat, setCountry,} from '#c/functions/index';
import SidebarNavItems from '#c/components/layout/MainSidebar/SidebarNavItems';
import ProductsSlider from "#c/components/components-overview/ProductsSlider";

import {withTranslation} from 'react-i18next';
import PostCard from '#c/components/Home/PostCard';
import Story from '#c/components/Home/Story';

const Instagram = ({match, location, history, t}) => {
  window.scrollTo(0, 0);
  let url = new URL(window.location.href);
  let search = url.searchParams.get("search") || "";
  console.log('search', search);
  const [tracks, settracks] = useState([]);
  const myRef = useRef(null)
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [single, set_single] = useState(false);
  const [single_id, set_single_id] = useState('');
  const [offset, setoffset] = useState(-24);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [catid, setcatid] = useState(match.params._id);
  // const [search, setsearch] = useState(searchd || '');
  const [load, setLoad] = useState(null);
  const [locationKeys, setLocationKeys] = useState([]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'PUSH') setLocationKeys([location.key]);

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // Handle forward event
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          console.log('handle back');
          set_single_id('');
          set_single(false);
          // Handle back event
        }
      }
    });
  }, [locationKeys]);

  useEffect(() => {
    let url = new URL(window.location.href);
    let country = url.searchParams.get('country') || '';
    let eS = url.searchParams.get('enableSell') || '';
    if (eS) enableSell(true);

    let eA = url.searchParams.get('enableAgent') || '';
    if (eA) enableAgent(true);

    let eAd = url.searchParams.get('enableAdmin') || '';
    if (eAd) enableAdmin(true);

    if (country) {
      if (country === 'ir') setCountry('ir', false);
      if (country === 'tu') setCountry('tu', false);
      if (country === 'en') setCountry('en', false);
      location.replace('/');
    }
  }, []);

  const loadProductItems = async (page, catId = catid) => {

    console.log('==> loadProductItems():', offset, search, catId);

    // if(!loadingMoreItems){
    let newOffset = (await offset) + 24;
    if (!catId) {
      let trackss = [...tracks];

      // if (trackss.length > 0) {
      //   setInitialLoad(true);
      //   setLoadingMoreItems(false);
      //   setLoad(null);
      //   sethasMoreItems(false);
      //   return;
      // } else {
      await setoffset(newOffset);
      await setInitialLoad(false);
      await setLoadingMoreItems(true);
      getPosts(newOffset, 48, search || '').then((resp) => {
        setLoadingMoreItems(false);
        afterGetData(resp);
      });
      // }
      return;
    } else {
      await setoffset(newOffset);
      await setInitialLoad(false);
      await setLoadingMoreItems(true);
      // if (catId)
      getPostsByCat(newOffset, 24, catId, search || '').then((resp) => {
        setLoadingMoreItems(false);
        afterGetData(resp);
      });


    }
    // }
  };

  useEffect(() => {
    loadProductItems(0, catid);
  }, [catid]);

  // useEffect(() => {
  //   console.log('location.search changed:', location);
  //   sethasMoreItems(true);
  //   settracks([]);
  //   setsearch(location.search || '');
  //   setoffset(-24);
  // }, [location.search]);

  useEffect(() => {
    console.log('match.params._id', match, 'and:', catid);
    if (match.params._id !== catid) {
      setcatid(match.params._id);
      sethasMoreItems(true);
      settracks([]);
      // setsearch(location.search || '');
      setoffset(-24);
    }
  }, [match.params._id, catid]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.location.search !== this.props.location.search) {
  //     this.setState({
  //       hasMoreItems: true,
  //       tracks: [],
  //       search: this.props.location.search || '',
  //       offset: -24
  //     });
  //   }
  //   if (this.props.match.params._id !== this.state.catid) {
  //     console.log('set state...')
  //     this.setState({
  //       catid: this.props.match.params._id,
  //       hasMoreItems: true,
  //       tracks: [],
  //       search: this.props.location.search || '',
  //       offset: -24
  //     });
  //   }
  // }

  const afterGetData = (resp) => {
    let trackss = [...tracks];
    if (resp.length < 24) sethasMoreItems(false);
    console.log('resp', resp);
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

  const goToPage = (post) => {
    history.push('/p/' + post._id + '/' + post.title.fa);
    set_single_id(post._id);
    set_single(true);
  };

  // console.log('oiuytfrghjk',props);
  const loader = (
    <div className="loadNotFound loader " key={23}>
      {t('loading...')}
      <LoadingComponent height={30} width={30} type="spin" color="#3d5070"/>
    </div>
  );
  const params = {
    // slidesPerView: 4,
    spaceBetween: 15,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    grabCursor: true,
    centeredSlides: true,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 15
      },
      768: {
        navigation: {
          nextEl: null,
          prevEl: null
        },
        slidesPerView: 3,
        spaceBetween: 15
      },
      640: {
        navigation: {
          nextEl: null,
          prevEl: null
        },
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        navigation: {
          nextEl: null,
          prevEl: null
        },
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  }
  console.log('Home');
  let showSlide = true;
  if (catid || search)
    showSlide = false;
  return (
    <Container fluid className="main-content-container fghjkjhgf">
      {(showSlide) &&  <Row className="relative mt-3 mb-3">
        <Col>
          <Story/>
        </Col>
      </Row>}
      {(showSlide) && <Row className="page-header relative ">
        {/*mobilenone*/}
        <Swiper
          autoplay={true}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >

          <div className={''}>
            <div className={'relative w-full h-screen'}>
              <div className={'jhgfdfgtyhu'} style={{
                backgroundImage: `url('${slide1Img}')`,
              }}>
                <div className={'gfdsasdf'}>
                  <h1
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    رایانه های رومیزی، لپتاپ</h1>
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
                  <h1
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    گوشی هوشمند و تبلت</h1>
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
                  <h1
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    کنسول های بازی</h1>
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
                  <h1
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    ساعت و مچ بند هوشمند</h1>
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
                  <h1
                    className="text-2xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold juygtfgh">
                    لوازم جانبی</h1>
                  <p className="text-sm lg:text-base xl:text-lg text-heading kuytfgyhui">
                    هدفون و هندزفری، کیف و کاور، موس و کیبورد، کابل و شارژر
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Swiper>


      </Row>}


      <Row className="ddd">
        <Col tag="aside" lg={{size: 3}} md={{size: 4}} className={'sidebar white mobilenone'}>
          <Row className={''}>
            <Col lg={{size: 12}} md={{size: 12}}>
              <SidebarNavItems/>
            </Col>
          </Row>
        </Col>

        {(showSlide) && <Col
          className="main-content iuytfghj"
          lg={{size: 9}}
          md={{size: 8}}
          sm="12"
          tag="main">
          <Row className={'mt-3 juytrfvbh pl-15'}>

            <Col
              className="ghjhtgfrdsfg"
              lg={{size: 8}}
              md={{size: 9}}
              sm="12">
              <ProductsSlider cat_id={'622d964f8312bb1f3b5f8725'} delay={1200}/>
            </Col>
            <Col
              className="ghjhtgfrdsfg bg-color-full bg-left"
              lg={{size: 4}}
              md={{size: 3}}
              sm="12">
              <Link to={'category/622d964f8312bb1f3b5f8725/%DA%AF%DB%8C%D9%81%D8%AA%20%DA%A9%D8%A7%D8%B1%D8%AA'}>
                <h2 className={' fgfdfv title mb-3'}>
                  {'گیفت کارت - سرگرمی'}
                </h2>
                <div className={'the-circle-inside'}></div>
                <div className={'the-circle-inside second'}></div>
                <img src={slideOffer8Img}/>
              </Link>
            </Col>
          </Row>

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

        </Col>}


        {(!showSlide) && <Col
          className="main-content iuytfghj pb-5 "
          lg={{size: 9}}
          md={{size: 8}}
          sm="12"
          tag="main">
          {(!showSlide) &&  <Row className="relative mt-3 mb-3">
            <Col>
              <Story/>
            </Col>
          </Row>}
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
            className={'row p-3 productsmobile'}
            element="div">
            {tracks && tracks.map((i, idxx) => (
              <Col key={idxx} lg="2"
                   md="3"
                   sm="4"
                   xs="6" className={'nbghjk'}><PostCard item={i}/></Col>
            ))}
          </InfiniteScroll>

          {single && (
            <div className={'kjuyhgfdfgh modallllll ' + single}>
              <div className="col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                <Post match={{params: {_id: single_id}}}></Post>
              </div>
            </div>
          )}
        </Col>}

      </Row>
    </Container>
  );
};

export default withTranslation()(Instagram);
