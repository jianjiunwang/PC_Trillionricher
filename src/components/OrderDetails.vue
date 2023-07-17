<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading" class="orderdata"  v-if="JSON.stringify(OrderData) != '{}' ">

        <div class="tongzhi">
            <div class="content">
                <i class="iconfont el-icon-al-xitonggonggao"></i>
                <span>{{tongzhi_order}}</span>
            </div>
        </div>

        <div class="content">
            <div >
                <div class="orderdata_head"><router-link to="/"  style="color: #468DB9;margin-left: 10px;font-size: 16px;cursor: pointer;"><i class="el-icon-arrow-left"></i></router-link>訂單明細 </div>
                <!--<p style="font-size: 14px;" v-if="OrderData.order_state==0">您目前排在訂單處理中的第 <span style="color: #FE0000">{{OrderData.line}}</span>位，預計處理時間 <span style="color: #FE0000">{{Transformation(OrderData.line)}}</span></p>&nbsp;-->
                <div class="orderdata_body">
                    <div  v-if="OrderData.service_type==3">
                        <table class="order_table">
                            <tr>
                                <th>訂單號</th>
                                <th>申請訂單金額</th>
                                <th>轉帳手續費</th>
                                <th>平台服務費</th>
                                <th>總額</th>
                                <th>匯率</th>
                                <th v-if="OrderData.payment_method==2 || OrderData.withhold_type ==2">超商手續費</th>
                                <th>應付款項</th>

                            </tr>
                            <tr>
                                <td>{{OrderData.order_num}}</td>
                                <td class="color_green">￥{{OrderData.robot_rmb}}</td>
                                <td>{{OrderData.service_charge}}</td>
                                <td>0</td>
                                <td>￥{{Number(OrderData.service_charge)+Number(OrderData.robot_rmb)}}</td>
                                <td>{{OrderData.exchange_rate}}</td>
                                <td v-if="OrderData.payment_method==2 || OrderData.withhold_type ==2">$ 30 / $ {{OrderData.platform_serve}}</td>
                                <td class="color_red">${{OrderData.robot_twd}}</td>
                            </tr>
                        </table>
                    </div>
                    <div  v-if="OrderData.service_type==1">
                         <table class="order_table">
                             <tr>
                                 <th  :colspan="OrderData.payment_method==2 || OrderData.withhold_type ==2?6:5">交易鏈接</th>
                             </tr>
                             <tr>
                                 <th>訂單號</th>
                                 <th>商品總金額</th>
                                 <th>匯率</th>
                                 <th>平台服務費</th>
                                 <th v-if="OrderData.payment_method==2 || OrderData.withhold_type ==2">超商手續費</th>
                                 <th>應付新臺幣</th>
                             </tr>
                             <tr>
                                 <td :colspan="OrderData.payment_method==2 || OrderData.withhold_type ==2?6:5"  >{{OrderData.pay_url.length>80?OrderData.pay_url.slice(0,80)+'...':OrderData.pay_url}}</td>
                             </tr>
                             <tr>
                                 <td>{{OrderData.order_num}}</td>
                                 <td class="color_green">￥{{OrderData.robot_rmb}}</td>
                                 <td>￥{{OrderData.exchange_rate}}</td>
                                 <td>$ {{OrderData.platform_serve}}</td>
                                 <td v-if="OrderData.payment_method==2 || OrderData.withhold_type ==2">$ 30</td>
                                 <td class="color_red">${{OrderData.robot_twd}}</td>
                             </tr>

                         </table>
                         <table class="order_table">
                            <tr>
                                <th>商品名稱</th>
                                <th>金額</th>
                            </tr>
                            <tr v-for="(val,i) in OrderData.product_name" :key="i">
                                <td>{{val.product_name}}</td>
                                <td>{{val.product_price}}</td>
                            </tr>
                        </table>
                    </div>
                    <table class="order_table">
                        <tr>
                            <th>付款方式</th>
                            <th v-if="OrderData.payment_method==1">玉山銀行(808)</th>
                            <th v-else-if="OrderData.payment_method==2">超商代碼</th>
                            <th v-else-if="OrderData.payment_method==3">當前餘額</th>
                            <th v-else-if="OrderData.payment_method==6">彰化銀行(009)</th>
                            <th v-else-if="OrderData.payment_method==7">國泰世華銀行(013)</th>
                            <th v-else-if="OrderData.payment_method==8">星展銀行(810)</th>
                            <th v-else-if="OrderData.payment_method==9">中國信託(822)</th>
                            <th v-else-if="OrderData.payment_method==10">陽信銀行(108)</th>
                            <th v-else-if="OrderData.payment_method==5">補款金額</th>
                            <th v-else-if="OrderData.payment_method==5">補款方式</th>
                            <th v-else>尚未選擇付款方式</th>
                            <th>交易創建時間</th>
                            <th>最後處理時間</th>
                            <th>訂單狀態</th>
                        </tr>
                        <tr>
                            <td>
                                <span v-if="OrderData.payment_method==1 || OrderData.payment_method==6 || OrderData.payment_method==10 || OrderData.payment_method==9 || OrderData.payment_method==7 ">虛擬帳號</span>
                                <span v-if="OrderData.payment_method==2">超商付款</span>
                                <span v-if="OrderData.payment_method==3">錢包餘額</span>
                                <span v-if="OrderData.payment_method==5">錢包餘額 + 補款</span>
                                <span v-if="OrderData.payment_method==null &&  OrderData.order_state!=0">您尚未選擇付款方式</span>
                                <span v-if="OrderData.payment_method==null &&  OrderData.order_state==0">您的訂單正在處理中 !</span>
                            </td>
                            <td>
                                <span v-if="OrderData.payment_method==1 || OrderData.payment_method==6 || OrderData.payment_method==4 || OrderData.payment_method==9 || OrderData.payment_method==7 || OrderData.payment_method==10 ">{{OrderData.payment_account}}</span>
                                <span v-if="OrderData.payment_method==2">{{OrderData.payment_account}}</span>
                                <span v-if="OrderData.payment_method==3">￥{{(OrderData.r_money*1).toFixed(2)}}</span>
                                <span v-if="OrderData.payment_method==5">補款金額 : ${{OrderData.withhold_twd}} 新臺幣</span>
                                <span v-if="OrderData.payment_method==5">補款方式 :
                                    <span v-if="OrderData.withhold_type==1">玉山銀行</span>
                                    <span v-else-if="OrderData.withhold_type==2">超商補款</span>
                                    <span v-else-if="OrderData.withhold_type==4">聯邦銀行</span>
                                    <span v-else-if="OrderData.withhold_type==7">國泰世華銀行</span>
                                    <span v-else-if="OrderData.withhold_type==6">彰化銀行</span>
                                    <span v-else-if="OrderData.withhold_type==8">星展銀行</span>
                                    <span v-else-if="OrderData.withhold_type==9">中國信託</span>
                                    <span v-else-if="OrderData.withhold_type==10">陽信銀行</span>
                                </span>
                                <span  v-if="OrderData.payment_method==5">
                                    <span v-if="OrderData.withhold_type==2">超商代碼 : {{OrderData.payment_account}}</span>
                                    <span v-else>補款帳戶 : {{OrderData.payment_account}}</span>
                                </span>
                                <span class="godaifu" v-if="OrderData.payment_method==null &&  OrderData.order_state!=0 && OrderData.order_state!=7" @click="gosubStitute">前往選擇付款</span>
                            </td >
                            <td v-if="OrderData.payment_method==5">
                                <span v-if="OrderData.withhold_type==1">玉山銀行</span>
                                <span v-if="OrderData.withhold_type==2">超商補款</span>
                                <span v-if="OrderData.withhold_type==4">聯邦銀行</span>
                                <span v-if="OrderData.withhold_type==7">國泰世華銀行</span>
                                <span v-if="OrderData.withhold_type==8">星展銀行</span>
                                <span v-if="OrderData.withhold_type==9">中國信託</span>
                                <span v-if="OrderData.withhold_type==10">陽信銀行</span>
                                <span v-if="OrderData.withhold_type==6">彰化銀行</span>
                            </td>
                            <td>{{OrderData.create_time|convTimehms}}</td>
                            <td>{{OrderData.update_time|convTimehms}}</td>
                            <td>
                                <div>
                                    <span  v-if="OrderData.order_state==0" style="color:#FFA801">訂單處理中</span>
                                    <span  v-if="OrderData.order_state==3" style="color:#FFA801">等待匯款</span>
                                    <span  v-if="OrderData.order_state==4 || OrderData.order_state==19" style="color:#004bd9">
                                            <span v-if="OrderData.service_type==1">代付中</span>
                                            <span v-if="OrderData.service_type==2">儲值中</span>
                                            <span v-if="OrderData.service_type==3">處理中</span>
                                            <span v-if="OrderData.service_type==4">提現中</span>
                                    </span>
                                    <span  v-if="OrderData.order_state==30 || OrderData.order_state==31" style="color:#efb300">已匯款</span>
                                    <span  v-if="OrderData.order_state==21" style="color:#004bd9">處理中</span>
                                    <span  v-if="OrderData.order_state==6"  style="color:#49B85C">交易成功</span>
                                    <span  v-if="OrderData.order_state==7"  style="color:#777A86">訂單已取消</span>
                                    <span  v-if="OrderData.order_state==5 ||OrderData.order_state==8 || OrderData.order_state==9 || OrderData.order_state==10 || OrderData.order_state==17" style="color:#ff0004">
                                            <span v-if="OrderData.service_type==1">代付失敗</span>
                                            <span v-if="OrderData.service_type==2">儲值失敗</span>
                                            <span v-if="OrderData.service_type==3">處理失敗</span>
                                            <span v-if="OrderData.service_type==4">提現失敗</span>
                                        </span>
                                    <span  v-if="OrderData.order_state==11" style="color:#a66cb9">退款成功</span>
                                    <span  v-if="OrderData.order_state==12" style="color:#f62400">申请退款中</span>
                                    <span  v-if="OrderData.order_state==41" style="color:#f62400">匯款帳號不符</span>
                                    <span  v-if="OrderData.order_state==13" style="color:#49B85C">單筆退款</span>
                                    <span  v-if="OrderData.order_state==14 || OrderData.order_state==15 || OrderData.order_state==16" style="color:#FF5000" @click="yanzheng(OrderData.kadan)">請做驗證</span>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <!--<div  style="font-size: 15px;text-align: right;margin: 10px 0" v-if="OrderData.service_type==1">-->
                    <!--<p><span style="text-decoration:line-through">淘寶 ATM/WEBATM 加收 <span style="color: #FE0000"> 1.0% </span>手續費，易支付不收手續費，</span>總共為您節省<span style="color: #FE0000"> {{((OrderData.robot_rmb*OrderData.exchange_rate)*0.01).toFixed(0)}} </span>TWD</p>-->
                    <!--</div>-->
                    <div class="order_time">
                        <div style="display: flex;justify-content:space-between;align-items: center">
                            <span v-if="OrderData.service_type==3">
                                <span v-if="OrderData.payment_method == 2  || OrderData.withhold_type == 2">
                                    應付新台幣計算公式：(￥{{Number(OrderData.robot_rmb)}}+￥{{Number(OrderData.service_charge)}} ) X {{OrderData.exchange_rate}}  + 30 = ${{OrderData.robot_twd}} TWD
                                </span>
                                <span v-else>
                                    應付新台幣計算公式：( ￥{{Number(OrderData.robot_rmb)}}+￥{{Number(OrderData.service_charge)}} ) X {{OrderData.exchange_rate}}  = ${{OrderData.robot_twd}} TWD
                                </span>
                            </span>
                            <div v-else-if="OrderData.service_type==4">
                                 提現新台幣計算公式：(￥{{Number(OrderData.robot_rmb)}}+￥{{Number(OrderData.service_charge)}}) X {{OrderData.exchange_rate}} - 15 = ${{OrderData.robot_twd}} TWD
                            </div>
                            <div v-else>
                                 應付新台幣計算公式：（￥{{(OrderData.robot_rmb*1).toFixed(1) }} + ￥{{OrderData.platform_serve}}） * {{OrderData.exchange_rate}}   = ${{OrderData.robot_twd}} TWD
                            </div>
                            <div v-if="OrderData.order_state==6 && OrderData.service_type==1">
                                <el-button  type="danger" style="padding:5px 10px" @click="refund" >申請退款</el-button>
                            </div>
                            <div v-if="OrderData.order_state ==3 || OrderData.order_state==0  " >
                                <el-button  type="danger" style="padding:5px 10px" @click="cancel_order">取消訂單</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="order_Remarks">
                        <div  v-if="OrderData.order_state==11 || OrderData.order_state==13">
                            <h3>退款備註</h3>
                            <p>
                                此交易金额 ￥ {{OrderData.refund_rmb}} 已退至E幣錢包，詳情請查看會員中心右上方<router-link to="/recordrb" style="color: #4843ff">E幣交易明細。</router-link>
                            </p>
                        </div>
                        <div  v-if="OrderData.order_state==10 || OrderData.order_state==9 ||  OrderData.order_state==8">
                            <h3>代付失敗原因</h3>
                            <p>您申請的代付因付款超時或被賣家主動關閉導致代付失敗，請取消訂單重新提交，退款將會退至E幣錢包
