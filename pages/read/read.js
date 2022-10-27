// pages/read/read.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookId: '',
    secId: '',
    content: ''
  },
  async toprev() {
    if (this.data.index == 0) {
      wx.showToast({
        title: '前面没有更多了',
        icon: 'error',
        mask: true
      })
    } else {
      this.setData({
        secId: this.data.catalogue[this.data.index - 1].secId
      })
      this.updataIndex(this.data.index - 1)
      await this.getContent(this.data.bookId, this.data.secId)
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
      wx.hideLoading()
    }
  },
  async tonext() {
    this.setData({
      secId: this.data.catalogue[this.data.index + 1].secId
    })
    this.updataIndex(this.data.index + 1)
    await this.getContent(this.data.bookId, this.data.secId)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    wx.hideLoading()
  },
  async getContent(bookId, secId) {
    wx.showLoading({
      title: '数据加载中',
    })
    const res = await wx.p.request({
      url: `https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${bookId}&content_uuid=${secId}`,
      method: 'GET',
    })
    console.log(res)
    this.setData({
      content: res.data.data.content
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['catalogue', 'index'],
      actions: ['updataCatalogue', 'updataIndex']
    })
    this.setData({
      bookId: options.bookid
    })
    await this.getContent(options.bookid, options.secId)
    wx.hideLoading()
    console.log(this.data.catalogue)
    console.log(this.data.index)
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