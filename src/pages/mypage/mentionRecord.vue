<template>
  <div class="public">
    <van-nav-bar :title="$t('coin.mention.tit2')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active" @click="navTap(active)">
        <van-tab :title="$t('coin.mention.record.tit.t1')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in withdrawList" :key="index">
                    <div class="acc_tit">
                      <span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span>
                    </div>
                    <div class="acc_con">
                      <div class="acc_top">
                       <p><span>{{$t('coin.mention.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                       <p><span>{{$t('coin.mention.record.detail.d2')}}</span><span>{{item.fee}}</span></p>
                       <p><span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('coin.mention.record.detail.d5')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d6')}}</span><span>{{item.total}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d4')}}</span>
                          <span v-if="item.status == 0" style="color:#FFC044 ;">{{$t('coin.mention.record.tit.t2')}}</span>
                          <span v-if="item.status == 1" style="color:#D14B64 ;">{{$t('coin.mention.record.tit.t4')}}</span>
                          <span v-if="item.status == 2" style="color:#2BBE91;">{{$t('coin.mention.record.tit.t3')}}</span>
                        </p>
                      </div>
                    </div>
                    <div class="acc_btn" >
                      <van-button v-if="item.status == 0" @click="showRepeal(item.id)" plain type="info"  size="small" color="#2D58D9">{{$t('coin.mention.record.tit.t5')}}</van-button>
                    </div>
                  </div>

                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('coin.mention.record.tit.t2')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in withdrawList" :key="index">
                    <div class="acc_tit">
                      <span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span>
                    </div>
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.mention.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d2')}}</span><span>{{item.fee}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('coin.mention.record.detail.d5')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d6')}}</span><span>{{item.total}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d4')}}</span><span style="color:#FFC044 ;">{{$t('coin.mention.record.tit.t2')}}</span></p>
                      </div>
                    </div>
                   <div class="acc_btn" >
                     <van-button v-if="item.status == 0" @click="showRepeal(item.id)" plain type="info"  size="small" color="#2D58D9">{{$t('coin.mention.record.tit.t5')}}</van-button>
                   </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('coin.mention.record.tit.t3')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in withdrawList" :key="index">
                    <div class="acc_tit">
                      <span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span>
                    </div>
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.mention.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d2')}}</span><span>{{item.fee}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span></p>
                      </div>
                      <div class="acc_top">
                         <p><span>{{$t('coin.mention.record.detail.d5')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d6')}}</span><span>{{item.total}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d4')}}</span><span style="color:#D14B64 ;">{{$t('coin.mention.record.tit.t3')}}</span></p>
                      </div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('coin.mention.record.tit.t4')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in withdrawList" :key="index">
                    <div class="acc_tit">
                      <span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span>
                    </div>
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.mention.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d2')}}</span><span>{{item.fee}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('coin.mention.record.detail.d5')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d6')}}</span><span>{{item.total}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d4')}}</span><span style="color:#2BBE91 ;">{{$t('coin.mention.record.tit.t4')}}</span></p>
                      </div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('coin.mention.record.tit.t5')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in withdrawList" :key="index">
                    <div class="acc_tit">
                      <span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span>
                    </div>
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.mention.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d2')}}</span><span>{{item.fee}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d3')}}</span><span>{{item.create_time}}</span></p>
                      </div>
                      <div class="acc_top">
                        <p><span>{{$t('coin.mention.record.detail.d5')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d6')}}</span><span>{{item.total}}</span></p>
                        <p><span>{{$t('coin.mention.record.detail.d4')}}</span><span style="color:#FFC044 ;">{{$t('coin.mention.record.tit.t5')}}</span></p>
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
    <!-- 撤销弹窗 -->
    <x-dialog v-model="repeal_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeRepeal"></span>
        <h3></h3>
        <h3>{{$t('coin.mention.record.tit.t6')}}</h3>
        <div class="acc_btn">
          <span @click="repealOrder">{{$t('affirm')}}</span>
          <span @click="closeRepeal">{{$t('cel')}}</span>
        </div>
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
        show: false,
        repeal_dlg: false,
        active: 0,
        num: 5,
        orderList: [], //我的交易页面信息
        type: '',
        withdrawList: [], //充值列表
        withdrawTotal: '', //总数
        pageindex: 1, //邀请记录默认第一页
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
        order_id: '',
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getWithdraw(0);
    },
    methods: {
      back() {
        this.$router.back();
      },
      cancel() {
        let that = this;
        that.tran_dlg = true;
      },
      showRepeal(id) {
        let that = this;
        console.log(id)
        that.order_id = id;
        that.repeal_dlg = true;
      },
      closeRepeal() {
        let that = this;
        that.repeal_dlg = false;
      },
      //撤销
      repealOrder() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/cancelWithdrawal/" + that.order_id,
            method: "get",

          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(that.$t("succTip.s5"));
              that.onRefresh();
            } else if (res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.onRefresh();
              that.repeal_dlg = false;
            } else {
              that.$vux.loading.hide();
              // that.$toast.fail(res.data.message);

            }
          })
          .catch(function(error) {

          });
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
        that.withdrawList = [];
        that.getWithdraw(0);
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.withdrawList = [];
        that.withdrawTotal = 0;
        that.getWithdraw(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex++;
        that.moreloading = true;
        that.getWithdraw(1);
      },
      //获取邀请记录
      getWithdraw(t) {
        let that = this;
        var l_type = (that.active).toString()
        that.type = l_type == "0" ? " " : l_type == "1" ? "0" : l_type == "2" ? "2" : l_type == "3" ? "1" : "3";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/withdrawalRecord",
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
                  that.withdrawList = res.data.data.info;
                  that.withdrawTotal = res.data.data.total;
                  if (that.withdrawList.length >= that.withdrawTotal) {
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
                  that.withdrawList = that.withdrawList.concat(res.data.data.info);

                  that.withdrawTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.withdrawList.length >= that.withdrawTotal) {
                  //全部数据已加载
                  that.finished = true;
                }
              }
            } else {
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

              .van-button {
                border-radius: 10rem !important;
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
      .dialog {
        .acc_btn {
          display: flex;
          justify-content: space-around;
          margin: 0.34rem 0.4rem;
          padding-bottom: 0.4rem;

          span {
            display: block;
            width: 40%;
            height: 0.66rem;
            line-height: 0.66rem;
            border-radius: 4rem;
          }

          span:nth-child(1) {

            background: #2D58D9;
            color: #fff;
          }

          span:nth-child(2) {
            background: #EEEEEE;
            color: #333;
          }
        }
      }
    }
  }
</style>
