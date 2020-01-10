<template>
  <div class="public">
    <van-nav-bar :title="$t('coin.mention.tit')" left-text="" :right-text="$t('coin.mention.tit2')" @click-right="goMenRecord"
      left-arrow @click-left="back" />
    <div class="content">
      <div class="head_char">
        <p><span>{{$t('coin.mention.ass.a1')}}{{coinData.symbol}}</span><span>{{coinData.balance}}</span></p>
        <p><span>{{$t('coin.mention.ass.a2')}}{{coinData.symbol}}</span><span>{{coinData.frozen}}</span></p>
        <p><span>{{$t('coin.mention.ass.a3')}}</span><span>{{coinData.balance}}</span></p>
      </div>
      <div class="coin_info">
        <van-collapse v-model="activeNames">
          <van-collapse-item name="1">
            <div slot="title">{{$t('coin.mention.oper.o1')}}  {{curCoin}}</div>
            <div class="stan_info">
              <span :class="deIndex == index ? 'active_span':''" v-for="(item,index) in allCoin" :key="index" @click="designate(item,index)">{{item.symbol}}</span>
            </div>
          </van-collapse-item>
        </van-collapse>
        <div class="log_pwd">
          <van-field :label="$t('coin.mention.oper.o2')" v-model="number" :placeholder="$t('coin.mention.tip.t1')" />
          <a @click="allData">{{$t('coin.mention.btn1')}}</a>
        </div>
        <div class="fee">
          <span>{{$t('coin.mention.oper.o3')}}</span>
          <span>{{coinData.fee}}</span>
        </div>
        <!-- <div class="coin_add">
          <span>地址类型</span>
          <van-radio-group v-model="consignee">
            <van-radio name="1" checked-color="#07c160">CGS账户地址</van-radio>
            <van-radio name="2" checked-color="#07c160">外部USDT地址</van-radio>
          </van-radio-group>
        </div> -->
        <div class="coin_add">
          <span>{{$t('coin.mention.oper.o4')}}</span>
          <p><van-field type="text"  v-model="address"  :placeholder="$t('coin.mention.tip.t2')" /></p>
        </div>
        <div class="log_pwd">
          <van-field :label="$t('coin.mention.oper.o6')" v-model="phoneCode"  :placeholder="$t('coin.mention.tip.t3')" />
          <a @click="sendPhoneCode">{{codeMsg}}</a>
        </div>
        <div class="log_pwd">
          <van-field :label="$t('coin.mention.oper.o7')" v-model="emailCode"  :placeholder="$t('coin.mention.tip.t4')" />
          <a @click="sendEmailCode">{{codeEmail}}</a>
        </div>
        <div class="log_pwd">
          <van-field type="password" :label="$t('coin.mention.oper.o8')" v-model="tradersPassword"  :placeholder="$t('coin.mention.tip.t5')" />
        </div>

      </div>
      <van-button type="primary" @click="withdrawal" size="large">{{$t('coin.mention.btn3')}}</van-button>
    </div>
      <!-- 未绑定手机号弹窗 -->
      <x-dialog v-model="bind_dlg " class="de_dialog ver_dialog" hide-on-blur>
       <div class="dialog">
         <span class="iconfont icon-tabguanbi" @click="closebind"></span>
         <h3>{{$t('tip.t1')}}</h3>
         <p>{{$t('tip.t2')}}！</p>
         <div class="dia_btn">
           <span @click="closebind">{{$t('cel')}}</span>
           <span @click="goBind">{{$t('bind')}}</span>
         </div>
       </div>
     </x-dialog>
      <!-- 未绑定邮箱弹窗 -->
      <x-dialog v-model="email_dlg " class="de_dialog ver_dialog" hide-on-blur>
       <div class="dialog">
         <span class="iconfont icon-tabguanbi" @click="closeEmail"></span>
         <h3>{{$t('tip.t1')}}</h3>
         <p>{{$t('tip.t2')}}！</p>
         <div class="dia_btn">
           <span @click="closeEmail">{{$t('cel')}}</span>
           <span @click="goEmail">{{$t('bind')}}</span>
         </div>
       </div>
     </x-dialog>
      <!-- 未设置密码 -->
      <x-dialog v-model="pass_dlg " class="de_dialog ver_dialog" hide-on-blur>
       <div class="dialog">
         <span class="iconfont icon-tabguanbi" @click="closePass"></span>
         <h3>{{$t('tip.t4')}}</h3>
         <p>{{$t('tip.t3')}}！</p>
         <div class="dia_btn">
           <span @click="closePass">{{$t('cel')}}</span>
           <span @click="goPass">{{$t('set')}}</span>
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
        bind_dlg:false,//绑定手机号
        email_dlg:false,//绑定邮箱
        pass_dlg:false,//设置密码
        coinData:'',//账户币信息
        activeNames: ['1'],
        allCoin: [], //币种信息
        curCoin: "", //当前币种
        deIndex: '',//当前币种index
        tranIndex:0,
        number:"",//提现数量
        address:"",//地址
        coinAdd: '', //当前币地址
        phoneCode:"",//短信验证码
        emailCode:"",//邮箱验证码
        tradersPassword:"",//交易密码
        phone:this.$store.state.user_data.phone,//手机号
        email:this.$store.state.user_data.email,
        isPass : this.$store.state.user_data.traders_password,
        codeMsg: this.$t('reg.code'),//获取短信验证码
        codeEmail:this.$t('reg.code'),//获取邮箱验证码
        time:60,//倒计时时间
        timePhone:60, //


      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getAllCoin();
      that.getUserAssets();
      console.log(that.$store.state.user_data)
    },
    methods: {
      back() {
        this.$router.back();
      },
       //选定币种
      designate(item, i) {
        let that = this;
        that.deIndex = i;
        that.curCoin = item.symbol;
        that.coinAdd = item.address;
        that.getUserAssets();
      },
      //去绑定手机号
      goBind(){
        let that = this;
         that.$router.push({
          path: '/bindingPhone',
        })
      },
       //去绑定邮箱
      goEmail(){
        let that = this;
         that.$router.push({
          path: '/bindingEmail',
        })
      },
        //去设置密码
      goPass(){
        let that = this;
         that.$router.push({
          path: '/moneyPass',
        })
      },
      //点击获取全部提现数量
      allData(){
        let that = this;
        that.number = that.coinData.balance;
      },
      //关闭密码弹窗
      closePass(){
        let that = this;
        that.pass_dlg =  false;
      },
       //提现
      withdrawal() {
        let that = this;
        let number = that.number;
        let wallet = that.wallet;
        let symbol = that.curCoin;
        let address = that.address;
        let phoneCode = that.phoneCode;
        let emailCode = that.emailCode;
        let tradersPassword = that.tradersPassword;
        if(that.isPass !== 1){
          that.pass_dlg = true;
          return;
        }
        if (!number || number == null) {
          that.$toast(that.$t('coin.mention.tip.t1'));
        } else if (!address || address == null) {
          that.$toast(that.$t('coin.mention.tip.t2'));
        } else if (!phoneCode || phoneCode == null) {
          that.$toast(that.$t('coin.mention.tip.t3'));
        } else if (!emailCode || emailCode == null) {
          that.$toast(that.$t('coin.mention.tip.t4'));
        } else if (!tradersPassword || tradersPassword == null) {
          that.$toast(that.$t('coin.mention.tip.t5'));
        } else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http({
              url: "/withdrawal",
              method: "post",
              data: {
                // token: window.localStorage.getItem("token"),
                number: number,
                address: address,
                symbol: symbol,
                sms_code: phoneCode,
                email_code: emailCode,
                tradersPassword:tradersPassword
              }
            }).then(function(res) {
              if (res.data.status == 1) {
                that.$vux.loading.hide();
                 that.$toast.success(that.$t("succTip.s8"));
                that.back();
              }else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
              } else {
                that.$vux.loading.hide();
                that.$toast.fail(res.data.message);
              }
            })
            .catch(function(err) {});
        }
      },
     //获取提币资产信息
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
              type: '0',
              symbol:that.curCoin,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.coinData = res.data.data[0];
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
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
              // that.coinAdd = that.allCoin[0].address;
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
      },
       //	发送短信验证码
      sendPhoneCode() {
        let that = this;
        var phone = that.phone;
        if (!phone || phone == '') {
          that.bind_dlg = true;
        }  else {
          if (that.codeMsg != that.$t('reg.code') && that.codeMsg != that.$t('reg.resend')) return;
          var timePhone = that.timePhone;
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/phoneCode", {
              phone: phone,
              type: 10
            })
            .then(function(res) {
              // console.log(res.data.code)
              if (res.data.status == 1) {
                var msg = "验证码发送成功";
                var msgTex = res.data.message;
                that.phoneCode = msgTex.replace(msg,"");
                that.$vux.loading.hide();
                that.$toast.success(that.$t("reg.succ"));
                var interval = setInterval(function() {
                  timePhone--;
                  that.codeMsg = timePhone + "s";
                  if (timePhone <= 0) {
                    clearInterval(interval);
                     that.codeMsg = that.$t("reg.resend");
                  }
                }, 1000);
              } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
              }else {
                that.$vux.loading.hide();
                that.$toast(res.data.message);
              }
            })
            .catch(function(err) {});
        }
      },
      closebind(){
        let that = this;
        that.bind_dlg =  false;
      },
        //	发送邮箱验证码
      sendEmailCode() {
        let that = this;
        var email = that.email;
        if (!email || email == null) {
          that.$toast(that.$t('safe.phone.p1'));
        } else {
          if (that.codeEmail != that.$t('reg.code') && that.codeEmail != that.$t('reg.resend')) return;
          var time = that.time;
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/sendEmail", {
              email: email,
              type: 10
            })
            .then(function(res) {
              // console.log(res.data.code)
              if (res.data.status == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("reg.succ"));
                var interval = setInterval(function() {
                  time--;
                  that.codeEmail = time + "s";
                  if (time <= 0) {
                    clearInterval(interval);
                     that.codeEmail = that.$t("reg.resend");
                  }
                }, 1000);
              } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
              }else {
                that.$vux.loading.hide();
                that.$toast(res.data.message);
              }
            })
            .catch(function(err) {});
        }
      },
      closeEmail(){
        let that = this;
        that.email_dlg =  false;
      },
      //提币记录
      goMenRecord() {
        let that = this;
        that.$router.push({
          path: '/mentionRecord',
        })
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
        padding: 0.2rem 4%;
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
          position: relative;
          margin: 0;
          margin-top: 0.12rem;

          /deep/ .van-cell {
            border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
            padding: 0.32rem 0 0.08rem 0 !important;
          }

          a {
            position: absolute;
            color: #1372D8;
            right: 0.14rem;
            top: 0.38rem;
            font-size: 0.28rem;
          }
        }

        .fee {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 0.26rem 0;

          span {
            font-size: 0.28rem;
          }
        }

        .coin_add {
          span {
            font-size: 0.28rem;
          }
       /deep/ .van-field--min-height .van-field__control{
            min-height: 0.2rem !important;

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
          }
        }

      }

    }
     .van-button--large {
       margin-bottom: 0.6rem;
     }
        .ver_dialog {
      position: relative;

      span.iconfont {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.2rem;
      }

      h3 {
        padding: 0.2rem 0;
        font-size: 0.32rem;
        color: #2B2B2B;
      }
      p{
        font-size: 0.28rem;
        color: #555;
        padding: 0.6rem;
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
