import styled from 'styled-components'; 

export const LessonContainer = styled.li`
  padding: 1em; 
  background: white; 
  color: gray; 
  display: flex; 
  justify-content: space-between; 
  align-content: center; 
  transition: all 0.5s; 
  &:hover { 
    background: lightgrey; 
  }
`;

export const LessonName = styled.p`
  margin: 0; 
  font-weight: bold; 
`;

export const LessonLength = styled.p`
  margin: 0; 
  &:after { 
    content: ' min'; 
  }
`; 