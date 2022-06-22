<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Container, Nav, NavItem, NavLink, Row} from 'shards-react';
import {Link} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import {enamadImg, payImg, spriteImg,etehadImg,etmeImg} from '#c/assets/index';

const MainFooter = ({contained, menuItems, menuItems2, menuItems3, copyright, t}) => (
=======
import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Nav, NavItem, NavLink, Row } from "shards-react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { enamadImg, etehadImg, etmeImg, payImg, spriteImg } from "#c/assets/index";
import InfoIcon from '@mui/icons-material/Info';
import CopyrightIcon from '@mui/icons-material/Copyright';
import HelpIcon from '@mui/icons-material/Help';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import MapIcon from '@mui/icons-material/Map';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import RoomIcon from '@mui/icons-material/Room';
import LinkIcon from '@mui/icons-material/Link';
const MainFooter = ({ contained, menuItems, menuItems2, menuItems3, copyright, t }) => (
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
  <footer className="main-footer p-2 px-3 border-top">
    <Container fluid={contained}>
      <Row>
        <Col lg={3} md={3} sm={6} xs={12}>
<<<<<<< HEAD
          <Nav className={'footer-vab'}>
=======
          <Nav className={"footer-vab"}>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
            {menuItems.map((item, idx) => (
              <NavItem key={idx}>
                {item.to && (
                  <NavLink tag={Link} to={item.to}>
<<<<<<< HEAD
                    {item.icon && <i className="material-icons">{item.icon}</i>}
=======
                    {item.icon}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
                    <span>{t(item.title)}</span>

                  </NavLink>
                )}
                {item.link && (
<<<<<<< HEAD
                  <a className="nav-link" href={item.link} target={'_blank'}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}
=======
                  <a className="nav-link" href={item.link} target={"_blank"}>
                    {item.icon}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606


                    <span>{t(item.title)}</span>

                  </a>
                )}
                {item.action && (
                  <Button outline size="sm" theme="primary" onClick={item.action}>
<<<<<<< HEAD
                    {item.icon && <i className="material-icons">{item.icon}</i>}
=======
                    {item.icon}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606


                    <span>{t(item.title)}</span>

                  </Button>
                )}
              </NavItem>
            ))}
          </Nav>
        </Col>
        <Col lg={3} md={3} sm={6} xs={12}>
<<<<<<< HEAD
          <Nav className={'footer-vab'}>
=======
          <Nav className={"footer-vab"}>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
            {menuItems3.map((item, idx) => (
              <NavItem key={idx}>
                {item.to && (
                  <NavLink tag={Link} to={item.to}>
<<<<<<< HEAD
                    {item.icon && <i className="material-icons">{item.icon}</i>}
=======
                    {item.icon}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

                    <span>{t(item.title)}</span>
                  </NavLink>
                )}
                {item.link && (
<<<<<<< HEAD
                  <a className="nav-link" href={item.link} target={'_blank'}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}
=======
                  <a className="nav-link" href={item.link} target={"_blank"}>
                    {item.icon}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

                    <span style={item.style}>{t(item.title)}</span>

                  </a>
                )}
                {item.action && (
                  <Button outline size="sm" theme="primary" onClick={item.action}>
<<<<<<< HEAD
                    {item.icon && <i className="material-icons">{item.icon}</i>}
=======
                    {item.icon}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

                    <span>{t(item.title)}</span>

                  </Button>
                )}
              </NavItem>
            ))}
          </Nav>

        </Col>
        <Col lg={3} md={3} sm={6} xs={12}>
<<<<<<< HEAD
          <Nav className={'footer-vab'}>
=======
          <Nav className={"footer-vab"}>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
            {menuItems2.map((item, idx) => (
              <NavItem key={idx}>
                {item.to && (
                  <NavLink tag={Link} to={item.to}>
<<<<<<< HEAD
                    {item.icon && <i className="material-icons">{item.icon}</i>}
=======
                    {item.icon}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

                    <span>{t(item.title)}</span>
                  </NavLink>
                )}
                {item.link && (
<<<<<<< HEAD
                  <a className="nav-link" href={item.link} target={'_blank'}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}
=======
                  <a className="nav-link" href={item.link} target={"_blank"}>
                    {item.icon}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

                    <span style={item.style}>{t(item.title)}</span>

                  </a>
                )}
                {item.action && (
                  <Button outline size="sm" theme="primary" onClick={item.action}>
<<<<<<< HEAD
                    {item.icon && <i className="material-icons">{item.icon}</i>}
=======
                    {item.icon}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

                    <span>{t(item.title)}</span>

                  </Button>
                )}
              </NavItem>
            ))}
          </Nav>

        </Col>

        <Col lg={3} md={3} sm={6} xs={12}>
          {/*<a referrerPolicy="origin" target="_blank"*/}
