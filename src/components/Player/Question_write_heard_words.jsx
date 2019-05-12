import React, { Component } from 'react'
import { Shortcuts }        from 'react-shortcuts'
import NOK_sound            from 'assets/beeps/nok_sound.wav'
import OK_sound             from 'assets/beeps/ok_sound.wav'
import { Button }           from 'cozy-ui/react/Button'

export default class Question_write_heard_words_View extends Component {


  constructor(props){
    super(props)
    this.handleShortcuts = this.handleShortcuts.bind(this)
    this.handleType      = this.handleType.bind(this)
    this.state = {
      currentAnswer       : null ,
      currentWrongAnswers : 0    ,
    }
    this.playWord(this.props.knowledgeItem)
  }


  handleType(e) {
    console.log('handleType', e.target.value);
    this.setState({currentAnswer : e.target.value})
  }


  handleShortcuts(action, evt){
    console.log('handleShortcuts', action);
    switch (action) {
      case 'REPEAT_WORD':
        this.playWord(this.props.knowledgeItem)
        break
      case 'SUBMIT':
        this.checkAnswer()
        break
    }
  }


  playWord(knowledgeItem){
    // when we will plug the Audio on cozy.files :
    // https://stackoverflow.com/questions/32541898/convert-audio-data-uri-string-to-file
    // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBufferSource
    // const {knowledgeItem} = this.props
    const word_sound_asset = require('assets/sounds/' + knowledgeItem.soundFile)
    console.log('play :' + knowledgeItem.word, knowledgeItem.soundFile, word_sound_asset)
    const audio = new Audio(word_sound_asset)
    audio.play()
  }


  playSound(what){
    const {knowledgeItem} = this.props
    var audio
    switch (what) {
      case 'ok':
        audio = new Audio(OK_sound)
        audio.play()
        break;
      case 'Nok':
        audio = new Audio(NOK_sound)
        audio.play()
        break;
    }
  }


  checkAnswer() {
    const {knowledgeItem} = this.props
    const {currentAnswer} = this.state
    console.log('checkAnswer', currentAnswer, knowledgeItem.word);
    if (!currentAnswer ) return
    if (currentAnswer === knowledgeItem.word){
      console.log("Answer ok !")
      this.playSound('ok')
      this.props.onResult({
        gonext     : true,
        score      : 1   ,
        playReward : true,
      })
    }else {
      console.log("Answer NOK !")
      this.playSound('Nok')
      if (this.state.currentWrongAnswers === 0) {
        console.log("try again");
        this.setState({currentWrongAnswers:1})
        this.props.onResult({
          gonext: true ,
          score : 0     ,
          playReward : true,
        })
      }else {
        console.log("lost, the right answer is", knowledgeItem.word)
        this.props.onResult({
          gonext: true,
          score : 0   ,
          playReward : true,
        })
      }
    }
  }


  render(){
    const { className } = this.props
    // detect if the lessons_ids have changed, if yes,
    return (
      <>

        <Shortcuts
          name              = 'QUESTION_WRITE_HEARD_WORDS'
          handler           = {this.handleShortcuts}
          alwaysFireHandler = {true}
          className         = {className}
        >
          <div>Écris ce que tu entends</div>
          <input className="Answer-input"
            type        = "text"
            placeholder = 'Alors ?   :-) '
            autoFocus   = {true}
            onChange    = {this.handleType}
          />
          <button
            className = ""
            onClick   = {this.listen}
          >Vérifier</button>
          <button
            className = ""
            onClick   = {this.listen}
          >écouter à nouveau</button>
        </Shortcuts>
      </>
    )
  }
}
