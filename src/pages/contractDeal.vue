<template>
  <div class="public">
    <van-nav-bar :title="symbol + $t('contract.tit')">
      <van-icon name="wap-nav" slot="left" @click="showPup()" />
      <span class="iconfont icon-tabkxianzhanshi" @click="goConline" slot="right"></span>
    </van-nav-bar>
    <div class="content">
      <van-tabs v-model="active" @click="navTapMake(active)">
        <van-tab :title="$t('contract.tab.t1')">
          <div class="deal_content">
            <!-- 左侧交易 -->
            <div class="deal_left">

              <button-tab v-model="type2">
                <button-tab-item @click.native="navTap(0)" selected>{{$t('contract.left.e1')}}</button-tab-item>
                <button-tab-item @click.native="navTap(1)">{{$t('contract.left.e2')}}</button-tab-item>
              </button-tab>
              <!-- 买入 -->
              <div v-if="type2==0">
                <!--  <van-radio-group v-model="consignee">
               <van-radio name="1" checked-color="#07c160">限价</van-radio>
               <van-radio name="2" checked-color="#07c160">市价</van-radio>
             </van-radio-group> -->
                <div class="pr_type">
                  <p @click="showPriceType()"><span>{{priceType}}</span><span class="iconfont icon-tabbottom"></span></p>
                  <p @click="showLever()"><span>{{lever}}X</span><span class="iconfont icon-tabbottom"></span></p>
                </div>
                <div class="deal_form">
                  <!-- 限价 （可修改价格）-->
                  <div class="form_mun">
                    <div class="form_list" v-if="categoryIndex == 0">
                      <!-- <x-number :fillable="true" v-model="price_d" :min="0"  :step="0.5" @on-change="change"></x-number> -->
                      <van-stepper min="0" v-model="price" @change="onChange" />
                    </div>
                    <div class="form_list form_list2" v-if="categoryIndex == 1">
                      <span>{{$t('contract.left.e4')}}</span>
                    </div>
                    <span class="cny_pirce">≈ {{cynPrice}}CNY</span>
                  </div>
                  <!-- 数量 -->
                  <div class="form_list form_input">
                    <span class="s_left">{{$t('contract.left.e6')}}</span>
                    <input type="number" v-model="number" @input="OnInput($event)" />
                    <span class="s_right">{{$t('contract.left.e7')}}</span>
                  </div>
                  <!-- 数量百分比选择 -->
                  <!--   <div class="form_range">
                    <div class="choices">
                      <button class="btn">25%</button>
                      <button class="btn">50%</button>
                      <button class="btn">75%</button>
                      <button class="btn">100%</button>
                    </div>
                  </div> -->
                  <div class="num_slider">
                    <van-slider v-model="value" @change="numChange" />
                    <div class="circle">
                      <a class="active_bg"></a>
                      <a></a>
                      <a></a>
                      <a></a>
                      <a></a>
                    </div>
                    <div class="percent">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <!-- 可用 -->
                  <div class="form_info">
                    <div class="list_info">
                      <span>{{$t('contract.left.e8')}}</span>
                      <span>{{balance}}{{area}}</span>
                    </div>
                    <!--交易额-->
                    <div class="list_info">
                      <span>{{$t('contract.left.e9')}}</span>
                      <span>{{asste.frozen}}{{area}}</span>
                    </div>
                  </div>
                  <div class="form_info">
                    <div class="list_info">
                      <span>{{$t('contract.left.f1')}}</span>
                      <p><input type="text" placeholder="" /><a>USDT</a></p>
                    </div>
                    <!--交易额-->
                    <div class="list_info">
                      <span>{{$t('contract.left.f2')}}</span>
                      <p><input type="text" placeholder="" /><a>USDT</a></p>
                    </div>
                  </div>
                  <!-- 买入按钮 -->
                  <div class="submit_b">
                    <button @click="buyShow(0)">{{$t('contract.left.btn1')}}</button>
                    <button @click="buyShow(1)">{{$t('contract.left.btn2')}}</button>
                  </div>
                </div>
              </div>
              <!-- 卖出 -->
              <div v-if="type2 == 1">
                <div class="pr_type">
                  <p @click="showPriceType()"><span>{{priceType}}</span><span class="iconfont icon-tabbottom"></span></p>
                  <p @click="showLever()"><span>{{lever}}X</span><span class="iconfont icon-tabbottom"></span></p>
                </div>
                <div class="deal_form">
                  <!-- 限价 （可修改价格）-->
                  <div class="form_mun">
                    <div class="form_list" v-if="categoryIndex == 0">
                      <!-- <x-number :fillable="true" v-model="price_d" :min="0"  :step="0.5" @on-change="change"></x-number> -->
                      <van-stepper min="0" v-model="price" @change="onChange" />
                    </div>
                    <div class="form_list form_list2" v-if="categoryIndex == 1">
                      <span>{{$t('contract.left.e4')}}</span>
                    </div>
                    <span class="cny_pirce">≈ {{cynPrice}}CNY</span>
                  </div>
                  <!-- 数量 -->
                  <div class="form_list form_input">
                    <span class="s_left">{{$t('contract.left.e6')}}</span>
                    <input type="number" v-model="number" @input="OnInput($event)" />
                    <span class="s_right">{{$t('contract.left.e7')}}</span>
                  </div>
                  <!-- 数量百分比选择 -->
                  <!--    <div class="form_range">
                    <div class="choices">
                      <button class="btn">25%</button>
                      <button class="btn">50%</button>
                      <button class="btn">75%</button>
                      <button class="btn">100%</button>
                    </div>
                  </div> -->
                  <div class="num_slider">
                    <van-slider v-model="value" @change="numChange" />
                    <div class="circle">
                      <a class="active_bg"></a>
                      <a></a>
                      <a></a>
                      <a></a>
                      <a></a>
                    </div>
                    <div class="percent">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <!-- 可用 -->
                  <div class="form_info">
                    <div class="list_info">
                      <span>{{$t('contract.left.f4')}}</span>
                      <span>{{balance}}{{$t('contract.left.e7')}}</span>
                    </div>
                    <!--交易额-->
                    <div class="list_info">
                      <span>{{$t('contract.left.f6')}}</span>
                      <span>{{asste.frozen}}{{$t('contract.left.e7')}}</span>
                    </div>
                  </div>
                  <!-- 买入按钮 -->
                  <div class="submit_b">
                    <button @click="buyShow(0)">{{$t('contract.left.btn3')}}</button>
                    <button @click="buyShow(1)">{{$t('contract.left.btn4')}}</button>
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
                <!-- <div class="tubiao" @click="showK"><img src="../assets/fsux.png"></div> -->
              </div>
              <div class="deal_list">
                <div class="or_title">
                  <span>{{$t('contract.right.r2')}}</span>
                  <span>{{$t('contract.right.r3')}}</span>
                </div>
                <div class="or_list or_list_one">
                  <!-- <div class="deal_sell" v-for="(sellitem,index) in sellList" :key="sellitem.index">
                            <span style="color: #01B782;">{{$t('trade.child2.list.u2')}}{{index + 1}}</span>
                            <span>{{sellitem.price}}</span>
                            <span>{{sellitem.number}}</span>
                          </div> -->
                  <div class="deal_sell" v-for="(item,index) in sell" v-if="index < 5" :key="index">
                    <span style="color: #E12961;">{{item[0]}}</span>
                    <span>{{item[1]}}</span>
                  </div>
                  <div class="no_data" v-if="sell.length == 0">
                    <img src="../assets/img/noda.png">
                    <!-- <span>暂无数据</span> -->
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
                    <span style="color: #01B782;">{{item[0]}}</span>
                    <span>{{item[1]}}</span>
                  </div>
                  <div class="no_data" v-if="buy.length == 0">
                    <img src="../assets/img/noda.png">
                    <!-- <span>暂无数据</span> -->
                  </div>
                </div>

                </table>
              </div>
            </div>
          </div>
          <div class="entrust">
            <van-tabs v-model="activeEn" @click="navTapEn(activeEn)">
              <van-tab :title="$t('contract.tab.t2')">
                <div class="account">
                  <div class="scroll_div">
                    <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                      :loading-text="$t('ing')" @refresh="onRefresh">
                      <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                        @load="onLoad">
                        <div class="acc_list" v-for="(item,index) in entList" :key="index">
                          <p class="deal_tit">
                            <span v-if="item.type == 1" style="color:#01B782 ;">{{$t('contract.list.post.p1')}} <a>{{item.name}}性合约</a></span>
                            <span v-if="item.type == 0" style="color:#FE014F ;">{{$t('contract.list.post.p2')}} <a>{{item.name}}性合约</a></span>
                            <van-button type="primary" size="small" color="#4163C7" @click="buyShow(2,item)">{{$t('contract.list.post.btn')}}</van-button>
                          </p>
                          <div class="scroll_x">
                            <div class="acc_con">

                              <div class="acc_top">
                                <p><span>{{$t('contract.list.post.p3')}}</span><span>{{item.number}}</span></p>
                                <p><span>{{$t('contract.list.post.p4')}}</span><span>{{item.price}}</span></p>
                                <p><span>{{$t('contract.list.post.p5')}}</span><span>{{item.stop_price}}</span></p>
                                <p><span>{{$t('contract.list.post.s1')}}</span><span>{{item.create_time}}</span></p>
                              </div>
                              <div class="acc_top">
                                <p><span>{{$t('contract.list.post.p8')}}</span><span>{{item.number}}</span></p>
                                <p><span>{{$t('contract.list.post.p6')}}</span><span>{{item.multiple}}</span></p>
                                <p><span>{{$t('contract.list.post.p7')}}</span><span>{{item.loss_price}}</span></p>
                                <p><span>{{$t('contract.list.post.p9')}}</span>
                                  <span v-if="Number(item.profit >=0)" style="color:#01B782 ;">+{{item.profit}}</span>
                                  <span v-if="Number(item.profit < 0)" style="color:#FE014F ;">{{item.profit}}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <!-- <div class="acc_btn">
                            <van-button type="primary" size="small" color="#4163C7" @click="buyShow(2,item)">{{$t('contract.list.post.btn')}}</van-button>
                          </div> -->
                        </div>
                      </van-list>
                    </van-pull-refresh>
                  </div>
                </div>
              </van-tab>
              <van-tab :title="$t('contract.tab.t3')">
                <div class="account">
                  <div class="scroll_div">
                    <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                      :loading-text="$t('ing')" @refresh="onRefreshMake">
                      <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                        @load="onLoadMake">
                        <div class="acc_list" v-for="(item,index) in conList" :key="index">
                          <p class="deal_tit">
                            <span v-if="item.directionName == '买入开多'" style="color:#01B782">{{item.directionName}} <a>{{item.symbol}}{{$t('contract.list.entru.t9')}}</a></span>
                            <span v-if="item.directionName == '卖出开空'" style="color:#FE014F">{{item.directionName}} <a>{{item.symbol}}{{$t('contract.list.entru.t9')}}</a></span>
                            <van-button type="primary" size="small" color="#4163C7" @click="repealOrder(item.id)">{{$t('contract.list.entru.btn')}}</van-button>
                            <!-- <span class="times">{{item.update_time}}</span> -->
                          </p>
                          <div class="scroll_x">
                            <div class="acc_con">
                              <div class="acc_top">
                                <p><span>{{$t('contract.list.entru.e3')}}</span><span>{{item.finish}}</span></p>
                                <p><span>{{$t('contract.list.entru.e4')}}</span><span>{{item.average_price}}</span></p>
                                <p><span>{{$t('contract.list.entru.e5')}}</span><span>{{item.price}}</span></p>
                                <p><span>{{$t('contract.list.entru.r6')}}</span><span>{{item.create_time}}</span></p>
                              </div>
                              <div class="acc_top">
                                <p><span>{{$t('contract.list.entru.e6')}}</span><span>{{item.bond}}</span></p>
                                <p><span>{{$t('contract.list.entru.e7')}}</span><span>{{item.fee}}</span></p>
                                <p><span>{{$t('contract.list.entru.e8')}}</span><span>{{item.finish}}</span></p>
                                <p><span>{{$t('contract.list.entru.e9')}}</span>
                                  <span v-if="item.status == 2" style="color:#01B782 ;">{{$t('contract.list.entru.e8')}}</span>
                                  <span v-if="item.status == 0" style="color:#FE014F ;">{{$t('contract.list.entru.t1')}}</span>
                                  <span v-if="item.status == 1" style="color:#FE014F ;">{{$t('contract.list.entru.t2')}}</span>
                                  <span v-if="item.status == 3" style="color:#FE014F ;">{{$t('contract.list.entru.t3')}}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <!-- <div class="acc_btn">
                            <van-button type="primary" size="small" color="#4163C7" @click="repealOrder(item.id)">{{$t('contract.list.entru.btn')}}</van-button>
                          </div> -->
                        </div>
                      </van-list>
                    </van-pull-refresh>
                  </div>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>
        <van-tab :title="$t('contract.tab.t2')">
          <div class="entrust">
            <div class="account">
              <div class="scroll_div">
                <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                  :loading-text="$t('ing')" @refresh="onRefresh">
                  <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                    @load="onLoad">
                    <div class="acc_list" v-for="(item,index) in entList" :key="index">
                      <p class="deal_tit">
                        <span v-if="item.type == 1" style="color:#01B782 ;">{{$t('contract.list.post.p1')}} <a>{{item.name}}性合约</a></span>
                        <span v-if="item.type == 0" style="color:#FE014F ;">{{$t('contract.list.post.p2')}} <a>{{item.name}}性合约</a></span>
                        <!-- <span class="times">{{item.create_time}}</span> -->
                        <van-button type="primary" size="small" color="#4163C7" @click="buyShow(2,item)">{{$t('contract.list.post.btn')}}</van-button>
                      </p>
                      <div class="scroll_x">
                        <div class="acc_con">
                          <div class="acc_top">
                            <p><span>{{$t('contract.list.post.p3')}}</span><span>{{item.number}}</span></p>
                            <p><span>{{$t('contract.list.post.p4')}}</span><span>{{item.price}}</span></p>
                            <p><span>{{$t('contract.list.post.p5')}}</span><span>{{item.stop_price}}</span></p>
                            <p><span>{{$t('contract.list.post.s1')}}</span><span>{{item.create_time}}</span></p>
                          </div>
                          <div class="acc_top">
                            <p><span>{{$t('contract.list.post.p8')}}</span><span>{{item.number}}</span></p>
                            <p><span>{{$t('contract.list.post.p6')}}</span><span>{{item.multiple}}</span></p>
                            <p><span>{{$t('contract.list.post.p7')}}</span><span>{{item.loss_price}}</span></p>
                            <p><span>{{$t('contract.list.post.p9')}}</span>
                              <span v-if="Number(item.appendInfo.profit >=0)" style="color:#01B782 ;">+{{item.appendInfo.profit}}</span>
                              <span v-if="Number(item.appendInfo.profit < 0)" style="color:#FE014F ;">{{item.appendInfo.profit}}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="acc_btn">
                        <van-button type="primary" size="small" color="#4163C7" @click="buyShow(2,item)">{{$t('contract.list.post.btn')}}</van-button>
                      </div> -->
                    </div>
                  </van-list>
                </van-pull-refresh>
              </div>
              <!-- <div no></div> -->
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('contract.tab.t3')">
          <div class="entrust">
            <div class="account">
              <div class="scroll_div">
                <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                  :loading-text="$t('ing')" @refresh="onRefreshMake">
                  <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                    @load="onLoadMake">
                    <div class="acc_list" v-for="(item,index) in conList" :key="index">
                      <p class="deal_tit">
                        <span v-if="item.directionName == '买入开多'" style="color:#01B782">{{item.directionName}} <a>{{item.symbol}}{{$t('contract.list.entru.t9')}}</a></span>
                        <span v-if="item.directionName == '卖出平多'" style="color:#FE014F">{{item.directionName}} <a>{{item.symbol}}{{$t('contract.list.entru.t9')}}</a></span>
                        <van-button type="primary" size="small" color="#4163C7" @click="repealOrder(item.id)">{{$t('contract.list.entru.btn')}}</van-button>
                        <!-- <span class="times">{{item.update_time}}</span> -->
                      </p>
                      <div class="scroll_x">
                        <div class="acc_con">
                          <div class="acc_top">
                            <p><span>{{$t('contract.list.entru.e3')}}</span><span>{{item.finish}}</span></p>
                            <p><span>{{$t('contract.list.entru.e4')}}</span><span>{{item.average_price}}</span></p>
                            <p><span>{{$t('contract.list.entru.e5')}}</span><span>{{item.price}}</span></p>
                            <p><span>{{$t('contract.list.entru.r6')}}</span><span>{{item.create_time}}</span></p>
                          </div>
                          <div class="acc_top">
                            <p><span>{{$t('contract.list.entru.e6')}}</span><span>{{item.bond}}</span></p>
                            <p><span>{{$t('contract.list.entru.e7')}}</span><span>{{item.fee}}</span></p>
                            <p><span>{{$t('contract.list.entru.e8')}}</span><span>{{item.finish}}</span></p>
                            <p><span>{{$t('contract.list.entru.e9')}}</span>
                              <span v-if="item.status == 2" style="color:#01B782 ;">{{$t('contract.list.entru.e8')}}</span>
                              <span v-if="item.status == 0" style="color:#FE014F ;">{{$t('contract.list.entru.t1')}}</span>
                              <span v-if="item.status == 1" style="color:#FE014F ;">{{$t('contract.list.entru.t2')}}</span>
                              <span v-if="item.status == 3" style="color:#FE014F ;">{{$t('contract.list.entru.t3')}}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="acc_btn">
                    <van-button type="primary" size="small" color="#4163C7" @click="repealOrder(item.id)">{{$t('contract.list.entru.btn')}}</van-button>
                  </div> -->
                    </div>
                  </van-list>
                </van-pull-refresh>
              </div>
              <!-- <div no></div> -->
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('contract.tab.t4')">
          <div class="entrust">
            <div class="account">
              <div class="scroll_div">
                <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                  :loading-text="$t('ing')" @refresh="onRefreshMake">
                  <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                    @load="onLoadMake">
                    <div class="acc_list" v-for="(item,index) in conList" :key="index">
                      <p class="deal_tit">
                        <span v-if="item.directionName == '买入开多'" style="color:#01B782">{{item.directionName}} <a>{{item.symbol}}{{$t('contract.list.entru.t9')}}</a></span>
                        <span v-if="item.directionName == '卖出平多'" style="color:#FE014F">{{item.directionName}} <a>{{item.symbol}}{{$t('contract.list.entru.t9')}}</a></span>
                        <!-- <span class="times">{{item.update_time}}</span> -->
                      </p>
                      <div class="scroll_x">
                        <div class="acc_con">
                          <div class="acc_top">
                            <p><span>{{$t('contract.list.entru.e6')}}</span><span>{{item.bond}}</span></p>
                            <p><span>{{$t('contract.list.entru.e7')}}</span><span>{{item.fee}}</span></p>
                            <p><span>{{$t('contract.list.entru.e5')}}</span><span>{{item.price}}</span></p>
                            <p><span>{{$t('contract.list.entru.r6')}}</span><span>{{item.create_time}}</span></p>

                          </div>
                          <div class="acc_top">
                            <!-- <p><span>{{$t('contract.list.entru.e8')}}</span><span>{{item.finish}}</span></p> -->
                            <p><span>{{$t('contract.list.entru.r1')}}</span><span>{{item.finish}}</span></p>
                            <p><span>{{$t('contract.list.entru.e4')}}</span><span>{{item.average_price}}</span></p>
                            <p><span>{{$t('contract.list.entru.t5')}}</span><span>{{item.lever}}</span></p>
                            <p><span>{{$t('contract.list.entru.e9')}}</span>
                              <span v-if="item.status == 2" style="color:#01B782 ;">{{$t('contract.list.entru.e8')}}</span>
                              <span v-if="item.status == 0" style="color:#FE014F ;">{{$t('contract.list.entru.t1')}}</span>
                              <span v-if="item.status == 1" style="color:#FE014F ;">{{$t('contract.list.entru.t2')}}</span>
                              <span v-if="item.status == 3" style="color:#FE014F ;">{{$t('contract.list.entru.t3')}}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </van-list>
                </van-pull-refresh>
              </div>
              <!-- <div no></div> -->
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('contract.tab.t5')">
          <div class="entrust entrust2">
            <van-tabs v-model="activeOrder" @click="navTapOrder(activeOrder)">
              <van-tab :title="$t('contract.tab.t6')">
                <div class="account">
                  <div class="scroll_div">
                    <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                      :loading-text="$t('ing')" @refresh="onRefresh">
                      <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                        @load="onLoad">
                        <div class="acc_list" v-for="(item,index) in entList" :key="index">
                          <p class="deal_tit">
                            <span v-if="item.type == 1" style="color:#01B782 ;">{{$t('contract.list.post.p1')}} <a>{{item.name}}性合约</a></span>
                            <span v-if="item.type == 0" style="color:#FE014F ;">{{$t('contract.list.post.p2')}} <a>{{item.name}}性合约</a></span>
                            <!-- <span class="times">{{item.crea}}</span> -->
                          </p>
                          <div class="scroll_x">
                            <div class="acc_con">
                              <div class="acc_top">
                                <p><span>{{$t('contract.list.entru.e7')}}</span><span>{{item.fee}}</span></p>
                                <p><span>{{$t('contract.list.entru.e8')}}</span><span>{{item.number}}</span></p>
                                <p><span>{{$t('contract.list.entru.r5')}}</span><span>{{item.create_time}}</span></p>
                              </div>
                              <div class="acc_top">
                                <p><span>{{$t('contract.list.entru.t4')}}</span><span>{{item.number}}</span></p>
                                <p><span>{{$t('contract.list.entru.t5')}}</span><span>{{item.multiple}}</span></p>
                                <p><span>{{$t('contract.list.entru.t7')}}</span>
                                  <span v-if="Number(item.profit >=0)" style="color:#01B782 ;">+{{item.profit}}</span>
                                  <span v-if="Number(item.profit < 0)" style="color:#FE014F ;">{{item.profit}}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </van-list>
                    </van-pull-refresh>
                  </div>
                  <!-- <div no></div> -->
                </div>
              </van-tab>
              <van-tab :title="$t('contract.tab.t7')">
                <div class="account">
                  <div class="scroll_div">
                    <van-pull-refresh v-model="updateLoading" :pulling-text="$t('down')" :loosing-text="$t('put')"
                      :loading-text="$t('ing')" @refresh="onRefresh">
                      <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('no')"
                        @load="onLoad">
                        <div class="acc_list" v-for="(item,index) in entList" :key="index">
                          <!-- <p class="deal_tit">
                            <span v-if="item.directionName == '买入开多'" style="color:#01B782">{{item.directionName}} <a>{{item.symbol}}{{$t('contract.list.entru.t9')}}</a></span>
                            <span v-if="item.directionName == '卖出开空'" style="color:#FE014F">{{item.directionName}} <a>{{item.symbol}}{{$t('contract.list.entru.t9')}}</a></span>
                            <span class="times">{{item.update_time}}</span>
                          </p> -->
                          <div class="scroll_x">
                            <div class="acc_con">
                              <div class="acc_top">
                                <p>
                                  <span>{{$t('contract.list.entru.r3')}}</span>
                                  <span v-if="item.type == 1">{{$t('contract.list.post.p1')}}</span>
                                  <span v-if="item.type == 0">{{$t('contract.list.post.p2')}}</span>
                                </p>
                                <p><span>{{$t('contract.list.entru.t6')}}</span><span>{{item.appendInfo.compel_price}}</span></p>
                                <p><span>{{$t('contract.list.entru.r5')}}</span><span>{{item.appendInfo.create_time}}</span></p>
                              </div>
                              <div class="acc_top">
                                <p><span>{{$t('contract.list.entru.r4')}}</span><span>{{item.name}}</span></p>
                                <p><span>{{$t('contract.list.entru.t8')}}</span><span>{{item.number}}</span></p>
                              </div>
                            </div>
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
        </van-tab>
      </van-tabs>
    </div>
    <!-- 左侧弹出层 切换币种 -->
    <div class="currency">
      <van-popup v-model="show" position="left" get-container="#app" :style="{ width: '80%', height: '100%' }">
        <div class="curr_con">
          <p v-for="(item,index) in coinData" :key="index" @click="selectCoin(item)">
            <span>{{item.symbol}}/<a>{{item.area}}</a></span>
            <span>{{item.price}}</span>
            <span v-if="item.ratio >= 0" style="background: #0AB480;">+{{item.ratio}}%</span>
            <span v-if="item.ratio < 0" style="background: #D14B64;">{{item.ratio}}%</span>
          </p>
          <div class="no_data" v-if="coinData.length == 0">
            <img src="../assets/img/noda.png">
            <span>暂无数据</span>
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
    <!-- 选择杠杆倍数信息弹窗 -->
    <x-dialog v-model="lever_dlg" class="de_dialog lang_dialog" hide-on-blur>
      <div class="dialog">
        <ul>
          <li :class="{active:leverIndex==index}" @click="selectLever(item,index)" v-if="item.type == 0" v-for="(item,index) in multiple"
            :key="index">
            <span>{{item.multiple}}X</span>
            <span class="iconfont icon-tabduihao"></span>
          </li>
        </ul>
      </div>
    </x-dialog>
    <!-- 密码框-->
    <x-dialog v-model="pass_dlg " class="de_dialog ver_dialog" hide-on-blur>
      <div class="dialog">
        <span class="iconfont icon-tabguanbi" @click="closePass"></span>
        <p v-if="type2 == 0 && mode !== 2">{{$t('contract.tip.t1')}}？</p>
        <p v-if="type2 == 1 || mode == 2">{{$t('contract.tip.t2')}}？</p>
        <!-- <input type="password" v-model="tradPwd" :placeholder="$t('tip.t6')" /> -->
        <div class="dia_btn">
          <span @click="closePass">{{$t('cel')}}</span>
          <span @click="dealSubmit">{{$t('affirm')}}</span>
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
        activeEn: 0,
        type2: 0,
        active: this.$route.query.type || 0, //进入页面选中nav导航索引（矿机商城，Ao商城）
        active_ao: 0, //默认nav导航索引（ao商城种类列表）
        num: 5, //nav导航超过5个滑动
        MiningList: [], //矿机商城列表
        MinAccount: {}, //矿机购买总价
        activeOrder: 0,
        consume_usdt: '',
        consume_bsc: '',
        bannerList: [], //ao商城首页banner图
        pageindex: 1, //商品列表默认第一页
        goodsList: [], //商品列表
        classList: [], //商品分类列表
        multiple: 0,
        area: this.$route.query.area || "USDT",
        symbol: this.$route.query.symbol || "BTC",
        coinData: [],
        buy: [], //买
        sell: [], //卖
        price: "",
        cynPrice: 0,
        dealPrice: 0,

        asste: {},
        balance: 0,
        coinInfo: {}, //当前币价格
        options: [{
            //价格类型
            id: 1,
            name: "限价"
          },
          {
            id: 2,
            name: "市价"
          }
        ],
        price_dlg: false,
        lever_dlg: false,
        auto_dlg: false,
        pass_dlg: false, //密码弹窗
        leverIndex: 0,
        number: 0,
        priceType: '限价', //价格类型
        multiple: [], //杠杆倍数
        lever: 0,
        certified: "",
        categoryIndex: 0,
        tradPwd: "",
        loss_limit: "", //止损
        stop_profit: "", //止盈
        mode: "",
        pos_info: {}, //持仓信息
        depot_id: '',
        // active:0,
        entList: [], //持仓列表
        entTotal: '', //总数
        conList: [], //委托列表
        conTotal: 0, //总数
        pageindex: 1, //邀请记录默认第一页
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
        times: 1,
        value: 0
      }
    },
    components: {
      XDialog,
      ButtonTab,
      ButtonTabItem,
    },
    mounted: function() {
      let that = this;
      that.getSocketBase(that.area, that.symbol);
      // that.getCoinInfo(that.area, that.symbol);
      that.getUserAssets();
      that.getMultiple();
      that.getStatus();
      that.getEntrustList(0);
      that.getContractEntrust(0);
      window.t = setInterval(() => {
        setTimeout(that.getSocketBase(that.area, that.symbol), 0)
      }, 500)
      // window.t = setInterval(() => {
      //   setTimeout(that.getStatus(), 0)
      // }, 500)
    },
    beforeDestroy() {
      //  清楚定时器
      clearInterval(window.t)
    },
    methods: {
      back() {
        this.$router.back();
      },
      numChange(value) {
        // console.log(value)
        let that = this;
        if (parseFloat(that.asste.balance) >= 0) {
          that.number = (parseFloat(that.asste.balance) * value / 100).toFixed(2);
          that.balance = (parseFloat(that.asste.balance) - that.number).toFixed(6)
        } else {
          that.number = 0;
        }
        if (value >= 1) {
          $(".circle").find("a").eq(0).css("backgroundColor", "#1989fa")
        }
        if (value >= 25) {
          $(".circle").find("a").eq(0).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(1).css("backgroundColor", "#1989fa");
        }
        if (value >= 50) {
          $(".circle").find("a").eq(0).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(1).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(2).css("backgroundColor", "#1989fa");
        }
        if (value >= 75) {
          $(".circle").find("a").eq(0).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(1).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(2).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(3).css("backgroundColor", "#1989fa");
        }
        if (value >= 100) {
          $(".circle").find("a").css("backgroundColor", "#1989fa");
        }
        if (75 < value < 100) {
          $(".circle").find("a").css("backgroundColor", "#DFDFDF");
        }
        if (value >= 1) {
          $(".circle").find("a").eq(0).css("backgroundColor", "#1989fa")
        }
        if (value >= 25) {
          $(".circle").find("a").eq(0).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(1).css("backgroundColor", "#1989fa");
        }
        if (value >= 50) {
          $(".circle").find("a").eq(0).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(1).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(2).css("backgroundColor", "#1989fa");
        }
        if (value >= 75) {
          $(".circle").find("a").eq(0).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(1).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(2).css("backgroundColor", "#1989fa");
          $(".circle").find("a").eq(3).css("backgroundColor", "#1989fa");
        }

      },
      navTap(i) {
        // this.getTransferInfo();
        this.number = 0;
        this.value = 0;
        this.priceType = "限价";
        this.categoryIndex = 0;
        this.price = 0;
        this.leverIndex = 0;
        this.lever = 0;


      },

      showPriceType() {
        let that = this;
        that.price_dlg = true;
      },
      showLever() {
        let that = this;
        that.lever_dlg = true;
      },
      showPup() {
        let that = this;
        that.show = true;
        console.log(123)
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
      selectLever(item, i) {
        let that = this;
        that.lever = item.multiple;
        that.leverIndex = i;
        that.lever_dlg = false;
      },
      //监听价格
      onChange(e) {
        let that = this;
        // console.log(e)
        that.cynPrice = ((Number(that.coinInfo.cny_number) / Number(that.coinInfo.price)) * Number(e)).toFixed(2);
        that.dealPrice = (Number(that.price) * Number(that.number)).toFixed(2);

      },
      //监听input输入
      OnInput(e) {
        let that = this;
        that.number = Number(e.target.value);
        that.dealPrice = (Number(that.price) * Number(that.number)).toFixed(2);
      },
      selectCoin(item) {
        let that = this;
        that.area = item.area;
        that.times = 2;
        that.symbol = item.symbol;
        // console.log(that.coinInfo)
        that.getSocketBase(item.area, item.symbol);
        that.onRefresh();
        that.onRefreshMake();
        that.coinInfo = item;
        // that.getCoinInfo(that.area, that.symbol);
        // that.getUserAssets();
        that.show = false;
      },
      //合并合约及深度信息
      getSocketBase(area, symbol) {
        let that = this;
        let agentData = {
          area: area,
          symbol: symbol,
          method: "queryPairDepth",
          type: 0,
        };
        // console.log(that.coinData)
        that.socketApi.sendSock(agentData, that.getData);
      },
      getData(res) {
        let that = this;
        // console.log(res,1)
        if (res.status == 1) {
          if (res.method == "queryPairDepth") {
            if (res.data.pair) {
              //times == 1 第一次请求
              if (that.times == 1) {
                that.coinInfo = res.data.pair[0];
                that.coinData = res.data.pair;
              } else {
                that.coinData = res.data.pair;
              }
            } else {
              that.coinData = []
            }
            if (res.data.depth) {
              that.buy = res.data.depth.buy;
              that.sell = res.data.depth.sell;
              $.each(that.buy, function(i, item) {
                // console.log(item[1])
                item[0] = parseFloat(item[0]).toFixed(2)
                item[1] = parseFloat(item[1]).toFixed(2)
              });
              $.each(that.sell, function(i, item) {
                item[0] = parseFloat(item[0]).toFixed(2)
                item[1] = parseFloat(item[1]).toFixed(2)
              });
            }
          }

        } else {
          that.coinData = []
        }
      },
      repealOrder(id) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/cancelContractEntrust",
            method: "post",
            data: {
              token: window.localStorage.getItem("token"),
              id: id,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
               that.$toast.success(that.$t("succTip.s5"));
              that.onRefresh();
            } else if (res.data.status == -1) {
              that.$vux.loading.hide();
              that.$toast(res.data.message);
              that.$router.push({
                path: '/login'
              })
            } else {
              that.$vux.loading.hide();
              that.$toast.fail(res.data.message);

            }
          })
          .catch(function(error) {

          });
      },
      navTapOrder(i) {
        let that = this;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.entList = [];
        that.getEntrustList(0);
      },
      navTapEn(i) {
        let that = this;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.entList = [];
        that.conList = [];
        if (i == 0 || i == 4) {
          that.getEntrustList(0);
        } else {
          that.getContractEntrust(0);
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

      //获取持仓列表
      getEntrustList(t) {
        let that = this;
        var statu = '';
        if (that.activeEn == 0) {
          statu = 1;
        }
        if (that.active == 4) {
          if (that.activeOrder == 0) {
            statu = 2;
          } else if (that.activeOrder == 1) {
            statu = 3
          }
        }
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/queryDepot",
            method: "post",
            data: {
              // token: window.localStorage.getItem("token"),
              page: that.pageindex,
              currency: that.area,
              symbol: that.symbol,
              status: statu,
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
                  $.each(that.entList, function(i, item) {
                    // console.log(item[1])
                    item.stop_price = parseFloat(item.stop_price).toFixed(5)
                    item.loss_price = parseFloat(item.loss_price).toFixed(5)
                    item.profit = parseFloat(item.profit).toFixed(5)
                  });
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
                  $.each(that.entList, function(i, item) {
                    // console.log(item[1])
                    item.loss_price = parseFloat(item.loss_price).toFixed(5);
                    item.stop_price = parseFloat(item.stop_price).toFixed(5);
                    item.appendInfo.unrealized_profit = parseFloat(item.appendInfo.unrealized_profit).toFixed(5);
                  });
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
      navTapMake(i) {
        let that = this;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        // that.entList = [];
        that.conList = [];
        if (i == 2 || i == 3) {
          that.getContractEntrust(0);
        } else {
          that.getEntrustList(0);
        }

      },
      //下拉刷新
      onRefreshMake() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.conList = [];
        that.conTotal = 0;
        that.getContractEntrust(0);
      },
      //上拉加载更多
      onLoadMake() {
        let that = this;
        that.pageindex++;
        that.moreloading = true;
        that.getContractEntrust(1);
      },

      //获取委托列表
      getContractEntrust(t) {
        let that = this;
        // let l_type = (that.active).toString()
        var e_type = that.active == 3 ? 1 : that.active == 4 ? 3 : 0;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/queryContractEntrust",
            method: "post",
            data: {
              // token: window.localStorage.getItem("token"),
              page: that.pageindex,
              currency: that.area,
              symbol: that.symbol,
              type: e_type,
              size: 4,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              if (t == 0) {
                if (res.data.data.list.length > 0) {
                  that.conList = res.data.data.list;
                  that.conTotal = res.data.data.total;
                  if (that.conList.length >= that.conTotal) {
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
                  that.conList = that.conList.concat(res.data.data.list);

                  that.conTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.conList.length >= that.conTotal) {
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
              type: '2',
              symbol: that.area,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.asste = res.data.data[0];
              that.balance = that.asste.balance;
              // console.log(that.asste)
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
      },
      //获取杠杆倍数信息
      getMultiple() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/getContractLever",
            method: "get",
            data: {
              // type: '2',
              // symbol: that.symbol,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.multiple = res.data.data;
              // that.lever = res.data.data[0].multiple;
              // console.log(that.asste)
            } else {
              that.$vux.loading.hide();
              // that.$toast(res.data.message);
            }
          })
          .catch(function(error) {});
      },
      //持仓弹窗
      buyShow(i, item) {
        let that = this;
        // console.log(that.price)
        that.mode = i;
        if (that.certified !== 2) {
          that.auto_dlg = true;
          // return;
        } else {
          if (i == 0 || i == 1) {
            if (that.categoryIndex == 0) {
              if (!that.price || that.price == 0) {
                that.$toast("请输入正确价格");
              } else if (!that.number || that.number == '') {
                that.$toast("请输入数量");
              } else {
                that.pass_dlg = true;
              }
            } else if (that.categoryIndex == 1) {
              if (!that.number || that.number == 0) {
                that.$toast("请输入数量");
              } else {
                that.pass_dlg = true;
              }
            }
          } else {
            that.pos_info = item;
            that.depot_id = item.id;
            that.pass_dlg = true;
          }

        }
      },
      //持仓
      dealSubmit() {
        let that = this;
        var jsonData;
        if (that.mode == 0 || that.mode == 1) {
          if (that.categoryIndex == 0) {
            jsonData = {
              // token: localStorage.getItem("token"),
              symbol: that.symbol,
              direction: that.type2,
              mode: that.mode,
              area: that.area,
              price: that.price,
              number: that.number,
              entrustType: that.categoryIndex,
              loss_limit: that.loss_limit,
              stop_profit: that.stop_profit,
            };
          } else if (that.categoryIndex == 1) {
            jsonData = {
              // token: localStorage.getItem("token"),
              symbol: that.symbol,
              direction: that.type2,
              mode: that.mode,
              area: that.area,
              number: that.number,
              entrustType: that.categoryIndex,
              ratio: that.lever,
              loss_limit: that.loss_limit,
              stop_profit: that.stop_profit,
            };
          }

        } else if (that.mode == 2) {
          jsonData = {
            // token: localStorage.getItem("token"),
            symbol: that.pos_info.symbol,
            direction: '1',
            mode: that.pos_info.type,
            area: that.pos_info.currency,
            number: that.pos_info.number,
            entrustType: 1,
            depot_id: that.depot_id
          };
        }
        that.deal(jsonData);
      },
      deal(jsonData) {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/contractTrade",
            method: "post",
            data: jsonData
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(that.$t("succTip.s4"));
              // that.tradPwd = '';
              that.number = '';
              that.price = '';
              that.pass_dlg = false;
              that.getSocketBase(that.area, that.symbol);
              // that.getCoinInfo(that.area, that.symbol);
              that.getUserAssets();
              that.getMultiple();
              that.onRefresh();
              // that.onRefreshMake();
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
      },
      //转换数据格式
      checkPrice(price) {
        if (price) {
          price = Math.round(price);
          if (price < 1000) {
            price = Math.round(price);
          }
          if (price >= 1000 && price < 10000) {
            price = Math.round(price / 1000) + "k";
          }
          if (price >= 10000 && price < 1000000) {
            price = Math.round(price / 10000) + "w";
          }
          if (price >= 1000000) {
            price = Math.round(price / 1000000) + "m";
          }
        }
        return price;
      },
      //币币k线
      goConline() {
        let that = this;
        that.$router.push({
          path: '/contractKline',
          query: {
            area: that.area,
            symbol: that.symbol,
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    /deep/ .van-nav-bar .van-icon {
      color: #333;
      font-size: 0.4rem;
    }

    .van-nav-bar__right {
      height: 0.88rem;
    }

    span.iconfont {
      color: #333;
      font-size: 0.4rem;
    }

    .content {
      font-family: PingFang SC;
      overflow-y: scroll;
      padding: 0;
      height: calc(100% - 1rem);
      background: #f5f5f5;
      padding-bottom: 1rem;

      /deep/ .van-tab {
        color: #333 !important;
      }

      /deep/ .van-tab--active {
        color: #4163C7 !important;
      }

      .deal_content {
        width: 94%;
        margin: 0 auto;
        margin-top: 0.2rem;
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.32rem;

        .deal_left {
          background: #fff;
          width: 56%;
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

          .van-radio-group {
            display: flex !important;
            padding-left: 0.4rem;
            padding-top: 0.32rem;

            /deep/ .van-radio__icon--checked .van-icon {
              background: #4163C7 !important;
              border: none !important;
            }

            /deep/ .van-radio__icon .van-icon {
              // border: 1px solid #999999 !important;
            }

            /deep/ .van-radio {
              padding-right: 0.4rem !important;
            }

            /deep/ .van-radio__label {
              font-size: 0.24rem !important;
              color: #333 !important;
            }
          }

          .pr_type {
            width: 100%;
            margin-top: 0.28rem;
            display: flex;
            justify-content: space-between;

            p {
              width: 46%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              // background: #e8e8e8;
              border: 1px solid #e8e8e8;
              height: 0.66rem;
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
            margin: 0.2rem 0 0.2rem 0;

            span.cny_pirce {
              font-size: 0.26rem;
            }

            .now_price {
              width: 100%;
              height: 0.8rem;
              background: #1F2833;
              line-height: 0.8rem;
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


          }

          .deal_form .form_list {
            height: 0.8rem;
            margin-bottom: 0.12rem;
            position: relative;


          }

          .form_list2 {
            height: 0.8rem;
            background: #f5f5f5;
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
            // margin-top: 0.12rem;

            .list_info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.16rem 0;
              font-size: 0.28rem;
              color: #333;

              p {
                width: 60%;
                display: flex;
                align-items: center;
                border-radius: 0.08rem;
                border: 1px solid #e8e8e8;

                input {
                  width: 60%;
                  height: 0.66rem;
                  padding-left: 0.06rem;
                }

                a {
                  font-size: 0.24rem;
                }
              }
            }

          }

          .num_slider {
            width: 100%;
            padding: 0.4rem 0.12rem;
            position: relative;

            /deep/ .van-slider__button-wrapper {
              z-index: 999 !important;
            }

            /deep/ .van-slider__button {
              background: #1989fa !important;
              box-shadow: 0 1px 2px #1464a0;
            }

            .circle {
              display: inline-block;
              width: 90%;
              height: 0.2rem;
              // background: #DFDFDF;
              position: absolute;
              top: 0.34rem;
              z-index: 1;

              a {
                display: inline-block;
                width: 0.14rem;
                height: 0.14rem;
                background: #DFDFDF;
                border-radius: 50%;
                position: absolute;
                top: 0;

              }

              .active_bg {
                background: #1989fa;
              }

              a:nth-child(1) {
                left: 0;
              }

              a:nth-child(2) {
                left: 25%;
              }

              a:nth-child(3) {
                left: 50%;
              }

              a:nth-child(4) {
                left: 75%;
              }

              a:nth-child(5) {
                left: 100%;
              }
            }

            .percent {
              width: 108%;
              display: flex;
              justify-content: space-between;
              margin-right: 0.02rem;
              margin-top: 0.2rem;

              span {
                font-size: 0.24rem;
                color: #2C2C2C;
              }
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
                height: 0.66rem;
                margin: 0.12rem 0;
                line-height: 0.66rem;
                text-align: center;
                box-sizing: border-box;
                padding: 0;
                background: #4163C7;
                color: #fff;
                font-size: 0.28rem;
                border-radius: 0.08rem;
              }

              .btn .active {
                background: #01b782;
                color: white;
              }
            }
          }

          .z_price {
            width: 100%;
            height: 0.8rem;
            background: #01B782;
          }

          .submit_b {
            margin-top: 0.2rem;
            display: flex;
            justify-content: space-between;

            button {
              width: 44%;
              height: 0.66rem;
              background: #01B782;
              border: none;
              border-radius: 2rem;
              font-size: 0.28rem;
              color: #fff;
            }

            button:nth-child(2) {
              background: #E54777;
            }
          }
        }

        .deal_right {
          width: 44%;
          margin-left: 0.04rem;
          box-sizing: border-box;
          background: #fff;
          // padding-left: 0.26rem;
          padding: 0.2rem 0.2rem 0.4rem 0.2rem;

          // background: #1a212a;
          // margin-left: 0.02rem;
          .right_title {
            text-align: center;
            margin-bottom: 0.2rem;

            .title_money {
              display: flex;
              flex-direction: column;
              color: #01b782;

              .big_text {
                font-size: 0.52rem;
              }

              .s_text {
                font-size: 0.26rem;
              }
            }
          }

          .deal_list {
            width: 100%;
            box-sizing: border-box;
            margin-top: 0.26rem;

            .or_title {
              width: 100%;
              display: flex;
              padding: 0.22rem 0rem;
              margin-bottom: 0.22rem;
              border-radius: 0.08rem;

              span {
                display: inline-block;
                text-align: center;
                font-size: 0.28rem;
                font-weight: normal;
                width: 50%;
              }

              span:nth-child(1) {
                text-align: left;
              }

              span:nth-child(2) {
                text-align: right;
              }

            }

            .or_list {
              height: 3rem;

              .deal_sell {
                display: flex;
                // padding-top: 0.16rem;
                width: 100%;
                height: 0.6rem;
                line-height: 0.6rem;
                color: #555;

                // padding: 0 0.04rem;
                span {
                  display: inline-block;
                  // width: 33.334%;
                  text-align: center;
                  font-size: 0.28rem;
                  width: 50%;
                }

                span:nth-child(1) {
                  text-align: left;
                }

                span:nth-child(2) {
                  text-align: right;
                }

                //
                //                 span:nth-child(3) {
                //                   text-align: right;
                //                   width: 35%;
                //                   padding-right: 0.12rem;
                //                 }
              }

              .no_data {
                width: 100%;
                text-align: center;
                margin-top: 0.4rem;

                img {
                  width: 1.8rem;
                }

                span {
                  display: block;
                  font-size: 0.24rem;
                  color: #888;
                  padding-top: 0.2rem;
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
                bottom: 0.6rem;
              }

              .deal_sell:nth-child(3) {
                bottom: 1.2rem;
              }

              .deal_sell:nth-child(4) {
                bottom: 1.8rem;
              }

              .deal_sell:nth-child(5) {
                bottom: 2.4rem;
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

      .entrust2 {
        /deep/ .van-tabs__nav {
          background: none !important;
        }

        /deep/ .van-tabs__line {
          display: none !important;
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
          margin-top: 0.16rem;

          // background: rgba(0, 0, 0, 0.06);
          /deep/ .van-pull-refresh__head {
            z-index: -1 !important;
          }

          .acc_list {
            width: 94%;
            margin: 0.2rem auto;
            background: #fff;
            border-radius: 0.08rem;
            margin-bottom: 0.2rem;
            font-family: PingFang SC;
            padding: 0.14rem;

            p.deal_tit {
              padding: 0.2rem 0;
              display: flex;
              justify-content: space-between;
              align-items: center;

              span {
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


              span.times {
                color: #333;
                font-weight: normal;
                font-size: 0.26rem;
              }
            }

            .scroll_x {

              overflow-x: scroll;

              .acc_con {
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding-bottom: 0.2rem;

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
                      // padding: 0.12rem 0;
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
    }
  }
</style>