<<<<<<< HEAD
          <a href="https://trustseal.enamad.ir/?id=241851&amp;Code=hrxu9BF17RpeBTUTcX9o" target="_blank" rel={'nofollow'}>
            <img className={'hgfdesw'} src={enamadImg} alt="enamad"/>
          </a>
          <a href="https://www.itunion.ir/" target="_blank" rel={'nofollow'}>
            <img className={'hgfdesw'} src={etehadImg} alt="etehadie"/>
          </a>
          <a href="http://ttu.ir/" target="_blank" rel={'nofollow'}>
            <img className={'hgfdesw'} src={etmeImg} alt="etehadie"/>
          </a>
          <img src={payImg} style={{margin: 'auto', marginTop: '10px', display: 'block'}} alt="payment"/>
=======
          <a href="https://trustseal.enamad.ir/?id=241851&amp;Code=hrxu9BF17RpeBTUTcX9o" target="_blank"
             rel={"nofollow"}>
            <img className={"hgfdesw"} src={enamadImg} alt="enamad"/>
          </a>
          <a href="https://www.itunion.ir/" target="_blank" rel={"nofollow"}>
            <img className={"hgfdesw"} src={etehadImg} alt="etehadie"/>
          </a>
          <a href="http://ttu.ir/" target="_blank" rel={"nofollow"}>
            <img className={"hgfdesw"} src={etmeImg} alt="etehadie"/>
          </a>
          <img src={payImg} style={{ margin: "auto", marginTop: "10px", display: "block" }} alt="payment"/>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

        </Col>

      </Row>
      <Row>
        <hr/>
      </Row>
      <Row>
        <Col lg={6} md={6} sm={6} xs={12}>
<<<<<<< HEAD
          <strong>فروشگاه آروند</strong> <i className="material-icons">copyright</i> 1400 | تمامی حقوق متعلق به آروند
          گارانتی می باشد.

        </Col>
        <Col lg={6} md={6} sm={6} xs={12} style={{textAlign: 'left'}}>
          <span>
            <span style={{fontSize:'13px'}}>پشتیبانی توسط</span>
            <a rel={'nofollow'} href={'https://idehweb.com/'} target={'_blank'} style={{marginRight: '10px'}}><img
              style={{width: '20px'}}
=======
          <strong>فروشگاه آروند</strong> <CopyrightIcon/> 1400 | تمامی حقوق متعلق به آروند
          گارانتی می باشد.

        </Col>
        <Col lg={6} md={6} sm={6} xs={12} style={{ textAlign: "left" }}>
          <span>
            <span style={{ fontSize: "13px" }}>پشتیبانی توسط</span>
            <a rel={"nofollow"} href={"https://idehweb.com/"} target={"_blank"} style={{ marginRight: "10px" }}><img
              style={{ width: "20px" }}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
              src={spriteImg}/></a></span>
        </Col>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
<<<<<<< HEAD
   * The menu items array.
=======
   * The menu items araray.
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
<<<<<<< HEAD
  copyright: PropTypes.string,
=======
  copyright: PropTypes.string
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
};

