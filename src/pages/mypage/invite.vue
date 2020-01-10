<template>
  <div class="public">
    <van-nav-bar :title="$t('invite.tit')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="head_char">
        <p>
          <span>{{$t('invite.i1')}}</span>
          <span>{{inviteInfo.invitation_code}}
            <a v-clipboard:copy="inviteInfo.invitation_code" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('invite.btn1')}}</a>
          </span>
        </p>
        <div class="coin_add">
          <span>{{$t('invite.i2')}}</span>
          <p><span>{{inviteInfo.invitationUrl}}</span>
            <a v-clipboard:copy="inviteInfo.invitationUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('invite.btn2')}}</a></p>
        </div>
        <div class="in_code">
          <span>{{$t('invite.i3')}}</span>
          <img :src="inviteInfo.invitationCode">
        </div>
      </div>
      <div class="coin_info">
        <div class="in_tit">
          <button-tab v-model="dealType">
            <button-tab-item @click.native="navTap(0)" selected>{{$t('invite.red.r1')}}</button-tab-item>
            <button-tab-item @click.native="navTap(1)">{{$t('invite.red.r2')}}</button-tab-item>
          </button-tab>
          <span>300LINE</span>
        </div>

        <div v-if="dealType == 0" class="account">
          <div class="scroll_div">
            <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
              @refresh="onRefreshIn">
              <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
                @load="onLoadIn">
                <div class="acc_list" v-for="(item,index) in inviteList" :key="index">
                  <div class="acc_con">
                    <div class="acc_top">
                      <p><span>{{$t('invite.red.r3')}}</span><span>{{item.username}}</span></p>
                      <p><span>{{$t('invite.red.r4')}}</span><span>{{item.phone}}</span></p>
                    </div>
                    <div class="acc_top">
                      <p><span>{{$t('invite.red.r5')}}</span><span>{{item.create_time}}</span></p>
                    </div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
       <!--   <div class="no_data" v-if="inviteList.length <= 0">
            <img src="../../assets/img/noda.png">
            <span>{{$t('nodata')}}</span>
          </div> -->
        </div>
        <div v-if="dealType == 1" class="account">
           <div class="scroll_div">
         <van-pull-refresh v-model="updateLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="正在加载..."
            @refresh="onRefreshPro">
            <van-list v-model="moreloading" :finished="finished" :immediate-check="true" finished-text="————— 已经没有更多了 —————"
              @load="onLoadPro">
              <div class="acc_list" v-for="(item,index) in profitList" :key="index">
                <div class="acc_con">
                  <div class="acc_top">
                    <p><span>{{$t('invite.red.r3')}}</span><span>{{item.beinvited_username}}</span></p>
                    <p><span>{{$t('invite.red.r4')}}</span><span>{{item.beinvited_phone}}</span></p>
                  </div>
                  <div class="acc_top">
                    <p><span>{{$t('invite.red.r5')}}</span><span>{{item.update_time}}</span></p>
                    <p><span>{{$t('invite.red.r6')}}</span><span>{{item.total}}</span></p>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
          </div>
        </div>
      </div>
    </div>

  </div>

  </div>
</template>

