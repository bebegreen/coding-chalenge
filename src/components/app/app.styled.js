import styled from 'styled-components';

export const VerticalsContainer = styled.section`
  display: grid; 
  grid-template-columns: 100%; 
  min-height: 100vh; 
  grid-auto-rows: auto; 
  grid-gap: 4px; 
  grid-template-areas: 'a' 'b' 'c'; 
  @media (min-width: 740px) { 
    grid-template-areas: 'a b' 'a c'; 
    grid-template-columns: 60% 40%; 
    grid-template-rows: 1fr; 
  }
`;

export const Main = styled.main`
  padding: 4px; 
  @media (min-width: 740px) { 
    padding: 50px; 
  }
`;

export const ShadowBody = styled.section`
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100vh; 
  z-index: 100; 
  background: rgba(0, 0, 0, 0.5); 
`; 

export const SpinnerWrapper = styled.div`
  display: flex; 
  justify-content: center;  
  margin: 50px 0; 
`; 
