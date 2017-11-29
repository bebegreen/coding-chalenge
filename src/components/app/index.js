import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { BarLoader } from 'react-spinners';
import Categories from '../categories';
import Courses from '../courses';
import API from '../../utils/api';
import Vertical from '../vertical';
import Header from '../Header';
import { GRID_AREAS } from '../../constants'
import { VerticalsContainer, Main, ShadowBody, SpinnerWrapper } from './app.styled';

class App extends Component {
  constructor() {
    super();
    this.toggleCategories = this.toggleCategories.bind(this);
    this.toggleCourses = this.toggleCourses.bind(this);
  }
  state = {
    loadingVerticals: false,
    loadingCategories: false,
    loadingCourses: false,
    error: false,
    verticals: null,
    displayedCategories: null,
    displayedCourses: null,
    categoriesMenuOpen: false,
    coursesMenuOpen: false
  }

  async componentWillMount() {
    try {
      this.setState({ loadingVerticals: true })
      const verticals = await API.getVerticals();
      this.setState({ verticals, loadingVerticals: false });
    }
    catch (err) {
      this.setState({ error: true })
    }
  }

  async getCategories(id) {
    try {
      this.setState({ loadingCategories: true })
      const displayedCategories = await API.getCategories(id);
      this.setState({ displayedCategories, loadingCategories: false })
    }
    catch (err) {
      this.setState({ error: true })
    }
  }

  async getCourses(id) {
    try {
      this.setState({ loadingCourses: true })
      const displayedCourses = await API.getCourses(id);
      this.setState({ displayedCourses, loadingCourses: false })
    }
    catch (err) {
      this.setState({ error: true })
    }
  }

  toggleCategories(id) {
    const { categoriesMenuOpen } = this.state;
    // if menu is opening get categories
    !categoriesMenuOpen && this.getCategories(id);
    this.setState({ categoriesMenuOpen: !categoriesMenuOpen, coursesMenuOpen: false });
  }
  toggleCourses(id) {
    const { coursesMenuOpen } = this.state;
    !coursesMenuOpen && this.getCourses(id);
    this.setState({ coursesMenuOpen: !coursesMenuOpen });
  }

  render() {
    const { loadingVerticals, error, verticals, categoriesMenuOpen,
      displayedCategories, coursesMenuOpen, displayedCourses,
      loadingCategories, loadingCourses } = this.state;
    return (
      <div>
        <Header />
        {
          categoriesMenuOpen && <ShadowBody onClick={this.toggleCategories} />
        }
        <Main>
          {
            loadingVerticals &&
            <SpinnerWrapper>
              <BarLoader
                color={'rgb(54, 215, 183)'}
              />
            </SpinnerWrapper>
          }
          {
            error && <h1>Error Occured</h1>
          }

          {
            verticals &&
            <VerticalsContainer>
              {
                verticals.map(({ Id, Name, imageUrl }, i) => (
                  <Vertical
                    key={Id}
                    Id={Id}
                    imageUrl={imageUrl}
                    gridArea={GRID_AREAS[i]}
                    clickHandler={this.toggleCategories}
                  >
                    {Name}
                  </Vertical>
                ))
              }
            </VerticalsContainer>
          }
          {
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {
                categoriesMenuOpen &&
                <Categories
                  categorieClickHandler={this.toggleCourses}
                  closeHandler={this.toggleCategories}
                  categories={displayedCategories}
                  loading={loadingCategories}
                />
              }
              {
                coursesMenuOpen &&
                <Courses
                  courses={displayedCourses}
                  closeHandler={this.toggleCourses}
                  loading={loadingCourses}
                />
              }
            </ReactCSSTransitionGroup>
          }
        </Main>
      </div>
    );
  }
}

export default App;
