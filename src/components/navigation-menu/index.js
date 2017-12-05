import React from 'react';
import { ClipLoader } from 'react-spinners';
import {
  NavigationMenuContainer,
  CloseBtn,
  SpinnerWrapper,
  MenuItem,
  Title,
  Icon,
  List,
  ItemName,
  DropDownIcon
} from './navigation-menu.styled';

const NavigationMenu = (props) => {
  const { list, type, title, loading,
    itemClickHandler, closeHandler, clickedItemId } = props;

  const nested = type === 'nested';

  return (

    <NavigationMenuContainer
      type={type}
    >

      <Title>
        {title}
      </Title>

      <CloseBtn onClick={closeHandler}>
        {nested ? <Icon>&larr;</Icon> : <Icon> &#x274C;</Icon>}
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
            list.map(item => {
              const clicked = item.Id === clickedItemId;
              return (
                <MenuItem
                  key={item.Id}
                  onClick={() => itemClickHandler(item.Id)}
                >

                  <ItemName>

                    {item.Name}

                    {
                      nested &&
                      <DropDownIcon clicked={clicked}>
                        <i className="fa fa-caret-down" aria-hidden="true"></i>
                      </DropDownIcon>
                    }

                  </ItemName>

                  {
                    // if it's a nested menu, render children and pass props 
                    nested &&
                    React.cloneElement(props.children,
                      { isOpened: clicked })
                  }

                </MenuItem>
              )
            })
          }
        </List>
      }

    </NavigationMenuContainer>
  )
}

export default NavigationMenu; 