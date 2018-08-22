import { taggedSum } from 'daggy'

export const Loader = taggedSum('Loader', {
  Loading: [],
  Idle: []
})

export const Players = taggedSum('Players', {
  List: ['list'],
  Error: ['msg']
})

export const Diff = taggedSum('Diff', {
  Positive: ['diff'],
  Negative: ['diff'],
  Neutral: ['diff']
})

export const Sort = taggedSum('Sort', {
  Asc: ['prop'],
  Desc: ['prop']
})
