import React, { Component } from 'react'
import { Shortcuts }        from 'react-shortcuts'
import NOK_sound            from 'assets/beeps/nok_sound.wav'
import OK_sound             from 'assets/beeps/ok_sound.wav'
import { Button }           from 'cozy-ui/react/Button'
import { Input  }           from 'cozy-ui/react/'

export default class Question_write_heard_words_View extends Component {


  constructor(props){
    super(props)
    this.handleShortcuts        = this.handleShortcuts.bind(this)
    this.handleType             = this.handleType.bind(this)
    this.handleCorrectionGoNext = this.handleCorrectionGoNext.bind(this)
    this.playWord               = this.playWord.bind(this)
    this.checkAnswer            = this.checkAnswer.bind(this)
    this.state = {
      currentAnswer       : null ,
      currentWrongAnswers : 0    ,
      displayCorrection   : false,
    }
    this.playWord()
  }


  handleType(e) {
    this.setState({currentAnswer : e.target.value})
  }


  handleShortcuts(action, evt){
    // console.log('handleShortcuts', action);
    switch (action) {
      case 'REPEAT_WORD':
        this.playWord()
        break
      case 'SUBMIT':
        this.checkAnswer()
        break
    }
  }

  handleCorrectionGoNext(){
    this.props.onResult({
      gonext       : true  ,
      score        : 0     ,
      showFeedback : false ,
    })
  }


  playWord(){
    // when we will plug the Audio on cozy.files :
    // https://stackoverflow.com/questions/32541898/convert-audio-data-uri-string-to-file
    // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBufferSource
    const {knowledgeItem} = this.props
    console.log('playWord', knowledgeItem.word );
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
    const {currentAnswer, currentWrongAnswers} = this.state
    console.log('checkAnswer', currentAnswer, knowledgeItem.word);
    if (!currentAnswer ) return
    if (currentAnswer === knowledgeItem.word){
      console.log("Answer ok !", currentWrongAnswers, )
      this.playSound('ok')
      this.props.onResult({
        gonext       : true     ,
        score        : 1        ,
        showFeedback : currentWrongAnswers ? 'ok-after-retry' : 'reward' ,
      })
    }else {
      console.log("Answer NOK !")
      this.playSound('Nok')
      if (currentWrongAnswers === 0) {
        console.log("try again");
        this.setState({currentWrongAnswers:1})
        this.props.onResult({
          gonext       : false ,
          score        : 0     ,
          showFeedback : false ,
        })
      }else {
        console.log("lost, the right answer is", knowledgeItem.word)
        this.setState({displayCorrection:true})
        // this.props.onResult({
        //   gonext       : true  ,
        //   score        : 0     ,
        //   showFeedback : false ,
        // })
      }
    }
  }


  render(){
    const { className } = this.props
    if (this.state.displayCorrection) {
      return(
        <div className="question u-p-2-half">

          <div>{`La réponse était ${this.props.knowledgeItem.word}`}</div>
          <Button
            label     = "Continuer"
            onClick   = {this.handleCorrectionGoNext}
            autofocus = "true"
          />
      </div>
      )
    } else {

      return (
        <Shortcuts
          name              = 'QUESTION_WRITE_HEARD_WORDS'
          handler           = {this.handleShortcuts}
          alwaysFireHandler = {true}
          className         = {`${className} u-p-2-half`}
          >

          <div>Écris ce que tu entends</div>

          <Input
            className   = "Answer-input u-mt-2-half"
            type        = "text"
            placeholder = "Alors ?   :-) "
            autoFocus   = {true}
            onChange    = {this.handleType}
            />

          <Button
            label     = "Vérifier"
            className = "u-m-0 u-mt-2"
            onClick   = {this.checkAnswer}
            />

          <Button
            label     = "écouter à nouveau"
            className = "u-m-0, u-mt-1"
            onClick   = {this.playWord}
            theme     = "text"
            icon      = "sound"
            />

        </Shortcuts>
    )
    }
  }
}
