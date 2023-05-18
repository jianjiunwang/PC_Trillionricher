<template>
    <div class="recordrb">
        <div class="content">
            <router-link to="/"  ><div class="orderdata_head"><i class="el-icon-arrow-left"></i>E幣交易記錄 </div></router-link>
            <div class="rbmx" >
                <table class="order_table">
                    <tr>
                        <th>訂單編號</th>
                        <th>內容</th>
                        <th>收入</th>
                        <th>支出</th>
                        <th>餘額</th>
                        <th>時間</th>
                    </tr>
                    <tr class="recordrb_list" v-for="(item,index) in rblist" :key="index" style="margin-top: 10px" @click="goorderdata(item.order_id)">
                        <td>{{item.order_num}}</td>
                   1

                        <td class="color_green" v-if="(item.income_expenses).substr(0,1)=='+'">{{item.income_expenses}}</td>
                        <td v-else>0</td>
                        <td class="color_red" v-if="(item.income_expenses).substr(0,1)=='-'">{{item.income_expenses}}</td>
                        <td v-else>0</td>
                        <td class="color_org">{{item.balance}}</td>
                        <td>

                        </td>
                    </tr>
                </table>

            </div>
        </div>
        <Loading v-show="loading"></Loading>
        <div class="listpage content">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="20"
                    @current-change="Currentpage"
                    @prev-click="Currentpage"
                    @next-click="Currentpage"
                    :total="listtotal">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import Loading from './vues/loading'
    export default {
        data: function () {
            return {
                merber_id :Cookies.get('merber_id'),
                token :Cookies.get('egopay_key'),
                listtotal:100,//数据总条数
                rblist:[],
                page:1,
                loading:false,
                cashdialog:false,
                cashrmb:'',//提款金额
                cash_bank:'',//提现银行
                cashdata:{},
                exchange:'',

            }
        },
        components: {
            Loading
        },
        methods: {
            //上一页 下一页
            Currentpage:function (page) {
                this.page = page
                this.get_recordrbdata()
            },
            get_recordrbdata:function (page) {
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/r_detail",
                    dataType:"json",
                    data:{
                        merber_id:this.merber_id,
                        token:this.token,
                        page:this.page,
                    },
                    beforeSend:function(XMLHttpRequest){
                        _this.loading=true
                    },
                    success:(res)=>{
                        if(res.success==-1){
                            this.Logout()
                        }else if(res.success==1){
                            this.listtotal =Number(res.msg)
                            this.rblist=res.data
                            this.loading=false
                        }
                    }
                })
            },
            allcashrmb:function(){
                this.cashrmb=this.cashdata.r_money
            },
            gocash:function () {
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/check_bank",
                    dataType:"json",
                    data:{
                        merber_id:this.merber_id,
                        token:this.token
                    },
                    success:(res)=>{
                        if(res.success==-1){
                            this.Logout()
                        }else if(res.success==1){
                            this.cashdata=res.data
                            this.cashdialog=true
                        }else if(res.success==3){
                            this.$message({
                                message: '您未綁定銀行卡帳戶，或銀行卡驗證尚未通過！',
                                type: 'error',
                                center:true
                            });
                        }else if(res.success==2){
                            this.$message({
                                message: '您還有一筆提款訂單未完成！',
                                type: 'error',
                                center:true
                            });
                        }
                    }
                })
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/exchange",
                    dataType:"json",
                    data:{exchange_type:4},
                    success:(res)=> {
                        this.exchange=res.data[0].exchange
                    }
                })
            },
            confirmcash:function () {
                if(Number(this.cashrmb)>Number(this.cashdata.r_money)){
                    this.$message({
                        message: 'E幣餘額不足！',
                        type: 'error',
                        center:true
                    });
                }else if(this.cash_bank==''){
                    this.$message({
                        message: '請選擇提現銀行！',
                        type: 'error',
                        center:true
                    });
                }else {
                    var robot_twd=this.cashrmb*this.exchange-15
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/withdraw",
                        dataType:"json",
                        data:{
                            merber_id:this.merber_id,
                            token:this.token,
                            exchange_rate:this.exchange,
                            robot_rmb:this.cashrmb,
                            robot_twd:robot_twd,
                            service_charge:15,
                            pay_url:this.cash_bank
                        },
                        success:(res)=> {
                            if(res.success==-1){

                                this.Logout()
                            }else if(res.success==1){
                               this.$message({
                                   message: '提款申請成功，請等待！',
                                   type: 'success',
                                   center:true
                               });
                               this.cashdialog=false
                               this.get_recordrbdata()
                               // Object.assign(this.$data, this.$options.data())
                           }
                        }
                    })
                }
            },
            goorderdata:function (id) {
                this.$router.push({
                    path:'/orderDetails',
                    query:{
                        id:id
                    }
                });
            }
        },
        computed: {},
        watch: {},
        created: function () {
            if(this.merber_id==undefined){
                this.$router.push({path: '/register'})
            }else {
                this.get_recordrbdata()
            }
        }
    }
</script>
<style>

</style>
