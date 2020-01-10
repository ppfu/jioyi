<template>
  <div class="public">
    <van-nav-bar :title="$t('safe.logPwd.tit')" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info">
        <van-cell @click="goBingPhone"  :title="$t('safe.logPwd.phone') +'  '+ phone" is-link :value="$t('safe.logPwd.btn2')" />
       <van-field  type="password" v-model="primeval_password" maxlength="20" clearable :placeholder="$t('safe.logPwd.tip.t1')" />
        <van-field  type="password" v-model="password" maxlength="20" @blur="hintPassFun" clearable
          :placeholder="$t('safe.logPwd.tip.t2')" />
        <van-field  type="password" v-model="repassword" maxlength="20" @blur="hintRepassFun" :placeholder="$t('safe.logPwd.tip.t3')" />
      </div>
      <!--  <p>
        <span>可用BST:3.56</span>
      </p> -->
      <van-button type="primary" @click="changePass" size="large">{{$t('safe.logPwd.btn3')}}</van-button>
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
        phone: this.$store.state.user_data.phone || '', //手机号
        primeval_password: '', //原密码
        password: '', //登录密码
        repassword: '', //再次输入密码
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
        let primeval_password = that.primeval_password;
        let password = that.password;
        let repassword = that.repassword;
        if (!primeval_password || primeval_password == null) {
          that.$toast(that.$t('safe.logPwd.btn1'));
        } else if (!password || password == null) {
          that.$toast(that.$t('safe.logPwd.btn2'));
        } else if (!repassword || repassword == null) {
          that.$toast(that.$t('safe.logPwd.btn3'));
        } else if (password !== repassword) {
           that.$toast(that.$t('safe.logPwd.btn4'));
        } else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/resetPassword", {
              primeval_password: primeval_password,
              password: password,
              repassword: repassword,
            })
            .then(function(res) {
              // console.log(res)
              that.$toast.clear();
              let code = res.data.status;
              if (code == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.s4"));
                that.$router.back(-1);
              }else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
              }else {
                that.$vux.loading.hide();
                 that.$toast.fail(res.data.message);
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

        .m-code {
          position: relative;

          a {
            position: absolute;
            right: 4%;
            top: 0.30rem;
            font-size: 0.28rem;
            color: #35A8FB;
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
