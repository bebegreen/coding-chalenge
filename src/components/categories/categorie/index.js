import React, { Component } from 'react';
import styled from 'styled-components'; 
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Courses from '../../courses';
import API from '../../../utils/api';
import { MenuItem } from '../../app/app.styled'; 

export default class Categorie extends Component {  
  render() {
    const { categorieClickHandler, Id } = this.props;
    return (
      <MenuItem onClick={() => categorieClickHandler(Id)} >
        {this.props.children}
      </MenuItem>
    );
  }
}



