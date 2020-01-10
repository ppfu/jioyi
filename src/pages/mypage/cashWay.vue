<template>
  <div class="public">
    <van-nav-bar :title="$t('safe.cashWay.tit')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="account">
        <div class="acc_list">
          <h3><img src="../../assets/img/bank1.png"></h3>
          <div class="acc_top">
            <div class="cash_info">
              <p><span>{{$t('safe.cashWay.c1')}}</span><span>{{bank_info.bank_name}}</span></p>
              <span>{{bank_info.bank_card}}</span>
            </div>
            <span v-if="payTypeInfo.bank == ''" @click="goBank">{{$t('safe.cashWay.btn')}}</span>
            <span v-if="payTypeInfo.bank == 1" @click="goBank">{{$t('safe.cashWay.btn2')}}</span>
          </div>
        </div>
        <div class="acc_list">
          <h3><img src="../../assets/img/zhifu.png"></h3>
          <div class="acc_top">
            <div class="cash_info">
              <p><span>{{$t('safe.cashWay.c2')}}</span><span>{{ali_info.ali_name}}</span></p>
              <span>{{ali_info.ali_num}}</span>
            </div>
           <span v-if="payTypeInfo.ali_pay == ''" @click="goAlipay">{{$t('safe.cashWay.btn')}}</span>
           <span v-if="payTypeInfo.ali_pay == 1" @click="goAlipay">{{$t('safe.cashWay.btn2')}}</span>
          </div>
        </div>
        <div class="acc_list">
          <h3><img src="../../assets/img/weixin.png"></h3>
          <div class="acc_top">
            <div class="cash_info">
              <p><span>{{$t('safe.cashWay.c3')}}</span><span>{{we_info.wechat_name}}</span></p>
              <span>{{we_info.wechat_num}}</span>
            </div>
            <span v-if="payTypeInfo.we_chat == '' " @click="goWechat">{{$t('safe.cashWay.btn')}}</span>
            <span v-if="payTypeInfo.we_chat == 1 " @click="goWechat">{{$t('safe.cashWay.btn2')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        payTypeInfo: {},
        ali_info:{},//支付宝信息
        we_info:{},//微信信息
        bank_info:{},//银行卡信息
      }
    },
    mounted() {
      let that = this;
      that.getUserPayType();
    },
    methods: {
      back() {
        this.$router.back();
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
              that.payTypeInfo = res.data.data;

              that.ali_info = that.payTypeInfo.ali_info;
              that.we_info = that.payTypeInfo.we_info;
              that.bank_info = that.payTypeInfo.bank_info;
            } else {
               that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //微信
      goWechat() {
        let that = this;
        that.$router.push({
          path: '/weChat'
        })
      },
      //支付宝
      goAlipay() {
        let that = this;
        that.$router.push({
          path: '/alipay'
        })
      },
      //银行卡
      goBank() {
        let that = this;
        that.$router.push({
          path: '/bankCard'
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {

    .content {
      padding: 0.2rem 4%;
      height: calc(100% - 0.8rem);
      background: rgba(0, 0, 0, 0.04);

      .account {
        margin-top: 0.4rem;

        .acc_list {
          padding: 0.32rem 4%;
          background: #fff;
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;

          h3 {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            background: url(../../assets/img/acc.png) no-repeat;
            background-size: 100%;
            text-align: center;
            line-height: 1.2rem;

            img {
              display: inline-block;
              width: 0.54rem;
              height: 0.54rem;
            }
          }

          .acc_top {
            flex: 1;
            padding-left: 0.28rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .cash_info {
              p {
                display: flex;
                align-items: flex-start;
                // font-family: PingFang SC;

                span:nth-child(1) {
                  font-size: 0.28rem;
                  color: #333;
                }

                span:nth-child(2) {
                  display: inline-block;
                  width: 3.2rem;
                  font-size: 0.24rem;
                  color: #A7A7A7;
                  padding-left: 0.12rem;

                }
              }

              span {
                font-size: 0.24rem;
                color: #A7A7A7;
              }
            }

            span {
              font-size: 0.28rem;
              // font-family: PingFang SC;
              color: rgba(53, 168, 251, 1);
            }
          }
        }
      }
    }
  }
</style>
