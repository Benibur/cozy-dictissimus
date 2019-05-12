import React, { Component }         from 'react'
import Question_write_heard_words   from './Question_write_heard_words'

const GIFS = ['Obama.gif','Shadok-pas-de-solution-pas-de-problème.gif','bear.gif','bugbunny.gif','cat and cofee.gif','chat-chapeau.gif','dance-boy.gif','dance.gif','dancing-grandma.gif','giphy.gif','glimpse.gif','hooowww.gif','karate.gif','marin.gif','ninja.gif','office-space-that-was-easy.gif','puppet.gif','robot-dance.gif','weldone-01.gif','weldone-02.gif','weldone-03.gif','weldone-04.gif','weldone-05.gif','weldone-06.gif','weldone-07.gif','weldone-08.gif','weldone-09.gif','weldone-10.gif','weldone-11.gif','weldone-12.gif','weldone-13.gif','weldone-14.gif','weldone-15.gif','weldone-16.gif','weldone-17.gif','yourtheman.gif']



function WelldoneView() {
  return (
    <div id='reward'>
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
      numberOfQuestions : 0                      ,
      score             : 0                      ,
      showFeedback      : false                  ,
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
    if (result.gonext) {
      this.setState({
        currentKwldItem   : this.pickRandomItem(),
        numberOfQuestions : this.state.numberOfQuestions + 1,
        score             : this.state.score + result.score,
        showFeedback        : result.showFeedback,
      })
      if (result.showFeedback) {
         setTimeout( () => {
          console.log("timeout showFeedback");
          this.setState({showFeedback: false})
        },2000)
      }
    }else {
      this.setState({
        score             : this.state.score + result.score,
      })
    }
  }

  render(){
    const { isPlayerOn, itemsForPlayer } = this.props
    // detect if the items_ids have changed, if yes pick a new item
    // if (this.state.items_id !==this.props.items_id) {
    //   this.setState({
    //     currentKwldItem : this.pickRandomItem(),
    //     items_id        : this.props.items_id,
    //   })
    //   // interrupt here the render process to avoid a double render
    // }
    return (
      <div className={`player-overlay `}>
        <button
          id     ='stopLessonBtn'
          onClick={this.props.onStop}
          >Stop ⏹
        </button>
        <div className="player-content">
          <div className="player-card">
            <div id='score'>Score = {this.state.score}</div>
            <Question_write_heard_words
              className = "question"
              key = {this.state.numberOfQuestions}
              knowledgeItem={this.state.currentKwldItem}
              onResult     ={this.handleResult}
            />
          </div>
          <div className="player-hist">Historique</div>

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
      default:

    }
  }

}
