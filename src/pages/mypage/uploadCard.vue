<template>
  <div class="public">
    <van-nav-bar :title="$t('safe.autonym.tit2')" left-text="" left-arrow @click-left="back" />
    <div class="content">
      <div class="coin_info">
        <div class="coin_img">
          <span>{{$t('safe.autonym.a1')}}</span>
          <div class="code_img">
            <!-- <img v-show="imgShow" @click="showUp" :src="zfb_qrcode"  class="wx_img" /> -->
            <van-uploader v-model="card_z" :after-read="uploadCardz" multiple :max-count="1" />
          </div>
        </div>
        <div class="coin_img">
          <span>{{$t('safe.autonym.a2')}}</span>
          <div class="code_img card_f">
            <!-- <img v-show="imgShow" @click="showUp" :src="zfb_qrcode"  class="wx_img" /> -->
            <van-uploader v-model="card_f" :after-read="uploadCardf" multiple :max-count="1" />
          </div>
        </div>
        <div class="coin_img">
          <span>{{$t('safe.autonym.a3')}}</span>
          <div class="code_img card_s">
            <!-- <img v-show="imgShow" @click="showUp" :src="zfb_qrcode"  class="wx_img" /> -->
            <van-uploader v-model="card_s" :after-read="uploadCards" multiple :max-count="1" />
          </div>
        </div>

      </div>
      <van-button type="primary" @click="accountAuth" size="large">{{$t('safe.autonym.btn')}}</van-button>
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
        card_z: [],
        card_f: [],
        card_s: [],
        front_img: this.$store.state.auth_data.front_img, //身份证正面
        reverse_img: this.$store.state.auth_data.reverse_img, //身份证反面
        hand_img: this.$store.state.auth_data.hand_img, //手持身份证正面
        // real_name:this.$route.query.real_name,
        // identity_card:this.$route.query.identity_card,
        // activeNames: ['1']
      }
    },
    components: {
      XDialog,
    },
    mounted: function() {
      let that = this;
      if(that.$store.state.auth_data.certified == 0){
        that.card_z = [];
        that.card_f = [];
        that.card_s = [];
      }else {
        that.card_z = [{url: that.front_img}];
        that.card_f = [{url: that.reverse_img}];
        that.card_s = [{url: that.hand_img}];
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      goRechRecord() {
        let that = this;
        that.$router.push({
          path: '/rechargeRecord',
        })
      },
      //保存二维码
      downloadIamge(selector, name) {
        // 通过选择器获取img元素，
        if (this.money_code == '') {

          this.$toast("您还不能支付，请联系客服设置");

        } else {
          var img = document.querySelector(selector)
          // 将图片的src属性作为URL地址
          var url = img.src
          var a = document.createElement('a')
          var event = new MouseEvent('click')
          a.download = name || '下载图片名称'
          a.href = url
          a.dispatchEvent(event)
        }
      },
      //实名认证
      accountAuth() {
        let that = this;
        let real_name = that.real_name;
        let idcard_number = that.idcard_number;
        if (that.card_z.length <= 0) {
          that.$toast(that.$t('safe.autonym.tip.t1'));
        } else if (that.card_f.length <= 0) {
          that.$toast(that.$t('safe.autonym.tip.t2'));
        } else if (that.card_s.length <= 0) {
          that.$toast(that.$t('safe.autonym.tip.t2'));
        } else {
          that.$vux.loading.show({
            text: ""
          });
          that.$http
            .post("/bindIdentity", {
              token: window.localStorage.getItem("token"),
              identity_card: that.identity_card,
              real_name: that.real_name,
              front_img: that.front_img,
              reverse_img: that.reverse_img,
              hand_img: that.hand_img,
            })
            .then(function(res) {
              // that.$toast.clear();
              if (res.data.status == 1) {
                that.$vux.loading.hide();
                that.$toast.success(that.$t("succTip.t2"));
                that.$router.back(-1);
              } else {
                that.$vux.loading.hide();
                that.$toast.fail(res.data.message);
              }
            })
            .catch(function(err) {});
        }
      },
      // 上传身份证正面
      uploadCardz(file) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.file); // 读取文件
        reader.onload = function(arg) {
          var formData = new FormData();
          formData.append("image", file.file);
          formData.append("type", "5");
          $.ajax({
            url: "http://bzapi.jinjifuweng.com/upload",
            type: "POST",
            data: formData,
            dataType: "JSON",
            cache: false,
            processData: false,
            contentType: false
          }).done(function(res) {
            console.log(res.status)
            if (res.status == 1) {
              //成功回调
              that.$toast.success(that.$t("succTip.s6"));
              that.front_img = res.data.imagepath;
            } else {
              //失败
              that.$toast(res.message);
            }
          });
        };
      },
      // 上传身份证反面
      uploadCardf(file) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.file); // 读取文件
        reader.onload = function(arg) {
          var formData = new FormData();
          formData.append("image", file.file);
          formData.append("type", "5");
          $.ajax({
            url: "http://bzapi.jinjifuweng.com/upload",
            type: "POST",
            data: formData,
            dataType: "JSON",
            cache: false,
            processData: false,
            contentType: false
          }).done(function(res) {
            if (res.status == 1) {
              //成功回调
              that.$toast.success("上传成功");
              that.reverse_img = res.data.imagepath;
            } else {
              //失败
              that.$toast(res.message);
            }
          });
        };
      },
      // 上传手持身份证
      uploadCards(file) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.file); // 读取文件
        reader.onload = function(arg) {
          var formData = new FormData();
          formData.append("image", file.file);
          formData.append("type", "5");
          $.ajax({
            url: "http://bzapi.jinjifuweng.com/upload",
            type: "POST",
            data: formData,
            dataType: "JSON",
            cache: false,
            processData: false,
            contentType: false
          }).done(function(res) {
            console.log(res)
            if (res.status == 1) {
              //成功回调
              that.$toast.success("上传成功");
              that.hand_img = res.data.imagepath;
            } else {
              //失败
              that.$toast(res.message);
            }
          });
        };
      },

    }
  }
