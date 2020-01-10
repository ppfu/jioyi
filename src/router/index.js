import Vue from 'vue'
import Router from 'vue-router'
import BotNav from '@/components/tabs'
import Login from '@/pages/login' //登录页
import ForgetPwd from '@/pages/forgetPwd' //忘记密码
import Register from '@/pages/register' //注册
import Agreement from '@/pages/agreement' //注册协议
import Home from '@/pages/home' //首页
import FiatDeal from '@/pages/fiatDeal' //法币交易
import CoinDeal from '@/pages/coinDeal' //币币交易
import ContractDeal from '@/pages/contractDeal' //商城
import Mine from '@/pages/mine' //我的
import Messages from '@/pages/homepage/messages' //消息
import MessDetail from '@/pages/homepage/messDetail' //消息详情
import TradRecord from '@/pages/legalpage/tradRecord' //法币交易记录
import Payment from '@/pages/legalpage/payment' //法币交易付款
import Setting from '@/pages/mypage/setting' //账户设置
import AccountAuth from '@/pages/mypage/accountAuth' //账户认证
import UploadCard from '@/pages/mypage/uploadCard' //上传身份证
import CashWay from '@/pages/mypage/cashWay' //收款方法
import WeChat from '@/pages/mypage/weChat' //微信
import Alipay from '@/pages/mypage/alipay' //支付宝
import BankCard from '@/pages/mypage/bankCard' //银行卡
import MoneyPass from '@/pages/mypage/moneyPass' //资金密码
import LogPass from '@/pages/mypage/logPass' //登录密码
import Order from '@/pages/mypage/order' //订单
import OrderInfo from '@/pages/mypage/orderInfo' //订单详情
import Strategy from '@/pages/mypage/strategy' //攻略
import TransferAcc from '@/pages/mypage/transferAcc' //转账
import TransferRecord from '@/pages/mypage/transferRecord' //转账
import AddAdderss from '@/pages/mypage/addAdderss' //增加地址
import EditAddress from '@/pages/mypage/editAddress' //编辑地址
import Asste from '@/pages/mypage/asste' //资产
import ChargeMoney from '@/pages/mypage/chargeMoney' //充币
import RechargeRecord from '@/pages/mypage/rechargeRecord' //充值记录
import MentionMoney from '@/pages/mypage/mentionMoney' //提币
import MentionRecord from '@/pages/mypage/mentionRecord' //提币记录
import BindingPhone from '@/pages/mypage/bindingPhone' //绑定手机
import BindingEmail from '@/pages/mypage/bindingEmail' //绑定邮箱
import Invite from '@/pages/mypage/invite' //邀请好友
import LanguageSet from '@/pages/mypage/languageSet' //语言设置
import About from '@/pages/mypage/about' //关于我们
import HelpCenter from '@/pages/mypage/helpCenter' //帮助中心
import HelpDetail  from '@/pages/mypage/helpDetail' //帮助中心详情
import DetailProblem  from '@/pages/mypage/detailProblem' //问题详情
import Chat  from '@/pages/mypage/chat' //客服
import CoinKline  from '@/pages/coinpage/coinKline' //币币k线
import Loding  from '@/pages/loding' //londing

