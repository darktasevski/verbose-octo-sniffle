var R = require('ramda');

const user = {
  id: 1,
  name: 'foo',
  company: {
    id: 12,
    name: 'bar',
    address: {
      street: 'randomstreet',
    }
  },
  comments: [
    {id: 2, text: 'yes, this could work.', to: {id: 4}},
    {id: 3, text: 'not sure.', to: {id: 12}},
    {id: 4, text: 'well, maybe', to: {id: 4}},
  ],
}

const lens = (getter, setter) => {
  return ({
    get: obj => getter(obj),
    set: (val, obj) => setter(val, obj),
  })
}

prop('id', user) // 1
assoc('id', 2, user) // {id: 2, name: 'foo'}

const idLens = lens(prop('id'), assoc('id'))
view(idLens, user) // 1
set(idLens, 2, user) // // {id: 2, name: 'foo'}
