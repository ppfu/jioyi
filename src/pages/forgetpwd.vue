<template>
  <div class="public">
    <van-nav-bar title=""  left-arrow @click-left="back" />
 <!--   <div class="top">
      <span @click="back">{{$t('cel')}}</span>
      <div @click="lang_dlg=true">
        <p v-if="$store.state.lang=='cn'">
          <img src="../assets/img/ch.png">
          <span>{{$t('ch')}}</span>
          <span class="iconfont icon-tabbottom"></span>
        </p>
        <span v-if="$store.state.lang=='ct'">{{$t('ch1')}}
            <span class="iconfont icon-tabDown_arrow"></span>
          </span>
        <p v-if="$store.state.lang=='en'">
          <img src="../assets/img/eng.png">
          <span>{{$t('en')}}</span>
          <span class="iconfont icon-tabbottom"></span>
        </p>
      </div>
    </div> -->
    <!-- logo -->
    <div class="d_logo">
      <h4>{{$t('fgtpwd.title')}}</h4>
    </div>
    <div class="content">
      <div class="login_info">
        <div class="log_pwd" v-if="$store.state.lang=='en'">
          <van-field type="number" v-model="phone" @input="OnInput($event)" maxlength="11" clearable :placeholder="$t('fgtpwd.tip.t1')" />
        </div>
         <div class="log_pwd log_pwd2" v-if="$store.state.lang=='cn'">
          <span class="phone_pex">+86</span>
          <van-field v-model="phone" type="number" @input="OnInput($event)" maxlength="11" clearable :placeholder="$t('fgtpwd.tip.t1')" />
        </div>
        <div class="log_pwd">
          <van-field v-model="code" maxlength="4" @input="OnInput($event)" :placeholder="$t('fgtpwd.tip.t2')" />
          <a @click="sendVerifyCode">{{codeMsg}}</a>
        </div>
        <div class="log_pwd">
          <van-field type="password" @input="OnInput($event)" v-model="password" maxlength="16" @blur="hintPassFun" clearable :placeholder="$t('fgtpwd.tip.t3')" />
        </div>
        <div class="log_pwd">
          <van-field type="password" @input="OnInput($event)" v-model="repassword" maxlength="16" @blur="hintRepassFun" clearable :placeholder="$t('fgtpwd.tip.t4')" />
        </div>
        <van-button v-if="showBtn == false" type="primary" disabled size="large">{{$t('fgtpwd.btn')}}</van-button>
        <van-button v-if="showBtn == true" type="primary" @click="changePass" size="large">{{$t('fgtpwd.btn')}}</van-button>
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
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        lang_dlg: false,
        showBtn:false,
        phone: '', //手机号
        code: '', //验证码
        password: '', //登录密码
        repassword: '', //确认登录密码
        codeMsg: this.$t('fgtpwd.code'), //发送验证码
        time: 60, //验证码倒计时
      }
    },
    components: {
      XDialog,
    },
    methods: {
      back() {
        this.$router.back();
      },
     OnInput(e){
        let that = this;
       if(that.phone !== '' && that.code !== '' && that.password !== '' && that.repassword !== ''){
          that.showBtn = true;
       }else {
          that.showBtn = false;
       }
      },
      hintPassFun() {
        let that = this;
        if (that.password !== "") {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(that.password)) { // 密码包含大小写字母数字不能纯字母纯数字
            that.$toast("密码格式错误！请输入密码（8-20数字字母组合）");
          }
        }
      },
      hintRepassFun() {
        let that = this;
        if (that.repassword !== "") {
          if (that.repassword !== that.password) {
            that.$toast("两次输入的密码不一样");
          }
        }
      },
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
      //修改密码
      changePass() {
        let that = this;
        let phone = that.phone;
        let code = that.code;
        let password = that.password;
        let repassword = that.repassword;
        if (!phone || phone == null) {
          that.$toast("请输入手机号");
        } else if (
          phone.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(phone)
        ) {
          that.$toast("手机号格式错误");
        } else if (!code || code == null) {
          that.$toast("请输入验证码");
        } else if (!password || password == null) {
          that.$toast("请输入密码");
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(password)) { // 密码包含大小写字母数字不能纯字母纯数字
          that.$toast("密码格式不正确");
        } else if (!repassword || repassword == null) {
          that.$toast("请输入确认密码");
        } else if (password !== repassword) {
          that.$toast("两次输入的密码不一样");
        } else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/forgetPassword", {
              phone: phone,
              code: code,
              password: password,
              repassword: repassword
            })
            .then(function(res) {
              // console.log(res)
              that.$toast.clear();
              let code = res.data.status;
              if (code == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.s3"));
                that.back();
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
              type: 3
            })
            .then(function(res) {
              // console.log(res.data.code)
              if (res.data.status == 1) {
                var msg = "验证码发送成功";
                var msgTex = res.data.message;
                that.code = msgTex.replace(msg, "");
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

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .top {
      height: 0.88rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      line-height: 0.88rem;
      padding: 0 4%;
      box-shadow: none;

      span {
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

        span {
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

        .log_pwd2 {
          /deep/ .van-cell__value:nth-child(1) {
            padding-left: 1rem !important;
          }
        }


        .van-button--primary {
          background: #34A8FF;
          font-size: 0.28rem;
          color: #fff;
          border: none;
          border-radius: 0.08rem;
        }
      }
    }
  }
</style>
