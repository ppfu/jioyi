<template>
  <div class="public">
    <van-nav-bar :title="$t('safe.dealPwd.tit')" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info">
        <van-cell @click="goBingPhone" :title="$t('safe.dealPwd.phone') +'  '+ phone" is-link :value="$t('safe.dealPwd.btn2')" />
        <div class="m-code">
          <van-field  v-model="code" clearable maxlength="6" :placeholder="$t('safe.dealPwd.tip.t1')" />
          <a @click="sendVerifyCode">{{codeMsg}}</a>
        </div>
        <van-field  type="password" v-model="password" maxlength="20" @blur="hintPassFun"  clearable :placeholder="$t('safe.dealPwd.tip.t2')" />
        <van-field  type="password" v-model="repassword" maxlength="20" @blur="hintRepassFun" clearable  :placeholder="$t('safe.dealPwd.tip.t3')" />
      </div>
      <!--  <p>
        <span>可用BST:3.56</span>
      </p> -->
      <van-button type="primary" @click="changePass" size="large">{{$t('safe.dealPwd.btn3')}}</van-button>
    </div>
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        phone: this.$store.state.user_data.phone, //手机号
        password: '', //登录密码
        repassword: '', //再次输入密码
        code: '', //验证码
        codeMsg: this.$t('reg.code'),
        time: 60 //倒计时时间
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      // that.getFudaInfo()
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      //绑定手机
      goBingPhone() {
        let that = this;
        that.$router.push({
          path: '/bindingPhone'
        })
      },
       hintPassFun() {
        let that = this;
        if (that.password !== "") {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(that.password)) { // 密码包含大小写字母数字不能纯字母纯数字
            that.$toast(that.$t("reg.tip.t5"));
          }
        }
      },
      hintRepassFun() {
        let that = this;
        if (that.repassword !== "") {
          if (that.password !== that.repassword) {
            that.$toast(that.$t("reg.tip.t6"));
          }
        }
      },
      //修改密码
      changePass() {
        let that = this;
        let phone = that.phone;
        let code = that.code;
        let password = that.password;
        let repassword = that.repassword;
        if (!phone || phone == null) {
          that.$toast("请先绑定手机号");
        } else if (!code || code == null) {
          that.$toast("请输入验证码");
        } else if (!password || password == null) {
          that.$toast("请输入密码");
        }  else if (!repassword || repassword == null) {
          that.$toast("请输入确认密码");
        } else if (password !== repassword) {
          that.$toast("两次输入的密码不一样");
        } else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/moneyPassword", {
              code: code,
              password: password,
              repassword: repassword,
            })
            .then(function(res) {
              // console.log(res)
              // that.$toast.clear();
              let code = res.data.status;
              if (code == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.s4"));
                that.$router.back(-1);
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
       if (!phone || phone == null) {
          that.$toast("请先绑定手机号");
       } else {
         if (that.codeMsg != that.$t('reg.code') && that.codeMsg != that.$t('reg.resend')) return;
         var time = that.time;
         that.$vux.loading.show({
           text: ""
         });
         that.$http
           .post("/phoneCode", {
             phone: phone,
             type: 5
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

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-nav-bar__right {
      color: #fff !important;
      font-size: 0.4rem !important;
    }

    .van-nav-bar .van-icon {
      color: #fff !important;
      font-size: 0.4rem !important;
    }

    .content {
      padding: 0;

      .login_info {
        width: 100%;
        // background: rgba(98, 98, 98, 0.1);

        /deep/ .van-cell {
          width: 92% !important;
          margin: 0 auto !important;
          // border-bottom: 1px solid #1F244F !important;
          border-radius: 0 !important;
          background: none !important;
          padding: 0.26rem 0.1rem !important;
        }

        .van-cell:not(:last-child)::after {
          display: none !important;
        }

        /deep/ .van-field__label {
          color: #333 !important;
        }

        input::-webkit-input-placeholder {
          /* placeholder颜色  */
          color: #A7A7A7 !important;
          /* placeholder字体大小  */
        }

        .m-code {
          display: flex;
          position: relative;
          width: 92% !important;
          margin: 0 auto !important;
          align-items: flex-end;

          a {
            // display: block;
            width: 40%;
            height: 0.8rem;
            line-height: 0.8rem;
            // padding: 0.12rem 0.12rem;
            text-align: center;
            margin-left: 0.12rem;
            color: #555;
            border: 1px solid #34A8FF;
            // padding: 0.14rem 0.08rem 0.08rem 0.08rem !important;
            border-radius: 2rem;
            font-size: 0.28rem;
          }
        }
      }

      .van-button--large {
        margin-top: 2rem !important;
      }

      .van-button--primary {
        width: 92%;
        margin: 0 4%;
      }

      h5 {
        text-align: center;
        font-size: 0.26rem;
        padding: 0.2rem 0;
        color: #5B913F;
      }
    }

    .ver_dialog {
      position: relative;

      span.iconfont {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.2rem;
      }

      h3 {
        padding: 0.2rem 0;
        font-size: 0.32rem;
        color: #2B2B2B;
      }

      input {
        width: 4rem;
        height: 0.66rem;
        border: 1px solid #BFBFBF;
        border-radius: 0.08rem;
        padding-left: 0.2rem;
        color: #333 !important;
        margin: 0.8rem 0;
        font-size: 0.26rem;
      }

      input::-webkit-input-placeholder {
        color: #BEBEBE !important;
      }

      .dia_btn {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          width: 50%;
          height: 0.8rem;
          line-height: 0.8rem;
          display: inline-block;
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 1);
        }

        span:nth-child(1) {
          background: rgba(172, 172, 172, 1);
        }

        span:nth-child(2) {
          background: #4163C7;
        }
      }
    }
  }
</style>
