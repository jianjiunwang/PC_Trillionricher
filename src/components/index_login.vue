<template>
    <div >
        <div class="login">
            <!--未登入-->
            <ul v-show="!this.$store.state.islogin" >
                <h2>會員登入</h2>
                <li>
                    <el-input   placeholder="會員賬號" v-model="email_phone"></el-input>
                </li>
                <li>
                    <el-input   placeholder="會員密碼" v-model="password" type="password"  @keyup.enter.native="doLogin"></el-input>
                </li>
                <li v-show="pwderror" style="color: red;text-align: center;">賬號或密碼錯誤！</li>
                <li>
                    <el-button type="warning" round @click.enter="doLogin" >登 入</el-button>
                </li>
                <li>
                    <el-button type="success" round  @click="govipindex(4)" >註冊會員</el-button>
                </li>
                <li @click="wjmima = true;wjmimatype = 2">
                    忘記密碼?
                </li>
            </ul>
            <!--已登入-->

            <div v-show="this.$store.state.islogin" class="thenlogin">

<!--                <div class="message">-->
<!--                    <span>會員資料</span>-->


<!--                    <div>-->
<!--                        <el-tooltip class="item" effect="dark" content="登出" placement="bottom">-->
<!--                            <img src="../assets/image/out.png" alt="" @click="dengchu" style="cursor: pointer">-->
<!--                        </el-tooltip>-->
<!--                        <a href="https://line.me/R/ti/p/%40653ymryv" target="_blank" class="abuttton">  <img src="../assets/image/service.png" alt="" style="cursor: pointer"></a>-->
<!--                      -->
<!--                        <div style="position: relative" >-->
<!--                            <i class="el-icon-message"  @click="New_news = true" style="cursor: pointer"></i>-->
<!--                            <span v-if="Notice_Number!=0" class="bage" style="position: absolute;width: 20px;height: 20px;font-size: 12px;background-color: #ff5854;font-weight: bold;top: -10px;right: -10px;border-radius: 50%;text-align: center;line-height: 20px">{{Notice_Number}}</span>-->
<!--                        </div>-->
<!--                        &lt;!&ndash;<el-badge :value="Notice_Number" :hidden="Notice_Number_show" class="item">&ndash;&gt;-->

<!--                        &lt;!&ndash;</el-badge>&ndash;&gt;-->
<!--                    </div>-->

<!--                </div>-->
                <div class="user">
                    <img class="head_portrait" v-show="vipdata.head_portrait" :src="vipdata.head_portrait==''" alt="" >
                    <img class="head_portrait" v-show="!vipdata.head_portrait" src="../assets/image/img/newlogo.png" alt="" >
                    <div style="width: 100%;">
                        <div class="username">
                            <div style="font-size: 16px;    text-align: center;">
                                {{vipdata.merber_name}}
                                <img src="../assets/image/img/xiugai.png" width="15px" alt="" @click="popup.upDataUser = true;">
                            </div>
                            <div class="Rmb">
                                <img src="../assets/image/dollar-symbol.png" width="15px" alt="">
                                 <span> {{vipdata.r_money}} </span>
                            </div>
                        </div>
     <div style="    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;">
                            <div class="approvebox">
                                    <div class="approve">
                                        <img src="../assets/image/img/yirenzheng.png" alt="" >
                                        手機號碼已認證
                                    </div>
                                    <div class="approve approve_undone" v-if="vipdata.authentication==1" @click="popup.userId = true">身份認證未完成</div>
                                    <div class="approve approve_during" v-if="vipdata.authentication==2">身份認證中</div>
                                    <div class="approve" v-if="vipdata.authentication==3"><img src="../assets/image/img/yirenzheng.png" alt="" >身份認證已完成</div>
                                    <div class="approve approve_failure" v-if="vipdata.authentication==4" @click="popup.userId = true">身份認證失敗請重新認證</div>

                                    <div class="approve approve_undone" v-if="vipdata.fileverify_authentication==0" @click="popup.Fileupload=true">防洗錢聲明書未完成</div>
                                    <div class="approve approve_during" v-if="vipdata.fileverify_authentication==1">防洗錢聲明書認證中</div>
                                    <div class="approve" v-if="vipdata.fileverify_authentication==2"><img src="../assets/image/img/yirenzheng.png" alt="" >防洗錢聲明書已認證</div>
                                    <div class="approve approve_failure" v-if="vipdata.fileverify_authentication==3" @click="popup.Fileupload=true">聲明書認證失敗請重新認證</div>
                            </div>
                            <div class="wallet">
                                *不提供錢包充值*
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fgx">

                </div>
                <div class="alipay">
                    <div>
                        <span>支付寶帳戶</span>
                        <span type="text" @click="popup.zhifubao = true" class="moveradd">
                                        <i class="iconfont el-icon-al-shuliang-zengjia"></i>添加賬戶
                        </span>
                    </div>
                    <ul>
                        <li v-for="(val,i) in vipdata.alipay"  v-if="i<10" class="alipaydata">
                                    <span >
                                        <span>{{val.alipay_name}}</span>
                                        <span>({{val.alipay_num}})</span>
                                    </span>
                            <img src="../assets/image/img/delete.png" alt="" @click="deletezfb_Bank(val.alipay_num,'alipay')">

                        </li>
                    </ul>
                </div>
