import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: [],
    id: '',
    bookCover: '',
    isLoading: false,
    title: '',
    secId:'',
    catalogue: [],
    jComment: [],
    comLength: 0,
  },
  getmoreSec() {
    wx.navigateTo({
      url: `/pages/catalogue/catalogue?id=${this.data.id}`,
    })
  },
  toread(e){
    // console.log(e)
    if(e.target.dataset.secid){
      this.setData({
        secId:e.target.dataset.secid
      })
    }
    wx.navigateTo({
      url: '/pages/read/read?bookid='+this.data.id+'&secId='+this.data.secId,
    })
    this.updataIndex(e.target.dataset.index)
  },
  async getDetailData(id, title) {
    this.setData({
      isLoading: true
    })
    // 展示loading效果
    wx.showLoading({
      title: '数据加载中',
    })
    const res = await wx.p.request({
      url: 'https://apis.netstart.cn/yunyuedu/book/getsub.json?id=' + id + '&title=' + title,
      method: 'GET',
    })
    console.log('detail ==>', res)
    // wx.hideLoading()
    this.setData({
      detailData: res.data.feed.entry,
      isLoading: false
    })
  },
  async getCatalogue(id) {
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '数据加载中',
    })
    const res = await wx.p.request({
      url: 'https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=' + id,
      method: 'GET',
    })
    console.log('目录==>', res)
    // wx.hideLoading()
    if(res.data.data.catalog[0].leaf){
      this.updataCatalogue(res.data.data.catalog.slice(0,100))
    }else{
      this.updataCatalogue(res.data.data.catalog.slice(1,100))
    }
    this.setData({
      catalogue: res.data.data.catalog,
      secId:res.data.data.catalog[0].secId,
      isLoading: false
    })
  },
  async getNewsec(id) {
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '数据加载中',
    })
    const res = await wx.p.request({
      url: 'https://apis.netstart.cn/yunyuedu/book/simpleInfo.json?id=' + id,
      method: 'GET',
    })
    console.log('最新章节==>', res)
    this.setData({
      title: res.data.item.latestArticleTitle,
      isLoading: false
    })
  },
  async getComment(id) {
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '数据加载中',
    })
    const res = await wx.p.request({
      url: 'https://apis.netstart.cn/yunyuedu/comment/getComments.json?bookId=' + id,
      method: 'GET',
    })
    console.log('评论==>', res)
    this.setData({
      jComment: res.data.all.list.slice(0, 3),
      comLength: res.data.all.totalcount
    })
    console.log(this.data.jComment)
    // console.log(this.data.jComment == false)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.setNavigationBarTitle({
      title: '书籍详情',
    })
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:[],
      actions:['updataCatalogue','updataIndex']
    })
    this.setData({
      id: options.id,
      bookCover: decodeURIComponent(options.cover)
    })
    await this.getDetailData(options.id, options.title)
    await this.getCatalogue(options.id)
    await this.getComment(options.id)
    await this.getNewsec(options.id)
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