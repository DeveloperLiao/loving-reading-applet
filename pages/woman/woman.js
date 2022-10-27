// pages/woman/woman.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookData: [],
    isLoading: false
  },
  getBookData() {
    this.data.isLoading = true
    this.setData({
      isLoading: this.data.isLoading
    })
    // 展示loading效果
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'https://apis.netstart.cn/yunyuedu/store/show.json?type=femail&uuid=017de2274aa5400e9dabe30f173e98d9',
      method: 'GET',
      success: (res) => {
        console.log(res)
        this.data.bookData = res.data.data.list
        this.setData({
          bookData: this.data.bookData,
        })
      },
      fail: (msg) => {
        console.log(msg)
      },
      complete: () => {
        wx.hideLoading() 
        this.setData({
          isLoading:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBookData()
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