import ContractKline  from '@/pages/contractpage/contractKline' //合约k线
// import Chat  from '@/pages/mypage/chat' //客服
Vue.use(Router)
export default new Router({
  // mode: "history",
  // scrollBehavior(to, from, savedPosition) {
  // 	//判断如果滚动条的位置存在直接返回到当前位置，否者返回到起点
  // 	console.log(to);
  // 	console.log(from);
  // 	console.log(savedPosition);
  //   if (to.hash) {
  //     return {
  //       selector: to.hash
  //     }
  //   }
  //   // if (savedPosition) {
  // 	// 	console.log("111");
  //   //   return {x: 500, y: 500}
  //   // } else {
  // 	// 	console.log("222");
  //   //   if (to.hash) {
  //   //     return {
  //   //       selector: to.hash
  //   //     }
  //   //   }
  //   // }
  // },
  routes: [{ //默认路由
      path: '/',
      name: 'loding',
      components: {
        main: Loding,
        // footer: BotNav,
      },
      meta: {
        index: 1,
        // keepAlive:true,
      }
    },
    {
     path: '/home',
      name: 'home',
      components: {
        main: Home,
        footer: BotNav,
      },
      meta: {
        index: 2,
        // keepAlive:true,
      }
    },
    {
      path: '/forgetpwd',
      name: 'forgetpwd',
      components: {
        main: ForgetPwd
      },
      meta: {
        index: 15
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        main: Register
      },
      meta: {
        index: 15
      }
    },
    {
      path: '/agreement',
      name: 'agreement',
      components: {
        main: Agreement
      },
      meta: {
        index: 16
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        main: Login,
        // footer: BotNav,
      },
      meta: {
        index: 14,
        // none: "true",
        // keepAlive:true,
      }
    },
    {
      path: '/coinDeal',
      name: 'coinDeal',
      components: {
        main: CoinDeal,
        footer: BotNav,
      },
      meta: {
        index: 3,
        none: "true",
        // keepAlive:true,
      }
    },
    {
      path: '/contractDeal',
      name: 'contractDeal',
      components: {
        main: ContractDeal,
        footer: BotNav,
      },
      meta: {
        index: 4,
        // none: "true",
        // keepAlive:true,
      }
    },
    {
      path: '/fiatDeal',
      name: 'fiatDeal',
      components: {
        main: FiatDeal,
        footer: BotNav,
      },
      meta: {
        index: 5,
        // none: "true",
        // keepAlive:true,
      }
    },
    {
      path: '/mine',
      name: 'mine',
      components: {
        main: Mine,
        footer: BotNav,
      },
      meta: {
        index: 6,
        none: "true",
        // keepAlive:true
      }
    },
    {
      path: '/messages',
      name: 'messages',
      components: {
        main: Messages,
      },
      meta: {
        index: 3,
        // keepAlive: true
      }
    },
    {
      path: '/messDetail',
      name: 'messDetail',
      components: {
        main: MessDetail,
      },
      meta: {
        index: 4,
        // keepAlive: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      components: {
        main: Setting,
      },
      meta: {
        index: 7,
        keepAlive: true
      }
    },
    {
      path: '/accountAuth',
      name: 'accountAuth',
      components: {
        main: AccountAuth,
      },
      meta: {
        index: 8,
        // keepAlive:true
      }
    },
     {
      path: '/uploadCard',
      name: 'uploadCard',
      components: {
        main: UploadCard,
      },
      meta: {
        index: 9,
        // keepAlive:true
      }
    },
    {
      path: '/cashWay',
      name: 'cashWay',
      components: {
        main: CashWay,
      },
      meta: {
        index: 8,
        // keepAlive:true,
      }
    },
    {
      path: '/weChat',
      name: 'weChat',
      components: {
        main: WeChat,
      },
      meta: {
        index: 9,
        // keepAlive:true,
      }
    },
    {
      path: '/alipay',
      name: 'alipay',
      components: {
        main: Alipay,
      },
      meta: {
        index: 9,
        // keepAlive:true,
      }
    },
    {
      path: '/bankCard',
      name: 'bankCard',
      components: {
        main: BankCard,
      },
      meta: {
        index: 9,
        // keepAlive:true,
      }
    },
    {
      path: '/moneyPass',
      name: 'moneyPass',
      components: {
        main: MoneyPass,
      },
      meta: {
        index: 8,
        // keepAlive:true,
      }
    },
    {
      path: '/logPass',
      name: 'logPass',
      components: {
        main: LogPass,
      },
      meta: {
        index: 8,
        // keepAlive:true,
      }
    },
    {
      path: '/order',
      name: 'order',
      components: {
        main: Order,
      },
      meta: {
        index: 7,
        // keepAlive:true,
      }
    },
    {
      path: '/orderInfo',
      name: 'orderInfo',
      components: {
        main: OrderInfo,
      },
      meta: {
        index: 8,
        // keepAlive:true,
      }
    },
    {
      path: '/tradRecord',
      name: 'tradRecord',
      components: {
        main: TradRecord,
      },
      meta: {
        index: 7,
        // keepAlive:true,
      }
    },
     {
      path: '/payment',
      name: 'payment',
      components: {
        main: Payment,
      },
      meta: {
        index: 9,
        // none: "true",
        // keepAlive:true,
      }
    },
    {
      path: '/strategy',
      name: 'strategy',
      components: {
        main: Strategy,
      },
      meta: {
        index: 8,
        // keepAlive:true,
      }
    },
    {
      path: '/transferAcc',
      name: 'transferAcc',
      components: {
        main: TransferAcc,
      },
      meta: {
        index: 8,
        // keepAlive:true,
      }
    },
    {
      path: '/transferRecord',
      name: 'transferRecord',
      components: {
        main: TransferRecord,
      },
      meta: {
        index: 9,
        // keepAlive:true,
      }
    },
    {
      path: '/addAdderss',
      name: 'addAdderss',
      components: {
        main: AddAdderss,
      },
      meta: {
        index: 8,
        // keepAlive:true,
      }
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      components: {
        main: EditAddress,
      },
      meta: {
        index: 8,
        // keepAlive:true,
      }
    },

       {
      path: '/asste',
      name: 'asste',
      components: {
        main: Asste,
      },
      meta: {
        index: 7,
        // none: "true",
        // keepAlive:true,
      }
    },
     {
      path: '/chargeMoney',
      name: 'chargeMoney',
      components: {
        main: ChargeMoney,
      },
      meta: {
        index: 10,
      }
    },
    {
      path: '/rechargeRecord',
      name: 'rechargeRecord',
      components: {
        main: RechargeRecord,
      },
      meta: {
        index: 11,
      }
    },
     {
      path: '/mentionMoney',
      name: 'mentionMoney',
      components: {
        main: MentionMoney,
      },
      meta: {
        index: 7,
      }
    },
     {
      path: '/mentionRecord',
      name: 'mentionRecord',
      components: {
        main: MentionRecord,
      },
      meta: {
        index: 8,
      }
    },
        {
      path: '/bindingPhone',
      name: 'bindingPhone',
      components: {
        main: BindingPhone,
      },
      meta: {
        index: 9,
      }
    },
     {
      path: '/bindingEmail',
      name: 'bindingEmail',
      components: {
        main: BindingEmail,
      },
      meta: {
        index: 7,
      }
    },
     {
      path: '/invite',
      name: 'invite',
      components: {
        main: Invite,
      },
      meta: {
        index: 7,
      }
    },
    {
      path: '/languageSet',
      name: 'languageSet',
      components: {
        main: LanguageSet,
      },
      meta: {
        index: 7,
      }
    },
    {
      path: '/about',
      name: 'about',
      components: {
        main: About,
      },
      meta: {
        index: 7,
      }
    },
     {
      path: '/helpCenter',
      name: 'helpCenter',
      components: {
        main: HelpCenter,
      },
      meta: {
        index: 7,
      }
    },
     {
      path: '/helpDetail',
      name: 'helpDetail',
      components: {
        main: HelpDetail,
      },
      meta: {
        index: 8,
      }
    },
    {
      path: '/detailProblem',
      name: 'detailProblem',
      components: {
        main: DetailProblem,
      },
      meta: {
        index: 9,
      }
    },
     {
      path: '/chat',
      name: 'chat',
      components: {
        main: Chat,
      },
      meta: {
        index: 7,
      }
    },
     {
      path: '/coinKline',
      name: 'coinKline',
      components: {
        main: CoinKline,
      },
      meta: {
        index: 7,
      }
    },
    {
      path: '/contractKline',
      name: 'contractKline',
      components: {
        main: ContractKline,
      },
      meta: {
        index: 7,
      }
    },
  ],
});
