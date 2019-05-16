import React, { Component }       from 'react'
import { Checkbox, Button, Icon } from 'cozy-ui/react/'
import level0                     from 'assets/icons/level-0.svg'


export default class Lesson extends Component {

  constructor(props, context) {
    super(props, context)
    this.handleClickPlay = this.handleClickPlay.bind(this)
    this.handleCheck     = this.handleCheck.bind(this)
  }

  handleCheck(evt) {
      console.log('handleCheck !!!', evt.target.checked)
      this.props.onSelectChg(this.props.lessonData._id, evt.target.checked)
      evt.preventDefault()
      evt.stopPropagation()
      evt.nativeEvent.stopImmediatePropagation()
  }

  handleCheckClick(evt) {
    console.log("handleCheckClick");
    evt.stopPropagation()
    evt.preventDefault()
    evt.nativeEvent.stopImmediatePropagation()
  }

  handleClickPlay(evt){
    console.log("handleClickPlay", evt.target);
    if (evt.target) {

    }
    this.props.handleDisplayRunner(this.props.lessonData.knowledgeItems_id)
  }
  render(){
    const {lessonData} = this.props
    return (
      <div
        className = "lesson"
        onClick   = {this.handleClickPlay}
      >
        <Checkbox
          className = "u-pos-absolute u-m-half"
          onChange  = {this.handleCheck}
          onClick   = {this.handleCheckClick}
          checked   = {this.props.isSelected}
        />
        <div
          className = "lesson-indicator"
          style     = {{
            flexGrow       : 1       ,
            display        : 'flex'  ,
            justifyContent : 'center',
          }}
        >
          <Icon
            icon={level0}
            width="5em"
            height="auto"
          />
        </div>
        <div style={{
            borderBottomRightRadius : '4px',
            borderBottomLeftRadius  : '4px',
            backgroundColor         : 'white',
            padding                 : '1rem 0.5rem 1rem 0.5rem',
          }}>
          <div className="u-fz-large u-charcoalGrey">{`Leçon ${lessonData.rk + 1}`}</div>
          <div className="u-fz-small u-coolGrey">{lessonData.name}</div>
        </div>
      </div>
    )
  }
}
