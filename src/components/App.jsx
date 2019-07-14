import React, { Component }                    from 'react'
import PropTypes                               from 'prop-types'
import { hot }                                 from 'react-hot-loader'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import { Layout, Main, Content }               from 'cozy-ui/react/Layout'
import { Sprite as IconSprite }                from 'cozy-ui/react/Icon'

import Sidebar     from './Sidebar'
import LessonsView from './Lessons/LessonsView'
import Player      from './Player/PlayerView'
import Trainings   from './Trainings'
import Statistics  from './Statistics'


import { ShortcutManager }  from 'react-shortcuts'
const shortcutManager = new ShortcutManager(
  {
    QUESTION_WRITE_HEARD_WORDS: {
      REPEAT_WORD: ['ctrl+enter'] ,
      SUBMIT     : 'enter'        ,
    },
  }
)



/* DATA FOR TESTS */
 const {
   schools        ,
   classes        ,
   courses        ,
   teachers       ,
   lessons        ,
   knowledgeItems ,
   levels         ,
   schoolLevels   ,
 } = require('../../data/data.js')


/* MAIN */
class App extends Component {

  constructor(props){
    super(props)
    this.displayLessonPlayer = this.displayLessonPlayer.bind(this)
    this.stopLessonPlayer    = this.stopLessonPlayer.bind(this)
    this.renderLessons       = this.renderLessons.bind(this)
    this.state = {
      isPlayerOff:true,
      itemsForPlayer:[]
    }
  }

  componentDidMount(){
    // this.displayLessonPlayer(["knwl_13","knwl_17","knwl_22","knwl_29"])
    this.displayLessonPlayer(["knwl_13"])
  }

  getChildContext() {
    return { shortcuts: shortcutManager }
  }

  displayLessonPlayer(items_id) {
    console.log('displayLessonPlayer of kwledge items ', items_id);
    const items = items_id.map(id=>{
      return knowledgeItems.find(it=>it._id === id)
    })
    this.setState({isPlayerOff:false, itemsForPlayer:items})
  }

  stopLessonPlayer() {
    this.setState({isPlayerOff:true})
  }

  renderLessons(){
    return(
      <LessonsView
        displayLessonPlayer = {this.displayLessonPlayer}
        courses             = {courses}
        lessons             = {lessons}
      />
    )
  }
  renderStatistics(){
    return(
      <Statistics/>
    )
  }

  render(){
    const { isPlayerOff, itemsForPlayer } = this.state
    return(
      <HashRouter>
        <div className="modale-container">
          <Layout>
            <Sidebar />
            <Main>
              <Content className="app-content">
                <Switch>
                  <Route path="/lessons"    component={this.renderLessons}    />
                  <Route path="/trainings"  component={Trainings}             />
                  <Route path="/statistics" render   ={this.renderStatistics} />
                  <Redirect from="/" to="/lessons" />
                  <Redirect from="*" to="/lessons" />
                </Switch>
              </Content>
            </Main>
            <IconSprite />
          </Layout>
          {
            isPlayerOff ? '' : (
            <Player
              isPlayerOff ={isPlayerOff}
              items       ={itemsForPlayer}
              onStop      ={this.stopLessonPlayer}
            />)
          }
        </div>
      </HashRouter>


    )
  }
}

App.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
}

/*
si on veut transmettre des props au composant routé : https://reacttraining.com/react-router/web/api/Route/component
<Route path="/statistics" component={Statistics}  />
<div className="lesson-runner">Lesson RUNNER</div>
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/

export default hot(module)(App)
