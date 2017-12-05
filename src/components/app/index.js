import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { BarLoader } from 'react-spinners';
import API from '../../services/api';
import Vertical from '../vertical';
import Lessons from '../lessons';
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
    this.getFromServer = this.getFromServer.bind(this); 
  }
  state = {
    loadingVerticals: false,
    loadingCategories: false,
    loadingCourses: false,
    error: false,
    categoriesMenuOpen: false,
    coursesMenuOpen: false,
    displayedVerticals: null,
    displayedCategories: null,
    displayedCourses: null,
    displayedLessons: null,
    currentCourseId: null
  }

  async componentWillMount() {
    // get all verticals no need for specific id
    this.getFromServer(null, 'Verticals', API.getVerticals)
  }

  async getFromServer(id, items, apiFunc) {
    try {
      this.setState({ [`loading${items}`]: true });
      const resolvedItems = await apiFunc(id);
      this.setState({ [`displayed${items}`]: resolvedItems, [`loading${items}`]: false })
    }
    catch (err) {
      this.setState({ error: true })
    }
  }

  toggleCategories(id) {
    const { categoriesMenuOpen } = this.state;
    !categoriesMenuOpen && this.getFromServer(id, 'Categories', API.getCategories);
    
    this.setState({ categoriesMenuOpen: !categoriesMenuOpen, coursesMenuOpen: false });
  }

  toggleCourses(bool) {
    const { coursesMenuOpen } = this.state;
    this.setState({ coursesMenuOpen: bool });
  }

  handleCategorieClick(id) {
    this.getFromServer(id, 'Courses', API.getCourses); 
    this.toggleCourses(true); 
  }

  handleCourseClick(id) {
    const { currentCourseId } = this.state;
    // lessons of course are not opened and a different course was clicked
    if (!currentCourseId || id !== currentCourseId) {
      this.getFromServer(id, 'Lessons', API.getCourseLessons); 
      this.setState({ currentCourseId: id });
    } else {
      this.setState({ currentCourseId: null });
    }
  }

  render() {
    const { loadingVerticals, error, displayedVerticals, categoriesMenuOpen,
      displayedCategories, coursesMenuOpen, displayedCourses,
      loadingCategories, loadingCourses,
      displayedLessons, currentCourseId } = this.state;

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
            displayedVerticals &&
            <VerticalsContainer>
              {
                displayedVerticals.map(({ Id, Name, imageUrl }, i) => (
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
                clickedItemId={currentCourseId}
              >
                <Lessons lessons={displayedLessons} />
              </NavigationMenu>
            }

          </ReactCSSTransitionGroup>

        </Main>
      </div>
    );
  }
}

export default App;
