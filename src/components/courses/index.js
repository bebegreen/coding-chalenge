import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners'; 
import Course from './course';
import { Offcanvas } from '../offcanvas/index';
import { SpinnerWrapper } from '../app/app.styled'; 

export default class Courses extends Component {
  render() {
    const { courses, closeHandler, loading } = this.props;
    return (
      <Offcanvas background={'#8f00ff'} closeHandler={closeHandler} for={'courses'}>
        {
          loading && 
          <SpinnerWrapper>
            <ClipLoader />
          </SpinnerWrapper>
        }
        
        {
          !loading &&
          courses.map((course) => (
            <Course key={course.Id}>
              {course.Name}
            </Course>
          ))
        }
      </Offcanvas>
    );
  }
}