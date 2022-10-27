// components/recommend/recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nextData:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
      console.log(e.currentTarget.dataset.bookcover)
      wx.navigateTo({
        url: '/pages/bookDetail/bookDetail?id='+e.currentTarget.dataset.bookid+'&title='+e.currentTarget.dataset.bookname+'&cover='+encodeURIComponent(e.currentTarget.dataset.bookcover),
      })
    },
  }
})
