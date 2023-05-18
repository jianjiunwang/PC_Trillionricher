<template>
    <div style="background-color: #F3F3F3">
       <vip-header></vip-header>
        <div class="tongzhi">
            <i class="iconfont el-icon-al-xitonggonggao" style="color: #fe5e00;font-size: 20px;margin-left: 10px"></i>
            <span>{{tongzhi_cz}}</span>
        </div>
        <div class="chuzhi">
            <div class="Substitute" >
                <div class="steps">
                    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
                        <el-step title="創建E幣儲值訂單"></el-step>
                        <el-step title="付款到易支付"></el-step>
                        <el-step title="為您儲值"></el-step>
                    </el-steps>
                </div>
            </div>
            <div class="storage_xq">
                <div v-if="active==1" class="hoverxg">
                    <div><b>請輸入您要儲值的E幣</b><span style="font-size: 14px;margin-left: 50px">匯率</span><span style="color: #6EBB60"> {{huilv}} </span></div>
                    <div class="RMB_TWD">
                        <el-input v-model="robot_rmb"  @input="inputE">
                            <template slot="prepend">我要儲值</template>
                            <template slot="append">E幣</template>
                        </el-input>
                        <img src="../assets/image/zhuanhuan.png" alt="" height="25">
                        <el-input  v-model="robot_twd"  @input="inputtwd">
                            <template slot="prepend">我要支付</template>
                            <template slot="append">新臺幣</template>
                        </el-input>
                    </div>
                    <div class="fukuan" style="margin-top: 30px">
                        <h2 style="margin-bottom: 20px;display: flex;align-items: center"><img src="../assets/image/yinhangka.png" alt="" style=" width:40px; height:28px;margin-right: 20px">請選擇付款方式</h2>
                        <h5 style="margin-bottom: 20px">網路ATM/ATM櫃機</h5>
                        <!--<el-radio v-model="radioBank" label="1" style="display: flex;align-items: center;margin-bottom: 20px" >-->
                            <!--<img src="../assets/image/ysyh.jpg" alt="" style="width: 60px;height: 60px;margin-right: 20px">-->
                            <!--<div style="font-size: 14px">-->
                                <!--<p>808玉山銀行單次虛擬帳號，僅限本張訂單使用</p>-->
                                <!--<p style="color:#2d8cf0">支援全台各家銀行轉入，<span style="color: #ff090c">無每日三萬元限制</span></p>-->
                            <!--</div>-->
                        <!--</el-radio>-->
                        <el-radio v-model="radioBank" label="4" style="display: flex;align-items: center;margin:0 0 20px 0" >
                            <img src="../assets/image/UBOT.png" alt="" style="width: 60px;height:60px;margin-right: 20px">
                            <div style="font-size: 14px">
                                <p>803聯邦銀行單次虛擬帳號，僅限本張訂單使用</p>
                                <p style="color:#2d8cf0">支援全台各家銀行轉入，<span style="color: #ff090c">無每日三萬元限制</span></p>
                            </div>
                        </el-radio>
                        <h5 style="margin-bottom: 20px">超商付款（超商繳費程式碼將發至您的手機）</h5>
                        <el-radio v-model="radioBank" label="2" style="display: flex;align-items: center;margin-bottom: 20px" >
                            <div class="chaoshang" style="margin-right: 20px">
                                <img src="../assets/image/711-icon.png" alt="">
                                <img src="../assets/image/ok-icon.png" alt="">
                                <img src="../assets/image/familymart-icon.png" alt="">
                                <img src="../assets/image/hilife-icon.png" alt="">
                            </div>
                            <div style="font-size: 14px">
                                <p>7-11/全家/萊爾富/OK超商 <span style="color:#f90 ">收取 <span> 30 </span>的手續費，不足30臺幣按30臺幣收取</span></p>
                                <p style="color: #ed3f14">使用超商付款不能超過5970元新台幣</p>
                                <p>繳費代碼在送出訂單後將傳送至您的手機</p>
                            </div>
                        </el-radio>
                    </div>
                    <div class="Nextstep">
                        <el-checkbox v-model="Agreement">我已閱讀並同意 <a @click="ConsentBook=true">【易支付服務合約】</a></el-checkbox>
                        <div>
                            <el-button type="primary" @click="govipindex">返回</el-button>
                            <el-button type="primary" @click="updata" :disabled="updatabled">下一步</el-button>
                        </div>
                    </div>
                </div>
                <div v-else class="hoverxg">
                    <div>
                        <div style="display: flex;justify-content: space-between">
                            <span>訂單明細 {{OrderData.order_num}}</span>
                            <!--<span class="jiaoyiZT" v-if="createOrder.order_state==4" style="background:#004bd9">代付中</span>-->
                            <span class="jiaoyiZT" style="background:#FFA801" v-if="OrderData.order_state==3">等待付款</span>
                            <span class="jiaoyiZT" style="background:#49B85C" v-if="OrderData.order_state==6">儲值成功</span>
                        </div>
                        <div style="border: 1px solid #E9EAEC;margin-top: 20px">
                            <ul class="order_title" style="">
                                <li><b>儲值金額</b> </li>
                                <li><b>匯率</b></li>
                                <li><b>手續費</b></li>
                                <li><b>應付新臺幣</b></li>
                            </ul>
                            <ul class="order_title" style="background: #fff">
                                <li style="color: #49B85D">￥<span style="font-size: 30px;font-weight: 800">{{ (OrderData.robot_rmb*1).toFixed(1)}}</span></li>
                                <li>{{OrderData.exchange_rate}}</li>
                                <li>$0</li>
                                <li style="color: #D93B32">$<span style="font-size: 30px;font-weight: 800">{{OrderData.robot_twd}}</span></li>
                            </ul>
                        </div>
                        <div  style="font-size: 15px;text-align: right;margin: 10px 0">
                            <p><span style="text-decoration:line-through">淘寶 ATM/WEBATM 加收 <span style="color: #FE0000"> 1.0% </span>手續費，易支付不收手續費，</span>總共為您節省<span style="color: #FE0000"> {{((OrderData.robot_rmb*OrderData.exchange_rate)*0.01).toFixed(0)}} </span>TWD</p>
                        </div>
                        <ul style="font-size: 15px;border-top:1px solid #eee;padding: 10px 0">
                            <li>交易創建時間：{{OrderData.create_time|convTimehms}}</li>
                            <li>最後處理時間：{{OrderData.update_time|convTimehms}}</li>
                            <li style="display: flex;justify-content: space-between;">
                                應付新台幣計算公式：{{OrderData.robot_rmb}} * {{OrderData.exchange_rate}} + 0 * {{OrderData.exchange_rate}} = {{(OrderData.exchange_rate * OrderData.robot_rmb).toFixed(0)}} TWD
                                <el-button v-if="OrderData.order_state==5 || OrderData.order_state==8 ||OrderData.order_state==9 ||OrderData.order_state==10"
                                           type="danger"
                                           style="padding:5px 20px"
                                           @click="refundR">取消訂單
                                </el-button>
                                <el-button v-else-if="OrderData.order_state==6" type="text" style="padding: 0" >申請退款</el-button>
                                <el-button v-else-if="OrderData.order_state==3"  type="danger" style="padding:5px 10px" @click="cancel_order">取消訂單</el-button>
                            </li>
                        </ul>
                        <div style="margin-top: 30px">
                            <h3 style="font-size: 18px;">您的付款方式 :
                                <span v-if="OrderData.payment_method==1">虛擬帳號</span>
                                <span v-if="OrderData.payment_method==2">超商付款</span>
                                <span v-else-if="OrderData.payment_method==4">聯邦銀行</span>
                                <span v-else>邮局付款</span>
                            </h3>
                            <p style="margin-top: 15px;font-size: 16px;" v-if="OrderData.payment_method==1">玉山銀行(808) {{OrderData.payment_account}}</p>
                            <!--<p style="margin-top: 15px;font-size: 16px;" v-if="OrderData.payment_method==4">聯邦銀行(803) {{OrderData.payment_account}}</p>-->
                            <p style="margin-top: 15px;font-size: 16px;" v-else-if="OrderData.payment_method==2">{{OrderData.payment_account}}</p>
                            <p style="margin-top: 15px;font-size: 16px;" v-else>{{OrderData.payment_account}}</p>
                        </div>
                        <div style="margin-top: 30px">
                            <h3 style="font-size: 18px;margin-bottom: 20px">訂單留言</h3>
                            <p style="font-size: 14px;margin-bottom: 20px">暫無留言！</p>
                        </div>
                        <div style="display: flex;flex-direction:row-reverse;margin-top: 80px" >
                            <el-button type="primary" @click="govipindex">返回</el-button>
                        </div>
                    </div>
                </div>
                <div class="sxf">
                    <div v-show="active!==2" class="hoverxg xsf_1">
                        <p><span>我想儲</span> <span>{{robot_rmb==''?0:robot_rmb}}  人民幣</span> </p>
                        <p><span>手續費</span> <span>0 人民幣</span>   </p>
                        <p><span>總額</span>   <span>{{robot_rmb==''?0:robot_rmb}} 人民幣</span>  </p>
                        <p><span>銀行匯率</span>   <span>{{huilv}}</span>  </p>
                        <p><span>應付款項</span> <span>{{Math.ceil(((robot_rmb==''?0:robot_rmb)*huilv))}} 新台幣</span>   </p>
                        <p>本筆交易電子發票將於訂單完成後寄送到您綁定的e-mail</p>
                    </div>
                    <div class="hoverxg xsf_2" style="margin-bottom:20px">
                        <h3>訂單處理時間</h3>
                        <p>1、<span>24小時</span>每分鐘查款一次,因此付款後不必通知。</p>
                        <p>2、<span>全年周末及假如無休，</span>24小時服務.交易將在收到款項後５分鐘內完成</p>
                        <p>3、虛擬帳號不能臨櫃匯款，可由實體ATM、網路ATM、網路銀行，無金額限制。</p>
                    </div>
                    <!--<Notice v-if="active==1" page="7"></Notice>-->
                    <!--<Notice v-if="active==2" page="8"></Notice>-->
                </div>
            </div>
        </div>
       <Footer></Footer>
        <Loading v-show="loading"></Loading>
        <el-dialog  :visible.sync="ConsentBook"  width="900px" :close-on-click-modal="false" >
                <span slot="title" >
                    <i class="iconfont el-icon-al-guanyu"></i>
                    服務合約書
                </span>
            <div>
                <div class="ConsentBook" style="padding: 20px" >
                    <h2>易支付金融科技有限公司 </h2>
                    <h2>服 務 合 約 書 </h2>
                    <p>一、 企業經營者資訊</p>
                    <p style="padding-left: 30px;">
                        公司名稱：易支付金融科技有限公司  <br>
                        負責人：尹政文   <br>
                        網址：https://www.egopay.com.tw   <br>
                        營業所所在地：新北市中和區福善里中山路２段２７４號２樓    <br>
                        電話：0809-056668    <br>
                        電子郵件信箱：sysop@rgopay.com.tw    <br>
                        客服服務時間：站內客服及Line@客服服務時間為早上10:00至晚上10:00，全年無休；電話客服服務時間為早上10:00 至下午06:00.週末例假休息。
                    </p>
                    <p>二、 本契約條款如有疑義時，應為以消費者保護協會之規定作為解釋。</p>
                    <p>三、 第三方支付業者與消費者得以電子文件為表示方法，依本契約交換之電子文件，如其內容可完    整呈現且可於日後取出供查驗者，其效力與書面文件相同。但依法令或行政機關之公告排除適    用者，不在此限。 </p>
                    <p>四、 本公司提供之第三方支付服務內容為按次收費制，收費標準為每筆服務費 30 元。    消費者在申請服務後的繳費方式包含：玉山銀行臨櫃代收、自動櫃員機(ATM)轉帳、個人網路    銀行、行動手機銀行或超商代收款。 </p>
                    <p>五、 匯率之計算 </p>
                    <p style="padding-left: 30px;">
                        消費者應委託業者或合作銀行向中央銀行申報，並同意提供辦理結匯所需之資料。<br>
                        本公司已取得經濟部發給之資料處理服務業，可受託處理網路交易涉及外匯收支或交易申報。 <br>
                        消費者所有支付款項為外幣時，以玉山銀行每日中午 12 點正公告之外幣現金賣出價對應新臺幣結付。  <br>
                        退款因消費款項已匯出境，如要提現須以玉山銀行公告現金買入價為結匯依據。  <br>
                        適用匯率之計算準則若變動時，本公司將提前七日在提供服務之網站公告通知消費者。
                    </p>
                    <p>六、支付款項之保障 </p>
                    <p style="padding-left: 30px;">因消費者在本公司服務網站所消費之外幣為人民幣，為保障消費者之帳戶安全權益，本公司已    向中國之知名品牌保險公司投保帳戶保障安全險，如消費者帳戶被盜或挪用，均得到最高 5    萬人民幣賠付保障 </p>
                    <p>七、消費者之身分認證  </p>
                    <p style="padding-left: 30px;">依據經濟部主管機關規定，消費者應提交身分認證之資料，不得有虛偽情事、具備會員制度之    第三方支付業者，應建立會員身分認證機制。    是以消費者使用本公司服務，必須按本公司之規定提供足以認證身分之真實資料，不得有虛偽    情事，如該等資料事後有變更，應立即通知本公司。    如有下列情形之一，本公司得要求消費者再次進行身分認證程序：  </p>
                    <p style="padding-left: 60px;">
                        （一）消費者提供之身分證明文件或登記證照等相關文件疑似偽造或變造。 <br>
                        （二）對於所取之消費者身分資料之真實性或妥適性有所懷疑時。 <br>
                        （三）消費者此次申請交易日期距前次交易日期已逾半年。  <br>
                        （四）消費者申請變更基本身分資料。   <br>
                        （五）同一行動電話號碼、電子郵件信箱等遭不同消費者或團體用於身分確認程序。  <br>
                        （六）發現疑似洗錢或資助恐怖主義交易時。
                    </p>
                    <p>八、 支付指示之再確認及事後核對  </p>
                    <p style="padding-left: 30px;">本公司於支付完成前就消費者之支付指示提供再確認之機制，消費者應依該機制確認支付指示是否正確。    消費者於每筆款項支付完成前後均能在本服務網站會員中心中查看該筆消費支付明細，同時亦可在交易紀錄網頁中隨時查詢過往每一筆服務之消費支付明細。  </p>
                    <p>九、 支付錯誤之處理  </p>
                    <p style="padding-left: 30px;">
                        因不可歸責於消費者之事由而發生支付錯誤時，本公司願意協助消費者更正，並提供其他必要之協助。<br>
                        因可歸責於本公司之事由而發生支付錯誤時，本公司於知悉時旋立即更正，並同時以電子郵件或雙方約定之方式通知消費者。<br>
                        因可歸責於消費者之事由而發生支付錯誤時，例如消費者輸入錯誤之金額或輸入錯誤之收款方    ，經消費者通知後，本公司將立即協助處理
                    </p>
                    <p>十、 資訊安全   </p>
                    <p style="padding-left: 30px;">
                        本公司使用 GOOGLE 托管伺服器其已獲得之資訊安全認證標準。  <br>
                        本公司及消費者應各自確保其資訊系統之安全，防止非法入侵、取得、竄改、毀損業務紀錄或消費者之個人資料。  <br>
                        第三人破解本公司資訊系統之保護措施或利用資訊系統之漏洞爭議，由本公司就該事實不存在負舉證責任。  <br>
                        第三人入侵本公司之資訊系統對消費者所造成之損害，由本公司負擔。
                    </p>
                    <p>十一、終止契約或暫停服務  </p>
                    <p style="padding-left: 30px;">本公司於下列情形，得終止契約或暫停服務：</p>
                    <p style="padding-left: 60px;">
                        （一）有相當事證足認消費者有利用支付帳戶為洗錢、詐欺等犯罪行為或不法行為者。 <br>
                        （二）支付款項經法院裁定或檢察官命令扣押者。  <br>
                        （三）消費者提交虛偽之身分認證資料，經查證屬實者。   <br>
                    </p>
                    <p>十二、消費者之終止契約  </p>
                    <p style="padding-left: 30px;">消費者得依雙方約定之方式隨時終止契約。 </p>
                    <p>十三、帳號密碼被冒用之處理   </p>
                    <p style="padding-left: 30px;">
                        消費者應於知悉其帳號密碼被冒用後即時通知本公司。<br>
                        本公司於知悉消費者之帳號密碼被冒用時，立即通知消費者並暫停該帳號所指示之支付行為並暫停接受該帳號後續之支付指示。<br>
                        本公司已於服務網頁明顯處載明帳號密碼被冒用時的通知管道，包含電話、電子郵件信箱等， 除有不可抗力或其他重大事由，該通知管道之服務時間為全日全年無休。<br>
                        消費者辦理帳號密碼被冒用手續完成後所發生之損失，概由本公司負擔；消費者辦理帳號密碼被冒用手續前所發生之損失，由消費者全部分擔。前項消費者需自行分擔全部損失，以有下列情事者為限： </p>
                    <p style="padding-left: 60px;">
                        （一）消費者未妥善保管帳號密碼。 <br>
                        （二）消費者自行將帳號密碼提供與他人。  <br>
                        （三）消費者未使用本公司所提供的帳號安全機制。  <br>
                        （四）其他因消費者之故意或重大過失所致之事由。
                    </p>
                    <p>十四、爭議處理</p>
                    <p style="padding-left: 30px;">
                        若產生消費爭議，消費者可於客服工作時間以本公司提供之所有客服管道做為聯繫管道。<br>
                        本公司客服連絡方式：登入本公司網站 <a href="https://www.egopay.com.tw">https://www.egopay.com.tw 後直接洽詢站內客服 </a><br>
                        本公司客服服務時間：早上 10:00 至晚上 10:00。 </p>
                    <p>十五、契約條款變更 </p>
                    <p style="padding-left: 30px;">
                        如本公司欲變更契約內容，將於七日前於服務網站明顯處公告，並以電子郵件或雙方約定之方式通知消費者。 <br>
                        消費者同意除本契約另有約定外，本公司依本契約所為之通知應以雙方約定之方式送達使用者申請本網站服務時所提供之通訊資料。<br>
                        消費者通訊資料如有變更，應立即於本網站服務網頁或以雙方約定之方式通知本公司。<br>
                        消費者如未依約定方式通知變更通訊資料時，本公司依原留存之通訊資料所為之通知，推定已為送達。
                    </p>
                    <p style="padding-left: 30px;">
                        如本公司欲變更契約內容，將於七日前於服務網站明顯處公告，並以電子郵件或雙方約定之方式通知消費者。 <br>
                        消費者同意除本契約另有約定外，本公司依本契約所為之通知應以雙方約定之方式送達使用者申請本網站服務時所提供之通訊資料。<br>
                        消費者通訊資料如有變更，應立即於本網站服務網頁或以雙方約定之方式通知本公司。<br>
                        消費者如未依約定方式通知變更通訊資料時，本公司依原留存之通訊資料所為之通知，推定已為送達。
                    </p>
                    <p>十六、準據法與管轄法院  </p>
                    <p style="padding-left: 30px;">
                        本合約準據法，依中華民國法律。
                        因本網站服務所生之爭議，如因此涉訟，雙方同意以新北地方法院為第一審管轄法院。但不得排除消費者保護法第四十七條或民事訴訟法第二十八條第二項、第四百三十六條之九規定小額訴訟管轄法院之適用
                    </p>
                </div>
                <div style="display: flex;flex-direction: row-reverse;padding: 10px">
                    <el-button type="primary" @click="ConsentBook=false" >離開</el-button>
                </div>
            </div>
        </el-dialog>
        <div v-html="chaoshang"></div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import VipHeader from './vues/VipHeader'
    import Footer from './vues/Footer'
    import Notice from './vues/notice'
    import Loading from './vues/loading'
    export default {
        data: function () {
            return {
                huilv:'',
                chaoshang:'',
                merber_id :Cookies.get('merber_id'),
                token :Cookies.get('egopay_key'),
                active:1,
                robot_rmb:'',
                robot_twd:'',
                radioBank:'',
                OrderData:{},
                Agreement:false,
                tongzhi_cz:'',
                loading:false,
                updatabled:true,
                ConsentBook:false,
            }
        },
        components: {
            VipHeader,
            Footer,
            Notice,
            Loading
        },
        methods: {
            gethuilv:function(){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/exchange",
                    dataType:"json",
                    data:{
                        exchange_type:2
                    },
                    success:(res)=>{
                        if(res.msg==""){
                            this.huilv='网络故障。请稍后....'
                        }
                        this.huilv=res.data[0].exchange
                    }
                })
            },
            goorderdetails:function(){
                this.$router.push({
                    path:'/orderDetails',
                    query:{
                        id:this.OrderData.order_id
                    }
                });
            },
            updata:function () {
                this.updatabled==false
                var _this=this
                var re =/^\d+(\.\d+)?$/;
                if (this.robot_rmb=="" || !re.test(this.robot_rmb)) {
                    this.$message({
                        showClose: true,
                        message: '請輸入正確的儲值金額',
                        type: 'error',
                        center: true,
                    })
                }else if(this.radioBank==""){
                    this.$message({
                        showClose: true,
                        message: '請選擇付款方式',
                        type: 'error',
                        center: true,
                    })
                }else {
                    if(this.radioBank==2 && this.robot_twd > 5970){
                        this.$message({
                            message: '使用超商代付請勿超過5970元新臺幣！',
                            type: 'error',
                            center: true
                        });
                    }else {
                        $.ajax({
                            type: "POST",
                            url: "https://www.trillionricher.com/1.0/recharge_r",
                            dataType: "json",
                            beforeSend: function (XMLHttpRequest) {
                                _this.loading = true
                            },
                            data: {
                                merber_id: this.merber_id,
                                token: this.token,
                                service_type: 2,
                                robot_rmb: this.robot_rmb,
                                robot_twd: this.robot_twd,
                                exchange_rate: this.huilv,
                                service_charge: 0,
                                payment_method: this.radioBank
                            },
                            success: (res) => {
                                if (res.success == -1) {
                                    this.Logout()
                                } else if (res.success == 1) {
                                    if (this.radioBank == 2) {
                                        this.loading = true
                                        this.chaoshang = res.data
                                        window.setTimeout(function () {
                                            document.getElementById("__ecpayForm").submit();
                                        }, 1000)
                                    } else {
                                        this.$message({
                                            message: '您的虛擬付款帳號已經通過短信發送到您的手機',
                                            type: 'success'
                                        });
                                        this.active = 2
                                        this.OrderData = res.data
                                        this.loading = false
                                        window.setTimeout(_this.goorderdetails, 10000)
                                    }
                                }
                            }
                        })
                    }
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

                                this.$router.push({path:'/vipindex'})
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
                        service_type: 2
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 0) {
                            this.$router.push({path: '/stored'})
                        }else {
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
            govipindex:function () {
                this.$router.push({path:'/vipindex'})
            },
            inputE:function (e) {
                this.robot_twd=Math.ceil(e*this.huilv)
            },
            inputtwd:function (e) {
                this.robot_rmb=Math.floor(e/this.huilv*10)/10
            }
        },
        computed: {},
        watch: {
            Agreement:function (agr) {
                if(agr==false){
                    this.updatabled=true
                }else {
                    this.updatabled=false
                }
            }
        },
        created: function () {
            this.$router.push({path: '/'})
        }
        //     if(this.merber_id==undefined){
        //         this.$router.push({path: '/register'})
        //     }else {
        //         this.gethuilv()
        //         this.check_order()
        //         $.ajax({
        //             type: "POST",
        //             url: "https://www.trillionricher.com/1.0/inform",
        //             dataType:"json",
        //             data:{page:4},
        //             success:(res)=>{
        //                 if(res.success==1){
        //                     this.tongzhi_cz=res.data[0].content
        //                 }
        //             }
        //         })
        //     }
        // }
    }
</script>
