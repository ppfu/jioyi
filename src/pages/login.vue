<template>
  <div class="public">
     <van-nav-bar title="" right-text="忘记密码" @click-right="goForgetPwd" left-arrow @click-left="back" />
<!--    <div class="lang">

     <div @click="lang_dlg=true">
        <p v-if="$store.state.lang=='cn'">
          <img src="../assets/img/ch.png">
          <span>{{$t('ch')}}</span>
          <span class="iconfont icon-tabbottom"></span>
        </p>
        <p v-if="$store.state.lang=='en'">
          <img src="../assets/img/eng.png">
          <span>{{$t('en')}}</span>
          <span class="iconfont icon-tabbottom"></span>
        </p>
      </div>
    </div> -->
    <!-- logo -->
    <div class="d_logo">
      <h4>{{$t('login.title')}}</h4>
      <p>{{$t('login.text')}} ,{{$t('login.text2')}}<span @click="register">{{$t('reg.title')}}</span></p>
    </div>
    <div class="content">
      <div class="login_info">
        <div class="log_pwd">
          <van-field type="number" v-model="account" @input="OnInput($event)" clearable maxlength="11" :placeholder="$t('login.tip.t1')" />
        </div>
        <div class="log_pwd">
          <van-field v-model="password" @input="OnInput($event)" type="password" maxlength="20" :placeholder="$t('login.tip.t2')" />
          <a class="iconfont icon-tabclose-eye" @touchstart="eyepwd($event)"></a>
        </div>
        <van-button v-if="showBtn == false" disabled type="primary" size="large">{{$t('login.btn')}}</van-button>
        <van-button v-if="showBtn == true" type="primary" size="large" @click="login">{{$t('login.btn')}}</van-button>
       <!-- <div class="footer">
          <span @click="register">{{$t('login.reg')}}</span>
          <span @click="goForgetPwd">{{$t('login.pwd')}}</span>
        </div> -->
      </div>
    </div>
    <!-- 选择语言弹窗 -->
   <!-- <x-dialog v-model="lang_dlg" class="de_dialog lang_dialog" hide-on-blur>
      <div class="dialog">
        <ul>
          <li :class="{active:$store.state.lang == 'cn'}" @click="changeLang('cn')">
            <span>中文简体</span>
            <span class="iconfont icon-tabduihao"></span>
          </li>
          <li :class="{active:$store.state.lang == 'en'}" @click="changeLang('en')">
            <span>English</span>
            <span class="iconfont icon-tabduihao"></span>
          </li>
        </ul>
      </div>
    </x-dialog> -->
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        showBtn:false,
        lang_dlg: false, //选择语言弹窗
        account: '', //手机号
        password: '', //登录密码
      }
    },
    components: {
      XDialog,
    },
     mounted: function() {
       // this.getHomeInfo()
     },
    methods: {
      back() {
        this.$router.back();
      },
      OnInput(e){
        let that = this;
       if(that.account !== '' && that.password !== ''){
          that.showBtn = true;
       }else {
          that.showBtn = false;
       }
      },
      //注册
      register() {
        let that = this;
        that.$router.push({
          path: '/register'
        })
      },
      //忘记密码
      goForgetPwd() {
        let that = this;
        that.$router.push({
          path: '/forgetpwd'
        })
      },
      //更换语言
      changeLang(l) {
        let that = this;
        that.setLang(l);
        that.lang_dlg = false;
        // that
        //   .$http({
        //     url: "/setLanguage/2",
        //     method: "get",
        //     data: {
        //       // lang: that.$store.state.lang
        //     }
        //   })
        //   .then(function(res) {});
      },
//       getHomeInfo() {
//         let that = this;
//         that.$vux.loading.show({
//           text: ""
//         });
//         that
//           .$http({
//             url: "Index/index",
//             method: "post",
//             data: {
//               time: "1577498996687",
//               sign: "AB1E63D8607CE8D71229B1F6696CF500",
//               lang: 1
//             }
//           })
//           .then(function(res) {
//             console.log(res)
//             if (res.data.code == 1) {
//               that.$vux.loading.hide();
//               // that.banner = res.data.data; //轮播图
//               // that.coin = res.data.data.coin; //
//
//               // that.getmove();
//             } else {
//               that.$vux.loading.hide();
//               that.$toast(res.data.msg);
//             }
//           })
//           .catch(function(error) {
//
//           });
//       },
      //登录
      login() {
        let that = this;
        let account = that.account;
        let password = that.password;
        if (!account || account == null) {
          that.$toast(that.$t("login.tip.t1"));
        } else if (
          account.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(account)
        ) {
          that.$toast(that.$t("login.tip.t3"));
        } else if (!password || password == null) {
          that.$toast(that.$t("login.tip.t2"));
        } else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/login", {
              account: account,
              password: password,
            })
            .then(function(res) {
              if (res.data.status == 1) {
                that.$vux.loading.hide();
                that.$store.state.user_login = res.data.data;
                window.localStorage.setItem("token", res.data.data.token);
                that.$toast.success(that.$t("succTip.s1"));
                that.$router.push({
                  path: "/home"
                });
                // that.back();
              } else {
                that.$vux.loading.hide();
                that.$toast.fail(res.data.message);
              }
            })
            .catch(function(err) {});
        }
      },

      //密码展示隐藏
      eyepwd(e) {
       $(e.target).toggleClass("icon-tabopen-eye").toggleClass("icon-tabclose-eye");
        if (
          $(e.target)
          .parents(".log_pwd")
          .find("input")
          .attr("type") == "password"
        ) {
          $(e.target)
            .parents(".log_pwd")
            .find("input")
            .attr("type", "text");
        } else {
          $(e.target)
            .parents(".log_pwd")
            .find("input")
            .attr("type", "password");
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .lang {
      height: 0.88rem;
      width: 100%;
      text-align: right;
      line-height: 0.88rem;

      p {
        width: 100%;
        padding: 0 4%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #333;
        font-size: 0.28rem;

        img {
          width: 0.32rem;
          height: 0.32rem;
          margin-right: 0.16rem;
        }

        span.iconfont {
          color: #666;
          font-size: 0.36rem;
          padding-left: 0.06rem;
        }

      }
    }

    .d_logo {
      margin-top: 1rem;
      overflow: hidden;
      padding-bottom: 0.8rem;
      padding-left: 4%;

      h4 {
        font-size: 0.48rem;
        color: #333;
        font-weight: normal;
        font-family: PingFang SC;
        padding: 0.16rem 0;
      }

      p {
        font-size: 0.28rem;
        color: #555;

        span {
          color: #2238C6;
        }
      }
    }

    .content {
      .login_info {
        width: 100%;

        .van-cell:not(:last-child)::after {
          border: none;
        }

        .log_pwd {
          display: flex;
          position: relative;

          a {
            position: absolute;
            color: #666;
            right: 0.14rem;
            font-size: 0.44rem;
          }
        }

        .van-button--primary {
          background: #2D58D9;
          font-size: 0.28rem;
          color: #fff;
          border: none;
          border-radius: 0.2rem;

        }

        .footer {
          margin-top: 0.12rem;
          display: flex;
          justify-content: space-between;

          span {
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #555;
          }
        }
      }
    }
  }
</style>
