<template>
  <div class="public">
    <van-nav-bar :title="help_data.catname" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info">
        <van-cell v-for="(item,index) in help_data.items"  :title="(index+1)+'、'+ item.title" :key="index" is-link  @click="goDetail(item)" />
      </div>
      <!--  <p>
        <span>可用BST:3.56</span>
      </p> -->
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
        help_data:this.$store.state.help_data
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      // that.getFudaInfo()
      console.log(that.$store.state.help_data)
    },
    methods: {
      back() {
        this.$router.back();
      },
      goDetail(item){
         let that = this;
        that.$router.push({
          path: 'detailProblem',
          query:{
            detail: item
          }
        })
      },
       onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        let that = this;
        that.show = false;
        // that.$router.push({
        //   path: '/'
        // })
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-nav-bar__right {
      color: #fff !important;
      font-size: 0.4rem !important;
    }

    .van-nav-bar .van-icon {
      color: #fff !important;
      font-size: 0.4rem !important;
    }

    .content {
      padding: 0;

      .login_info {
        width: 100%;
        // background: rgba(98, 98, 98, 0.1);

        /deep/ .van-cell {
          width: 92% !important;
          margin: 0 auto !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
          border-radius: 0 !important;
          background: none !important;
          padding: 0.26rem 0.1rem !important;
        }
          .log_pwd {
          display: flex;
          width: 92% !important;
          margin: 0 auto !important;
          position: relative;
          align-items: flex-end;
          span.phone_pex{
            position: absolute;
            top: 0.08rem;
            left: 0;
            color: #555;
            // border: 1px solid #34A8FF;
            padding: 0.14rem 0.08rem 0.08rem 0.08rem !important;
            border-radius: 2rem;
            font-size: 0.26rem;
            z-index: 99;

            }
          a {
            display: block;
            width: 34%;
            padding: 0.2rem 0.12rem;
            text-align: center;
            margin-left: 0.12rem;
            color: #555;
            border: 1px solid #34A8FF;
            // padding: 0.14rem 0.08rem 0.08rem 0.08rem !important;
            border-radius: 2rem;
          }

        }

        // /deep/ .van-cell:nth-child(3) {
        //   border: none !important;
        // }

        .van-cell:not(:last-child)::after {
          display: none !important;
        }

        /deep/ .van-field__label {
          color: #333 !important;
        }

        input::-webkit-input-placeholder {
          /* placeholder颜色  */
          color: #A7A7A7 !important;
          /* placeholder字体大小  */
        }
      }
      .van-button--large {
        margin-top: 2rem !important;
      }

      .van-button--primary {
        width: 92%;
        margin: 0 4%;
      }

      h5 {
        text-align: center;
        font-size: 0.26rem;
        padding: 0.2rem 0;
        color: #5B913F;
      }
    }

    .ver_dialog {
      position: relative;

      span.iconfont {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.2rem;
      }

      h3 {
        padding: 0.2rem 0;
        font-size: 0.32rem;
        color: #2B2B2B;
      }

      input {
        width: 4rem;
        height: 0.66rem;
        border: 1px solid #BFBFBF;
        border-radius: 0.08rem;
        padding-left: 0.2rem;
        color: #333 !important;
        margin: 0.8rem 0;
        font-size: 0.26rem;
      }

      input::-webkit-input-placeholder {
        color: #BEBEBE !important;
      }

      .dia_btn {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          width: 50%;
          height: 0.8rem;
          line-height: 0.8rem;
          display: inline-block;
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 1);
        }

        span:nth-child(1) {
          background: rgba(172, 172, 172, 1);
        }

        span:nth-child(2) {
          background: #4163C7;
        }
      }
    }
  }
</style>
