<template>
    <div>
        <div class="Platform_r" >
            <div class="Platform_r_type">
                <h5>選擇商品</h5>
                <ul>
                    <li v-for="(item,i) in Platform_r_type " :key="i" :class="{'select_type':selectp_type==i}"  @click="selectp_type = i;" >
                        <img :src="item.img" alt="">
                        <div>
                            <span>{{item.text}}</span>
                        </div>
                    </li>

                </ul>
            </div>

            <div class="Recharge_Quantity">
                <h5>選擇面額</h5>
                <ul v-if="selectp_type == 0">
                    <li v-for="(item,i) in douyu" :key="i" :class="{'select_type':Quantity_type==i}" @click="Quantity = item.num;Quantity_type=i">
                        <span>{{item.text}}</span>
                        <span >NT$ {{item.num}}</span>
                    </li>
                </ul>
                <ul v-if="selectp_type == 1">
                    <li v-for="(item,i) in huya" :key="i" :class="{'select_type':Quantity_type==i}" @click="Quantity = item.num;Quantity_type=i">
                        <span>{{item.text}}</span>
                        <span >NT$ {{item.num}}</span>
                    </li>
                </ul>
                <ul v-if="selectp_type == 2">
                    <li v-for="(item,i) in douyin" :key="i" :class="{'select_type':Quantity_type==i}" @click="Quantity = item.num;Quantity_type=i">
                        <span>{{item.text}}</span>
                        <span >NT$ {{item.num}}</span>
                    </li>
                </ul>
                <ul v-if="selectp_type == 3">
                    <li v-for="(item,i) in kuaishou" :key="i" :class="{'select_type':Quantity_type==i}" @click="Quantity = item.num;Quantity_type=i">
                        <span>{{item.text}}</span>
                        <span >NT$ {{item.num}}</span>
                    </li>
                </ul>
                <h5>數量</h5>
                <el-input-number :min="1" :max="100" v-model="Recharge_Num" :precision="0" :step="1"></el-input-number>
                <h5>平台帳號</h5>
                <el-input  v-model="other_account"  placeholder="請輸入平台帳號" style="width: 300px" ></el-input>
                <h5>付款方式</h5>


                <el-radio v-model="radioBank" label="9" style="color: #000000;display: flex">
                    <div  class="payment_method">
                        <h4 >網路ATM/ATM櫃機</h4>
                        <p>中國信託(822)虛擬帳號</p>
                        <img src="../assets/image/ZGXT1.png" alt="" >
                    </div>
                    <div v-show="radioBank == 9 " style="padding-top: 10px">
                      <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>
                      <p>若轉帳後４８小時未入帳請與我們聯絡。</p>
                      <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>
                      <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>
                      <el-input  v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px" ></el-input>
                    </div>
                </el-radio>


                <!--<el-radio v-model="radioBank" label="8" style="color: #000000;display: flex;margin: 15px 0 0 0">-->
                    <!--<div  class="payment_method">-->
                        <!--<h4 >網路ATM/ATM櫃機</h4>-->
                        <!--<p>星展銀行(810)虛擬帳號</p>-->
                        <!--<img src="../assets/image/xzyh2.jpg" alt="" height="75">-->
                    <!--</div>-->
                    <!--<el-input v-show="radioBank === '8'" v-model="bankcode"  placeholder="請輸入匯款帳號後五碼 " style="margin-top: 15px" ></el-input>-->
                <!--</el-radio>-->

                <!--<el-radio v-model="radioBank" label="2"  style="color: #000000;display: flex;margin: 15px 0 0 0" >-->
                    <!--<div class="payment_method">-->
                        <!--<h4>超商付款（超商繳費程式碼將發至您的手機）</h4>-->
                        <!--<p>7-11/全家/萊爾富/OK超商 <span > <span>手續費30元 </span>，不足30臺幣按30臺幣收取</span></p>-->
                        <!--<p>使用超商付款不能超過5970元新台幣</p>-->
                        <!--<p>繳費代碼在送出訂單後將傳送至您的手機</p>-->
                        <!--<img src="../assets/image/1585229780-784296694_wn.jpg" alt="">-->
                    <!--</div>-->
                <!--</el-radio>-->
            </div>
            <div class="total">
                <span>總計 : <span style="color: #FE0000">NT$ {{Quantity * Recharge_Num}}</span></span>
                <el-button block type="primary" @click="subRecharge_r">立即提交</el-button>
            </div>
        </div>
        <div v-html="chaoshang" style="opacity: 0"></div>

    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        data: function () {
            return {
                Recharge_type:'',
                merber_id :Cookies.get('merber_id'),
                token: Cookies.get('egopay_key'),
                Platform_r_type:[
                    {text:'鬥魚直播',img:require('../assets/image/douyu.png')},
                    {text:'虎牙直播',img:require('../assets/image/huyalogo.png')}  ,
                    {text:'抖音直播',img:require('../assets/image/douyinl.png')}  ,
                    {text:'快手直播',img:require('../assets/image/kuaishou.png')}
                ],
                douyu:[

                    {text:"100鱼翅",num:460},
                    {text:"300鱼翅",num:1380},
                    {text:"500鱼翅",num:2300},
                    {text:"1000鱼翅",num:4600},
                    {text:"10000鱼翅",num:46000}
                ],
                huya:[

                    {text:"100虎牙幣",num:460},
                    {text:"300虎牙幣",num:1380},
                    {text:"500虎牙幣",num:2300},
                    {text:"1000虎牙幣",num:4600},
                    {text:"10000虎牙幣",num:46000}
                ],
                douyin:[

                    {text:"1000抖幣",num:460},
                    {text:"3000抖幣",num:1380},
                    {text:"5000抖幣",num:2300},
                    {text:"10000抖幣",num:4600},
                    {text:"100000抖幣",num:46000}
                ],
                kuaishou:[
                    {text:"1000快幣",num:460},
                    {text:"3000快幣",num:1380},
                    {text:"5000快幣",num:2300},
                    {text:"10000快幣",num:4600},
                    {text:"100000快幣",num:46000}
                ],
                Recharge_Num:1,
                Quantity:470,
                selectp_type:0,
                Quantity_type:0,
                radioBank:'9',
                bankcode:'',
                other_account:'',
                chaoshang:''

            }
        },
        components: {},
        methods: {
            subRecharge_r(){
                if(this.radioBank!=='2' && this.bankcode.length !==5){
                    this.$message({
                        showClose: true,
                        message: '請輸入匯款銀行後五位',
                        type: 'error',
                        center: true,
                    })
                    return false
                }
                if(this.other_account == ""){
                    this.$message({
                        showClose: true,
                        message: '請輸入平台帳號',
                        type: 'error',
                        center: true,
                    })
                    return false
                }
                var product_name = ''
                var type = ''
                if(this.selectp_type === 0){product_name='鱼翅',type = 4}
                if(this.selectp_type === 1){product_name='虎牙幣',type = 3}
                if(this.selectp_type === 2){product_name='抖幣', type =1}
                if(this.selectp_type === 3){product_name='快幣',type = 2}

                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/CreatePlatfrom/",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        order_type:type,
                        product_name:product_name,
                        order_rmb:this.Quantity * this.Recharge_Num /4.6,
                        order_twd:this.Quantity * this.Recharge_Num,
                        payment_method:this.radioBank,
                        bankcode:this.bankcode,
                        amount:this.Recharge_Num,
                        other_account:this.other_account
                    },
                    success: (res) => {

                        if(res.success==1){
                            if(this.radioBank==2){
                                this.chaoshang=res.data;
                                window.setTimeout(function () {
                                    document.getElementById("__ecpayForm").submit();
                                },1000)
                                return false
                            }
                            this.$message({
                                showClose: true,
                                message: '訂單已提交，請稍後',
                                type: 'success',
                                center:true,
                            });
                            this.$router.push({
                                path:'/orderDeta_zb',
                                query:{
                                    id:res.data.pid
                                }
                            });
                        }else {
                            this.$message({
                                message: '網絡錯誤',
                                type: 'error',
                                center:true,
                            });
                        }
                    }
                })
            },
            history_platorder(){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/history_platorder/",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                    },
                    success: (res) => {

                        if(res.success==1){
                            this.$message({
                                showClose: true,
                                message: '您還有一筆未完成付款訂單',
                                type: 'error',
                                center:true,
                            });
                            this.$router.push({
                                path:'/orderDeta_zb',
                                query:{
                                    id:res.data.pid
                                }
                            });
                        }
                    }
                })
            },
            getvipindexdata: function () {
                var _this = this
                this.$axios.post('https://www.trillionricher.com/1.0/order_bank_alipay', {
                    merber_id:_this.merber_id,
                    token:_this.token
                }).then(function (res) {
                    res = res.data
                    if(res.success === -1){
                        _this.Logout()
                    }
                    if(res.success === 1){
                        if(res.data.authentication !=='3'){
                            this.$router.push({path: '/'})
                            this.$message({
                                showClose: true,
                                message: '請先完成身份認證',
                                type: 'error'
                            });
                            return false
                        }
                    }

                }).catch(function (error) {
                    console.log(error);
                });

            },
        },
        computed: {},
        watch: {
            selectp_type:function (val) {
                this.Quantity_type = 0
                if(val == 0){this.Quantity = this.douyu[0].num}
                if(val == 1){this.Quantity = this.huya[0].num}
                if(val == 2){this.Quantity = this.douyin[0].num}
                if(val == 3){this.Quantity = this.kuaishou[0].num}
            }
        },
        mounted: function () {
            this.$router.push({path: '/'})
            this.$message({
                showClose: true,
                message: '服務更新維護中',
                type: 'error'
            });
            return
            this.history_platorder()
            this.getvipindexdata()
            var type=this.$route.query.type
            if(type == 5){this.selectp_type = 0}
            if(type == 6){this.selectp_type = 1}
            if(type == 7){this.selectp_type = 2}
            if(type == 8){this.selectp_type = 3}
        }
    }
</script>
<style>

</style>
