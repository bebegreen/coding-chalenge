import styled, { keyframes } from 'styled-components';

export const VerticalContainer = styled.div`
  padding: 1em; 
  font-size: 25px;
  position: relative; 
  background-image: url(${({ imageUrl }) => imageUrl });
  background-position: center center;
  background-size: cover;
  min-height: 300px;  
  cursor: pointer; 
  grid-area: ${({ gridArea }) => gridArea}; 
  width: 100%; 
  transition: all 0.3s; 
  &:hover { 
    transform: scale(1.01);  
  }
`;

