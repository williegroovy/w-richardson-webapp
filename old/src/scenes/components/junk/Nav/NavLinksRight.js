import React from 'react';
import { compose } from 'recompose';

import { toggle } from '../../../helpers/focusCard';
import { authenticated } from '../../../helpers/user';

import Nav from './MainNav';

const NavLinksRight = (props) => {
  return(
    <Nav>
      <ul className="nav navbar-nav pull-right">
        {props.children}
      </ul>
    </Nav>
  );
};

let enhance = compose(
  toggle(),
  authenticated(),
);

export default enhance(NavLinksRight);