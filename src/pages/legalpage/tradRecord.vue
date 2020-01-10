<template>
  <div class="public">
    <van-nav-bar :title="$t('legal.record.title')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active" @click="navTap(active)">
        <van-tab :title="$t('legal.record.tab.t1')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in tranList" :key="index">
                    <div class="acc_tit">
                      <span>{{$t('legal.record.detail.d7')}} {{item.order}}</span><span>{{item.create_time}}</span>
                    </div>
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('legal.record.detail.d4')}}</span><span>{{item.appendInfo.to_name}}</span></p>
                        <p><span>{{$t('legal.record.detail.d5')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('legal.record.detail.d1')}}</span><span>{{item.appendInfo.direction}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('legal.record.detail.d2')}}</span><span>{{item.price}}</span></p>
                        <p><span>{{$t('legal.record.detail.d3')}}(CYN)</span><span>{{item.appendInfo.total}}</span></p>
                        <p><span>{{$t('legal.record.detail.d6')}}</span><span>{{item.appendInfo.status}}</span></p>
                      </div>
                    </div>
                    <div class="acc_btn">
                      <!-- 卖出已支付 -->
                      <van-button v-if="item.appendInfo.direction == '卖出' && item.appendInfo.status == '已支付' " size="small"
                        color="#2D58D9">{{$t('legal.record.detail.btn4')}}</van-button>
                      <van-button @click="goDetailOrder(item)" v-if="item.appendInfo.direction == '卖出' && item.appendInfo.status == '已支付' "
                        size="small" color="#2D58D9">{{$t('legal.record.detail.btn3')}}</van-button>
                      <!-- 卖出未支付 -->
                      <van-button @click="goDetailOrder(item)" v-if="item.appendInfo.direction == '卖出' && item.appendInfo.status == '待支付' "
                        size="small" color="#2D58D9">{{$t('legal.record.detail.btn2')}}</van-button>
                      <van-button v-if="item.appendInfo.direction == '卖出' && item.appendInfo.status == '待支付' " disabled
                        size="small" color="#2D58D9">{{$t('legal.record.detail.btn5')}}</van-button>
                      <!-- 买入未支付 -->
                      <van-button @click="goDetailOrder(item)" v-if="item.appendInfo.direction == '买入' && item.appendInfo.status == '待支付' "
                        size="small" color="#2D58D9">{{$t('legal.record.detail.btn2')}}</van-button>
                      <van-button @click="goDetailOrder(item)" v-if="item.appendInfo.direction == '买入' && item.appendInfo.status == '待支付' "
                        size="small" color="#2D58D9">{{$t('legal.record.detail.btn')}}</van-button>
                      <!-- 买入已支付 -->
                      <van-button @click="goDetailOrder(item)" v-if="item.appendInfo.direction == '买入' && item.appendInfo.status == '已付款' "
                        size="small" color="#2D58D9">{{$t('legal.record.detail.btn4')}}</van-button>
                      <van-button @click="goDetailOrder(item)" v-if="item.appendInfo.direction == '买入' && item.appendInfo.status == '已付款' "
                        size="small" color="#2D58D9">{{$t('legal.record.detail.btn3')}}</van-button>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('legal.record.tab.t2')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in tranList" :key="index">
                    <div class="acc_tit">
                      <span>{{$t('legal.record.detail.d7')}} {{item.order}}</span><span>{{item.create_time}}</span>
                    </div>
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('legal.record.detail.d4')}}</span><span>{{item.appendInfo.to_name}}</span></p>
                        <p><span>{{$t('legal.record.detail.d5')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('legal.record.detail.d1')}}</span><span>{{item.appendInfo.direction}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('legal.record.detail.d2')}}</span><span>{{item.price}}</span></p>
                        <p><span>{{$t('legal.record.detail.d3')}}(CYN)</span><span>{{item.appendInfo.total}}</span></p>
                        <p><span>{{$t('legal.record.detail.d6')}}</span><span>{{item.appendInfo.status}}</span></p>
                      </div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('legal.record.tab.t3')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in tranList" :key="index">
                    <div class="acc_tit">
                      <span>{{$t('legal.record.detail.d7')}} {{item.order}}</span><span>{{item.create_time}}</span>
                    </div>
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('legal.record.detail.d4')}}</span><span>{{item.appendInfo.to_name}}</span></p>
                        <p><span>{{$t('legal.record.detail.d5')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('legal.record.detail.d1')}}</span><span>{{item.appendInfo.direction}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('legal.record.detail.d2')}}</span><span>{{item.price}}</span></p>
                        <p><span>{{$t('legal.record.detail.d3')}}(CYN)</span><span>{{item.appendInfo.total}}</span></p>
                        <p><span>{{$t('legal.record.detail.d6')}}</span><span>{{item.appendInfo.status}}</span></p>
                      </div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('legal.record.tab.t4')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefreshEnt">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoadEnt">
                  <div class="acc_list" v-for="(item,index) in entList" :key="index">
                    <div class="acc_tit">
                      <span>{{$t('legal.record.detail.t7')}} {{item.order}}</span><span>{{item.create_time}}</span>
                    </div>
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('legal.record.detail.e8')}}</span><span>{{item.username}}</span></p>
                        <p><span>{{$t('legal.record.detail.d5')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('legal.record.detail.e9')}}</span><span>{{item.surplus}}</span></p>
                        <p><span>{{$t('legal.record.detail.e2')}}</span><span>{{item.price}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('legal.record.detail.d3')}}(CYN)</span><span>{{item.total}}</span></p>
                        <p><span>{{$t('legal.record.detail.t1')}}</span><span>{{item.min_amount}}</span></p>
                        <p><span>{{$t('legal.record.detail.e7')}}</span><span>{{item.max_amount}}</span></p>
                        <p v-if="item.status == 0"><span>{{$t('legal.record.detail.d6')}}</span><span>{{$t('legal.record.detail.t2')}}</span></p>
                        <p v-if="item.status == 1"><span>{{$t('legal.record.detail.d6')}}</span><span>{{$t('legal.record.detail.t3')}}</span></p>
                        <p v-if="item.status == 2"><span>{{$t('legal.record.detail.d6')}}</span><span>{{$t('legal.record.detail.t4')}}</span></p>
                        <p v-if="item.status == 4"><span>{{$t('legal.record.detail.d6')}}</span><span>{{$t('legal.record.detail.t5')}}</span></p>
                        <div class="acc_btn">
                          <!-- 卖出已支付 -->
                          <van-button v-if="item.status == 0" @click="revocation(item.id)" size="small" color="#2D58D9">{{$t('legal.record.detail.btn6')}}</van-button>
                        </div>
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
        buy_info: this.$store.state.buy_info, //委托单
        symbol: this.$store.state.symbol,
        tranList: [], //成交订单
        tranTotal: '', //总数
        entList: [], //委托单
        entTotal: [], //总数
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
      that.getMyMatch(0);

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
      goDetailOrder(item) {
        let that = this;
        that.$store.state.payment = item;
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
        that.entList = [];
        if (i == 0 || i == 1 || i == 2) {
          that.getMyMatch(0);
        } else if (i == 3) {
          that.getMyEntrust(0);
        }

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
        that.getMyMatch(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex++;
        that.moreloading = true;
        that.getMyMatch(1);
      },
      //获取匹配订单记录
      getMyMatch(t) {
        let that = this;
        var l_type = (that.active).toString()
        that.type = l_type == "0" ? "0" : l_type == "1" ? "1" : l_type == "2" ? "2" : "";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/myMatch",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              page: that.pageindex,
              symbol: that.symbol,
              size: 8,
              type: that.type,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              // sthat.tranList = res.data.data.info;
              if (t == 0) {
                if (res.data.data.list.length > 0) {
                  that.tranList = res.data.data.list;
                  // console.log(that.tranList)
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
                if (res.data.data.list.length > 0) {
                  that.tranList = that.tranList.concat(res.data.data.list);

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
              that.$vux.loading.hide();
              that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },

      //下拉刷新
      onRefreshEnt() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.entList = [];
        that.entTotal = 0;
        that.getMyEntrust(0);
      },
      //上拉加载更多
      onLoadEnt() {
        let that = this;
        that.pageindex++;
        that.moreloading = true;
        that.getMyEntrust(1);
      },
      //获取委托订单记录
      getMyEntrust(t) {
        let that = this;
        var l_type = (that.active).toString()
        that.type = l_type == "0" ? "0" : l_type == "1" ? "1" : l_type == "2" ? "2" : "3";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/myEntrust",
            method: "post",
            data: {
              // token: window.localStorage.getItem("token"),
              page: that.pageindex,
              size: 8,
              // symbol:that.symbol,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              // sthat.tranList = res.data.data.info;
              if (t == 0) {
                if (res.data.data.list.length > 0) {
                  that.entList = res.data.data.list;
                  // console.log(that.entList)
                  that.entTotal = res.data.data.total;
                  if (that.entList.length >= that.entTotal) {
                    //全部数据已加载
                    that.finished = true;
                  }
                } else {
                  that.finished = true;
                }
                that.updateLoading = false;
              } else {
                that.moreloading = false;
                if (res.data.data.list.length > 0) {
                  that.entList = that.entList.concat(res.data.data.list);

                  that.entTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.entList.length >= that.entTotal) {
                  //全部数据已加载
                  that.finished = true;
                }
              }
            } else {
              that.$vux.loading.hide();
              that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //取消委托订单
      revocation(id) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/revocationOutside",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(that.$t("succTip.s4"));
              that.onRefreshEnt();
            } else {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
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
              font-size: 0.26rem;

              // span:nth-child(2) {
              //   font-size: 0.24rem;
              // }
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

              .van-button {
                border-radius: 2rem !important;
                margin-left: 0.26rem;
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
