// components/picture-card/picture-card.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgSize: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*imageLoad(e) {
      var originWidth = e.detail.width,
        originHeight = e.detail.height,
        ratio = originWidth / originHeight,
        index = e.currentTarget.dataset.i,
        image=this.data.imgSize,
        that=this,
        viewWidth=null,
        viewHeight=null;
      const query = wx.createSelectorQuery();
      query.select('.image-section').boundingClientRect(function (res) {
        viewWidth=res.width;
        viewHeight=res.height;
        var viewRatio=viewWidth/viewHeight;
        if (ratio >= viewRatio) {
          if (originWidth >= viewWidth) {
            viewHeight = viewWidth / ratio;
          } else {
            viewWidth = originWidth;
            viewHeight = originHeight
          }
        } else {
          if (originWidth >= viewWidth) {
            viewWidth = viewRatio * originHeight
          } else {
            viewWidth = viewRatio * originWidth;
            viewHeight = viewRatio * originHeight;
          }
        }
        image[index]={
          width:viewWidth,
          height:viewHeight
        }
        that.setData({
          imgSize:image
        })
      })
      query.exec();
    }*/
  }
})