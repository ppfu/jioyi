<template>
  <div class="public">
    <van-nav-bar :title="$t('mine.set.about')" left-arrow @click-left="back" />
    <div class="content">
        <h4>{{about_data.title}}</h4>
        <div class="about_con" v-html="about_data.content">

        </div>
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
        about_data:{},
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getUserNoticeList();
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
           //获取消息列表信息
      getUserNoticeList() {
        let that = this;
        that
          .$http({
            url: "/getNotice/3",
            method: "get",
            data: {
              // token: window.localStorage.getItem("token"),
              // page: 1
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              // that.$vux.loading.hide();
              that.about_data = res.data.data.low[0].items[0]; //消息列表

              that.getmove();
              console.log(that.notice)
            } else {
              that.$toast(res.data.message);
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
    .content {
      margin-top: 0.2rem;
      width: 100%;
      padding:0 4%;
      h4{
      color: #333;
      font-size: 0.3rem;
      font-weight: bold;
      }
      .about_con{
        margin-top: 0.34rem;
        font-size: 0.28rem;
        // padding: 0 4%;
      }
    }

  }
</style>
