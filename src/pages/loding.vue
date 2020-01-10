<template>
  <div class="public">
    <div class="not_con"></div>
    <div class="d_run">
      <img class="run_img" :src="start_page" alt>
      <div class="loding">
        <van-loading type="spinner" />
         <!-- <van-loading type="spinner" color="#1989fa" /> -->
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        start_page: '',
      };
    },
    created: function() {

    },
    //数据保存到session
    watch: {


    },
    mounted: function() {
      let that = this;
      that.getWebInfo();
      setTimeout(function() {
         that.$router.push({
          path: '/home'
        })
      }, 2000);
    },
    methods: {
      //获取首页轮播图
     getWebInfo() {
       let that = this;
       // that.$vux.loading.show({
       //   text: ""
       // });
       that
         .$http({
           url: "/webInfo/1",
           method: "get",
           data: {
             // token: window.localStorage.getItem("token"),
           }
         })
         .then(function(res) {
           if (res.data.status == 1) {
             // that.$vux.loading.hide();
             that.start_page = res.data.data.start_page; //启动页
           } else {
             that.$toast(res.data.message);
           }
         })
         .catch(function(error) {

         });
     },
    }
  };
</script>

<style lang="less" scoped>
  //   .public {
  //   	width: 100%;
  //   	height: 100%;
  //   	overflow: hidden;
  //    .showN-enter-active,
  //    .showN-leave-active {
  //    	transition: all 2s linear;
  //    	/* transform: translateX(0%); */
  //    }
  //
  //    .showN-enter,
  //    .showN-leave {
  //    	/* transform: translateX(0%); */
  //    	opacity: 0;
  //    }
  //
  //    .showN-leave-to {
  //    	/* transform: translateX(-100%); */
  //    	opacity: 1;
  //    }
  //   }
</style>
