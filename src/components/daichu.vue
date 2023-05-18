<template>
    <div class="Alipay_stored" >
        <div class="tongzhi">
            <div class="content">
                <i class="iconfont el-icon-al-xitonggonggao" style="color: #fe5e00;font-size: 20px;margin-left: 10px"></i>
                <span>{{tongzhi_cz}}</span>
            </div>
        </div>
        <div class="chuzhi">
            <div class="orderdata_head"><router-link to="/"  style="color: #468DB9;margin-left: 10px;font-size: 16px;cursor: pointer;"><i class="el-icon-arrow-left"></i></router-link>申請訂單 </div>
            <div class="storage_fee">
                <ul>
                    <li>
                        <span>訂單金額</span>
                        <span style="color: #5dff83">{{robot_rmb==''?0:robot_rmb}}</span>
                    </li>
                    <li>
                        <span>服務手續費</span>
                        <span>{{ServiceCharge}}</span>
                    </li>
                    <li>
                        <span>總額</span>
                        <span>{{(Number(this.robot_rmb)+this.ServiceCharge)}}</span>
                    </li>
                    <li>
                        <span>應付款項</span>
                        <span style="color: #5dff83">NT${{robot_rmb==''?0:Math.ceil((Number(this.robot_rmb)+this.ServiceCharge)*exchange) }}</span>
                    </li>
                </ul>
            </div>
            <div class="storage_xq">
                <div class="storage_xq_body">
                    <div class="storage_body_left">
                        <div class="RMB_TWD">
                            <div style="margin-right: 20px">
                                <span>訂單金額</span>
                                <el-input v-model="robot_rmb" type="Number" placeholder="請輸入金額 "  size="mini" oninput="if(value<0)value=0" @input="inputrmb"></el-input>
                            </div>
                            <i class="el-icon-refresh" style="margin-bottom: 7px"></i>
                            <div style="margin-left: 20px">
                                <span>需支付款項</span>
                                <el-input  v-model="robot_twd" size="mini" :disabled="true"  type="Number" ></el-input>
                            </div>
                        </div>
                        <div>
                            <div class="selectzfb">
                                <h5>支付寶帳戶</h5>
                                <el-select v-model="daichuzh" placeholder="請選擇支付寶帳戶" style="width:290px" size="mini"  no-data-text="您还没有认证过得支付宝哦">
                                <el-option
                                        v-for="item in aliapy"
                                        :key="item.value"
                                        :label="item.alipay_name+item.alipay_num"
                                        :value="item.alipay_num">
                                </el-option>
                                </el-select>
                                <h5 style="margin-bottom:10px ">支付寶類型</h5>
                                <el-select v-model="store_type" placeholder="請選擇支付寶類型" style="width:290px" size="mini"  >
                                    <el-option
                                            v-for="item in store_type_list"
                                            :key="item.value"
                                            :label="item.text"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <!--<sapn style="font-size: 14px;color: #19be6b">「賬號正常」可以使用直接轉賬服務</sapn>-->
                        </div>
                        <div>
                            <el-checkbox v-model="RTbook" style="color: #ed3f14;margin-top: 20px">我了解帳戶真實性，相關風險由個人承擔</el-checkbox>
                        </div>
                        <div class="fukuan">
                            <h4>付款方式</h4>

                            <div class="payment_methodlist">
                                <div class="payment_method" v-if="Number(robot_rmb)>Number(r_money)" @click="radioBank = '5'" :style="radioBank=='5'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">
                                    <img src="../assets/image/img/qianbao.png" alt="">
                                    <div>
                                        <h3>錢包餘額付款</h3>
                                        <p>錢包餘額<span style="color:#19be6b;">{{Number(r_money).toFixed(2)}}</span></p>
                                    </div>
                                </div>
                                <div class="payment_method" v-else @click="radioBank = 3" :style="radioBank=='3'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">
                                    <img src="../assets/image/img/qianbao.png" alt="">
                                    <div>
                                        <h3>錢包餘額付款</h3>
                                        <p>錢包餘額<span class="color_red">{{Number(r_money).toFixed(2)}}</span>個</p>
                                    </div>
                                </div>
                                <div  class="payment_method" @click="radioBank = 9" :style="radioBank=='7'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">
                                    <img src="../assets/image/img/ATM.png" alt="">
                                    <div>
                                        <h3 >網路ATM/ATM櫃機</h3>
                                        <p>國泰銀行(013)虛擬帳號</p>
                                    </div>
                                </div>
                            </div>



                            <div v-show="radioBank == 9 " style="padding-top: 10px;font-size: 14px">
                              <img src="../assets/image/ZGXT1.png" alt="" style="width: 200px">
                              <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>
                              <p>若轉帳後４８小時未入帳請與我們聯絡。</p>
                              <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>
                              <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>
                              <el-input  v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px;width: 620px" ></el-input>
                            </div>
