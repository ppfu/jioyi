<template>
  <div class="public">
    <van-nav-bar :title="symbol +'/' + area" left-arrow @click-left="back">
      <van-icon v-if="collect == '0' " name="star-o" slot="right" @click="optional" />
      <van-icon v-if="collect == '1' " name="star" color="#4163C7" @click="unOptional" slot="right" />
    </van-nav-bar>
    <div class="content">
      <div class="data_now">
        <!--   <div class="select">
          <span>当前价</span>
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="coinList" @change="seletChangeRe(value1)" />
          </van-dropdown-menu>
        </div> -->
        <div class="coin_data">
          <div class="data_left">
            <p>
              <span v-if="Number(coinCurrent.ratio) < 0" style="color:#E12961 ;">{{coinCurrent.price}}</span>
              <span v-if="Number(coinCurrent.ratio) >= 0" style="color:#0AB480 ;">{{coinCurrent.price}}</span>
              <a></a></p>
           <!-- <span v-if="Number(coinCurrent.range) < 0" style="color:#E12961 ;">≈{{coinCurrent.cny_number}}CNY</span>
            <span v-if="Number(coinCurrent.range) >= 0" style="color:#0AB480 ;">≈{{coinCurrent.cny_number}}CNY</span> -->
             <p>
              <span v-if="Number(coinCurrent.ratio) < 0" style="color:#E12961 ;">≈{{coinCurrent.cny_number}}CNY</span>
              <span v-if="Number(coinCurrent.ratio) >= 0" style="color:#0AB480 ;">≈{{coinCurrent.cny_number}}CNY</span>
              <span v-if="Number(coinCurrent.ratio) < 0" style="color:#E12961 ;">{{coinCurrent.ratio}}%</span>
              <span v-if="Number(coinCurrent.ratio) >= 0" style="color:#0AB480 ;">+{{coinCurrent.ratio}}%</span>
            </p>
          </div>
          <div class="data_right">
            <p><span>{{$t('kline.k1')}}:</span><span>{{coinCurrent.high}}</span></p>
            <p><span>{{$t('kline.k2')}}:</span><span>{{coinCurrent.low}}</span></p>
            <p><span>24H:</span><span>{{coinCurrent.volume}}</span></p>
            <!-- <p v-if="change_type == 1"><span style="color: #0AB480;">涨幅:</span><span style="color: #0AB480;">{{coinInfo.change_hourly}}</span></p>
            <p v-if="change_type == 0"><span style="color: #D14B64;">涨幅:</span><span style="color: #D14B64;">{{coinInfo.change_hourly}}</span></p> -->
          </div>
        </div>
      </div>
      <div class="sele_time">
        <span v-for="(item,index) in sele_time" :key="index" :class="deIndex == index ? 'active1':''" @click="designate(item,index)">{{item.name}}</span>
        <!-- <van-icon name="underway" /> -->
      </div>
      <div class="chart_div">
        <!-- 为ECharts准备一个具备大小（宽高）的DOM -->
        <div id="kline" style="height:100%"></div>
      </div>
      <div class="data_btn">
        <span @click="goBuy(area,symbol,0)">{{$t('coinTran.left.e1')}}</span>
        <span @click="goSell(area,symbol,1)">{{$t('coinTran.left.e2')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    XDialog
  } from "vux";
  import echarts from "echarts";
  export default {
    data() {
      return {
        active: 0,
        value1: this.$route.query.coin_index, //选中的虚拟币种
        k_type: 1,
        o_type: 1,
        t_info: {},
        b_list: [],
        s_list: [],
        l_list: [],
        b_total: 0,
        s_total: 0,
        change_type: 0,
        coinInfo: '', //虚拟币详情
        price_usd: '', //美元价格
        price_cny: '', //人民币价格
        high: '', //最高价
        low: '', //最低价
        coin_id: this.$route.query.coin_id, //虚拟币id
        coinList: [], //虚拟币列表
        deIndex: 0,
        time_type: 60,
        sele_time: [{
            id: "1",
            name: "1" + this.$t('kline.k7'),
            range: 60
          },
          {
            id: "2",
            name: "5" + this.$t('kline.k7'),
            range: 300
          },
          {
            id: "3",
            name: "15" + this.$t('kline.k7'),
            range: 900
          },
          {
            id: "4",
            name: "30" + this.$t('kline.k7'),
            range: 1800
          },
          {
            id: "5",
            name: "1" + this.$t('kline.k8'),
            range: 3600
          },
        ],

        area: this.$route.query.area || "USDT",
        symbol: this.$route.query.symbol || "BTC",
        coinCurrent: {},
        collect: '',

      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      that.getSocketBase(that.time_type);
      that.ifCollect();
      // that.getCoinInfoById();
      // // that.getUserTeam()
      // that.kline();
        window.t = setInterval(() => {
        setTimeout(that.getSocketBase(that.time_type), 0)
      }, 3000)

    },
     beforeDestroy() {
      //  清楚定时器
      clearInterval(window.t)
    },
    methods: {
      back() {
        this.$router.back();
      },
      //去买入
      goBuy(area, symbol, i) {
        let that = this;
        that.$router.push({
          path: '/coinDeal',
          query: {
            area: area,
            symbol: symbol,
            type: i
          }
        })
      },
      //去卖出
      goSell(area, symbol, i) {
        let that = this;
        that.$router.push({
          path: '/coinDeal',
          query: {
            area: area,
            symbol: symbol,
            type: i
          }
        })
      },

      //选择时间
      designate(item, i) {
        let that = this;
        that.deIndex = i;
        var timeType = item.range;
        that.time_type = timeType;
        // console.log(that.time_type);
        that.getSocketBase(that.time_type);
      },
      //获取对应交易区币对涨幅(币币
      getSocketBase(range) {
        let that = this;
        let agentData = {
          symbol: that.symbol,
          area: that.area,
          method: "coin_price_kline",
          range: range
        };
        // console.log(that.coinData)
        that.socketApi.sendSock(agentData, that.getData);
      },
      getData(res) {
        let that = this;
        // console.log(res,1)
        if (res.status == 1) {
          that.coinCurrent = res.data.coinCurrent;
          that.coinCurrent.price = that.checkPrice(that.coinCurrent.price);
          that.coinCurrent.cny_number = that.checkPrice(that.coinCurrent.cny_number);
          that.coinCurrent.high = that.checkPrice(that.coinCurrent.high);
          that.coinCurrent.low = that.checkPrice(that.coinCurrent.low);
          that.coinCurrent.volume = that.checkPrice(that.coinCurrent.volume);
          that.coinCurrent.range = that.checkPrice(that.coinCurrent.range);
          // that.coinCurrent.price = that.coinCurrent.price;
          // that.coinCurrent.cny_number = that.coinCurrent.cny_number;
          // that.coinCurrent.high = that.coinCurrent.high;
          // that.coinCurrent.low = that.coinCurrent.low;
          // that.coinCurrent.volume = that.coinCurrent.volume;
          // that.coinCurrent.range = that.coinCurrent.range;
          var all_data = that.build_all_data(res.data.kline);
          var data = that.splitData(all_data);
          // console.log(data)
          that.build_kline(data);
        } else {

        }
      },
      //自选
      optional() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/userCollectAdd/" + that.symbol + '/' + that.area,
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
              // id: id,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(res.data.message);
              that.ifCollect();
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

          });
      },
      //取消自选
      unOptional() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/userCollectDel/" + that.symbol + '/' + that.area,
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
              // id: id,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.$toast.success(res.data.message);
              that.ifCollect();
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

          });
      },
      //获取是否添加自选状态
      ifCollect() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/ifCollect/" + that.symbol + '/' + that.area,
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
              // id: id,
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.collect = res.data.data.ifCollect;
              console.log(that.collect)
            } else {
              that.$vux.loading.hide();
              // that.$toast.fail(res.data.message);

            }
          })
          .catch(function(error) {

          });
      },
      //转换数据格式
      checkPrice(price) {
        if (price) {
          price = parseFloat(price).toFixed(2);
          // if (price < 1000) {
          //   price = parseFloat(price).toFixed(4);
          // }
          // if (price >= 1000 && price < 10000) {
          //   price = parseFloat(price / 1000).toFixed(4) + "k";
          // }
          // if (price >= 10000 && price < 1000000) {
          //   price = parseFloat(price / 10000).toFixed(4) + "w";
          // }
          // if (price >= 1000000) {
          //   price = parseFloat(price / 1000000).toFixed(4) + "m";
          // }
        }
        return price;
      },
      // 时间戳 转化为时间
      timesToTime(timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        if (date.getHours() < 10) {
          var h = "0" + date.getHours() + ":";
        } else {
          var h = date.getHours() + ":";
        }
        if (date.getMinutes() < 10) {
          var m = "0" + date.getMinutes() + ":";
        } else {
          var m = date.getMinutes() + ":";
        }
        var s = date.getSeconds();
        if (s == 0) {
          s = "00";
        } else if (s < 10) {
          s = "0" + s;
        }
        return Y + M + D + h + m + s;
      },
      /*****************计算macd**************macd*/
      //指标参数m_short,m_long  data数据
      build_diff(m_short, m_long, data) {
        var result = [];
        var pre_emashort = 0;
        var pre_emalong = 0;
        for (var i = 0; i < data.length; i++) {
          var ema_short = data[i][2]; //收盘价
          var ema_long = data[i][2]; //收盘价
          if (i != 0) {
            ema_short =
              (1.0 / m_short) * data[i][2] + (1 - 1.0 / m_short) * pre_emashort;
            ema_long =
              (1.0 / m_long) * data[i][2] + (1 - 1.0 / m_long) * pre_emalong;
          }
          pre_emashort = ema_short;
          // console.log(pre_emalong,pre_emashort)
          pre_emalong = ema_long;
          var diff = parseInt((ema_short - ema_long) * 100) / 100;
          result.push(diff);

        }
        return result;
        // console.log(result)
      },
      //指标3 长度
      build_dea(m, diff) {
        var result = [];
        var pre_ema_diff = 0;
        for (var i = 0; i < diff.length; i++) {
          var ema_diff = diff[i];
          if (i != 0) {
            ema_diff = (1.0 / m) * diff[i] + (1 - 1.0 / m) * pre_ema_diff;
          }
          pre_ema_diff = ema_diff;
          ema_diff = parseInt(ema_diff * 100) / 100;
          result.push(ema_diff);
        }
        return result;
      },
      //计算 MACD
      build_macd(data, diff, dea) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
          var macd = 2 * (diff[i] - dea[i]);
          macd = parseInt(macd * 100) / 100;
          result.push(macd);
        }
        return result;
      },
      /*****************计算macd***************/
      build_all_data(res) {
        let that = this;
        var line_data = [];
        for (var i = 0; i < res.length; i++) {
          //数据模型 time0 open1 close2 min3 max4 vol5
          //var time = timestampToTime(res[i].Date);
          var time = res[i][0];
          var line_arr = [
            time,
            res[i][1],
            res[i][2],
            res[i][3],
            res[i][4],
            res[i][5]
          ];
          line_data.push(line_arr);
        }
        // console.log(line_data)
        var diff = that.build_diff(12, 26, line_data);
        var dea = that.build_dea(9, diff);
        var macd = that.build_macd(line_data, diff, dea);
        var all_data = [];
        for (var i = 0; i < line_data.length; i++) {
          //数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
          var arr = [
            line_data[i][0],
            line_data[i][1],
            line_data[i][2],
            line_data[i][3],
            line_data[i][4],
            line_data[i][5],
            macd[i],
            diff[i],
            dea[i]
          ];
          all_data.push(arr);
        }
        return all_data;
      },
      //数组处理  //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
      splitData(rawData) {
        let that = this;
        var type = Number(that.s_type);
        var datas = [];
        var times = [];
        var vols = [];
        var macds = [];
        var difs = [];
        var deas = [];
        for (var i = 0; i < rawData.length; i++) {
          datas.push(rawData[i]); //除了日期全部数据
          vols.push(parseInt(rawData[i][5])); // 量
          macds.push(rawData[i][6]);
          difs.push(rawData[i][7]);
          deas.push(rawData[i][8]);
          //splice 返回每组数组中被删除的第一项，即返回数组中被删除的日期
          //alert(rawData[i].splice(0, 1)[0]);
          //times 日期  把返回的日期放到times[]数组中
          var time = that.timesToTime(rawData[i].splice(0, 1)[0]);
          times.push(time); //日期
        }
        // if (type !== 1 && type !== 2 && type !== 3) {
        //   var time1 = [];
        //   $.each(times, function(i, item) {
        //     var arr = item.split(" ");
        //     time1.push(arr[1]);
        //   });
        //   times = time1;
        // }
        return {
          datas: datas, //数组中的数据 y轴对应的数据
          times: times, //数组中的日期 x轴对应的日期
          vols: vols,
          macds: macds,
          difs: difs,
          deas: deas
        };
      },

      //MA计算公式  //计算MA平均线，N日移动平均线=N日收盘价之和/N  dayCount要计算的天数(5,10,20,30)
      calculateMA(dayCount, data) {
        var result = [];

        for (var i = 0, len = data.times.length; i < len; i++) {
          if (i < dayCount) {
            result.push("-");
            continue; //结束单次循环，即不输出本次结果
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            //前5天收盘价总和
            sum += parseFloat(data.datas[i - j][1]);
          }

          result.push((sum / dayCount).toFixed(4));
        }
        return result;
      },

      build_kline(data) {
        let that = this;
        var option = {
          backgroundColor: "transparent", //全图默认背景 设置为透明的
          tooltip: { //提示框
            show: true,
            trigger: "axis", //触发类型：坐标轴触发
            axisPointer: { //坐标轴指示器配置项
              type: "cross", //指示器类型，十字准星
              lineStyle: { //lineStyle设置直线指示器
                type: "dashed",
                color: "#9394a3"
              },
              crossStyle: { //crossStyle设置十字准星指示器
                type: "dashed",
                color: "#9394a3"
              },
              label: { //标注的文本 背景
                show: true,
                precision: 2,
                backgroundColor: "#585858"
              }
            },
            textStyle: { //文本样式
              color: "white",
              fontSize: "12"
            },
            backgroundColor: "transparent", //
            showContent: true,
            position: [0, 0], //提示框位置
            formatter: function(params) {
              //seriesIndex 系列图表索引
              if (params[0].seriesIndex == 0) {
                return (
                  that.$t('kline.k3') +
                  params[0].name +
                  "&nbsp;&nbsp;&nbsp;" +
                  that.$t('kline.k4') +
                  params[0].data[5] +
                  "<br/>" +
                  that.$t('kline.k5') +
                  params[0].data[1] +
                  " &nbsp;&nbsp;" +
                  that.$t('kline.k1') +
                  params[0].data[4] +
                  " &nbsp;&nbsp;" +
                  that.$t('kline.k2') +
                  params[0].data[3] +
                  " &nbsp;&nbsp;" +
                  that.$t('kline.k6') +
                  params[0].data[2] +
                  "<br/>"
                );
              } else {
                return (
                  that.$t('kline.k3') +
                  params[1].name +
                  "&nbsp;&nbsp;&nbsp;" +
                  that.$t('kline.k4') +
                  params[1].data[5] +
                  "<br/>" +
                  that.$t('kline.k5') +
                  params[1].data[1] +
                  " &nbsp;&nbsp;" +
                  that.$t('kline.k1') +
                  params[1].data[4] +
                  " &nbsp;&nbsp;" +
                  that.$t('kline.k2') +
                  params[1].data[3] +
                  " &nbsp;&nbsp;" +
                  that.$t('kline.k6') +
                  params[1].data[2] +
                  "<br/>"
                );
              }
            },
            crossStyle: {
              opacity: 1
            }
          },
          axisPointer: { //坐标轴指示器配置项。
            link: {
              xAxisIndex: "all"
            }
          },
          grid: [ //直角坐标系
            {
              left: "5%",
              right: "50",
              height: "58%",
              top: "10px"
            },
            {
              left: "5%",
              right: "50",
              top: "66%",
              height: "26%"
            }
          ],
          xAxis: [ //横坐标
            //第一个图表配置
            {
              type: "category", //坐标轴类型，类目轴
              data: data.times, //日期
              scale: true, //只在数字轴中有效
              boundaryGap: true, //刻度作为分割线，标签和数据点会在两个刻度上
              axisLine: { //坐标轴轴线相关设置。
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,0.7)"
                }
              },
              splitLine: { //是否显示坐标轴轴线 (与坐标刻度垂直的线)
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLabel: {
                show: false
              },
              axisTick: { //坐标刻度
                show: true
              },
              splitNumber: 20, //坐标轴的分割段数，预估值，在类目轴中无效
              min: "dataMin", //特殊值，数轴上的最小值作为最小刻度
              max: "dataMax", //特殊值，数轴上的最大值作为最大刻度
              axisPointer: {
                label: {
                  show: true
                }
              }
            },

            //第二个图表横坐标配置
            {
              type: "category",
              gridIndex: 1,
              boundaryGap: true,
              data: data.times,
              axisLabel: {
                show: true
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              axisPointer: {
                label: {
                  show: true
                }
              },
              axisTick: {
                show: true
              }
            }
          ],

          yAxis: [ //y坐标
            //第一个图表
            {
              scale: true,
              position: "right",
              boundaryGap: true,
              splitArea: {
                show: false
              },
              axisLine: { // 轴线样式
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              splitLine: { //是否显示坐标轴轴线 (与坐标刻度垂直的线)
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              }
            },
            //第二个表
            {
              gridIndex: 1,
              splitNumber: 3, //坐标轴的分割段数，预估值，在类目轴中无效
              position: "right",
              boundaryGap: true,
              axisLine: {
                onZero: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLabel: {
                show: true
              }
            }
          ],
          dataZoom: [{
            type: "inside", // 这个dataZoom组件，默认控制x轴。
            xAxisIndex: [0, 1], // 表示这个 dataZoom 组件控制 第一个 和 第二个 xAxis
            startValue: data.times.length > 30 ? data.times.length - 30 : 0, //左边开始的数据
            endValue: data.times.length - 1 //右边结束的数据
          }],
          series: [ //y轴数据
            {
              name: "K线周期图表(matols.com)", //（第一个图表）
              type: "candlestick", //k线图
              data: data.datas, //数据
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,0,0,.3)", //是否显示坐标轴轴线 (与坐标刻度垂直的线)
                  type: "dashed"
                }
              },
              itemStyle: { //表内多边形设置样式
                normal: {
                  color: "#d40469",
                  color0: "#01b782",
                  borderColor: "#d40469",
                  borderColor0: "#01b782",
                  opacity: 1
                }
              }
            },
            {
              name: "MA5", //5日移动平均线，指最近五个交易日股票收盘价的平均价。
              type: "line",
              data: that.calculateMA(5, data),
              smooth: true, //平滑曲线显示，smooth为true时lineStyle不支持虚线
              symbol: "none", //标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
              hoverAnimation: false,
              showSymbol: false,
              showAllSymbol: false,
              lineStyle: {
                type: "solid"
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              itemStyle: {
                type: "solid"
              }
            },
            {
              name: "Volumn", //第二个图表
              type: "bar",
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: data.vols,
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              itemStyle: {
                normal: {
                  color: function(params) {

                    // console.log(data.datas)

                    var colorList;
                    if (data.datas.length <= 1) {
                      colorList = "#01b782";
                      return colorList;
                    } else {
                      if (params.dataIndex == 0) {
                        if (data.datas[1][1] > data.datas[0][1]) {
                          colorList = "#01b782";
                        } else {
                          colorList = "#d40469";
                        }
                        return colorList;
                      }
                      if (params.dataIndex != 0) {
                        if (
                          data.datas[params.dataIndex][1] >
                          data.datas[params.dataIndex - 1][1]
                        ) {
                          colorList = "#d40469";
                        } else {
                          colorList = "#01b782";
                        }
                        return colorList;
                      }
                    }

                  }
                }
              }
            }
          ]
        };
        var myChart = echarts.init(document.getElementById("kline")); //初始化图表
        myChart.clear(option);
        myChart.setOption(option, true);
      },

      //数组处理
      splitData1(rawData) {
        var times = [];
        var price = [];
        var vols = [];
        var datas = [];
        for (var i = 0; i < rawData.length; i++) {
          datas.push(rawData[i]);
          price.push(parseFloat(rawData[i].close));
          vols.push(parseInt(rawData[i].vol));
          times.push(rawData[i].time.split(" ")[1]);
        }
        return {
          datas: datas,
          times: times,
          price: price,
          vols: vols
        };
      },
      build_timeline(data) {
        let that = this;
        var option = {
          animation: false,
          tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
              type: "cross",
              lineStyle: {
                type: "dashed",
                color: "#9394a3"
              },
              crossStyle: {
                type: "dashed",
                color: "#9394a3"
              },
              label: {
                show: true,
                precision: 2,
                backgroundColor: "#585858"
              }
            },
            textStyle: {
              color: "white",
              fontSize: "12"
            },
            backgroundColor: "transparent",
            showContent: true,
            position: [0, 0],
            formatter: function(params) {
              var time = params[0].name;
              var price = params[1].value;
              var vols = params[0].value;
              return (
                "时间" +
                time +
                "&nbsp;&nbsp;" +
                "价格" +
                price +
                "<br>" +
                "量" +
                vols
              );
            },
            crossStyle: {
              opacity: 1
            }
          },
          axisPointer: {
            link: {
              xAxisIndex: "all"
            }
          },
          grid: [{
              left: "20%",
              right: "50",
              height: "58%",
              top: "20"
            },
            {
              left: "4%",
              right: "50",
              top: "62%",
              height: "26%"
            }
          ],
          xAxis: [{
              type: "category",
              data: data.times,
              scale: true,
              boundaryGap: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.4)"
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitNumber: 20,
              min: "dataMin",
              max: "dataMax",
              axisPointer: {
                label: {
                  show: false
                }
              }
            },
            {
              type: "category",
              gridIndex: 1,
              boundaryGap: true,
              data: data.times,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              axisLabel: {
                show: true
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              }
            }
          ],
          yAxis: [{
              scale: true,
              position: "right",
              boundaryGap: true,
              splitArea: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              }
            },
            {
              gridIndex: 1,
              splitNumber: 3,
              position: "right",
              boundaryGap: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.7)"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,0,0,.3)",
                  type: "dashed"
                }
              },
              axisLabel: {
                show: true
              }
            }
          ],
          dataZoom: [{
            type: "inside",
            xAxisIndex: [0, 1],
            startValue: data.times.length > 30 ? data.times.length - 30 : 0,
            endValue: data.times.length - 1
          }],
          series: [{
              name: "price",
              type: "line",
              smooth: true,
              data: data.price,
              hoverAnimation: false,
              showSymbol: false,
              showAllSymbol: false,
              itemStyle: {
                normal: {
                  color: "#ccc"
                }
              },
              areaStyle: {
                //区域填充样式
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: "rgba(255,255,255,.5)"
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255,.2)"
                      }
                    ],
                    globaCoord: false
                  }
                }
              }
            },
            {
              name: "Volumn",
              type: "bar",
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: data.vols,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList;
                    if (params.dataIndex == 0) {
                      if (data.datas[1].close > data.datas[0].close) {
                        colorList = "#01b782";
                      } else {
                        colorList = "#d40469";
                      }
                    }
                    if (params.dataIndex != 0) {
                      if (
                        data.datas[params.dataIndex].close >
                        data.datas[params.dataIndex - 1].close
                      ) {
                        colorList = "#d40469";
                      } else {
                        colorList = "#01b782";
                      }
                    }
                    return colorList;
                  }
                }
              }
            }
          ]
        };
        var myChart = echarts.init(document.getElementById("kline"));
        myChart.clear(option);
        myChart.setOption(option, true);
      }

    }
  }
