// pages/classifyDet/classifyDet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    claData: [],
    isRrefresh: false,
    id: 7,
    gender: 'male',
    sort: 2,
    pay: 0,
    status: 0,
    page: 1
  },
  getClaData() {
    this.setData({
      isLoading: true
    })
    // 展示loading效果
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'https://apis.netstart.cn/yunyuedu/category/original/data.json?id=' + this.data.id + '&gender=' + this.data.gender + '&sort=' + this.data.sort + '&pay=' + this.data.pay + '&state=' + this.data.status + '&page=' + this.data.page,
      method: 'GET',
      success: (res) => {
        console.log('class res==>', res.data.data)
        if (this.data.isRrefresh) {
          this.setData({
            claData: res.data.data.books
          })
        } else {
          this.setData({
            // claData:this.data.claData.push.apply(this.data.claData,res.data.data.books),
            // claData:this.data.claData.concat(res.data.data.books),
            claData: [...this.data.claData, ...res.data.data.books]
          })
        }
        console.log(this.data)
        console.log(res.data.data.books)
      },
      fail: (msg) => {
        console.log('class msg==>', msg)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  toDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?id='+e.currentTarget.dataset.id+'&title='+e.currentTarget.dataset.name+'&cover='+encodeURIComponent(e.currentTarget.dataset.cover),
    })
  },
  changesort(e) {
    if (e.target.dataset.sort) {
      // console.log(e)
      this.setData({
        isRrefresh: true,
        sort: e.target.dataset.sort
      })
      this.getClaData()
    }
  },
  changepay(e) {
    if (e.target.dataset.pay) {
      // console.log(e)
      this.setData({
        isRrefresh: true,
        pay: e.target.dataset.pay
      })
      this.getClaData()
    }
  },
  changestatus(e) {
    if (e.target.dataset.status) {
      // console.log(e)
      this.setData({
        isRrefresh: true,
        status: e.target.dataset.status
      })
      this.getClaData()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.cateName,
    })
    this.setData({
      id: options.id,
      gender: options.gender
    })
    this.getClaData()
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