<!--                            <div v-show="radioBank == 7 " style="padding-top: 10px;font-size: 14px">-->
<!--                                <img src="../assets/image/guotai.jpg" alt="" style="width: 150px;width:150px;    border-radius: 10px;-->
<!--    border: 1px solid #ccc;">-->
<!--                                <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>-->
<!--                                <p>若轉帳後４８小時未入帳請與我們聯絡。</p>-->
<!--                                <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>-->
<!--                                <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>-->
<!--                                <el-input  v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px;width: 620px" ></el-input>-->
<!--                            </div>-->

                            <div class="Nextstep">
                                <el-checkbox v-model="Agreement">我同意貨款交由兆富通代墊，金額無誤，不另做用途。</el-checkbox>
                                <div>
                                    <el-button type="primary" size="small"><router-link to="/"   >返回</router-link></el-button>
                                    <el-button type="primary nestbutton" @click="daichuconfirm" size="small" :disabled="subdaichubled">下一步</el-button>
                                </div>
                            </div>
                            <h4>問題回報</h4>
                            <a href="https://line.me/R/ti/p/%40653ymryv" target="_blank"><img src="../assets/image/LINE.png" alt="加入好友" height="36" border="0"></a>
                        </div>
                    </div>
                    <div class="storage_body_right">

                        <!--<h4>手續費電子發票</h4>-->
                        <!--<div class="eie">-->
                            <!--<div>-->
                                <!--<el-radio-group v-model="invoice_type">-->
                                    <!--<el-radio label="1"  >個人電子發票</el-radio>-->
                                    <!--<el-radio label="2" >捐贈發票</el-radio>-->
                                    <!--<el-radio label="3" >公司電子發票</el-radio>-->
                                    <!--<el-radio label="4" >載具/自然人憑證</el-radio>-->
                                <!--</el-radio-group>-->
                            <!--</div>-->
                            <!--<div class="eiemodel">-->
                                <!--<div v-if="invoice_type==1" style="position: relative">-->
                                    <!--<el-input placeholder="請輸入您的電子郵箱" v-model="PersonalEmail" size="mini">-->
                                        <!--<template slot="prepend">請輸入發送的E-mail</template>-->
                                    <!--</el-input>-->
                                    <!--<el-button type="primary" size="mini" class="mailbutton" @click="PersonalEmail = merber_email">填入預設E-mail</el-button>-->
                                <!--</div>-->
                                <!--<div v-if="invoice_type==2" >-->
                                    <!--<el-radio-group v-model="donation" >-->
                                        <!--<el-radio label="1">捐贈碼-->
                                            <!--<a href="https://www.ecloudlife.com/donationunits" target="_blank" style="font-size: 12px;color:#66b1ff;text-decoration:underline;">捐贈碼查詢</a>-->
                                        <!--</el-radio>-->
                                        <!--<el-radio label="2">隨機捐贈-->
                                            <!--<el-tooltip placement="right" effect="light">-->
                                                <!--<div slot="content">-->
                                                    <!--<div v-for="item in donation_num">-->
                                                        <!--<span>{{item.num}}</span>-->
                                                        <!--<span>{{item.name}}</span>-->
                                                    <!--</div>-->
                                                <!--</div>-->
                                                <!--<i size="15px" class="el-icon-question"></i>-->
                                            <!--</el-tooltip>-->
                                        <!--</el-radio>-->
                                    <!--</el-radio-group>-->
                                    <!--<div v-if="donation==1">-->
                                        <!--<div style="width: 200px;margin-top: 10px">-->
                                            <!--<el-input placeholder="請輸入捐贈碼" size="mini" v-model="LoveCode">-->
                                                <!--<template slot="prepend">捐贈碼</template>-->
                                            <!--</el-input>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div v-if="invoice_type==3" style="padding-bottom: 10px;color: red;font-size: 12px">-->
                                    <!--發票皆透過Email的方式寄出電子發票形式開立，恕不提供紙本。-->
                                    <!--若是須開立統編發票，統編發票將於付款完成15天內以pdf格式寄到您的電子信箱。可以直接將pdf檔列印下來報帳-->
                                <!--</div>-->
                                <!--<div v-if="invoice_type==3" style="position: relative">-->
                                    <!--<el-input placeholder="請輸入您的E-mail" v-model="companyEmail" :clearable="true" size="mini">-->
                                        <!--<template slot="prepend">請輸入發送的E-mail</template>-->
                                    <!--</el-input>-->
                                    <!--<div style="display: flex;justify-content: space-between;">-->
                                        <!--<el-input placeholder="公司統一編號" v-model="company_num" style="margin-top: 20px;width: 48%" size="mini">-->
                                            <!--<template slot="prepend">公司統一編號</template>-->
                                        <!--</el-input>-->
                                        <!--<el-input placeholder="請輸入公司名稱" v-model="company_name" style="margin-top: 20px;width: 48%" size="mini">-->
                                            <!--<template slot="prepend">公司名稱</template>-->
                                        <!--</el-input>-->
                                    <!--</div>-->

                                    <!--<el-input placeholder="請輸入地址" v-model="company_add" style="margin-top: 20px" size="mini">-->
                                        <!--<template slot="prepend">公司地址</template>-->
                                    <!--</el-input>-->
                                    <!--<el-button type="primary" size="mini" class="mailbutton" @click="companyEmail =  merber_email" >填入預設E-mail</el-button>-->
                                <!--</div>-->
                                <!--<div v-if="invoice_type==4" >-->
                                    <!--<el-autocomplete-->
                                            <!--size="mini"-->
                                            <!--placeholder="/○○○○○○○○"-->
                                            <!--v-model="CarruerNum"-->
                                            <!--:fetch-suggestions="querySearch"-->
                                            <!--:trigger-on-focus="false">-->
                                        <!--<template slot="prepend">請輸入編碼</template>-->
                                    <!--</el-autocomplete>-->
                                    <!--<div style="width: 450px;height: 150px;margin-top: 20px">-->
                                        <!--<img src="../assets/image/dzfpzj.png" alt="" width="100%" height="100%">-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->

                    </div>

                </div>
                <div class="Description" >
                    <h3>服務申請說明</h3>
                    <p>1、本站支付寶秒到，歡迎使用。</p>
                    <p>2、<span>24小時</span>繳費成功後銀行會通知兆富通，一旦通知，支付寶秒到。</p>
                    <p>3、交易處理時間為24H，除非有例外狀況會另行通知</p>
                    <p>4、網路客服服務時間為早上10點到下午5點。</p>
                    <p>5、商品如淘寶管制，有部分無法代付，請見諒</p>
                    <p>6、代付失敗的商品將退至餘額錢包。</p>

                </div>
            </div>
        </div>

        <!--补款弹出框-->
        <el-dialog  :visible.sync="Supplement"  width="500px" :close-on-click-modal="false" style="margin-top: 20vh" >
                <span slot="title" >
                   補款方式
                </span>
            <div class="dialog_body" >
                <p style="font-size: 14px;text-align: center;color: #666666">您的E幣餘額不足{{robot_rmb}},需補款 <span style="color: red">￥{{(robot_rmb-r_money).toFixed(2)}}</span>，請選擇補款方式。</p>
                <el-radio-group v-model="withhold_type" size="medium" style="display: flex;justify-content: space-around;margin-top: 10px">
                    <!--<el-radio label="8"  style="padding: 10px 10px">星展銀行</el-radio>-->
                    <el-radio label="9"  style="padding: 10px 10px">中國信託</el-radio>
