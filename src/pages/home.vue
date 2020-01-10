<template>
  <div class="public">
    <!-- <van-nav-bar title="比特星空">
      <van-icon name="service-o" slot="right" @click="showPopup" />
    </van-nav-bar> -->
     <!-- logo -->
    <!-- <div class="d_run"  v-if="$store.state.imgIf == true">
       <img class="run_img" src="../assets/img/run.jpg" alt>
       <div class="loding">
         <van-loading type="spinner" color="#1989fa" />
       </div>
     </div> -->
    <div class="main_content">

      <div class="content">
        <van-tabs v-model="active">
          <van-tab :title="$t('home.tab.t1')">
            <div class="swipe" @change="onChange">
              <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in banner" :key="index"><img :src="item.image"></van-swipe-item>
                <!-- <van-swipe-item><img src="../assets/img/swipe2.jpg"></van-swipe-item> -->
              </van-swipe>
            </div>
            <div class="notice">
              <img src="../assets/img/notice.png">
              <span class="textBox">
                <transition name="slide">
                  <a :key="number" class="text">{{notice_info}}</a>
                </transition>
              </span>
              <span @click="goMess">{{$t('home.more')}}</span>
            </div>
            <div class="property">
              <div class="pro_info" v-for="(item,index) in coinList" v-if="index < 3" :key="index">
                <span>{{item.name}}/{{item.area}}</span>
                <span v-if="Number(item.ratio) >= 0" style="color: #01B782;">{{item.price}}</span>
                <span v-if="Number(item.ratio) < 0" style="color: #FE014F;">{{item.price}}</span>
                <span v-if="Number(item.ratio) >= 0" style="color: #01B782;">+{{item.ratio}}%</span>
                <span v-if="Number(item.ratio) < 0" style="color: #FE014F;">{{item.ratio}}%</span>
                <span>≈{{item.price}}CNY</span>
              </div>
            </div>
            <div class="open_img">
              <img src="../assets/img/indeximg.png" />
              <!-- <div class="swipe">
                <van-swipe :autoplay="3000" indicator-color="white">
                  <van-swipe-item v-for="(item,index) in banner" :key="index"><img :src="item.banner_url"></van-swipe-item>
                </van-swipe>
              </div> -->
            </div>
            <!--    <div class="coin_trend">
              <h3>平台币种趋势</h3>
              <div class="coin">
                <p v-for="(item,index) in coin" :key="index">
                  <span>{{item.coin_name}}</span>
                  <span>{{item.price}}（{{item.rise_percent}}）</span>
                </p>
              </div>
            </div> -->
            <div class="coin_info">
              <div class="header">
                <span>{{$t('home.list.i1')}}</span>
                <span>{{$t('home.list.i2')}}(CNY)</span>
                <span>{{$t('home.list.i3')}}</span>
              </div>
              <div class="con_list">
                <ul>
                  <li @click="goTrend(item)" v-for="(item,index) in coinList" :key="index">
                    <span>{{item.name}}/{{item.area}}</span>
                    <span>{{item.price}}</span>
                    <span v-if="item.ratio >= 0"><a style="background: #0AB480;">+{{item.ratio}}%</a></span>
                    <span v-if="item.ratio < 0"><a style="background: #D14B64;">{{item.ratio}}%</a></span>
                  </li>
                </ul>
              </div>
            </div>

          </van-tab>
          <van-tab :title="$t('home.tab.t2')">
            <div class="coin_deal">
              <van-tabs v-model="activeCoin" @click="navTapCoin(activeCoin)">
                <van-tab :title="'USDT' + $t('home.list.i4')">

                  <div class="coin_info">
                    <div class="header">
                      <span>{{$t('home.list.i1')}}</span>
                     <span>{{$t('home.list.i2')}}(CNY)</span>
                     <span>{{$t('home.list.i3')}}</span>
                    </div>
                    <div class="con_list">
                      <ul>
                        <li @click="goTrend(item)" v-for="(item,index) in coinList" :key="index">
                          <span>{{item.name}}/{{item.area}}</span>
                          <span>{{item.price}}</span>
                          <span v-if="item.ratio >= 0"><a style="background: #0AB480;">+{{item.ratio}}%</a></span>
                          <span v-if="item.ratio < 0"><a style="background: #D14B64;">{{item.ratio}}%</a></span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </van-tab>
                <van-tab :title="'ETH' + $t('home.list.i4')">
                  <div class="coin_info">
                    <div class="header">
                      <span>{{$t('home.list.i1')}}</span>
                     <span>{{$t('home.list.i2')}}(CNY)</span>
                     <span>{{$t('home.list.i3')}}</span>
                    </div>
                    <div class="con_list">
                      <ul>
                        <li @click="goTrend(item)" v-for="(item,index) in coinList" :key="index">
                          <span>{{item.name}}/{{item.area}}</span>
                          <span>{{item.price}}</span>
                          <span v-if="item.ratio >= 0"><a style="background: #0AB480;">+{{item.ratio}}%</a></span>
                          <span v-if="item.ratio < 0"><a style="background: #D14B64;">{{item.ratio}}%</a></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </van-tab>
                <van-tab :title="'BTC' + $t('home.list.i4')">
                  <div class="coin_info">
                    <div class="header">
                      <span>{{$t('home.list.i1')}}</span>
                     <span>{{$t('home.list.i2')}}(CNY)</span>
                     <span>{{$t('home.list.i3')}}</span>
                    </div>
                    <div class="con_list">
                      <ul>
                        <li @click="goTrend(item)" v-for="(item,index) in coinList" :key="index">
                          <span>{{item.name}}/{{item.area}}</span>
                          <span>{{item.price}}</span>
                          <span v-if="item.ratio >= 0"><a style="background: #0AB480;">+{{item.ratio}}%</a></span>
                          <span v-if="item.ratio < 0"><a style="background: #D14B64;">{{item.ratio}}%</a></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </van-tab>
              </van-tabs>
            </div>
          </van-tab>
        </van-tabs>
        <!-- 签到 -->
      </div>
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
        home_dlg: false, //签到弹框
        active: 0,
        activeCoin: 0,
        mining: '', //签到收益
        banner: {}, //轮播图
        bannerIndex: 0, //轮播图索引
        notice: [], //浮动公告
        notice_info: '', //浮动公告
        number: 0, //浮动公告第几条
        coin: [], //平台币种
        coinInfo: [], //虚拟币价格趋势
        area: "USDT",
        coinList: [],

      }
    },
    components: {
      XDialog,
    },
    computed: {

    },

    mounted: function() {
      let that = this;
      that.imgIf = true;
      console.log(that.$store.state.imgIf)
      // that.checkMiningPro();
      // that.getHomeInfo();
      that.getUserNoticeList();
      that.getBanner();
      // that.getCoinInfo();
      that.getSocketBase(that.area)
       window.t = setInterval(() => {
        setTimeout(that.getSocketBase(that.area), 0)
      }, 500)
    },
     beforeDestroy() {
      //  清楚定时器
      clearInterval(window.t)
    },
    created() {
      let that = this;
      // setTimeout(function() {
      //   that.$store.state.imgIf = false;
      // }, 4000);
    },
    methods: {
      //客服
      showPopup() {
        let that = this;
        that.$router.push({
          path: '/chat'
        })
      },
      //未开放功能弹窗
      tranTip() {
        this.$toast.fail("该功能尚未开放");
      },
      //关闭签到弹窗
      closeDlg() {
        this.home_dlg = false;
      },
      //获取首页轮播图
      getBanner() {
        let that = this;
        // that.$vux.loading.show({
        //   text: ""
        // });
        that
          .$http({
            url: "/getBanner/1",
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              // that.$vux.loading.hide();
              that.banner = res.data.data.items; //轮播图
            } else {
              that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      onChange(index) {
        let that = this;
        that.bannerIndex = index;
      },
      //浮动公告滚动
      getmove() {
        let that = this;
        // console.log(that.notice)
        if (that.notice.length >= 0) {
          let timer = setTimeout(() => {
            if (that.number === that.notice.length - 1) {
              that.number = 0;
            } else {
              that.number += 1;
            }
            that.notice_info = that.notice[that.number].title;
            // console.log(that.notice_info)
            that.getmove();
          }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
        }
        //
      },
      //获取首页信息
      getHomeInfo() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Index/index",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              // that.$vux.loading.hide();
              that.banner = res.data.data.banner; //轮播图
              that.coin = res.data.data.coin; //
              that.getmove();
            } else {
              that.$toast(res.data.msg);
            }
          })
          .catch(function(error) {

          });
      },
      //获取消息列表信息
      getUserNoticeList() {
        let that = this;
        that
          .$http({
            url: "/getNotice/4",
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
              // page: 1
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              // that.$vux.loading.hide();
              that.notice = res.data.data.items; //消息列表
              that.$store.state.noticeList = that.notice;
              that.getmove();
              console.log(that.notice)
            } else {
              that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
       navTapCoin(i) {
        let that = this;
        that.area = i == 0 ? "USDT" : i == 1 ? "ETH" : i == 2 ? "BTC" : 'USDT';
        that.getSocketBase(that.area);
      },
      //获取对应交易区币对涨幅(币币
      getSocketBase(area) {
        let that = this;
        let agentData = {
          area: area,
          method: "queryCoinArea",
          collect: "no",
          token: window.localStorage.getItem("token"),
        };
        // console.log(that.coinData)
        that.socketApi.sendSock(agentData, that.getData);
      },
      getData(res) {
        let that = this;
        // console.log(res,1)
        if (res.status == 1) {
          if (res.method == "queryCoinArea") {
            if (res.data.syminfo) {
              that.coinList = res.data.syminfo;
            } else {
              that.coinList = []
            }
          }
        } else {
          that.coinList = []
        }
      },
      //虚拟币价格趋势
//       getCoinInfo() {
//         let that = this;
//         that.area = that.activeCoin == 0 ? "USDT" : that.activeCoin == 1 ? "FTH" : "BTC"
//         // that.$vux.loading.show({
//         //   text: ""
//         // });
//         that
//           .$http({
//             url: "/getPairCoinInfo",
//             method: "post",
//             data: {
//               // token: window.localStorage.getItem("token"),
//               area: that.area
//             }
//           })
//           .then(function(res) {
//             if (res.data.status == 1) {
//               // that.$vux.loading.hide();
//               that.coinInfo = res.data.data.listUp;
//               $.each(that.coinInfo, function(i, item) {
//                 item.cny_number = parseFloat(item.cny_number).toFixed(2)
//               });
//               that.coinList = res.data.data.listDown;
//             } else {
//               that.$toast(res.data.message);
//             }
//           })
//           .catch(function(error) {
//
//           });
//       },
      navTap(i) {
        let that = this;
        that.getCoinInfo();
      },
      //v币货
      goVCoin() {
        let that = this;
        that.$router.push({
          path: '/vCoin'
        })
      },
      //钱包
      goWallet() {
        let that = this;
        that.$router.push({
          path: '/wallet'
        })
      },
      //矿机
      goMill() {
        let that = this;
        that.$router.push({
          path: '/myMill'
        })
      },
      //闪兑
      goFlash() {
        let that = this;
        that.$router.push({
          path: '/flashAgainst'
        })
      },
      //生活版块
      goLife() {
        let that = this;
        that.$router.push({
          path: '/lifeSection'
        })
      },
      //娱乐游戏
      goGame() {
        let that = this;
        that.$router.push({
          path: '/games'
        })
      },
      //消息
      goMess() {
        let that = this;

        that.$router.push({
          path: '/messages',
          // query:{
          //   noticeList : that.notice,
          // }
        })
      },
     //币币k线
     goTrend(item){
        let that = this;
       that.$router.push({
         path: '/coinKline',
         query:{
           area:item.area,
           symbol : item.name,
         }
       })
       },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-nav-bar {
      background: rgba(255, 255, 255, 0.06) !important;
    }

    /deep/ .van-nav-bar__right {
      font-size: 0.36rem !important;
    }

    .main_content {
      top: 0;
       height: 100%;

      .content {
        padding: 0;
        height: 100%;
        overflow-y: scroll;
        padding-bottom: 1.4rem;
      }

      .swipe {
        width: 92%;
        margin: 0 auto;
        margin-top: 0.2rem;
        height: 2.46rem;
        border-radius: 0.08rem;
        // box-shadow:0px 0.3rem 0.1rem -0.3rem #13173D;

        img {
          width: 100%;
          // height: 100%;
          // border-radius: 2rem;
        }
      }

      .content {
        font-family: PingFang SC;


        .notice {
          width: 100%;
          padding: 0 4%;
          height: 0.44rem;
          background-size: 100%;
          display: flex;
          align-items: center;
          margin-top: 0.3rem;
          color: #61698D;

          img {
            width: 0.32rem;
            height: 0.32rem;
          }
          span{
            color: #2D58D9;
            font-size: 0.28rem;
          }

          .textBox {
            flex: 1;
            padding-left: 0.2rem;
            // background: red;
            height: 0.46rem;
            line-height: 0.42rem;
            overflow: hidden;
            position: relative;

            .text {
              width: 5.6rem;
              height: 100%;
              position: absolute;
              font-size: 0.26rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #333;
            }
          }

          /* 公告动画 */
          .slide-enter-active,
          .slide-leave-active {
            transition: all 0.5s linear;
          }

          .slide-enter {
            transform: translateY(20px) scale(1);
            opacity: 1;
          }

          .slide-leave-to {
            transform: translateY(-20px) scale(0.8);
            opacity: 0;
          }
        }

        .property {
          width: 100%;
          padding: 0 4%;
          display: flex;
          justify-content: space-between;
          margin-top: 0.16rem;


          .pro_info {
            display: flex;
            width: 32%;
            flex-direction: column;
            align-items: center;
            font-family: PingFang SC;
            padding: 0.16rem;
            background: rgba(0, 0, 0, 0.04);
            border-radius: 0.08rem;

            span:nth-child(1) {
              font-size: 0.3rem;
              color: #555;
            }

            span:nth-child(2) {
              font-size: 0.3rem;
              font-weight: bold;
              color: #0AB480;
              padding: 0.06rem;
            }

            span:nth-child(3) {
              font-size: 0.26rem;
              color: #0AB480;
              padding: 0.06rem;
            }

            span:nth-child(4) {
              font-size: 0.26rem;
              color: #333;
            }
          }
        }

        .open_img {
          margin: 0.2rem 0;
          width: 100%;
          padding: 0 4%;


          img {
            width: 100%;
            border-radius: 4rem;
            box-shadow: 0 0.12rem 0.18rem -0.08rem #040F4D;
          }
        }

        .coin_info {
          margin-top: 0.2rem;
          width: 100%;

          .header {
            height: 0.8rem;
            line-height: 0.8rem;
            display: flex;
            background: #f5f5f5;

            span {
              display: inline-block;
              width: 33.3333%;
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
                  width: 33.3333%;
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
                    font-size: 0.26rem;
                    padding: 0;
                  }
                }

              }
            }

          }
        }

        .coin_deal {
          /deep/ .van-tabs__line {
            display: none !important;
          }
        }

      }
    }
  }
</style>
