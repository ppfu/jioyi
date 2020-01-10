<template>
  <div class="public">
    <van-nav-bar :title="$t('notice.n2')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="details">
        <div class="acc_list">
           <div class="acc_top">
             <p>{{$t('notice.n1')}} ：{{notice_data.title}}</p>
             <p>
               <span>{{notice_data.create_time}}</span>
             </p>
           </div>
         </div>
        <div class="de_text" v-html="notice_data.content">

        </div>
        <!-- <h5 v-if="$store.state.user_data.about_us == null">暂无数据</h5> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        notice_data: this.$route.query.notice_data,
      }
    },
    mounted:function(){
      // console.log(this.$route.query.mess_con)
    },
    methods: {
      back() {
        this.$router.back();
      },
    }
  }
</script>

<style lang="less" scoped>
  .public {
    .content {
      overflow-y: scroll;

      .details {
        width: 100%;
        padding: 0.4rem 0;
        font-size: 0.26rem;
        line-height: 0.42rem;
        color: #767994;
        margin-bottom: 1rem;
        .acc_list {
         padding: 0.14rem 0rem;
         border-radius: 0.08rem;
         margin-bottom: 0.2rem;

         .acc_top {
           p:nth-child(1) {
             color: #333;
             font-size: 0.28rem;
           }
           p:nth-child(2){
             margin-top: 0.08rem;
             span {
               font-size: 0.24rem;
               font-family: PingFang SC;
               color: #A7A7A7;
               padding-top: 0.08rem;
             }
           }

         }
       }
        .de_text {
          font-size: 0.26rem;
          color: #333;
          line-height: 0.46rem;
          // text-indent: 0.62rem;
         /deep/ p{
          /deep/ img{
              width: 100% !important;
            }
          }
        }

        h5 {


        }
      }
    }
  }
</style>
