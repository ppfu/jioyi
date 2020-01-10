<template>
  <div class="public">
    <van-nav-bar :title="symbol +'/' + area">
      <span @click="showLeft" class="iconfont icon-tabjilu" slot="left"></span>
    </van-nav-bar>
    <div class="content">
      <div class="deal_content">
        <!-- 左侧交易 -->
        <div class="deal_left">

          <button-tab v-model="type2">
            <button-tab-item @click.native="navTap(0)" selected>{{$t('coinTran.left.e1')}}</button-tab-item>
            <button-tab-item @click.native="navTap(1)">{{$t('coinTran.left.e2')}}</button-tab-item>
          </button-tab>
          <!-- 买入 -->
          <div v-if="type2==0">
            <!-- <van-radio-group v-model="consignee">
              <van-radio name="1" checked-color="#07c160">限价</van-radio>
              <van-radio name="2" checked-color="#07c160">市价</van-radio>
            </van-radio-group> -->
            <div class="pr_type">
              <p @click="showPriceType()"><span>{{priceType}}</span><span class="iconfont icon-tabDown_arrow"></span></p>
            </div>
            <div class="deal_form">
              <!-- 限价 （可修改价格）-->
              <div class="form_mun">
                <div class="form_list" v-if="categoryIndex == 0">
                  <!-- <x-number :fillable="true" v-model="price_d" :min="0"  :step="0.5" @on-change="change"></x-number> -->
                  <van-stepper min="0" v-model="price" @change="onChange" />
                </div>
                <div class="form_list form_list2" v-if="categoryIndex == 1">
                  <!-- <x-number :fillable="true" v-model="price_d" :min="0"  :step="0.5" @on-change="change"></x-number> -->
                  <van-stepper min="0" v-model="coinInfo.price"   disabled/>
                  <!-- <span>{{$t('coinTran.left.e4')}}</span> -->
                </div>
                <span v-if="categoryIndex == 0">≈ {{cynPrice}}CNY</span>
                <span v-if="categoryIndex == 1">{{$t('tip.i2')}}{{$t('legal.btn')}}</span>
              </div>
              <!-- 数量 -->
              <div class="form_list form_input">
                <span class="s_left">{{$t('coinTran.left.e6')}}</span>
                <input type="number" v-model="number" @input="OnInput($event)" placeholder="0" />
                <span class="s_right">{{symbol}}</span>
              </div>
              <!-- 可用 -->
              <div class="form_info">
                <div class="list_info">
                  <span>{{$t('coinTran.left.e8')}}</span>
                  <span>{{asste.balance}}{{asste.symbol}}</span>
                </div>
                <!--交易额-->
                <div class="list_info">
                  <span>{{$t('coinTran.left.e9')}}</span>
                  <span>{{dealPrice}}{{asste.symbol}}</span>
                </div>
              </div>
              <!-- 买入按钮 -->
              <div class="submit_b">
                <button @click="buyShow">{{$t('coinTran.left.e1')}}</button>
              </div>
            </div>
          </div>
          <!-- 卖出 -->
          <div v-if="type2 == 1">
            <div class="pr_type">
              <p @click="showPriceType()"><span>{{priceType}}</span><span class="iconfont icon-tabDown_arrow"></span></p>
            </div>
            <div class="deal_form">
              <!-- 限价 （可修改价格）-->
              <div class="form_mun">
                <div class="form_list" v-if="categoryIndex == 0">
                  <!-- <x-number :fillable="true" v-model="price_d" :min="0"  :step="0.5" @on-change="change"></x-number> -->
                  <van-stepper min="0" v-model="price" @change="onChange" />
                </div>
                <div class="form_list form_list2" v-if="categoryIndex == 1">
                  <!-- <x-number :fillable="true" v-model="price_d" :min="0"  :step="0.5" @on-change="change"></x-number> -->
                  <!-- <van-stepper min="0" v-model="price" @change="onChange" /> -->
                   <van-stepper min="0" v-model="coinInfo.price"   disabled/>
                 <!-- <span>{{$t('coinTran.left.e4')}}</span> -->
                </div>
               <span v-if="categoryIndex == 0">≈ {{cynPrice}}CNY</span>
               <span v-if="categoryIndex == 1">{{$t('tip.i2')}}{{$t('legal.sell')}}</span>
              </div>
              <!-- 数量 -->
              <div class="form_list form_input">
                <span class="s_left">{{$t('coinTran.left.e6')}}</span>
                <input type="number" v-model="number" @input="OnInput($event)" placeholder="0" />
                <span class="s_right">{{symbol}}</span>
              </div>
              <!-- 可用 -->
              <div class="form_info">
                <div class="list_info">
                  <span>{{$t('coinTran.left.e8')}}</span>
                  <span>{{asste.balance}}{{asste.symbol}}</span>
                </div>
                <!--交易额-->
                <div class="list_info">
                  <span>{{$t('coinTran.left.e9')}}</span>
                  <span>{{dealPrice}}{{asste.symbol}}</span>
                </div>
              </div>
              <!-- 卖出按钮 -->
              <div class="submit_b">
                <button @click="buyShow" style="background: #E12961;">{{$t('coinTran.left.e2')}}</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧买卖列表 -->
        <div class="deal_right">
          <div class="right_title">
            <div class="title_money">
              <span class="big_text">{{coinInfo.price}}</span>
              <span class="s_text">≈ {{coinInfo.cny_number}}CNY</span>
            </div>
            <div class="tubiao" @click="goCoinkline"><span class="iconfont icon-tabkxianzhanshi"></span></div>
          </div>
          <div class="deal_list">
            <div class="or_title">
              <span>{{$t('coinTran.right.r1')}}</span>
              <span>{{$t('coinTran.right.r2')}}</span>
              <span>{{$t('coinTran.right.r3')}}</span>
            </div>
            <div class="or_list or_list_one">
              <div class="deal_sell" v-for="(item,index) in sell" v-if="index < 5" :key="index">
                <span style="color: #E54777;">{{$t('coinTran.right.r5')}}{{index + 1}}</span>
                <span>{{item[0]}}</span>
                <span>{{item[1]}}</span>
              </div>
            </div>
            <van-divider />
            <div class="or_list">
              <!-- <div class="deal_sell" v-for="(buyitem,index) in buyList" :key="buyitem.index">
                           <span style="color: #E12961;">{{$t('trade.child2.list.u1')}}{{index+1}}</span>
                           <span>{{buyitem.price}}</span>
                           <span>{{buyitem.number}}</span>
                         </div> -->
              <div class="deal_sell" v-for="(item,index) in buy" v-if="index < 5" :key="index">
                <span style="color: #01B782;">{{$t('coinTran.right.r4')}}{{index + 1}}</span>
                <span>{{item[0]}}</span>
                <span>{{item[1]}}</span>
              </div>
            </div>
            </table>
          </div>
        </div>
      </div>
      <div class="entrust">
        <van-tabs v-model="activeEn" @click="navTapEn(activeEn)">
          <van-tab :title="$t('coinTran.tab.t1')">
            <div class="account">
              <div class="scroll_div">
                <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                  :loading-text="$t('ing')" @refresh="onRefresh">
                  <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                    @load="onLoad">
                    <div class="acc_list" v-for="(item,index) in entList" :key="index">
                      <p class="deal_tit">
                        <span>{{item.DirectionText}} <a>{{item.symbol}}/{{item.area}}</a></span>
                        <van-button type="primary" size="small" color="#4163C7" @click="showRepeal(item.id)">{{$t('coinTran.list.entru.btn')}}</van-button>
                      </p>
                      <div class="scroll_x">
                        <div class="acc_con">

                          <div class="acc_top">
                            <p><span>{{$t('coinTran.list.entru.e6')}}</span><span>{{item.create_time}}</span></p>
                            <p><span>{{$t('coinTran.list.entru.e1')}}</span><span>{{item.finish}}</span></p>
                            <p><span>{{$t('coinTran.list.entru.e4')}}</span>
                            <span v-if="item.status == 0 || item.status == 1 || item.status == 3 || item.status == 4"
                            style="color : #E12961">{{item.StatusText}}</span>
                             <span v-if="item.status == 2"
                            style="color : #0AB480">{{item.StatusText}}</span>
                            </p>
                          </div>
                          <div class="acc_top">
                            <p><span>{{$t('coinTran.list.entru.e2')}}</span><span>{{item.number}}</span></p>
                            <p><span>{{$t('coinTran.list.entru.e3')}}</span><span>{{item.price}}</span></p>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="acc_btn">
                        <van-button type="primary" size="small" color="#4163C7" @click="showRepeal(item.id)">{{$t('coinTran.list.entru.btn')}}</van-button>
                      </div> -->
                    </div>
                  </van-list>
                </van-pull-refresh>
              </div>
              <!-- <div no></div> -->
            </div>
          </van-tab>
          <van-tab :title="$t('coinTran.tab.t2')">
            <div class="account">
              <div class="scroll_div">
                <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                  :loading-text="$t('ing')" @refresh="onRefresh">
                  <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                    @load="onLoad">
                    <div class="acc_list" v-for="(item,index) in entList" :key="index">
                      <p class="deal_tit">
                        <span>{{item.DirectionText}} <a>{{item.symbol}}/{{item.area}}</a></span>
                        <!-- <van-button type="primary" size="small" color="#4163C7" @click="showRepeal(item.id)">{{$t('coinTran.list.entru.btn')}}</van-button> -->
                        <span class="sta" v-if="item.status == 0 || item.status == 1 || item.status == 3 || item.status == 4"
                         style="color : #E12961">{{item.StatusText}}</span>
                          <span v-if="item.status == 2"
                         style="color : #0AB480">{{item.StatusText}}</span>
                      </p>

                      <div class="scroll_x">
                        <div class="acc_con">

                          <div class="acc_top">
                            <p><span>{{$t('coinTran.list.entru.e6')}}</span><span>{{item.create_time}}</span></p>
                            <p><span>{{$t('coinTran.list.entru.e1')}}</span><span>{{item.finish}}</span></p>
                          </div>
                          <div class="acc_top">
                            <p><span>{{$t('coinTran.list.entru.e2')}}</span><span>{{item.number}}</span></p>
                            <p><span>{{$t('coinTran.list.entru.e3')}}</span><span>{{item.price}}</span></p>
                           <!-- <p><span>{{$t('coinTran.list.entru.e4')}}</span><span>{{item.StatusText}}</span></p> -->
                          </div>
                        </div>
                      </div>
                      <!-- <div class="acc_btn">
                     <van-button type="primary" size="small" color="#4163C7" @click="showRepeal(item.id)">{{$t('coinTran.list.entru.btn')}}</van-button>
                   </div> -->
                    </div>
                  </van-list>
                </van-pull-refresh>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 密码框-->
    <!-- <x-dialog v-model="tran_dlg " class="de_dialog ver_dialog" hide-on-blur>
   <div class="dialog">
     <span class="iconfont icon-tabguanbi" @click="closeDia"></span>
     <h3>资金密码</h3>
     <input type="password" v-model="pay_pwd" placeholder="请输入资金密码" />
     <div class="dia_btn">
       <span @click="closeDia">取消</span>
       <span @click="transfer">确认</span>
     </div>
   </div>
 </x-dialog> -->
    <!-- 左侧弹出层 切换币种 -->
    <div class="currency">
      <van-popup v-model="show" position="left" get-container="#app" :style="{ width: '80%', height: '100%' }">
        <div class="curr_con curr_con2">
          <van-tabs v-model="activeCoin" @click="navTapCoin(activeCoin)">
            <van-tab :title="$t('coinTran.list.entru.e5')">
              <p v-for="(item,index) in coinData" :key="index" @click="selectCoin(item)">
                <span>{{item.name}}/<a>{{item.area}}</a></span>
                <span v-if="item.ratio >= 0" style="background: #0AB480;">+{{item.ratio}}%</span>
                <span v-if="item.ratio < 0" style="background: #D14B64;">{{item.ratio}}%</span>
              </p>
            </van-tab>
            <van-tab title="USDT">
              <p v-for="(item,index) in coinData" :key="index" @click="selectCoin(item)">
                <span>{{item.name}}/<a>{{item.area}}</a></span>
                <span v-if="item.ratio >= 0" style="background: #0AB480;">+{{item.ratio}}%</span>
                <span v-if="item.ratio < 0" style="background: #D14B64;">{{item.ratio}}%</span>
              </p>
            </van-tab>
            <van-tab title="ETH">
              <p v-for="(item,index) in coinData" :key="index" @click="selectCoin(item)">
                <span>{{item.name}}/<a>{{item.area}}</a></span>
                <span v-if="item.ratio >= 0" style="background: #0AB480;">+{{item.ratio}}%</span>
                <span v-if="item.ratio < 0" style="background: #D14B64;">{{item.ratio}}%</span>
              </p>
            </van-tab>
            <van-tab title="BTC">
              <p v-for="(item,index) in coinData" :key="index" @click="selectCoin(item)">
                <span>{{item.name}}/<a>{{item.area}}</a></span>
                <span v-if="item.ratio >= 0" style="background: #0AB480;">+{{item.ratio}}%</span>
                <span v-if="item.ratio < 0" style="background: #D14B64;">{{item.ratio}}%</span>
              </p>
            </van-tab>
          </van-tabs>
          <div class="no_data" v-if="coinData.length == 0">
            <img src="../assets/img/noda.png">
            <span>{{$t('coinTran.nodata')}}</span>
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 选择价格类型弹窗 -->
    <x-dialog v-model="price_dlg" class="de_dialog lang_dialog" hide-on-blur>
      <div class="dialog">
        <ul>
          <li :class="{active:categoryIndex==index}" @click="selectChange(item,index)" v-for="(item,index) in options"
            :key="index">
            <span>{{item.name}}</span>
            <span class="iconfont icon-tabduihao"></span>
          </li>
        </ul>
      </div>
    </x-dialog>
   <!-- 交易-->
  <van-popup v-model="pass_dlg" position="bottom" :style="{ height: '30%' }">
    <div class="shift">
      <!-- <h4 v-if="dealType == 0">购买{{buy_info.coin_name}} <span>单价{{buy_info.price}}CYN</span></h4>
        <h4 v-if="dealType == 1">出售{{buy_info.coin_name}} <span>单价{{buy_info.price}}CYN</span></h4> -->
      <h4 v-if="type2 == 0">{{$t('legal.btn')}}{{symbol}}</h4>
      <h4 v-if="type2 == 1">{{$t('legal.sell')}}{{symbol}}</h4>
     <div class="shift-info">
        <div class="pr_input">
          <span>{{$t('tip.i1')}}</span>
          <span v-if="type2 == 0 && categoryIndex == 1">{{$t('tip.i2')}}{{$t('legal.btn')}}</span>
          <span v-if="type2 == 1 && categoryIndex == 1">{{$t('tip.i2')}}{{$t('legal.sell')}}</span>
          <span v-if="categoryIndex == 0">{{dealPrice}}</span>
        </div>
        <div class="pr_input">
          <span>{{$t('tip.i3')}}</span>
          <span>{{number}} {{symbol}}</span>
        </div>
      </div>
    </div>
    <div class="shift_btn">
      <span @click="dealSubmit">{{$t('affirm')}}</span>
      <span @click="closePass">{{$t('cel')}}</span>
    </div>
  </van-popup>
