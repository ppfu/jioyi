<template>
  <div class="public">
    <van-nav-bar :title="$t('safe.phone.tit')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info">
        <div class="log_pwd">
          <span class="phone_pex">+86</span>
          <van-field type="number" v-model="phone" maxlength="11" clearable :placeholder="$t('safe.phone.p1')" />
        </div>
        <div class="log_pwd">
          <van-field v-model="code" maxlength="6" :placeholder="$t('safe.phone.p2')" />
          <a @click="sendVerifyCode">{{codeMsg}}</a>
        </div>
        <van-button type="primary" @click="bindPhone" size="large">{{$t('safe.phone.btn')}}</van-button>
      </div>
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
        phone: '', //手机号
        code: '', //验证码
        codeMsg: this.$t('reg.code'),//获取验证码
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
      //绑定
      bindPhone() {
        let that = this;
        let phone = that.phone;
        let code = that.code;
        if (!phone || phone == null) {
          that.$toast(that.$t('safe.phone.p1'));
        } else if (
          phone.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(phone)
        ) {
          that.$toast(that.$t('safe.phone.p3'));
        } else if (!code || code == null) {
         that.$toast(that.$t('safe.phone.p2'));
        }  else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/modificationPhone", {
              phone: phone,
              code: code,
            })
            .then(function(res) {
              let code = res.data.status;
              if (code == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.t1"));
                that.$router.push({
                  path: "/"
                });
                that.back()
              } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
              }else {
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
          that.$toast(that.$t('safe.phone.p1'));
        } else if (
          phone.trim().length != 11 ||
          !/^[1]([3-9])[0-9]{9}$/.test(phone)
        ) {
          that.$toast(that.$t('safe.phone.p3'));
        }  else {
          if (that.codeMsg != that.$t('reg.code') && that.codeMsg != that.$t('reg.resend')) return;
          var time = that.time;
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/phoneCode", {
              phone: phone,
              type: 6
            })
            .then(function(res) {
              // console.log(res.data.code)
              if (res.data.status == 1) {
                var msg = "验证码发送成功";
                var msgTex = res.data.message;
                that.code = msgTex.replace(msg,"");
                that.$vux.loading.hide();
                that.$toast.success(that.$t("reg.succ"));
                verify_code = res.data.data;
                var interval = setInterval(function() {
                  time--;
                  that.codeMsg = time + "s";
                  if (time <= 0) {
                    clearInterval(interval);
                     that.codeMsg = that.$t("reg.resend");
                  }
                }, 1000);
              } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
              }else {
                that.$vux.loading.hide();
                that.$toast(res.data.message);
              }
            })
            .catch(function(err) {});
        }
      },
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
          color: #34A8FF;
        }
      }
    }

    .content {
      .login_info {
        margin-top: 0.6rem;
        width: 100%;

        .van-cell:not(:last-child)::after {
          border: none;
        }

        .log_pwd {
          display: flex;
          position: relative;
          span.phone_pex{
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
        .log_pwd:nth-child(1){
          /deep/ .van-cell__value:nth-child(1){
              padding-left: 1rem !important;
            }
        }
        .check{
          width: 100%;
          display: flex;
          justify-content: center;
          padding-top: 0.4rem;
           /deep/ .van-checkbox {
            // margin-bottom: 0.2rem;
          }

          /deep/ .van-checkbox__label {
            color: #A9A9A9;
            font-size: 0.28rem;
          }
          /deep/ .van-checkbox__icon .van-icon {
            background: #fff;
            border: 1px solid #A9A9A9;
            border-radius:50%;
          }
          span{
            color: #34A8FF;
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
