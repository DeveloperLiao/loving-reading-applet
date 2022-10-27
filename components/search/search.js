// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchKey:'',
    timer:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTpt(e){
        if(this.timer){
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(()=>{
          console.log(e)
          this.setData({
            searchKey:e.detail.value
          })
        },300)
    },
    toSearch(){
      wx.navigateTo({
        url: '/pages/searchPage/searchPage?key='+this.data.searchKey,
      })
    }
  }
})