<!--    <x-dialog v-model="pass_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closePass"></span>
        <h3>{{$t('dpass')}}</h3>
        <p><span></span>：<a>{{dealPrice}}</a></p>
        <div class="no_con">
          <div class="info_list">
            <span>价格：</span>
            <span>{{dealPrice}}</span>
          </div>
          <div class="info_list">
            <span>数量：</span>
            <span>{{number}}</span>
          </div>
          <div class="info_list">
            <span>{{$t('trade.child1.sell.l7')}}：</span>
            <span>{{fee}}</span>
          </div>
          <div class="info_list">
            <span>密码：</span>
            <input type="password" v-model="tradPwd" :placeholder="$t('tip.t6')" />

          </div>
        </div>
        <input type="password" v-model="tradPwd" :placeholder="$t('tip.t6')" />
        <div class="dia_btn">
          <span @click="closePass">{{$t('cel')}}</span>
          <span @click="dealSubmit">{{$t('affirm')}}</span>
        </div>
      </div>
    </x-dialog> -->
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
    <!-- 余额不足 -->
     <x-dialog v-model="balance_dlg " class="de_dialog auto_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeBalance"></span>
        <h3></h3>
        <p><img src="../assets/img/no_auto.png"><span>{{$t('tip.i4')}}！</span></p>
        <!-- <p v-if="certified == 1">{{$t('tip.t8')}}！</p> -->
        <div class="dia_btn">
          <span @click="goBalance">{{$t('recharge')}}</span>
        </div>
      </div>
    </x-dialog>
    <!-- 撤销弹窗 -->
    <x-dialog v-model="repeal_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closeRepeal"></span>
        <h3></h3>
        <h3>{{$t('tip.t9')}}</h3>
        <div class="acc_btn">
           <span @click="repealOrder">{{$t('affirm')}}</span>
           <span @click="closeRepeal">{{$t('cel')}}</span>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  let scan = null
  import {
    XDialog,
    ButtonTab,
    ButtonTabItem,
  } from "vux";
  export default {
    data() {
      return {
        times: 1,
        show: false,
        price_dlg: false,
        auto_dlg: false,
        pass_dlg: false, //密码弹窗
        repeal_dlg: false,
        balance_dlg:false,
        activeCoin: 0,
        active: 0, //tab选中索引
        activeEn: 0,
        type2: 1,
        categoryIndex: 0,
        consignee: "1",
        tran_dlg: false, //密码弹窗默认关闭
        transfer_user: {}, //转账人信息
        transfer_bsc: [], //可转账虚拟币信息(bsc)
        transfer_bst: [], //可转账虚拟币信息(bst)
        transfer_usdt: [], //可转账虚拟币信息(usdt)
        number: '', //转数量
        coin_id: '', //虚拟币id
        pay_pwd: '', //转账密码
        userCode: '', //用户收款码
        options: [{
            //价格类型
            id: 1,
            name: this.$t('coinTran.left.e3')
          },
          {
            id: 2,
            name: this.$t('coinTran.left.e4')
          }
        ],
        websock: null,
        coinData: [], //交易区
        areaName: '', //交易区名
        area: this.$route.query.area || "USDT",
        symbol: this.$route.query.symbol || "BTC",
        buy: [], //右侧买
        sell: [], //左侧卖
        coinInfo: {},
        asste: {},
        priceType: this.$t('coinTran.left.e3'), //价格类型
        number: '', //数量
        price: '', //价格
        cynPrice: 0, //输入价格显示人民币
        dealPrice: "", //交易额
        tradPwd: "", //交易密码
        certified: "", //实名认证状态
        entList: [], //委托列表
        entTotal: '', //总数
        order_id: "", //委托单id
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
      // this.getTransferInfo();
      that.getSocketBase(that.area);
      that.getCoinInfo(that.area, that.symbol);
      that.getCoinPrice(that.area, that.symbol);
      that.getUserAssets();
      that.getStatus();
      that.getEntrustList();
      this.$nextTick(() => {
        if (this.$route.query.type) {
          this.type2 = Number(this.$route.query.type);
        } else {
          this.type2 = 0;
        }
      });
      // window.t = setInterval(that.getSocketBase(that.area), 500);
      // window.t = setInterval(that.getCoinInfo(that.area, that.symbol), 500);
      // window.t = setInterval(that.getCoinPrice(that.area, that.symbol), 500);

      window.t = setInterval(() => {
        setTimeout(that.getSocketBase(that.area), 0)
      }, 500)
      window.d = setInterval(() => {
        setTimeout(that.getCoinInfo(that.area, that.symbol), 0)
      }, 500)
      window.f = setInterval(() => {
        setTimeout(that.getCoinPrice(that.area, that.symbol), 0)
      }, 500)
    },
    beforeDestroy() {
      //  清楚定时器
      clearInterval(window.t);
      clearInterval(window.d);
      clearInterval(window.f);
    },
    methods: {

      back() {
        this.$router.back();
      },
      closeBalance(){
         let that = this;
         that.balance_dlg = false;
      },
      goBalance(){
        let that = this;
         that.$router.push({
          path: '/chargeMoney',
        })
      },
      selectCoin(item) {
        let that = this;
        that.area = item.area;
        that.symbol = item.name;
        that.getCoinPrice(item.area, item.name);
        that.getCoinInfo(that.area, that.symbol);
        that.getUserAssets();
        that.show = false;
      },
      //获取右侧买卖列表
      getCoinPrice(area, name) {
        let that = this;
        let agentData = {
          area: area,
          method: "queryCoinDepth",
          symbol: name,
          type: 1,
          // token: window.localStorage.getItem("token"),
        };
        // console.log(that.coinData)
        that.socketApi.sendSock(agentData, that.getData);
      },
      //币币资产信息
      getCoinInfo(area, name) {
        let that = this;
        let infoData = {
          area: that.area,
          symbol: that.symbol,
          method: "coinCurrent",
        };
        // console.log(that.coinData)
        that.socketApi.sendSock(infoData, that.getData);
      },
      navTapCoin(i) {
        let that = this;
        that.areaName = i == 1 ? "USDT" : i == 2 ? "ETH" : i == 3 ? "BTC" : '';
        that.getSocketBase(that.areaName);
      },
      //获取对应交易区币对涨幅(币币
      getSocketBase(area) {
        let that = this;
        let isColl = that.activeCoin == 0 ? 'yes' : 'no';
        let agentData = {
          area: area,
          method: "queryCoinArea",
          collect: isColl,
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
              that.coinData = res.data.syminfo;
            } else {
              that.coinData = []
            }
          } else if (res.method == "queryCoinDepth") {
            that.buy = res.data.buy;
            that.sell = res.data.sell;
            $.each(that.buy, function(i, item) {
              // console.log(item[1])
              item[0] = parseFloat(item[0]).toFixed(2)
              item[1] = parseFloat(item[1]).toFixed(2)
            });
            $.each(that.sell, function(i, item) {
              item[0] = parseFloat(item[0]).toFixed(2)
              item[1] = parseFloat(item[1]).toFixed(2)
            });
          } else if (res.method == "coinCurrent") {
            that.coinInfo = res.data;
            that.coinInfo.price = parseFloat(that.coinInfo.price).toFixed(2);
            that.coinInfo.cny_number = parseFloat(that.coinInfo.cny_number).toFixed(2);
            that.coinInfo.volume = parseFloat(that.coinInfo.volume).toFixed(2);

          }

        } else {
          that.coinData = []
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
              type: '1',
              symbol: that.symbol,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.asste = res.data.data[0];
              // console.log(that.asste)
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
      },
      //监听价格
      onChange(e) {
        let that = this;
        // console.log(e)
        // 通过正则过滤小数点后两位
        // e !== 0.00;
        // e = e.toString();
        // if (e != "" && e.key == '.' && -1 == e.indexOf('.')) {
        //   //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
        //   return
        // }
        // if (e.toString() !== (e.match(/^\d*(\.?\d{0,2})/g)[0])) {
        //   e = (e.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
        //   that.cynPrice = Number(e);
        // }
        that.cynPrice = ((Number(that.coinInfo.cny_number) / Number(that.coinInfo.price)) * Number(e)).toFixed(2);
        that.dealPrice = (Number(that.price) * Number(that.number)).toFixed(2);

      },
      //监听input输入
      OnInput(e) {
        let that = this;
        // if (e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
        //   //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
        //   return
        // }
        // if (e.target.value.toString() !== (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0])) {
        //   e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
        //   that.number = Number(e.target.value);
        // }
        that.number = Number(e.target.value);
        // console.log(that.number);
        that.dealPrice = (Number(that.price) * Number(that.number)).toFixed(2);
      },
      //点击左上角显示左侧选择币种弹窗
      showLeft() {
        let that = this;
        that.show = true;
      },

      navTap() {
        let that = this;
        that.categoryIndex = 0;
        that.priceType = that.$t('coinTran.left.e3'),
          that.price = '';
        that.number = '';
        that.cynPrice = 0;
      },
      showPriceType() {
        let that = this;
        that.price_dlg = true;
      },

      //选择 市价或限价
      selectChange(item, i) {
        let that = this;
        that.priceType = item.name;
        that.categoryIndex = i;

        that.price_dlg = false;
        if (that.categoryIndex == 1) {
          that.price = Number(that.coinInfo.price);
          // console.log(that.coinInfo)
          that.cynPrice = Number(that.coinInfo.cny_number);
        } else if (that.categoryIndex == 0) {
          that.price = '';
          that.cynPrice = 0;
        }
      },
      buyShow() {
        let that = this;
        if(Number(that.asste.balance) <=0){
          that.balance_dlg = true;
          return;
        }
        if (that.certified !== 2) {
          that.auto_dlg = true;
          // return;
        } else {
          if (that.categoryIndex == 0) {
            if (!that.price || that.price == 0) {
              that.$toast(that.$t('coinTran.tip.t1'));
            } else if (!that.number || that.number == '') {
              if(that.type2 == 0){
                that.$toast(that.$t('coinTran.tip.t2'));
              }else if(that.type2 == 1){
                that.$toast(that.$t('coinTran.tip.t4'));
              }
            }  else {
              that.pass_dlg = true;
            }
          } else if (that.categoryIndex == 1) {
            if (!that.number || that.number == 0) {
              that.$toast(that.$t('coinTran.tip.t2'));
            } else {
              that.pass_dlg = true;
            }
          }
        }
      },
      //关闭密码弹窗
      closePass() {
        let that = this;
        that.pass_dlg = false;
        that.tradPwd = '';
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
      //币币k线
      goCoinkline() {
        let that = this;
        that.$router.push({
          path: '/coinKline',
          query: {
            area: that.area,
            symbol: that.symbol,
          }
        })
      },
      dealSubmit() {
        let that = this;
        var jsonData;
        if (that.categoryIndex == 0) {

          jsonData = {
            // token: localStorage.getItem("token"),
            area: that.area,
            symbol: that.symbol,
            price: that.price,
            number: that.number,
            direction: that.type2,
            type: that.categoryIndex,
            total: that.dealPrice,
            tradersPassword: that.tradPwd,
          };
        } else if (that.categoryIndex == 1) {
          jsonData = {
            // token: localStorage.getItem("token"),
            area: that.area,
            symbol: that.symbol,
            number: that.number,
            direction: that.type2,
            type: that.categoryIndex,
            total: that.dealPrice,
            tradersPassword: that.tradPwd,
          };
        }
        that.deal(jsonData);
      },
      deal(jsonData) {
        let that = this;
        // if (!that.tradPwd || that.tradPwd == '') {
        //   that.$toast(that.$t('coinTran.tip.t3'));
        // }else{
           that.$vux.loading.show({
            text: ""
          });
          that
            .$http({
              url: "/coinTrade",
              method: "post",
              data: jsonData
            })
            .then(function(res) {
              if (res.data.status == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.s4"));
                that.tradPwd = '';
                that.number = '';
                that.price = '';
                that.pass_dlg = false;
                that.getSocketBase();
                that.getCoinInfo(that.area, that.symbol);
                that.getCoinPrice(that.area, that.symbol);
                that.getUserAssets();
                that.onRefresh();
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
            .catch(function(error) {
              // that.$toast(error);
            });
        //}

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
      navTapEn(i) {
        let that = this;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.entList = [];
        that.getEntrustList(0);
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

      //获取委托列表
      getEntrustList(t) {
        let that = this;
        var l_type = (that.active).toString()
        that.dealType = l_type == "0" ? "0" : "1";
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/queryCoinEntrust",
            method: "post",
            data: {
              // token: window.localStorage.getItem("token"),
              page: that.pageindex,
              area: that.area,
              symbol: that.symbol,
              status: that.activeEn,
              type: 1,
              size: 4,
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
              that.updateLoading = false;
              that.moreloading = false;
              that.finished = true;
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      showRepeal(id) {
        let that = this;
        that.order_id = id;
        that.repeal_dlg = true;
      },
      closeRepeal() {
        let that = this;
        that.repeal_dlg = false;
      },
      repealOrder() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/revocationCoin",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: that.order_id,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(that.$t("succTip.s5"));
              that.onRefresh();
            } else if(res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);
              that.$router.push({
                path: '/login'
              })
            }else {
              that.$vux.loading.hide();
              // that.$toast.fail(res.data.message);

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
    width: 100%;
    overflow-x: hidden;

    span.iconfont {
      color: #333;
      font-size: 0.34rem
    }

    .content {
      font-family: PingFang SC;
      overflow-y: scroll;
      height: calc(100% - 1rem);
      padding: 0;
      background: #f5f5f5;
      padding-bottom: 1rem;

      .deal_content {
        width: 94%;
        margin: 0 auto;
        margin-top: 0.2rem;
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.2rem;

        .deal_left {
          background: #fff;
          width: 50%;
          margin: 0 auto;
          padding: 0.2rem 0.2rem 0.4rem 0.2rem;
          margin-right: 0.04rem;

          .vux-button-group {
            width: 100%;
          }

          .vux-button-group>a {
            height: 0.68rem;
            line-height: 0.68rem;
            background: rgba(0, 0, 0, 0.06);
            color: #333;
            // border: none;
            margin: 0 0.06rem;
          }

          .vux-button-group>a.vux-button-group-current {
            background: rgba(65, 99, 199, 0.22);
            color: #4163C7;
          }

          .vux-button-group>a.vux-button-tab-item-first,
          .vux-button-group>a.vux-button-tab-item-last {
            border-radius: 4rem !important;

          }

          .vux-button-group>a.vux-button-tab-item-last:after,
          .vux-button-group>a.vux-button-tab-item-first:after {
            border: none;
            z-index: 0;
            border-radius: 4rem !important;
          }

          .van-dropdown-menu {
            background: #212548 !important;
            height: 0.6rem !important;
            width: 46%;
            border-radius: 0.08rem;
          }

          /deep/ .van-dropdown-menu__title {
            color: #7883A5 !important;
            font-size: 0.26rem;
          }

          /deep/ .van-popup {
            background: #212548 !important;
            width: 46%;
            border-radius: 0.12rem;
            left: 16%;
          }

          //           .van-radio-group {
          //             display: flex !important;
          //             padding-left: 0.4rem;
          //             padding-top: 0.32rem;
          //
          //             /deep/ .van-radio__icon--checked .van-icon {
          //               background: #4163C7 !important;
          //               border: none !important;
          //             }
          //
          //             /deep/ .van-radio__icon .van-icon {
          //               // border: 1px solid #999999 !important;
          //             }
          //
          //             /deep/ .van-radio {
          //               padding-right: 0.4rem !important;
          //             }
          //
          //             /deep/ .van-radio__label {
          //               font-size: 0.24rem !important;
          //               color: #333 !important;
          //             }
          //           }
          .pr_type {
            width: 100%;
            margin-top: 0.28rem;
            display: flex;
            justify-content: space-between;

            p {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              // background: #e8e8e8;
              border: 1px solid rgba(0, 0, 0, 0.08);
              height: 0.8rem;
              // line-height: 0.66rem;
              padding: 0 0.14rem;
              border-radius: 0.08rem;

              span {
                color: #333;
                font-size: 0.28rem;
              }

              span:nth-child(2) {
                color: #888;
                font-size: 0.26rem;

              }
            }
          }

          /deep/ .van-overlay {
            display: none;
            background-color: rgba(0, 0, 0, .8);
          }

          /deep/ .van-cell {
            color: #7883A5;
            border-radius: 0 !important;
            background: none !important;
            padding: 0.12rem 0.15rem !important;
            font-size: 0.26rem !important;
          }

          /deep/ .van-cell:not(:last-child)::after {
            left: 0.1rem !important;
            transform: scaleY(.2);
          }

          .f_c {
            box-sizing: border-box;
            width: 100%;
            height: 0.94rem;
            line-height: 0.94rem;
            margin-top: 0.56rem;
            margin-bottom: 0.2rem;
            background: #1F2833;
            border: 1px solid rgba(255, 255, 255, 0.04);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.12rem;

            img {
              width: 0.4rem;
              height: 0.4rem;
            }
          }

          .deal_form .form_mun {
            margin: 0.28rem 0 0.5rem 0;

            .now_price {
              width: 100%;
              height: 0.94rem;
              background: #1F2833;
              line-height: 0.94rem;
              text-align: center;
            }

            /deep/ .van-stepper {
              width: 100%;
              height: 0.8rem;
              border: 1px solid rgba(0, 0, 0, 0.08) !important;
              border-radius: 0.08rem;

              .van-stepper__input {
                width: 48%;
                height: 0.8rem;
                padding: 0;

                color: #fff;
                font-size: 0.26rem;
                background: none;
              }

              .van-stepper__minus,
              .van-stepper__plus {
                width: 24%;
                height: 0.8rem;
                padding: 0;
                background: none;
                // border: none;
                // border: 1px solid #f5f5f5 !important;
                font-size: 0.4rem;
              }

              .van-stepper__minus::after,
              .van-stepper__minus::before,
              .van-stepper__plus::after,
              .van-stepper__plus::before {
                background-color: #666;
              }
            }

            span {
              font-size: 0.26rem;
            }
          }

          .deal_form .form_list {
            height: 0.8rem;
            margin-bottom: 0.12rem;
            position: relative;
          }

          .form_list2 {
            height: 0.8rem;
            // background: #f5f5f5;
            text-align: center;
            line-height: 0.8rem;
            border-radius: 0.08rem;
          }

          .deal_form .form_input {
            width: 98.6%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // background: #1F2833;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            color: #d6d7d9;
            border-radius: 0.06rem;

            input {
              width: 48%;
              height: 0.66rem;
              line-height: 0.66rem;
              // background: #F2F3F5;
              // border: 1px solid #f5f5f5 !important;
              padding-left: 0.06rem;
            }

            .s_left,
            .s_right {
              display: inline-block;
              width: 26%;
              height: 0.8rem;
              line-height: 0.8rem;
              text-align: center;
              // background: #e6e6e6;
              // border: 1px solid #f5f5f5 !important;
              font-size: 0.26rem;
              color: #333;
              border: none;
            }
          }

          .form_info {
            margin-top: 0.2rem;

            .list_info {
              display: flex;
              justify-content: space-between;
              padding: 0.16rem 0;
              font-size: 0.28rem;
              color: #333;
            }
          }

          .form_range {
            width: 100%;
            margin-top: 0.2rem;

            .choices {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;

              .btn {
                display: inline-block;
                width: 44%;
                height: 0.8rem;
                margin: 0.16rem 0;
                line-height: 0.8rem;
                text-align: center;
                box-sizing: border-box;
                padding: 0;
                background: #4163C7;
                color: #fff;
                font-size: 0.28rem;
              }

              .btn .active {
                background: #01b782;
                color: white;
              }
            }
          }

          .submit_b {
            margin-top: 0.4rem;
            text-align: center;

            button {
              width: 100%;
              height: 0.8rem;
              background: #01B782;
              border: none;
              border-radius: 2rem;
              color: #fff;
            }
          }
        }

        .deal_right {
          width: 50%;
          margin-left: 0.04rem;
          box-sizing: border-box;
          background: #fff;
          // padding-left: 0.26rem;
          padding: 0.2rem 0.2rem 0.4rem 0.2rem;

          // background: #1a212a;
          // margin-left: 0.02rem;
          .right_title {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
            align-items: center;
            padding-bottom: 0.16rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);

            .title_money {
              display: flex;
              flex-direction: column;
              color: #01b782;

              .big_text {
                font-size: 0.44rem;
              }

              .s_text {
                font-size: 0.26rem;
              }
            }

            .tubiao {
              span.iconfont {
                font-size: 0.46rem;
              }
            }
          }

          .deal_list {
            width: 100%;
            box-sizing: border-box;
            margin-top: 0.2rem;

            .or_title {
              width: 100%;
              display: flex;
              padding: 0.22rem 0.12rem;
              // background: #f5f5f5;
              margin-bottom: 0.22rem;
              border-radius: 0.08rem;

              span {
                display: inline-block;
                text-align: center;
                font-size: 0.28rem;
                font-weight: normal;
              }

              span:nth-child(1) {
                width: 25%;
              }

              span:nth-child(2) {
                width: 40%;
              }

              span:nth-child(3) {
                text-align: right;
                width: 35%;
              }
            }

            .or_list {
              height: 2.4rem;

              .deal_sell {
                display: flex;
                // padding-top: 0.16rem;
                width: 100%;
                height: 0.5rem;
                line-height: 0.5rem;
                color: #555;

                // padding: 0 0.04rem;
                span {
                  display: inline-block;
                  // width: 33.334%;
                  text-align: center;
                  font-size: 0.26rem;
                }

                span:nth-child(1) {
                  text-align: center;
                  width: 25%;
                }

                span:nth-child(2) {
                  text-align: center;
                  width: 40%;
                }

                span:nth-child(3) {
                  text-align: right;
                  padding-right: 0.08rem;
                  width: 35%;
                }
              }
            }

            .or_list_one {
              position: relative;

              .deal_sell {
                position: absolute;
              }

              .deal_sell:nth-child(1) {
                bottom: 0;
              }

              .deal_sell:nth-child(2) {
                bottom: 0.5rem;
              }

              .deal_sell:nth-child(3) {
                bottom: 1rem;
              }

              .deal_sell:nth-child(4) {
                bottom: 1.5rem;
              }

              .deal_sell:nth-child(5) {
                bottom: 2rem;
              }
            }
          }

          /deep/ .van-divider {
            line-height: 0.04rem !important;
            margin: 0.12rem 0;
          }

          .lable_tag {
            margin-top: 0.4rem;
            display: flex;
            justify-content: space-around;
            font-size: 0.4rem;

            /deep/ .van-tag {
              padding: 0.04rem 0.32rem;
              color: #999;
            }
          }
        }
      }

    }

    .entrust {
      /deep/ .van-tab {
        font-size: 0.28rem !important;
      }

      /deep/ .van-tabs__nav {
        background: none !important;

      }

      /deep/ .van-tabs__line {
        display: none;
      }

      .account {
        width: 100%;
        // padding: 0.2rem 4%;
        margin-top: 0.08rem;
        // background: rgba(0, 0, 0, 0.06);

        .van-tab {
          z-index: 99 !important;
        }

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

          p.deal_tit {
            padding: 0.2rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #f5f5f5;

            span:nth-child(1) {
              font-family: PingFang SC;
              font-weight: bold;
              color: #01b782;
              font-size: 0.3rem;

              a {
                color: #333;
              }
            }

            /deep/ .van-button--primary {
              background: none !important;
              border: 1px solid #4163C7 !important;

              span {
                color: #333 !important;
                font-size: 0.26rem !important;
                font-weight: normal !important;
              }
            }

            span:nth-child(2) {
              color: #555;
              font-size: 0.26rem;
            }

          }

          .scroll_x {
             width: 100%;
             overflow-x: scroll;
            .acc_con {
              width: 100%;

              display: flex;
              justify-content: space-between;
              padding: 0.2rem 0;

              .acc_top {
                width: 48%;
                font-family: PingFang SC;
                // padding: 0.32rem 0;

                p {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0.12rem 0;

                  span:nth-child(1) {
                    font-size: 0.26rem;
                    color: rgba(0, 0, 0, 0.52);
                  }

                  span:nth-child(2) {
                    font-size: 0.24rem;
                    color: #333;

                  }
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
              background: #4163C7 !important;
            }
          }

        }
      }
    }
 .ver_dialog{
   .dialog{
     .acc_btn{
        display:flex;
        justify-content: space-around;
        margin: 0.34rem  0.4rem;
        padding-bottom:0.4rem;
        span{
          display:block;
          width: 40%;
          height:0.66rem;
          line-height:0.66rem;
          border-radius:4rem;
        }
       span:nth-child(1){

         background: #2D58D9;
         color: #fff;
       }
       span:nth-child(2){
         background: #EEEEEE;
         color: #333;
       }
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
       margin-top: 0.2rem;

       .pr_input {
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding-bottom: 0.24rem;

         span {
           display: block;
           // width: 2.4rem;
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
     position: fixed;
     bottom: 0.36rem;
     width: 100%;
     height: 0.8rem;
     line-height: 0.8rem;
     display: flex;
     justify-content: space-around;
     align-items: center;

     span {
       width: 40%;
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
