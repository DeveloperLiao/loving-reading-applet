// components/viewPager/viewPager.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bannerData: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    bookcover: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      wx.request({
        url: 'https://apis.netstart.cn/yunyuedu/book/info.json?sourceUuid=' + e.currentTarget.dataset.bookid,
        method: 'GET',
        success: (res) => {
          console.log('轮播图数据==>', res)
          console.log('轮播图cover==>', res.data.data.book.cover)
          this.data.bookcover = res.data.data.book.cover
          console.log(this.data.bookcover)
          this.setData({
            bookcover: this.data.bookcover
          })
          wx.navigateTo({
            url: '/pages/bookDetail/bookDetail?id=' + e.currentTarget.dataset.bookid + '&title=' + e.currentTarget.dataset.bookname + '&cover=' + encodeURIComponent(this.data.bookcover),
          })
        }
      })
      
    },
  }
})