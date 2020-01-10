<template>
  <div class="public">
    <van-nav-bar title="" left-arrow @click-left="back" />
    <div class="content">
        <h4>{{center_data.title}}</h4>
        <div class="center_de" v-html="center_data.content"></div>
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
        center_data: this.$route.query.detail
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
    },
    methods: {
      back() {
        this.$router.back(-1);
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
      color: #2C2C2C;
      font-size: 0.3rem;
      font-weight: normal;
      }
      .center_de{
        margin-top: 0.32rem;
        font-size: 0.28rem;
        color: #2C2C2C;
      /deep/  p{
            img{
            display: block;
            width: 100% !important;
            height: 100% !important;
          }
        }
        // padding: 0 4%;
      }
    }

  }
</style>
