import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Container, Nav, NavItem, NavLink, Row} from 'shards-react';
import {Link} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import {enamadImg, payImg, spriteImg,etehadImg,etmeImg} from '#c/assets/index';

const MainFooter = ({contained, menuItems, menuItems2, menuItems3, copyright, t}) => (
  <footer className="main-footer p-2 px-3 border-top">
    <Container fluid={contained}>
      <Row>
        <Col lg={3} md={3} sm={6} xs={12}>
          <Nav className={'footer-vab'}>
            {menuItems.map((item, idx) => (
              <NavItem key={idx}>
                {item.to && (
                  <NavLink tag={Link} to={item.to}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}
                    <span>{t(item.title)}</span>

                  </NavLink>
                )}
                {item.link && (
                  <a className="nav-link" href={item.link} target={'_blank'}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}


                    <span>{t(item.title)}</span>

                  </a>
                )}
                {item.action && (
                  <Button outline size="sm" theme="primary" onClick={item.action}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}


                    <span>{t(item.title)}</span>

                  </Button>
                )}
              </NavItem>
            ))}
          </Nav>
        </Col>
        <Col lg={3} md={3} sm={6} xs={12}>
          <Nav className={'footer-vab'}>
            {menuItems3.map((item, idx) => (
              <NavItem key={idx}>
                {item.to && (
                  <NavLink tag={Link} to={item.to}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}

                    <span>{t(item.title)}</span>
                  </NavLink>
                )}
                {item.link && (
                  <a className="nav-link" href={item.link} target={'_blank'}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}

                    <span style={item.style}>{t(item.title)}</span>

                  </a>
                )}
                {item.action && (
                  <Button outline size="sm" theme="primary" onClick={item.action}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}

                    <span>{t(item.title)}</span>

                  </Button>
                )}
              </NavItem>
            ))}
          </Nav>

        </Col>
        <Col lg={3} md={3} sm={6} xs={12}>
          <Nav className={'footer-vab'}>
            {menuItems2.map((item, idx) => (
              <NavItem key={idx}>
                {item.to && (
                  <NavLink tag={Link} to={item.to}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}

                    <span>{t(item.title)}</span>
                  </NavLink>
                )}
                {item.link && (
                  <a className="nav-link" href={item.link} target={'_blank'}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}

                    <span style={item.style}>{t(item.title)}</span>

                  </a>
                )}
                {item.action && (
                  <Button outline size="sm" theme="primary" onClick={item.action}>
                    {item.icon && <i className="material-icons">{item.icon}</i>}

                    <span>{t(item.title)}</span>

                  </Button>
                )}
              </NavItem>
            ))}
          </Nav>

        </Col>

        <Col lg={3} md={3} sm={6} xs={12}>
          {/*<a referrerPolicy="origin" target="_blank"*/}
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

        </Col>

      </Row>
      <Row>
        <hr/>
      </Row>
      <Row>
        <Col lg={6} md={6} sm={6} xs={12}>
          <strong>فروشگاه آروند</strong> <i className="material-icons">copyright</i> 1400 | تمامی حقوق متعلق به آروند
          گارانتی می باشد.

        </Col>
        <Col lg={6} md={6} sm={6} xs={12} style={{textAlign: 'left'}}>
          <span>
            <span style={{fontSize:'13px'}}>پشتیبانی توسط</span>
            <a rel={'nofollow'} href={'https://idehweb.com/'} target={'_blank'} style={{marginRight: '10px'}}><img
              style={{width: '20px'}}
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
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string,
};

MainFooter.defaultProps = {
  contained: false,
  copyright: '',
  menuItems: [


    {
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

    }
  ],
  menuItems2: [


    {
      title: 'support@yasiman.shop',
      link: 'mailto:support@yasiman.shop',
      icon: 'mail'

    },

    {
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


    },
    {
      title: 'تهران،خیابان میرداماد،مجتمع کامپیوتر پایتخت،برج A،طبقه۹،واحد ۹۰۱',
      link: 'mailto:support@yasiman.shop',
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

};

export default withTranslation()(MainFooter);
