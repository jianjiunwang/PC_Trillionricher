<template>
    <div>
        <div class="tongzhi" style="width:1200px;margin: 20px auto" >
            <i class="iconfont el-icon-al-xitonggonggao" style="color: #fe5e00;font-size: 20px;margin-left: 10px"></i>
            <span>{{tongzhi_order}}</span>
        </div>
        <div class="ddtime" style="width: 1200px;margin: 0 auto">
            <div style="margin: 10px 0;font-weight: bold"><i class="el-icon-tickets"></i> 訂單詳情 <router-link to="/vipindex"  style="color: #468DB9;margin-left: 10px;font-size: 16px;cursor: pointer;">返 回</router-link></div>
            <div style="border: 1px solid #E9EAEC;padding: 20px;">
                <div style="display: flex;justify-content: space-between">
                    <span>訂單編號 {{OrderData.order_num}}</span>
                    <div style="display: flex;align-items: center">
                        <span class="jiaoyiZT" v-if="OrderData.order_state==0" style="background:#FFA801">等待付款</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==1" style="background:#aaff11">等待出货</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==2" style="background:#0083ff">理貨中</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==3" style="background:#45ff01">出貨中</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==4" style="background:#ff0000">退貨中</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==5" style="background:#ff0005">拒绝退货</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==6" style="background:#ff490b">已退貨</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==7" style="background:#7bff68">取消交易</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==8" style="background:#45ff01">交易完成</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==9" style="background:#ff0012">交易關閉</span>
                        <span class="jiaoyiZT" v-if="OrderData.order_state==9" style="background:#49ff00">已退款</span>
                    </div>
                </div>
                <table   rules=none style="margin-top: 20px" >
                    <tr style="text-align: left;background-color: #E7E7E7;height: 50px;font-size: 18px;padding: 0 20px;box-sizing:border-box;">
                        <th width="300" style="padding: 0 20px">商品名稱</th>
                        <th width="250">商品規格</th>
                        <th width="150" style="text-align: center">數量</th>
                        <th width="200" style="text-align: center">商品金額(RMB)</th>
                        <th width="200" style="text-align: center">商品金額(TWD)</th>
                    </tr>
                    <tr style="font-size: 16px;height: 50px;box-sizing:border-box;" v-for="(item,index) in OrderData.shopping">
                        <td width="300" style="padding: 0 20px">{{OrderData.goods_name}}</td>
                        <td width="300">{{item.specification_explain}}</td>
                        <td width="100" style="text-align: center">{{item.quantity}}</td>
                        <td width="200" style="text-align: center">￥{{item.specification_rmb}}</td>
                        <td width="200" style="text-align: center">${{item.specification_twd}}</td>
                    </tr>
                </table>
                <div style="text-align: right;border-top:1px solid #E7E7E7;padding: 10px 20px;font-size: 18px;font-weight:bold ">运费 :  滿100包郵 </div>
                <!--<div style="text-align: right;border-top:1px solid #E7E7E7;padding: 10px 20px;font-size: 18px;font-weight:bold ">總計(RMB) :  <i style="font-size: 14px;font-weight: bold">￥</i> {{OrderData.order_rmb}}</div>-->
                <div style="text-align: right;border-top:1px solid #E7E7E7;padding: 10px 20px ;font-size: 18px;font-weight:bold">總計(TWD) :  $ {{OrderData.order_twd}}</div>
                <h3 style="font-size: 18px;">您的付款方式 :
                    <span v-if="OrderData.payment_method==1">玉山銀行()808</span>
                    <span v-if="OrderData.payment_method==2">超商付款</span>
                    <!--<span v-else-if="OrderData.payment_method==3">E幣餘額</span>-->
                    <!--<span v-else-if="OrderData.payment_method==5">E幣餘額 + 補款</span>-->
                    <span v-else-if="OrderData.payment_method==4">聯邦銀行(803)</span>
                </h3>
                <p style="margin-top: 15px;font-size: 16px;" v-if="OrderData.payment_method==1">玉山銀行(808): {{OrderData.payment_account}}</p>
                <p style="margin-top: 15px;font-size: 16px;" v-if="OrderData.payment_method==4">聯邦銀行(803): {{OrderData.payment_account}}</p>
                <p style="margin-top: 15px;font-size: 16px;" v-if="OrderData.payment_method==2">超商代碼 : {{OrderData.payment_account}}</p>
                <div style="margin-top: 30px">
                    <h3 style="font-size: 18px;margin-bottom: 20px">訂單留言</h3>
                    <p class="s1" style="font-size: 14px;margin-bottom: 20px" v-if="OrderData.remarks!==' '">{{OrderData.remarks}}</p>
                    <p style="font-size: 16px;margin-bottom: 20px" >暫無留言 !</p>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <Loading v-show="orderloading"></Loading>

    </div>
</template>

<script>
    import '../assets/js/jquery-3.3.1'
    import Cookies from 'js-cookie'
    import Footer from './vues/Footer'
    import VipHeader from './vues/VipHeader'
    import Loading from './vues/loading'
    export default {
        data: function () {
            return {
                tongzhi_order:'',
                OrderData:{},
                orderloading:false,//loading
                reverse: true,
            }
        },
        components: {
            Footer,
            VipHeader,
            Loading
        },
        methods: {
            orderDetails:function () {
                var _this=this
                var order_id=this.$route.query.id
                    if(order_id!==undefined){
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/shop_order_details",
                        data:{order_id:order_id},
                        beforeSend:function(XMLHttpRequest){
                            _this.orderloading=true
                        },
                        dataType:"json",
                        success:(res)=>{
                            this.OrderData=res.data
                            _this.orderloading=false

                        }
                    })
                }else {
                    console.log(2);
                }
            },
        },
        computed: {},
        watch: {},
        mounted: function () {
            this.orderDetails()
            $.ajax({
                type: "POST",
                url: "https://www.trillionricher.com/1.0/inform",
                dataType: "json",
                data: {page: 1},
                success: (res) => {
                    if (res.success == 1) {
                        this.tongzhi_order = res.data[0].content
                    }
                }
            })
        }
    }
</script>
