<template>
  <div class="public">
    <van-nav-bar title="" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active" @click="navTap(active)">
        <van-tab :title="$t('asset.tit.t1')">
          <div class="account">
            <div class="ass_con">
              <div class="ass_card">
                <div class="ass_left">
                  <span>{{$t('asset.ass.a1')}}(USDT)</span>
                  <span>{{account.usdt}}</span>
                  <span>≈{{account.cny}} CYN</span>
                </div>
                <div class="ass_right" @click="goTran">
                  划转
                </div>
              </div>
            </div>
            <div class="coin_info">
              <div class="header">
                <span>{{$t('asset.form.f1')}}</span>
                <span>{{$t('asset.form.f2')}}</span>
                <span>{{$t('asset.form.f3')}}</span>
                <span>{{$t('asset.form.f4')}}</span>
              </div>
              <div class="con_list">
                <ul>
                  <li v-for="(item,index) in coinData" :key="index">
                    <span>{{item.symbol}}</span>
                    <span>{{item.balance}}</span>
                    <span>{{item.frozen}}</span>
                    <span>{{item.locked}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('asset.tit.t2')">
          <div class="account">
            <div class="ass_con">
              <div class="ass_card">
                <div class="ass_left">
                  <span>{{$t('asset.ass.a2')}}(USDT)</span>
                  <span>{{coin.usdt}}</span>
                  <span>≈{{coin.cny}} CYN</span>
                </div>
                <div class="ass_right" @click="goTran">
                  {{$t('asset.btn')}}
                </div>
              </div>
            </div>
            <div class="coin_info">
              <div class="header">
                <span>{{$t('asset.form.f1')}}</span>
                <span>{{$t('asset.form.f2')}}</span>
                <span>{{$t('asset.form.f3')}}</span>
                <span>{{$t('asset.form.f4')}}</span>
              </div>
              <div class="con_list">
                <ul>
                  <li v-for="(item,index) in coinData" :key="index">
                    <span>{{item.symbol}}</span>
                    <span>{{item.balance}}</span>
                    <span>{{item.frozen}}</span>
                    <span>{{item.locked}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('asset.tit.t3')">
          <div class="account">
            <div class="ass_con">
              <div class="ass_card">
                <div class="ass_left">
                  <span>{{$t('asset.ass.a3')}}(USDT)</span>
                  <span>{{contract.usdt}}</span>
                  <span>≈{{contract.cny}} CYN</span>
                </div>
                <div class="ass_right" @click="goTran">
                  {{$t('asset.btn')}}
                </div>
              </div>
            </div>
            <div class="coin_info">
              <div class="header">
                <span>{{$t('asset.form.f1')}}</span>
                <span>{{$t('asset.form.f2')}}</span>
                <span>{{$t('asset.form.f3')}}</span>
                <span>{{$t('asset.form.f4')}}</span>
              </div>
              <div class="con_list">
                <ul>
                  <li v-for="(item,index) in coinData" :key="index">
                    <span>{{item.symbol}}</span>
                    <span>{{item.balance}}</span>
                    <span>{{item.frozen}}</span>
                    <span>{{item.locked}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('asset.tit.t4')">
          <div class="account">
            <div class="ass_con">
              <div class="ass_card">
                <div class="ass_left">
                  <span>{{$t('asset.ass.a4')}}(USDT)</span>
                  <span>{{outside.usdt}}</span>
                  <span>≈{{outside.cny}} CYN</span>
                </div>
                <div class="ass_right" @click="goTran">
                  {{$t('asset.btn')}}
                </div>
              </div>
            </div>
            <div class="coin_info">
              <div class="header">
                <span>{{$t('asset.form.f1')}}</span>
                <span>{{$t('asset.form.f2')}}</span>
                <span>{{$t('asset.form.f3')}}</span>
                <span>{{$t('asset.form.f4')}}</span>
              </div>
              <div class="con_list">
                <ul>
                  <li v-for="(item,index) in coinData" :key="index">
                    <span>{{item.symbol}}</span>
                    <span>{{item.balance}}</span>
                    <span>{{item.frozen}}</span>
                    <span>{{item.locked}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
      </van-tabs>
      <!-- <div v-if="orderList.length <=0" class="no_data">
        <img src="../../assets/img/noData.png">
        <span>暂无数据</span>
      </div> -->
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
        show: false,
        active: 0,
        num: 5,
        type: "", //
        coinData: [], //币种信息列表
        account: {}, //账户资产
        coin: {}, //币币账户
        outside: {}, //场外账户
        contract: {}, //合约账户
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getAccountUsdt();
      that.getUserAssets();
    },
    methods: {
      back() {
        this.$router.back();
      },
      cancel() {
        let that = this;
        that.tran_dlg = true;
      },
      goTran() {
        let that = this;
        that.$router.push({
          path: '/transferAcc',
        })
      },
      //订单详情
      goDetailOrder(id) {
        let that = this;
        that.$store.state.payment.deal_id = id;
        that.$router.push({
          path: '/payment',
        })
      },
      navTap(i) {
        let that = this;
        that.getUserAssets();
      },
      //获取平台币信息
      getAccountUsdt() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/accountUsdt",
            method: "get",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.account = res.data.data.account;
              that.coin = res.data.data.coin;
              that.outside = res.data.data.outside;
              that.contract = res.data.data.contract;
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
      },
      //获取资产信息
      getUserAssets() {
        let that = this;
        var l_type = (that.active).toString()
        that.type = l_type == "0" ? "0" : l_type == "1" ? "1" : l_type == "2" ? "2" : "3";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/userAssetsApp",
            method: "post",
            data: {
              type: that.type,
              symbol: '',
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.coinData = res.data.data;
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
      },
      //取消挂单
      cancelEntry(id) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Trade/setCoinTradeCancel",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.$toast.success("取消成功");
              that.getMyTradeOrderList();
            } else {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      },
      //确认收款
      affirmGat(id) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Trade/setCoinOrderDone",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.$toast.success("已确认");
              that.getMyTradeOrderList();
            } else {
              that.$vux.loading.hide();
              // that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      }

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      width: 100%;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 1rem);

      /deep/ .van-tabs__nav {
        // background: rgba(98, 98, 98, 0.1) !important;

      }

      .account {
        margin-top: 0.22rem;
        // padding: 0 4%;
        margin: 0 auto;

        .ass_con {
          width: 100%;
          background: rgba(0, 0, 0, 0.06);
          padding: 0.18rem 4%;

          .ass_card {
            display: flex;
            width: 100%;
            height: 2.8rem;
            padding: 0.28rem;
            border-radius: 0.08rem;
            align-items: center;
            justify-content: space-between;
            background: #fff;

            .ass_left {
              display: flex;
              flex-direction: column;
              font-family: PingFang SC;

              span:nth-child(1) {
                padding: 0.2rem 0;
                font-size: 0.26rem;
              }

              span:nth-child(2) {
                padding-top: 0.1rem;
                font-size: 0.42rem;
              }

              span:nth-child(3) {
                // padding-top: 0.1rem;
                font-size: 0.26rem;
              }
            }

            .ass_right {
              display: inline-block;
              // border: 1px solid #4163C7;
              border-radius: 2rem;
              padding: 0.06rem 0.4rem;
              font-size: 0.28rem;
              border: 1px solid #2D58D9;
              color: #2D58D9;
            }
          }
        }

        .coin_info {
          margin-top: 0.2rem;
          width: 100%;

          .header {
            height: 0.8rem;
            line-height: 0.8rem;
            display: flex;

            // background: #f5f5f5;
            span {
              display: inline-block;
              width: 25%;
              text-align: center;
              font-size: 0.28rem;
              color: #333;
            }
          }

          .con_list {
            height: 100%;

            ul {
              height: 100%;

              li {
                height: 0.9rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.12);

                span {
                  width: 25%;
                  display: inline-block;
                  text-align: center;
                  font-size: 0.26rem;
                  color: #555;

                  a {
                    padding: 0.06rem 0.2rem;
                    background: #0AB480;
                    border-radius: 2rem;
                    color: #fff;
                    font-size: 0.26rem;
                  }
                }

                span:nth-child(1) {
                  a {
                    background: none;
                    color: #949494;
                    font-size: 0.24rem;
                    padding: 0;
                  }
                }

              }
            }

          }
        }
      }

      .no_data {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 3.2rem;
          height: 3.2rem;
        }

        span {
          color: #B1B9DC;
          padding: 0.12rem 0;
          font-size: 0.28rem;
        }
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

      p {
        font-size: 0.34rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(43, 43, 43, 1);
        margin: 1rem;
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
