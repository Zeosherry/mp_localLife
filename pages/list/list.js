// pages/list/list.js
import fetch from '../../utils/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    page: 0,
    pageSize: 10,
    hasMore: true,
    listData: [],
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.id = options.id;
    this.getListData()
  },
  getListData() {
    if (!this.data.hasMore) {
      return
    }
    this.data.page++
      fetch(`categories/${this.data.id}/shops?_page=${this.data.page}&_limit=${this.data.pageSize}&q=${this.data.inputVal}`).then(res => {
        this.setData({
          hasMore: this.data.listData.length < parseInt(res.header["X-Total-Count"]) - this.data.pageSize,
          listData: this.data.listData.concat(res.data)
        })
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.page = 0
    this.data.listData = []
    this.data.hasMore = true;
    this.getListData()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getListData()
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    },()=>{
      this.data.inputVal = ''
      this.onPullDownRefresh();
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  search(e){
    this.onPullDownRefresh()
  },
  goToDetail(e){
    wx.navigateTo({
      url: `/pages/goodDetail/goodDetail?goodid=${e.currentTarget.dataset.goodid}`
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})