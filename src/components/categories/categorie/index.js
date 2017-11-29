import React, { Component } from 'react';
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



