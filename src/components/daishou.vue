<template>
    <div class="Alipay_stored">
        <div class="tongzhi">
            <div class="content">
                <i class="iconfont el-icon-al-xitonggonggao" style="color: #fe5e00;font-size: 20px;margin-left: 10px"></i>
                <span>{{tongzhi_cz}}</span>
            </div>
        </div>
        <div class="chuzhi">
            <div class="orderdata_head"><router-link to="/"  style="color: #468DB9;margin-left: 10px;font-size: 16px;cursor: pointer;"><i class="el-icon-arrow-left"></i></router-link>申請代收訂單 </div>
            <div class="storage_fee">
                <ul>
                    <li>
                        <span>訂單金額</span>
                        <span style="color: #5dff83">{{robot_rmb==''?0:robot_rmb}}</span>
                    </li>
                    <li>
                        <span>匯率</span>
                        <span>{{exchange}}</span>
                    </li>
                    <li>
                        <span>總額</span>
                        <span>{{(Number(this.robot_rmb))}}</span>
                    </li>
                    <li>
                        <span>應付款項</span>
                        <span style="color: #5dff83">NT${{Math.ceil(Number(robot_rmb)*exchange)}}</span>
                    </li>
                </ul>
            </div>
            <div class="storage_xq">
                <div class="storagexq_body">
                    <div class="storage_body_left">
                        <div>
                            <div class="selectzfb">
                                <h5 style="margin-bottom:10px ">類型</h5>
                                <el-select v-model="service_type" placeholder="請選擇類型" style="width:50%" size="mini"  no-data-text="您还没有认证过得支付宝哦">
                                    <el-option
                                        v-for="item in service_type_list"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <h5 style="margin-bottom:10px ">支付寶帳戶</h5>
                                <el-select v-model="daichuzh" placeholder="請選擇支付寶帳戶" style="width:50%" size="mini"  no-data-text="您还没有认证过得支付宝哦">
                                    <el-option
                                        v-for="item in aliapy"
                                        :key="item.value"
                                        :label="item.alipay_name+item.alipay_num"
                                        :value="item.alipay_num">
                                    </el-option>
                                </el-select>
                                <h5 style="margin-bottom:10px ">匯率</h5>
                                <el-input v-model="exchange" style="width:245px" type="Number" placeholder="請輸入金額 "  size="mini"></el-input>
                                <h5 style="margin-bottom:10px ">銀行碼後5位</h5>
                                <el-input v-model="bankcode" style="width:245px" type="Number" placeholder="請輸入銀行碼後5位 "  size="mini"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="storage_body_right">
                        <div class="RMB_TWD">
                            <div style="margin-right: 20px">
                                <span>訂單金額</span>
                                <el-input v-model="robot_rmb" type="Number" placeholder="請輸入金額 "  size="mini" oninput="if(value<0)value=0" @input="inputrmb"></el-input>
                            </div>
                            <i class="el-icon-refresh"></i>
                            <div style="margin-left: 20px">
                                <span>需支付款項</span>
                                <el-input  v-model="robot_twd" size="mini" :disabled="true"  type="Number" ></el-input>
                            </div>
                        </div>
                        <div class="Nextstep">
                            <div>
                                <el-button type="primary" size="small"><router-link to="/"   style="color:#fff;">返回</router-link></el-button>
                                <el-button type="primary" @click="daichuconfirm" size="small" style="background-color: #efb300">下一步</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-show="loading_dc"></Loading>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import Loading from './vues/loading'
