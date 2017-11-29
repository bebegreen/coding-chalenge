import React from 'react';
import styled from 'styled-components';

const OffcanvasContainer = styled.div`
  background: ${({ background }) => background}; 
  position: fixed; 
  top: 0; 
  left: 0; 
  height: 100vh; 
  width: 100%; 
  color: white; 
  z-index: 500; 
  @media (min-width: 740px) { 
    box-shadow: 1px 0px 10px black;
    width: 30%; 
    z-index: ${({ position }) => position === 'courses' ? 100 : 200 };
    left: ${({ position }) => position === 'courses' ? '30%' : 0 }; 
  }
`;
const CloseBtn = styled.div`
  position: absolute; 
  right: 5px; 
  top: 0; 
  font-size: 30px; 
  cursor: pointer; 
`;

export const Offcanvas = (props) => (

  <OffcanvasContainer background={props.background} onClick={(e) => e.stopPropagation()} position={props.for}>
    <CloseBtn onClick={props.closeHandler}>
      {props.for === 'courses' ? <div>&larr;</div> : <div> &#x274C;</div>}
    </CloseBtn>
    {props.children}
  </OffcanvasContainer>

)
