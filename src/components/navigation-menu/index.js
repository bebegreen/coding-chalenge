import React from 'react';
import { ClipLoader } from 'react-spinners';
import { UnmountClosed } from 'react-collapse';
import {
  NavigationMenuContainer,
  CloseBtn,
  SpinnerWrapper,
  MenuItem,
  Title,
  Icon,
  List,
  NestedItem,
  LessonName,
  LessonLength
} from './navigation-menu.styled';

const NavigationMenu = (props) => {

  const { list, type, title, loading,
    itemClickHandler, closeHandler,
    courseVideosOpen, currentCourseId, nestedItems } = props;

  return (

    <NavigationMenuContainer
      type={type}
    >

      <Title>
        {title}
      </Title>

      <CloseBtn onClick={closeHandler}>
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

                <UnmountClosed isOpened={item.Id === currentCourseId}>
                  {
                    nestedItems &&
                    nestedItems.map(({ Name, length }) => (
                      <NestedItem>
                        <LessonName>
                          <i className="fa fa-play-circle-o" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                          {Name}
                        </LessonName>
                        <LessonLength>{length}</LessonLength>
                      </NestedItem>
                    ))
                  }
                </UnmountClosed>

              </MenuItem>)
            )
          }
        </List>
      }

    </NavigationMenuContainer>
  )
}

export default NavigationMenu; 