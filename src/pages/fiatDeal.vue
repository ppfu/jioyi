<template>
  <div class="public">
    <van-nav-bar title="" left-text="" left-arrow @click-left="back">
      <span class="iconfont icon-tabjilu" @click="goDeallist" slot="right"></span>
    </van-nav-bar>
    <div class="content">
      <van-tabs v-model="active" @click="navTap(active)">
        <van-tab :title="$t('legal.tab.t1')">
          <div class="account">
            <div class="acc_list">
              <div class="acc_con">
                <button-tab v-model="coinType">
                  <button-tab-item @click.native="navCoinTap(0)" selected>USDT</button-tab-item>
                  <button-tab-item @click.native="navCoinTap(1)">BTC</button-tab-item>
                  <button-tab-item @click.native="navCoinTap(2)">ETH</button-tab-item>
                </button-tab>
                <div v-if="coinType == 0" class="acc_top">
                  <p><span>{{$t('legal.use')}}</span><span>{{outSymbol.balance}}</span></p>
                  <p><span>{{$t('legal.freeze')}}</span><span>{{outSymbol.frozen}}</span></p>
                </div>
                <div v-if="coinType == 1" class="acc_top">
                  <p><span>{{$t('legal.use')}}</span><span>{{outSymbol.balance}}</span></p>
                  <p><span>{{$t('legal.freeze')}}</span><span>{{outSymbol.frozen}}</span></p>
                </div>
                <div v-if="coinType == 2" class="acc_top">
                  <p><span>{{$t('legal.use')}}</span><span>{{outSymbol.balance}}</span></p>
                  <p><span>{{$t('legal.freeze')}}</span><span>{{outSymbol.frozen}}</span></p>
                </div>
              </div>

            </div>
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="user_list" v-for="(item,index) in entList" :key="index">
                    <div class="user_left">
                      <span>{{item.username}}</span>
                      <h4>{{$t('legal.num')}}：{{item.surplus}}</h4>
                      <h4>{{$t('legal.quota')}}：¥{{item.min_amount}}-¥{{item.max_amount}}</h4>
                      <p>
                      <img v-if="item.payType.ali_pay == 1" src="../assets/img/zfb.png">
                      <img v-if="item.payType.bank == 1" src="../assets/img/bank1.png">
                      <img v-if="item.payType.we_chat == 1" src="../assets/img/wei.png">
                      </p>
                    </div>
                    <div class="user_right">
                      <span class="cyn">¥{{item.price}}</span>
                      <van-button type="primary" @click="goBuy(item)" size="small" color="#0AB480">{{$t('legal.btn')}}</van-button>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>


            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('legal.tab.t2')">
          <div class="account">
            <div class="acc_list">
              <div class="acc_con">
                <button-tab v-model="coinType">
                  <button-tab-item @click.native="navCoinTap(0)" selected>USDT</button-tab-item>
                  <button-tab-item @click.native="navCoinTap(1)">BTC</button-tab-item>
                  <button-tab-item @click.native="navCoinTap(2)">ETH</button-tab-item>
                </button-tab>
                <div v-if="coinType == 0" class="acc_top">
                  <p><span>{{$t('legal.use')}}</span><span>{{outSymbol.balance}}</span></p>
                  <p><span>{{$t('legal.freeze')}}</span><span>{{outSymbol.frozen}}</span></p>
                </div>
                <div v-if="coinType == 1" class="acc_top">
                  <p><span>{{$t('legal.use')}}</span><span>{{outSymbol.balance}}</span></p>
                  <p><span>{{$t('legal.freeze')}}</span><span>{{outSymbol.frozen}}</span></p>
                </div>
                <div v-if="coinType == 2" class="acc_top">
                  <p><span>{{$t('legal.use')}}</span><span>{{outSymbol.balance}}</span></p>
                  <p><span>{{$t('legal.freeze')}}</span><span>{{outSymbol.frozen}}</span></p>
                </div>
              </div>

            </div>
            <div class="scroll_div">
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                :loading-text="$t('ing')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                  @load="onLoad">
                  <div class="user_list" v-for="(item,index) in entList" :key="index">
                    <div class="user_left">
                      <span>{{item.username}}</span>
                      <h4>{{$t('legal.num')}}:{{item.surplus}}</h4>
                      <h4>{{$t('legal.quota')}}：¥{{item.min_amount}}-¥{{item.max_amount}}</h4>
                      <p>
                      <img v-if="item.payType.ali_pay == 1" src="../assets/img/zfb.png">
                      <img v-if="item.payType.bank == 1" src="../assets/img/bank1.png">
                      <img v-if="item.payType.we_chat == 1" src="../assets/img/wei.png">
                      </p>
                    </div>
                    <div class="user_right  user_right2">
                      <span class="cyn">¥{{item.price}}</span>
                      <van-button type="primary" size="small" color="#E12961" @click="goBuy(item)">{{$t('legal.sell')}}</van-button>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>

            <!-- <div no></div> -->
          </div>
        </van-tab>
        <van-tab :title="$t('legal.tab.t3')">
          <div class="account">
            <div class="acc_list">
              <div class="acc_con">
                <button-tab v-model="coinType">
                  <button-tab-item @click.native="navCoinTap(0)" selected>USDT</button-tab-item>
                  <button-tab-item @click.native="navCoinTap(1)">BTC</button-tab-item>
                  <button-tab-item @click.native="navCoinTap(2)">ETH</button-tab-item>
                </button-tab>
                <div v-if="coinType == 0" class="acc_top">
                  <p><span>{{$t('legal.use')}}</span><span>{{outSymbol.balance}}</span></p>
                  <p><span>{{$t('legal.freeze')}}</span><span>{{outSymbol.frozen}}</span></p>
                </div>
                <div v-if="coinType == 1" class="acc_top">
                  <p><span>{{$t('legal.use')}}</span><span>{{outSymbol.balance}}</span></p>
                  <p><span>{{$t('legal.freeze')}}</span><span>{{outSymbol.frozen}}</span></p>
                </div>
                <div v-if="coinType == 2" class="acc_top">
                  <p><span>{{$t('legal.use')}}</span><span>{{outSymbol.balance}}</span></p>
                  <p><span>{{$t('legal.freeze')}}</span><span>{{outSymbol.frozen}}</span></p>
                </div>
              </div>

            </div>
            <div class="issue">
              <van-tabs v-model="dealType" @click="navDealType(active)">
                <van-tab :title="$t('legal.btn') + symbol">
                  <div class="deal_input">
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a1')}}</span>
                      <van-field type="number" v-model="price" clearable :placeholder="$t('legal.issue.tip.t1')" />
                    </div>
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a2')}}{{symbol}}</span>
                      <van-field type="number" v-model="number" clearable :placeholder="$t('legal.issue.tip.t2')" />
                    </div>
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a3')}}</span>
                      <van-field type="number" v-model="min_amount" clearable :placeholder="$t('legal.issue.tip.t3')" />
                    </div>
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a4')}}</span>
                      <van-field type="number" v-model="max_amount" clearable :placeholder="$t('legal.issue.tip.t4')" />
                    </div>
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a5')}}</span>
                      <van-field type="password" v-model="pay_pwd" clearable :placeholder="$t('legal.issue.tip.t5')" />
                    </div>
                    <van-button type="primary" size="large" @click="publish">确认</van-button>
                  </div>
                </van-tab>
                <van-tab :title="$t('legal.sell') + symbol">
                  <div class="deal_input">
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a1')}}</span>
                      <van-field type="number" v-model="price" clearable :placeholder="$t('legal.issue.tip.t1')" />
                    </div>
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a2')}}{{symbol}}</span>
                      <van-field type="number" v-model="number" clearable :placeholder="$t('legal.issue.tip.t2')" />
                    </div>
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a3')}}</span>
                      <van-field type="number" v-model="min_amount" clearable :placeholder="$t('legal.issue.tip.t3')" />
                    </div>
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a4')}}</span>
                      <van-field type="number" v-model="max_amount" clearable :placeholder="$t('legal.issue.tip.t4')" />
                    </div>
                    <div class="input_info">
                      <span>{{$t('legal.issue.lab.a5')}}</span>
                      <van-field type="password" v-model="pay_pwd" clearable :placeholder="$t('legal.issue.tip.t5')" />
                    </div>
                    <van-button type="primary" size="large" @click="publish">确认</van-button>
                  </div>
                </van-tab>
              </van-tabs>
            </div>
            <!-- <div no></div> -->
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 交易-->
    <van-popup v-model="buyShow" position="bottom" :style="{ height: '42%' }">
      <div class="shift">
        <!-- <h4 v-if="dealType == 0">购买{{buy_info.coin_name}} <span>单价{{buy_info.price}}CYN</span></h4>
          <h4 v-if="dealType == 1">出售{{buy_info.coin_name}} <span>单价{{buy_info.price}}CYN</span></h4> -->
        <h4 v-if="active == 0">{{$t('legal.btn')}}</h4>
        <h4 v-if="active == 1">{{$t('legal.sell')}}</h4>
        <div class="shift-info">
          <div class="pr_input">
            <span>{{$t('legal.tip.t1')}}(￥)</span>
            <van-field v-model="buy_info.price" @input="OnInputPrice($event)" clearable disabled placeholder="" />
          </div>
          <div class="pr_input">
            <span>{{$t('legal.tip.t2')}}{{symbol}}</span>
            <van-field v-model="deal_number" type="number" @input="OnInputNum($event)" clearable :placeholder="$t('legal.tip.t5')" />
          </div>
          <p><span>{{$t('legal.tip.t6')}}(￥)</span><span>{{total_price}}</span></p>
        </div>

      </div>
      <div class="shift_btn">
        <span @click="toOrders">{{$t('legal.btn3')}}</span>
        <span @click="closeDeal">{{$t('legal.btn2')}}</span>
      </div>
    </van-popup>
    <!-- 密码框-->
    <x-dialog v-model="pass_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closePass"></span>
        <h3>{{$t('dpass')}}</h3>
        <h4>{{$t('legal.tip.t7')}}：<a>{{total_price}}</a></h4>
        <input type="password" v-model="deal_pwd" :placeholder="$t('tip.t6')" />
        <div class="dia_btn">
          <span @click="closePass">{{$t('cel')}}</span>
          <span @click="subIssue">{{$t('affirm')}}</span>
        </div>
      </div>
    </x-dialog>
    <!-- 未实名认证弹窗 -->
    <x-dialog v-model="auto_dlg " class="de_dialog auto_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeAuto"></span>
        <h3></h3>
        <p v-if="certified == 0 || certified == 3"><img src="../assets/img/no_auto.png"><span>{{$t('tip.t7')}}！</span></p>
        <p v-if="certified == 1"><img src="../assets/img/no_auto.png"><span>{{$t('tip.t8')}}！</span></p>
        <!-- <p v-if="certified == 1">{{$t('tip.t8')}}！</p> -->
        <div class="dia_btn">
          <span @click="goAuto">{{$t('auth')}}</span>
        </div>
      </div>
    </x-dialog>
    <!-- 去充值弹窗 -->
    <x-dialog v-model="charge_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeCharge"></span>
        <h3>{{$t('tip.t4')}}</h3>
        <p>{{symbol}}{{$t('tip.t5')}}！</p>
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
    XDialog,
    ButtonTab,
    ButtonTabItem,
  } from "vux";
  export default {
    data() {
      return {
        show: false,
        buyShow: false,
        auto_dlg: false,
        charge_dlg: false,
        buy_info: {},
        pass_dlg: false, //密码弹窗
        active: 0,
        coinType: 0,
        dealType: 0,
        num: 5,
        deal_number: "", //匹配订单数量
        orderList: [], //我的交易页面信息
        symbol: "", //币名
        outSymbol: {},
        entList: [], //买卖列表
        // entList: [], //充值列表
        entTotal: '', //总数
        pageindex: 1, //邀请记录默认第一页
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
        pay_pwd: "", //发布密码
        deal_pwd: "", //买入卖出密码
        price: "", //交易价格
        number: "", //交易数量
        min_amount: "", //最低交易金额
        max_amount: "", //最高交易金额
        total_price: 0, //交易总金额
        certified: '',
      }
    },
    components: {
      XDialog,
      ButtonTab,
      ButtonTabItem,
    },
    mounted() {
      let that = this;
      that.getOutSymbolAccount();
      that.getEntrustList(0);
      that.getStatus();
    },
    methods: {
      back() {
        this.$router.back();
      },
      //关闭去充值弹窗
      closeCharge() {
        let that = this;
        that.charge_dlg = false;
      },
      //去充值
      goCharge() {
        let that = this;
        that.$router.push({
          path: '/chargeMoney',
        })
      },
      //发布
      publish() {
        let that = this;
        if (that.certified !== 2) {
          that.auto_dlg = true;
          return;
        }
        let number = that.number;
        let price = that.price;
        let symbol = that.symbol;
        let min_amount = that.min_amount;
        let max_amount = that.max_amount;
        if (!price || price == null) {
          that.$toast(that.$t('legal.issue.tip.t1'));
        } else if (!number || number == null) {
          that.$toast(that.$t('legal.issue.tip.t2'));
        } else if (!min_amount || min_amount == null) {
          that.$toast(that.$t('legal.issue.tip.t3'));
        } else if (!max_amount || max_amount == null) {
          that.$toast(that.$t('legal.issue.tip.t4'));
        } else if (!that.pay_pwd || that.pay_pwd == null) {
          that.$toast(that.$t('legal.issue.tip.t5'));
        } else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http({
              url: "/outsideTrade",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                price: price,
                number: number,
                symbol: symbol,
                direction: that.dealType,
                tradersPassword: that.pay_pwd,
                min_amount: min_amount,
                max_amount: max_amount,
              }
            }).then(function(res) {
              if (res.data.status == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.s4"));
                // that.back();
                price = "";
                number = "";
                min_amount = "";
                max_amount = "";
                that.pay_pwd = "";
              }else if(res.data.status == -1) {
              that.$vux.loading.hide();
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
      cancel() {
        let that = this;
        that.tran_dlg = true;
      },
      //购买，出售
      goBuy(item) {
        let that = this;
        if (that.certified !== 2) {
          that.auto_dlg = true;
        } else if (that.outSymbol.balance == 0 && that.active == 1) {
          that.charge_dlg = true;
        } else {
          that.buyShow = true;
          that.buy_info = item;
        }
      },
      //订单详情
      goDetailOrder(id) {
        let that = this;
        that.$store.state.payment.deal_id = id;
        that.$router.push({
          path: '/payment',
        })
      },
      goDeallist() {
        let that = this;
        that.$store.state.symbol = that.symbol;
        that.$store.state.buy_info = that.buy_info;
        that.$router.push({
          path: '/tradRecord',
        })
      },
      //关闭实名认证弹窗
      closeAuto() {
        let that = this;
        that.auto_dlg = false;
      },
      //去实名
      goAuto() {
        let that = this;
        that.$router.push({
          path: '/accountAuth',
        })
      },
      //关闭密码弹窗
      closePass() {
        let that = this;
        that.pass_dlg = false;
      },
      //关闭交易弹窗
      closeDeal() {
        let that = this;
        that.buyShow = false;
      },
      //关闭密码弹窗
      closePass() {
        let that = this;
        that.pass_dlg = false;
      },
      toOrders() {
        let that = this;
        let deal_number = that.deal_number;
        if (!deal_number || deal_number == null) {
          that.$toast(that.$t('legal.tip.t5'));
        } else {
          that.buyShow = false;
          that.pass_dlg = true;
        }
      },
      //  //监听input输入
      // OnInputPrice(e) {
      //   let that = this;
      //   that.price = Number(e);
      //   that.total_price = that.price * that.number;
      // },
      //监听input输入
      OnInputNum(e) {
        let that = this;
        that.deal_number = Number(e);
        that.total_price = Number(that.buy_info.price) * that.deal_number;
      },
      //买入卖出下单
      subIssue() {
        let that = this;
        let deal_number = that.deal_number;
        that.$vux.loading.show({
          text: ""
        });
        that.$http({
            url: "/tradeOutEntrust",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              number: deal_number,
              id: that.buy_info.id,
              tradersPassword: that.deal_pwd,
            }
          }).then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(that.$t("succTip.s4"));
              that.deal_number = "";
              that.onRefresh();
            } else if(res.data.status == -1) {
              that.$vux.loading.hide();
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
      navCoinTap(i) {
        let that = this;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.entList = [];
        that.getOutSymbolAccount();
        that.getEntrustList(0);
      },
      navDealType(i) {
        let that = this;
        // that.getEntrustList(0);
      },

      //场外币种资金查询
      getOutSymbolAccount() {
        let that = this;
        var l_type = (that.coinType).toString()
        that.symbol = l_type == "0" ? "USDT" : l_type == "1" ? "BTC" : "ETH";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/getOutSymbolAccount",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              symbol: that.symbol,

            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.outSymbol = res.data.data;

            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {
            // that.$toast(error);
          });
      },
      //点击记录类别获取数据
      navTap(i) {
        let that = this;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.entList = [];
        if (i == 0 || i == 1) {
          that.getEntrustList(0);
        }
      },
      //下拉刷新
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.entList = [];
        that.entTotal = 0;
        that.getEntrustList(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex++;
        that.moreloading = true;
        that.getEntrustList(1);
      },
      //获取买卖委托列表
      getEntrustList(t) {
        let that = this;
        var l_type = (that.active).toString()
        that.dealType = l_type == "0" ? "1" : "0";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/entrustList",
            method: "post",
            data: {
              // token: window.localStorage.getItem("token"),
              page: that.pageindex,
              size: 4,
              direction: that.dealType,
              symbol: that.symbol,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              if (t == 0) {
                if (res.data.data.list.length > 0) {
                  that.entList = res.data.data.list;
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
      //取消挂单
      cancelEntry(id) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Trade/setCoinTradeCancel",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.$toast.success("取消成功");
              that.getMyTradeOrderList();
            } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$router.push({
                path: '/login'
              })
            }else {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      },
      //确认收款
      affirmGat(id) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "Trade/setCoinOrderDone",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.loading.hide();
              that.$toast.success("已确认");
              that.getMyTradeOrderList();
            } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$router.push({
                path: '/login'
              })
            }else {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.msg);
            }
          })
          .catch(function(error) {

          });

      }

    }
  }
