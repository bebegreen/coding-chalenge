import React, { Component } from 'react';
import { MenuItem } from '../../app/app.styled'; 

const Course = (props) => (
  <MenuItem>
    {props.children}
  </MenuItem>
)

export default Course;