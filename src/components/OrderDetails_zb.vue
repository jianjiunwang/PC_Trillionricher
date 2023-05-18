<template>
    <div class="order_zb" style="background-color: #0f0f0f; flex: 1;">
        <div class="content" >
            <div class="orderdata_head"><router-link to="/"  style="color: #468DB9;margin-left: 10px;font-size: 16px;cursor: pointer;"><i class="el-icon-arrow-left"></i></router-link>訂單明細 </div>
            <table class="order_table">
                <tr>
                    <th>訂單號</th>
                    <th>商品名稱</th>
                    <th>平台帳號</th>
                    <th>應付款項</th>
                </tr>
                <tr >
                    <td >{{orderdata.order_num}}</td>
                    <td v-if="orderdata.order_type == '1'">鬥魚直播</td>
                    <td v-if="orderdata.order_type == '2'">虎牙直播</td>
                    <td v-if="orderdata.order_type == '3'">抖音直播</td>
                    <td v-if="orderdata.order_type == '4'">快手直播</td>
                    <td>{{orderdata.other_account}}</td>
                    <td>NT$ {{orderdata.order_twd}}</td>
                </tr>
            </table>
            <table class="order_table">
                <tr>
                    <th>付款方式</th>
                    <th>
                        <span v-if="orderdata.payment_method === '1' || orderdata.payment_method === '6' || orderdata.payment_method === '4' || orderdata.payment_method === '8' || orderdata.payment_method === '9'">虛擬帳號</span>
                        <span v-if="orderdata.payment_method==2">超商付款</span>
                        <span v-if="orderdata.payment_method==3">錢包餘額</span>
                        <span v-if="orderdata.payment_method==5">錢包餘額 + 補款</span>
                    </th>
                    <th>交易創建時間</th>
                    <th>交易狀態</th>
                </tr>
                <tr >
                    <td>
                        <span v-if="orderdata.payment_method==9">中國信託(822) </span>
                        <span v-if="orderdata.payment_method==8">星展銀行(810) </span>
                        <span v-if="orderdata.payment_method==2">超商付款</span>
                        <span v-if="orderdata.payment_method==3">錢包餘額</span>
                        <span v-if="orderdata.payment_method==5">錢包餘額 + 補款</span>
                    </td>
                    <td>
                        <span v-if="orderdata.payment_method==9 || orderdata.payment_method==8">{{orderdata.payment_account}}</span>
                        <span v-if="orderdata.payment_method==2">超商代碼 : {{orderdata.payment_account}}</span>

                    </td>
                    <td >{{orderdata.create_time | convTimehms}}</td>
                    <td>
                        <span  v-if="orderdata.order_state==3" style="color:#FFA801">等待匯款</span>
                        <span  v-if="orderdata.order_state==4" style="color:#004bd9">處理中</span>
                        <span  v-if="orderdata.order_state==6" style="color:#49ff00">已完成</span>
                        <span  v-if="orderdata.order_state==7" style="color:#ff5854">已取消</span>
                        <span  v-if="orderdata.order_state==10" style="color:#ff0017">訂單失敗</span>
                    </td>
                </tr>
            </table>
            <div style="display: flex;padding: 10px 0;" v-if="orderdata.order_state==3">
                <el-button type="danger" @click="cancel_platorder">取消訂單</el-button>
            </div>
            <div class="order_message">
                <h3>訂單留言</h3>
                <p>暫無留言 !</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        data: function () {
            return {
                merber_id :Cookies.get('merber_id'),
                token: Cookies.get('egopay_key'),
                orderdata:{}
            }
        },
        components: {},
        methods: {
            getorderdata_zb(id){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/GetPlat/",
                    dataType: "json",
                    data: {
                        merber_id:this.merber_id,
                        token:this.token,
                        pid:id
                    },
                    success: (res) => {
                        console.log(res);
                        if(res.success==1){
                            this.orderdata =  res.data
                        }
                    }
                })
            },
            cancel_platorder(){
                this.$confirm('您將取消訂單，是否繼續?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/cancel_platorder/",
                        dataType: "json",
                        data: {
                            merber_id:this.merber_id,
                            token:this.token,
                            pid:this.orderdata.pid
                        },
                        success: (res) => {
                            if(res.success==1){
                                this.$message({
                                    type: 'success',
                                    message: '訂單已取消!'
                                });
                            }
                            this.getorderdata_zb(this.orderdata.pid)
                        }
                    })
                }).catch(() => {

                });
            }
        },
        computed: {},
        watch: {},
        mounted: function () {
            var id=this.$route.query.id
            this.getorderdata_zb(id)
        }
    }
</script>
