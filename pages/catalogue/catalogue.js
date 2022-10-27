import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    id:'',
    showCat:[],
    // isHidden:true,
    num:100,
    allPage:null
  },

  onClickHide() {
    this.setData({ show: false });
  },
  toggle(){
    this.setData({
      show: !this.data.show,
      // isHidden:!this.data.isHidden
    })
  },
  chooSec(e){
    if(e.target.dataset.num){
      if(e.target.dataset.num == this.data.num/100){
        this.setData({
          show: false
        })
        return
      }
      this.setData({ 
        show: false,
        num: e.target.dataset.num * 100
      });
      this.getSection(this.data.id)
    }
    // console.log(e)
  },
  getPrevious(){
    // Toast.fail('往前没有了~~');
    if(this.data.num == 100){
      wx.showToast({
        title: '前面没有更多了',
        icon:'error',
        mask:true
      })
    }else{
      this.setData({
        num:this.data.num - 100
      })
      this.getSection(this.data.id)
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }
  },
  getNext(){
    this.setData({
      num:this.data.num + 100
    })
    this.getSection(this.data.id)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  toread(e){
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
  getSection(id){
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid='+id,
      method: 'GET',
      success: (res) => {
        console.log('目录 ==> ',res)
        this.setData({
          allPage:res.data.data.catalog.length/100
        })
        if(this.data.num<res.data.data.catalog.length){
          this.setData({
            showCat:res.data.data.catalog.slice(this.data.num-100,this.data.num)
          })
        }else{
          this.setData({
            showCat:res.data.data.catalog.slice(this.data.num-100,res.data.data.catalog.length)
          })
        }
        console.log(this.data.showCat)
        this.updataCatalogue(this.data.showCat)

      },
      fail: (msg) => {
        console.log(msg)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '书籍目录',
    })
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:[],
      actions:['updataCatalogue','updataIndex']
    })
    console.log(options)
    this.setData({
      id:options.id
    })
    this.getSection(options.id)
    
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
    this.storeBindings.destroyStoreBindings()
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