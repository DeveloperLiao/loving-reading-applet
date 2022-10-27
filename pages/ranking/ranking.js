// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maleData:[],
    maleTop:[],
    femaleData:[],
    femaleTop:[],
    pubData:[],
    punTop:[],
  },
  tobookDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?id='+e.currentTarget.dataset.id+'&title='+e.currentTarget.dataset.name+'&cover='+encodeURIComponent(e.currentTarget.dataset.cover),
    })
  },
  async getMaleData(sortType) {
    wx.showLoading({
      title: '数据加载中',
    })
    const res = await wx.p.request({
      url: `https://apis.netstart.cn/yunyuedu/rank/original/list/data.json?gender=male&sortType=${sortType}&type=sell`,
      method: 'GET',
    })
    console.log('maleData ==>',res)
    this.setData({
      maleTop: res.data.data.books[0],
      maleData: res.data.data.books.slice(1,5)
    })
    console.log(this.data.maleData)
  },
  async getFemaleData(sortType) {
    wx.showLoading({
      title: '数据加载中',
    })
    const res = await wx.p.request({
      url: `https://apis.netstart.cn/yunyuedu/rank/original/list/data.json?gender=female&sortType=${sortType}&type=sell`,
      method: 'GET',
    })
    console.log('femaleData ==>',res)
    this.setData({
      femaleTop: res.data.data.books[0],
      femaleData: res.data.data.books.slice(1,5)
    })
  },
  async getPubData(sortType) {
    wx.showLoading({
      title: '数据加载中',
    })
    const res = await wx.p.request({
      url: `https://apis.netstart.cn/yunyuedu/rank/publish/list/data.json?sortType=${sortType}&type=sell`,
      method: 'GET',
    })
    console.log('pubData ==>',res)
    this.setData({
      pubTop: res.data.data.books[0],
      pubData: res.data.data.books.slice(1,5)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getMaleData('day')
    await this.getFemaleData('day')
    await this.getPubData('day')
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
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})