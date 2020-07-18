//app.js
App({
  globalData: {
    openid: null,
    userInfo: null
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env: 'treehole-926ja',
        traceUser: true,
      })
    }
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权过信息")
          wx.getUserInfo({
            success: res => {
              that.globalData.userInfo = res.userInfo
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.showToast({
            title: '请前往我的进行授权登录',
            icon: 'none'
          })
        }
      }
    })
  }
})
