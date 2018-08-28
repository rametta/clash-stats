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

export const DialogStatus = taggedSum('DialogStatus', {
  Opened: [],
  Closed: []
})

export const Standing = taggedSum('Standing', {
  First: ['standing'],
  Second: ['standing'],
  Third: ['standing'],
  Fourth: ['standing'],
  Fifth: ['standing']
})

export const Medal = taggedSum('Medal', {
  Zero: [],
  One: [],
  Two: []
})
