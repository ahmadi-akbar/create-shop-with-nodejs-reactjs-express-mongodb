import React from 'react';
import {NavLink as RouteNavLink} from 'react-router-dom';
import {NavItem, NavLink} from 'shards-react';

const SidebarCatItem = ({item, onClick, onHandle, parent, className, children}) => {
  // console.log('className',className);
  if (item)
    return (
      <NavItem className={(className == item._id) ? 'active' : ''}>
        {/*<div className={'nav-link-wrapper'}>*/}
          <NavLink
            className={!parent ? 'nav-link-child' : !item.parent ? '' : 'active'}
            // tag={RouteNavLink}
            tag={(props) => <RouteNavLink {...props} />}
            to={
              parent
                ? parent !== 'root'
                ? `/category/${parent.to}/${parent.title.fa}`
                : '/'
                : `/category/${item.to}/${item.title.fa}`
            }
          >
            {parent && (
              <div
                className="d-inline-block item-icon-wrapper"
                dangerouslySetInnerHTML={{__html: item.htmlBefore}}
              />
            )}
            {item.title && (
              <span
                onClick={onHandle}

                className={item.parent && !parent ? 'nav-link-child-text' : ''}>
              {item.title.fa}
            </span>
            )}
            {(item.child && item.child.length > 0) && (
              <div
                className="d-inline-block item-icon-wrapper rightbuttonmenu"
                dangerouslySetInnerHTML={{__html: item.htmlAfter}}
                onClick={() => onClick()}
              />
            )}
          </NavLink>

        {/*</div>*/}
        {children}
        {/*{item.child && (*/}
        {/*<Nav className="nav--no-borders flex-column childern">*/}
        {/*{item.child.map((ch,ch1)=>{*/}
        {/*<SidebarCatItem*/}
        {/*key={ch1}*/}
        {/*item={ch}*/}
        {/*className={className}*/}
        {/*onClick={() => onClick(item)}*/}
        {/*/>*/}
        {/*})}*/}
        {/*</Nav>*/}
        {/*)}*/}
      </NavItem>
    );
  else return <></>;
};

export default SidebarCatItem;
