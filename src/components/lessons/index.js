import React from 'react'
import { UnmountClosed } from 'react-collapse';
import { LessonContainer, LessonLength, LessonName } from './lessons.styled';


const Lessons = (props) => {
  const { isOpened, lessons } = props; 

  return (
    <ul style={{ padding: 0 }}>
      <UnmountClosed isOpened={isOpened}>
        {
          lessons ?
            lessons.map(({ Name, length }) => (
              <LessonContainer key={Name} onClick={(e) => { e.stopPropagation() }}>
               
                <LessonName>
                  <i className="fa fa-play-circle-o" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                  {Name}
                </LessonName>

                <LessonLength>
                  {length}
                </LessonLength>

              </LessonContainer>
            )) : '' // unmountclick children can't be undefined
        }
      </UnmountClosed>
    </ul>
  )
}
export default Lessons; 