<!--                              ，詳情請查看會員中心右上方<router-link to="/recordrb" style="color: #4843ff">E幣交易明細。</router-link>-->
                            </p>

                        </div>
                        <div v-if="OrderData.order_state==17">
                            <h3>代付失敗原因</h3>
                            <p >
                                您申請的代付因淘寶的因素被禁止代付，可能因為您在購買虛擬物品或近期淘寶不允許的交易，請取消訂單重新提交，退款將會退至E幣錢包，詳情請查看會員中心右上方
                                <router-link to="/recordrb" style="color: #4843ff">E幣交易明細。</router-link>
                            </p>
                        </div>
                    </div>
                    <div class="order_link">
                        <h3 style="font-size: 18px;"  v-if="OrderData.service_type==1">您的代付連結</h3>
                        <h3 style="font-size: 18px;"  v-else-if="OrderData.service_type==4">提現的銀行帳戶</h3>
                        <h3 style="font-size: 18px;" v-else-if="OrderData.service_type==3">您轉入的支付帳號</h3>
                        <a  v-if="OrderData.service_type==4" >{{OrderData.pay_url}}</a>
                        <p v-else>
                            <el-tooltip class="item" effect="dark"  placement="bottom-start">
                                <div slot="content">
                                    手續費 : 0 <br>
                                    支付寶帳號 : {{OrderData.alipay_name+OrderData.alipay_num}}<br>
                                    訂單金額 : {{OrderData.robot_rmb}}<br>
                                    商品明細 : <br> <span v-for="val in OrderData.product_name">{{val.product_name+'￥'+val.product_price}} <br></span>
                                </div>
                                <a style="color: #008cba;font-size: 15px" :href="OrderData.pay_url" >
                                    {{OrderData.pay_url}}
                                </a>
                            </el-tooltip>
                        </p>
                    </div>
                    <div class="order_message">
                        <h3>訂單留言</h3>
                        <p class="s1" style="font-size: 14px;margin-bottom: 20px" v-if="OrderData.remarks!=undefined">{{OrderData.remarks}}</p>
                        <p v-else>暫無留言 !</p>
                    </div>
                </div>
            </div>
        </div>
        <!--申请退款-->
        <el-dialog  :visible.sync="Applyrefund" title="申請退款" width="30%">
            <div style="padding: 20px">
                <div class="refund">
                    <span>退款原因</span>
                    <el-select v-model="refund_reason" placeholder="請選擇退款原因">
                        <el-option
                                v-for="item in refundvalue"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!--<div class="refund" style="margin-top: 20px">-->
                <!--<span>退款金額</span>-->
                <!--<el-input style="width: 30%" :disabled="mbeld" :value="OrderData.robot_rmb"></el-input>-->
                <!--</div>-->
                <div style="display: flex;flex-direction: row-reverse;margin-top: 20px">
                    <el-button type="primary" @click="refundOrder">確認並送出</el-button>
                </div>
            </div>
        </el-dialog>
        <Loading v-show="orderloading"></Loading>
    </div>
