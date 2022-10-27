import {observable,action} from 'mobx-miniprogram'

export const store = observable({
  catalogue:[],
  continueRead:[],
  index:0,
  updataCatalogue:action(function(e){
    this.catalogue = [...e]
    console.log(e)
    console.log('更改了store里的catalogue')
  }),
  updataIndex:action(function(e){
    this.index = e
  }),
  updataCRead:action(function(bookId,secId){
    this.continueRead.push({bookId:bookId,secId:secId})
  })
})