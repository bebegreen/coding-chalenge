import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { BarLoader } from 'react-spinners';
import API from '../../utils/api';
import Vertical from '../vertical';
import NavigationMenu from '../navigation-menu';
import Header from '../Header';
import { GRID_AREAS } from '../../constants'
import { VerticalsContainer, Main, ShadowBody, SpinnerWrapper } from './app.styled';

class App extends Component {
  constructor() {
    super();
    this.toggleCategories = this.toggleCategories.bind(this);
    this.toggleCourses = this.toggleCourses.bind(this);
    this.handleCategorieClick = this.handleCategorieClick.bind(this);
    this.handleCourseClick = this.handleCourseClick.bind(this);
  }
  state = {
    loadingVerticals: false,
    loadingCategories: false,
    loadingCourses: false,
    error: false,
    verticals: null,
    displayedCategories: null,
    displayedCourses: null,
    displayedLessons: null,
    categoriesMenuOpen: false,
    coursesMenuOpen: false,
    courseLessonsOpen: false,
    currentCourseId: null
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

  async getLessons(id) {
    try {
      const displayedLessons = await API.getCourseLessons(id);
      this.setState({ displayedLessons }, () => {
        console.log(this.state);
      })
    }
    catch (err) {
      this.setState({ error: true });
    }
  }

  toggleCategories(id) {
    const { categoriesMenuOpen } = this.state;
    // if menu is opening get categories
    !categoriesMenuOpen && this.getCategories(id);
    this.setState({ categoriesMenuOpen: !categoriesMenuOpen, coursesMenuOpen: false });
  }

  handleCategorieClick(id) {
    this.getCourses(id);
    this.toggleCourses(true)
  }

  toggleCourses(bool) {
    const { coursesMenuOpen } = this.state;
    this.setState({ coursesMenuOpen: bool });
  }

  handleCourseClick(id) {
    const { currentCourseId } = this.state;
    if (!currentCourseId || id !== currentCourseId) {  
      this.getLessons(id);
      this.setState({ currentCourseId: id, courseLessonsOpen: true });
    } else { 
      this.setState({ currentCourseId: null }); 
    }
  }

  render() {
    const { loadingVerticals, error, verticals, categoriesMenuOpen,
      displayedCategories, coursesMenuOpen, displayedCourses,
      loadingCategories, loadingCourses,
      displayedLessons, courseLessonsOpen, currentCourseId } = this.state;
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

          <ReactCSSTransitionGroup
            transitionName="slide"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {
              categoriesMenuOpen &&
              <NavigationMenu
                list={displayedCategories}
                itemClickHandler={this.handleCategorieClick}
                closeHandler={this.toggleCategories}
                loading={loadingCategories}
                title={'categories'}
              />
            }
            {
              coursesMenuOpen &&
              <NavigationMenu
                list={displayedCourses}
                itemClickHandler={this.handleCourseClick}
                closeHandler={() => this.toggleCourses(false)}
                loading={loadingCourses}
                title={'courses'}
                type={'nested'}
                nestedItems={displayedLessons}
                courseLessonsOpen={courseLessonsOpen}
                currentCourseId={currentCourseId}
              />
            }

          </ReactCSSTransitionGroup>

        </Main>
      </div>
    );
  }
}

export default App;
