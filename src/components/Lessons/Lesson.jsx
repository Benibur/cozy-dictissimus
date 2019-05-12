import React, { Component } from 'react'


export default class Lesson extends Component {
  constructor(props, context) {
    super(props, context)
  }
  run() {
      console.log('run !!!');
  }
  render(){
    const {data} = this.props
    return (
      <div className="lesson" >
        <input type="Checkbox"/>
        <div className="title">{data.name}</div>
        <div className="lesson-indicator">Indicators</div>
        <button
          className="run-training"
          onClick={this.props.handleDisplayRunner}
        > ▶
        </button>
      </div>
    )
  }
}
