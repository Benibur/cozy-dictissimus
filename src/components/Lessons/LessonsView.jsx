import React, { Component } from 'react'
import Lesson               from './Lesson'


/*
Sémantique :
* classe : CM1-b de l'école Parmentier
* cours : le cours d'anglais de madame Chapuis
* lessons : contenu d'un cours
 */


export default class LessonsView extends Component {

  // displayLessonRunner(i) {
  //   console.log("displayLessonRunner !!", i);
  // }


  renderCourseLessons(lessons_id) {
    const classLessons = []
    const that = this
    return lessons_id.map(id=>{
      const lessonData = this.props.lessons.find(lesson=> lesson._id === id)
      return (
        <Lesson
          key                 = {id}
          handleDisplayRunner = {()=>that.props.displayLessonPlayer(lessonData.knowledgeItems_id)}
          data                = {lessonData}
          >
        </Lesson>
      )
    })
  }


  render(){

    const classCourses = this.props.courses.map(course =>
      <div className="class-course" key={course._id} >
        <div className="class-course-title">
          <input type="Checkbox"/>
          {`${course.level} ${course.subject} ${course.teacherName} - ${course.year}`}
          <button className="share-class-course-btn">Partager</button>
        </div>
        { this.renderCourseLessons(course.lessons_id) }
      </div>
    )

    return (
      <>
        <div className="lessons-header">
          <button className="run-selected-training">S'entrainer ▶</button>
          <div className="courses-selection">CE2 - FR</div>
          <button className="create-lesson-btn">Create lesson</button>
        </div>
        <div className="lessons-list">
          {classCourses}
        </div>
      </>
    )
  }
}
