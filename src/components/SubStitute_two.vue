<template>
    <div>
            <div class="orderdata_head"><router-link to="/"  style="color: #468DB9;margin-left: 10px;font-size: 16px;cursor: pointer;"><i class="el-icon-arrow-left"></i></router-link>支付寶點數代購訂單 </div>
            <div>
                <table class="order_table">
                    <tr>
                        <th>交易鏈接</th>
                        <th>用户</th>
                        <th>平台手續費</th>
                        <th>總金額</th>
                    </tr>
                    <tr>
                        <td v-if="OrderData.pay_url!==undefined">{{OrderData.pay_url.length>80?OrderData.pay_url.slice(0,80)+'...':OrderData.pay_url}}</td>
                        <td>{{OrderData.alipay_name}}{{OrderData.alipay_num}}</td>
                        <td>￥0</td>
                        <td>￥{{OrderData.robot_rmb}}</td>
                    </tr>
                </table>
                <table class="order_table">
                    <tr>
                        <th>代付商品名稱</th>
                        <th>金額</th>
                    </tr>
                    <tr v-for="(val,i) in OrderData.product_name" :key="i">
                        <td>{{val.product_name}}</td>
                        <td>{{val.product_price}}</td>
                    </tr>
                </table>
            </div>
            <div class="subStitute_body">
                <div class="fukuan subbody_left">
                        <h4>付款方式</h4>

                        <div class="payment_methodlist">
                            <div class="payment_method" v-if="Number(OrderData.robot_rmb)>Number(OrderData.r_money)" @click="radioBank = '5'" :style="radioBank=='5'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">
                                <img src="../assets/image/img/qianbao.png" alt="">
                                <div>
                                    <h3>錢包餘額付款</h3>
                                    <p>錢包餘額<span style="color:#19be6b;">{{Number(OrderData.r_money).toFixed(2)}}</span></p>
                                </div>
                            </div>
                            <div class="payment_method" v-else @click="radioBank = 3" :style="radioBank=='3'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">
                                <img src="../assets/image/img/qianbao.png" alt="">
                                <div>
                                    <h3>錢包餘額付款</h3>
                                    <p>錢包餘額<span class="color_red">{{Number(OrderData.r_money).toFixed(2)}}</span>個</p>
                                </div>
                            </div>
                            <div  class="payment_method" @click="radioBank = 10" :style="radioBank=='10'?'border: 2px solid #2F54EB;':'border: 1px solid #CCCCCC;'">
                                <img src="../assets/image/img/ATM.png" alt="">
                                <div>
                                    <h3 >網路ATM/ATM櫃機</h3>
                                    <p>陽信銀行虛擬帳號</p>
                                </div>
                            </div>
                        </div>

                    <div v-show="radioBank == 10 " style="padding-top: 10px;font-size: 14px">
                        <img src="../assets/image/ZGXT1.png" alt="" style="width: 200px">
                        <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>
                        <p>若轉帳後４８小時未入帳請與我們聯絡。</p>
                        <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>
                        <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>
                        <el-input  v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px;width: 620px" ></el-input>
                    </div>

