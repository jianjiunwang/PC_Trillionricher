<template>
    <div>
        <div class="subStitute_type" v-show="isnext" v-loading="product_order_loading" :element-loading-text="product_order_text"  element-loading-background="rgba(0, 0, 0, 0.7)">
            <div class="subStitute_xiadan">下單服務申請</div>
            <div>
                <span class="subtype_title">商品類型</span>
                <el-select v-model="subStitute_type" placeholder="請選擇商品類型" size="mini">
                    <el-option
                            class="optinlist"
                            v-for="item in typelist"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span class="subtype_title">商品金額</span>
                <el-input class="RMBinput" placeholder="請輸入商品總金額" v-model="RMB" size="mini"></el-input>
            </div>
            <div>
                <el-button type="primary" @click="Obtain" size="small" >獲取朋友帳號</el-button>
                <el-button v-show="RMB<200" type="primary" style="background-color: #999;color:#fff;border: 0px solid #0d397e" size="small" @click="replacezfb" :disabled="replacezfbdata.beld">{{replacezfbdata.text}}</el-button>
            </div>
            <div class="Alipay_account" v-show="alipayshow">
                <span>您的朋友代付帳號：</span>
                <el-tooltip class="item" effect="dark" content="點擊複製到剪貼簿" placement="bottom">
                    <span class="zfb" @click="Cope" :data-clipboard-text='zfb' v-loading="zfbloading"> {{zfb}} </span>
                </el-tooltip>
            </div>
            <div  class="Substitute_url">
                <span class="subtype_title">代付連接</span>
                <el-input placeholder="請輸入商品連接或吱口令" v-model="url" :disabled="urlbeld" size="mini"></el-input>
            </div>
            <div class="subStitute_button"  >
                <el-button type="primary"  size="mini" @click="submiturl" :disabled="nexturl">{{nextText}}</el-button>
            </div>
            <div  v-show="nextText=='等待錄入商品和金額'">
                <p style="padding: 10px 5px;color: #ffffff;font-size: 14px">我們正在幫您錄入代付商品和金額…請等待 <span style="color: red">{{urltimer.text}}</span></p>
            </div>
        </div>
        <!--超过5k提示弹出框-->
        <el-dialog  :visible.sync="toolTipbox"  width="500px" :close-on-click-modal="false"  :close-on-press-escape="false" :show-close="false"	style="margin-top: 20vh" >
                <span slot="title" >
                    <i class="iconfont el-icon-al-guanyu"></i>
                   提示
                </span>
            <div style="padding: 20px">
                <p style="font-size: 18px;line-height: 30px;">您好，新會員代付金額限制5000，如有大額需求請與客服聯絡開通</p>
                <el-button type="primary" style="width: 100%;margin-top: 50px" @click="govipindex">確 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import Clipboard from 'clipboard';
    let rst=new Clipboard('.zfb');
    export default {
        data: function () {
            return {
                merber_id:Cookies.get('merber_id'),
                merber_name:Cookies.get('merber_name'),
                merber_email:Cookies.get('merber_email'),

                token:Cookies.get('egopay_key'),
                CarruerNumjy:Cookies.get('CarruerNumjy'),
                subStitute_type:'',//代付类型
                typelist:[
                    {
                        value:1,
                        label:'實物商品'
                    },
                    {
                        value:2,
                        label:'虛擬商品'
                    },
                    {
                        value:10,
                        label:'集運代付'
                    }
                ],//代付类型选择
                RMB:'',//代付输入金额
                alipayshow:false,//支付宝账号显示开关
                toolTipbox:false,
                isnext:true,
                order_id:'',
                zfb:'',
                zfbloading:false,
                urlbeld:false,
                url:'',
                replacezfbdata:{
                    num:0,
                    time:60,
                    text:'更換朋友帳號',
                    beld:true
                },
                product_order_text:'',
                product_order_loading:false,
                nextText:'下一步',
                nexturl:false,//下一步的文字提示
                urltimer:{
                    text:'秒',
                    time:60
                },

            }
        },
        components: {},
        methods: {
            //用户输入RMB 获取支付宝账户
            Obtain:function () {
                var _this=this
                var re =/^\d+(\.\d+)?$/;
                if(this.subStitute_type == ''){
                    this.$message({
                        showClose: true,
                        message: '請選擇代付類型',
                        type: 'error',
                        center:true,
                    })
                    return false
                }
                if(this.RMB==='' || !re.test(this.RMB)){
                    this.$message({
                        showClose: true,
                        message: '請輸入正確的金額',
                        type: 'error',
                        center:true,
                    })
                    return false
                }

                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/get_alipay",
                    dataType:"json",
                    data: {
                        merber_id:this.merber_id,
                        token:this.token,
                        alipay_type:this.subStitute_type,
                        robot_rmb:this.RMB},
                    beforeSend:function(XMLHttpRequest){
                        _this.zfbloading=true
                    },
                    success:(res)=>{
                        if(res.success==-1){
                            this.$message({
                                message: '登陸已過期，請重新登入！',
                                type: 'error',
                                center: true
                            });
                            this.$router.push({path: '/'})
                            this.Logout()
                        }else if(res.success==1){
                            this.zfb=res.data
                            this.replacezfbdata.beld = false
                            this.alipayshow = true
                            this.zfbloading=false
                        }
                    }
                })

            },
            //代付链接错误提示以及赋值
            updataRMB:function () {
                if(isNaN(this.UpdataRMB)){
                    this.$message({
                        showClose: true,
                        message: '請輸入正確的金額',
                        type: 'error',
                        center:true,
                    })
                }else if(this.UpdataRMB==''){
                    this.$message({
                        showClose: true,
                        message: '代付連結不能為空',
                        type: 'error',
                        center: true,
                    })
                }else {
                    this.RMB=this.UpdataRMB
                }
            },
            //点击复制代付账号
            Cope:function () {
                this.$message({
                    showClose: true,
                    message: '複製成功',
                    type: 'success',
                    center:true,
                })
            },
            govipindex:function () {
                this.toolTipbox = false
                this.$router.push({
                    path:'/orderDetails',
                    query:{
                        id:this.order_id
                    }
                });
            },
            //更换代付账号
            replacezfb:function(){
                var _this=this

                if(this.replacezfbdata.num<10){
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/get_alipay",
                        dataType:"json",
                        data: {
                            merber_id:this.merber_id,
                            token:this.token,
                            alipay_type:this.subStitute_type,
                        },
                        beforeSend:function(XMLHttpRequest){
                            _this.zfbloading=true
                        },
                        success:(res)=>{
                            if(res.success==-1){
                                this.$message({
                                    message: '登陸已過期，請重新登入！',
                                    type: 'error',
                                    center: true
                                });
                                this.$router.push({path: '/'})
                                this.Logout()
                            }else if(res.success==1){
                                this.replacezfbdata.num+=1
                                this.zfb=res.data
                                this.zfbloading=false
                            }
                        }
                    })
                }else {
                    this.replacezfbtimer()
                }
            },
            //询价
            timer:function () {
                var _this=this
                if (this.urltimer.time >1) {
                    this.urltimer.time--;
                    this.product_order_text='我們正在幫您錄入代付商品和金額…請等待'+this.urltimer.time+"秒";
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/product_order",
                        dataType:"json",
                        data: {
                            merber_id:this.merber_id,
                            token:this.token,
                            order_id:this.order_id
                        },
                        success:(res)=>{
                            if (res.success==0){
                                if(this.urltimer.time > 1){
                                    setTimeout(this.timer, 1000);
                                }else {
                                    if(this.$route.path=='/substitute_one'){
                                        this.$alert('您目前排在訂單處理中的第 <span style="color: red;font-weight: bold">'+res.data.line+'</span>位 ，預計處理時間 <span style="color: red;font-weight: bold">'+this.Transformation(res.data.line)+'</span>，離開當前頁面將繼續為您處理此訂單', {
                                            dangerouslyUseHTMLString: true,
                                            showCancelButton:true,
                                            confirmButtonText:'離開當前頁',
                                            cancelButtonText:'繼續等待'
                                        }).then(()=>{
                                            _this.$router.push({
                                                path:'/orderDetails',
                                                query:{
                                                    id:res.data.order_id
                                                }
                                            });
                                        }).catch((e)=>{
                                            _this.urltimer.time=60
                                            setTimeout(this.timer, 1000);
                                        });
                                    }
                                }
                            }else if(res.success==1) {

                                this.$router.push({name: 'Two',params: {
                                        id:res.data.order_id,
                                 }})
                            }else if(res.success==2){
                                this.$confirm('您的代付連結已失效或朋友帳號錯誤，請重新申請代付連結',  {
                                    confirmButtonText: '確定',
                                    showCancelButton:false,
                                    type: 'error'
                                }).then(()=>{
                                    location.reload()
                                }).catch((e)=>{})
                            } else if(res.success == 3) {
                                this.toolTipbox = true
                                this.order_id = Number(res.msg)
                            }
                        }
                    })
                }
            },
            //获取汇率
            getexchange:function(){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/exchange",
                    dataType:"json",
                    data:{
                        exchange_type:1
                    },
                    success:(res)=>{
                        this.exchange=res.data[0].exchange
                    }
                })
            },
            submiturl:function () {
                var urlreg = /^https:\/\/shenghuo.alipay.com:443\/peerpaycore\/confirmPeerPay.htm\?id=.*$/
                var urlreg1 = /^https:\/\/shenghuo.alipay.com\/peerpaycore\/confirmPeerPay.htm\?id=.*$/
                var urlreg2 = /^https:\/\/shenghuo.aliphtay.com:443\/peerpaycore\/confirmPeerPay.htm\?id=.*$/
                var urlreg3 = /^https:\/\/shenghuo.alipay.com\/peerpaycore\/peerpayApply.htm\?orderId=.*$/

                if(this.zfb == ''){
                    this.$message({
                        showClose: true,
                        message: '請先獲取朋友賬號',
                        type: 'error',
                        center: true,
                    })
                    return false
                }
                if(!urlreg.test(this.url) && !urlreg1.test(this.url) && !urlreg2.test(this.url)  && !urlreg3.test(this.url)){
                    this.$message({
                        showClose: true,
                        message: '請粘貼正確的代付連結,吱口令代付目前維護中',
                        type: 'error',
                        center: true,
                    })
                    return false
                }

                this.getexchange()
                this.urlbeld=true
                this.product_order_loading = true
                var twd=(this.RMB*this.exchange).toFixed(0);
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/submit_url",
                    dataType:"json",
                    data: {
                        merber_id:this.merber_id,
                        token:this.token,
                        service_type:1,
                        pay_url:this.url,
                        exchange_rate:this.exchange,
                        order_money:this.RMB,
                        pay_number:this.zfb,
                        twd:twd,
                        service_charge:0
                    },
                    success:(res)=>{
                        if(res.success==-1){
                            this.$message({
                                message: '登陸已過期，請重新登入！',
                                type: 'error',
                                center: true
                            });
                            this.$router.push({path: '/'})
                            this.Logout()
                        }else if(res.success==1){
                            this.product_order_text='等待錄入商品和金額';
                            this.order_id=res.data.order_id
                            this.timer();
                        }else if(res.success==3){
                            this.product_order_loading = false
                            this.$message({
                                showClose: true,
                                message: '這個代付連結已經提交過啦！',
                                type: 'error',
                                center:true,
                            })
                            this.urlbeld=false
                        }else if(res.success==14){

                            this.$router.push({
                                path:'/orderDetails',
                                query:{
                                    id:res.data
                                }
                            });
                        }else if(res.success==6){
                            this.product_order_loading = false
                            this.$confirm('您還有一筆待付款訂單未處理，請您付款或取消訂單後再下單', '提示', {
                                distinguishCancelAndClose: true,
                                confirmButtonText: '前往付款',
                                cancelButtonText: '取消訂單',
                                type: 'warning'
                            }).then(() => {
                                this.$router.push({
                                    path:'/orderDetails',
                                    query:{
                                        id:res.data.order_id
                                    }
                                });
                            }).catch(() => {
                                this.$router.push({
                                    path:'/orderDetails',
                                    query:{
                                        id:res.data.order_id
                                    }
                                });
                            });
                        }
                    }
                })
            }
        },
        computed: {},
        watch: {
        },
        mounted: function () {

        },
        created:function () {
            this.getexchange()
        }
    }
</script>
