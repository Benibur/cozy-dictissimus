import React, { Component } from 'react'
import Lesson               from './Lesson'
import { Checkbox  }        from 'cozy-ui/react/'
import { Button }           from 'cozy-ui/react/Button'


/*
Sémantique :
* classe : CM1-b de l'école Parmentier
* cours : le cours d'anglais de madame Chapuis
* lessons : contenu d'un cours
 */


export default class LessonsView extends Component {

  constructor(props){
    super(props)
    this.state = {
      // selectedLessons : new Set(['lesson_1']),
      selectedLessons : new Set(),
    }
    this.changeSelection     = this.changeSelection.bind(this)
    this.handleTrainingClick = this.handleTrainingClick.bind(this)
  }

  handleTrainingClick() {
    var   knowledgeItems_id = []
    const {lessons}         = this.props
    const {selectedLessons} = this.state
    selectedLessons.forEach(lesson_id => {
      const lesson = lessons.find(lesson=> lesson._id === lesson_id)
      knowledgeItems_id = knowledgeItems_id.concat(lesson.knowledgeItems_id)
    })
    this.props.displayLessonPlayer(knowledgeItems_id)
  }

  changeSelection(lesson_id, isSelected) {
    const selectedLessons = new Set(this.state.selectedLessons)
    if (isSelected) {
      selectedLessons.add(lesson_id)
    } else {
      selectedLessons.delete(lesson_id)
    }
    this.setState({selectedLessons})
  }

  renderCourseLessons(lessons_id) {

    const classLessons = lessons_id.map((id, index)=>{
      const lessonData = this.props.lessons.find(lesson=> lesson._id === id)
      lessonData.rk = index
      return (
        <Lesson
          key                 = {id}
          handleDisplayRunner = {this.props.displayLessonPlayer}
          onSelectChg         = {this.changeSelection}
          lessonData          = {lessonData}
          isSelected          = {this.state.selectedLessons.has(id)}
        />
      )
    })
    return classLessons.reverse()
  }


  render(){

    const classCourses = this.props.courses.map(course =>
      <div className="class-course" key={course._id} >
        <div
          className="class-course-title"
          style={{
            display:'flex',
            alignItems:'center',
          }}
        >
          <Checkbox
            label     = {`${course.level} ${course.subject} ${course.teacherName} - ${course.year}`}
            className = "u-mb-0"
            onChange  = {(evt)=>{
              const selectedLessons = new Set(this.state.selectedLessons)
              course.lessons_id.forEach(id=>{
                if (evt.target.checked) {
                  selectedLessons.add(id)
                } else {
                  selectedLessons.delete(id)
                }
                this.setState({selectedLessons})
              })
            }}
          />

          <Button
            className = "share-class-course-btn"
            label     = "Partager"
            theme     = "text"
            icon      = "share"
          />
        </div>
        { this.renderCourseLessons(course.lessons_id) }
      </div>
    )

    console.log("render LessonsView()", this.state.selectedLessons.length);
    return (
      <>

        <div className="lessons-header">
          <Button
            className = "run-selected-training"
            label     = "S'entrainer ▶"
            icon      = "play"
            disabled  = {(this.state.selectedLessons.length === 0)}
            onClick   = {this.handleTrainingClick}
          />
        </div>

        <div className="lessons-list">
          {classCourses}
        </div>

      </>
    )
  }
}
