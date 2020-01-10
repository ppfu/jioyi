<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view name="main" class="main"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" name="main" class="main"></router-view>
    </transition>
    <keep-alive>
      <router-view name="footer"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import "./assets/iconfont/iconfont.css";
  import "./base/css/common.css";
  export default {
    name: "App",
    data() {
      return {
        transitionName: "",
        timedown: this.arr
      };
    },
    created() {
      // 此举是防止浏览器刷新造成vuex数据丢失
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    },
    watch: {
      // 使用watch 监听$router的变化
      $route(to, from) {
        clearInterval(window.t);
        clearInterval(window.t1);
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.fullPath.indexOf("index") == -1) {
          clearInterval(window.tt0);
          clearInterval(window.tt1);
        }
        if (!(to.meta.none == "true" && from.meta.none == "true")) {
          if (to.meta.index > from.meta.index) {
            //设置动画名称
            this.transitionName = "slide-left";
          } else {
            this.transitionName = "slide-right";
          }
        } else {
          this.transitionName = "";
        }
      }
    },
    components: {},
    mounted() {
      let that = this;
      // window.document.oncontextmenu = function() {
      //   //屏蔽右键事件
      //   return false;
      // };
      document.addEventListener("plusready", function() {
        var webview = plus.webview.currentWebview();
        plus.key.addEventListener("backbutton", function() {
          webview.canBack(function(e) {
            if (that.$route.path == "/home" || that.$route.path == "/fiatDeal" || that.$route.path == "/contractDeal" || that.$route.path ==
               "/coinDeal" || that.$route.path == "/mine") {
             if (e.canBack) {
               webview.close(); //hide,quit
               plus.runtime.quit();
             } else {
               webview.close(); //hide,quit
               plus.runtime.quit();
               }
             } else {
               if (e.canBack) {
                 webview.back();
               };
               // webview.back();
             }
			 // else {
    //           webview.close(); //hide,quit
    //           plus.runtime.quit();
    //           document.plusReady(function() {
    //             //首页返回键处理
    //             //处理逻辑：1秒内，连续两次按返回键，则退出应用；
    //             var first = null;
    //             plus.key.addEventListener(
    //               "backbutton",
    //               function() {
    //                 //首次按键，提示‘再按一次退出应用’
    //                 if (!first) {
    //                   first = new Date().getTime();
    //                   alert("再按一次退出应用");
    //                   setTimeout(function() {
    //                     first = null;
    //                   }, 1000);
    //                 } else {
    //                   if (new Date().getTime() - first < 1500) {
    //                     plus.runtime.quit();
    //                   }
    //                 }
    //               },
    //               false
    //             );
    //           });
    //         }
          });
        });
      });
    },
    methods: {
      reload() {
        let that = this;
        that.$route.meta.keepAlive = true
        that.$nextTick(function() {
          that.$route.meta.keepAlive = false
        })
      }

    }
  };
</script>

<style>
  @import "./assets/iconfont/iconfont.css";

  #app {
    width: 100%;
    height: 100%;
  }


  .main_content {
    position: fixed;
    width: 100%;
    height: calc(100% - 2rem);
    overflow-y: scroll;
    overflow-x: hidden;
    top: 0.8rem;
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 0 4%;
  }

  .van-toast {
    z-index: 999999 !important;
    background: #333333 !important;
    color: #fff !important;
  }

  .van-toast .van-loading__spinner {
    color: #fff !important;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .van-action-sheet__header {
    padding: 0.2rem 4% !important;
    font-size: 0.24rem !important;
    font-family: PingFang SC !important;
    color: rgba(157, 157, 157, 1) !important;
    line-height: 0.4rem !important;
  }

  .van-icon-close:before {
    display: none !important;
  }

  .van-action-sheet__item {
    color: #EA5656 !important;
  }


  input {
    color: #333 !important;
  }

  input::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.42) !important;
  }

  .waiting input::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.42) !important;
  }

  .waiting input {
    color: rgba(0, 0, 0, 0.42) !important;
  }

  .curr_con {

    text-align: left;
    padding: 0.46rem 0.26rem;
    font-weight: normal;
  }

  .curr_con .no_data {
    text-align: center;
    margin-top: 1rem;
  }

  .curr_con .no_data img {
    width: 2.6rem;
    height: auto;
  }

  .curr_con .no_data span {
    display: block;
    font-size: 0.28rem;
    padding: 0.2rem 0;
  }

  .van-tab__pane,
  .van-tab__pane-wrapper {
    margin-top: 0.2rem;
  }

  .curr_con p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.28rem;
    padding: 0.18rem 0;

  }

  .curr_con p span:nth-child(1) a {
    font-size: 0.28rem;
    color: #666;
  }
  .curr_con2 p span:nth-child(2),
  .curr_con p span:nth-child(3) {
    display: block;
    background: rgba(1, 183, 130, 0.4);
    /* padding: 0.046rem 0.2rem; */
    width: 1.2rem;
    text-align: center;
    height: 0.52rem;
    line-height: 0.52rem;
    border-radius: 2rem;
    font-size: 0.26rem;
  }

  .van-action-sheet {
    max-height: 50% !important;
    color: #323233;
  }

  .van-action-sheet__item {
    color: #333 !important;
    font-size: 0.26rem;
  }
</style>
