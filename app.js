//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  // 全局数据
  globalData: {
    g_isPlayingMusic: false,  //控制音乐播放
    g_currentMusicPostId: null, //控制哪个音乐被播放
    // doubanBase: "https://api.douban.com",//全局网址变量
    doubanBase: "http://t.yushu.im",//全局网址变量
     userInfo: null
  }

})