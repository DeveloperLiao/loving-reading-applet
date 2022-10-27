// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData:[],
    key:'',
    isLoading:false,
    page:1,
    next:true
  },
  toDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?id='+e.currentTarget.dataset.id+'&title='+e.currentTarget.dataset.name+'&cover='+encodeURIComponent(e.currentTarget.dataset.cover),
    })
  },
  async getSearchData(key){
    wx.showLoading({
      title: '数据加载中',
    })
    this.setData({
      isLoading:true
    })
    const res = await wx.p.request({
      url:`https://apis.netstart.cn/yunyuedu/search/book.json?keyword=${key}&page=${this.data.page}`,
      method: 'GET',
    })
    console.log('search==>',res)
    if(!res.data.data.page){
      this.setData({
        next:false
      })
    }
    this.setData({
      searchData:[...this.data.searchData,...res.data.data.books],
      isLoading:false
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.setNavigationBarTitle({
      title: '搜索目录',
    })
    this.setData({
      key:options.key
    })
    await this.getSearchData(options.key)
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    if(this.data.isLoading){
      return
    }else if(!this.data.next){
      return
    }else{
      this.data.page = this.data.page + 1
      this.setData({
        page:this.data.page
      })
      await this.getSearchData(this.data.key)
      wx.hideLoading()
      console.log('触底了')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})