// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false
  },
  
  getUserInfo(e) {
    var that = this
    var openid
    wx.login({
      success: async res => {
        var userInfo = e.detail.userInfo
        that.setData({
          userInfo,
          hasUserInfo: true
        })
        var res = await wx.cloud.callFunction({ name: 'getOpenid' })
        openid = res.result.openid
        const userCollection = wx.cloud.database('treehole').collection('user')
        const allUser = (await userCollection.get()).data
        const [user] = allUser.filter(v => v._openid === openid)
        console.log(user)
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
        }else{
          console.log("已有用户")
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
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              const userInfo = res.userInfo
              that.setData({
                userInfo,
                hasUserInfo: true
              })
            }
          })
        } else {

        }
      }
    })
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