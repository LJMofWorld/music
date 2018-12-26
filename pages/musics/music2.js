var app = getApp()
Page({

  listenerButtonPlay: function (e) {
    // console.log(e.currentTarget.id);
    // console.log(this.data.audioArr);
    this.setData({ number: e.currentTarget.id });//获取点击的是哪一个音乐
    // console.log(this.data.number);
    this.playSong();
    this.setData({ toggle: true });//每次换歌后把按钮设置为播放状态
    this.setData({ firstPlay: ++this.data.firstPlay });//解决点了下面歌曲列表 后不能暂停音乐
  },

  playSong: function () {
    var that = this;
    var countDownTime = 3;//倒数3秒
    var audioDataUrl = this.data.audioArr[this.data.number].audioDataUrl;
    var audioTitle = this.data.audioArr[this.data.number].audioTitle;
    var audioCoverImgUrl = this.data.audioArr[this.data.number].audioCoverImgUrl;
    this.setData({ playIconToggle: "../../images/icon-pause.png" })
    wx.playBackgroundAudio({
      //播放地址  
      dataUrl: audioDataUrl,
      title: audioTitle,
      //图片地址  
      coverImgUrl: audioCoverImgUrl,
      success: function () {
        console.log("回调")
      }
    });

    //不断获取当前歌曲总时长
    var time = countDownTime;//倒数3秒中转变量
    //不断监听这个总时长，用setInterval来规避getBackgroundAudioPlayerState回调函数的 第一次获取不到总时长的问题
    // var intervalState=setInterval(function(){
    var intervalState = setInterval(function () {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          countDownTime--
          that.setData({ defaultDuration: res.duration })
          console.log('that.data.duration:' + res.duration)
        }
      })
    }, 1000)

    //等待3秒在获取 倒数3秒的值
    var defaultDuration222 = this.data.defaultDuration
    setTimeout(function () {
      if (countDownTime == 0) {
        console.log(1111)
        clearInterval(intervalState)
        // defaultDuration222=that.data.defaultDuration
        that.setData({ defaultDuration222: that.data.defaultDuration })
      }
    }, 3000)

    var abbb = setInterval(function () {
      that.data.defaultDuration222--
      console.log("默认：" + that.data.defaultDuration)
      console.log("默认222：" + (that.data.defaultDuration222 + 1))
      if ((that.data.defaultDuration222 + 1) == that.data.defaultDuration) {
        clearInterval(abbb)
      }

    }, 1000)
  },

  //播放/暂停切换按钮
  iconPlayToggle: function () {
    this.listenerButtonGetPlayState()
    if (this.data.firstPlay == 0) {//第一次点击播放暂停按钮
      console.log("??")
      this.playSong();
      this.setData({ playIconToggle: "../../images/icon-pause.png" });
      this.setData({ firstPlay: ++this.data.firstPlay })
    } else if (this.data.toggle == true) {
      console.log("点击暂停了");
      wx.pauseBackgroundAudio();
      this.setData({ playIconToggle: "../../images/icon-play.png" });
      this.setData({ toggle: !this.data.toggle });
    } else if (this.data.toggle == false) {
      console.log("点击播放了");
      this.playSong();
      this.setData({ playIconToggle: "../../images/icon-pause.png" });
      this.setData({ toggle: !this.data.toggle });
    }
  },
  /** 
   * 播放状态 
   */
  listenerButtonGetPlayState: function () {
    var that = this;
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        that.setData({ defaultStatus: res.status })
        that.setData({ defaultDuration: res.duration })
        console.log('that.data.duration:' + res.duration)
        // console.log('that.data.status:' + that.data.status)
        // console.log('duration:' + res.duration)
        // console.log('currentPosition:' + res.currentPosition)  
        // console.log('status:' + res.status)  
        // console.log('downloadPercent:' + res.downloadPercent)  
        // console.log('dataUrl:' + res.dataUrl)  
      }
    })
  },
  /** 
   * 监听button暂停按钮 
   */
  listenerButtonPause: function () {
    wx.pauseBackgroundAudio();
    console.log('暂停播放')
  },
  /** 
   * 设置进度 
   */
  listenerButtonSeek: function () {
    wx.seekBackgroundAudio({
      position: 40
    })
  },
  /** 
   *停止播放  
   */
  listenerButtonStop: function () {
    wx.stopBackgroundAudio()
    console.log('停止播放')
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数  
    /** 
     * 监听音乐播放 
     */
    wx.onBackgroundAudioPlay(function () {
      console.log('onBackgroundAudioPlay')
    })

    /** 
     * 监听音乐暂停 
     */
    wx.onBackgroundAudioPause(function () {
      console.log('onBackgroundAudioPause')
    })

    /** 
     * 监听音乐停止 
     */
    wx.onBackgroundAudioStop(function () {
      console.log('onBackgroundAudioStop')
    })
  },
})