</template>

<script>
    import '../assets/js/jquery-3.3.1'
    import '../assets/css/style.css'
    import Cookies from 'js-cookie'
    import Loading from './vues/loading'
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                token:Cookies.get('egopay_key'),
                getRowClass:{
                    "background":"#e7e7e7",
                },
                mbeld:true,
                OrderData:{},
                fullscreenLoading:false,
                tswz:'',
                refund_reason:'我不想買了',
                Applyrefund:false,
                refundvalue:[{
                    value: '我不想買了',
                    label: '我不想買了'
                },{
                    value: '賣家缺貨',
                    label: '賣家缺貨'
                },{
                    value: '規格錯誤，重新買',
                    label: '規格錯誤，重新買'
                },{
                    value: '其他原因',
                    label: '其他原因'
                }],
                orderloading:false,//loading
                tongzhi_order:'',

            }
        },
        components: {
            Loading
        },
        methods: {
            yanzheng:function(type){
                this.$router.push({
                    path:'/',
                    query:{
                        kadan:type,
                    }
                });
            },
            //取消订单
            gosubStitute:function(){
                this.$router.push({
                    path:'/substitute'
                });
            },
            Transformation:function(line){
                line=line-1
                var s=parseInt((line*10+30))
                var h=Math.floor(s/60);
                if(s>60){
                    return h+'分'+(s%60)+'秒'
                }else {
                    return s+'秒';
                }
            },
            cancel_order:function () {
                this.$confirm('您將取消該筆訂單！',  {
                    confirmButtonText: '確定',
                    showCancelButton:'取消',
                    type: 'error'
                }).then(()=>{
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/cancel_order",
                        dataType: "json",
                        data: {order_id: this.OrderData.order_id},
                        success: (res) => {
                            if(res.success==1){
                                this.$message({
                                    showClose: true,
                                    message: '訂單已取消',
                                    type: 'success',
                                    center:true,
                                })
                                this.$router.push({path:'/'})
                            }
                        }
                    })

                }).catch((e)=>{})

            },
            refundR:function () {
                this.$confirm('您的金额将退至R币（1E幣=1人民幣）, 是否繼續?', {
                    confirmButtonText: '确定',
                    showCancelButton:false,
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/refund_r",
                        dataType: "json",
                        data: {
                            merber_id: this.merber_id,
                            token:this.token,
                            order_id:this.OrderData.order_id},
                        success: (res) => {
                            if(res.message==-1){
                                this.$message({
                                    message: '登陸已過期，請重新登入！',
                                    type: 'error',
                                    center: true
                                });
                                this.$router.push({path: '/'})
                                this.Logout()
                            }else if(res.success==1)
                                this.$message({
                                    type: 'success',
                                    message: '退款成功!'
                                });
                            this.$router.push({path:'/'})
                        }
                    })
                }).catch((e)=>{})
            },
            //初始化页面数据
            orderDetails:function () {
                var _this=this
                var order_id=this.$route.query.id
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/order_details",
                    data:{order_id:order_id},
                    beforeSend:function(XMLHttpRequest){
                        _this.orderloading=true
                    },
                    dataType:"json",
                    success:(res)=>{
                        if(res.success==1){
                            this.OrderData=res.data[0]
                            _this.orderloading=false
                        }

                    }
                })
            },
            //更新页面数据，30秒一次
            uporderdata:function(){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/order_details",
                    data:{order_id:this.OrderData.order_id},
                    dataType:"json",
                    success:(res)=>{
                        if(res.success==1) {
                            this.OrderData = res.data[0]
                        }
                    }
                })
            },
            refund:function () {
                this.Applyrefund=true
            },
            //申请退款
            refundOrder:function () {
                this.$confirm('您已提交退款申請,請確認淘寶/天貓/阿里巴巴/是否退款,退款金額會轉入E幣錢包（退款將於24~48小時內完成，請耐心等候，謝謝您配合）', '提示', {
                    confirmButtonText: '繼續',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/refund_order",
                        dataType:"json",
                        data: {
                            merber_id:this.merber_id,
                            token:this.token,
                            order_id:this.OrderData.order_id,
                            refund_reason:this.refund_reason},
                        success:(res)=>{
                            if(res.message==-1){
                                this.$message({
                                    message: '登陸已過期，請重新登入！',
                                    type: 'error',
                                    center: true
                                });
                                this.$router.push({path: '/'})
                                this.Logout()
                            }else if(res.success==1){
                                this.$message({
                                    type: 'success',
                                    message: '退款成功，請查收E幣餘額!',
                                    duration:6000
                                });
                                // this.Applyrefund=false;
                                // this.orderDetails();
                                this.$router.push({path:'/'})
                            }else if(res.success==2){
                                this.$message({
                                    type: 'success',
                                    message: '退款申請已提交，請確認淘寶是否退款!',
                                    duration:6000
                                });
                                this.$router.push({path:'/'})
                            }else {
                                this.$message({
                                    type: 'error',
                                    message: '退款處理失敗，請聯繫客服處理!',
                                    duration:6000
                                });
                            }
                        }
                    })
                }).catch()
            }

        },
        computed: {

        },
        watch: {},
        mounted:function(){
            var _this=this
            window.setInterval(() => {
                setTimeout(_this.uporderdata(),0)
            }, 30000)
        },
        created: function(){
            if(this.merber_id==undefined){
                this.$router.push({path: '/register'})
            }else {
                this.orderDetails();
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
    }
</script>
<style>
    .refund{
        display: flex;
        align-items: center;
    }
    .refund>span{
        display: inline-block;
        font-size: 15px;
        height: 40px;
        line-height: 37px;
        margin-right: -8px;
        color: #909399;
        padding: 0 20px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
        background-color: #f5f7fa;
    }
    .godaifu{
        font-size: 16px;
        line-height:90px;
        cursor: pointer;
        text-decoration:underline;
    }
    .godaifu:hover{
        color:rgb(70, 141, 185) ;
        font-weight: bold;
    }
</style>
