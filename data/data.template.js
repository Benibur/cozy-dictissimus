
/*
    EXEMPLE OF THE DATA STRUCTURE
*/


data = {
  schools        : [],
  classes        : [],
  courses        : [],
  teachers       : [],
  children       : [],
  parents        : [],
  lessons        : [],
  knowledgeItems : [],
  levels         : [],
  schoolLevels   : [],
}

schools = [{
  _id    : 'les_fougeres_id'           ,
  name   : 'Les fougères'              ,
  town   : 'Puteaux'                   ,
  adress : '7 r Collin, 92800 Puteaux' ,
  levels : ['primaire',...]            ,
},...]

classes = [{
  _id         : 'the_class_id'          ,
  level       : 'CE2'                   ,
  name        : 'b'                     ,
  year        : 2018                    ,
  school_id   : 'les_fougeres_id'       ,
  courses     : ['first_course_id',...] ,
  children_id : ['child_id',...]        ,  // utile ?? étant donné que c'est personnel, à priori non.
},...]

courses = [{
  _id         : 'first_course_id'      ,
  teacherName : 'Madame Chapuis'       ,
  subject     : 'Orthographe'          ,
  level       : 'CE2'                  ,
  year        : 2018                   ,
  lessons_id  : ['the_lesson_id',...]  ,
},...]

lessons = [{
  _id    : 'the_lesson_id'                      ,
  course : 'first_course_id'                    ,
  name   : 'Verbes du 1er groupe'               ,
  knowledgeItems_id : ['the_kwnld_item_id',...] ,
},...]

teachers = [{
  _id      : 'Mme_chapuis_id' ,
  name     : 'Madame Chapuis' ,
},...]

knowledgeItems =[{
  _id         :'the_kwnld_item_id' ,
  lesson_id   :'the_lesson_id'     ,
  type        :'write_heard_words' ,
  word        :'chapeau'           , // optional, depends on item type
  soundFile   :'soundFile_id'      , // optional, depends on item type
  rule        :'a rule'            , // optional, depends on item type, can be empty
  hint        :'a hint'            , // optional, depends on item type, can be empty
  answersHist :{
    rights:['2018-06-09T08:22:14.803Z',...],
    wrongs:['2018-06-09T08:22:14.803Z',...],
  }                                ,
}, ...]

trainings =[{
  _id         :undefined           ,
  lessons_id  :[]           ,
  knowledgeItems_id : []        ,
  type        :'write_heard_words' ,
  word        :undefined           ,
  soundFile   :undefined           ,
  rule        :undefined           ,
  hint        :undefined           ,
  answersHist :{
    rights:[],
    wrongs:[],
  }                                ,
},...]
