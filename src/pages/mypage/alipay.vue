<template>
  <div class="public">
    <van-nav-bar :title="$t('safe.cashWay.alipay.tit')" left-arrow @click-left="back" />
    <div class="content">
      <div class="login_info">
        <van-field  v-model="name" clearable :placeholder="$t('safe.cashWay.alipay.a1')" />
        <van-field  v-model="num" clearable :placeholder="$t('safe.cashWay.alipay.a2')" />
        <div class="add_code">
          <h4>{{$t('safe.cashWay.alipay.a3')}}</h4>
          <div class="code_img">
            <!-- <img v-show="imgShow" @click="showUp" :src="zfb_qrcode"  class="wx_img" /> -->
            <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="1" />
          </div>
        </div>
      </div>
      <!--  <p>
        <span>可用BST:3.56</span>
      </p> -->
      <van-button type="primary" size="large" @click="addAlipay">{{$t('safe.cashWay.alipay.btn')}}</van-button>
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
        pay:"",//支付宝付款码
        name:"",//姓名
        num:"",//账号
        ali_info:{},
        fileList: [], //展示已上传身份证
        base_url: "http://bzapi.jinjifuweng.com/", //url域名
      }
    },
    components: {
      XDialog,
    },
    mounted() {
      let that = this;
      that.getUserPayType();

    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      closeDia() {
        let that = this;
        that.men_dlg = false;
      },
       //获取收款方式信息
      getUserPayType() {
        let that = this;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/getPayWay",
            method: "get",
            data: {
              token: window.localStorage.getItem("token"),
            }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.$vux.loading.hide();
              that.ali_info = res.data.data.ali_info;
              that.name =  that.ali_info.ali_name;
              that.num = that.ali_info.ali_num;
              that.pay = that.ali_info.ali_pay;
              that.fileList = [{url : that.pay}];
              //支付宝图片不为空:去掉获取的支付宝收款码地址域名（防止不重新上传图片点“确认”，域名会再次拼接，导致重复）
              // if (that.pay !== '') {
              //   that.pay = that.pay.replace(that.base_url, "")
              //   that.fileList = [{url : that.pay}];
              // }
              // if (that.pay == '') {
              //   that.fileList = [];
              // }
            } else {
               that.$vux.loading.hide();
              that.$toast(res.data.message);
            }
          })
          .catch(function(error) {

          });
      },
      //编辑支付宝
      addAlipay() {
        let that = this;
        let name = that.name;
        let num = that.num;
        let pay = that.pay;
        let fileList = that.fileList;
        if (!name || name == null) {
           that.$toast(that.$t('safe.cashWay.alipay.a1'));
        } else if (!num || num == null) {
          that.$toast(that.$t('safe.cashWay.alipay.a2'));
        } else if (!pay || pay == null) {
          that.$toast(that.$t('safe.cashWay.alipay.a4'));
        } else if (fileList.length == 0) {
          that.$toast(that.$t('safe.cashWay.alipay.a4'));
        } else {
          that.$vux.loading.show({
           text: ""
         });
          that.$http({
              url: "/bindAli",
              method: "post",
              data: {
                token: window.localStorage.getItem("token"),
                name: name,
                num: num,
                pay: pay,
              }
            }).then(function(res) {
              // that.$toast.clear();
              if (res.data.status == 1) {
                 that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.t1"));
                that.back();
              } else {
                 that.$vux.loading.hide();
                that.$toast.fail(res.data.message);
              }
            })
            .catch(function(err) {});
        }
      },
      // 上传支付宝付款码
      afterRead(file) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.file); // 读取文件
        reader.onload = function(arg) {
          var formData = new FormData();
          formData.append("image", file.file);
          formData.append("type", "2");
          $.ajax({
            url: "http://bzapi.jinjifuweng.com/upload",
            type: "POST",
            data: formData,
            dataType: "JSON",
            cache: false,
            processData: false,
            contentType: false
          }).done(function(res) {
            // console.log(res)
            if (res.status == 1) {

              //成功回调
              that.$toast.success(that.$t("succTip.s6"));
              that.pay = res.data.imagepath;
              console.log(that.pay)
            } else {
              //失败
              that.$toast(res.message);
            }
          });
        };
      },
      // 显示上传图片
      // showUp() {
      //   this.imgShow = false;
      //   this.zfb_qrcode = null;
      // },
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
          // border-bottom: 1px solid #1F244F !important;
          border-radius: 0 !important;
          background: none !important;
          padding: 0.26rem 0.1rem !important;
        }

        // /deep/ .van-cell:nth-child(2) {
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

      .add_code {
        padding: 0 4%;

        h4 {
          padding: 0.24rem 0;
          font-size: 0.28rem;
          // font-family: PingFang SC;
          color: #333;
        }

        .code_img {
          width: 100%;
          text-align: center;
          padding: 0.4rem 0;

          .wx_img {
            display: inline-block;
            width: 3rem;
            height: 3rem;
          }

          /deep/ .van-uploader__upload {
            width: 3rem !important;
            height: 3rem !important;
            background: none !important;
            border: 1px solid rgba(0, 0, 0, 0.12) !important;
          }

          /deep/ .van-uploader__preview-image {
            width: 3rem !important;
            height: 3rem !important;
            border: 1px solid rgba(0, 0, 0, 0.12) !important;
          }

          /deep/ .van-uploader__upload-icon {
            font-size: 0.8rem !important;
            // font-weight: bold !important;
            color: #B2BCD9 !important;
          }
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
  }
</style>
