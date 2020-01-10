<template>
  <div class="public">
    <van-nav-bar :title="$t('coin.transfer.tit2')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active" @click="navTap(active)">
        <van-tab :title="$t('coin.transfer.record.tab.t1')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in tranList" :key="index">
                    <!-- <div class="acc_tit">
                      <span>{{$t('coin.transfer.record.detail.d3')}}</span><span>{{item.create_time}}</span>
                    </div> -->
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.transfer.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.transfer.record.detail.d5')}}</span><span>{{item.total}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('coin.transfer.record.detail.d6')}}</span><span><span>{{item.number}}</span></span></p>
                        <p><span>{{$t('coin.transfer.record.detail.d3')}}</span><span>{{item.create_time}}</span></p>

                      </div>
                    </div>

                  </div>

                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('coin.transfer.record.tab.t2')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in tranList" :key="index">
                    <!-- <div class="acc_tit">
                 <span>{{$t('coin.transfer.record.detail.d3')}}</span><span>{{item.create_time}}</span>
               </div> -->
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.transfer.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.transfer.record.detail.d5')}}</span><span>{{item.total}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('coin.transfer.record.detail.d6')}}</span><span><span>{{item.number}}</span></span></p>
                        <p><span>{{$t('coin.transfer.record.detail.d3')}}</span><span>{{item.create_time}}</span></p>

                      </div>
                    </div>

                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('coin.transfer.record.tab.t3')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in tranList" :key="index">
                    <!-- <div class="acc_tit">
                    <span>{{$t('coin.transfer.record.detail.d3')}}</span><span>{{item.create_time}}</span>
                  </div> -->
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.transfer.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.transfer.record.detail.d5')}}</span><span>{{item.total}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('coin.transfer.record.detail.d6')}}</span><span><span>{{item.number}}</span></span></p>
                        <p><span>{{$t('coin.transfer.record.detail.d3')}}</span><span>{{item.create_time}}</span></p>

                      </div>
                    </div>

                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('coin.transfer.record.tab.t4')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in tranList" :key="index">
                    <!-- <div class="acc_tit">
                     <span>{{$t('coin.transfer.record.detail.d3')}}</span><span>{{item.create_time}}</span>
                   </div> -->
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.transfer.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.transfer.record.detail.d5')}}</span><span>{{item.total}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('coin.transfer.record.detail.d6')}}</span><span><span>{{item.number}}</span></span></p>
                        <p><span>{{$t('coin.transfer.record.detail.d3')}}</span><span>{{item.create_time}}</span></p>
                      </div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
      </van-tabs>
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
        orderList: [], //我的交易页面信息
        type: '',
        tranList: [], //充值列表
        tranTotal: '', //总数
        pageindex: 1, //邀请记录默认第一页
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getTransferRecord(0);
    },
    methods: {
      back() {
        this.$router.back();
      },
      cancel() {
        let that = this;
        that.tran_dlg = true;
      },
      //订单详情
      goDetailOrder(id) {
        let that = this;
        that.$store.state.payment.deal_id = id;
        that.$router.push({
          path: '/payment',
        })
      },
      //点击记录类别获取数据
      navTap(i) {
        let that = this;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.tranList = [];
        that.getTransferRecord(0);
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.tranList = [];
        that.tranTotal = 0;
        that.getTransferRecord(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex++;
        that.moreloading = true;
        that.getTransferRecord(1);
      },
      //获取邀请记录
      getTransferRecord(t) {
        let that = this;
        var l_type = (that.active).toString()
        that.type = l_type == "0" ? "0" : l_type == "1" ? "1" : l_type == "2" ? "3" : "2";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/transferRecordApp",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
              size: 8,
              type: that.type,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              if (t == 0) {
                if (res.data.data.info.length > 0) {
                  that.tranList = res.data.data.info;
                  that.tranTotal = res.data.data.total;
                  if (that.tranList.length >= that.tranTotal) {
                    //全部数据已加载
                    that.finished = true;
                  }
                } else {
                  that.finished = true;
                }
                that.updateLoading = false;
              } else {
                that.moreloading = false;
                if (res.data.data.info.length > 0) {
                  that.tranList = that.tranList.concat(res.data.data.info);

                  that.tranTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.tranList.length >= that.tranTotal) {
                  //全部数据已加载
                  that.finished = true;
                }
              }
            } else {
              that.updateLoading = false;
              that.moreloading = false;
              that.finished = true;
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },


    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      width: 100%;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 0.8rem);
      background: #f5f5f5;

      /deep/ .van-tabs__nav {
        // background: rgba(98, 98, 98, 0.1) !important;
        font-family: PingFang SC;
      }

      /deep/ .van-tabs {
        z-index: 99 !important;
      }

      .account {
        width: 100%;
        padding: 0.2rem 4%;
        margin-top: 0.12rem;

        .scroll_div {
          /deep/ .van-pull-refresh__head {
            z-index: -1 !important;
          }

          .acc_list {
            padding: 0 4%;
            // margin: 0.2rem 0;
            background: #fff;
            border-radius: 0.08rem;
            margin-bottom: 0.2rem;
            font-family: PingFang SC;

            .acc_tit {
              padding: 0.24rem 0;
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #f5f5f5;
              color: #333;
              font-size: 0.28rem;

              span:nth-child(2) {
                font-size: 0.24rem;
              }
            }

            .acc_con {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              padding: 0.14rem 0;

              .acc_top {
                width: 48%;
                font-family: PingFang SC;

                p {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  font-size: 0.4rem;
                  padding: 0.08rem 0;

                  span:nth-child(1) {
                    color: rgba(0, 0, 0, 0.66);
                    font-size: 0.26rem;
                  }

                  span:nth-child(2) {
                    color: #333;
                    font-size: 0.28rem;
                  }
                }
              }
            }

            .acc_btn {
              width: 100%;
              padding-bottom: 0.2rem;
              text-align: right;

              .van-button--primary {
                border-radius: 2rem !important;
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
