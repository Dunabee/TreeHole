// components/picture-card/picture-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleList:{
      type:Array,
      value:[{
        author:'dunabe',
        issue:'没让你毁灭的，只会让你更加强大！',
        pic_url:'../../images/default_avatar.jpg',
        postdate:'2020-07-15'
      },
      {
        author:'lhz',
        issue:'test',
        postdate:'2020-07-16'
      }]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
