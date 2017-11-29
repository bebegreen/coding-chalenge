import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import API from '../../utils/api';
import Categories from '../categories';
import { VerticalContainer } from './vertical.styled';

const Vertical = (props) => {
  
    const { children, imageUrl, gridArea, clickHandler, Id } = props;

    return (
      <VerticalContainer
        onClick={() => clickHandler(Id)}
        imageUrl={imageUrl}
        gridArea={gridArea}
      >
        {children}

      </VerticalContainer>
    );
}

export default Vertical;