<!--                        <div v-show="radioBank == 9 " style="padding-top: 10px;font-size: 14px">-->
<!--                            <img src="../assets/image/ZGXT1.png" alt="" style="width: 200px">-->
<!--                            <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>-->
<!--                            <p>若轉帳後４８小時未入帳請與我們聯絡。</p>-->
<!--                            <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>-->
<!--                            <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>-->
<!--                            <el-input  v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px;width: 620px" ></el-input>-->
<!--                        </div>-->
<!--                        <div v-show="radioBank == 7 " style="padding-top: 10px;font-size: 14px">-->
<!--                            <img src="../assets/image/guotai.jpg" alt="" style="width: 200px">-->
<!--                            <p>請使用網路銀行或實體ATM將金額轉入產生帳戶</p>-->
<!--                            <p>若轉帳後４８小時未入帳請與我們聯絡。</p>-->
<!--                            <p>輸入您轉出帳號後５碼，請勿使用其他帳號匯入，交易會卡住</p>-->
<!--                            <p>帳號產生後會簡訊通知，此帳號可以任何銀行匯入</p>-->
<!--                            <el-input  v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px;width: 620px" ></el-input>-->
<!--                        </div>-->
                        <!--<el-radio v-model="radioBank" label="8" style="margin: 15px 0">-->
                            <!--<div  class="payment_method">-->
                                <!--<h4 >網路ATM/ATM櫃機</h4>-->
                                <!--<p>星展銀行(810)虛擬帳號</p>-->
                                <!--<img src="../assets/image/xzyh.jpg" alt=""  height="75">-->
                            <!--</div>-->
                            <!--<el-input v-show="radioBank === '8'" v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px" ></el-input>-->
                        <!--</el-radio>-->

                        <!--<el-radio v-model="radioBank" label="2" style="display: flex;align-items: center;margin-bottom: 20px">-->
                            <!--<div class="payment_method">-->
                                <!--<h4>超商付款（超商繳費程式碼將發至您的手機）</h4>-->
                                <!--<p>7-11/全家/萊爾富/OK超商 <span style="color:#f90 ">收取 <span> 2% </span>的手續費，不足30臺幣按30臺幣收取</span></p>-->
                                <!--<p style="color: #ed3f14">使用超商付款不能超過5970元新台幣</p>-->
                                <!--<p>繳費代碼在送出訂單後將傳送至您的手機</p>-->
                                <!--<img src="../assets/image/1585229780-784296694_wn.jpg" alt="">-->
                            <!--</div>-->
                        <!--</el-radio>-->

                        <div class="Nextstep">
                            <el-checkbox v-model="Agreement">我同意貨款交由兆富通代墊，金額無誤，不另做用途。</el-checkbox>
                            <div>
                                <el-button type="primary" @click="cancel_order" size="mini">取消代付</el-button>
                                <el-button type="primary nestbutton" @click="create_order" :disabled="!Agreement" size="mini" >下一步</el-button>
                            </div>
                        </div>
                    </div>
            </div>

        <el-dialog  :visible.sync="ConsentBook"  width="900px" :close-on-click-modal="false" >
                <span slot="title" >
                    <i class="iconfont el-icon-al-guanyu"></i>
                    服務合約書
                </span>
            <div>
                <div class="ConsentBook" style="padding: 20px" >
                    <h2>E-TRANS GROUP INVESTMENT HOLDING LIMITED </h2>
                    <h2>服 務 合 約 書 </h2>
                    <p>一、 台灣委託授權者資訊</p>
                    <p style="padding-left: 30px;">
                        公司名稱：台易購金融科技股份有限公司  <br>
                        負責人：李敏行    <br>
                        網址：https://www.egopay.com.tw   <br>
                        營業所所在地：新北市新店區安興路117號1２樓之7    <br>
                        電話：0809-056668    <br>
                        電子郵件信箱：sysop@rgopay.com.tw    <br>
                        客服服務時間：站內客服及Line@客服服務時間為早上10:00至晚上10:00，全年無休；電話客服服務時間為早上10:00 至下午06:00.週末例假休息。
                    </p>
                    <p>二、 本契約條款如有疑義時，應為以消費者保護協會之規定作為解釋。</p>
                    <p>三、 第三方支付業者與消費者得以電子文件為表示方法，依本契約交換之電子文件，如其內容可完 整呈現且可於日後取出供查驗者，其效力與書面文件相同。但依法令或行政機關之公告排除適 用者，不在此限。</p>
                    <p>四、 本公司提供之第三方支付服務內容為按次收費制，收費標準為每筆服務費 20 元。 消費者在申請服務後的繳費方式包含：配合銀行臨櫃代收、自動櫃員機(ATM)轉帳、個人網路 銀行、行動手機銀行或超商代收款。</p>
                    <p>五、 匯率之計算 </p>
                    <p style="padding-left: 30px;">
                        消費者應委託業者或合作銀行向中央銀行申報，並同意簽暑防制洗錢所需之資料。<br>
                        本公司已取得經濟部發給之資料處理服務業，可受託處理網路交易涉及外匯收支或交易申報。 <br>
                        消費者所有支付款項為外幣時，以配合銀行每日中午 12 點正公告之外幣現金賣出價對應新臺幣結付。  <br>
                        退款因消費款項已境外廠商結算，如要提現須以配合銀行公告現金買入價為結匯依據。 <br>
                        適用匯率之計算準則若變動時，本公司將提前七日在提供服務之網站公告通知消費者。
                    </p>
                    <p>六、支付款項之保障 </p>
                    <p style="padding-left: 30px;">因消費者在本公司服務網站所消費之外幣為人民幣，為保障消費者之帳戶安全權益，本公司已 向中國之知名品牌保險公司投保帳戶保障安全險，如消費者帳戶被盜或挪用，均得到最高 5 萬人民幣賠付保障</p>
                    <p>七、消費者之身分認證  </p>
                    <p style="padding-left: 30px;">依據經濟部主管機關規定，消費者應提交身分認證之資料，不得有虛偽情事、具備會員制度之 第三方支付業者，應建立會員身分認證機制。 是以消費者使用本公司服務，必須按本公司之規定提供足以認證身分之真實資料，不得有虛偽 情事，如該等資料事後有變更，應立即通知本公司。 如有下列情形之一，本公司得要求消費者再次進行身分認證程序：</p>
                    <p style="padding-left: 60px;">
                        （一）消費者提供之身分證明文件或登記證照等相關文件疑似偽造或變造。 <br>
                        （二）對於所取之消費者身分資料之真實性或妥適性有所懷疑時。<br>
                        （三）消費者此次申請交易日期距前次交易日期已逾半年。  <br>
                        （四）消費者申請變更基本身分資料。   <br>
                        （五）同一行動電話號碼、電子郵件信箱等遭不同消費者或團體用於身分確認程序。  <br>
                        （六）發現疑似洗錢或資助恐怖主義交易時。
                    </p>
                    <p>八、 支付指示之再確認及事後核對  </p>
                    <p style="padding-left: 30px;">本公司於支付完成前就消費者之支付指示提供再確認之機制，消費者應依該機制確認支付指示是否正確。 消費者於每筆款項支付完成前後均能在本服務網站會員中心中查看該筆消費支付明細，同時亦可在交易紀錄網頁中隨時查詢過往每一筆服務之消費支付明細。  </p>
                    <p>九、 支付錯誤之處理  </p>
                    <p style="padding-left: 30px;">
                        因不可歸責於消費者之事由而發生支付錯誤時，本公司願意協助消費者更正，並提供其他必要之協助。<br>
                        因可歸責於本公司之事由而發生支付錯誤時，本公司於知悉時旋立即更正，並同時以電子郵件或雙方約定之方式通知消費者。<br>
                        因可歸責於消費者之事由而發生支付錯誤時，例如消費者輸入錯誤之金額或輸入錯誤之收款方 ，經消費者通知後，本公司將立即協助處理
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
        <el-dialog  :visible.sync="Supplement"  width="500px" :close-on-click-modal="false" style="margin-top: 20vh" >
                <span slot="title" >
                    <i class="iconfont el-icon-al-guanyu"></i>
                   補款方式
                </span>
            <div style="padding: 20px 20px 0">
                <p style="font-size: 15px;text-align: center;color: #666666">您的錢包餘額不足{{OrderData.robot_rmb}},需補款 <span style="color: red">￥{{(OrderData.robot_rmb-OrderData.r_money).toFixed(2)}}</span>，請選擇補款方式。</p>
                <el-radio-group v-model="withhold_type" size="medium" style="display: flex;justify-content: space-around;margin-top: 20px">
                    <el-radio label="10" border style="padding: 10px">陽信銀行</el-radio>
