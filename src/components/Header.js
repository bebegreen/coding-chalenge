import React from 'react'; 
import styled from 'styled-components'; 

const HeaderContainer = styled.header`
  width: 100%; 
  display: flex; 
  height: 60px; 
  background: #333333; 
  align-items: center; 
  padding: 0 20px; 
`; 

const Logo = styled.img`
  width: 100px; 
  height: 100px; 
`; 

const Header = () => (
  <HeaderContainer>
    <Logo src={'https://passion.io/assets/passion-logo-4e5901772a222fd6c982560e8a7cda71.svg'} />
  </HeaderContainer>
) 

export default Header;