import { TODOS_DOCTYPE } from './todos'
// import { BOOKMARK_DOCTYPE } from './bookmarks'

// the documents schema, necessary for CozyClient
export default {
  todos: {
    doctype: TODOS_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  // bookmarks: {
  //   doctype: BOOKMARK_DOCTYPE,
  //   attributes: {},
  //   relationships: {}
  // }
}

// export all doctypes for the application
export * from './todos'
