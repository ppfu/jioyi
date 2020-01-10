<template>
  <div class="public">
   <van-nav-bar title=""  left-arrow @click-left="back" />
<!--    <div class="top">
    <span  @click="back">{{$t('cel')}}</span>

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
  <div class="d_logo">
    <h4>{{$t('reg.title')}}</h4>
  </div>
  <div class="re_con">
    <div class="login_info">
       <div class="log_pwd" v-if="$store.state.lang=='en'">
        <van-field type="number" v-model="phone" maxlength="11" clearable :placeholder="$t('fgtpwd.tip.t1')" />
      </div>
       <div class="log_pwd log_pwd2" v-if="$store.state.lang=='cn'">
        <span class="phone_pex">+86</span>
        <van-field type="number" v-model="phone" maxlength="11" clearable :placeholder="$t('fgtpwd.tip.t1')" />
      </div>
      <div class="log_pwd">
        <van-field v-model="code" maxlength="6" :placeholder="$t('reg.tip.t2')" />
        <a @click="sendVerifyCode">{{codeMsg}}</a>
      </div>
       <div class="log_pwd">
        <van-field  v-model="invitation_code"  clearable :placeholder="$t('reg.tip.t8')" />
      </div>
      <div class="log_pwd">
        <van-field type="password" v-model="password" maxlength="20" @blur="hintPassFun" clearable :placeholder="$t('reg.tip.t3')" />
      </div>
      <div class="log_pwd">
        <van-field type="password" v-model="repassword" maxlength="20" @blur="hintRepassFun" clearable :placeholder="$t('reg.tip.t4')" />
      </div>
      <div class="check">
        <van-checkbox v-model="checked" shape="square" @change="checked == true" checked-color="#2D58D9">{{$t('reg.read')}}</van-checkbox>
        <span @click="goAgree">{{$t('reg.deal')}}</span>
      </div>
      <van-button v-if="checked == false" type="primary" disabled  size="large">{{$t('reg.title')}}</van-button>
      <van-button v-if="checked == true" type="primary" @click="register" size="large">{{$t('reg.title')}}</van-button>
    </div>
  </div>
  <!-- 选择语言弹窗 -->
  <x-dialog v-model="lang_dlg" class="de_dialog lang_dialog" hide-on-blur>
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
  </x-dialog>
 <!-- 注册成功 -->
    <x-dialog v-model="succ_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeSucc"></span>
        <img src="../assets/img/reg_succ.png">
        <h5>注册成功</h5>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        succ_dlg:false,//注册成功弹窗
        lang_dlg: false,//选择语言弹窗
        phone:"", //手机号
        code: "", //验证码
        invitation_code:"",//邀请码
        password: '', //登录密码
        repassword: '', //确认登录密码
        codeMsg: this.$t('reg.code'),
        time: 60, //验证码倒计时
        checked: false, //同意注册协议单选框
      }
    },
    components: {
      XDialog,
    },
    methods: {
      back() {
        this.$router.back();
      },
      closeSucc(){
        let that = this;
        that.succ_dlg = false;
        that.phone = "";
        that.code = "";
        that.password ="";
        that.repassword = "";
        that.invitation_code = "";
        // that.back();
        },
      //检测密码
      hintPassFun() {
        let that = this;
        if (that.password !== "") {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(that.password)) { // 密码包含大小写字母数字不能纯字母纯数字
            that.$toast(that.$t("reg.tip.t5"));
          }
        }
      },
      //检测密码
      hintRepassFun() {
        let that = this;
        if (that.repassword !== "") {
          if (that.password !== that.repassword) {
            that.$toast(that.$t("reg.tip.t6"));
          }
        }
      },
      //切换语言
      changeLang(l) {
        let that = this;
        that.setLang(l);
        that.lang_dlg = false;
        // that
        //   .$http({
        //     url: "/Phone/lang",
        //     method: "post",
        //     data: {
        //       lang: that.$store.state.lang
        //     }
        //   })
        //   .then(function(res) {});
      },
      //注册
      register() {
        let that = this;
        let phone = that.phone;
        let code = that.code;
        let invitation_code = that.invitation_code;
        let password = that.password;
        let repassword = that.repassword;
        if (!phone || phone == null) {
          that.$toast(that.$t("reg.tip.t1"));
        } else if (
          phone.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(phone)
        ) {
          that.$toast(that.$t("reg.tip.t7"));
        } else if (!code || code == null) {
         that.$toast(that.$t("reg.tip.t2"));
        } else if (!password || password == null) {
          that.$toast(that.$t("reg.tip.t3"));
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(password)) { // 密码包含大小写字母数字不能纯字母纯数字
          that.$toast(that.$t("reg.tip.t5"));
        } else if (!repassword || repassword == null) {
         that.$toast(that.$t("reg.tip.t4"));
        } else if (password !== repassword) {
          that.$toast(that.$t("reg.tip.t6"));
        } else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/userRegist", {
              phone: phone,
              code: code,
              password: password,
              repassword: repassword,
              invitation_code:invitation_code,
              type:1
            })
            .then(function(res) {
              let code = res.data.status;
              if (code == 1) {
                that.$vux.loading.hide();
                that.succ_dlg = true;
                that.phone = "";
                that.code = "";
                that.password ="";
                that.repassword = "";
                that.invitation_code = "";
                // that.$router.push({
                //   path: "/"
                // });
              } else {
                that.$vux.loading.hide();
                that.$toast(res.data.message);
              }
            })
            .catch(function(err) {});
        }
      },
      //	发送验证码
      sendVerifyCode() {
        let that = this;
        var phone = that.phone;
        var code = that.code;
        let password = that.password;
        let repassword = that.repassword;
        if (!phone || phone == null) {
           that.$toast(that.$t("reg.tip.t1"));
        } else if (
          phone.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(phone)
        ) {
          that.$toast(that.$t("reg.tip.t7"));
        } else if (password !== repassword) {
          that.$toast(that.$t("reg.tip.t6"));
        } else {
          if (that.codeMsg != that.$t('reg.code') && that.codeMsg != that.$t('reg.resend')) return;
          var time = that.time;
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/phoneCode", {
              phone: phone,
              type: 1
            })
            .then(function(res) {
              // console.log(res.data.code)
              if (res.data.status == 1) {
                var msg = "验证码发送成功";
                var msgTex = res.data.message;
                that.code = msgTex.replace(msg,"");
                console.log(that.code);
                that.$vux.loading.hide();
                that.$toast.success(that.$t("reg.succ"));
                var interval = setInterval(function() {
                  time--;
                  that.codeMsg = time + "s";
                  if (time <= 0) {
                    clearInterval(interval);
                    that.codeMsg = that.$t("reg.resend");
                  }
                }, 1000);
              } else {
                that.$vux.loading.hide();
                that.$toast(res.data.message);
              }
            })
            .catch(function(err) {});
        }
      },
      //注册协议
      goAgree(){
         let that = this;
          that.$router.push({
            path: '/agreement'
          })
      },
      //登陆
      goLogin() {
        let that = this;
        that.$router.push({
          path: '/'
        })
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    .top {
      height: 0.88rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      line-height: 0.88rem;
      padding: 0 4%;
      box-shadow: none;
      span{
        color: #34A8FF;
        font-size: 0.28rem;
      }
      p {
        width: 100%;
        // padding: 0 4%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.28rem;
        span{
          color: #333;
        }

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
      margin-top: 0.8rem;
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
          color: #34A8FF;
        }
      }
    }

    .re_con {
      width: 100%;
      padding: 0 4%;
      .login_info {
        width: 100%;

        .van-cell:not(:last-child)::after {
          border: none;
        }

        .log_pwd {
          display: flex;
          position: relative;

          span.phone_pex {
            position: absolute;
            top: 0.08rem;
            left: 0;
            color: #555;
            // border: 1px solid #34A8FF;
            padding: 0.14rem 0.08rem 0.08rem 0.08rem !important;
            border-radius: 2rem;
            font-size: 0.26rem;
            z-index: 99;

          }

          a {
            display: block;
            width: 34%;
            padding: 0.2rem 0.12rem;
            text-align: center;
            margin-left: 0.12rem;
            color: #0AB480;
            border: 1px solid #0AB480;
            // padding: 0.14rem 0.08rem 0.08rem 0.08rem !important;
            border-radius: 2rem;
          }

        }
//
        .log_pwd2{
          /deep/ .van-cell__value:nth-child(1) {
            padding-left: 1rem !important;
          }
        }

        .check {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0.4rem 0;

          /deep/ .van-checkbox {
            // margin-bottom: 0.2rem;
          }

          /deep/ .van-checkbox__label {
            color: #A9A9A9;
            font-size: 0.28rem;
          }

          /deep/ .van-checkbox__icon .van-icon {
            // background: #2035C1;
            border: 1px solid #A9A9A9;
            border-radius: 50%;
          }

          span {
            color: #2035C1;
            font-size: 0.28rem;
          }
        }


        .van-button--primary {
          background: #34A8FF;
          font-size: 0.28rem;
          color: #fff;
          border: none;
          border-radius: 0.08rem;
        }

        .footer {
          margin-top: 0.12rem;
          display: flex;
          justify-content: flex-end;

          span {
            font-size: 0.28rem;
            font-family: PingFang SC;
            // font-weight: bold;
            line-height: 0.4rem;
          }

          span:nth-child(1) {
            color: #555;
          }

          span:nth-child(2) {
            color: #34A8FF;
          }
        }
      }
    }
  }
</style>