</script>

<style lang="less" scoped>
  .public {
    .van-hairline--bottom::after {
      border: none !important;
    }


    .content {

      width: 100%;
      padding: 0.16rem 4%;
      height: calc(100% - 0.88rem);
      // background: rgba(0, 0, 0, 0.04);
      overflow-y: scroll;
      padding-bottom: 1rem;

      .head_char {
        width: 100%;
        height: 2.4rem;
        // background: #1372D8;
        background: linear-gradient(to right, #0A97E6, #1D40C4);
        border-radius: 0.08rem;
        color: #fff;
        padding: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        p {
          display: flex;
          justify-content: space-between;
          font-size: 0.28rem;

        }


      }

      .coin_info {
        font-family: PingFang SC;
        margin-top: 0.2rem;
        width: 100%;
        padding: 0 4%;
        background: #fff;


        .coin_img {
          margin-bottom: 0.4rem;

          span {
            display: block;
            font-size: 0.26rem;
            padding: 0.26rem 0;
          }

          .code_img {
            width: 100%;
            text-align: center;
            // padding: 0.1rem 0;
            height: 3rem;
            line-height: 3rem;
            background: #E9EEFB;

            // border: 1px solid #f5f5f5;
            .wx_img {
              display: inline-block;
              width: 100%;
              height: 100%;
            }

            /deep/ .van-uploader__preview {
              margin: 0 !important;
              height: 3rem !important;
              overflow: hidden !important;
            }

            /deep/ .van-uploader__upload {
              width: 6.4rem !important;
              height: 3rem !important;
              background: url(../../assets/img/card_z.png) no-repeat 50% 36%;
              background-size: 46% 60%;
              border: none;
              // border: 1px solid rgba(0, 0, 0, 0.06) !important;
              border-radius: 0.08rem;
              overflow: hidden;
              z-index: 1;
            }

            /deep/ .van-uploader__preview-image {
              width: 100% !important;
              height: 3rem !important;
              border: 1px solid #E9EEFB;
              // background: url(../../assets/img/card_z.png) no-repeat 50% 36%;
              // background-size: 46% 56%;
              // position: absolute;
              // top: 0;
              // z-index: 99999;

            }

            /deep/ .van-uploader__upload-icon {
              font-size: 0.6rem !important;
              // font-weight: bold !important;
              color: #fff !important;
              background: #2D58D9;
              border-radius: 50%;
              padding: 0.04rem;
            }
          }
          .card_f{
             /deep/ .van-uploader__upload {
              background: url(../../assets/img/card_f.png) no-repeat 50% 36%;
              background-size: 46% 60%;
            }
          }
           .card_s{
             /deep/ .van-uploader__upload {
              background: url(../../assets/img/card_s.png) no-repeat 50% 36%;
              background-size: 30% 60%;
            }
          }

        }

        .tips {
          font-size: 0.26rem;
          padding-bottom: 0.4rem;
          color: #555;

          p {
            padding-top: 0.12rem;
          }
        }
        .van-button--large{

        }
      }
    }
  }
</style>
