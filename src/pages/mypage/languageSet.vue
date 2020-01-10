<template>
  <div class="public">
    <van-nav-bar :title="$t('mine.set.lanSet')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="account">
        <div class="acc_list" @click="changeLang('cn')">
          <img src="../../assets/img/ch.png">
          <div class="acc_top">
            <div class="cash_info">
              <p><span>{{$t('ch')}}</span></p>
            </div>
            <span v-if="$store.state.lang == 'cn'" class="iconfont icon-tabduihao"></span>
          </div>
        </div>
        <div class="acc_list"  @click="changeLang('en')">
          <img src="../../assets/img/eng.png">
          <div class="acc_top">
            <div class="cash_info">
              <p><span>{{$t('en')}}</span></p>
            </div>
           <span v-if="$store.state.lang == 'en'" class="iconfont icon-tabduihao"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        payTypeInfo: {},
        lang : '',
      }
    },
    mounted() {
      let that = this;
    },
    methods: {
      back() {
        this.$router.back();
      },
        //更换语言
      changeLang(l) {
        let that = this;
        that.setLang(l);

        if(that.$store.state.lang == "cn"){
          that.lang = 1;
        }else if(that.$store.state.lang == "en") {
          that.lang = 2;
        }
         console.log(that.lang)

        that
          .$http({
            url: "/setLanguage/" + that.lang,
            method: "GET",
            // data: {
            //   lang: that.$store.state.lang
            // }
          })
          .then(function(res) {
            if(res.data.status == 1){
               that.back();
            }

          });
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {

    .content {
      padding: 0.2rem 4%;
      height: calc(100% - 0.80rem);
      background: rgba(0, 0, 0, 0.04);

      .account {
        margin-top: 0.2rem;

        .acc_list {
          padding: 0.32rem 4%;
          background: #fff;
          border-radius: 0.08rem;
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;
            img {
              display: inline-block;
              width: 0.54rem;
              height: 0.54rem;
            }

          .acc_top {
            flex: 1;
            padding-left: 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .cash_info {
              p {
                display: flex;
                align-items: baseline;
                font-family: PingFang SC;

                span:nth-child(1) {
                  font-size: 0.28rem;
                  color: #333;
                }

                span:nth-child(2) {
                  font-size: 0.24rem;
                  color: #A7A7A7;
                  padding-left: 0.12rem;
                }
              }

              span {
                font-size: 0.24rem;
                color: #A7A7A7;
              }
            }

            span {
              font-size: 0.28rem;
              font-family: PingFang SC;
              color: rgba(53, 168, 251, 1);
            }
          }
        }
      }
    }
  }
</style>
