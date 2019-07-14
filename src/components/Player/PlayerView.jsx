import React, { Component }         from 'react'
import Question_write_heard_words   from './Question_write_heard_words'
import { Chip  }                    from 'cozy-ui/react/'
import { Button }                   from 'cozy-ui/react/Button'

const GIFS = ['Obama.gif','Shadok-pas-de-solution-pas-de-problème.gif','bear.gif','bugbunny.gif','cat and cofee.gif','chat-chapeau.gif','dance-boy.gif','dance.gif','dancing-grandma.gif','giphy.gif','glimpse.gif','hooowww.gif','karate.gif','marin.gif','ninja.gif','office-space-that-was-easy.gif','puppet.gif','robot-dance.gif','weldone-01.gif','weldone-02.gif','weldone-03.gif','weldone-04.gif','weldone-05.gif','weldone-06.gif','weldone-07.gif','weldone-08.gif','weldone-09.gif','weldone-10.gif','weldone-11.gif','weldone-12.gif','weldone-13.gif','weldone-14.gif','weldone-15.gif','weldone-16.gif','weldone-17.gif','yourtheman.gif']

var showFeedbackTimeout = null

function WelldoneView() {
  return (
    <div id='reward' className="u-bg-grannyApple">
      <div>
        Du 1er coup !
      </div>
      <img src={getRandomRewardGif()} alt="Animated gif reward" id="reward_gif"/>
    </div>
  )
}

function getRandomRewardGif(){
  const i = Math.floor( (GIFS.length+1) * Math.random() )
  return require('assets/welldone-gif/' + GIFS[i])
}


export default class PlayerView extends Component {

  constructor(props){
    super(props)
    console.log("constructor PlayerView");
    this.handleResult = this.handleResult.bind(this)
    this.state = {
      currentKwldItem   : this.pickRandomItem()  ,
      numberOfResults   : 0                      ,
      numberOfQuestions : 0                      ,
      score             : 0                      ,
      showFeedback      : false                  ,
      // showFeedback      : 'reward'                   ,
    }
  }

  pickRandomItem(){
    const l       = this.props.items.length
    const index   = Math.round(Math.floor(Math.random()*l))
    const newItem = this.props.items[index]
    console.log('pickrandom', newItem._id, newItem.word)
    return newItem
  }

  /*******************************************************************************
  UPDATE PLAYER FROM THE CURRENT QUESTION WHEN THE USER HAS ANSWERED
    - result :
      {
        gonext : boolean    // tells if the player can go to the next question
        score  : integer    // the increment (+or -) to add to the score
        showFeedback : false|'reward'|'ok-after-retry'   // the kind of feedback to play
      }

  ********************************************************************************/
  handleResult(result) {
    console.log('handleResult', result);
    // if (true) {
    if (result.gonext) {
      this.setState({
        currentKwldItem   : this.pickRandomItem()               ,
        numberOfResults   : this.state.numberOfResults + 1      ,
        numberOfQuestions : this.state.numberOfQuestions + 1    ,
        score             : this.state.score + result.score     ,
        showFeedback      : result.showFeedback                 ,
      })
      if (result.showFeedback) {
        if (showFeedbackTimeout) {
          clearTimeout(showFeedbackTimeout)
          showFeedbackTimeout = null
        }
        showFeedbackTimeout = setTimeout( () => {
          console.log("timeout showFeedback");
          this.setState({showFeedback: false})
          showFeedbackTimeout = null
        },4000)
      }
    }else {
      if (showFeedbackTimeout) {
        clearTimeout(showFeedbackTimeout)
        showFeedbackTimeout = null
      }
      this.setState({
        score           : this.state.score + result.score ,
        numberOfResults : this.state.numberOfResults + 1  ,
        showFeedback    : result.showFeedback             ,
      })
    }
  }

  componentWillUnmount(){
    if (showFeedbackTimeout) {
      console.log('componentWillUnmount',showFeedbackTimeout);
      clearTimeout(showFeedbackTimeout)
      showFeedbackTimeout = null
    }
  }

  render(){
    const { isPlayerOn, itemsForPlayer } = this.props
    return (
      <div className={`player-overlay `}>
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <div style={{width:'100%', maxWidth:'70rem'}}>
            <Button
              id        = "stopLessonBtn"
              className = "u-m-2"
              onClick   = {this.props.onStop}
              label     = "Arrêter"
              icon      = "previous"
              theme     = "text"
            />
          </div>
        </div>

        <div className="player-content">
          <div className="player-card">
            <Chip
              id        = "score"
              className = "u-bg-emerald u-white u-mr-2 u-h-2 u-mt-2"
            >
              {`Score = ${this.state.score}/${this.state.numberOfResults}`}
            </Chip>
            <Question_write_heard_words
              className     = "question"
              key           = {this.state.numberOfQuestions}
              knowledgeItem = {this.state.currentKwldItem}
              onResult      = {this.handleResult}
            />
          </div>

          <div className="player-hist u-mt-2">Historique</div>

        {this.ResultModal()}
        </div>
      </div>
    )
  }

  ResultModal(){
    switch (this.state.showFeedback) {
      case false:
        return
        break;
      case 'reward':
        return WelldoneView()
        break;
      case 'ok-after-retry':
        return <div id='feedback'>Pas mal ! la réponse était bien {}, la prochaine fois tu l'auras du 1er coup :-)</div>
        break;
      case 'nok':
        return <div id='feedback'>La bonne réponse était {}</div>
        break;
      default:

    }
  }

}
