<template>
  <div class="public">
    <van-nav-bar :title="$t('safe.autonym.tit')" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info">
        <!-- 未实名或实名未通过 姓名 -->
        <van-field v-if="authData.certified == 0 || authData.certified == 3" v-model="real_name" clearable :placeholder="$t('safe.autonym.tip.t1')" />
        <!-- 实名通过或资料已提交还未审核 -->
        <van-field v-if="authData.certified  == 1 || authData.certified  == 2" v-model="real_name" clearable disabled />
        <!-- 未实名或实名未通过  身份证号-->
        <van-field v-if="authData.certified  == 0 || authData.certified  == 3" v-model="identity_card" maxlength="18"
          clearable :placeholder="$t('safe.autonym.tip.t2')" />
        <!-- 实名通过或资料已提交还未审核 -->
        <van-field v-if="authData.certified  == 1 || authData.certified  == 2" v-model="identity_card" maxlength="18"
          clearable disabled />
      </div>
      <div class="tips">
        <span>{{$t('safe.autonym.tip.t3')}}:</span>
        <p>{{$t('safe.autonym.tip.t4')}}</p>
      </div>
      <van-button v-if="authData.certified  == 0 || authData.certified  == 3" type="primary" @click="accountAuth" size="large">{{$t('safe.autonym.btn')}}</van-button>
      <van-button v-if="authData.certified == 1 || authData.certified == 2" type="primary"  @click="accountAuth"
        size="large">{{$t('safe.autonym.btn')}}</van-button>
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
        authData: {}, //实名认证信息
        real_name: '', //姓名
        identity_card: '', //身份证号
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getAuth();
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      //获取实名认证信息
      getAuth() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/certificateStatus",
            method: "get",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.authData = res.data.data;
              that.$store.state.auth_data = that.authData ;
              that.real_name = that.authData.real_name;
              that.identity_card = that.authData.identity_card;
            } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
            }else {
              that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //点击确认并前往身份证上传页面
      accountAuth() {
        let that = this;
        let real_name = that.real_name;
        let identity_card = that.identity_card;
        if (!real_name || real_name == null) {
          that.$toast(that.$t('safe.autonym.tip.t1'));
        } else if (!identity_card || identity_card == null) {
          that.$toast(that.$t('safe.autonym.tip.t2'));
        } else {
          that.$router.push({
            path: '/uploadCard',
            query: {
              real_name: real_name,
              identity_card: identity_card,
            }
          })
        }
      },
      //实名认证
      // accountAuth() {
      //   let that = this;
      //   let real_name = that.real_name;
      //   let idcard_number = that.idcard_number;
      //   if (!real_name || real_name == null) {
      //     that.$toast(that.$t('safe.autonym.tip.t1'));
      //   } else if (!idcard_number || idcard_number == null) {
      //     that.$toast(that.$t('safe.autonym.tip.t2'));
      //   } else {
      //     that.$vux.loading.show({
      //       text: ""
      //     });
      //     that.$http
      //       .post("User/getRealNameCheck", {
      //         token: window.localStorage.getItem("token"),
      //         real_name: real_name,
      //         idcard_number: idcard_number,
      //       })
      //       .then(function(res) {
      //         // that.$toast.clear();
      //         if (res.data.code == 1) {
      //           that.$vux.loading.hide();
      //           that.$toast.success("认证成功");
      //           that.$router.back(-1);
      //         } else {
      //           that.$vux.loading.hide();
      //           that.$toast.fail(res.data.msg);
      //         }
      //       })
      //       .catch(function(err) {});
      //   }
      // },
    }
  }
</script>

<style lang="less" scoped>
  .public {
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

        // /deep/ .van-cell:nth-child(2) {
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

      .tips {
        width: 100%;
        padding: 0.6rem 4%;
        font-size: 0.26rem;
        color: #999;
        line-height: 0.42rem;
      }

      h5 {
        text-align: center;
        font-size: 0.24rem;
        padding: 0.2rem 0;
      }

      .van-button--large {
        margin-top: 2rem !important;
      }

      .van-button--primary {
        width: 92%;
        margin: 0 4%;
      }
    }

  }
</style>
