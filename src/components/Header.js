import React from 'react'; 
import styled from 'styled-components'; 

const HeaderContainer = styled.header`
  width: 100%; 
  display: flex; 
  height: 60px; 
  background: #333333; 
  align-items: center; 
  padding: 0 20px; 
  font-family: 'Fredoka One', cursive;
  color: white; 
  justify-content: space-between; 
`; 

const Logo = styled.img`
  width: 100px; 
  height: 100px; 
`; 

const Header = () => (
  <HeaderContainer>
    <h1>Beautiful logo</h1>
    <p>login</p> 
  </HeaderContainer>
) 

export default Header;