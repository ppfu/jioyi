<template>
  <div class="public">
    <van-nav-bar :title="$t('safe.cashWay.bank.tit')" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info">
        <van-cell  :title="bank" is-link arrow-direction="down" @click="redShow" />
        <van-field  v-model="bank_name" clearable :placeholder="$t('safe.cashWay.bank.b2')" />
        <van-field  v-model="name" clearable :placeholder="$t('safe.cashWay.bank.b3')" />
        <van-field  v-model="bank_card" clearable :placeholder="$t('safe.cashWay.bank.b4')" />
        <van-field  v-model="rebank_card" clearable :placeholder="$t('safe.cashWay.bank.b5')" />
       <div class="log_pwd">
        <van-field v-model="code" maxlength="6" :placeholder="$t('safe.cashWay.bank.b6')" />
        <a @click="sendVerifyCode">{{codeMsg}}</a>
      </div>
      </div>
      <van-button type="primary" size="large" @click="addBank">{{$t('safe.cashWay.bank.btn')}}</van-button>
    </div>
     <van-action-sheet v-model="show" :title="$t('safe.cashWay.bank.b1')" :actions="bankList" get-container="#app"
           @select="onSelect"  />
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
        bank:this.$t('safe.cashWay.bank.b1'),//平台支持银行
        bank_name:"",//开户行
        bank_id:"",//平台支持银行id
        name:"",//持卡人姓名
        bank_card:"",//银行卡号
        rebank_card:"",//再次输入银行卡号
        code:"", //验证码
        show:false,
        codeMsg: this.$t('reg.code'),//获取验证码
        time:60,
        bankList: [],
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getBankList();
      that.getUserPayType();
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      //选择银行
       onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        let that = this;
        that.show = false;
        that.bank = item.name;
        that.bank_id = item.id;
      },
      //选择银行卡弹出框
       redShow() {
        let that = this;
        that.show = true;
      },
       //获取收款方式信息
      getUserPayType() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/getPayWay",
            method: "get",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.bank_info = res.data.data.bank_info;
              that.bank_name =  that.bank_info.bank_name;
              that.bank_card = that.bank_info.bank_card;
              that.rebank_card = that.bank_info.bank_card;
              that.name = that.bank_info.name;
            } else {
               that.$vux.loading.hide();
              that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
       //获取平台支持银行
      getBankList() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/bankinfo",
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.bankList = res.data.data.banklist;
            } else {
               that.$vux.loading.hide();
              that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
       //	发送验证码
      sendVerifyCode() {
        let that = this;
        var code = that.code;
          if (that.codeMsg != that.$t('reg.code') && that.codeMsg != that.$t('reg.resend')) return;
          var time = that.time;
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/phoneCode", {
              phone: that.phone,
              type: 8
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

      },
      //新增银行卡
      addBank() {
        let that = this;
        let bank_name = that.bank_name;
        let bank_card = that.bank_card;
        let rebank_card = that.rebank_card;
        let name = that.name;
        let code = that.code;
        if (!bank_name || bank_name == null) {
          that.$toast(that.$t('safe.cashWay.bank.b2'));
        } else if (!name || name == null) {
          that.$toast(that.$t('safe.cashWay.bank.b3'));
        } else if (!bank_card || bank_card == null) {
          that.$toast(that.$t('safe.cashWay.bank.b4'));
        }else if (!rebank_card || rebank_card == null) {
          that.$toast(that.$t('safe.cashWay.bank.b5'));
        } else if (!code || code == null) {
          that.$toast(that.$t('safe.cashWay.bank.b6'));
        } else {
         that.$vux.loading.show({
          text: ""
        });
          that.$http({
             url: "/bindBank",
             method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              name: name,
              bank_name: bank_name,
              bank_id: that.bank_id,
              bank_card: that.bank_card,
              rebank_card: that.rebank_card,
              code: that.code,
            }
            }).then(function(res) {
              if (res.data.status == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.t1"));
                that.back();
              } else {
                that.$vux.loading.hide();
                that.$toast.fail(res.data.message);
              }
            })
            .catch(function(err) {
            });
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
          .log_pwd {
          display: flex;
          width: 92% !important;
          margin: 0 auto !important;
          position: relative;
          align-items: flex-end;
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
            color: #555;
            border: 1px solid #34A8FF;
            // padding: 0.14rem 0.08rem 0.08rem 0.08rem !important;
            border-radius: 2rem;
          }

        }

        // /deep/ .van-cell:nth-child(3) {
        //   border: none !important;
        // }

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
