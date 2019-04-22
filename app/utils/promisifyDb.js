// @flow
const promiseDbInsert = (Database, data) => {
  return new Promise(resolve => {
    Database.insert(data, (err, newDocs) => {
      resolve(newDocs)
    })
  })
}

const promiseDbUpdate = (Database, find, update) => {
  return new Promise(resolve => {
    Database.update(find, update, (err, docs) => {
      //console.log(`Updated ${docs} document(s)`)
      Database.find(find, (err, docs) => {
        resolve(docs)
      })
    })
  })
}

const promiseDbRemove = (Database, query) => {
  return new Promise(resolve => {
    Database.remove(query, (err, docs) => {
      //console.log(`Removed ${docs} document(s)`)
      resolve(docs)
    })
  })
}

const promiseDbFind = (Database, query) => {
  return new Promise(resolve => {
    Database.find(query, (err, docs) => {
      resolve(docs)
    })
  })
}

export {
  promiseDbInsert,
  promiseDbUpdate,
  promiseDbRemove,
  promiseDbFind,
}
