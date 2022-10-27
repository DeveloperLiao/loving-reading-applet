// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyData: [],
  },
  getClassify() {
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'https://apis.netstart.cn/yunyuedu/simpleCategroy.json',
      method: 'GET',
      success: (res) => {
        this.setData({
          classifyData: res.data
        })
        console.log(res)
      },
      fail: (msg) => {
        console.log(msg)
      },
      complete: () => {
        wx.hideLoading()
      }
    })

  },

  toClassifyDet(e) {
    // console.log(e.target.dataset.cateid)
    // console.log('toDel==>',this.data.id)
    if (e.target.dataset.cateid) {
      // console.log("ok")
      // console.log(e.target.dataset.cateid)
      // console.log(e.target.dataset.catename)
      // console.log(e.currentTarget.dataset.gender)
      wx.navigateTo({
        url: '/pages/classifyDet/classifyDet?id=' + e.target.dataset.cateid + '&gender=' + e.currentTarget.dataset.gender + '&cateName=' + e.target.dataset.catename,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getClassify()
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