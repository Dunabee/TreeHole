// components/uploader/uploader.js
const app = getApp()
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
    uploaderList: [],
    uploaderNum: 0,
    showUploader: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clearImg(e) {
      var nowList = [];
      var uploaderList = this.data.uploaderList;
      for (let i = 0; i < uploaderList.length; i++) {
        if (i == e.currentTarget.dataset.index) {
          continue
        } else {
          nowList.push(uploaderList[i])
        }
      }
      this.setData({
        uploaderList: nowList,
        uploaderNum: this.data.uploaderNum - 1,
        showUploader: true
      })
    },
    showImg(e) {
      var that = this;
      wx.previewImage({
        urls: that.data.uploaderList,
        current: that.data.uploaderList[e.currentTarget.dataset.index]
      })
    },
    upload (e) {
      var that = this;
      wx.chooseImage({
        count: 9 - that.data.uploaderNum,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          console.log(res)
          let tempFilePath = res.tempFilePaths;
          let uploaderList = that.data.uploaderList.concat(tempFilePath);
          if (uploaderList.length == 9) {
            that.setData({
              showUpload: false
            })
          }
          that.setData({
            uploaderList: uploaderList,
            uploaderNum: uploaderList.length
          })
        }
      })
    },
  }
})