MainFooter.defaultProps = {
  contained: false,
<<<<<<< HEAD
  copyright: '',
=======
  copyright: "",
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
  menuItems: [


    {
<<<<<<< HEAD
      title: 'درباره ما',
      link: 'https://www.arvandguarantee.com/about-us/',
      icon: 'info'
    },
    {
      title: 'سوالات متداول',
      link: 'https://www.arvandguarantee.com/%d8%b3%d9%88%d8%a7%d9%84%d8%a7%d8%aa-%d9%85%d8%aa%d8%af%d8%a7%d9%88%d9%84/',
      icon: 'question_mark'

    },
    {
      title: 'حفظ حریم شخصی',
      link: 'https://www.arvandguarantee.com/privacy-policy/',
      icon: 'privacy_tip'

    },
    {
      title: 'آدرس، ارتباط با ما',
      link: 'https://www.arvandguarantee.com/contact-us-2/',
      icon: 'map'
=======
      title: "درباره ما",
      link: "https://www.arvandguarantee.com/about-us/",
      icon: <InfoIcon/>
    },
    {
      title: "سوالات متداول",
      link: "https://www.arvandguarantee.com/%d8%b3%d9%88%d8%a7%d9%84%d8%a7%d8%aa-%d9%85%d8%aa%d8%af%d8%a7%d9%88%d9%84/",
      icon: <HelpIcon/>

    },
    {
      title: "حفظ حریم شخصی",
      link: "https://www.arvandguarantee.com/privacy-policy/",
      icon: <PrivacyTipIcon/>

    },
    {
      title: "آدرس، ارتباط با ما",
      link: "https://www.arvandguarantee.com/contact-us-2/",
      icon: <MapIcon/>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

    }
  ],
  menuItems2: [


    {
<<<<<<< HEAD
      title: 'support@arvandguarantee.shop',
      link: 'mailto:support@arvandguarantee.shop',
      icon: 'mail'
=======
      title: "support@localhost:3001",
      link: "mailto:support@localhost:3001",
      icon: <AlternateEmailIcon/>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

    },

    {
<<<<<<< HEAD
      title: '+98(902)42 528 02',
      link: 'tel:+989024252802',
      icon: 'phone',
      style: {direction: 'ltr', display: 'inline-block'}

    },
    {
      title: '+98(21)42 528 000',
      link: 'tel:+982142528000',
      icon: 'phone',
      style: {direction: 'ltr', display: 'inline-block'}
=======
      title: "+98(902)42 528 02",
      link: "tel:+989024252802",
      icon: <PhoneIphoneIcon/>,
      style: { direction: "ltr", display: "inline-block" }

    },
    {
      title: "+98(21)42 528 000",
      link: "tel:+982142528000",
      icon: <PhoneEnabledIcon/>,
      style: { direction: "ltr", display: "inline-block" }
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606


    },
    {
<<<<<<< HEAD
      title: 'تهران،خیابان میرداماد،مجتمع کامپیوتر پایتخت،برج A،طبقه۹،واحد ۹۰۱',
      link: 'mailto:support@arvandguarantee.shop',
      icon: 'room',
      style: {lineHieght: '20px'}


    },
  ],
  menuItems3: [
    {
      title: 'تعمیرات در آروند',
      link: 'https://www.arvandguarantee.com/repair-request',
      icon: 'link'

    }, {
      title: 'سایت آروند گارانتی',
      link: 'https://www.arvandguarantee.com',
      icon: 'link'

    }, {
      title: 'ضمانت نامه سبز آروند',
      link: 'https://www.arvandguarantee.com/green-guarantee/',
      icon: 'link'

    }, {
      title: 'ضمانت تکمیلی طلایی آروند',
      link: 'https://www.arvandguarantee.com/extendedwarranty-terms/',
      icon: 'link'

    },
  ],
=======
      title: "تهران،خیابان میرداماد،مجتمع کامپیوتر پایتخت،برج A،طبقه۹،واحد ۹۰۱",
      link: "mailto:support@localhost:3001",
      icon: <RoomIcon/>,
      style: { lineHieght: "20px" }


    }
  ],
  menuItems3: [
    {
      title: "تعمیرات در آروند",
      link: "https://www.arvandguarantee.com/repair-request",
      icon: <LinkIcon/>

    }, {
      title: "سایت آروند گارانتی",
      link: "https://www.arvandguarantee.com",
      icon: <LinkIcon/>

    }, {
      title: "ضمانت نامه سبز آروند",
      link: "https://www.arvandguarantee.com/green-guarantee/",
      icon: <LinkIcon/>

    }, {
      title: "ضمانت تکمیلی طلایی آروند",
      link: "https://www.arvandguarantee.com/extendedwarranty-terms/",
      icon: <LinkIcon/>

    }
  ]
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

};

export default withTranslation()(MainFooter);
