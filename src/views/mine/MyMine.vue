<template>
  <div class="MyMine-container">
    <!--  顶部头像、背景样式-----非登录状态 -->
    <div class="header not-login" v-if="!$store.state.user">
      <div class="btn-login" @click="$router.push('/login')">
         <img src="~@/assets/mobile.png" alt="">
         <span class="text">注册/登入</span>
      </div>
    </div>
     <!--  /顶部头像、背景样式-----非登录状态 -->

     <!-- 顶部头像、背景样式-----登录状态 -->
    <div class="login-header"  v-if="$store.state.user">
      <div class="base-info" @click="enterInfo">
        <div class="left">
          <van-image
            class="photo"
            round
            width="90px"
            height="90px"
            :src="$store.state.user.mobile === '19876781243' ? require('@/assets/微信图片_20230423201325.jpg') : this.$store.state.userPhoto"
            fit="cover"

          />

          <span class="img-title">{{$store.state.user.mobile === '19876781243' ? '财贸腿最短' : Uinfo.name}}</span>
          <van-tag   class="tag" v-if="$store.state.user.mobile === '19876781243'">财贸认证:黄金右脚</van-tag>
        </div>
        <div class="right">
          <van-button squired type="info" ><i slot="icon" class="toutiao toutiao-yuedu" ></i>今日已阅读<br>5分钟</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-count">
          <div class="count">{{$store.state.user.mobile === '19876781243' ? '999+' : Uinfo.art_count}}</div>
          <div class="hanzi">发布</div>
        </div>
        <div class="data-count">
          <div class="count">{{$store.state.user.mobile === '19876781243' ? '999+' : Uinfo.follow_count}}</div>
          <div class="hanzi">头条</div>
        </div>
        <div class="data-count">
          <div class="count">{{$store.state.user.mobile === '19876781243' ? '999+' : Uinfo.fans_count}}</div>
          <div class="hanzi">粉丝</div>
        </div>
        <div class="data-count">
          <div class="count">{{$store.state.user.mobile === '19876781243' ? '999+' : Uinfo.like_count}}</div>
          <div class="hanzi">获赞</div>
        </div>

      </div>
    </div>
    <!-- /顶部头像、背景样式-----登录状态 -->

    <!-- 收藏、历史按钮-----非登录和登录状态 -->
  <van-grid class="grid-nav" :column-num="2" clickable>
    <van-grid-item  text="收藏" class="grid-item">
      <i slot="icon" class="toutiao toutiao-shoucang"></i>
      <span slot="text" class="text">收藏</span>
    </van-grid-item>
    <van-grid-item icon="photo-o"  class="grid-item">
      <i slot="icon" class="toutiao toutiao-lishi"></i>
      <span slot="text" class="text">历史</span>
    </van-grid-item>
    <!-- /收藏、历史按钮-----非登录和登录状态 -->
</van-grid >
  <van-cell title="消息通知" is-link class="cell"/>
  <van-cell title="小珠同学" is-link class="cell" to="/chat"/>
  <van-cell title="帮助与反馈" is-link class="cell"/>
  <!-- 点击退出按钮-----登录状态 -->
  <van-cell @click="djexit" v-if="$store.state.user" class="cell-exit" clickable><span slot="title" class="exit-title">退出登录</span></van-cell>
  <!-- /点击退出按钮-----登录状态 -->
  </div>
</template>

<script>
import { userInfo } from '@/API/user'
import { removeItem } from '@/utils/storage'

// import removeItem from '@/utils/storage'
export default {
  name: 'MyMine',
  data () {
    return {
      // 登录的用户信息
      Uinfo: {}

    }
  },
  methods: {
    djexit () {
      // 这里的dialog函数要用this.$dialog调用
      this.$dialog.confirm({
        title: '确认退出吗？'

      })
        .then(() => {
          // on confirm

          // 改成null 表示把本地存储的数据变成无效
          this.$store.commit('setUser', null)
          // removeItem('USER-KEY')
        })
        .catch(() => {
          // on cancel

        })
    },
    async getUserInfo () {
      try {
        const { data: res } = await userInfo()
        this.Uinfo = res.data
        this.$store.commit('USER_PHOTO', this.Uinfo.photo)
      } catch (err) {
        removeItem('USER-KEY')
        this.$router.push('/login')
      }
    },
    // 点击顶部部分 跳转编辑资料页面
    enterInfo () {
      this.$router.push('/info')
    }
  },
  activated () {
    // 如果用户没登录就不发请求
    if (this.$store.state.user) {
      this.getUserInfo()
    }
  }

}
</script>

<style lang="less" scoped>
// // 顶部背景图样式-----非登录状态
.header {
  height: 420px;
  background-image: url(@/assets/微信图片_20230423190443.jpg);
  background-size: cover;

}
// 顶部头像样式-----非登录状态
.not-login {
 display: flex;
 justify-content: center;
 align-items: center;
 .btn-login {
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   img {
    height: 132px;
    width: 132px;
    opacity: 70%;
    margin-bottom: 15px;
   }
   .text {
    font-size: 30px;
    color: white;
   }
 }
}
// 顶部头像样式-----登录状态
.login-header {
  height: 420px;
  background-image: url(@/assets/微信图片_20230423190435.jpg);
  background-size: cover;
  .base-info {
    height: 280px;

    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
    display: flex;
    align-items: center;
      .photo {
        border: 5px solid #EC4141;
      }
      .img-title {
      font-size: 30px;
      color: white;
      margin-left: 23px;
    }
    // 财贸认证小标签
     .tag {
      position: absolute;
      top: 110px;
      left: 205px;
      color: gold;
      background-color: black;
     }

    }
    .right {
      position: absolute;
      right: 0px;
      .van-button {
        border-radius: 200px 0 0 200px;
        background-color: #8a8a8a;
        border: none;
      }
      .toutiao {
        font-size: 40px;
      }
    }

  }
  .data-stats {

    display: flex;
    .data-count {
      flex: 1;
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      .count {
        font-size: 40px;
      }
      .hanzi {
        font-size: 30px;
      }
    }
  }

}
// 收藏、历史按钮-----登录与非登录状态
.grid-nav{
    margin-bottom: 15px;
    .grid-item{
      height: 141px;
    }
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #EC4141;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
// 消息通知、小智同学、帮助与反馈按钮-----登录与非登录状态
.cell {
  height: 110px;
  font-size: 30px;
}
// 退出按钮-----登录状态
.cell-exit {
  height: 110px;
  font-size: 30px;
  text-align: center;
  margin-top: 30px;

  .exit-title {
    line-height: 70px;
    color: #EC4141;
  }
}
</style>