<!--                    <el-radio label="7" border style="padding: 10px">ATM銀行轉帳(013 國泰銀行)</el-radio>-->
                    <!--<el-radio label="2" style="padding: 10px 10px">超商補款</el-radio>-->
                </el-radio-group>
                <el-input v-show="withhold_type == 9 || withhold_type == 7" v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px" ></el-input>
                <div style="display: flex;flex-direction: row-reverse;padding:20px 10px">
                    <el-button type="primary" style="margin-left: 20px" @click="BKdaichu" size="mini">確定並送出</el-button>
                    <el-button type="info" @click="again" size="mini">重新選擇付款方式</el-button>
                </div>
            </div>
        </el-dialog>
        <!--滑动验证弹出框-->
        <el-dialog
                :visible.sync="dragverify"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                @close="Reset"
                style="margin-top: 15vh;"
                width="400px"
        >
            <span slot="title" >

                    請進行認證
            </span>
            <div>
                <div class="Slider"  v-show="!slideshow" >
                    <slide-verify
                            :l="42"
                            :r="10"
                            :w="310"
                            :h="155"
                            :imgs="imgs"
                            :accuracy="3"
                            ref="slideblock"
                            slider-text="向右滑動 >>>"
                            style="margin: 0 auto"
                            @success="onSuccess"
                            @fail="onFail"
                            @refresh="onRefresh"
                            @again="onAgain"
                    ></slide-verify>
                </div>
                <div style="font-size: 18px;font-weight: bold;margin: 0 auto" v-show="slideshow" >
                    <div class="phone">
                        <div>
                            <span>手機號碼</span>
                            <span>{{merber_phone}}</span>
                        </div>
                        <div>
                            <el-input  maxlength="6" size="mini"  v-model="phone_code"  placeholder="請輸入驗證碼"></el-input>
                            <el-button type="primary" size="mini"  @click="slideshow = false" :disabled="yzm.bled">{{yzm.text}}</el-button>
                        </div>
                        <div> <el-button type="primary" size="mini" @click="EBsubdaichu" :disabled="EBsubdaichubled">送出並驗證</el-button></div>
                    </div>
                </div>
            </div>

        </el-dialog>
        <!--超商提交-->
        <div v-html="chaoshang" style="opacity: 0"></div>
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
                imgs:Common.imgs, //滑动图片
                dragverify:false, //验证弹出框
                slideshow:true,//滑块和手机验证码开关
                EBsubdaichubled:false,//E币补款提交按钮开关

                withhold_type:'',//补款方式 1玉山  2超商 4联邦
                Supplement:false,//补款弹出框
                platform_serve:0,//平台服务费
                phone_code:"",//E币付款手机验
                merber_phone:'',//用户手机号
                payment_code:'',
                checkpayment_code:'',
                merber_phcode:'',
                merbervip:{},
                yzm:{
                    bled:false,
                    text:'發送驗證碼',
                    time:60,
                    num:3,
                },
                store_type:'',
                store_type_list:[
                    {text:'個人',value:1},
                    {text:'廠商公司',value:2},
                    {text:'運費',value:3},
                ],

                pwdList: [],
                oldPwdList: [],
                isDelete: false,
                ipt: '',
                chaoshang:'',
                Paymentpwd:true,
                loading_dc:false,
                aliapy:[{

                }],//已认证过的支付宝
                exchange:0,
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

                invoice_type:'1',//电子发票类型
                donation:'1',//捐赠类型

                PersonalEmail:'',//个人电子发票邮箱
                companyEmail:'',//公司电子发票邮箱
                CustomerEmail:'',//电子发票邮箱(参数)
                company_num:'',//公司统一编号编号
                company_name:'',//公司名称
                company_add:'',//公司地址
                CarruerNum:'',//载具编码
                LoveCode:'',//爱心码
                donation_num:[
                    {num:'88888',name:'財團法人中華民國兒童癌症基金會'},
                    {num:'16888',name:'財團法人癌症希望基金會'},
                    {num:'1980198',name:'財團法人張老師基金會'},
                    {num:'876',name:'財團法人心路社會福利基金會'},
                    {num:'8282',name:'財團法人法律扶助基金會'},
                    {num:'9527',name:'財團法人罕見疾病基金會'},
                    {num:'5299',name:'社團法人台灣導盲犬協會'},
                    {num:'8957282',name:'財團法人流浪動物之家基金會'},
                    {num:'178',name:'社團法人台灣伴侶權益推動聯盟'},
                    {num:'852',name:'社團法人台灣露德協會'},
                ],
                ConsentBook:false,
                RiskTakingBook:false,
                RTbook:false,
                bankcode:'',//付款银行后5位

            }
        },
        components: {
            Notice,
            Loading
        },
        methods: {
            //滑动验证成功
            onSuccess(times){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/get_check",
                    dataType:"json",
                    data: {
                        merber_id:this.merber_id,
                        token:this.token,
                        merber_phone:this.merber_phone},
                    success:(res)=>{
                        if(res.success==-1) {
                            this.Logout()
                            return false
                        }
                        this.$refs.slideblock.reset();
                        this.slideshow = true
                        if(res.success==2){
                            this.$message.error("此手機號已註冊");
                        }else if(res.success==1) {
                            this.$message({
                                message: '短信驗證碼已發送',
                                type: 'success'
                            });
                            this.yzm.bled = true;
                            this.yzm.time = 60;
                            this.timer();
                        }
                    }
                })

            },
            //滑动验证失败
            onFail(){
                this.$message({
                    message: '驗證失敗',
                    type: 'error',
                    center: true
                });
            },
            //滑动图片刷新
            onRefresh(){
            },
            //检查为非人为操作回调
            onAgain() {
                this.$refs.slideblock.reset();
            },

            querySearch:function(queryString, cb){
                var restaurants=[{'value':this.CarruerNumjy}];
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            getfocus:function(i){
                i=i+1;
                $('#zfpwd input:nth-child('+i+')').css({'border':'1px solid #5D7EFF',})
            },
            outblur:function(i){
                i=i+1;
                $('#zfpwd input:nth-child('+i+')').css({'border':'1px solid #131415',})
            },
            //验证码60秒倒计时
            timer() {
                if (this.yzm.time > 0) {
                    this.yzm.bled = true
                    this.yzm.time--;
                    this.yzm.text=this.yzm.time+"s後重新獲取";
                    setTimeout(this.timer, 1000);
                } else{
                    this.yzm.time=0;
                    this.yzm.text="發送驗證碼";
                    this.yzm.bled=false;
                }
            },
            //E币付款发送手机验证码
            Egetyzm:function(){
                this.yzm.bled = true
                this.EBsubdaichubled = false
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/get_check",
                    dataType:"json",
                    data: {
                        merber_id:this.merber_id,
                        token:this.token,
                        merber_phone:this.merber_phone},
                    success:(res)=>{
                        if(res.success==-1){
                            this.Logout()
                        }else if(res.success==2){
                            this.$message.error("此手機號已註冊");
                        }else if(res.success==1) {
                            this.$message({
                                message: '短信驗證碼已發送',
                                type: 'success'
                            });
                            this.yzm.bled = true;
                            this.yzm.time = 60;
                            this.timer();
                        }
                    }
                })
            },
            //获取汇率
            getexchange:function(){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/exchange",
                    dataType:"json",
                    data:{
                        exchange_type:3
                    },
                    success:(res)=>{
                        this.exchangelist=res.data
                        this.exchange = res.data[0].exchange
                    }
                })
            },
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
            //获取支付宝
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
            //统编验证
            isValidGUI:function(taxId){
                var invalidList = "00000000,11111111";
                if (/^\d{8}$/.test(taxId) == false || invalidList.indexOf(taxId) != -1) {
                    return false;
                }
                var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
                    sum = 0,
                    calculate = function(product) { // 個位數 + 十位數
                        var ones = product % 10,
                            tens = (product - ones) / 10;
                        return ones + tens;
                    };
                for (var i = 0; i < validateOperator.length; i++) {
                    sum += calculate(taxId[i] * validateOperator[i]);
                }

                return sum % 10 == 0 || (taxId[6] == "7" && (sum + 1) % 10 == 0);
            },
            //提交代储参数验证
            daichuconfirm:function () {
                // var re = /^[0-9]+.?[0-9]*/;
                // var carReg = /^[A-Z]{2}[0-9]{14}$/;
                // var car_tReg = /^\/{1}[0-9A-Z]{7}$/;
                // var car2_Reg = /^\/[A-Z0-9\+\-\.]{7}$/;
                // var mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g;
                // var codeReg=/^[0-9]{3,7}/;

                if ( this.robot_rmb == '' || this.robot_rmb<5) {
                    this.$message({
                        showClose: true,
                        message: '請輸入正確儲值金額(不能低於5)',
                        type: 'error',
                        center: true,
                    })
                    return false
                }
				if(this.radioBank == 3 &&  Number(this.r_money)<=0 ){
					this.$message({
					    showClose: true,
					    message: '錢包餘額為0，請重新選擇付款方式',
					    type: 'error',
					    center: true,
					})
					return false
				}
                if(this.merbervip.growth_value==0 && this.robot_rmb >Number(this.merbervip.vip_value) ){
                    this.$message({
                        showClose: true,
                        message: '超過額度，代儲額度限制單筆'+this.merbervip.vip_value+'，如果問題請聯絡客服中心。',
                        type: 'error',
                        center: true,
                    })
                    return false
                }
                if((this.radioBank == "9" || this.radioBank == "7") && this.bankcode.length != 5){
                    this.$message({
                        showClose: true,
                        message: '請輸入匯款銀行後五位',
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
                if(this.store_type==''){
                    this.$message({
                        showClose: true,
                        message: '請選擇賬戶類型',
                        type: 'error',
                        center: true,
                    })
                    return false
                }
                if(this.RTbook==false){
                    this.$message({
                        showClose: true,
                        message: '您未確認風險承擔同意書',
                        type: 'error',
                        center: true,
                    });
                    return false
                }
                // if(this.invoice_type==1){
                //     this.merber_email = this.PersonalEmail;
                //     this.company_num='';
                //     this.company_add='';
                //     this.CarruerNum='';
                //     this.LoveCode='';
                //     if(!mailReg.test(this.PersonalEmail)){
                //         this.$message({
                //             showClose: true,
                //             message: '郵箱格式不正確',
                //             type: 'error',
                //             center: true,
                //         })
                //         return false
                //     }
                // }
                // if(this.invoice_type==2){
                //     if(this.donation==1){
                //         this.merber_email = Cookies.get('merber_email')
                //         this.company_num='';
                //         this.company_add='';
                //         this.CarruerNum='';
                //         if(!codeReg.test(this.LoveCode)){
                //             this.$message({
                //                 showClose: true,
                //                 message: '愛心碼格式不正確',
                //                 type: 'error',
                //                 center: true,
                //             })
                //             return  false
                //         }
                //     }
                //     if(this.donation==2){
                //         var code=this.donation_num[Math.round(Math.random()*(this.donation_num.length-1))];
                //         this.LoveCode=code.num;
                //         this.merber_email = Cookies.get('merber_email'),
                //         this.company_num='';
                //         this.company_add='';
                //         this.CarruerNum='';
                //     }
                // }
                // if(this.invoice_type==3){
                //     this.merber_email=this.companyEmail;
                //     this.LoveCode='';
                //     this.CarruerNum='';
                //     this.merber_name = this.company_name
                //     if(this.companyEmail=='' || this.company_num=='' || this.company_add=='' || this.company_name == ''){
                //         this.$message({
                //             showClose: true,
                //             message: '請輸入完整資料',
                //             type: 'error',
                //             center: true,
                //         })
                //         return false
                //     }
                //     if(!mailReg.test(this.companyEmail)){
                //         this.$message({
                //             showClose: true,
                //             message: '郵箱格式不正確',
                //             type: 'error',
                //             center: true,
                //         })
                //         return false
                //     }
                //     if(!this.isValidGUI(this.company_num)){
                //         this.$message({
                //             showClose: true,
                //             message: '公司編號錯誤',
                //             type: 'error',
                //             center: true,
                //         })
                //         return false
                //     }
                // }
                // if(this.invoice_type==4) {
                //     Cookies.set('CarruerNumjy',this.CarruerNum,{ expires: 30 });
                //     this.merber_email = Cookies.get('merber_email'),
                //     this.LoveCode='';
                //     this.company_num='';
                //     this.company_add='';
                //     if (this.CarruerNum == '') {
                //         this.$message({
                //             showClose: true,
                //             message: '載具編碼不能為空',
                //             type: 'error',
                //             center: true,
                //         })
                //         return false
                //     }
                //     if (!carReg.test(this.CarruerNum) && !car_tReg.test(this.CarruerNum) && !car2_Reg.test(this.CarruerNum)) {
                //         this.$message({
                //             showClose: true,
                //             message: '請輸入正確載具編碼(字母須大寫)',
                //             type: 'error',
                //             center: true,
                //         })
                //         return false
                //     }
                // }
                if(this.radioBank==2 && this.robot_twd > 5970){
                    this.$message({
                        message: '使用超商代付請勿超過5970元新臺幣！',
                        type: 'error',
                        center: true
                    });
                    return false
                }

                if(this.radioBank==5){
                    this.dragverify = true
                    return false
                }
                this.subdaichuAJAX()
                //服务时间提示
                // var date=new Date();
                // var Thisdate=date.getHours();
                // if(Thisdate<9 || Thisdate>=22){
                //     this.$confirm('<p>支付寶對凌晨作業進行控管，服務時間由AM 10:00~PM10:00，非服務時間送出的訂單會於AM 10:00開始處理，易支付感謝你的配合!</p>',  {
                //         confirmButtonText: '確定，繼續交易',
                //         dangerouslyUseHTMLString: true,
                //         showCancelButton:'取消訂單',
                //         type: 'info'
                //     }).then(()=>{
                //         if(this.radioBank==3){
                //             this.dragverify = true
                //             return false
                //         }
                //         this.subdaichuAJAX()
                //     }).catch((e)=>{
                //         this.$router.push({path: '/daichu'})
                //     })
                // }else {
                //     this.subdaichuAJAX()
                // }
            },
            //提交代储
            subdaichuAJAX:function(){
                var _this=this;
                this.subdaichubled=true;
                //-----------获取随机数
                var timestamp = Date.parse(new Date());
                var num = '';
                for(var i=0;i<5;i++)
                {
                    num+=Math.floor(Math.random()*10);
                }
                var sign = timestamp + num
                //------------

                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/sub_store",
                    dataType:"json",
                    data:{
                        sign:sign,
                        merber_id:this.merber_id,
                        token:this.token,
                        exchange_rate:this.exchange,
                        robot_rmb:this.robot_rmb,
                        pay_url:this.daichuzh,
                        platform_serve:this.platform_serve,//平台手续费
                        payment_method:this.radioBank,
                        robot_twd:Math.ceil((Number(this.robot_rmb)+this.ServiceCharge)*this.exchange),
                        service_charge:this.ServiceCharge,
                        invoice_type:this.invoice_type,
                        CustomerEmail:this.merber_email,
                        CustomerAddr:this.company_add,
                        CustomerIdentifier:this.company_num,
                        CustomerName:this.invoice_type==3?this.company_name:this.merber_name,
                        CarruerNum:this.CarruerNum,
                        LoveCode:this.LoveCode,
                        bankcode:this.bankcode,
                        store_type:this.store_type
                    },
                    success:(res)=>{
                        if(res.success==-1){
                            this.Logout()
                        }else if(res.success==1){
                            if(this.radioBank==2){
                                this.loading_dc=true;
                                this.chaoshang=res.data;
                                window.setTimeout(function () {
                                    document.getElementById("__ecpayForm").submit();
                                },1000)
                            }else {
                                if(this.radioBank==1){
                                    this.$message({
                                        message: '您的虛擬付款帳號已經通過短信發送到您的手機',
                                        type: 'success'
                                    });
                                }else if(this.radioBank==3 || this.radioBank==5){
                                    if(this.radioBank==3){
                                        this.$message({
                                            message: '付款成功！',
                                            type: 'success'
                                        });
                                    }else {
                                        this.$message({
                                            message: '您的虛擬付款帳號已經通過短信發送到您的手機',
                                            type: 'success'
                                        });
                                    }
                                }
                                this.$router.push({
                                    path:'/orderDetails',
                                    query:{
                                        id:res.data.order_id
                                    }
                                });
                            }
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
            //E币付款代储提交
            EBsubdaichu(){
                var _this = this
                if(this.phone_code.length!=6){
                    this.$message({
                        message: '請輸入正確得驗證碼!',
                        type: 'error',
                        center: true
                    });
                }else {
                    if(Number(this.robot_rmb) > Number(this.r_money)){
                        this.radioBank = 5
                        this.Supplement = true
                    }else {
                        //-----------获取随机数
                        var timestamp = Date.parse(new Date());
                        var num = '';
                        for(var i=0;i<5;i++)
                        {
                            num+=Math.floor(Math.random()*10);
                        }
                        var sign = timestamp + num
                        //------------
                        $.ajax({
                            type: "POST",
                            url: "https://www.trillionricher.com/1.0/sub_store",
                            dataType:"json",
                            beforeSend:function(XMLHttpRequest){
                                _this.loading_dc=true
                            },
                            data:{
                                sign:sign,
                                merber_id:this.merber_id,
                                token:this.token,
                                exchange_rate:this.exchange,
                                robot_rmb:this.robot_rmb,
                                pay_url:this.daichuzh,
                                payment_method:this.radioBank,
                                robot_twd:Math.ceil((Number(this.robot_rmb)+this.ServiceCharge)*this.exchange),
                                payment_code:this.phone_code,
                                merber_phone:this.merber_phone,
                                service_charge:this.ServiceCharge,
                                platform_serve:this.platform_serve,//平台手续费
                                invoice_type:this.invoice_type,
                                CustomerEmail:this.merber_email,
                                CustomerAddr:this.company_add,
                                CustomerIdentifier:this.company_num,
                                CustomerName:this.invoice_type==3?this.company_name:this.merber_name,
                                CarruerNum:this.CarruerNum,
                                LoveCode:this.LoveCode,
                                store_type:this.store_type
                                // withhold_type:this.withhold_type,
                            },
                            success:(res)=>{
                                _this.loading_dc=false
                                if(res.success==-1){
                                    this.Logout();
                                    _this.loading_dc=false
                                }else if(res.success==1){
                                    this.Reset()
                                    _this.loading_dc=false;
                                    this.$message({
                                        message: '付款成功',
                                        type: 'success'
                                    });
                                    this.$router.push({
                                        path:'/orderDetails',
                                        query:{
                                            id:res.data.order_id
                                        }
                                    });

                                }else if(res.success==8){
                                    if(this.yzm.num <=1){
                                        this.$message({
                                            message: '请核对您的手机号码！',
                                            type: 'error',
                                            center:true
                                        });
                                        this.reload();
                                    }else {
                                        this.EBsubdaichubled = false
                                        this.yzm.num --
                                        this.phone_code = ""
                                        this.$message({
                                            message: '驗證碼錯誤！驗證碼錯誤，您還有'+this.yzm.num+'次機會',
                                            type: 'error',
                                            duration:5000,
                                            center: true
                                        });

                                    }
                                }else if(res.success==9){
                                    this.$message({
                                        message: '驗證碼已過期，請重新獲取！',
                                        type: 'error',
                                        duration:5000,
                                        center: true
                                    });
                                    this.Reset()
                                }else if(res.success==11){
                                    this.$message({
                                        message: '重複操作，請您稍後再試！',
                                        type: 'error',
                                        center: true
                                    });
                                    _this.$router.push({ path:'/record'})
                                }else {
                                    this.$message({
                                        message: '網絡錯誤',
                                        type: 'error',
                                        center: true
                                    });
                                    _this.$router.push({ path:'/'})
                                }
                            }
                        })
                    }
                }




            },
            //补款代储提交
            BKdaichu:function(){
                if((this.withhold_type === "9" || this.withhold_type === "7") && this.bankcode.length !== 5){
                    this.$message({
                        showClose: true,
                        message: '請輸入匯款銀行後五位',
                        type: 'error',
                        center: true,
                    })
                    return false
                }
                var _this=this;
                this.subdaichubled=true;
                //-----------获取随机数
                var timestamp = Date.parse(new Date());
                var num = '';
                for(var i=0;i<5;i++)
                {
                    num+=Math.floor(Math.random()*10);
                }
                var sign = timestamp + num
                //------------
                var w_rmb = (Number(this.robot_rmb-this.r_money)+Number(this.service_charge)).toFixed(2)
                var w_twd=Math.ceil(w_rmb*this.exchange)
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/sub_store",
                    dataType:"json",
                    data:{
                        sign:sign,
                        merber_id:this.merber_id,
                        token:this.token,
                        exchange_rate:this.exchange,
                        robot_rmb:this.robot_rmb,
                        pay_url:this.daichuzh,
                        payment_method:this.radioBank,
                        robot_twd:Math.ceil((Number(this.robot_rmb)+this.ServiceCharge)*this.exchange),
                        service_charge:this.ServiceCharge,
                        invoice_type:this.invoice_type,
                        CustomerEmail:this.merber_email,
                        CustomerAddr:this.company_add,
                        platform_serve:this.platform_serve,//平台手续费
                        CustomerIdentifier:this.company_num,
                        CustomerName:this.invoice_type==3?this.company_name:this.merber_name,
                        CarruerNum:this.CarruerNum,
                        LoveCode:this.LoveCode,
                        withhold_type:this.withhold_type,
                        withhold_rmb:w_rmb,
                        withhold_twd:w_twd,
                        remain_rmb:this.r_money,
                        payment_code:this.phone_code,
                        merber_phone:this.merber_phone,
                        bankcode:this.bankcode,
                        store_type:this.store_type
                    },
                    success:(res)=>{
                        if(res.success==-1){
                            this.Logout()
                        }else if(res.success==1){
                            this.Reset()
                            if(this.withhold_type==2){
                                this.loading_dc=true;
                                this.chaoshang=res.data;
                                window.setTimeout(function () {
                                    document.getElementById("__ecpayForm").submit();
                                },1000)
                            }else {
                                this.$message({
                                    message: '您的虛擬付款帳號已經通過短信發送到您的手機',
                                    type: 'success'
                                });
                                this.Supplement=false;
                                this.$router.push({
                                    path:'/orderDetails',
                                    query:{
                                        id:res.data.order_id
                                    }
                                });

                            }
                        }else if(res.success==8){
                            this.Supplement=false;
                            if(this.yzm.num <=1){
                                this.$message({
                                    message: '请核对您的手机号码！',
                                    type: 'error',
                                    center:true
                                });
                                this.reload();
                            }else {
                                this.yzm.num --
                                this.phone_code = ""
                                this.$message({
                                    message: '驗證碼錯誤！您還有'+this.yzm.num+'次機會',
                                    type: 'error',
                                    duration:5000,
                                    center: true
                                });
                                this.EBsubdaichubled = false
                            }
                        }else if(res.success==9){
                            this.$message({
                                message: '驗證碼已過期，請重新獲取！',
                                type: 'error',
                                duration:5000,
                                center: true
                            });
                            this.Reset()
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
            //重置滑块弹出框
            Reset:function(){
                this.slideshow = true
                this.dragverify = false
                this.Supplement = false;
                this.Agreement = false
                this.$refs.slideblock.reset();
            },
            again:function(){
                this.Supplement = false;
                this.dragverify = false
                this.radioBank='';
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
                        data: {order_id: this.daichuData.order_id},
                        success: (res) => {
                            if(res.success==1){
                                this.$message({
                                    showClose: true,
                                    message: '訂單已取消',
                                    type: 'success',
                                    center:true,
                                });
                                this.$router.push({path:'/'})
                            }
                        }
                    })

                }).catch((e)=>{})
            },
            check_order: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/check_order",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        service_type: 3
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 0) {
                            this.$router.push({path: '/daichu'});
                            this.CustomerEmail=res.data.merber_email
                            this.merbervip = res.data
                        }else if (res.success == 3){
                            this.$router.push({path: '/'})
                            this.$message({
                                showClose: true,
                                message: '請先完成身份認證',
                                type: 'error'
                            });
                        }else if (res.success == 4){
                            this.$router.push({path: '/'})
                            this.$message({
                                showClose: true,
                                message: '請先完成文件認證',
                                type: 'error'
                            });
                        }else if(res.success == 5){
                            this.$message({
                                showClose: true,
                                message: '支付寶服務暫時關閉，開放另行通知。',
                                type: 'error'
                            });
                            this.$router.push({path: '/'})
                        }else {
                            this.CustomerEmail=res.data.merber_email;
                            this.$router.push({
                                path:'/orderDetails',
                                query:{
                                    id:res.data.order_id
                                }
                            });
                            this.$message({
                                showClose: true,
                                message: '您還有一筆待付款訂單未處理，請您付款或取消訂單後再下單',
                                type: 'error'
                            });
                        }
                    }
                })
            },
            inputrmb:function (e) {
                if(e<100){this.exchange = this.exchangelist[0].exchange}
                if(e>=100 && e<500){this.exchange = this.exchangelist[1].exchange}
                if(e>=500 && e<2000){this.exchange = this.exchangelist[2].exchange}
                if(e>=2000 && e<5000){this.exchange = this.exchangelist[3].exchange}
                if(e>=5000 && e<10000){this.exchange = this.exchangelist[4].exchange}
                if(e>=10000 && e<40000){this.exchange = this.exchangelist[5].exchange}
                if(e>=40000 && e<80000){this.exchange = this.exchangelist[6].exchange}
                if(e>=80000 && e<100000){this.exchange = this.exchangelist[7].exchange}
                if(e>=100000 && e<200000){this.exchange = this.exchangelist[8].exchange}
                if(e>=200000 && e<300000){this.exchange = this.exchangelist[9].exchange}
                if(e>=300000 && e<=500000){this.exchange = this.exchangelist[10].exchange}
                this.robot_twd=Math.ceil(e*this.exchange);
                // var sxf=e*0.0025;
                // if(sxf<=2){
                //     this.ServiceCharge=2.
                // }else if(sxf>=100 ){
                //     this.ServiceCharge=100
                // }else {
                //     this.ServiceCharge=Math.ceil(sxf)
                // }
            },

            Openandclose:function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/notice_switch",
                    dataType:"json",
                    success:(res)=>{
                        console.log(res);
                        if(res.success==1){
                            if(res.data[3].switch==1){
                                this.$message({
                                    dangerouslyUseHTMLString: true,
                                    duration:5000,
                                    message: res.data[3].content,
                                    type: 'error',
                                    center: true
                                });
                                this.$router.push({path: '/'})
                                return false
                            }else {
                                if(this.merber_id==undefined){
                                    this.$router.push({path: '/'})
                                }else {
                                    this.gettongzhi();
                                    this.getexchange();
                                    this.getzhifubao();
                                    this.check_order()
                                }
                            }
                        }
                    }
                })
            }

        },
        computed: {},
        watch: {

            isconfirm:function (confirm) {
                if (confirm==true){
                    this.confirmby='none'
                }
            },
            Agreement:function (val) {
                if(val==false){
                    this.subdaichubled=true
                }else {
                    this.subdaichubled=false
                }
            },

        },
        created: function () {
            this.Openandclose()
        }
    }
</script>
