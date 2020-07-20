// miniprogram/pages/issue/issue.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploaderImgList: [],
    uploaderImgNum: 0,
    showUploader: true,
    cloudImgUrl: [],
    issue: ''
  },

  clearImg(e) {
    var nowList = [];
    var uploaderImgList = this.data.uploaderImgList;
    for (let i = 0; i < uploaderImgList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue
      } else {
        nowList.push(uploaderImgList[i])
      }
    }
    this.setData({
      uploaderImgList: nowList,
      uploaderImgNum: this.data.uploaderImgNum - 1,
      showUploader: true
    })
    console.log(this.data.uploaderImgList)
  },
  showImg(e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderImgList,
      current: that.data.uploaderImgList[e.currentTarget.dataset.index]
    })
  },
  upload(e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderImgNum,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        let tempFilePath = res.tempFilePaths;
        let uploaderImgList = that.data.uploaderImgList.concat(tempFilePath);
        if (uploaderImgList.length == 9) {
          that.setData({
            showUploader: false
          })
        }
        that.setData({
          uploaderImgList: uploaderImgList,
          uploaderImgNum: uploaderImgList.length
        })
        wx.showLoading({
          title: '上传中',
        })
        const cloudImgUrl = []
        tempFilePath.forEach((item, i) => {
          cloudImgUrl.push((new Date()).getTime() + Math.floor(10 * Math.random()) + tempFilePath[i].match(/\.[^.]+?$/)[0])
        })
        console.log('cloudImgUrl:' + cloudImgUrl)
        tempFilePath.forEach((item, i) => {
          wx.cloud.uploadFile({
            cloudPath: cloudImgUrl[i],
            filePath: tempFilePath[i],
            success: res => {
              console.log(res.fileID)
              let cloudImgUrl= that.data.cloudImgUrl.concat(res.fileID)
              that.setData({
                cloudImgUrl:cloudImgUrl
              })
              wx.hideLoading()
            },
            fail: res => {
              wx.hideLoading()
              console.log(res)
            }
          })
        })
      }
    })
  },

  uploadArticle() {
    if (this.data.issue == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return;
    }
    const treeholeDB = wx.cloud.database('treehole')
    const articleList = treeholeDB.collection('articleList')
    articleList.add({
      data: {
        author: app.globalData.userInfo.nickName,
        issue: this.data.issue,
        pic_url: this.data.cloudImgUrl,
        postdate: this.formatTime(new Date())
      },
      success: res => {
        wx.showToast({
          title: '发布成功！',
        })
        this.setData({
          uploaderImgList: [],
          uploaderImgNum: 0,
          showUploader: true,
          cloudImgUrl: '',
          issue: ''
        })
      },
      fail: err => {
        wx.showToast({
          title: '发布失败！',
        })
      }
    })
  },

  bindInput(e) {
    this.setData({
      issue: e.detail.value
    })
  },

  formatTime:function(date){
    var year=date.getFullYear()
    var month=date.getMonth()+1
    var day=date.getDate()
    var hour=date.getHours()
    var minute=date.getMinutes()
    var second=date.getSeconds()
    return[year,month,day].map(this.formatNumber).join('/')+' '+[hour,minute,second].map(this.formatNumber).join(':')
  },

  formatNumber:function(n){
    n=n.toString()
    return n[1]?n:'0'+n
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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