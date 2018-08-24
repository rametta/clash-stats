import { taggedSum } from 'daggy'

export const Data = taggedSum('Data', {
  List: ['list'],
  Error: ['msg'],
  Loading: []
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
