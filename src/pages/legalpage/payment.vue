<template>
  <div class="public">
    <div class="d_logo">
      <div class="top_tit">
        <van-nav-bar title="" left-arrow @click-left="back">
          <!-- <van-icon name="chat-o" slot="right" @click="showPopup" /> -->
        </van-nav-bar>
      </div>
      <div class="top_head">
        <div class="mine_info">
          <van-icon name="underway-o" slot="right" />
          <div class="m_phone">
            <span>{{payment.appendInfo.status}}</span>
            <p><span>{{payment.appendInfo.total}}</span>CYN</p>
          </div>
        </div>
        <div class="statis" v-if="payment.appendInfo.direction == '卖出'">
          <p>{{$t('legal.payment.con.c1')}} {{payment.appendInfo.to_name}} {{$t('legal.payment.con.c2')}}
            {{payment.number}}{{payment.symbol}}</p>
          <span>{{$t('legal.payment.con.c3')}} {{payment.price}}CYN</span>
        </div>
        <div class="statis" v-if="payment.appendInfo.direction == '买入'">
          <span>{{$t('legal.payment.con.c3')}} {{payment.price}}CYN</span>
          <p>{{$t('legal.payment.con.c4')}} {{payment.number}} {{payment.symbol}}</p>
        </div>
        <!--        <div v-if="coinOrderInfo.trade_type == 1 && coinOrderInfo.order_status == 1 " class="statis">
          {{rest_time}} 后自动取消订单
        </div>
        <div v-if="coinOrderInfo.trade_type == 2 && coinOrderInfo.order_status == 1 " class="statis">
          请在 {{rest_time}} 内完成付款
        </div> -->
        <!-- <div v-if="coinOrderInfo.trade_type == 2 && coinOrderInfo.order_status == 2 " class="statis">

        </div> -->
      </div>

    </div>
    <!--    <div class="order_states">
      <p>订单号<span>{{coinOrderInfo.order_sn}}</span></p>
      <p>单价<span>￥{{coinOrderInfo.price}}</span></p>
      <p>数量<span>{{coinOrderInfo.order_number}}{{coinOrderInfo.coin_name}}</span></p>
    </div> -->
    <div v-if="payment.appendInfo.direction == '买入'" class="content">
      <!-- <div class="mine_info">
      <van-cell title="联系方式" :value="payment.appendInfo.to_name" />
      </div> -->
      <div class="mine_info">
        <div class="copy_card">
          <van-cell :title="$t('legal.payment.con.c5')" />
          <a class="copy" :href="'tel:' + payment.appendInfo.to_name">{{payment.appendInfo.to_name}}</a>
        </div>
        <div class="pay_way" v-if="payment.status == 1">
          <van-cell v-if="payment.pay_type == 1" :title="$t('legal.payment.con.c8')" :value="$t('legal.payment.payWay.a1')" />
          <van-cell v-if="payment.pay_type == 2" :title="$t('legal.payment.con.c8')" :value="$t('legal.payment.payWay.a3')" />
          <van-cell v-if="payment.pay_type == 3" :title="$t('legal.payment.con.c8')" :value="$t('legal.payment.payWay.a2')" />
          <div class="payment_img">
            <span>付款凭证</span>
            <img :src="payment.b_voucher" @click="srcShowFun()">
            <van-image-preview v-model="srcShow" :images="images" :startPosition="srcIndex" @close="onClose">
              <!--  <template v-slot:srcIndex>第{{ srcIndex }}页</template> -->
            </van-image-preview>
          </div>
        </div>
      </div>

    </div>

    <div v-if="payment.appendInfo.direction == '卖出'" class="content">
      <div class="mine_info" v-if="payment.appendInfo.payInfo.bank == 1 ||payment.appendInfo.payInfo.ali_pay == 1 || payment.appendInfo.payInfo.we_chat == 1">
        <van-cell :title="pay_name" is-link arrow-direction="down" @click="redShow" />
        <div class="pay_met" v-if="pay_name == '银行卡'">
          <van-cell title="收款人" :value="payment.appendInfo.payInfo.bank_info.name" />
          <van-cell title="收款账号" :value="payment.appendInfo.payInfo.bank_info.bank_card" />
          <van-cell title="开户银行" :value="payment.appendInfo.payInfo.bank_info.bank_name" />
          <!-- <van-cell title="联系方式" :value="coinOrderInfo.contact_phone" /> -->
        </div>
        <div class="pay_met" v-if="pay_name == '支付宝'">
          <van-cell title="收款人" :value="payment.appendInfo.payInfo.ali_info.ali_name" />
          <van-cell title="支付宝账号" :value="payment.appendInfo.payInfo.ali_info.ali_num" />
          <!-- <van-cell title="联系方式" :value="coinOrderInfo.contact_phone" /> -->
          <p class="pay_code">
            <span>支付宝付款码</span>
            <img :src="payment.appendInfo.payInfo.ali_info.ali_pay">
          </p>
        </div>
        <div class="pay_met" v-if="pay_name == '微信'">
          <van-cell title="收款人" :value="payment.appendInfo.payInfo.we_info.wechat_name" />
          <van-cell title="微信账号" :value="payment.appendInfo.payInfo.we_info.wechat_num" />
          <!-- <van-cell title="联系方式" :value="coinOrderInfo.contact_phone" /> -->
          <p class="pay_code">
            <span>微信付款码</span>
            <img :src="payment.appendInfo.payInfo.we_info.wechat_pay">
          </p>

        </div>
        <div class="coin_img">
          <span>上传支付截图</span>
          <div class="code_img">
            <!-- <img v-show="imgShow" @click="showUp" :src="zfb_qrcode"  class="wx_img" /> -->
            <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="1" />
          </div>
        </div>
      </div>
      <!--   <div class="mine_info" v-if="pay_method.yinlian_name == null && pay_method.zfb_name == null && pay_method.wx_name == null">
        <h5>对方未设置付款方式，请联系对方或客服</h5>
        <van-cell title="联系方式" :value="coinOrderInfo.contact_phone" />
      </div> -->
    </div>
    <div class="data_btn" v-if="payment.appendInfo.direction == '买入'">
      <span v-if="payment.status == 0" @click="cancelOrder">取消订单</span>
      <span v-if="payment.status == 1" @click="complaint">申诉</span>
      <span v-if="payment.appendInfo.status == '待支付'" style="background: #8b8b8b;">等待对方付款</span>
      <span v-if="payment.appendInfo.status == '已付款'" @click="affirmGat">确认放币</span>
    </div>
    <div class="data_btn" v-if="payment.appendInfo.direction == '卖出'">
      <span v-if="payment.status == 0" @click="cancelOrder">取消订单</span>
      <span v-if="payment.status == 1" style="background: #7C7C7C;">取消订单</span>
      <span v-if="payment.status == 0" @click="goPayment">付款</span>
      <span v-if="payment.appendInfo.status == '已付款'" style="background: #7C7C7C;">我已完成付款</span>
      <!--  <span v-if="payment.appendInfo.status == '已付款'" style="background: #7C7C7C;">确认放币</span> -->
    </div>

    <van-action-sheet v-model="show" title="请选择支付方式" :actions="actions" get-container="#app" cancel-text="取消" @select="onSelect"
      @cancel="onCancel" />
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
        actions: [], //下拉菜单列表
        // deal_id: this.$store.state.payment.deal_id, //订单id
        payment: this.$store.state.payment, //
        rest_time: '', //剩余支付时间
        pay_method: {}, //支付，收款方式
        pay_name: '', //支付，收款方式名称
        time_arr: [], //时间数组
        pay_index: '', //选择支付方式的索引
        images: [],
        srcShow: false,
        srcIndex: 0, //图片页面索引
        fileList: [],
        pay_img: "", //支付凭证
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      // that.getCoinOrderInfo();
      // that.ShowCountDown();
      var pay_arr = [];
      if (that.payment.appendInfo.payInfo.bank == 1) {
        pay_arr.push({
          name: "银行卡"
        })
      }
      if (that.payment.appendInfo.payInfo.ali_pay == 1) {
        pay_arr.push({
          name: "支付宝"
        })
      }
      if (that.payment.appendInfo.payInfo.we_chat == 1) {
        pay_arr.push({
          name: "微信"
        })
      }
      that.actions = pay_arr;
      that.pay_name = that.actions[0].name;
    },
    methods: {
      back() {
        this.$router.back();
      },
      srcShowFun() {
        let that = this;
        // 图片预览
        that.srcShow = true;
        // this.srcIndex = index - 1;
        // this.startPosition = index - 1;
        that.images.push(that.payment.b_voucher);
        // if (that.pay_name == "支付宝") {
        //   that.images.push(that.pay_method.zfb_qrcode);
        // }
        // if (that.pay_name == "微信") {
        //   that.images.push(that.pay_method.wx_qrcode);
        // }


      },
      onClose() {
        let that = this;
        that.images = []
      },
      //客服
      showPopup() {
        let that = this;
        that.$router.push({
          path: '/chat'
        })
      },
      redShow() {
        let that = this;
        that.show = true;
      },
      //时间格式转换
      checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      },
      // 上传支付截图
      afterRead(file) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.file); // 读取文件
        reader.onload = function(arg) {
          var formData = new FormData();
          formData.append("image", file.file);
          formData.append("type", "7");
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
              that.pay_img = res.data.imagepath;
            } else {
              //失败
              that.$toast(res.message);
            }
          });
        };
      },


      //选择支付、收款方式
      onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        let that = this;
        that.pay_name = item.name;
        that.show = false;
      },
      //付款
      goPayment() {
        let that = this;
        if (!that.pay_name || that.pay_name == null) {
          that.$toast("请选择支付方式");
        } else {
          var payMet = that.pay_name == "银行卡" ? "1" : that.pay_name == "支付宝" ? "3" : "2";
          that
            .$http({
              url: "/confirmPay",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                id: that.payment.id,
                payType: payMet,
                payImg: that.pay_img,
              }
            })
            .then(function(res) {
              if (res.data.status == 1) {
               that.$toast.success(that.$t("succTip.s4"));
                // that.getCoinOrderInfo();
                that.back();
              } else {
                that.$toast.fail(res.data.message);
              }
            })
            .catch(function(error) {

            });
        }

      },
      //取消订单
      cancelOrder() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/revocationOutMatch",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.payment.id,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(that.$t("succTip.s4"));
              that.back();
            } else {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);

            }
          })
          .catch(function(error) {

          });

      },
      //卖家确认放币
      affirmGat() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/confirmLoan",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.payment.id,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(that.$t("succTip.s4"));
              that.back();
            } else {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
            }
          })
          .catch(function(error) {

          });

      },
      //申诉
      complaint() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/complaint",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.payment.id,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(that.$t("succTip.s4"));
              that.back();
            } else {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
            }
          })
          .catch(function(error) {

          });

      },
      onCancel(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        // Toast(item.name);
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {

    .d_logo {
      width: 100%;
      height: 3.2rem;
      overflow: hidden;
      background: linear-gradient(to right, #0A9EEC 0%, #274FD8 100%);

      .top_tit {
        .van-nav-bar {
          width: 100%;
          background: none !important;
        }

        .van-icon-arrow-left:before {
          color: #fff !important;
        }

        .van-nav-bar .van-icon {
          color: #fff !important;
          font-size: 0.4rem !important;
        }

        .van-hairline--bottom::after {
          border: none !important;
        }

      }


      .top_head {
        padding: 0 4%;
        margin-top: 0.12rem;
        text-align: center;

        .mine_info {
          display: flex;
          align-items: center;

          .van-icon {
            width: 1rem;
            color: #fff !important;
            font-size: 0.88rem !important;
          }


          .m_phone {
            flex: 1;
            padding-left: 0.4rem;
            display: flex;
            justify-content: space-between;

            span {
              font-size: 0.4rem;
              color: #fff;
            }

            p {
              // padding: 0.08rem 0;
              font-size: 0.4rem;
              color: rgba(255, 255, 255, 1);
              font-family: PingFang SC;

              span {
                font-size: 0.4rem;
                color: #fff;
              }
            }
          }
        }

        .statis {
          width: 100%;
          margin-top: 0.22rem;
          font-size: 0.28rem;
          font-family: PingFang SC;
          color: rgba(255, 255, 255, 1);
          text-align: left;
        }

      }
    }

    .order_states {
      width: 100%;
      padding: 0.36rem 4%;
      background: rgba(98, 98, 98, 0.1);
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.22rem;

      p {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: PingFang SC;
        color: #fff;

        span {
          padding-top: 0.14rem;
          font-size: 0.24rem;
          color: #A7A7A7;
        }
      }
    }

    .content {
      width: 100%;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 4rem);
      margin-bottom: 1rem;
      background: #f5f5f5;

      .mine_info {
        height: 100%;
        margin-top: 0.2rem;
        overflow-y: scroll;
        background: #fff;
        padding: 0 4%;

        .copy_card {
          display: flex;
          position: relative;

          a {
            position: absolute;
            right: 0;
            font-size: 0.28rem;
            color: #274FD8;
            top: 0.28rem;
          }

          /deep/ .van-cell__value {
            flex: 2;
            padding-right: 0.8rem;
          }

        }

        .payment_img {

          // display: flex;
          span {
            display: block;
            padding: 0.24rem 0;
            font-size: 0.3rem;
            color: #333;
          }

          img {
            width: 100%;
            height: 2.6rem;
            border: 1px solid #f5f5f5;
          }

        }

        .coin_img {
          padding: 0.2rem 0;

          span {
            display: inline-block;
            font-size: 0.28rem;
            padding: 0.16rem 0;
          }

          .code_img {
            width: 6.88rem;
            text-align: center;
            // padding: 0.1rem 0;
            height: 3.8rem;
            line-height: 3.8rem;

            border: 1px solid #f5f5f5;

            .wx_img {
              display: inline-block;
              width: 100%;
              height: 100%;
            }

            /deep/ .van-uploader__upload {
              width: 6.88rem !important;
              height: 3.8rem !important;
              background: none !important;
              // border: 1px solid rgba(0, 0, 0, 0.06) !important;
              border: none;
            }

            /deep/ .van-uploader__preview-image {
              width: 6.8rem !important;
              height: 3.6rem !important;
            }

            /deep/ .van-uploader__upload-icon {
              font-size: 0.8rem !important;
              // font-weight: bold !important;
              color: #B2BCD9 !important;
            }
          }
        }

        h5 {
          color: #D14B64;
          font-size: 0.26rem;
          padding: 0.26rem 0;
          text-align: center;
        }

        p.pay_code {
          span {
            display: block;
            padding: 0.22rem 0;
            font-size: 0.28rem;
            color: #fff;
          }

          img {
            margin-left: 34%;
            width: 2.6rem;
            height: 2.6rem;
          }
        }

        /deep/ .van-cell {
          padding: 0.22rem 0 !important;
          font-size: 0.28rem;
          font-weight: 400;
          background: none !important;
          color: #333 !important;
        }

        /deep/ .van-cell__value {
          flex: 2;
        }

        .van-hairline--top-bottom::after {
          // border-width: 0;
        }

        /deep/ .van-cell:not(:last-child)::after {
          border-bottom: none;
        }
      }
    }

    .data_btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.88rem;
      display: flex;
      justify-content: space-between;

      span {
        display: inline-block;
        width: 50%;
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.30rem;
        font-family: PingFang SC;
        color: rgba(255, 255, 255, 1);
      }

      span:nth-child(1) {
        background: #274FD8;
      }

      span:nth-child(2) {
        background: #35A8FB;
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
