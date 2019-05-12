historicalData = require('./historicalData.js')
// historicalData = require('./historicalSimplifiedData.js')
moment         = require('moment')
moment.locale('fr')

/*
    EXEMPLE OF THE DATA STRUCTURE
*/

schoolLevels = ['Maternelle', 'Primaire', 'Collège', 'Lycée' ]

levels = ['CP', 'CE1', 'CE2', 'CM2', 'CM2' ]

schools = [{
  _id    : 'les_fougeres_id'           ,
  name   : 'Les fougères'              ,
  town   : 'Puteaux'                   ,
  adress : '7 r Collin, 92800 Puteaux' ,
  levels : ['primaire']                ,
}]

classes = [{
  _id         : 'the_class_id'      ,
  level       : 'CE2'               ,
  name        : 'b'                 ,
  year        : 2018                ,
  school_id   : 'les_fougeres_id'   ,
  courses     : ['first_course_id'] ,
  children_id : ['child_id']        ,  // utile ?? étant donné que c'est personnel, à priori non.
}]

courses = [{
  _id         : 'first_course_id' ,
  teacherName : 'Madame Chapuis'  ,
  subject     : 'Orthographe'     ,
  level       : 'CE2'             ,
  year        : 2018              ,
  lessons_id  : []                ,
}]

lessons = []

lesson_model = {
  _id               : undefined        ,
  course            : 'first_course_id',
  name              : undefined        ,
  knowledgeItems_id : []               ,
}

knowledgeItems =[]
item_model = {
  _id         :undefined           ,
  lesson_id   :undefined           ,
  type        :'write_heard_words' ,
  word        :undefined           ,
  soundFile   :undefined           ,
  rule        :undefined           ,
  hint        :undefined           ,
  answersHist :{
    rights:[],
    wrongs:[],
  }                                ,
}

teachers = [{
  _id      : 'Mme_chapuis_id' ,
  name     : 'Madame Chapuis' ,
}]

function prepareLessonsAndCourses() {
  lessonsDic   = {}
  lastLessonId = 0
  lastItemId   = 0
  // loop over the historiccal words
  historicalData.forEach(word=>{
    const item = {...item_model}
    var lessonName = "Début d'année"
    // get the corresponding lesson name - here the week of the dictation
    if (word.weekDictation){
      const date = moment(word.weekDictation)
      lessonName = "Dictée - " + date.format('DD MMMM YYYY')
    }
    // get the corresponding lesson
    var lesson = lessonsDic[lessonName]
    if(!lesson){
      lesson = {...lesson_model}
      lesson._id = 'lesson_'+lastLessonId++
      lesson.name = lessonName
      lesson.knowledgeItems_id = []
      lessonsDic[lessonName] = lesson
      lessons.push(lesson)
      courses[0].lessons_id.push(lesson._id) // because only one lesson in this dataset
    }
    // prepare the kwlItem
    const kwlItem      = {...item_model}
    kwlItem._id         = 'knwl_' + lastItemId ++
    kwlItem.lesson_id   = lesson._id
    kwlItem.word        = word.word
    kwlItem.rule        = word.rule      ||''
    kwlItem.hint        = word.hint      ||''
    kwlItem.soundFile   = word.soundFile ||''
    kwlItem.answersHist = {
      rights:word.rights || [] ,
      wrongs:word.wrongs || [] ,
    }
    lesson.knowledgeItems_id.push(kwlItem._id)
    // update knowledgeItems
    knowledgeItems.push(kwlItem)
  })
}

prepareLessonsAndCourses()

const data = {
  schools        ,
  classes        ,
  courses        ,
  teachers       ,
  lessons        ,
  knowledgeItems ,
  levels         ,
  schoolLevels   ,
}

require('fs').writeFileSync('data/data.js', 'module.exports = ' + JSON.stringify(data, null, 2))

module.export = data