</script>

<style lang="less" scoped>
  .public {
    width: 100%;
    height: 100%;
    background: #181D30;

    .van-nav-bar .van-icon {
      font-size: 0.4rem;
      color: #fff;
    }

    .van-nav-bar {
      background: #181D30 !important;
    }

    .van-nav-bar__title {
      color: #f5f5f5 !important;
    }

    .van-icon-arrow-left:before {
      color: #f5f5f5 !important;
    }

    .content {
      font-family: PingFang SC;

      // height: 100vh;
      .data_now {
        // margin-top: 0.28rem;

        .select {
          display: flex;
          align-items: center;

          span {
            font-family: PingFang SC;
            color: rgba(96, 112, 138, 1);
            font-size: 0.26rem;
            padding-right: 0.12rem;
          }

          .van-dropdown-menu {
            background: #212548 !important;
            height: 0.6rem !important;
            width: 40%;
            border-radius: 0.08rem;
          }

          /deep/ .van-dropdown-menu__title {
            color: #7883A5 !important;
            font-size: 0.26rem;
          }

          /deep/ .van-popup {
            background: #212548 !important;
            width: 36.6%;
            border-radius: 0.12rem;
            left: 16%;
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
        }

        .coin_data {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // margin-top: 0.26rem;

          .data_left {
            width: 48%;
            height: 1.6rem;
            font-family: PingFang SC;
            color: rgba(10, 180, 128, 1);
            background: rgba(46, 52, 77, 0.6);
            padding: 0.2rem 0.2rem 0.2rem 0.2rem;
            border-radius: 0.08rem;

            p {
              span {
                font-size: 0.46rem;
                font-weight: normal;
              }

              a {
                font-size: 0.26rem;
                padding-left: 0.06rem;
              }
            }
             p:nth-child(2){
               span {
                font-size: 0.24rem;
              }
                span:nth-child(2) {
                font-size: 0.24rem;
                padding-left: 0.12rem;
              }
            }

            span {
              font-size: 0.26rem;
            }
          }

          .data_right {
            width: 48%;
            height: 1.6rem;
            background: rgba(46, 52, 77, 0.6);
            padding: 0.08rem 0.32rem 0.08rem 0.2rem;
            border-radius: 0.08rem;

            p {
              width: 100%;
              font-size: 0.24rem;
              margin: 0.12rem 0;
              display: flex;
              justify-content: space-between;
              color: rgba(255, 255, 255, 0.68);

              // text-align: right;
              span:nth-child(1) {
                // width: 0.6rem;

              }

              span:nth-child(2) {

                padding-left: 0.08rem;
              }
            }
          }
        }

      }

      .sele_time {
        padding: 0.26rem 0;
        display: flex;
        justify-content: space-between;

        span {
          display: inline-block;
          padding: 0 0.18rem;
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.28rem;
        }

        span.active1 {
          color: #35A8FB;
        }

        // /deep/ .van-icon{
        //    font-size: 0.36rem;
        //    color: #85C3F5;
        //    padding: 0 0.1rem;
        //    // padding-top: 0.06rem;
        //  }
      }

      .chart_div {
        margin-top: 0.08rem;
        height: 8.6rem;
        overflow-y: scroll;

      }

      .data_btn {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: rgba(46, 52, 77, 0.6);

        span {
          display: inline-block;
          width: 42%;
          height: 0.74rem;
          line-height: 0.74rem;
          display: inline-block;
          border-radius: 2rem;
          text-align: center;
          font-size: 0.30rem;
          font-family: PingFang SC;
          color: rgba(255, 255, 255, 1);
        }

        span:nth-child(1) {
          background: #0AB480;
        }

        span:nth-child(2) {
          background: #E12961;
        }

      }
    }
  }
</style>