<!--                <div class="alipay">-->
<!--                    <div>-->
<!--                        <span><b>收貨地址</b></span>-->
<!--                        <span type="text" @click="popup.zhifubao = true" class="moveradd">-->
<!--                                        <i class="iconfont el-icon-al-shuliang-zengjia"></i>添加地址-->
<!--                        </span>-->
<!--                    </div>-->
<!--                    <ul>-->
<!--                        <li v-for="(val,i) in address_data"  v-if="i<10" class="alipaydata">-->
<!--                            <span>{{val.city + val.country +val.road + val.address}}</span>-->
<!--                            <img src="../assets/image/img/xiugai.png" alt="" @click="delete_site(val.alipay_num,'alipay')" height="15px">-->
<!--                            <img src="../assets/image/img/delete.png" alt="" @click="delete_site(val.alipay_num,'alipay')">-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </div>-->
            </div>


        </div>
        <!--编辑个人资料弹出框-->
        <el-dialog  :visible.sync="popup.upDataUser" title="編輯個人資料" width="600px" :close-on-click-modal="popup.modelon" >
            <span slot="title" >
                編輯個人資料
            </span>
            <div class="personal_data">
                <el-tabs  tab-position="left" v-model="upuserdata">
                    <el-tab-pane label="個人資料">
                        <ul class="userdata">
                            <li>
                                <span>暱稱</span>
                                <!-- <span>|</span> -->
                                <span>{{personal.merber_nickname}}</span>
                            </li>
                            <li>
                                <span>真實姓名</span>
                                <!-- <span>|</span> -->
                                <span>{{personal.merber_name}}</span>
                            </li>
                            <li>
                                <span>手機號</span>
                                <!-- <span>|</span> -->
                                <span>{{personal.merber_phone}}</span>
                            </li>
                            <li>
                                <span>E-mail</span>
                                <!-- <span>|</span> -->
                                <span>{{personal.merber_email}}</span>
                            </li>
                            <li>
                                <span>會員編號</span>
                                <!-- <span>|</span> -->
                                <span>{{personal.merber_num}}</span>
                            </li>
                            <li>
                              <span>註冊邀請碼</span>
                              <!-- <span>|</span> -->
                              <span class="merber_num" @click="Cope" :data-clipboard-text="'https://www.trillionricher.com/dist/#/Register?invite_code='+personal.merber_num">點擊複製邀請鏈接</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="修改暱稱" tab-position="left" name="upuname">
                        <div class="up_phone">
                            <el-form :model="ruleForm" :rules="rulesuname" ref="rulesuname" >
                                <ul>
                                    <li>
                                        <el-form-item label="目前暱稱" >
                                            {{personal.merber_nickname}}
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="新暱稱"  prop="uname" >
                                            <el-input maxlength="18"  type="text" placeholder=""  v-model="ruleForm.uname"></el-input>
                                        </el-form-item>
                                    </li>
                                </ul>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="修改密碼" tab-position="left" name="uppwd">
                        <div class="up_pwd">
                            <el-form :model="ruleForm" :rules="rulespwd" ref="rulespwd" >
                                <ul>
                                    <li>
                                        <el-form-item label="目前密碼"  prop="password" >
                                            <el-input  type="password" placeholder="" required v-model="ruleForm.password"></el-input>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="驗 證 碼" prop="merber_phcode" >
                                            <el-input maxlength="6"  placeholder="" v-model="ruleForm.merber_phcode" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-button class="yzm" type="text" size="small" @click="dragverify = true" :disabled="yzmdata.disabled">{{yzmdata.btntext}}</el-button>
                                    </li>
                                    <li>
                                        <el-form-item  label="設定密碼"  prop="merber_password" >
                                            <el-input type="password" v-model="ruleForm.merber_password" placeholder="設定登入密碼"></el-input>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="再次輸入密碼" prop="checkPass">
                                            <el-input type="password" v-model="ruleForm.checkPass" placeholder="請再次輸入登入密碼"></el-input>
                                        </el-form-item>
                                    </li>
                                </ul>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="修改E-mail" name="upemail">
                        <el-form  :model="ruleForm" :rules="rulesmail" ref="rulesmail" >
                            <div class="up_mali">
                                <ul >
                                    <li>
                                        <el-form-item label="E-mail:" prop="merber_email" >
                                            <el-input v-model="ruleForm.merber_email" placeholder="請輸入新的E-mail"></el-input>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="驗 證 碼" prop="merber_phcode" >
                                            <el-input maxlength="6"  placeholder="" v-model="ruleForm.merber_phcode" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-button class="yzm" type="text" size="small" @click="dragverify = true" :disabled="yzmdata.disabled">{{yzmdata.btntext}}</el-button>
                                    </li>
                                </ul>
                            </div>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="修改手機號" name="upphone">
                        <el-form :model="ruleForm" :rules="rulesphone" ref="rulesphone" >
                            <div class="up_phone">
                                <div>
                                    <el-form-item label="手機號碼" prop="merber_phone1" >
                                        <el-input v-model="ruleForm.merber_phone1" placeholder="請填入本人手機號碼"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item label="驗 證 碼"  maxlength="6"  prop="merber_phcode1" >
                                        <el-input   placeholder="請輸入簡訊驗證碼" v-model="ruleForm.merber_phcode1" ></el-input>
                                    </el-form-item>
                                    <el-button type="text" size="small" @click="updataphoneyzm" :disabled="yzmdata.disabled">{{yzmdata.btntext}}</el-button>
                                </div>
                            </div>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <div class="subupdata">
                    <el-button type="primary" size="mini" @click="updata_user">送出 <i class="el-icon-arrow-right"></i></el-button>
                </div>
            </div>
        </el-dialog>
        <!--密码重置-->
        <el-dialog  :visible.sync="wjmima" title="重置密碼" style="margin: 0 auto" :close-on-click-modal='false' width="500px">
            <div style="padding: 10px 0">
                <div style="color: red;text-align: center;padding: 10px;font-size: 14px" v-show="wjmmtext">親愛的用戶您好，為提升安全性，請重新修改密碼(英數組合10-20位)。</div>

                <el-form :model="wjimimaform" status-icon :rules="wjimimarules" ref="wjimimarules" label-width="100px" class="demo-ruleForm"  style="padding: 10px 30px 0 10px" v-show="!slideshow">
                    <ul class="wjmima">
                        <li>
                            <el-form-item label="手機號碼" prop="merber_phone"  >

                                <el-input type="text" v-model="wjimimaform.merber_phone" :disabled="isphone" autocomplete="off" style="width: 200px"></el-input>

                            </el-form-item>
                        </li>
                        <li>
                            <el-form-item label="驗證碼" prop="merber_phcode" >
                                <div style="display: flex;justify-content: space-between">
                                    <el-input type="Number" placeholder="請輸入6位數字驗證碼"  maxlength="6" v-model="wjimimaform.merber_phcode"  autocomplete="off" style="width: 200px"></el-input>
                                    <el-button type="primary" @click="forget_pad_code" :disabled="phcode.bled">{{phcode.text}}</el-button>
                                </div>
                            </el-form-item>
                        </li>
                        <li >
                            <el-form-item label="新密碼" prop="merber_password" >
                                <el-input type="password" placeholder="密碼必須由數位和字母組成且 10-20 位" v-model="wjimimaform.merber_password" autocomplete="new-password" /></el-input>
                            </el-form-item>
                        </li>
                        <li >
                            <el-form-item label="再次輸入" prop="merber__password" >
                                <el-input type="password" placeholder="密碼必須由數位和字母組成且 10-20 位" v-model="wjimimaform.merber__password" autocomplete="new-password" ></el-input>
                            </el-form-item>
                        </li>
                        <li >
                            <el-form-item style="margin-bottom: 0">
                                <el-button type="primary" @click="resetForm">重置</el-button>
                                <el-button type="success" @click.enter="forget_pad" :disabled="forget_padbeld" >確定送出</el-button>
                            </el-form-item>
                        </li>
                    </ul>
                </el-form>
                <div style="padding: 30px 10px 0 10px;font-size: 18px;font-weight: bold;margin: 0 auto" v-show="slideshow" >
                    <slide-verify :l="42"
                                  :r="10"
                                  :w="360"
                                  :h="180"
                                  :imgs="imgs"
                                  :accuracy="3"
                                  ref="sliResetpwd"
                                  slider-text="向右滑動 >>>"
                                  style="margin: 0 auto"
                                  @success="onSuccesssliResetpwd"
                                  @fail="onFailsliResetpwd"
                                  @refresh="onRefreshsliResetpwd"
                                  @again="onAgainsliResetpwd"
                    ></slide-verify>
                </div>
                <div class="slide-verify"  :style="{color:textcolor}" >{{msg}}</div>
            </div>
        </el-dialog>
        <!--登入滑块认证-->
        <el-dialog
                :visible.sync="dragverify"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                
                width="400px"
        >
            <span slot="title" >
                    請進行認證
            </span>
            <div style="padding: 20px 10px;font-size: 18px;font-weight: bold;margin: 0 auto"  >
                <slide-verify :l="42"
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
                <div class="slide-verify" :style="{color:textcolor}" >{{msg}}</div>
            </div>
        </el-dialog>
        <!--文件认证-->
        <el-dialog  :visible.sync="popup.Fileupload" width="700px" :close-on-click-modal="false">
            <span slot="title" >
                防洗錢聲明文檔上傳
            </span>
            <div v-loading="Fileuploadshow" element-loading-text="正在上傳，請稍等" element-loading-background="rgba(0, 0, 0, 0.8)">
                <div style="padding: 20px">
                    <div class="Tips">
                        <p>1、請先下載防洗錢聲明文件，列印後親簽，或使用APP電子簽名。</p>
                        <p>2、將已簽名文件拍照或擷圖上傳,圖片格式：僅限<span style="color: red">JPG、PNG。</span></p>
                    </div>
                </div>
                <div style="display: flex">
                    <div style="width: 50%;">

                        <div  class="Choiceimg" style="padding:10px">
                            <input type="file" style="width: 100%"  @change="onchange(6)"  id="imgUpFile" accept=".jpg,.png,">
                            <el-button type="primary" style="width: 100%">點擊選擇圖片</el-button>
                        </div>
                        <div style="width: 300px;height: 150px;padding: 10px" v-show="fileimageUrl">
                            <img :src="fileimageUrl" alt=""  height="100%" style="margin: 0 auto">
                        </div>
                    </div>
                    <div style="width: 50%;">
                        <p class="Tips">防洗錢聲明檔請點選以下連結下載</p><br>
                        <a target="_blank" href="https://trillionricher-1258896139.cos.ap-tokyo.myqcloud.com/file/%E9%98%B2%E6%B4%97%E9%8C%A2%E8%AD%89%E6%98%8E%E6%9B%B8.pdf" style="color: #3399FF">【防洗錢聲明文檔】</a><br><br>
                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.adobe.reader&hl=zh_TW" style="color: #3399FF">【Android : Adobe pdf 簽名App】</a><br><br>
                        <a target="_blank" href="https://itunes.apple.com/tw/app/adobe-acrobat-reader/id469337564?mt=8" style="color: #3399FF">【IOS : Adobe pdf 簽名App】</a><br><br>
                        <p style="color: red;">防洗錢聲明均由人工驗證，請務必簽名後上傳清楚圖檔，以免驗證失敗。</p>
                    </div>
                </div>
                <div style="display: flex;flex-direction:row-reverse;padding: 10px;">
                    <el-button type="primary" @click="file_verify" class="Certification">確認並送出</el-button>
                </div>
            </div>
        </el-dialog>
        <!--身份认证弹出框-->
        <el-dialog  :visible.sync="popup.userId" title="會員身份認證" width="900px" :close-on-click-modal="popup.modelon" >
            <span slot="title" >
                會員身份認證
            </span>
            <div class="shenfen" v-loading="addidloading" element-loading-text="正在上傳，請稍等" element-loading-background="rgba(0, 0, 0, 0.8)">
                <div>
                    避免第三方詐騙與有心人士利用本公司作為洗錢管道，請您如實提供身份證件。
                    網站內所填寫及上傳的所有圖資，將登記造冊，保密管理。

                </div>
                <div>
                    請依據所持國民身份證記載的【身份證字號】及【發證日期】輸入資料。
                    圖片格式僅限:JPG、PNG、GIF檔。
                </div>
                <el-form :model="identitydata" :rules="identityReg" ref="identityReg" label-width="120px"  >
                    <div class="shenfen_xq">
                        <el-form-item label="身份證號:" prop="identity_num">
                            <el-input placeholder="" size="mini" v-model="identitydata.identity_num" name="identity_num" style="margin-left: 30px;width: 200px"></el-input>
                        </el-form-item>
                        <el-form-item label="發證地點 :" prop="region">
                            <el-select v-model="identitydata.region" placeholder="" style="margin-left: 30px;width: 200px" size="mini">
                                <el-option
                                        v-for="item in Location"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div class="date" style="display: flex;">
                            <span style="width:108px;height:40px;line-height:40px;text-align: right;padding: 0 12px 0 0;"> <span style="color: #f56c6c;">*</span> 發證日期 :</span>
                            <span style="padding-top: 10px">民國</span>
                            <el-form-item  prop="year" >
                                <el-select v-model="identitydata.year" placeholder="" style="width: 70px;" size="mini">
                                    <el-option
                                            v-for="item in yearoptions"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                                年
                            </el-form-item>
                            <el-form-item  prop="month" >
                                <el-select v-model="identitydata.month" placeholder="" style="width: 70px;" size="mini">
                                    <el-option
                                            v-for="item in 12"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                                月
                            </el-form-item>
                            <el-form-item  prop="day" >
                                <el-select v-model="identitydata.day" placeholder="" style="width: 70px;" size="mini">
                                    <el-option
                                            v-for="item in 31"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                                日
                            </el-form-item>
                        </div>
                        <el-form-item label="補換類型 :" prop="identity_type" style="display: flex;align-items: center" >
                            <el-radio-group v-model="identitydata.identity_type" >
                                <el-radio label="初發" name="identity_type"  style="margin-left: 30px;">初發</el-radio>
                                <el-radio label="換發" name="identity_type" >換發</el-radio>
                                <el-radio label="補發" name="identity_type" >補發</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="inputidentity">
                    <div>
                        <div style="width:100%;height: 230px;border: 1px solid #e7e7e7;position: relative">
                            <img v-show="!imageUrl1" src="../assets/image/u6.png" alt="" style="width: 100px;position: absolute;top: 75px;left: 145px">
                            <img v-show="imageUrl1" :src="imageUrl1" alt="" width="100%" height="100%">
                            <p v-show="imageUrl1" style="color: #FE0000;z-index: 10;;position:absolute; top: 100px;left: 106px;font-size: 20px;font-weight: bold;opacity: 0.5">僅供兆富通審核使用</p>
                            <div style="width: 100%;height: 230px;position: absolute;top: 0;z-index: 999"></div>
                        </div>
                        <div style="position: relative">
                            <input type="file" class="inputfr" id="identity_front"  accept=".jpg,.png,.gif"  @change="onchange(1)">
                            <el-button type="primary" style="background-color:#efb300;border: none ">點擊選擇身份證正面圖片</el-button>
                        </div>
                    </div>
                    <div>
                        <div style="width:100%;height: 230px;border: 1px solid #e7e7e7;position: relative">
                            <img v-show="!imageUrl2" src="../assets/image/u6.png" alt="" style="width: 100px;position: absolute;top: 75px;left: 145px">
                            <img v-show="imageUrl2" :src="imageUrl2" alt="" width="100%" height="100%">
                            <p v-show="imageUrl2" style="color: #FE0000;z-index: 10;;position:absolute; top: 100px;left: 106px;font-size: 20px;font-weight: bold;opacity: 0.5">僅供兆富通審核使用</p>
                            <div style="width: 100%;height: 230px;position: absolute;top: 0;z-index: 999"></div>
                        </div>
                        <div style="position: relative">
                            <input type="file"  id="identity_reverse"  accept=".jpg,.png,.gif" @change="onchange(2)">
                            <el-button type="primary" style="background-color:#efb300;border: none ">點擊選擇身份證反面圖片</el-button>
                        </div>
                    </div>
                </div>
                <div class="inputidentity">
                    <div>
                        <div style="width:100%;height: 230px;border: 1px solid #e7e7e7;position: relative">
                            <img v-show="!imageUrl3" src="../assets/image/u6.png" alt="" style="width: 100px;position: absolute;top: 75px;left: 145px">
                            <img v-show="imageUrl3" :src="imageUrl3" alt="" width="100%" height="100%">
                            <p v-show="imageUrl3" style="color: #FE0000;z-index: 10;;position:absolute; top: 100px;left: 106px;font-size: 20px;font-weight: bold;opacity: 0.5">僅供兆富通審核使用</p>
                            <div style="width: 100%;height: 230px;position: absolute;top: 0;z-index: 999"></div>
                        </div>
                        <div style="position: relative">
                            <input type="file" class="inputfr" id="handheld_front"  accept=".jpg,.png,.gif"  @change="onchange(7)">
                            <el-button type="primary" style="background-color:#efb300;border: none ">點擊選擇手持身份證正面圖片</el-button>
                        </div>
                    </div>
                </div>
                <div style="display: flex;justify-content: flex-end">
                    <el-button   type="primary" @click="submitUpload" class="Certification">確認並送出</el-button>
                </div>
            </div>
        </el-dialog>
        <!--消息通知-->
        <el-dialog  :visible.sync="New_news" width="670px"  >
            <span slot="title"  style="font-size: 18px ;font-weight: bold" >
                消息通知
            </span>
            <div class="message_data" >
                <div v-for="item in  Alltongzhi" class="News" @click="clicktz(item.notification_id,item.type,item.is_receive,item.id,item.content)">
                    <div v-if="item.type.substr(0,1)==7  || item.type.substr(0,1)==8 "> <span>驗證失敗,點擊查看詳情</span><span>{{item.create_time | convTime}}</span></div>
                    <div v-else> <span>{{item.content}}</span>   <span>{{item.create_time | convTime}}</span></div>
                    <i v-if="item.is_receive==0" class="iconfont el-icon-al-New-Tga" style="color: #ff090c;font-size: 30px"></i>
                </div>
            </div>
        </el-dialog>
        <!--新留言提交-->
        <el-dialog  :visible.sync="service" width="670px" :close-on-click-modal="false">
            <span slot="title"  style="font-size: 18px ;font-weight: bold" >
                    客服留言
            </span>
            <div>
                <div class="servicetextarea">
                    <el-input
                            type="textarea"
                            :rows="14"
                            placeholder="請輸入内容(内容不可空白)"
                            v-model="servicetext">
                    </el-input>
                </div>
                <div style="height: 100px;padding: 10px 20px" v-show="messageimgurl">
                    <img :src="messageimgurl" alt="" height="100%">
                </div>
                <div class="Choiceimg">
                    <input type="file" id="uploadimg"  @change="onchanges(1)">
                    <button >點擊上傳圖片</button>
                    <a href="https://line.me/R/ti/p/%40653ymryv" target="_blank"><img src="../assets/image/LINE.png" alt="加入好友" style="margin-left: 20px" height="36" border="0"></a>
                </div>

                <div style="display: flex;flex-direction: row-reverse;padding: 0 10px 10px 0">
                    <div> <el-button  type="primary" @click="newsubmitUpload" :loading="serviceloding">送出留言</el-button></div>
                </div>
            </div>
        </el-dialog>
        <!--二次提交-->
        <el-dialog  :visible.sync="check_service" width="670px" :close-on-click-modal="false" >
            <span slot="title"  style="font-size: 18px ;font-weight: bold" >
                    客服留言
            </span>
            <div style="max-height: 700px;overflow:auto"  v-loading="anew_messageloding" element-loading-text="正在提交，請稍等" element-loading-background="rgba(0, 0, 0, 0.8)">
                <div style="width: 620px;margin: 20px auto 0">
                    <span style="font-weight: bold;font-size: 16px">您的留言: </span><br>
                    <p style="line-height: 30px;margin-top: 10px;" v-html="Mymessager.content"></p>
                    <div style="display: flex;width: 620px;margin: 20px auto 0" v-if="Mymessagerimg!=''">
                        <div style="width: 80px;height: 80px;margin-right: 15px" v-for="val in Mymessagerimg">
                            <img :src="val" alt="" width="100%" height="100%">
                        </div>
                    </div>
                </div>
                <div style="width: 620px;margin: 20px auto 0;padding: 10px" v-for="val in leave_message" :style="{backgroundColor:val.service_name==null?'#16171c':'#efb300'}">
                    <span style="font-weight: bold;font-size: 16px" v-if="val.service_name!==null ">客服回覆:<br> </span>
                    <span style="font-weight: bold;font-size: 16px" v-if="val.service_name==null ">您的留言:<br> </span>
                    <p style="line-height: 30px" v-html="val.content"></p>
                    <div style="display: flex;width: 620px;margin: 20px auto 0" v-if="val.image!==null && val.image!==''">
                        <div style="width: 80px;height: 80px;margin-right: 15px" v-for="item in val.image.split(',')" >
                            <a :href="item" target="_blank"><img :src="item" alt="" width="100%" height="100%"></a>
                        </div>
                    </div>
                </div>
                <div v-if="isclose=='0'" style="width: 620px;margin: 20px auto 0;padding: 10px;background-color:#efb300 ">
                    <span style="font-weight: bold;font-size: 16px">客服回覆:<br> </span>
                    <p style="line-height: 30px">尚未回覆,您在等一等哦^^</p>
                </div>
                <div v-show="Unsolved">
                    <div style="width: 620px;margin: 30px auto 0">
                        <el-input
                                type="textarea"
                                :rows="7"
                                placeholder="請輸入內容（内容不可空白）"
                                v-model="Unsolvedtext">
                        </el-input>
                    </div>
                    <div class="Choiceimg">
                        <input type="file" id="uploadimg2"  @change="onchanges(2)">
                        <button>上傳圖片</button>
                        <a href="https://line.me/R/ti/p/%40653ymryv" target="_blank"><img src="../assets/image/LINE.png" alt="加入好友" style="margin-left: 20px" height="36" border="0"></a>
                    </div>
                    <div style="height: 100px;margin: 10px 0;padding: 0 20px" v-show="checkmessageimgurl">
                        <img :src="checkmessageimgurl" alt="" height="100%">
                    </div>
                    <div style="display: flex;    flex-direction: row-reverse;padding: 0 10px 10px 0">
                        <div> <el-button  type="primary" @click="anew_message"  >送出留言</el-button></div>
                    </div>
                </div>
                <div style="padding: 10px;display: flex;justify-content: center">
                    <el-button type="success" @click="close_solve">已解決</el-button>
                    <el-button type="danger" @click="Unsolved=true" :disabled="isclose=='0'">未解決,回覆訊息</el-button>
                </div>
            </div>
        </el-dialog>
        <!--留言记录详情-->
        <el-dialog  :visible.sync="getmessage" width="670px" :close-on-click-modal="false" >
            <span slot="title"  style="font-size: 18px ;font-weight: bold" >
                    客服留言
            </span>
            <div style="max-height: 500px;overflow:auto">
                <div style="width: 620px;margin: 20px auto 0">
                    <span style="font-weight: bold;font-size: 16px">您的留言: </span><br>
                    <p style="line-height: 30px;margin-top: 10px" v-html="messageDetails.message.content"></p>
                    <div style="display: flex;width: 620px;margin: 20px auto 0" v-if="Mymessagerimg!=''">
                        <div style="width: 80px;height: 80px;margin-right: 15px" v-for="val in messageDetails.message.image">
                            <img :src="val" alt="" width="100%" height="100%">
                        </div>
                    </div>
                </div>
                <div style="width: 620px;margin: 20px auto 0;padding: 10px" v-for="val in messageDetails.leave_message" :style="{backgroundColor:val.service_name==null?'#16171c':'#efb300'}">
                    <span style="font-weight: bold;font-size: 16px" v-if="val.service_name!==null ">客服回覆:<br> </span>
                    <span style="font-weight: bold;font-size: 16px" v-if="val.service_name==null ">您的留言:<br> </span>
                    <p style="line-height: 30px" v-html="val.content"></p>
                    <div style="display: flex;width: 620px;margin: 20px auto 0" v-if="val.image!==''">
                        <div style="width: 80px;height: 80px;margin-right: 15px" v-for="item in val.image.split(',')" >
                            <img :src="item" alt="" width="100%" height="100%">
                        </div>
                    </div>
                </div>
                <div style="padding: 10px;display: flex;justify-content: center">
                    <el-button type="success">已解決</el-button>
                </div>
            </div>
        </el-dialog>
         <!--文件验证失败通知-->
        <el-dialog  :visible.sync="failNotice" width="600px" :close-on-click-modal="false" style="margin-top: 18vh">
            <span slot="title"  style="font-size: 20px ;color: #000;font-weight: bold"  >
                通知
            </span>
            <div style="padding: 10px 20px">
                <p style="font-size: 18px;line-height: 30px"> 親愛的會員您好， 您的{{failNoticetype}}因 <span style="color: #FE0000;font-weight:bold">{{reason}}</span>，導致驗證失敗，請修改後重新上傳驗證資料，謝謝您的配合。 <span v-show="reasonshow">身分驗證資料標準範本：</span></p>
                <a v-show="reasonshow" href="https://www.egopay.com.tw/dist/#/helpcenter?notice_id=121 " style="color: #5a7fef;text-decoration:underline">https://www.egopay.com.tw/dist/#/helpcenter?notice_id=121 </a>
            </div>
            <div style="padding: 10px;display: flex;flex-direction:row-reverse">
                <el-button type="success" @click="failNotice = false">離開</el-button>
            </div>
        </el-dialog>
        <!--新增支付宝弹出框-->
        <el-dialog  :visible.sync="popup.zhifubao" width="600px" class="pzhidubao" :close-on-click-modal="popup.modelon" @close="deletezfbdata">
            <span slot="title" >
                新增支付寶帳戶
            </span>
            <el-tabs type="border-card" v-loading="addalipayloading" >

                    <div class="zhifubao" >
                        <div class="zhifubao_input">
                            <span >真實姓名（簡體）</span>
                            <el-input size="mini"   placeholder="請輸入您支付宝帳戶簡體姓名" v-model="alipay_name" ></el-input>
                        </div>
                        <div class="zhifubao_input">
                            <span>支付寶帳戶</span>
                            <el-input  size="mini"  placeholder="請輸入您已實名的支付寶帳號" v-model="alipay_num" ></el-input>
                        </div>

                        <div class="zhifubao_sub">
                            <div>
                                <el-checkbox v-model="RTbook"></el-checkbox>
                                <a  style="color: #2F54EB" >我了解使用非本人支付寶帳戶風險，相關風險由個人承擔</a>
                            </div>
                            <el-button type="primary" size="mini"  @click="Addzfb" :disabled="!RTbook">確認並送出</el-button>
                            <!--<el-button type=" <el-checkbox v-model="isconfirm"danger"  @click="Addzfb">删除账户</el-button>-->
                        </div>
                    </div>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import COS  from 'cos-js-sdk-v5'
    import '../assets/css/style.css'
    import Common from './vues/Common'
    import Clipboard from 'clipboard';
    import qs from "qs";
    let rst=new Clipboard('.merber_num');
    const cos = new COS({
        getAuthorization: function (options, callback) {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "https://www.trillionricher.com/1.0/getaccout_cos",
                data: {
                    merber_id: Cookies.get('merber_id'),
                    token: Cookies.get('egopay_key'),
                },
                success: function (res) {
                    var credentials = res.credentials
                    callback({
                        TmpSecretId: credentials.tmpSecretId,
                        TmpSecretKey: credentials.tmpSecretKey,
                        XCosSecurityToken: credentials.sessionToken,
                        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                        StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
                        ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000900
                    });
                }
            })
        }
    })
    export default {
        data: function () {
            var up_phone = (rule, value, callback) => {
                const phoneReg = /^([0][9])\d{8}$/
                if (value === '') {
                    callback(new Error('請輸入手機號碼'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(+value)) {
                        callback(new Error('請輸入正確手機格式'))
                    } else {
                        if (phoneReg.test(value)) {
                            callback()
                        } else {
                            callback(new Error('請輸入正確手機格式'))
                        }
                    }
                }, 100)
            };
            var up_pwd=(rule, value, callback) => {
                const phoneReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{10,20}$/
                if (value === '') {
                    callback(new Error('請輸入新密碼'));
                }
                setTimeout(() => {
                    if (phoneReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('密碼必須由數位和字母組成且 10-20 位'))
                    }

                }, 100)
            };
            var up__pwd=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('請再次輸入新密碼'));
                }else if (value !== this.wjimimaform.merber_password) {
                    callback(new Error('兩次輸入密碼不一致!'));
                } else {
                    callback();
                }

            };
            var regidnum=(rule, value, callback) => {
                value = value.toUpperCase();
                var reg=/^[A-Z](1|2)\d{8}$/;  //身份證的正規表示式
                var city = [1,10,19,28,37,46,55,64,39,73,82,2,11,20,48,29,38,47,56,65,74,83,21, 3,12,30]

                if (value==="") {
                    return callback(new Error('身份證字號不能為空'))
                }else if(!reg.test( value )){
                    return callback(new Error('身分證字號格式错误'))
                }else {
                    setTimeout(() => {
                        value=value.split('');
                        var total = city[value[0].charCodeAt(0)-65];
                        for(var i=1; i<=8; i++){
                            total += eval(value[i]) * (9 - i);
                        }
                        total += eval(value[9]);
                        if((total%10 == 0 )){
                            callback()
                        }else {
                            callback(new Error('請輸入正確的身分證字號'))
                        }},100)
                }
            }
            var regdate=(rule, value, callback) => {

                if(rule.field=='year' || rule.field=='month' || rule.field=='day'){
                    if (value === '') {
                        callback(new Error('請選擇日期'));
                    }else {
                        callback()
                    }
                }else if(rule.field=='region'){
                    if (value === '') {
                        callback(new Error('請選擇發證地點'));
                    }else {
                        callback()
                    }
                }else if(rule.field=='identity_type'){
                    if (value === '') {
                        callback(new Error('請選擇領補換類型'));
                    }else {
                        callback()
                    }
                }
            };
            var reguname=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('請輸入暱稱'));
                }else {
                    callback()
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('請輸入當前密碼'));
                }else {
                    callback()
                }
            };
            var regpwd =(rule, value, callback) => {
                const phoneReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,20}$/
                if (value === '') {
                    callback(new Error('請輸入新密碼'));
                }
                setTimeout(() => {
                    if (phoneReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('密碼必須由數字和字母組成且6-12位'))
                    }
                }, 100)
            };
            var checkPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('請再次輸入密碼'));
                } else if (value !== this.ruleForm.merber_password) {
                    callback(new Error('兩次輸入密碼不壹致!'));
                } else {
                    callback();
                }}
            var regEmail = (rule, value, callback) => {
                const mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g
                if (value==='') {
                    return callback(new Error('郵箱不能為空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    }else {
                        callback(new Error('請輸入正確的E-mail'))
                    }
                },100)
            }
            var regEmailcode=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('驗證碼'));
                }else {
                    callback()
                }
            };
            var regPhone = (rule, value, callback) => {
                const phoneReg = /^([0][9])\d{8}$/
                if (value==="") {
                    return callback(new Error('電話號碼不能為空'))
                }
                setTimeout(() => {
                    if (!Number.isInteger(+value)) {
                        callback(new Error('請輸入數字值'))
                    } else {
                        if (phoneReg.test(value)) {
                            callback()
                        } else {
                            callback(new Error('電話號碼格式不正確'))
                        }
                    }
                }, 100)
            }
            var regphonecode=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('驗證碼'));
                }else {
                    callback()
                }
            }

            return {
                rulespwd: {
                    merber_password: [
                        { required: true, validator: regpwd, trigger: 'blur' }
                    ],
                    password: [
                        { required: true,validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        { required: true,validator: checkPass, trigger: 'blur'}
                    ],
                    merber_phcode:[
                        { required: true, validator: regEmailcode,trigger: 'blur' }
                    ]

                },//个人资料密码验证
                rulesmail: {
                    merber_email: [
                        { required: true, validator: regEmail, trigger: 'blur' }
                    ],
                    merber_phcode:[
                        { required: true, validator: regEmailcode,trigger: 'blur' }
                    ]

                },//个人资料邮箱验证
                rulesphone: {
                    merber_phone1:[
                        { required: true,validator: regPhone, trigger: 'blur' }
                    ],
                    merber_phcode1:[
                        { required: true, validator: regphonecode,trigger: 'blur' }
                    ]

                },//个人资料手机验证
                rulesuname:{
                    uname:[
                        { required: true,validator: reguname, trigger: 'blur' }
                    ],
                },//个人资料昵称验证
                upuserdata: '', //个人资料数据
                personal: {},//个人资料数据
                merber_nickname: Cookies.get('merber_nickname'),
                merber_id:Cookies.get('merber_id'),
                merber_name:Cookies.get('merber_name'),
                token:Cookies.get('egopay_key'),
                yzmdata:{
                    disabled:false,
                    btntext:'發送驗證碼',
                    time:'60'
                },
                //编辑个人资料
                ruleForm: {
                    uname:'',
                    currentpassword: '',
                    newpassword: '',
                    confirmpassword: '',
                    password: '',
                    merber_password: '',
                    checkPass: '',
                    merber_email: '',
                    merber_phone: '',
                    merber_phcode: '',
                    merber_phone1: '',
                    merber_phcode1: '',
                },
                identity_num: '',//身份认证——身份证号码
                birthDate: '',//身份认证——发放日期
                imageUrl1: '', //身份认证——正面图片预览地址
                imageUrl2: '',//身份认证——反面图片预览地址
                imageUrl3: '',//身份认证——反面图片预览地址
                identity_fronturl:'',//身份证正面上传地址
                identity_reverseurl:'',//身份证反面上传地址
                handheld_fronturl:'',//手持上传地址
                identity_frontfile:'',//身份证正面图片对象
                identity_reversefile:'',//身份证反面上传对象
                handheld_front:'',//手持对象
                fileimageUrl:'',//文件认证预览地址
                fileverifyfile:'',//文件认证图片上传地址
                identityReg:{
                    identity_num:[
                        { required: true,validator:regidnum, trigger: 'blur' }
                    ],
                    region:[
                        { required: true,validator:regdate,trigger: 'blur' }
                    ],
                    year:[{ required: true,validator:regdate, trigger: 'blur' }],
                    month:[{ required: true, validator:regdate,trigger: 'blur' }],
                    day:[{ required: true, validator:regdate,trigger: 'blur' }],
                    identity_type:[{ required: true,validator:regdate, trigger: 'blur' }]
                },//身份认证
                identitydata:{
                    identity_num:'',
                    year:94,
                    month:1,
                    day:1,
                    region:'',
                    identity_type: '',//身份认证——身份证类型
                },
                yearoptions:[94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120],
                Location:["北縣","宜縣","桃縣","竹縣","苗縣","中縣","彰縣","投縣","雲縣","嘉縣","南縣","高縣","屏縣","東縣","花縣","澎縣","基市","竹市","嘉市","連江","金門","北市","高市","新北市","中市","南市","桃市"],

                // 消息通知
                serviceloding:false,//新留言提交按钮loding
                anew_messageloding:false,//回复留言按钮loding
                Notice_Number:0,
                Notice_Number_show:false,
                messageimgfile:'',
                checkmessageimgfile:'',
                messageimgurl:'',
                checkmessageimgurl:'',

                fileverify_authentication:'',//文件验证当前状态
                authentication:'',//身份认证当前状态
                service:false,
                check_service:false,
                getmessage:false,


                messageDetails:{message:{},leave_message:{}},//查看留言
                New_news:false,//新消息弹出框
                servicetext:'',  //提交留言内容
                Unsolvedtext:'',//未解決留言内容
                dialogImageUrl: '',
                dialogVisible: false,
                filename:[],//提交留言选择的图片
                N_filename:[],//未解決选择的图片
                noticeheight:"none",
                Alltongzhi:[],
                liuyandata:'',
                Mymessager:[],//我的留言记录
                Mymessagerimg:[],//我的留言记录图片
                leave_message:[],//客服回复
                leave_messageimg:[],//kefu
                Unsolved:false,
                message_id:'',
                failNotice:false,//失败通知
                failNoticetype:'',//类型
                reason:'',//原因
                reasonshow:false,
                isclose:'',

                vipdata:'',//首页数据
                tongzhi_index:'',//首页通知内容
                popup: {
                    modelon: false,
                    bank: false,
                    zhifubao: false,
                    noticeAll: false,
                    noticeXq: false,
                    upDataUser: false,
                    userId: false,
                    userphone: false,
                    Avatar: false,
                    Fileupload: false,
                    Verification:false,
                    Address_TW:false,
                },//弹出框开关


                wjmmtext:false,
                isphone:false,//重置密码手机号输入框是否禁止
                forget_padbeld:true,//提交重置密码按钮是否禁止
                slideshow:false,//滑块验证切换开关
                Resetpwd:false,

                phone_code:'',//验证码
                msg: '',   //提示内容
                textcolor:'#46ce04', //提示文字颜色
                imgs:Common.imgs, //滑动图片
                dragverify:false, //登入验证弹出框

                wjimimarules:{
                    merber_phone:[
                        {validator:up_phone,trigger: 'blur'}
                    ],
                    merber_phcode:[
                        {
                            required: true,
                            message: '請輸入驗證碼',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 6,
                            message: '請輸入6位數的驗證碼',
                            trigger: 'blur'
                        },
                    ],
                    merber_password:[
                        {validator:up_pwd,trigger: 'blur'}
                    ],
                    merber__password:[
                        {validator:up__pwd,trigger: 'blur'}
                    ],
                },
                phcode:{
                    text:'發送驗證碼',
                    time:60,
                    bled:false,
                    yzmnum:3
                },//忘记密码——发送验证码，倒计时
                login:true,
                pwderror:false,

                email_phone:'',
                islogin:false,
                password:'',

                curHeight: '',
                key:'',
                imgindex:0,
                Popular:[
                ],
                imgList: [
                ],
                carbgcolor:{
                    background: "#EFEFEF",
                },

                wjmima:false,//重置密码开关
                wjmimatype:2,
                wjimimaform:{
                    merber_phone:'',//忘记密码——手机号
                    merber_password:'',//忘记密码——密码
                    merber__password:'',//忘记密码——确认密码
                    merber_phcode:'',//忘记密码——验证码
                },
                helpdata:'',
                //添加支付宝--------------------------------------Begin-----------
                alipay_name: '',//添加支付宝姓名
                RiskTakingBook:false,//同意书
                RTbook:false,//是否勾选
                alipay_num: '',//添加支付宝的账号
                alipay_numgs: '',//添加公司支付宝的账号
                addzfb_lx: '添加個人支付寶',//添加支付宝的类型。  空为个人支付宝，不为空为公司支付宝
                addalipayloading:false,


                viploading: false,//loading
                loading: false,//弹出框loading
                Fileuploadshow:false,//文件认证弹出框loading
                addidloading:false,//身份认证弹出框loading
                address_data:[],//收货地址
            }
        },
        components: {},
        methods: {
            Cope:function () {
              this.$message({
                showClose: true,
                message: '複製成功',
                type: 'success',
                center:true,
              })
            },
            //会员中心首页数据
            getvipindexdata: function () {
                var _this = this
                this.$axios.post('https://www.trillionricher.com/1.0/order_bank_alipay', {
                    merber_id:_this.merber_id,
                    token:_this.token
                }).then(function (res) {
                    res = res.data
                    if(res.data.success==-1){
                        _this.Logout()
                    }else if(res.success==1){
                        _this.vipdata = res.data

                        if(res.data.fileverify_authentication==0 || res.data.fileverify_authentication==3 || res.data.authentication==1 || res.data.authentication==4){
                            _this.popup.Verification=true
                        }
                        _this.viploading = false
                    }else {
                        _this.$message({
                            message: '未知錯誤，請刷新後嘗試',
                            type: 'error',
                            center: true
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            },
            //身份认证
            submitUpload: function () {
                var _this = this
                if(this.imageUrl1 == '' || this.imageUrl2 == '' || this.imageUrl3 == ''){
                    this.$message({
                        message: '請選擇身份證圖片',
                        type: 'error'
                    });
                }else {
                    this.$refs['identityReg'].validate((valid) => {
                        let timestamp = Date.parse(new Date());
                        let num = '';
                        for(var i=0;i<5;i++)
                        {
                            num+=Math.floor(Math.random()*10);
                        }
                        let sign = timestamp + num
                        if (valid) {
                            this.addidloading  = true

                            cos.putObject({
                                Bucket: 'trillionricher-1258896139',
                                Region: 'ap-tokyo',
                                Key:  'identity_front/'+'front'+sign,
                                StorageClass: 'STANDARD',
                                Body: _this.identity_frontfile, // 上传文件对象
                                onProgress: function(progressData) {
                                }
                            }, function(err, data1) {
                                if(data1.statusCode == 200){
                                    _this.identity_fronteurl = 'https://'+ data1.Location //正面上传腾讯返回地址
                                    cos.putObject({
                                        Bucket: 'trillionricher-1258896139',
                                        Region: 'ap-tokyo',
                                        Key:  'identity_reverse/'+'reverse'+sign,
                                        StorageClass: 'STANDARD',
                                        Body: _this.identity_reversefile, // 上传文件对象
                                        onProgress: function(progressData) {
                                        }
                                    }, function(err, data2) {
                                        if(data2.statusCode == 200){
                                            _this.identity_reverseurl = 'https://'+data2.Location  //手持上传腾讯云返回地址
                                            cos.putObject({
                                                Bucket: 'trillionricher-1258896139',
                                                Region: 'ap-tokyo',
                                                Key:  'identity_reverse/'+'handheld'+sign,
                                                StorageClass: 'STANDARD',
                                                Body: _this.handheld_front, // 上传文件对象
                                                onProgress: function(progressData) {
                                                }
                                            }, function(err, data3) {
                                                if(data3.statusCode == 200){
                                                    _this.handheld_fronturl = 'https://'+data3.Location  //反面上传腾讯云返回地址
                                                    setTimeout(function () {
                                                        _this.submitUploadid()
                                                    },500)
                                                }
                                            });
                                        }
                                    });
                                }
                            });

                        }else {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }
                    })
                }
            },
            //添加支付宝
            Addzfb() {
                var reszfbphone=/^0?(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/
                var reszfbmail=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,4}(\.[a-z]{2})?)/
                var res = /^\d{3}-\d{9}$/

                if (this.alipay_num == '') {
                    this.$message({
                        message: '您的支付寶帳號格式不對！',
                        type: 'error',
                        center: true
                    });
                    return false
                }
                if(this.vipdata.alipay.length>=10){
                    this.$message({
                        message: '新增支付寶已達上限，請刪除舊的再次新增。！',
                        type: 'error',
                        center: true
                    });
                    return false
                }
                this.addalipayloading = true
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/add_merber_alipay",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        alipay_num: this.alipay_num,
                        company_name: this.company_name,
                        alipay_name: this.alipay_name
                    },
                    success: (res) => {
                        this.addalipayloading = false
                        if(res.success==-1){
                            this.Logout()
                        }
                        if (res.success == 1) {

                            if(res.data.state==4){
                                this.$message({
                                    type: 'success',
                                    message: '認證成功!',
                                })
                                this.getvipindexdata()
                                this.popup.zhifubao = false
                            }
                            if(res.data.state==3){
                                this.$message({
                                    message: '認證失敗！',
                                    type: 'error',
                                })
                                this.alipay_num = ''
                                this.alipay_name = ''
                            }
                        }
                        if(res.success == 2){
                            this.$message({
                                message: '此支付寶賬號已存在！',
                                type: 'error',
                            })
                            this.alipay_num = ''
                            this.alipay_name = ''
                        }
                        if(res.success == -2){
                            this.$message({
                                message: res.msg,
                                type: 'error',
                            })
                            this.alipay_num = ''
                            this.alipay_name = ''
                        }
                    }
                })

            },

            submitUploadid(){
                var _this = this
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://www.trillionricher.com/1.0/add_identity/",
                    data: {
                        identity_front:_this.identity_fronteurl,
                        identity_reverse:this.identity_reverseurl,
                        identity_hand:this.handheld_fronturl,
                        merber_id:_this.merber_id,
                        token:_this.token,
                        identity_num:_this.identitydata.identity_num,
                        year:_this.identitydata.year,
                        month: _this.identitydata.month,
                        day: _this.identitydata.day,
                        identity_type: _this.identitydata.identity_type,
                        region:_this.identitydata.region
                    },
                    success: function (res) {
                        this.addidloading  = true
                        if(res.success==-1){
                            _this.Logout()
                        }else if (res.success == 1) {

                            _this.$message({
                                message: '您的身份認證資訊已成功提交，請等待審核',
                                type: 'success'
                            });
                            _this.popup.userId = false
                            _this.getvipindexdata();
                        }else if(res.success == 2){
                            _this.$message({
                                message: '您等身份認證已成功或正在審核中。 請等待',
                                type: 'error'
                            });
                        }

                    },

                });

            },
            //文件验证
            file_verify:function () {
                let _this = this
                if(this.fileimageUrl == ''){
                    this.$message({
                        message: '請選擇圖片',
                        type: 'error'
                    });
                }else {
                    let timestamp = Date.parse(new Date());
                    let num = '';
                    for (var i = 0; i < 5; i++) {
                        num += Math.floor(Math.random() * 10);
                    }
                    let sign = timestamp + num

                    this.Fileuploadshow = true
                    cos.putObject({
                        Bucket: 'trillionricher-1258896139',
                        Region: 'ap-tokyo',
                        Key: 'verifyfile/' + sign,
                        StorageClass: 'STANDARD',
                        Body: _this.fileverifyfile, // 上传文件对象
                        onProgress: function (progressData) {
                        }
                    }, function (err, data) {
                        if (data.statusCode == 200) {
                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "https://www.trillionricher.com/1.0/file_verify",
                                data: {
                                    merber_id: _this.merber_id,
                                    token: _this.token,
                                    image: "https://" + data.Location
                                },
                                success: function (res) {
                                    if (res.success == -1) {
                                        this.Logout()
                                    } else if (res.success == 1) {
                                        _this.$message({
                                            message: '您的防洗錢聲明文件已成功提交，請等待審核',
                                            type: 'success'
                                        });
                                        _this.imgfile = ''
                                        _this.imgurl = ''
                                        _this.popup.Fileupload = false
                                        _this.getvipindexdata()
                                    } else {
                                        _this.$message({
                                            message: '反洗錢檔上傳失敗，請聯絡客服人員',
                                            type: 'error'
                                        });
                                    }

                                },

                            });
                        }
                    })
                }
            },
            //用户资料修改
            updata_user: function () {
                if (this.upuserdata == 'uppwd') {
                    this.$refs['rulespwd'].validate((valid) => {
                        if (valid==false) {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }else {
                            this.submitpwd()
                        }
                    })
                } else if (this.upuserdata == 'upemail') {
                    this.$refs['rulesmail'].validate((valid) => {
                        if (valid) {
                            this.submitEmail()
                        }else {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }
                    })
                } else if (this.upuserdata == 'upphone') {
                    this.$refs['rulesphone'].validate((valid) => {
                        if (valid==false) {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }else {
                            this.submitPhone()
                        }
                    })
                }else if(this.upuserdata == 'upuname'){
                    this.$refs['rulesuname'].validate((valid) => {
                        if (valid) {
                            this.submitUname()
                        }else {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }
                    })
                }
            },
            //删除支付宝银行账户
            deletezfb_Bank: function (index, type) {
                var text=''
                if(type=='bank'){
                    text='您將删除此銀行帳戶, 是否繼續？'
                }else {
                    text='您將删除此支付寶帳戶, 是否繼續？'
                }
                this.$confirm(text, '提示', {
                    confirmButtonText: '刪除',
                    cancelButtonText: '不删除',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/del_bank_alipay",
                        dataType: "json",
                        data: {
                            merber_id: this.merber_id,
                            type_name: type,
                            num: index,
                            token:this.token
                        },
                        success: (res) => {
                            if(res.success==-1){
                                this.Logout()
                            }else if (res.success == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                })
                                this.getvipindexdata()
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '网络错误!',
                                })
                            }
                        }
                    })
                    this.getvipindexdata()
                }).catch((e) => {
                })

            },

            //新留言提交
            newsubmitUpload() {
                var _this = this
                this.servicetext=this.servicetext.replace(/\n|\r\n/g,"<br/>")
                if( this.servicetext==""){
                    this.$message({
                        type: 'error',
                        message: '內容不可空白!'
                    });
                }else {
                    if(this.messageimgurl != ''){
                        let timestamp = Date.parse(new Date());
                        let num = '';
                        for(var i=0;i<5;i++)
                        {
                            num+=Math.floor(Math.random()*10);
                        }
                        let sign = timestamp + num

                        cos.putObject({
                            Bucket: 'trillionricher-1258896139',
                            Region: 'ap-tokyo',
                            Key:  'message/'+'message'+sign,
                            StorageClass: 'STANDARD',
                            Body: _this.messageimgfile, // 上传文件对象
                            onProgress: function(progressData) {
                            }
                        }, function(err, data) {
                            $.ajax({
                                type: "POST",
                                url: "https://www.trillionricher.com/1.0/sub_message",
                                dataType:"json",
                                data: {
                                    image: 'https://'+data.Location,
                                    merber_id:_this.merber_id,
                                    token:_this.token,
                                    content:_this.servicetext
                                },
                                beforeSend:function(XMLHttpRequest){
                                    _this.serviceloding = true
                                },
                                success:(res)=>{
                                    _this.serviceloding = false
                                    if(res.success==1){
                                        _this.$message({
                                            type: 'success',
                                            message: '您的留言已發出，請等待客服回覆!'
                                        });
                                        _this.service=false
                                        _this.reload()
                                    }else {
                                        _this.$message({
                                            type: 'error',
                                            message: '網絡錯誤，請刷新後提交!'
                                        });
                                        _this.service=false
                                        _this.reload()
                                    }
                                }
                            })
                        })
                    }else {
                        $.ajax({
                            type: "POST",
                            url: "https://www.trillionricher.com/1.0/sub_message",
                            dataType:"json",
                            data: {
                                image: '',
                                merber_id:_this.merber_id,
                                token:_this.token,
                                content:_this.servicetext
                            },
                            beforeSend:function(XMLHttpRequest){
                                _this.serviceloding = true
                            },
                            success:(res)=>{
                                _this.serviceloding = false
                                if(res.success==1){
                                    _this.$message({
                                        type: 'success',
                                        message: '您的留言已發出，請等待客服回覆!'
                                    });
                                    _this.service=false
                                    _this.reload()
                                }else {
                                    _this.$message({
                                        type: 'error',
                                        message: '網絡錯誤，請刷新後提交!'
                                    });
                                    _this.service=false
                                    _this.reload()
                                }
                            }
                        })
                    }

                }

            },

            anew_message(){
                let _this = this
                this.Unsolvedtext=this.Unsolvedtext.replace(/\n|\r\n/g,"<br/>")
                if( this.Unsolvedtext==""){
                    this.$message({
                        type: 'error',
                        message: '內容不可空白!'
                    })
                }else {
                    _this.anew_messageloding = true
                    if(_this.checkmessageimgurl != ''){
                        let timestamp = Date.parse(new Date());
                        let num = '';
                        for(var i=0;i<5;i++)
                        {
                            num+=Math.floor(Math.random()*10);
                        }
                        let sign = timestamp + num
                        cos.putObject({
                            Bucket: 'trillionricher-1258896139',
                            Region: 'ap-tokyo',
                            Key:  'message/'+'repeatedlymsg'+sign,
                            StorageClass: 'STANDARD',
                            Body: _this.checkmessageimgfile, // 上传文件对象
                            onProgress: function(progressData) {
                            }
                        }, function(err, data) {
                            $.ajax({
                                type: "POST",
                                url: "https://www.trillionricher.com/1.0/anew_message",
                                dataType:"json",
                                data: {
                                    image: 'https://'+data.Location,
                                    content:_this.Unsolvedtext,
                                    message_id:_this.message_id
                                },
                                beforeSend:function(XMLHttpRequest){
                                    _this.anew_messageloding = true
                                },
                                success:(res)=>{
                                    _this.anew_messageloding = false
                                    if(res.success==1){
                                        _this.$message({
                                            type: 'success',
                                            message: '您的留言已發出，請等待客服回覆!'
                                        });
                                        _this.check_service=false
                                        _this.reload()
                                    }else {
                                        _this.$message({
                                            type: 'error',
                                            message: '網絡錯誤，請刷新後提交!'
                                        });
                                        _this.service=false
                                        _this.reload()
                                    }
                                }
                            })
                        })
                    }else {
                        $.ajax({
                            type: "POST",
                            url: "https://www.trillionricher.com/1.0/anew_message",
                            dataType:"json",
                            data: {
                                image: '',
                                content:_this.Unsolvedtext,
                                message_id:_this.message_id
                            },
                            beforeSend:function(XMLHttpRequest){
                                _this.anew_messageloding = true
                            },
                            success:(res)=>{
                                _this.anew_messageloding = false
                                if(res.success==1){
                                    _this.$message({
                                        type: 'success',
                                        message: '您的留言已發出，請等待客服回覆!'
                                    });
                                    _this.check_service=false
                                    _this.reload()
                                }else {
                                    _this.$message({
                                        type: 'error',
                                        message: '網絡錯誤，請刷新後提交!'
                                    });
                                    _this.service=false
                                    _this.reload()
                                }
                            }
                        })
                    }



                }
            },
            //已解決留言问题
            close_solve:function(){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/close_solve",
                    dataType:"json",
                    data:{message_id:this.message_id},
                    success:(res)=> {
                        if(res.success==1){
                            this.$message({
                                type: 'success',
                                message: '很高興幫到您，祝您購物愉快!'
                            });
                            Object.assign(this.$data, this.$options.data())
                        }
                    }
                })
            },
            //历史留言
            check_message:function(){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/check_message",
                    dataType:"json",
                    data:{
                        merber_id:this.merber_id,token:this.token},
                    success:(res)=> {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 2) {
                            this.check_service = true
                            this.Mymessager = res.data.message
                            this.Mymessagerimg = res.data.message.image.split(',')
                            this.leave_message = res.data.leave_message
                            this.isclose = res.data.message.state
                            this.message_id = res.data.message.message_id
                        }else{
                            this.service=true
                        }
                    }
                })

            },
            base64_file:function (dataurl, filename) {
                var arr = dataurl.split(","),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });

            },
            onchanges:function (type) {
                if(type==1){
                    var fileObj = document.getElementById("uploadimg").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(0)

                    if(!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.messageimgurl = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.messageimgfile = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.messageimgfile =  this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.messageimgfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }

                }else if(type==2){
                    var fileObj = document.getElementById("uploadimg2").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(0)


                    if(!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.checkmessageimgurl = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.checkmessageimgfile = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.checkmessageimgfile =  this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.checkmessageimgfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }
                }
            },
            //是否有新通知
            gettongzhi:function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/notification",
                    dataType:"json",
                    data: {merber_id:this.merber_id,token:this.token},
                    success:(res)=>{
                        if(res.success==-1){
                            this.Logout()
                        }else if(res.success==1){
                            this.Alltongzhi=res.data
                            var sum=0
                            for (var i=0;i<this.Alltongzhi.length;i++) {
                                if(this.Alltongzhi[i].is_receive==0){
                                    sum++
                                }
                            }
                            this.Notice_Number=sum
                        }
                    }
                })

            },
            //通知
            clicktz:function (id,type,is_receive,order_id,content) {
                // this.$router.push({path: '/vipindex'})
                var _this=this
                if(is_receive==0){
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/return_notification",
                        dataType:"json",
                        data: {notification_id:id},
                        success:(res)=>{
                            if(res.success==1){
                                this.gettongzhi()
                            }
                        }
                    })
                    if(type==1){
                        $.ajax({
                            type: "POST",
                            url: "https://www.trillionricher.com/1.0/get_message",
                            dataType:"json",
                            data: {message_id:order_id},
                            success:(res)=>{
                                if(res.success==1){
                                    if(res.data.message.state==2){
                                        this.New_news=false
                                        this.getmessage=true
                                        this.messageDetails=res.data
                                    }else {
                                        _this.check_message()
                                    }
                                }
                            }
                        })

                    }
                }
                if(type==1 ){
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/get_message",
                        dataType:"json",
                        data: {message_id:order_id},
                        success:(res)=>{
                            if(res.success==1){
                                if(res.data.message.state==2){
                                    this.New_news=false
                                    this.getmessage=true
                                    this.messageDetails=res.data
                                }else {
                                    _this.check_message()
                                }
                            }
                        }
                    })

                }else if(type==2 || type==3){
                    this.$router.push({
                        path:'/orderDetails',
                        query:{
                            id:order_id
                        }
                    });
                }else if(type==4){
                    if(this.authentication==2){
                        this.$message({
                            message: '身份認證中,請耐心等待',
                            type: 'warning'
                        });
                    }else if(this.authentication==3){
                        this.$message({
                            message: '身份認證已認證成功',
                            type: 'warning'
                        });
                    }else {
                        this.$emit('func',4)
                    }
                }else if(type==5){
                    if(this.fileverify_authentication==1){
                        this.$message({
                            message: '防洗錢檔案認證中,請耐心等待',
                            type: 'warning'
                        });
                    }else if(this.fileverify_authentication==2){
                        this.$message({
                            message: '防洗錢檔案已認證成功',
                            type: 'warning'
                        });
                    }else {
                        this.$emit('func',5)
                    }
                }else if(type==6){
                    this.New_news=false
                    this.check_message()
                }else if(type==71 || type==72 || type==73 || type==74 ||type==75){
                    this.failNotice=true
                    this.failNoticetype='身分驗證'
                    this.reasonshow=true
                    if(type==71){this.reason='基本資料填寫錯誤'}
                    if(type==72){this.reason='上傳圖檔為黑白或掃描檔'}
                    if(type==73){this.reason='上傳圖檔解析度過低或資料模糊'}
                    if(type==74){this.reason='上傳圖檔資料遭遮擋或因反光難以辨識'}
                    if(type==75){this.reason=content}
                }else if(type==81 || type==82 || type==83 || type==84 || type==85 || type==86){
                    this.failNotice=true
                    this.failNoticetype='防洗錢文件驗證'
                    this.reasonshow=false
                    if(type==81){this.reason='身分驗證尚未完成'}
                    if(type==82){this.reason='個人基本資料內容缺漏或錯誤'}
                    if(type==83){this.reason='簽名處非手寫簽名'}
                    if(type==84){this.reason='上傳圖檔解析度過低或模糊'}
                    if(type==85){this.reason='上傳圖檔無法正確顯示內容'}
                    if(type==86){this.reason=content}
                }
            },
            startRead:function(){
                if(this.imgurl.length<3){
                    var fileDom=document.getElementById('imgUpFile').files[0];
                    this.imgfile.push(fileDom)
                    this.imgurl.push(window.URL.createObjectURL(fileDom))
                }else {
                    this.$message({
                        message: '最多選擇三張圖片',
                        type: 'error'
                    });
                }
            },
            //登入滑动验证成功
            onSuccess(times){
                if(this.merber_id == undefined){
                    var _this = this
                    this.textcolor = "#46ce04"
                    this.msg = '驗證耗时'+(times / 1000).toFixed(1)+'s'
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/login",
                        dataType:"json",
                        data: {
                            email_phone:this.email_phone,
                            password:this.password,
                        },
                        success:(res)=>{
                            this.$refs.slideblock.reset();
                            if(res.success==1){

                                this.merber_name=res.data.merber_name;
                                this.dragverify = false
                                this.$message({
                                    message: '登入成功！',
                                    type: 'success',
                                    center:true
                                });

                                Cookies.set('merber_id', res.data.merber_id,{ expires: 1 });
                                Cookies.set('merber_email', res.data.merber_email,{ expires: 1 });
                                Cookies.set('merber_name',res.data.merber_name,{ expires: 1 });
                                Cookies.set('egopay_key',res.data.token,{ expires: 1 });
                                Cookies.set('merber_nickname',res.data.merber_nickname,{ expires: 1 });
                                Cookies.set('head_portrait',res.data.head_portrait,{ expires: 1 });
                                this.$store.commit('SET_MERBERNAME', res.data.merber_name)
                                this.$store.state.merber_id = res.data.merber_id
                                this.$store.state.token = res.data.egopay_key
                                this.$store.state.islogin = true
                                this.$store.state.recordshow = true


                                this.merber_id = res.data.merber_id
                                this.token = res.data.token
                                this.getvipindexdata()
                                this.personalData()
                                this.login = false
                            }else if(res.success==3){
                                this.msg = ""
                                this.wjmimatype = 1
                                this.dragverify = false
                                this.wjmima = true
                                this.wjimimaform.merber_phone = this.email_phone
                                this.isphone = true
                                this.wjmmtext = true
                            }else {
                                this.dragverify = false
                                this.msg = ''
                                this.pwderror = true
                                this.$message.error('賬號或密碼錯誤');
                            }
                        }
                    })
                }else {
                    var url = ""
                    if(this.upuserdata == "upphone"){
                        url = "https://www.trillionricher.com/1.0/get_sms_code/"
                    } else {
                        url = "https://www.trillionricher.com/1.0/forget_pad_code/"

                    }
                    var _this = this
                    this.textcolor = "#46ce04"
                    this.msg = '驗證耗时'+(times / 1000).toFixed(1)+'s'

                    $.ajax({
                        type: "POST",
                        url: url,
                        dataType:"json",
                        data: {merber_phone:this.getyzmphone},
                        success:(res)=>{
                            this.dragverify = false
                            this.msg = ''
                            this.$refs.slideblock.reset();
                            if(res.success==2){
                                this.$message.error('此手機號已註冊');
                                this.ruleForm.merber_phone1 = ""
                            }else if(res.success==1){
                                this.yzmdata.disabled=true
                                this.yzmdata.time=60
                                this.yzm_timer()
                                this.$message({
                                    message: '驗證碼已發送！',
                                    type: 'success',
                                    center: true
                                });
                            }
                        }
                    })
                }

            },
            //登入滑动验证失败
            onFail(){
                this.textcolor = "#f56c6c"
                this.msg = '驗證未通過，請從新認證!'
            },
            //登入滑动图片刷新
            onRefresh(){
                this.msg = ''
            },
            //登入检查为非人为操作回调
            onAgain() {
                console.log('检测到非人为操作的哦！');
                this.msg = 'try again';
                // 刷新
                this.$refs.slideblock.reset();
            },

            //重置密码滑动验证成功
            onSuccesssliResetpwd(times){
                this.textcolor = "#46ce04"
                this.msg = '驗證耗时'+(times / 1000).toFixed(1)+'s'
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/forget_pad_code",
                    dataType:"json",
                    data: {merber_phone:this.wjimimaform.merber_phone},
                    success:(res)=>{
                        if(res.success==1){
                            this.forget_padbeld = false
                            this.$message({
                                message: '驗證碼已發送！',
                                type: 'success',
                                center:true
                            });
                            this.msg = ''
                            this.phcode.timie=60;
                            this.phcode.bled =true
                            this.slideshow = false
                            this.phcodetimer()
                        }else if(res.success==2){
                            this.forget_padbeld = false

                            this.$message({
                                message: '此手機號未註冊！',
                                type: 'error',
                                center:true
                            });
                            this.msg = ''
                            this.phcode.timie=60;
                            this.phcode.bled =true
                            this.slideshow = false
                            this.phcodetimer()
                        } else {
                            this.$message.error('發送失敗，請刷新後重試');
                        }
                    }
                })

            },
            //重置密码滑动验证失败
            onFailsliResetpwd(){
                this.textcolor = "#f56c6c"
                this.msg = '驗證未通過，請從新認證!'
            },
            //重置密码滑动图片刷新
            onRefreshsliResetpwd(){
                this.msg = ''
            },
            //重置密码检查为非人为操作回调
            onAgainsliResetpwd() {
                console.log('检测到非人为操作的哦！');
                this.msg = 'try again';
                // 刷新
                this.$refs.slideblock.reset();
            },
            gohelplist:function (id) {
                this.$router.push('/helpcenter?notice_id='+id);
            },
            //登出
            dengchu(e) {
                var _this = this
                this.$confirm('您將退出易支付，是否繼續？', '提示', {
                    confirmButtonText: '確定',
                    cancelButtonText: '我再看看',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '登出成功!'
                    });
                    _this.$router.push('/');
                    this.$store.state.islogin = false
                    Cookies.remove('merber_id','',{ path: '' });
                    Cookies.remove('merber_name','',{ path: '' });
                    Cookies.remove('egopay_key','',{ path: '' });
                    Cookies.remove('merber_nickname','',{ path: '' });
                    Cookies.remove('head_portrait','',{ path: '' });
                    location.reload();
                }).catch((e)=>{

                })
            },
            goservice:function(type){
                if(this.login == true){
                    this.$message.error('您尚未登入！');
                }else{
                    if(type == 4){
                        this.$router.push({path: '/daichu'})
                    }else{
                        this.$router.push({path: '/SubStitute'})
                    }
                }

            },
            govipindex:function(id){
                if(id == 1){
                    this.$router.push({path: '/record'})
                }
                if(id == 2){
                    this.$router.push({path: '/vipindex'})
                }
                if(id == 3){
                    this.$router.push({path: '/helpcenter'})
                }
                if(id == 4){
                    this.$router.push({path: '/Register'})
                }
            },
            //登入验证
            doLogin:function(){
                Cookies.remove('merber_id','',{ path: '' });
                Cookies.remove('merber_name','',{ path: '' });
                Cookies.remove('egopay_key','',{ path: '' });
                Cookies.remove('merber_nickname','',{ path: '' });
                Cookies.remove('head_portrait','',{ path: '' });
                var reg=/^([0][9])\d{8}$/
                if(!reg.test(this.email_phone)){
                    this.$message.error('帳號請輸入正確手機號碼');
                }else {
                    this.dragverify = true
                }

            },
            carfun:function () {
                if(this.imgindex<3){
                    this.imgindex+=1
                }else {
                    this.imgindex=1
                }
            },
            gopagelist:function (q) {
                this.$router.push({
                    path:'/pageList',
                    query:{
                        key:q
                    }
                });
            },
            resetForm:function() {
                this.$refs['wjimimarules'].resetFields()
            },
            //提交修改密码
            forget_pad:function () {
                if(this.wjmimatype == 1){
                    this.$refs['wjimimarules'].validate((valid) => {
                        if (valid) {
                            this.forget_padbeld = true
                            $.ajax({
                                type: "POST",
                                url: "https://www.egopay.com.tw/1.0/renewal_user",
                                dataType:"json",
                                data: this.wjimimaform,
                                success:(res)=>{
                                    // this.$refs.sliResetpwd.reset();
                                    this.forget_padbeld = false
                                    this.msg = ""
                                    if(res.success==1){
                                        this.$message({
                                            message: '密碼已經重置，請用新密碼登入！',
                                            type: 'success',
                                            center:true
                                        });
                                        this.wjmima=false
                                        this.$refs['wjimimarules'].resetFields()
                                    }else if(res.success==2){
                                        this.$message({
                                            message: '驗證碼已過期！',
                                            type: 'error',
                                            center:true
                                        });
                                        this.textcolor = "#f56c6c"
                                        this.msg = "您的驗證碼已過期!"
                                    }else if(res.success==3){
                                        if(this.phcode.yzmnum <=1){
                                            this.wjmima = false
                                            this.$message({
                                                message: '請核對您的手機號碼！',
                                                type: 'error',
                                                center:true
                                            });
                                            this.msg = ''
                                            this.$refs['wjimimarules'].resetFields()
                                        }else {
                                            this.phcode.yzmnum--
                                            this.wjimimaform.merber_phcode = ""
                                            this.textcolor = "#f56c6c"
                                            this.msg = "驗證碼錯誤，您還有"+this.phcode.yzmnum+"次機會"
                                            this.$refs.wjimimarules.validateField('merber_phcode', (phoneError) => {
                                            })
                                        }

                                    }else if(res.success==4){
                                        this.$message({
                                            message: '手機號不存在！',
                                            type: 'error',
                                            center:true
                                        });
                                    }else {
                                        this.$message.error('發送失敗，請刷新後重試');
                                    }
                                }
                            })
                        } else {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }
                    });
                }else {
                    this.$refs['wjimimarules'].validate((valid) => {
                        if (valid) {
                            this.forget_padbeld = true
                            $.ajax({
                                type: "POST",
                                url: "https://www.trillionricher.com/1.0/forget_pad/",
                                dataType:"json",
                                data: this.wjimimaform,
                                success:(res)=>{
                                    this.forget_padbeld = false
                                    this.$refs.slideblock.reset();
                                    this.msg = ""
                                    if(res.success==1){
                                        this.$message({
                                            message: '密碼已經重置，請用新密碼登入！',
                                            type: 'success',
                                            center:true
                                        });
                                        this.wjmima=false
                                        this.$refs['wjimimarules'].resetFields()
                                    }else if(res.success==2){
                                        this.$message({
                                            message: '驗證碼已過期！',
                                            type: 'error',
                                            center:true
                                        });
                                        this.textcolor = "#f56c6c"
                                        this.msg = "您的验证码已过期"
                                    }else if(res.success==3){
                                        if(this.phcode.yzmnum <=1){
                                            this.wjmima = false
                                            this.$message({
                                                message: '请核对您的手机号码！',
                                                type: 'error',
                                                center:true
                                            });
                                            this.msg = ''
                                            this.$refs['wjimimarules'].resetFields()
                                        }else {
                                            this.phcode.yzmnum--
                                            this.wjimimaform.merber_phcode = ""
                                            this.textcolor = "#f56c6c"
                                            this.msg = "验证码错误，您还有"+this.phcode.yzmnum+"次机会"
                                            this.$refs.wjimimarules.validateField('merber_phcode', (phoneError) => {
                                            })
                                        }

                                    }else if(res.success==4){
                                        this.$message({
                                            message: '手機號不存在！',
                                            type: 'error',
                                            center:true
                                        });
                                    }else {
                                        this.$message.error('發送失敗，請刷新後重試');
                                    }
                                }
                            })
                        } else {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }
                    });
                }



            },
            //发送验证码
            forget_pad_code:function () {
                this.slideshow = true
            },
            phcodetimer:function () {
                this.phcode.bled   = true
                if (this.phcode.time > 0) {
                    this.phcode.time--;
                    this.phcode.text=this.phcode.time+"s後重新獲取";
                    setTimeout(this.phcodetimer, 1000);
                } else{
                    this.phcode.time = 0;
                    this.phcode.text = "獲取驗證碼";
                    this.phcode.bled = false;
                }
            },
            gethomedata:function(){
                var _this = this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/home",
                    dataType:"json",
                    success:(res)=>{

                        if(res.success == 1){
                            _this.imgList = res.data.banana
                            _this.helpdata = res.data.notice
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
                            if(res.data[0].switch==1){
                                this.gonggao = true
                                this.gonggaohtmnl = res.data[0].content
                            }
                        }

                    }
                })
            },
            //修改资料发送验证码
            updataphoneyzm:function(){
                this.$refs.rulesphone.validateField('merber_phone1', (phoneError) => {
                    if(!phoneError){
                        this.dragverify = true
                        this.getyzmphone = this.ruleForm.merber_phone1

                    }
                })
            },
            //验证码60秒倒计时
            yzm_timer:function(){
                if (this.yzmdata.time > 0) {
                    this.yzmdata.time--;
                    this.yzmdata.btntext=this.yzmdata.time+"s後重新獲取";
                    setTimeout(this.yzm_timer, 1000);
                } else{
                    this.yzmdata.time=0;
                    this.yzmdata.btntext="發送驗證碼";
                    this.yzmdata.disabled=false;
                }
            },
            //加载个人资料
            personalData: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/personal_data",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.personal = res.data;
                            this.getyzmphone = res.data.merber_phone

                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                })
            },
            //修改密码
            submitpwd: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/up_pwd",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        merber_password: this.ruleForm.password,
                        merber_up_password: this.ruleForm.merber_password,
                        merber_phcode:this.ruleForm.merber_phcode
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.$message({
                                message: '密碼修改成功！',
                                type: 'success',
                                center: true
                            });
                            this.popup.upDataUser = false;
                            this.$refs['rulespwd'].resetFields()
                        } else {
                            this.$message.error("舊密碼錯誤");
                        }
                    }
                })
            },
            //修改邮箱
            submitEmail: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/up_email",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        merber_email: this.ruleForm.merber_email,
                        merber_phone: this.personal.merber_phone,
                        merber_phcode: this.ruleForm.merber_phcode
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.$message({
                                message: '郵箱修改成功！',
                                type: 'success',
                                center: true
                            });
                            this.popup.upDataUser = false;
                            Cookies.set('merber_email', this.ruleForm.merber_email,{ expires: 1 });
                            this.$refs['rulesmail'].resetFields()
                        } else if(res.success == 0){
                            this.$message.error("此E-mail已註冊");
                        }
                    }
                })

            },
            //修改手机
            submitPhone: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/up_ph",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        merber_phone: this.ruleForm.merber_phone1,
                        merber_phcode: this.ruleForm.merber_phcode1
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.$message({
                                message: '手机號碼修改成功！',
                                type: 'success',
                                center: true
                            });
                            this.popup.upDataUser = false;
                            this.$refs['rulesphone'].resetFields()
                        } else if(res.success == 2) {
                            this.$message({
                                message: '驗證碼已過期！',
                                type: 'error',
                                center: true
                            });
                        }else if(res.success == 3){
                            this.$message({
                                message: '驗證碼錯誤！',
                                type: 'error',
                                center: true
                            });
                        }else if(res.success == 6){
                            this.$message({
                                message: '此手機號已綁定！',
                                type: 'error',
                                center: true
                            });

                        }
                    }
                })

            },
            //修改昵称
            submitUname: function () {
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/up_personal/",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        merber_nickname:this.ruleForm.uname
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.$message({
                                message: '暱稱修改成功！',
                                type: 'success',
                                center: true
                            });
                            Cookies.set('merber_nickname',this.ruleForm.uname,{ expires: 7 });
                            this.popup.upDataUser = false;
                            this.$refs['rulesuname'].resetFields()
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                })

            },
            deletezfbdata: function () {
                Object.assign(this.$data, this.$options.data())
                this.getvipindexdata()
                this.personalData()
            },
            //图片预览地址转base64并压缩
            onchange: function (index) {

                if (index == 1) {
                    var fileObj = document.getElementById("identity_front").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)
                    if(!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.imageUrl1 = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.identity_frontfile = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.identity_frontfile =  this.base64_file(res.base64,fileObj.name)
                                console.log(this.identity_frontfile);
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.identity_frontfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }
                } else if (index == 2) {
                    var fileObj = document.getElementById("identity_reverse").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)
                    if(!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.imageUrl2 = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize <1024){
                            this.identity_reversefile = fileObj
                        } else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.identity_reversefile = this.base64_file(res.base64,fileObj.name)
                                console.log(this.identity_reversefile);
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.identity_reversefile = this.base64_file(res.base64,fileObj.name)
                            })
                        }


                    }

                } else if (index == 3) {
                    var fileObj = document.getElementById("bank_front").files[0];
                    this.imageUrl3 = window.URL.createObjectURL(fileObj) //转base64
                } else if (index == 4) {
                    var fileObj = document.getElementById("bank_reverse").files[0];
                    this.imageUrl4 = window.URL.createObjectURL(fileObj) //转base64
                } else if (index == 5) {
                    var fileObj = document.getElementById("Avatarimg").files[0];
                    this.Avatarimgurl = window.URL.createObjectURL(fileObj) //转base64
                }else if(index == 6){
                    var fileObj = document.getElementById("imgUpFile").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)
                    if(!/\.(jpg|png|JPG|PNG|HEIC)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.fileimageUrl = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.fileverifyfile = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.fileverifyfile =  this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.fileverifyfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }
                } else if (index == 7) {
                    var fileObj = document.getElementById("handheld_front").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)
                    if(!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.imageUrl3 = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.handheld_front = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.handheld_front =  this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.handheld_front = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }
                }
            },
            getsite(){
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/merber_site",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.address_data = res.data
                        }
                    }
                })


                this.$axios.post('https://www.trillionricher.com/1.0/merber_site',qs.stringify({
                    merber_id:this.$store.state.merber_id,
                    token:this.$store.state.token,
                })).then(function (res) {
                    if(res.data.success == 1) {
                        _this.tableData = res.data.data
                    }
                })
                  .catch(function (error) {
                      console.log(error);
                  });
            }
        },
        computed: {

        },
        watch: {},
        created:function(){
            var _this = this
            if(this.$store.state.merber_id != undefined){
                this.getvipindexdata()
                this.gettongzhi()
                this.personalData()
                this.getsite()
                window.setInterval(() => {
                    setTimeout(_this.gettongzhi(), 0)
                },30000)
            }
        },
        mounted: function () {

        }
    }
</script>
