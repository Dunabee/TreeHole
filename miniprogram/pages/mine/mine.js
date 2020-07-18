// miniprogram/pages/mine/mine.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false
  },

  getUserInfo(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserInfo: true
    })
    wx.login({
      success: async res => {
        //获取openid
        var res = await wx.cloud.callFunction({ name: 'getOpenid' })
        app.globalData.openid = res.result.openid
        wx.setStorageSync('openid', res.result.openid)
        //连接集合查询是否存在此openid
        const userCollection = wx.cloud.database('treehole').collection('user')
        const allUser = (await userCollection.get()).data
        const [user] = allUser.filter(v => v._openid === app.globalData.openid)
        //若不存在则将数据存入集合
        if (!user) {
          userCollection.add({
            data: {
              nickName: userInfo.nickName,
              gender: userInfo.gender,
              avatarUrl: userInfo.avatarUrl
            },
            success: res => {
              console.log(res)
            }
          })
        } else {
          console.log("已有用户")
          console.log('userInfo:' + app.globalData.userInfo.nickName)
          console.log('openid:' + app.globalData.openid)
        }
      }
    })
  },

  loadInfo() {
    if (this.data.hasUserInfo) {
      wx.navigateTo({
        //url: '/pages/mine/info/info?_id'+_id 
        url: '/pages/mine/info/info',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: app.globalData.userInfo
      })
    }else if(1){
      app.userInfoReadyCallback=res=>{
        that.setData({
          userInfo:res.userInfo,
          hasUserInfo:true
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})