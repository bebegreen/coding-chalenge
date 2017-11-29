import React, { Component } from 'react';
import {ClipLoader} from 'react-spinners'; 
import Categorie from './categorie';
import { Offcanvas } from '../offcanvas/index';
import { SpinnerWrapper } from '../app/app.styled'; 

export default class Categories extends Component {

  render() {
    const {closeHandler, categories, categorieClickHandler, loading } = this.props;
    
    return (

      <Offcanvas background={'#008061'} closeHandler={closeHandler}>
        { 
          loading &&
          <SpinnerWrapper>
            <ClipLoader/>
          </SpinnerWrapper>
        }  
        {
          !loading &&
          categories.map(cat => (
            <Categorie
              key={cat.Id}
              Id={cat.Id}
              categorieClickHandler={categorieClickHandler}
            >
              <div>
                {cat.Name}
              </div>
            </Categorie>)
          )
        }
      </Offcanvas>

    );
  }
}