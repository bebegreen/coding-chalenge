import React from 'react';
import { ClipLoader } from 'react-spinners';
import {
  NavigationMenuContainer,
  CloseBtn,
  SpinnerWrapper,
  MenuItem,
  Title,
  Icon,
  List
} from './navigation-menu.styled';

const NavigationMenu = (props) => {

  const { list, type, title, loading, itemClickHandler } = props;

  return (

    <NavigationMenuContainer
      onClick={(e) => e.stopPropagation()}
      type={type}
    >

      <Title>
        {title}
      </Title>

      <CloseBtn onClick={props.closeHandler}>
        {type === 'nested' ? <Icon>&larr;</Icon> : <Icon> &#x274C;</Icon>}
      </CloseBtn>
      {
        loading &&
        <SpinnerWrapper>
          <ClipLoader />
        </SpinnerWrapper>
      }

      {
        !loading &&
        <List>
          {
            list.map(item => (
              <MenuItem
                key={item.Id}
                onClick={() => itemClickHandler(item.Id)}
              >
                {item.Name}
              </MenuItem>)
            )
          }
        </List>
      }
    </NavigationMenuContainer>
  )
}

export default NavigationMenu; 