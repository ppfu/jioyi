<template>
  <div class="public">
    <van-nav-bar :title="$t('reg.deal')" left-arrow @click-left="back" />
    <div class="content">
        <p>人民网东京10月21日电据日本时事通讯社报道，日本野村控股集团公司董事长古贺信行16日晚在北京大学演讲时，就出资51%在中国建立“野村东方国际证券”合资公司一事表示：“正在加紧准备，计划在年内开业。”他还表示，希望将来能在中国100%出资。
受海外企业在中国投资证券公司的限额从原来的49%提高到51%的政策影响，野村于去年5月申请投资超过50%的合资项目，并于今年3月份被批准。
该合资公司将首先面向富裕阶层人群提供资产管理服务，古贺信行认为：“这能充分利用野村证券丰富的经验。”另外，合资公司的管理层雇佣了很多女性员工，凸显了对多样性的重视。(编译许文金审稿：陈建军)</p>
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
        // real_name: this.$store.state.user_data.real_name, //真实姓名
        // idcard_number: this.$store.state.user_data.idcard_number, //身份证号
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
      color: #333;
      font-size: 0.3rem;
      font-weight: bold;
      }
      p{
        margin-top: 0.2rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        color: #333333;
        text-indent: 0.54rem;
      }
    }

  }
</style>
