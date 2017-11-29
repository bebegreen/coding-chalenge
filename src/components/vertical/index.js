import React from 'react';
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