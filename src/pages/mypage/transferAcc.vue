<template>
  <div class="public">
    <van-nav-bar :title="$t('coin.transfer.tit')" left-text="" :right-text="$t('coin.transfer.tit2')" @click-right="goTranRecord"
      left-arrow @click-left="back" />
    <div class="content">
      <!--   <div class="head_char">
        <p><span>可用USDT</span><span>0.0000</span></p>
        <p><span>冻结USDT</span><span>0.0000</span></p>
        <p><span>可提现数量</span><span>0.0000</span></p>
      </div> -->
      <div class="coin_info">
        <div class="con_select">
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1">

              <div slot="title">{{$t('coin.transfer.oper.o1')}} {{curCoin}} </div>
              <div class="stan_info">
                <span :class="deIndex == index ? 'active_span':''" v-for="(item,index) in allCoin" :key="index" @click="designate(item,index)">{{item.symbol}}</span>
              </div>

            </van-collapse-item>

          </van-collapse>
        </div>
        <div class="coin_tran">
          <div class="coin_left" v-if="countShow == true">
            <div class="coins">
              <span class="tit">{{$t('coin.transfer.oper.o2')}}</span>
              <p class="coins_up"><span>{{transferUp.name}}</span></p>
            </div>
            <div class="coins">
              <span class="tit">{{$t('coin.transfer.oper.o6')}}</span>
              <p @click="showCount" class="coins_down"><span>{{curTran}}</span>
                <span class="iconfont icon-tabbottom"></span></p>
            </div>
          </div>
          <div class="coin_left" v-if="countShow == false">
            <div class="coins">
              <span class="tit">{{$t('coin.transfer.oper.o2')}}</span>
              <p @click="showCount" class="coins_down"><span>{{curTran}}</span>
                <span class="iconfont icon-tabbottom"></span></p>
            </div>
            <div class="coins">
              <span class="tit">{{$t('coin.transfer.oper.o6')}}</span>
              <p class="coins_up"><span>{{transferUp.name}}</span></p>
            </div>
          </div>
          <img @click="toSwitch" class="coin_right" src="../../assets/img/cut.png">
        </div>
        <div class="log_pwd">
          <van-field :label="$t('coin.transfer.oper.o5') + '（'+curCoin+'）'" clearable v-model="number" type="text"
            :placeholder="$t('coin.transfer.tip.t1')" />
          <p><span>{{$t('coin.transfer.tip.t2')}} {{useCoin}} {{curCoin}}</span><span @click="allData">{{$t('coin.transfer.btn')}}</span></p>
        </div>

      </div>
      <van-button type="primary" @click="submitTransfer" size="large">{{$t('coin.transfer.btn2')}}</van-button>
    </div>
    <!-- 选择账户弹窗 -->
    <x-dialog v-model="count_dlg" class="de_dialog lang_dialog" hide-on-blur>
      <div class="dialog">
        <ul>
          <li :class="{active:tranIndex==index}" v-for="(item,index) in transferDown" :key="index" @click="selectTran(item,index)">
            <span>{{item.name}}</span>
            <span class="iconfont icon-tabduihao"></span>
          </li>
        </ul>
      </div>
    </x-dialog>
    <!-- 去充值弹窗 -->
    <x-dialog v-model="charge_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeCharge"></span>
        <h3>{{$t('tip.t4')}}</h3>
        <p>{{$t('tip.t5')}}！</p>
        <div class="dia_btn">
          <span @click="closeCharge">{{$t('cel')}}</span>
          <span @click="goCharge">{{$t('recharge')}}</span>
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
        count_dlg: false,
        charge_dlg: false,
        countShow: true,
        activeNames: ['1'],
        tranIndex: 0,
        allCoin: [], //币种信息
        curCoin: "", //当前币种
        tranKey: "", //账户类型
        useCoin: "", //可用
        deIndex: '',
        number: '', //划转数量
        transferUp: {}, //资产账户
        transferDown: [], //划转账户
        curTran: "", //当前划转账户
        counttype:0,

      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getAllCoin();
      that.getTransferInfo();
      that.getUserAssets();
    },
    // created: function() {
    //  this.downHtml = "<p onclick='showCount(event)'><span>" + this.curTran +
    //     "</span></p><span class='iconfont icon-tabbottom'></span>"
    //   $('.coins_down').html(this.downHtml);
    //   var self = this;
    //   window.showCount = self.showCount;
    // },
    methods: {
      back() {
        this.$router.back();
      },
      showCount: function() {

        this.count_dlg = true;

      },
      goTranRecord() {
        let that = this;
        that.$router.push({
          path: '/transferRecord',
        })
      },
      //点击获取全部提现数量
      allData() {
        let that = this;
        that.number = that.useCoin;
      },

      //选定币种
      designate(item, i) {
        let that = this;
        that.deIndex = i;
        that.curCoin = item.symbol;
        that.getUserAssets();
      },
      //选定账户
      selectTran(item, i) {
        let that = this;
        that.tranIndex = i;
        console.log(item)
        that.curTran = item.name;
        that.tranKey = item.key;
        that.count_dlg = false;
        if(that.countShow == false){
           if(that.tranKey == 'coin'){
            that.counttype = 1;
          }else if(that.tranKey == 'outside'){
            that.counttype = 3;
          }else if(that.tranKey == 'contract'){
            that.counttype = 2;
          }
          that.getUserAssets();
        }

        // that.downHtml = "<p @click='showCount'><span>" + that.curTran +
        //   "</span></p><span class='iconfont icon-tabbottom'></span>"
        // $('.coins_down').html(that.downHtml);
      },
      showCount() {
        let that = this;
        that.count_dlg = true;
      },
      //关闭去充值
      closeCharge() {
        let that = this;
        that.charge_dlg = false;
      },
      goCharge() {
        let that = this;
        that.$router.push({
          path: '/chargeMoney',
        })
      },
      //获取平台币信息
      getAllCoin() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/allCoinAddress",
            method: "get",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.allCoin = res.data.data.coinlist;
              that.curCoin = that.allCoin[0].symbol;
              // console.log(that.curCoin)
              that.useCoin = that.allCoin[0].symbolInfo.wit_max;
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
      },
      //获取平台账户名
      getTransferInfo() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/getTransferInfo",
            method: "get",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.transferUp = res.data.data.right[0];
              // that.upHtml = "<span>" + that.transferUp.name + "</span>"
              // $('.coins_up').html(that.upHtml);

              that.transferDown = res.data.data.left;
              that.curTran = res.data.data.left[0].name;

              that.tranKey = res.data.data.left[0].key

              // console.log(that.tranKey)
            } else {
              that.$vux.loading.hide();
              that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
      },
      toSwitch() {
        let that = this;
        if (that.countShow == true) {
          that.countShow = false;
          if(that.tranKey == 'coin'){
            that.counttype = 1;
            that.getUserAssets();
          }else if(that.tranKey == 'outside'){
            that.counttype = 3;
            that.getUserAssets();
          }else if(that.tranKey == 'contract'){
            that.counttype = 2;
            that.getUserAssets();
          }
          console.log(that.tranKey)
        } else {
          that.countShow = true
          that.counttype = 0;
          that.getUserAssets();
        }
      },
      //获取资产信息
      getUserAssets() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/userAssetsApp",
            method: "post",
            data: {
              type: that.counttype,
              symbol: that.curCoin,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.useCoin = res.data.data[0].balance;
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
      },
      //划转
      submitTransfer() {
        let that = this;
        let number = that.number;
        if (Number(that.useCoin) <= 0) {
          that.charge_dlg = true;
          return;
        }
        if (!number || number == null) {
          that.$toast(that.$t('coin.transfer.tip.t1'));
        } else {
          console.log(that.countShow)
         if(that.countShow == true){
           that.accountTransfer();
         }else {
           that.dealTransfer();
         }
        }
      },
       accountTransfer(){
         let that = this;
         that.$vux.loading.show({
           text: ""
         });
          that.$http({
             url: "/accountTransfer",
             method: "post",
             data: {
               // token: window.localStorage.getItem("token"),
               number: that.number,
               symbol: that.curCoin,
               name_account: that.tranKey,
             }
           }).then(function(res) {
             if (res.data.status == 1) {
               that.$vux.loading.hide();
               that.$toast.success(that.$t("succTip.s9"));
               that.getUserAssets();
               that.number = '';
             } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
             }else {
               that.$vux.loading.hide();
               that.$toast.fail(res.data.message);
             }
           })
           .catch(function(err) {});
       },
        dealTransfer(){
         let that = this;
         that.$vux.loading.show({
           text: ""
         });
          that.$http({
             url: "/dealTransfer",
             method: "post",
             data: {
               // token: window.localStorage.getItem("token"),
               number: that.number,
               symbol: that.curCoin,
               name_account: that.tranKey,
             }
           }).then(function(res) {
             if (res.data.status == 1) {
               that.$vux.loading.hide();
               that.$toast.success(that.$t("succTip.s9"));
               that.getUserAssets();
               that.number = '';
             } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
              }else {
               that.$vux.loading.hide();
               that.$toast.fail(res.data.message);
             }
           })
           .catch(function(err) {});
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
      padding: 0.2rem 4%;
      height: calc(100% - 0.8rem);
      background: rgba(0, 0, 0, 0.04);
      overflow: scroll;

      .head_char {
        width: 100%;
        height: 2.4rem;
        background: #1372D8;
        border-radius: 0.08rem;
        color: #fff;
        padding: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        p {
          display: flex;
          justify-content: space-between;
          font-size: 0.28rem;
        }
      }

      .coin_info {
        font-family: PingFang SC;
        margin-top: 0.2rem;
        width: 100%;

        // padding: 0.2rem 4%;
        // background: #fff;
        .stan_info {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          span {
            display: inline-block;
            padding: 0.08rem 0.26rem;
            border-radius: 2rem;
            color: #555;
            margin: 0.12rem 0.12rem;
          }

          .active_span {
            background: #0A97E6;
            color: #fff;
          }
        }

        .con_select {
          background: #fff;
          width: 100%;
          padding: 0.06rem 0.2rem;
          border-radius: 0.08rem;

          /deep/ .van-cell {
            // border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
            border: none;
            padding: 0.24rem 0 !important;
          }

          /deep/ .van-cell:not(:last-child)::after {
            border: none;
          }
        }

        .coin_tran {
          width: 100%;
          margin: 0.26rem 0;
          background: #fff;
          padding: 0.06rem 0.2rem;
          border-radius: 0.08rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .coin_left {
            width: 86%;

            .coins {
              display: flex;
              align-items: center;
              border-bottom: 1px solid #f5f5f5;
              padding: 0.26rem 0 !important;

              span.tit {
                color: #888;
                padding-right: 0.22rem;
              }

              p {
                width: 100%;
                display: flex;
                height: 100%;
                justify-content: space-between;
                align-items: center;
                font-size: 0.28rem;

                span {
                  color: #333;
                }

              }

              span.icon-tabDown_arrow {
                color: #666;
              }
            }

            .coins:nth-child(2) {
              border: none;
            }
          }

          img.coin_right {
            width: 0.4rem;
            height: 0.46rem;
          }

        }

        .log_pwd {
          margin: 0;
          display: flex;
          flex-direction: column;
          margin: 0.12rem 0 1rem 0;
          background: #fff;
          padding: 0.06rem 0.2rem;
          border-radius: 0.08rem;

          /deep/ .van-cell {
            border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
            padding: 0.26rem 0 !important;
          }

          /deep/ .van-cell:not(:last-child)::after {
            border: none;
          }

          /deep/ .van-field__label {
            width: 2.8rem;
          }

          p {
            width: 100%;
            display: flex;
            padding: 0.2rem 0 0.32rem 0;
            justify-content: space-between;

            span {
              font-size: 0.26rem;
            }

            span:nth-child(1) {
              font-size: 0.26rem;
              color: #888;
            }

            span:nth-child(2) {
              font-size: 0.26rem;
              color: #1372D8;
            }

          }


        }

      }
    }
  }
</style>
