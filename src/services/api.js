import verticals from '../mock-data/verticals.json';
import categories from '../mock-data/categories.json';
import courses from '../mock-data/courses.json';
import lessons from '../mock-data/lessons.json';

class API {

  //all methods mock http requests to server

  getVerticals() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(verticals);
      }, 1000);
    })
  }

  getCategories(verticalId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const verticalCategories = categories.filter(
          ({ Verticals }) => Verticals === verticalId
        );
        resolve(verticalCategories);
      }, 1000)
    })
  }

  getCourses(categorieId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categorieCourses = courses.filter(
          ({ Categories }) => Categories === categorieId
        );
        resolve(categorieCourses);
      }, 1000)
    })
  }

  getCourseLessons(courseId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const courseLessons = lessons.filter(
          ({ Courses }) => Courses === courseId
        );
        resolve(courseLessons);
      }, 0)
    })
  }
}

export default new API();

