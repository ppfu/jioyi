<template>
  <div class="public">
    <van-nav-bar :title="$t('coin.charge.tit2')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <van-tabs v-model="active" @click="navTap(active)">
        <van-tab :title="$t('coin.charge.record.tit.t1')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in recordList" :key="index">
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.charge.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d2')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d3')}}</span><span>{{item.update_time}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d4')}}</span>
                          <span v-if="item.status == 0" style="color:#FFC044 ;">{{$t('coin.charge.record.tit.t2')}}</span>
                          <span v-if="item.status == 1" style="color:#2BBE91 ;">{{$t('coin.charge.record.tit.t3')}}</span>
                          <span v-if="item.status == 2" style="color:#D14B64 ;">{{$t('coin.charge.record.tit.t4')}}</span>
                        </p>
                      </div>
                      <!-- <div class="acc_top">

                      </div> -->
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('coin.charge.record.tit.t2')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in recordList" :key="index">
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.charge.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d2')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d3')}}</span><span>{{item.update_time}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d4')}}</span><span style="color:#FFC044 ;">{{$t('coin.charge.record.tit.t2')}}</span></p>
                      </div>
                      <!-- <div class="acc_top">

             </div> -->
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('coin.charge.record.tit.t3')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in recordList" :key="index">
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.charge.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d2')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d3')}}</span><span>{{item.update_time}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d4')}}</span><span style="color:#2BBE91 ;">{{$t('coin.charge.record.tit.t3')}}</span></p>
                      </div>
                      <!-- <div class="acc_top">

             </div> -->
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('coin.charge.record.tit.t4')">
          <div class="account">
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="acc_list" v-for="(item,index) in recordList" :key="index">
                    <div class="acc_con">
                      <div class="acc_top">
                        <p><span>{{$t('coin.charge.record.detail.d1')}}</span><span>{{item.symbol}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d2')}}</span><span>{{item.number}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d3')}}</span><span>{{item.update_time}}</span></p>
                        <p><span>{{$t('coin.charge.record.detail.d4')}}</span> <span style="color:#D14B64 ;">{{$t('coin.charge.record.tit.t4')}}</span>
                        </p>
                      </div>
                      <!-- <div class="acc_top">

          </div> -->
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <!-- <div no></div> -->
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
        type: '',
        recordList: [], //充值列表
        recordTotal: '', //总数
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
      that.getRecord(0)
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
        that.recordList = [];
        that.getRecord(0);
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.recordList = [];
        that.recordTotal = 0;
        that.getRecord(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex++;
        that.moreloading = true;
        that.getRecord(1);
      },
      //获取邀请记录
      getRecord(t) {
        let that = this;
        var l_type = (that.active).toString()
        that.type = l_type == "0" ? " " : l_type == "1" ? "0" : l_type == "2" ? "1" : "2";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/rechargeRecord",
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
                  that.recordList = res.data.data.info;
                  that.recordTotal = res.data.data.total;
                  if (that.recordList.length >= that.recordTotal) {
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
                  that.recordList = that.recordList.concat(res.data.data.info);

                  that.recordTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.recordList.length >= that.recordTotal) {
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


        .scroll_div {
          height: 100%;
          overflow: scroll;

          /deep/ .van-pull-refresh__head {
            z-index: 0 !important;
          }

          .acc_list {
            padding: 0 4%;
            // margin: 0.2rem 0;
            background: #fff;
            border-radius: 0.08rem;
            margin-bottom: 0.2rem;
            font-family: PingFang SC;

            .acc_con {
              .acc_top {
                width: 100%;
                font-family: PingFang SC;
                padding: 0.32rem 0;
                display: flex;
                justify-content: space-between;

                p {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  font-size: 0.28rem;
                  padding: 0.08rem 0;

                  span:nth-child(1) {
                    color: rgba(0, 0, 0, 0.52);
                    font-size: 0.28rem;
                  }

                  span:nth-child(2) {
                    color: #333;
                    padding-top: 0.2rem;
                    font-size: 0.24rem;
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