import Notice from './vues/notice'
import Common from './vues/Common'
export default {
    inject:['reload'],
    data: function () {
        return {


            merbervip:{},

            store_type:'',

            pwdList: [],
            oldPwdList: [],
            isDelete: false,
            ipt: '',
            chaoshang:'',
            Paymentpwd:true,
            loading_dc:false,
            aliapy:[{

            }],//已认证过的支付宝
            exchange:'',
            exchangelist:[],
            merber_id :Cookies.get('merber_id'),
            merber_name: Cookies.get('merber_name'),
            token: Cookies.get('egopay_key'),
            CarruerNumjy:Cookies.get('CarruerNumjy'),
            merber_email:Cookies.get('merber_email'),
            merber_vip:'',//是否是会员
            active:1,
            robot_rmb:'',//储值人名币金额
            isconfirm:false,//是否确认支付宝
            robot_twd:'',//储值台币金额
            radioBank:'3',
            daichuData:{},
            Agreement:false,
            subdaichubled:true,
            tongzhi_cz:'',
            ServiceCharge:0,
            daichuzh:'',//代储账户
            r_money:'',
            confirmby:'none',
            ConsentBook:false,
            RiskTakingBook:false,
            RTbook:false,
            bankcode:'',//付款银行后5位
            service_type:'3',
            service_type_list:[
                {
                    value: '3',
                    label: '代儲'
                },
                {
                    value: '5',
                    label: '代收'
                }
            ]
        }
    },
    components: {
        Notice,
        Loading
    },
    methods: {
        //获取通知
        gettongzhi:function(){
            $.ajax({
                type: "POST",
                url: "https://www.trillionricher.com/1.0/inform",
                dataType:"json",
                data:{page:4},
                success:(res)=>{
                    if(res.success==1){
                        this.tongzhi_cz=res.data[0].content
                    }
                }
            })
        },


        //提交代储参数验证
        daichuconfirm:function () {
            // var re = /^[0-9]+.?[0-9]*/;
            // var carReg = /^[A-Z]{2}[0-9]{14}$/;
            // var car_tReg = /^\/{1}[0-9A-Z]{7}$/;
            // var car2_Reg = /^\/[A-Z0-9\+\-\.]{7}$/;
            // var mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g;
            // var codeReg=/^[0-9]{3,7}/;

            if ( this.robot_rmb == '') {
                this.$message({
                    showClose: true,
                    message: '請輸入代收金額',
                    type: 'error',
                    center: true,
                })
                return false
            }
            if ( this.bankcode == '') {
                this.$message({
                    showClose: true,
                    message: '請輸入銀行碼後5位',
                    type: 'error',
                    center: true,
                })
                return false
            }
            if(this.daichuzh==''){
                this.$message({
                    showClose: true,
                    message: '請選擇代購賬號',
                    type: 'error',
                    center: true,
                })
                return false
            }
            this.subdaichuAJAX()
        },
        //提交代储
        subdaichuAJAX:function(){
            var _this=this;
            this.subdaichubled=true;

            $.ajax({
                type: "POST",
                url: "https://www.trillionricher.com/1.0/elsestore",
                dataType:"json",
                data:{
                    merber_id:this.merber_id,
                    token:this.token,
                    exchange_rate:this.exchange,
                    robot_rmb:this.robot_rmb,
                    bankcode:this.bankcode,
                    pay_url:this.daichuzh,
                    robot_twd:Math.ceil((Number(this.robot_rmb)+this.ServiceCharge)*this.exchange),
                    service_type:this.service_type
                },
                success:(res)=>{
                    if(res.success==-1){
                        this.Logout()
                    }else if(res.success==1){
                        this.$message({
                            message: '您的虛擬付款帳號已經通過短信發送到您的手機',
                            type: 'success'
                        });
                        this.$router.push({
                            path:'/orderDetails',
                            query:{
                                id:res.data.order_id
                            }
                        });
                    }else if(res.success==2){
                        this.$message({
                            message: '您當前沒有可用的E幣，請重新選擇付款方式！',
                            type: 'error',
                            center: true
                        });
                    }else if(res.success==5){
                        this.$message({
                            message: '網路錯誤，請重新整理後再提交',
                            type: 'error'
                        });
                    }else if(res.success==11){
                        this.$message({
                            message: '重複操作，請您稍後再試！',
                            type: 'error',
                            center: true
                        });
                        _this.$router.push({ path:'/record'})
                    }
                }
            })


        },
        inputrmb:function (e) {
            this.robot_twd=Math.ceil(e*this.exchange);
        },
        getzhifubao:function(){
            $.ajax({
                type: "POST",
                url: "https://www.trillionricher.com/1.0/order_bank_alipay",
                dataType:"json",
                data:{
                    merber_id:this.merber_id,
                    token:this.token
                },
                success:(res)=>{
                    if(res.success==-1){
                        this.Logout()
                    }else if(res.success==1){
                        this.merber_phone = res.data.merber_phone
                        this.merber_vip = res.data.merber_vip
                        this.aliapy=res.data.alipay;
                        this.r_money = res.data.r_money
                    }
                }
            })
        },
    },
    computed: {},
    watch: {
        exchange:function (val) {
            this.robot_twd = Math.ceil(Number(this.robot_rmb)*val)
        }
    },
    created: function () {
        if(this.$route.query.key!== '5Luj5pS2'){
            this.$router.push({ path:'/'})
            return
        }
        this.getzhifubao()
    }
}
</script>
