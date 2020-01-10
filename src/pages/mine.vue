<template>
  <div class="public">
    <div class="content">
      <div class="d_logo">
        <div class="top_tit">
          <!-- <van-nav-bar title="个人中心">
          <van-icon name="setting-o" slot="right" @click="goSett" />
        </van-nav-bar> -->
          <p><img src="../assets/img/hpo.jpeg"><span>{{data.username}}</span></p>
          <span class="iconfont icon-tabkefu-copy" @click="goChat"></span>
        </div>
        <div class="top_head" @click="goAsste">
          <div class="mine_info">
            <span>{{$t('mine.top.t1')}}(USDT)</span>
            <span>{{totalAsset}}</span>
          </div>
          <div class="statis">
            <p><span>{{$t('mine.top.t2')}}</span><span>{{assets.usable}}</span></p>
            <a></a>
            <p><span>{{$t('mine.top.t3')}}</span><span>{{assets.frozen}}</span></p>
          </div>
        </div>
        <div class="order_states">
          <p @click="chargeMoney"><img src="../assets/img/chbi.png"><span>{{$t('mine.operCoin.o1')}}</span></p>
          <p @click="mentionMoney"><img src="../assets/img/tibi.png"><span>{{$t('mine.operCoin.o2')}}</span></p>
          <p @click="gotrAcc"><img src="../assets/img/zhz.png"><span>{{$t('mine.operCoin.o3')}}</span></p>
        </div>
      </div>

      <div class="set_content">
        <div class="mine_info">
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
              <div slot="title" class="safe_tit"><img class="safe" src="../assets/img/safe.png">&nbsp;&nbsp; <span>{{$t('safe.tit')}}</span></div>
              <div class="stan_info">
                <van-cell v-if="data.phone == ''" @click="goBingPhone" :title="$t('mine.set.safe.s1')" is-link :value="$t('mine.set.state.t1')" />
                <van-cell v-if="data.phone !== ''" @click="goBingPhone" :title="$t('mine.set.safe.s1')" is-link :value="$t('mine.set.state.t9')" />
                <van-cell v-if="data.email == ''" @click="goBingEmail" :title="$t('mine.set.safe.s2')" is-link :value="$t('mine.set.state.t1')" />
                <van-cell v-if="data.email !== ''" @click="goBingEmail" :title="$t('mine.set.safe.s2')" is-link :value="$t('mine.set.state.t9')" />
                <van-cell v-if="payTypeInfo.ali_pay !== 1 && payTypeInfo.ali_pay !== 1 && payTypeInfo.bank !== 1"
                  @click="goCashWay" :title="$t('mine.set.safe.s3')" is-link :value="$t('mine.set.state.t2')" />
                <van-cell v-if="payTypeInfo.ali_pay == 1 || payTypeInfo.ali_pay == 1 || payTypeInfo.bank == 1" @click="goCashWay"
                  :title="$t('mine.set.safe.s3')" is-link :value="$t('mine.set.state.t8')" />
                <van-cell v-if="certified == '0' " @click="goAccountAuth" :title="$t('mine.set.safe.s4')" is-link
                  :value="$t('mine.set.state.t3')" />
                <van-cell v-if="certified == '1' " @click="goAccountAuth" :title="$t('mine.set.safe.s4')" is-link
                  :value="$t('mine.set.state.t5')" />
                <van-cell v-if="certified == '2' " @click="goAccountAuth" :title="$t('mine.set.safe.s4')" is-link
                  :value="$t('mine.set.state.t6')" />
                <van-cell v-if="certified == '3' " @click="goAccountAuth" :title="$t('mine.set.safe.s4')" is-link
                  :value="$t('mine.set.state.t7')" />
                <van-cell @click="goLogPass" :title="$t('mine.set.safe.s5')" is-link :value="$t('mine.set.state.t4')" />
                <van-cell v-if="data.traders_password == 0" @click="goDealPass" :title="$t('mine.set.safe.s6')" is-link
                  :value="$t('mine.set.state.t3')" />
                <van-cell v-if="data.traders_password == 1" @click="goDealPass" :title="$t('mine.set.safe.s6')" is-link
                  :value="$t('mine.set.state.t8')" />
              </div>
            </van-collapse-item>
          </van-collapse>
          <div class="mine_set">
            <img src="../assets/img/intive.png">
            <van-cell @click="goInvite" :title="$t('mine.set.invite')" is-link />
          </div>
          <div class="mine_set">
            <img src="../assets/img/lanset.png">
            <van-cell @click="golanguage" :title="$t('mine.set.lanSet')" is-link />
          </div>
          <div class="mine_set">
            <img src="../assets/img/aboutt.png">
            <van-cell @click="goAbout" :title="$t('mine.set.about')" is-link />
          </div>
          <div class="mine_set">
            <img src="../assets/img/bangzhu.png">
            <van-cell @click="goHelp" :title="$t('mine.set.help')" is-link />
          </div>
          <div class="mine_set">
            <img src="../assets/img/tuichu.png">
            <van-cell :title="$t('mine.set.quit')" is-link arrow-direction="down" @click="redShow" />
          </div>
        </div>

      </div>
    </div>
    <van-action-sheet v-model="show" :title="$t('mine.set.quit')" :actions="actions" get-container="#app" :cancel-text="$t('mine.set.close')"
      @select="logOut" @cancel="onCancel" />
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  export default {
    data() {
      return {
        data: {}, //我的页面信息
        payTypeInfo: {}, //收款方式
        assets: "", //资产
        totalAsset: "", //总资产
        show: false, //退出登录弹出框
        nologin:true,
        certified: "", //实名认证状态
        activeNames: ['1'], //
        actions: [{ //退出
          name: this.$t('logOut')
        }, ]
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getUserInfo();
      that.getStatus();
      that.getUserPayType();
      that.getUsdtAssets();
    },
    methods: {
      back() {
        this.$router.back();
      },
      //转换数据格式
      checkPrice(price) {
        if (price) {
          price = parseFloat(price).toFixed(2);
          if (price < 1000) {
            price = parseFloat(price).toFixed(2);
          }
          if (price >= 1000 && price < 10000) {
            price = parseFloat(price / 1000).toFixed(2) + "k";
          }
          if (price >= 10000 && price < 1000000) {
            price = parseFloat(price / 10000).toFixed(2) + "w";
          }
          if (price >= 1000000) {
            price = parseFloat(price / 1000000).toFixed(2) + "m";
          }
        }
        return price;
      },
      //获取我的页面信息
      getUserInfo() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/getUserInfo",
            method: "get",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {

            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.data = res.data.data;
              that.$store.state.user_data = res.data.data;
            }
            // else if(res.data.status == -1) {
            //   that.$router.push({
            //     path: '/login'
            //   })
            // }
            else{
               // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //获取我的资产
      getUsdtAssets() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/generalUsdtAssets",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {

            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.assets = res.data.data;
              that.totalAsset = Number(that.assets.usable) + Number(that.assets.frozen);
              that.$store.state.assets = that.assets;
              // that.assets.usable = that.checkPrice(that.assets.usable);
              // that.assets.frozen = that.checkPrice(that.assets.frozen);
              // that.totalAsset = that.checkPrice(that.totalAsset);
              that.assets.usable = that.assets.usable;
              that.assets.frozen = that.assets.frozen;
              that.totalAsset = that.totalAsset;
            } else {
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //获取实名认证状态
      getStatus() {
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
              that.certified = res.data.data.certified;
            } else {
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //选择退出登录
      onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        let that = this;
        that.show = false;
        // that.$router.push({
        //   path: '/'
        // })
        that.logOut();
      },
      //退出登录弹出框
      redShow() {
        let that = this;
        that.show = true;
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
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //退出登录
      logOut() {
        let that = this;
        that.$http
          .post("/logout", {
            token: window.localStorage.getItem("token"),
          })
          .then(function(res) {
            that.$toast.clear();
            if (res.data.status == 1) {
              window.localStorage.clear();
              window.sessionStorage.clear();
              that.$toast.success(that.$t("succTip.t3"));
              that.$router.push({
                path: "/login"
              });
            } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
            }else {
              that.$toast.fail(res.data.message);
            }
          })
          .catch(function(err) {});

      },
      onCancel(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        // Toast(item.name);
      },
      //客服
      goChat() {
        let that = this;
        that.$router.push({
          path: '/chat'
        })
      },
      //绑定手机
      goBingPhone() {
        let that = this;
        that.$router.push({
          path: '/bindingPhone'
        })
      },
      //绑定邮箱
      goBingEmail() {
        let that = this;
        that.$router.push({
          path: '/bindingEmail'
        })
      },
      //设置收款方式
      goCashWay() {
        let that = this;
        that.$router.push({
          path: '/cashWay'
        })
      },
      //实名认证
      goAccountAuth() {
        let that = this;
        that.$router.push({
          path: '/accountAuth'
        })
      },
      //修改登录密码
      goLogPass() {
        let that = this;
        that.$router.push({
          path: '/logPass'
        })
      },
      //修改交易密码
      goDealPass() {
        let that = this;
        that.$router.push({
          path: '/moneyPass'
        })
      },
      //邀请好友
      goInvite() {
        let that = this;
        that.$router.push({
          path: '/invite'
        })
      },
      //语言设置
      golanguage() {
        let that = this;
        that.$router.push({
          path: '/languageSet'
        })
      },
      //关于我们
      goAbout() {
        let that = this;
        that.$router.push({
          path: '/about'
        })
      },
      //帮助中心
      goHelp() {
        let that = this;
        that.$router.push({
          path: '/helpCenter'
        })
      },
      //我的订单
      goOrder(i) {
        // console.log(i)
        this.$router.push({
          path: '/order',
          query: {
            type: i
          }
        })
      },
      //我的资产
      goAsste() {
        let that = this;
        that.$router.push({
          path: '/asste'
        })
      },
      //冲币
      chargeMoney() {
        let that = this;
        that.$router.push({
          path: '/chargeMoney'
        })
      },
      //提币
      mentionMoney() {
        let that = this;
        that.$router.push({
          path: '/mentionMoney'
        })
      },
      //转账
      gotrAcc() {
        let that = this;
        that.$router.push({
          path: '/transferAcc',
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    width: 100%;
    height: 100%;
    background: #f5f5f5;

    .content {
      width: 100%;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 1rem);
      margin-bottom: 2rem;

      .d_logo {
        width: 100%;
        overflow: hidden;
        background-size: 100% 100%;

        .top_tit {
          width: 100%;
          padding: 0 4%;
          height: 1.2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          p {
            display: flex;
            align-items: center;
            font-family: PingFang SC;

            img {
              width: 0.66rem;
              height: 0.66rem;
              border-radius: 50%;
            }

            span {
              color: #333;
              font-size: 0.3rem;
              padding-left: 0.12rem;
              font-weight: 600;
            }
          }

          span.iconfont {
            font-size: 0.36rem;
          }

        }




        .top_head {
          width: 92%;
          margin: 0 auto;
          margin-top: 0.04rem;
          background: url(../assets/img/accbg.png) no-repeat center;
          background-size: 100% 100%;
          border-radius: 0.08rem;

          .mine_info {
            display: flex;
            flex-direction: column;
            padding: 0.28rem;
            color: #fff;
            font-family: PingFang SC;


            span:nth-child(1) {
              font-size: 0.26rem;
              padding: 0.06rem 0;
              opacity: 0.8;
            }

            span:nth-child(2) {
              font-size: 0.4rem;

            }
          }

          .statis {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.32rem 0.2rem;

            p {
              display: flex;
              align-items: center;
              font-family: PingFang SC;
              color: rgba(255, 255, 255, 1);

              span:nth-child(1) {
                font-size: 0.24rem;
                opacity: 0.8;
                // padding: 0.12rem 0;
              }

              span:nth-child(2) {
                padding-left: 0.08rem;
                font-size: 0.28rem;
                // font-weight: bold;
              }
            }

            a {
              width: 0.02rem;
              height: 0.4rem;
              background: rgba(255, 255, 255, 1);
              opacity: 0.2;
            }
          }
        }

        .order_states {
          width: 92%;
          margin: 0.2rem auto;
          border-radius: 0.08rem;
          padding: 0.36rem 0.6rem;
          background: #fff;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.22rem;

          p {
            display: flex;
            flex-direction: column;
            align-items: center;

            // span:nth-child(1) {
            //   font-size: 0.6rem;
            //   font-weight: bold;
            //   color: #2D58D9;
            // }
            img {
              width: 0.6rem;
              height: 0.6rem;
            }

            span {
              padding-top: 0.14rem;
              font-size: 0.24rem;
              // font-family: PingFang SC;
              color: #555;
            }
          }

          p:nth-child(4) {
            img {
              width: 0.6rem;
              height: 0.52rem;
            }
          }
        }
      }



      .set_content {
        width: 100%;

        .mine_info {
          height: 100%;
          padding: 0 4%;
          background: #fff;
          padding-bottom: 0.88rem;

          .safe_tit {
            display: flex;
            align-items: center;
            img {
              width: 0.326rem;
              height: 0.32rem;
            }
          }

          p:nth-child(1) {
            padding-top: 0.24rem;
          }

          /deep/ .van-cell {
            padding: 0.24rem 0 !important;
            font-size: 0.28rem;
            background: none !important;
            color: #333 !important;
            border-bottom: 1px solid #f5f5f5;
          }

          .van-hairline--top-bottom::after {
            // border-width: 0;
          }

          /deep/ .van-cell:not(:last-child)::after {
            border: none;
          }

          span.icon-tabanquanzhongxin {
            color: #2D58D9;
          }

          .stan_info {
            /deep/ .van-cell {
              border-bottom: 1px solid rgba(0, 0, 0, 0.02);

              .van-cell__value {
                color: #999;
                font-size: 0.24rem;
              }
            }
          }

          .mine_set {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
              width: 0.32rem;
              height: 0.32rem;
              margin-right: 0.14rem;
            }
          }
        }
      }
    }


    .ver_dialog {
      span.iconfont {
        width: 100%;
        padding: 0.2rem;
        display: block;
        text-align: right;
      }

      h3 {
        font-size: 0.32rem;
        font-weight: 500;
        color: rgba(108, 108, 108, 1);
        margin: 0.8rem 0;
      }

      .dia_btn {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          display: inline-block;
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 1);
        }

        span:nth-child(1) {
          background: rgba(107, 161, 65, 1);
        }
      }
    }
  }
</style>