</script>

<style lang="less" scoped>
  .public {
    span.iconfont {
      color: #333;
      font-size: 0.34rem
    }

    .content {
      width: 100%;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 1.4rem);
      background: #f5f5f5;

      /deep/ .van-tabs__nav {
        // background: rgba(98, 98, 98, 0.1) !important;
        font-family: PingFang SC;
      }


      .account {
        width: 100%;
        padding: 0.2rem 4%;

        // margin-top: 0.22rem;
        .acc_list {
          padding: 0.16rem 4%;
          // margin: 0.2rem 0;
          background: linear-gradient(to right, #0A9EEC 0%, #274FD8 100%);
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;
          font-family: PingFang SC;

          .acc_con {

            // display: flex;
            // justify-content: space-between;
            .vux-button-group {
              width: 100% !important;
              height: 0.66rem !important;

            }

            .vux-button-group>a.vux-button-group-current {
              color: #333;
              font-size: 0.3rem;
              background: #fff;
            }

            .vux-button-group>a.vux-button-tab-item-last:after,
            .vux-button-group>a.vux-button-tab-item-middle:after,
            .vux-button-group>a.vux-button-tab-item-first:after {
              border: none;
              border-radius: 2rem !important;

            }

            .vux-button-group>a {
              height: 0.62rem !important;
              line-height: 0.62rem !important;
              border-radius: 2rem !important;
              margin-right: 0.06rem !important;
              font-size: 0.24rem;
              background: none;
              color: #fff;
            }

            .acc_top {
              width: 100%;
              font-family: PingFang SC;
              display: flex;
              justify-content: space-around;
              padding-top: 0.4rem;


              p {
                width: 100%;
                display: flex;
                flex-direction: column;
                color: #fff;
                text-align: center;
                font-family: PingFang SC;

                span:nth-child(1) {
                  font-size: 0.28rem;
                }

                span:nth-child(2) {
                  font-size: 0.4rem;
                  padding: 0.08rem 0;
                }

                span:nth-child(3) {
                  font-size: 0.26rem;
                  // padding: 0.12rem 0;
                }
              }
            }
          }

          .acc_btn {
            width: 100%;
            padding-bottom: 0.2rem;
            text-align: right;

            .van-button--primary {
              border-radius: 2rem !important;
            }
          }

        }

        .issue {
          width: 100%;
          background: #fff;
          border-radius: 0.08rem;
          padding: 0.2rem 0;

          .deal_input {
            padding: 0.32rem;
            /deep/ .van-cell {
              padding: 0.12rem !important;
              border: 1px solid rgba(0, 0, 0, 0.06);
            }

            /deep/ .van-cell:not(:last-child)::after {
              border: none;
            }
            .input_info{
              padding:0.12rem 0;
              width:100%;
              display:flex;
              justify-content: space-between;
              align-items: center;
              span{
                width:4.4rem;
                display:block;
                font-size:0.26rem;
              }
            }
          }

          .van-button--large {
            margin: 0.4rem 0;
          }
        }

        .user_list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.32rem 0.2rem;
          // border-bottom: 1px solid #1F244F;
          background: #fff;
          border-radius: 0.08rem;

          .user_left {
            p {
              display: flex;
              align-items: center;
              padding-bottom: 0.12rem;

              span {
                padding-right: 0.14rem;
                font-size: 0.28rem;
                color: #333;
              }

              img {
                width: 0.32rem;
                height: 0.32rem;
                margin-right: 0.08rem;
              }
            }

            h4 {
              font-size: 0.26rem;
              color: #666;
              padding: 0.06rem 0;
            }

            .van-button::before {
              background: #0A9EEC;
            }
          }

          .user_right {
            display: flex;
            flex-direction: column;
            align-items: center;

            span.cyn {
              font-size: 0.32rem;
              color: #333;
              padding-bottom: 0.16rem;
            }

            .van-button--primary {
              width: 1.4rem;
              background: #0AB480 !important;
              border-radius: 2rem !important;
              font-size: 0.26rem !important;
            }
          }

          .user_right2 {
            .van-button--primary {
              width: 1.4rem;
              background: #E12961 !important;
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


    .van-popup {
      border-radius: 0.2rem 0.2rem 0 0;

      .shift {
        width: 100%;
        height: auto;
        padding: 0 4%;
        font-family: PingFang SC;

        h4 {
          font-size: 0.3rem;
          font-family: PingFang SC;
          font-weight: bold;
          text-align:center;
          color: #000;
          padding: 0.26rem 0;
          // border-bottom: 1px solid rgba(0, 0, 0, 0.12);

          span {
            font-size: 0.24rem;
            color: rgba(167, 167, 167, 1);
          }
        }

        .shift-info {
          margin-top: 0.2rem;
          color: #B3B3B3;
          font-size: 0.26rem;
          width: 90%;
          margin: 0 auto;
          margin-top: 0.4rem;

          .pr_input {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 0.24rem;

            span {
              display: block;
              width: 2.4rem;
              color: #333;
              font-size: 0.28rem;
            }

            /deep/ .van-cell {
              border: 1px solid rgba(0, 0, 0, 0.12);
              padding: 0.16rem 0.16rem !important;
              border-radius: 0.08rem;
            }
          }

          p {
            display: flex;
            justify-content: space-between;
            font-size: 0.28rem;
            // padding: 0.12rem 0;
            color: #333;
          }

        }

      }

      .shift_btn {
        // position: fixed;
        // bottom: 0.32rem;
        margin-top: 0.4rem;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        span {
          width: 42%;
          text-align: center;
          font-size: 0.3rem;
          border-radius:2rem;

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
</style>
