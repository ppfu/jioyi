<template>
  <div class="public">
    <van-nav-bar :title="$t('coin.charge.tit')" left-text="" :right-text="$t('coin.charge.tit2')" @click-right="goRechRecord"
      left-arrow @click-left="back" />
    <div class="content">
      <div class="head_char">
        <p><span>{{$t('coin.charge.ass.a1')}}</span><span>{{totalAsset}}</span></p>
        <p><span>{{$t('coin.charge.ass.a2')}}</span><span>{{assets.usable}}</span></p>
        <p><span>{{$t('coin.charge.ass.a3')}}</span><span>{{assets.frozen}}</span></p>
      </div>
      <div class="coin_info">
        <van-collapse v-model="activeNames">
          <van-collapse-item name="1">
            <div slot="title">{{$t('coin.charge.oper.o5')}} {{curCoin}}</div>
            <div class="stan_info">
              <span :class="deIndex == index ? 'active_span':''" v-for="(item,index) in allCoin" :key="index" @click="designate(item,index)">{{item.symbol}}</span>
            </div>
          </van-collapse-item>
        </van-collapse>
        <div class="log_pwd">
          <van-field :label="$t('coin.charge.oper.o2')" v-model="number" :placeholder="$t('coin.charge.tip.t1')" />
        </div>
        <div class="coin_add">
          <span>{{$t('coin.charge.oper.o3')}}</span>
          <p><span>{{coinAdd}}</span>
          <a v-clipboard:copy="coinAdd" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('coin.charge.btn1')}}</a>
          </p>
        </div>
        <div class="coin_add">
          <span>{{$t('coin.charge.oper.o4')}}</span>
          <p><van-field type="text"  v-model="wallet" :placeholder="$t('coin.charge.tip.t3')" /></p>
        </div>
        <div class="coin_img">
          <span>{{$t('coin.charge.oper.o1')}}</span>
          <div class="code_img">
            <!-- <img v-show="imgShow" @click="showUp" :src="zfb_qrcode"  class="wx_img" /> -->
            <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="1" />
          </div>
        </div>
        <div class="tips">
          <span>{{$t('coin.charge.tip.t4')}}：</span>
          <p>{{$t('coin.charge.tip.t7')}}{{curCoin}}{{$t('coin.charge.tip.t8')}}{{curCoin}}{{$t('coin.charge.tip.t9')}},
            {{$t('coin.charge.tip.i1')}}{{curCoin}}{{$t('coin.charge.tip.i2')}}{{curCoin}}{{$t('coin.charge.tip.i3')}}
          </p>
        </div>
      </div>
      <van-button type="primary" @click="chargeCoin" size="large">{{$t('coin.charge.btn2')}}</van-button>
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
        fileList: [],
        assets:{},
        totalAsset:0,
        money_code: '', //收款码
        activeNames: ['1'],
        allCoin: [], //币种信息
        curCoin: "", //当前币种
        deIndex: '', //币种index
        coinAdd: '', //当前币地址
        chargeImg: "", //充值凭证
        number: "", //充值数量
        wallet: "", //用户钱包地址
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getAllCoin();
      that.getUsdtAssets();
    },
    methods: {
      back() {
        this.$router.back();
      },
      //充币记录
      goRechRecord() {
        let that = this;
        that.$router.push({
          path: '/rechargeRecord',
        })
      },
      //选定币种
      designate(item, i) {
        let that = this;
        that.deIndex = i;
        that.curCoin = item.symbol;
        that.coinAdd = item.address;
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
            } else {
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
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
              that.coinAdd = that.allCoin[0].address;
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //充值
      chargeCoin() {
        let that = this;
        let number = that.number;
        let wallet = that.wallet;
        let symbol = that.curCoin;
        let address = that.coinAdd;
        let chargeImg = that.chargeImg;
        if (!number || number == null) {
          that.$toast(that.$t('coin.charge.tip.t1'));
        } else if (!wallet || wallet == null) {
          that.$toast(that.$t('coin.charge.tip.t3'));
        } else if (that.fileList.length <= 0) {
          that.$toast(that.$t('coin.charge.tip.t6'));
        } else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http({
              url: "/chargeCoin",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                number: number,
                address: address,
                symbol: symbol,
                wallet: wallet,
                chargeImg: chargeImg,
              }
            }).then(function(res) {
              if (res.data.status == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.s7"));
                that.back();
              }else if(res.data.status == -1) {
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
        }
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
      // 上传支付截图
      afterRead(file) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.file); // 读取文件
        reader.onload = function(arg) {
          var formData = new FormData();
          formData.append("image", file.file);
          formData.append("type", "6");
          $.ajax({
            url: "http://bzapi.jinjifuweng.com/upload",
            type: "POST",
            data: formData,
            dataType: "JSON",
            cache: false,
            processData: false,
            contentType: false
          }).done(function(res) {
            // console.log(res)
            if (res.status == 1) {

              //成功回调
              that.$toast.success(that.$t("succTip.s6"));
              that.chargeImg = res.data.imagepath;
            } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
              }else {
              //失败
              that.$toast(res.message);
            }
          });
        };
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
      padding-top: 0.2rem;
      width: 100%;
      padding: 0.16rem 4%;
      height: calc(100% - 0.8rem);
      background: rgba(0, 0, 0, 0.04);
      overflow: scroll;

      .head_char {
        width: 100%;
        height: 2.4rem;
        // background: #1372D8;
        background: linear-gradient(to right, #0A97E6, #1D40C4);
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
        padding: 0 4%;
        background: #fff;

        /deep/ .van-cell {
          border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
          padding: 0.32rem 0 0.08rem 0 !important;
        }

        /deep/ .van-cell:not(:last-child)::after {
          border: none;
        }

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

        .log_pwd {

          /deep/ .van-cell {
            border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
            padding: 0.32rem 0 0.08rem 0 !important;
          }
        }

        .coin_add {
          margin-bottom: 0.26rem;
         /deep/ .van-field__label {
            // width: 2.2rem !important;
          }

          span {
            font-size: 0.28rem;
          }

          p {
            margin-top: 0.26rem;
            width: 100%;
            // height: 0.8rem;
            border: 1px solid #E6E6E6;
            border-radius: 2rem;
            line-height: 0.74rem;
            display: flex;
            align-items: center;
            /deep/ .van-cell {
             border: none !important;
             background: none;
             padding: 0.24rem 0.2rem !important;
            }
            span {
              display: inline-block;
              padding: 0 0.26rem;
              width: 78%;
              line-height: 0.4rem;
              word-wrap: break-word;
              border-right: 1px solid #E6E6E6;
              font-size: 0.24rem;
              color: #555;
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

        .coin_img {
          // padding: 0.2rem 0;

          span {
            display: inline-block;
            font-size: 0.28rem;
            padding-bottom: 0.16rem;
          }

          .code_img {
            width: 100%;
            text-align: center;
            padding: 0.1rem 0;
            height: 3.8rem;
            line-height: 3.8rem;

            // border: 1px solid #f5f5f5;
            .wx_img {
              display: inline-block;
              width: 100%;
              height: 100%;
            }

            /deep/ .van-uploader__upload {
              width: 6.2rem !important;
              height: 3rem !important;
              background: none !important;
              border: 1px solid rgba(0, 0, 0, 0.06) !important;
            }

            /deep/ .van-uploader__preview-image {
              width: 6.2rem !important;
              height: 3rem !important;
            }

            /deep/ .van-uploader__upload-icon {
              font-size: 0.8rem !important;
              // font-weight: bold !important;
              color: #B2BCD9 !important;
            }
          }
        }

        .tips {
          font-size: 0.26rem;
          padding-bottom: 0.4rem;
          color: #555;

          p {
            padding-top: 0.12rem;
          }
        }
      }

      .van-button--large {
        margin-bottom: 0.6rem;
      }
    }
  }
</style>
