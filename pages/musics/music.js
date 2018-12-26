// pages/musics/music.js
var app = getApp()
Page({
  data: {
    number: 0,//歌曲的index
    playIconToggle: "../../images/icon-play.png",//播放暂停按钮图片
    closeIcoToggle: "../../images/icon-down.png",//展开收缩按钮图片
    toggle: true,//切换播放/暂停状态
    firstPlay: 0,//第一次点击播放按钮/暂停
    defaultStatus: 0,//默认播放状态 0是暂停 1播放 2未播放
    defaultDuration: 0,//默认歌曲总时长
    intervalState: null,
    cc: 0,//中转倒计时
    animationList: {},
    animationTime: {},
    animationRangeBar: {},
    audioArr: [
      {
        audioCoverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002E066505OV9w.jpg?max_age=2592000',
        audioIcon: "../../images/icon-happy.png",
        audioTitle: 'ε',
        audioaudioAuthor: 'α·Pav',
        audioDataUrl: 'http://isure.stream.qqmusic.qq.com/C4000037YeC31taeZG.m4a?guid=2012251794&vkey=2815027F9364705A100B2279FC6217745C0AEF3388B5E40ECFCB450E6AFFC76893EA3558C943DA3C26A676C98B814F9A49410BAB94111A25&uin=5941&fromtag=66',
      },
      {
        audioCoverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002E066505OV9w.jpg?max_age=2592000',
        audioIcon: "../../images/icon-lianhua.png",
        audioTitle: 'δ',
        audioAuthor: 'α·Pav',
        audioDataUrl: 'http://isure.stream.qqmusic.qq.com/C400000f6csJ1RO7lH.m4a?guid=2012251794&vkey=4ADF40A45985828FB654E0B916EBC73C60B7A7C72006F0F27AEF592DDA47B9DA03CB162BA178B74D765BB71D6351200A909937A3C7D4F819&uin=5941&fromtag=66',
      },
      {
        audioCoverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002E066505OV9w.jpg?max_age=2592000',
        audioIcon: "../../images/icon-hourse.png",
        audioTitle: 'η',
        audioAuthor: 'α·Pav',
        audioDataUrl: 'http://dl.stream.qqmusic.qq.com/C400002AWz644UoeBt.m4a?guid=3941745825&vkey=D62E3FEFE4D546B4D1B81D3E7A5B98EE4FBCB0F65D116FCD950E1CBA50ADE759C01488B35EE9AD7DBEEDC52E2234018937511EE6F7A9CCF7&uin=0&fromtag=66',
      },
      {
        audioCoverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002E066505OV9w.jpg?max_age=2592000',
        audioIcon: "../../images/icon-fire.png",
        audioTitle: 'ζ ',
        audioAuthor: 'α·Pav',
        audioDataUrl: 'http://dl.stream.qqmusic.qq.com/C4000030u4tP4Hh66v.m4a?guid=3941745825&vkey=69853BAE0438AFA6E181307B4D8DF12C3C687DB3D6CF1FBF7777F71EB3890DFF0790E307D18AA5000062F77C90A446FCBFC2586BF12DCE83&uin=0&fromtag=66',
      },
      {
        audioCoverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001fsOki0YkORk.jpg?max_age=2592000',
        audioIcon: "../../images/icon-lianhua.png",
        audioTitle: '睡眠',
        audioAuthor: '深呼吸',
        audioDataUrl: 'http://183.252.54.20/amobile.music.tc.qq.com/C400002OnEqh2ipleJ.m4a?guid=3941745825&vkey=8EF28C8EF4B7855B5E21693C8ADAE7C1BA7885836657724A376FF42F42D60206E6BDBD730F807E82730902937F6A374120B2291291AAC182&uin=0&fromtag=66',
      },
      {
        audioCoverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000i8eko3goT8z.jpg?max_age=2592000',
        audioIcon: "../../images/icon-flower.png",
        audioTitle: 'Only Time',
        audioAuthor: 'Enya',
        audioDataUrl: 'http://isure.stream.qqmusic.qq.com/C400002i7SbS1yIy9H.m4a?guid=3941745825&vkey=1FAF11D39E5068F15B3022B1A1B7F41C41F52D325ADD978267ACD2065E95079BAA8B709E0BDAD5DE590377DF46C853D07FD9EA86D9F9820E&uin=0&fromtag=66',
      },
      {
        audioCoverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004aBSeB4S4Tmh.jpg?max_age=2592000',
        audioIcon: "../../images/icon-happy.png",
        audioTitle: 'Winter In My Heart',
        audioAuthor: 'Befour',
        audioDataUrl: 'http://isure.stream.qqmusic.qq.com/C400002N36KE23SDV9.m4a?guid=7159583311&vkey=2677B96BB391D5A4BB975A98DB5EFF06C035F987EACA277CDE343BF04D096F791A0045965E55CA3126E6702ABBA8BDB1B9618750E55E3D88&uin=4135&fromtag=66',
      },
      {
        audioCoverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000022JZI84VmXk9.jpg?max_age=2592000',
        audioIcon: "../../images/icon-hourse.png",
        audioTitle: 'White Clover',
        audioAuthor: 'α·Pav',
        audioDataUrl: 'http://isure.stream.qqmusic.qq.com/C4000015wnmP14YPOM.m4a?guid=2012251794&vkey=91D529F5C81B55BAC4139A673993A6C6A3CE01F314F76DCC23A70F9FC2CB7FEEF67F6F8C520B399424B65498D0933A6333958FC39C696EFD&uin=5941&fromtag=66',
      }
    ]
  },
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

    var total = 0;
    var flag = false;
    var miunte = 0;
    var sec = 0;
    var nowTime = 0;
    if (this.data.intervalState != null) {
      clearInterval(this.data.intervalState);
    }
    this.data.intervalState = setInterval(function () {
      console.log("d")
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          console.log(res);
          if (res.status == "1" && flag == false) {
            total = -(res.currentPosition + (-res.duration))

            //把时间转化为分钟秒的格式
            miunte = Math.floor(total / 60)
            sec = (total - Math.floor(total / 60) * 60)
            if (miunte < 10) {
              miunte = "0" + miunte
            }
            if (sec < 10) {
              sec = "0" + sec
            }
            nowTime = miunte + ":" + sec

            that.setData({ defaultDuration: nowTime })
            that.setData({ cc: nowTime })

            flag = true;
            console.log('that.data.duration1:' + res.duration)
          } else if (res.status == "1" && flag && total > 0) {
            total--;

            //把时间转化为分钟秒的格式
            miunte = Math.floor(total / 60)
            sec = (total - Math.floor(total / 60) * 60)
            if (miunte < 10) {
              miunte = "0" + miunte
            }
            if (sec < 10) {
              sec = "0" + sec
            }
            nowTime = miunte + ":" + sec
            console.log(nowTime)

            that.setData({ defaultDuration: nowTime })
            that.setData({ cc: that.data.defaultDuration })

            console.log("cccccc:" + that.data.cc)
          } else if (res.status == "0") {
            that.setData({ defaultDuration: that.data.cc })
            console.log(122)
          }
        }
      })
    }, 1000)
  },

  //播放/暂停切换按钮
  iconPlayToggle: function () {
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

  //点击展开 显示进度条
  bgDown2: function (e) {
    console.log(12)
    console.log(e.currentTarget.id)
    // document.getElementById("iconDown").style.top="51%"
  },
  bgDown: function (e) {
    console.log(e.currentTarget)
    var eleId = e.currentTarget.id
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    var animation2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    var animation3 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    // this.animation = animation
    // this.animation2 = animation2

    // this.setData({
    //   animationData:animation.export(),
    //   animationData2:animation2.export()      
    // })

    if (eleId == "iconDown") {
      animation.translateY(48).step()
      animation2.translateY(48).scale(0).step()
      animation3.opacity(1).step()
    } else if (eleId == "iconClose") {
      animation.translateY(0).step()
      animation2.translateY(0).scale(1).step()
      animation3.opacity(0).step()
    }
    this.setData({
      animationList: animation.export(),
      animationTime: animation2.export(),
      animationRangeBar: animation3.export()
    })
  },
  onShareAppMessage: function () {
    return {
      title: '小睡眠,晚安',
      path: '/pages/home?id=123',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
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
        that.setData({ defaultDuration: res.duration })//ddddddddd
        console.log('that.data.duration:' + res.duration)
        console.log('that.data.currentPosition:' + res.currentPosition)
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