<!--                    <el-radio label="9" border style="padding: 10px">中國信託</el-radio>-->
<!--                    <el-radio label="7" border style="padding: 10px">ATM銀行轉帳(013 國泰銀行)</el-radio>-->
                    <!--<el-radio label="8" border style="padding: 10px">星展銀行</el-radio>-->
                    <!--<el-radio label="2" border style="padding: 10px">超商補款</el-radio>-->
                </el-radio-group>
                <el-input v-show="withhold_type === '9' || withhold_type === '7'  || withhold_type === '10'" v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px" ></el-input>
                <div style="display: flex;flex-direction: row-reverse;padding:20px 10px">
                    <el-button type="primary" style="margin-left: 20px" @click="EBcreate_orderajax(2)">確定並送出</el-button>
                    <el-button type="info" @click="">重新選擇付款方式</el-button>
                </div>
            </div>
        </el-dialog>
        <!--超过1w提示弹出框-->
        <el-dialog  :visible.sync="toolTipbox"  width="500px" :close-on-click-modal="false"  :close-on-press-escape="false" :show-close="false"	style="margin-top: 20vh" >
                <span slot="title" >
                    <i class="iconfont el-icon-al-guanyu"></i>
                   提示
                </span>
            <div style="padding: 20px">
                <p style="font-size: 18px;line-height: 30px;color: #0f0f0f">您好，礙於支付寶管制嚴重，提交代付金額限額不可超過5000人民幣。請拆單處理。</p>
                <el-button type="primary" style="width: 100%;margin-top: 50px" @click="govipindex">確 定</el-button>
            </div>
        </el-dialog>
        <!--滑动验证弹出框-->
        <el-dialog
                    :visible.sync="dragverify"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                @close="Reset"
                style="margin-top: 20vh;"
                width="400px"
        >
            <span slot="title" >
                    請進行認證
            </span>
            <div>
                <div style="padding: 30px 20px;font-size: 18px;font-weight: bold;margin: 0 auto" v-show="!slideshow" >
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
                <div style="font-weight: bold;margin: 0 auto" v-show="slideshow" >
                    <div class="phone" >
                        <div>
                            <span>手機號碼</span>
                            <span >{{merber_phone}}</span>
                        </div>
                        <div>
                            <el-input  size="mini" maxlength="6"  v-model="phone_code"  placeholder="請輸入驗證碼"></el-input>
                            <el-button size="mini" type="primary" @click="slideshow = false" :disabled="yzm.bled">{{yzm.text}}</el-button>
                        </div>
                        <div> <el-button type="primary" size="mini" @click="EBcreate_order" :disabled="EBdaifubled">送出並驗證</el-button></div>
                    </div>
                </div>
                <div class="slide-verify" :style="{color:textcolor}" >{{msg}}</div>
            </div>

        </el-dialog>
        <div v-html="chaoshang" style="opacity: 0"></div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import '../assets/css/Substitute  .css'
    import 'element-ui/lib/theme-chalk/display.css';
    import Clipboard from 'clipboard';
    import Common from './vues/Common'
    let rst=new Clipboard('.zfb');
    export default {
        inject:['reload'],

        data: function () {
            return {
                msg: '',   //提示内容
                textcolor:'#46ce04', //提示文字颜色
                imgs:Common.imgs, //滑动图片
                dragverify:false, //验证弹出框
                slideshow:true,//滑块和手机验证码开关
                EBdaifubled:true,//补款送出按钮开关
                phone_code:'',//手机验证码
                merber_phone:'',//用户手机号

                payment_code:'',
                checkpayment_code:'',
                merber_phcode:'',
                yzm:{
                    bled:false,
                    text:'發送驗證碼',
                    time:60,
                    num:3,
                },



                toolTipbox:false,//超过1W提示弹出框控制
                csbeld:true,//  暂时数据
                merber_id:Cookies.get('merber_id'),
                merber_name:Cookies.get('merber_name'),
                merber_email:Cookies.get('merber_email'),

                token:Cookies.get('egopay_key'),
                CarruerNumjy:Cookies.get('CarruerNumjy'),
                chaoshang:'',
                getRowClass:{
                    "background":"#e7e7e7",
                },
                urltimer:{
                    text:'秒',
                    time:60
                },
                OrderData:{},
                platform_serve:0,//平台服务费

                alipay_name:'',
                alipay_num:'',
                product_details:{

                },//产品详情
                step:{
                    One:true,
                    Two:false,
                    Three:false,
                    nexturl:true
                },//代付流程控制
                active:1,                    //代付当前步骤
                Agreement:true,
                radio:'1',
                huilv:'',
                isnext:true,   //获取朋友账号后开关代付链接
                RMB:'',        //用户输入的金额
                zfb:'',        //用户获取朋友账号
                UpdataRMB:'',  //用户修改金额

                radioBank:'3',  //付款方式
                url:'',        //用户提交的url
                withhold_type:'',//补款方式 1玉山  2超商 4联邦
                Supplement:false,
                zhifumima:'',//支付密码
                nextText:'下一步',//下一步的文字提示
                order_id:'',   //订单ID
                exchange_rate:'',//产生订单时的汇率
                robot_rmb:'',//订单总金额
                createOrder:{},  //订单创建完成后的数据
                order_num:'', //订单号
                urlbeld:false,
                tongzhi_df:'',//代付通知
                daifuloading:false,//loding
                zfbloading:false,
                pages:'',
                invoice_type:'1',//电子发票类型
                donation:'',//捐赠类型
                PersonalEmail:'',//个人电子发票邮箱
                companyEmail:'',//公司电子发票邮箱
                CustomerEmail:'',//电子发票邮箱(参数)
                company_num:'',//公司统一编号编号
                company_add:'',//公司地址
                company_name:'',//公司名称
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
                replacezfbdata:{
                    num:0,
                    time:60,
                    text:'更換朋友帳號',
                    beld:false
                },
                createbeld:false,
                bankcode:'',
            }
        },
        components: {},
        methods: {
            govipindex:function () {
                this.toolTipbox = false
                this.$router.push({path:'/'})
            },
            //滑动验证成功
            onSuccess(times){
                this.slideshow = true
                this.yzm.bled = true
                this.EBdaifubled = false
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/get_check",
                    dataType:"json",
                    data: {
                        merber_id:this.merber_id,
                        token:this.token,
                        merber_phone:this.merber_phone},
                    success:(res)=>{
                        this.msg= ""
                        if(res.success==2){
                            this.$message.error("此手機號已註冊");
                        }else if(res.success==1) {
                            this.$message({
                                message: '短信驗證碼已發送',
                                type: 'success'
                            });
                            this.yzm.bled = true;
                            this.yzm.time = 60;
                            this.yzmtimer();
                        }
                    }
                })

            },
            //滑动验证失败
            onFail(){
                this.textcolor = "#f56c6c"
                this.msg = '驗證未通過，請從新認證!'
            },
            //滑动图片刷新
            onRefresh(){
                this.msg = ''
            },
            //检查为非人为操作回调
            onAgain() {
                console.log('检测到非人为操作的哦！');
                this.msg = 'try again';
                // 刷新
                this.$refs.slideblock.reset();
            },
            querySearch:function(queryString, cb){
                var restaurants=[{'value':this.CarruerNumjy}]
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            again:function(){
                this.Supplement=false;
                this.zhifumima='';
                this.radioBank='';
                for (var i=0;i<6;i++){
                    this.pwdList.pop()
                }
            },
            getfocus:function(i){
                i=i+1
                $('#zfpwd input:nth-child('+i+')').css({'border':'1px solid #5D7EFF',})
            },
            outblur:function(i){
                i=i+1
                $('#zfpwd input:nth-child('+i+')').css({'border':'1px solid #131415',})
            },
            yzmtimer() {
                if (this.yzm.time > 0) {
                    this.yzm.bled = true
                    this.yzm.time--;
                    this.yzm.text=this.yzm.time+"s後重新獲取";
                    setTimeout(this.yzmtimer, 1000);
                } else{
                    this.yzm.time=0;
                    this.yzm.text="發送驗證碼";
                    this.yzm.bled=false;
                }
            },
            //E币付款发送手机验证码
            Egetyzm:function(){
                this.yzm.bled = true
                this.EBdaifubled = false
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/get_check",
                    dataType:"json",
                    data: {
                        merber_id:this.merber_id,
                        token:this.token,
                        merber_phone:this.merber_phone},
                    success:(res)=>{
                        if(res.success==2){
                            this.$message.error("此手機號已註冊");
                        }else if(res.success==1) {
                            this.$message({
                                message: '短信驗證碼已發送',
                                type: 'success'
                            });
                            this.yzm.bled = true;
                            this.yzm.time = 60;
                            this.yzmtimer();
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
            //获取汇率
            gethuilv:function(){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/exchange",
                    dataType:"json",
                    data:{
                        exchange_type:1
                    },
                    success:(res)=>{
                        this.huilv=res.data[0].exchange
                    }
                })
            },
            goorderdetails:function(){
                this.$router.push({
                    path:'/orderDetails',
                    query:{
                        id:this.order_id
                    }
                });
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
            //提交代付订单参数验证
            create_order(){
                if(this.radioBank==2 && this.OrderData.robot_twd > 5970) {
                    this.$message({
                        message: '使用超商代付請勿超過5970元新臺幣！',
                        type: 'error',
                        center: true
                    });
                    return false
                }
                if((this.radioBank == 9 || this.radioBank == 7) && this.bankcode.length != 5){
                    this.$message({
                        showClose: true,
                        message: '請輸入匯款銀行後五位',
                        type: 'error',
                        center: true,
                    })
                    return false
                }
                this.create_orderajax()



            },
            //提交订单ajax
            create_orderajax:function(){
                if(this.radioBank == 3  || this.radioBank == 5){
                    if(this.OrderData.r_money<=0){
                        this.$message({
                            message: '您當前錢包餘額 0，請重新選擇付款方式！',
                            type: 'error',
                            center: true
                        });
                    }else {
                        this.dragverify = true
                    }
                }else {
                    var _this=this
                    this.createbeld=true
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
                        url: "https://www.trillionricher.com/1.0/create_order",
                        dataType:"json",
                        data: {
                            sign:sign,
                            merber_id:this.merber_id,
                            token:this.token,
                            order_id:this.OrderData.order_id,
                            payment_method:this.radioBank,
                            service_charge:0,
                            invoice_type:this.invoice_type,
                            CustomerEmail:'',
                            CustomerAddr:this.company_add,
                            platform_serve:this.platform_serve,//平台手续费

                            CustomerIdentifier:this.company_num,
                            CustomerName:'',
                            CarruerNum:this.CarruerNum,
                            LoveCode:this.LoveCode,
                            withhold_type:this.withhold_type,
                            bankcode:this.bankcode
                        },
                        beforeSend:function(XMLHttpRequest){
                            _this.daifuloading=true
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
                                if(this.radioBank==2){
                                    this.daifuloading=true
                                    this.chaoshang=res.data
                                    window.setTimeout(function () {
                                        document.getElementById("__ecpayForm").submit();
                                    },1000)
                                }else {
                                    if(res.data.payment_method==1){
                                        this.$message({
                                            message: '您的虛擬付款帳號已經通過短信發送到您的手機',
                                            type: 'success'
                                        });
                                    }else if(res.data.payment_method==3){
                                        this.$message({
                                            message: '付款成功！',
                                            type: 'success'
                                        });
                                    }


                                    this.daifuloading=false
                                    this.$router.push({
                                        path:'/orderDetails',
                                        query:{
                                            id:res.data.order_id
                                        }
                                    });


                                }
                            }else if(res.success==4){
                                _this.daifuloading=false
                                this.$confirm('錢包餘額不足,請充值', {
                                    confirmButtonText: '前往儲值',
                                    cancelButtonText: '重新選擇',
                                    type: 'warning'
                                }).then(() => {
                                    this.$router.push({ path:'/stored'})
                                }).catch((e)=>{})
                            }else if(res.success==11){
                                _this.daifuloading=false
                                this.$message({
                                    message: '重複操作，請您稍後再試！',
                                    type: 'error',
                                    center: true
                                });
                                _this.$router.push({ path:'/record'})
                            }else {
                                _this.daifuloading=false
                            }
                        }
                    })
                }

            },
            //E币付款 补款验证
            EBcreate_order:function(){
                if(Number(this.OrderData.r_money) >= Number(this.OrderData.robot_rmb)){
                    this.EBcreate_orderajax(1)
                }else {
                    this.radioBank = 5
                    this.Supplement =true
                }
            },
            EBcreate_orderajax:function(type){
                var _this=this
                if(type == 2){
                    if((this.withhold_type == "9" || this.withhold_type == "7") && this.bankcode.length != 5){
                        this.$message({
                            showClose: true,
                            message: '請輸入匯款銀行後五位',
                            type: 'error',
                            center: true,
                        })
                        return false
                    }
                    if(this.withhold_type == ''){
                        this.$message({
                            message: '請選擇補款方式。！',
                            type: 'error',
                            center: true
                        });
                    }else {
                        this.createbeld=true
                        //-----------获取随机数
                        var timestamp = Date.parse(new Date());
                        var num = '';
                        for(var i=0;i<5;i++)
                        {
                            num+=Math.floor(Math.random()*10);
                        }
                        var sign = timestamp + num
                        //------------
                      var w_rmb = Number(this.OrderData.robot_rmb)-Number(this.OrderData.r_money).toFixed(2)
                      var w_twd=Math.ceil(w_rmb*this.huilv)
                        $.ajax({
                            type: "POST",
                            url: "https://www.trillionricher.com/1.0/create_order",
                            dataType:"json",
                            data: {
                                sign:sign,
                                merber_id:this.merber_id,
                                token:this.token,
                                order_id:this.OrderData.order_id,
                                payment_method:this.radioBank,
                                service_charge:0,
                                invoice_type:this.invoice_type,
                                CustomerEmail:'',
                                platform_serve:this.platform_serve,//平台手续费

                                CustomerAddr:this.company_add,
                                CustomerIdentifier:this.company_num,
                                CustomerName:'',
                                CarruerNum:this.CarruerNum,
                                LoveCode:this.LoveCode,
                                withhold_type:this.withhold_type,
                                withhold_rmb:w_rmb,
                                withhold_twd:w_twd,
                                remain_rmb:this.OrderData.r_money,

                                payment_code:this.phone_code,
                                merber_phone:this.merber_phone,
                                bankcode:this.bankcode
                            },
                            beforeSend:function(XMLHttpRequest){
                                _this.daifuloading=true
                            },
                            success:(res)=>{
                                _this.daifuloading = false
                                if(res.success==-1){
                                    this.$message({
                                        message: '登陸已過期，請重新登入！',
                                        type: 'error',
                                        center: true
                                    });
                                    this.$router.push({path: '/'})
                                    this.Logout()
                                }else if(res.success==1){
                                    this.Reset()
                                    if(this.withhold_type==2){
                                        this.daifuloading=true
                                        this.chaoshang=res.data
                                        window.setTimeout(function () {
                                            document.getElementById("__ecpayForm").submit();
                                        },1000)
                                    }else {
                                        if(res.data.payment_method==1){
                                            this.$message({
                                                message: '您的虛擬付款帳號已經通過短信發送到您的手機',
                                                type: 'success'
                                            });
                                        }else if(res.data.payment_method==3 || res.data.payment_method==5){
                                            if(res.data.payment_method==3){
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
                                        this.Supplement=false
                                        _this.daifuloading=false
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
                                        this.$message({
                                            message: '驗證碼錯誤！',
                                            type: 'error',
                                            duration:5000,
                                            center: true
                                        });
                                        this.EBdaifubled = false
                                        this.yzm.num --
                                        this.phone_code = ""
                                        this.textcolor = "#f56c6c"
                                        this.msg = "驗證碼錯誤，您還有"+this.yzm.num+"次機會"
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
                                    _this.daifuloading=false
                                    this.$message({
                                        message: '重複操作，請您稍後再試！',
                                        type: 'error',
                                        center: true
                                    });
                                    _this.$router.push({ path:'/record'})
                                }else {
                                    _this.daifuloading=false
                                }
                            }
                        })
                    }
                }else {
                    this.createbeld=true
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
                        url: "https://www.trillionricher.com/1.0/create_order",
                        dataType:"json",
                        data: {
                            sign:sign,
                            merber_id:this.merber_id,
                            token:this.token,
                            order_id:this.OrderData.order_id,
                            payment_method:this.radioBank,
                            service_charge:0,
                            invoice_type:'',
                            CustomerEmail:'',//------------
                            CustomerAddr:'',
                            CustomerIdentifier:'',
                            platform_serve:this.platform_serve,//平台手续费
                            CustomerName:'',//--------------
                            CarruerNum:this.CarruerNum,
                            LoveCode:this.LoveCode,
                            withhold_type:this.withhold_type,
                            payment_code:this.phone_code,
                            merber_phone:this.merber_phone
                        },
                        beforeSend:function(XMLHttpRequest){
                            _this.daifuloading=true
                        },
                        success:(res)=>{
                            console.log(res);
                            _this.daifuloading=false
                            if(res.success==-1){
                                this.$message({
                                    message: '登陸已過期，請重新登入！',
                                    type: 'error',
                                    center: true
                                });
                                this.$router.push({path: '/'})
                                this.Logout()
                            }else if(res.success==1){
                                this.Reset()
                                this.$message({
                                    message: '付款成功！',
                                    type: 'success'
                                });
                                this.Supplement=false
                                this.$router.push({
                                    path:'/orderDetails',
                                    query:{
                                        id:res.data.order_id
                                    }
                                });

                            }else if(res.success==8){
                                this.Supplement=false;
                                if(this.yzm.num <=1){
                                    this.$message({
                                        message: '请核对您的手机号码！',
                                        type: 'error',
                                        center:true
                                    });
                                    this.Reset();
                                }else {
                                    this.$message({
                                        message: '驗證碼錯誤！',
                                        type: 'error',
                                        duration:5000,
                                        center: true
                                    });
                                    this.EBdaifubled = false
                                    this.yzm.num --
                                    this.phone_code = ""
                                    this.textcolor = "#f56c6c"
                                    this.msg = "驗證碼錯誤，您還有"+this.yzm.num+"次機會"
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
                                _this.daifuloading=false
                                this.$message({
                                    message: '重複操作，請您稍後再試！',
                                    type: 'error',
                                    center: true
                                });
                                _this.$router.push({ path:'/record'})
                            }else {
                                _this.daifuloading=false
                            }
                        }
                    })
                }



            },
            //重置滑块弹出窗
            Reset:function(){
                this.slideshow = true
                this.dragverify = false
                this.Supplement = false;
                this.msg = ''
                this.$refs.slideblock.reset();
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
            //取消订单
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
                        data: {order_id:this.OrderData.order_id},
                        success: (res) => {
                            if(res.success==1){
                                this.$message({
                                    showClose: true,
                                    message: '訂單已取消',
                                    type: 'success',
                                    center:true,
                                })
                                this.active=1
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
                        service_type: 1
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.$message({
                                message: '登陸已過期，請重新登入！',
                                type: 'error',
                                center: true
                            });
                            this.$router.push({path: '/'})
                            this.Logout()
                        }else if (res.success == 0) {
                            this.$router.push({path: '/substitute'})
                            this.CustomerEmail=res.data.merber_email
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
            getphone:function(){
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
                        }
                    }
                })

            },
            Openandclose:function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/notice_switch",
                    dataType:"json",
                    success:(res)=>{
                        if(res.success==1){
                            if(res.data[2].switch==2){
                                this.$message({
                                    dangerouslyUseHTMLString: true,
                                    duration:5000,
                                    message: res.data[2].content,
                                    type: 'error',
                                    center: true
                                });
                                this.$router.push({path: '/'})
                                return false
                            }else {
                                this.isactive();
                                this.gethuilv();
                                this.check_order()
                                this.getphone()
                                var order_money=this.$route.query.order_money
                                var pay_number=this.$route.query.pay_number
                                var pay_url=this.$route.query.pay_url
                                var exchange=this.$route.query.exchange
                                if(order_money !== undefined && pay_number!==undefined && pay_url!==undefined){
                                    this.isnext=false
                                    this.zfb=pay_number
                                    this.RMB=order_money
                                    this.url=pay_url
                                    this.huilv=exchange
                                }
                            }
                        }
                    }
                })
            },

            // 未付款订单
            getorderdata:function (id) {
                $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/product_order",
                        dataType:"json",
                        data: {
                            merber_id:this.merber_id,
                            token:this.token,
                            order_id:id},
                        success:(res)=>{
                            this.OrderData = res.data
                        }
                })
            }
        },
        computed: {},
        watch: {},
        mounted: function () {

        },
        created:function () {

            var id = this.$route.params.id
            if(id == undefined){
                this.$router.push({
                    path:'/substitute',
                });
            }
            this.getorderdata(id)
            this.getphone()
            this.gethuilv();

        },

    }
</script>