<script>
  import {
    XDialog,
    ButtonTab,
    ButtonTabItem,
  } from "vux";
  export default {
    data() {
      return {
        money_code: this.$store.state.user_data.transfer_qrcode, //收款码
        dealType: 0, //买，卖按钮索引
        activeNames: ['1'],
        inviteList: [], //邀请记录
        inTotal:'', //记录总数
        profitList:[], //获奖记录
        proTotal:[], //获奖总数
        inviteInfo: {},
        pageindex: 1, //邀请记录默认第一页
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
      }
    },
    components: {
      XDialog,
      ButtonTab,
      ButtonTabItem,
    },
    mounted: function() {
      let that = this;
      that.getInviteInfo();
      that.getInviteList(0);
      that.getProfitList(0)
    },
    methods: {
      back() {
        this.$router.back();
      },
      //获取邀请信息
      getInviteInfo() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/getInviteInfo",
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.inviteInfo = res.data.data;
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //点击记录类别获取数据
      navTap(i) {
        let that = this;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.inviteList = [];
        that.profitList = [];
        that.getInviteList(0);
        that.getProfitList(0);
      },
      //下拉刷新
      onRefreshIn() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.inviteList = [];
        that.inTotal = 0;
        that.getInviteList(0);
      },
      //上拉加载更多
      onLoadIn() {
        let that = this;
        that.pageindex ++;
        that.moreloading = true;
        that.getInviteList(1);
      },
      //获取邀请记录
      getInviteList(t) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/inviteList/" + that.pageindex + '/3',
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              if (t == 0) {
                if (res.data.data.list.length > 0) {
                  that.inviteList = res.data.data.list;
                  that.inTotal = res.data.data.total;
                  if (that.inviteList.length >= that.inTotal) {
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
                  that.inviteList = that.inviteList.concat(res.data.data.list);

                  that.inTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.inviteList.length >= that.inTotal) {
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
            //下拉刷新
      onRefreshPro() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.profitList = [];
        that.proTotal = 0;
        that.getProfitList(0);
      },
      //上拉加载更多
      onLoadPro() {
        let that = this;
        that.pageindex ++;
        that.moreloading = true;
        that.getProfitList(1);
      },
      //获取获奖记录
      getProfitList(t) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/profitList/" + that.pageindex + '/3',
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              if (t == 0) {
                if (res.data.data.info.length > 0) {
                  that.profitList = res.data.data.info;
                  that.proTotal = res.data.data.total;
                  if (that.profitList.length >= that.proTotal) {
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
                  that.profitList = that.profitList.concat(res.data.data.info);

                  that.proTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.profitList.length >= that.proTotal) {
                  //全部数据已加载
                  that.finished = true;
                }
              }
            } else {
             that.moreloading = false;
             that.finished = true;
             that.$vux.loading.hide();
            }
          })
          .catch(function(error) {

          });
      },
       //复制失败
     onError() {
       let that = this;
       // 移动端走的失败
       that.$toast.fail(that.$t('copyFail'));
     },
     //复制成功
     onCopy() {
       // web走的成功
       let that = this;
       that.$toast.success(that.$t('copySuccess'));
     },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-hairline--bottom::after {
      border: none !important;
    }


    .content {

      width: 100%;
      padding: 0.16rem 4%;
      height: calc(100% - 0.80rem);
      background: rgba(0, 0, 0, 0.04);
      overflow: scroll;

      .head_char {
        width: 100%;
        // height: 2.4rem;
        background: #fff;
        border-radius: 0.08rem;
        // color: #333;
        padding: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        p {
          display: flex;
          justify-content: space-between;
          font-size: 0.28rem;
          padding: 0.2rem 0;

          a {
            color: #1372D8;
          }

        }

        .coin_add {
          span {
            font-size: 0.28rem;
          }

          p {
            margin-top: 0.2rem;
            width: 100%;
            // height: 0.8rem;
            border: 1px solid #E6E6E6;
            border-radius: 2rem;
            display: flex;
            align-items: center;

            span {
              display: inline-block;
              padding: 0 0.2rem;
              width: 78%;
              border-right: 1px solid #E6E6E6;
              font-size: 0.26rem;
              color: #666;
            }

            a {
              display: inline-block;
              color: #1372D8;
              font-size: 0.26rem;
              width: 22%;
              text-align: center;
            }
          }

        }

        .in_code {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 0.2rem;
          padding-bottom: 0.2rem;

          span {
            color: #333;
            font-size: 0.28rem;
            padding: 0.2rem;
          }

          img {
            width: 2rem;
            height: 2rem;
          }
        }

      }

      .coin_info {
        margin-top: 0.46rem;

        /deep/ .van-tabs__nav {
          background: none;
        }

        .in_tit {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.28rem;
          color: #1372D8;
          position: relative;
          z-index: 99;
        }

        .vux-button-group {
          width: 4.2rem !important;
          height: 0.68rem !important;

        }

        .vux-button-group>a.vux-button-group-current {
          color: #fff;
          font-size: 0.3rem;
          background: #1372D8;
        }

        .vux-button-group>a.vux-button-tab-item-last:after,
        .vux-button-group>a.vux-button-tab-item-first:after {
          border: none !important;

        }

        .vux-button-group>a {
          height: 0.68rem !important;
          line-height: 0.68rem !important;
          border-radius: 0.08rem !important;
          margin-right: 0.06rem !important;
          font-size: 0.24rem;
        }

        .account {
          width: 100%;
          margin-top: 0.2rem;
          // padding: 0.2rem 4%;
        /deep/ .van-pull-refresh__head{
            z-index: 0;
          }
          // background: rgba(0, 0, 0, 0.06);
          .acc_list {
            padding: 0 4%;
            // margin: 0.2rem 0;
            background: #fff;
            border-radius: 0.08rem;
            margin-bottom: 0.2rem;
            font-family: PingFang SC;

            .acc_con {
              display: flex;
              justify-content: space-between;

              .acc_top {
                width: 48%;
                font-family: PingFang SC;
                padding: 0.32rem 0;

                p {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  span:nth-child(1) {
                    font-size: 0.28rem;
                    color: rgba(0, 0, 0, 0.52);
                  }

                  span:nth-child(2) {
                    font-size: 0.24rem;
                    color: #333;
                    padding: 0.12rem 0;
                  }
                }
              }
            }


          }

          .no_data {
            text-align: center;
            padding: 0.2rem 0;

            img {
              width: 2.6rem;
              height: auto;
            }

            span {
              display: block;
              padding: 0.2rem;
              color: #909090;
              font-size: 0.26rem;
            }
          }
        }
      }
    }
  }
</style>
