<template>
    <div >
        <Header></Header>
        <div style="width: 1000px;margin: 0 auto">
            <img :src="storedata.goods_image" alt="" width="100%">
        </div>
        <div style="width: 1000px;margin: 0 auto;">
            <br>
            <h2 id="goumai" style="text-align: center"> 我要購買 </h2>
            <div class="Specifications">
                <ul>
                    <li v-for="(item,index) in storedata.specification">
                        <span>{{storedata.goods_name}}   </span>
                        <span>{{item.specification_explain}}   </span>
                        <span>$ {{item.specification_twd}} <span style="font-size: 8px">TWD</span></span>
                        <!--<el-input-number v-model="item.num" :min="1" :max="10" label="描述文字" size="mini" @change="Totalchange" ></el-input-number>-->
                        <el-button type="primary" icon="iconfont el-icon-al-weibiaoti--" @click="Addtocart(item)">选购 </el-button>
                    </li>
                </ul>
            </div>
            <h2 style="text-align: center;margin: 50px 0 20px 0">目前我已選購</h2>
            <div>
                <div v-if="Cartdata.length==0" style="line-height: 100px;color: #c9c9c9;text-align: center">您还没有选购商品哦 ^-^</div>
                <table v-else style="text-align: center"  rules=none cellspacing=0  >
                    <tbody>
                        <tr style="background-color: #dff0d8;height: 50px">
                            <th width="100"></th>
                            <th width="300">规格</th>
                            <th width="200">單價</th>
                            <th width="200">數量</th>
                            <th width="200">總計</th>
                        </tr>
                        <tr style="height: 50px" v-for="(item,index) in Cartdata">
                            <td style="text-align: center"><i class="iconfont el-icon-al-error iconhover" style="cursor: pointer" @click="delCart(index)"></i></td>
                            <td>{{item.specification_explain}}</td>
                            <td>${{item.specification_twd}}</td>
                            <td><el-input-number v-model="item.quantity" :min="1" :max="10" label="描述文字" size="mini" @change="Totalchange" ></el-input-number></td>
                            <td ref="getnum">{{item.specification_twd*item.quantity}}</td>
                        </tr>
                        <br>
                        <tr style="text-align: right;border-top: 1px solid #E7E7E7;height: 50px">
                            <td width="800" colspan="4"><span style="font-weight: bold">運費</span></td>
                            <td width="200" style="text-align: center"><span style="color: #FE0000;"> 滿100包郵</span></td>
                        </tr>
                        <tr style="text-align: right;border-top: 1px solid #E7E7E7;height: 50px">
                            <td width="800" colspan="4"><span style="font-weight: bold">總計</span></td>
                            <td width="200" style="text-align: center">{{Total_twd}}</td>
                        </tr>
                    </tbody>
                </table>
                <div  id="jiezhang" style="text-align: center;margin-bottom: 50px"><el-button type="danger" style="width: 1000px;height: 50px;font-size: 18px;font-weight: bold" @click="isjiezhang">立即結帳</el-button></div>
            </div>
        </div>
        <div style="position: fixed;right: 20px;bottom: 120px;font-size: 14px;color: #fff" >
            <div style="height: 60px;width: 60px;background-color:#5d7eff;border-radius: 50%;box-sizing:border-box;padding: 8px 14px">
                <a href="#goumai" style="color:#fff;font-weight: bold;font-size: 16px;">我要 <br> 購買</a>
            </div>
            <div style="height: 60px;width: 60px;margin-top:20px;background-color:#ff3f44;border-radius: 50%;box-sizing:border-box;padding: 8px 14px">
                <a href="#jiezhang" style="color:#fff;font-weight: bold;font-size: 16px;">我要 <br> 結帳</a>
            </div>
            <!--<div style="height: 60px;width: 60px;background-color:#F35B5B;border-radius: 50% ">-->
                <!--<a href="" style="color:#fff;font-weight: bold;font-size: 16px;">我要 <br> 購買</a>-->
            <!--</div>-->
        </div>
        <el-dialog  :visible.sync="jiezhang" width="800px" :close-on-click-modal="false" class="Avatardialog" style="margin-top: 5vh">
            <!--<span slot="title" style="text-align: center">-->
                <!--請選擇付款方式-->
            <!--</span>-->
            <div>
                <div  class="fukuan" >
                    <h2 style="margin-bottom: 20px;display: flex;align-items: center">請選擇地址 <a href="">新增</a></h2>
                    <el-radio v-model="radioaddress"   style="display: flex;align-items: center;font-size: 14px;margin-left: 0" v-for="item in sitedata" :label="item.site_id">
                        <div style="font-size: 14px">
                            <span>{{item.city}}</span>
                            <span>{{item.country}}</span>
                            <span>{{item.road}}</span>
                            <span>{{item.address}}</span>
                        </div>
                        <span style="width: 70px;height: 20px; background-color: #efef96;border-radius: 15px;text-align: center;font-size: 14px;line-height: 20px;margin-left: 100px" v-if="item.default_address==1">预设</span>
                    </el-radio>
                    <h2 style="margin: 20px 0;display: flex;align-items: center">請選擇付款方式</h2>
                    <h5 style="margin-bottom: 20px">網路ATM/ATM櫃機</h5>
                    <!--<el-radio v-model="radioBank" label="1" style="display: flex;align-items: center;margin-bottom: 20px" >-->
                    <!--<img src="../assets/image/ysyh.jpg" alt="" style="width: 60px;height:60px;margin-right: 20px">-->
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
                    <el-radio v-model="radioBank" label="2" style="display: flex;align-items: center;margin-bottom: 20px"  >
                        <div class="chaoshang" style="margin-right: 20px">
                            <img src="../assets/image/711-icon.png" alt="">
                            <img src="../assets/image/ok-icon.png" alt="">
                            <img src="../assets/image/familymart-icon.png" alt="">
                            <img src="../assets/image/hilife-icon.png" alt="">
                        </div>
                        <div style="font-size: 14px">
                            <p>7-11/全家/萊爾富/OK超商 <span style="color:#f90 ">收取 <span> 30元 </span>的手續費，不足30臺幣按30臺幣收取</span></p>
                            <p style="color: #ed3f14">使用超商付款不能超過5970元新台幣</p>
                            <p>繳費代碼在送出訂單後將傳送至您的手機</p>
                        </div>
                    </el-radio>
                    <el-button type="success" style="width: 100%;height: 50px;font-size: 18px;font-weight: bold" @click="create_store">確認並送出</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog class="login" :visible.sync="dialogFormVisible" title="登入易支付" :close-on-click-modal='false' >
            <ul style="padding: 10px">
                <li>
                    <span>帳號:</span>
                    <el-input   placeholder="請輸入手機號碼" v-model="email_phone"></el-input>
                </li>
                <li>
                    <span>密碼:</span>
                    <el-input   placeholder="請輸入登入密碼" v-model="password" type="password"  @keyup.enter.native="doLogin"></el-input>
                </li>
                <li>
                    <el-checkbox v-model="islogin">30天免登入</el-checkbox>
                    <a @click="wjmima=true" style="cursor: pointer">忘記密碼?</a>
                </li>
                <li><el-button type="success" @click.enter="doLogin" >登入</el-button></li>
                <li >
                    <el-button type="primary" @click="goregister" >註冊新會員</el-button>
                </li>
            </ul>
        </el-dialog>
        <el-dialog  :visible.sync="wjmima" title="重置密碼" style="width: 1200px;margin: 0 auto" :close-on-click-modal='false'>
            <el-form :model="wjimimaform" status-icon :rules="wjimimarules" ref="wjimimarules" label-width="100px" class="demo-ruleForm" >
                <ul class="wjmima">
                    <li>
                        <el-form-item label="手機號碼" prop="merber_phone"  >
                            <el-input type="text" v-model="wjimimaform.merber_phone" autocomplete="off" style="width: 320px;"></el-input>
                            <el-button type="primary" @click="forget_pad_code" :disabled="phcode.bled">{{phcode.text}}</el-button>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="驗證碼" prop="merber_phcode" >
                            <el-input type="text" v-model="wjimimaform.merber_phcode" autocomplete="off" style="width: 320px;"></el-input>
                        </el-form-item>
                    </li>
                    <li style="margin-top: 15px;display: flex;align-items: center">
                        <el-form-item label="新密碼" prop="merber_password" >
                            <el-input type="password" v-model="wjimimaform.merber_password" autocomplete="off" style="width: 320px;"></el-input>
                        </el-form-item>
                    </li>
                    <li style="display: flex;align-items: center">
                        <el-form-item label="再次輸入" prop="merber__password" >
                            <el-input type="password" v-model="wjimimaform.merber__password" autocomplete="off" style="width: 320px;"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item style="padding: 10px 20px">
                            <el-button type="primary" @click="resetForm">重置</el-button>
                            <el-button type="success" @click.enter="forget_pad" >確定送出</el-button>
                        </el-form-item>
                    </li>
                </ul>
            </el-form>
        </el-dialog>
        <!--&lt;!&ndash;新增地址弹出框&ndash;&gt;-->
        <el-dialog  :visible.sync="Address_TW" width="800px"  :close-on-click-modal="false" >
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                新增臺灣收件地址
            </span>
            <div style="padding: 15px">
                <el-checkbox v-model="isdefault" size="medium" border>設為預定地址</el-checkbox>
                <div style="margin-top: 30px;">
                    <el-input placeholder="请输入收件人" v-model="Addressee" style="width: 300px;">
                        <template slot="prepend">收件人</template>
                    </el-input>
                    <br>
                    <br>
                    <el-input placeholder="请输入手機號" v-model="Addphone" style="width: 300px">
                        <template slot="prepend">手機號</template>
                    </el-input>
                    <br><br>
                    <el-input placeholder="请输入身份證" v-model="Address_card" style="width: 300px">
                        <template slot="prepend">身份證</template>
                    </el-input>
                </div>

                <div style="margin-top: 30px">
                    <el-select v-model="City_county" placeholder="請選擇市/縣"  filterable style="width: 200px" @change="citychange" @focus="cityfocus">
                        <el-option
                                v-for="item in C_cuyoptions"
                                :key="item.country"
                                :label="item.country"
                                :value="item.country">
                        </el-option>
                    </el-select>
                    市/縣
                    <el-select v-model="District_Town" placeholder="請選擇區/鎮"  filterable style="width: 200px" @change="dtownchange" @focus="dtownfocus">
                        <el-option
                                v-for="item in D_townoptions"
                                :key="item.country"
                                :label="item.country"
                                :value="item.country">
                        </el-option>
                    </el-select>
                    區/鎮
                    <el-select v-model="Street" placeholder="請選擇路/街道" filterable style="width: 200px">
                        <el-option
                                v-for="item in Streetoptions"
                                :key="item.road"
                                :label="item.road"
                                :value="item.road">
                        </el-option>
                    </el-select>
                    路/街道
                </div>

                <div style="margin-top: 30px">
                    詳細地址
                    <el-input
                            type="textarea"
                            placeholder="請輸入詳細地址"
                            v-model="Detailedaddress"
                            maxlength="50"
                            show-word-limit
                    >
                    </el-input>
                </div>
                <div style="display: flex;flex-direction:row-reverse;margin-top:10px" >
                    <el-button type="primary" @click="add_site">送出驗證</el-button>
                </div>
            </div>
        </el-dialog>
        <div v-html="chaoshang" style="opacity: 0"></div>
        <Loading v-show="loading"></Loading>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import Header from './vues/Header'
    import Footer from './vues/Footer'
    import Loading from './vues/loading';
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
                const phoneReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,20}$/
                if (value === '') {
                    callback(new Error('請輸入新密碼'));
                }
                setTimeout(() => {
                    if (phoneReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('密碼必須由數位和字母組成且 6-20 位'))
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

            }
            return {
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
                merber_id: Cookies.get('merber_id'),
                token: Cookies.get('egopay_key'),
                jiezhang:false,
                storedata:{},
                Cartdata:[],
                Total_twd:0,
                Total_rmb:0,
                radioBank:'',
                chaoshang:'',
                loading:false,
                dialogFormVisible:false,
                email_phone:'',
                password:'',
                islogin:true,

                wjmima:false,
                phcode:{
                    text:'發送驗證碼',
                    time:60,
                    bled:false,
                },//忘记密码——发送验证码，倒计时
                wjimimaform:{
                    merber_phone:'',//忘记密码——手机号
                    merber_password:'',//忘记密码——密码
                    merber__password:'',//忘记密码——确认密码
                    merber_phcode:'',//忘记密码——验证码
                },
                sitedata:[],
                radioaddress:"",

                Address_TW:false,
                isdefault:true,//新增地址是否设为默认地址
                Addressee:'',//收件人
                Addphone:'',//收件人手机号
                City_county:'',//市县
                District_Town:'',//区镇
                Street:'',//街道
                Detailedaddress:'',//详细地址
                C_cuyoptions:[
                    {country: '金門縣',},
                    {country: '宜蘭縣',},
                    {country: '新竹縣',},
                    {country: '苗栗縣',},
                    {country: '彰化縣',},
                    {country: '南投縣',},
                    {country: '雲林縣',},
                    {country: '嘉義縣',},
                    {country: '屏東縣',},
                    {country: '臺東縣',},
                    {country: '花蓮縣',},
                    {country: '澎湖縣',},
                    {country: '基隆市',},
                    {country: '新竹市',},
                    {country: '嘉義市',},
                    {country: '臺北市',},
                    {country: '高雄市',},
                    {country: '新北市',},
                    {country: '臺中市',},
                    {country: '臺南市',},
                    {country: '桃園市',}
                ],        //市县选项
                D_townoptions:[],//区镇选项
                Streetoptions:[],//街道选项
                add_sitetype:false,
                site_id:'',
                Address_card:''
            }
        },
        components: {
            Header,
            Footer,
            Loading
        },
        methods: {
            //-------------------------------
            citychange:function(val){
                var _this=this
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://www.egopay.com.tw/1.0/gain_site",
                    data: {
                        city:val
                    },
                    success: function (res) {
                        _this.D_townoptions=res.data
                        _this.$forceUpdate()
                    },

                });
            },
            dtownchange:function(val){
                var _this=this
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://www.egopay.com.tw/1.0/gain_site",
                    data: {
                        city:this.City_county,
                        country:val
                    },
                    success: function (res) {
                        _this.Streetoptions=res.data
                        _this.$forceUpdate()
                    },

                });
            },
            cityfocus:function(){
                this.D_townoptions=[]
                this.Streetoptions=[]
                this.District_Town=''
                this.Street=''

            },
            dtownfocus:function(){
                this.Streetoptions=[]
                this.Street=''
            },
            add_site:function(){
                var _this=this
                if(this.Addressee==''){
                    this.$message({
                        type: 'error',
                        message: '請填寫收件人!',
                    })
                }else if(this.Addphone=='' || !/^([0][9])\d{8}$/.test(this.Addphone)){
                    this.$message({
                        type: 'error',
                        message: '請填寫正確的手機號!',
                    })
                }else if(!/^[A-Z](1|2)\d{8}$/.test(this.Address_card)){
                    this.$message({
                        type: 'error',
                        message: '請填寫正確的身分證字號!',
                    })
                }else if(this.City_county=='' || this.District_Town=='' || this.Street=='' || this.Detailedaddress==''){
                    this.$message({
                        type: 'error',
                        message: '請填寫地址!',
                    })
                }else {
                    if (this.add_sitetype == false) {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "https://www.egopay.com.tw/1.0/add_site",
                            data: {
                                merber_id: this.merber_id,
                                city: this.City_county,
                                country: this.District_Town,
                                road: this.Street,
                                address: this.Detailedaddress,
                                default_address: this.isdefault ? 1 : '',
                                token: this.token,
                                recipients: this.Addressee,
                                recipients_phone: this.Addphone,
                                identity_num:this.Address_card

                            },
                            success: function (res) {
                                console.log(res);
                                if (res.success == 1) {
                                    _this.$message({
                                        type: 'success',
                                        message: '地址添加成功!',
                                    })
                                    _this.Address_TW = false
                                    _this.isjiezhang()
                                }
                            },

                        });
                    } else {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "https://www.egopay.com.tw/1.0/edit_site",
                            data: {
                                merber_id: this.merber_id,
                                city: this.City_county,
                                country: this.District_Town,
                                road: this.Street,
                                address: this.Detailedaddress,
                                default_address: this.isdefault ? 1 : '',
                                token: this.token,
                                recipients: this.Addressee,
                                recipients_phone: this.Addphone,
                                site_id:this.site_id

                            },
                            success: function (res) {
                                console.log(res);
                                if (res.success == 1) {
                                    _this.$message({
                                        type: 'success',
                                        message: '地址修改成功!',
                                    })
                                    _this.popup.Address_TW = false
                                    Object.assign(_this.$data, _this.$options.data())
                                    _this.getvipindexdata()
                                }
                            },

                        });
                    }
                }

            },
            //------------------------------
            isjiezhang:function(){
              if(this.Cartdata.length==0){
                  this.$message({
                      message: '您還未選購任何商品哦~',
                      type: 'warning'
                  });
              }else {
                  if(this.merber_id==undefined){
                      this.dialogFormVisible = true;
                  }else {
                      $.ajax({
                          type: "POST",
                          url: "https://www.egopay.com.tw/1.0/merber_site",
                          data:{
                              merber_id:this.merber_id,
                          },
                          dataType: "json",
                          success: (res) => {
                              if (res.success == 1) {
                                  this.sitedata=res.data
                                  this.jiezhang=true
                              }else if (res.success == 0){
                                  this.Address_TW=true
                              }
                          }
                      })
                  }
              }

            },
            goregister:function(){
                this.$router.push({path: '/register'})
            },
            resetForm:function() {
                this.$refs['wjimimarules'].resetFields()
            },
            forget_pad:function () {
                this.$refs['wjimimarules'].validate((valid) => {
                    if (valid) {
                        $.ajax({
                            type: "POST",
                            url: "https://www.egopay.com.tw/1.0/forget_pad/",
                            dataType:"json",
                            data: this.wjimimaform,
                            success:(res)=>{
                                if(res.success==1){
                                    this.$message({
                                        message: '密碼已經重置，請用新密碼登入！',
                                        type: 'success',
                                        center:true
                                    });
                                    this.wjmima=false
                                    this.dialogFormVisible = true
                                    this.$refs['wjimimarules'].resetFields()
                                }else if(res.success==2 || res.success==3){
                                    this.$message({
                                        message: '驗證碼已過期或錯誤！',
                                        type: 'error',
                                        center:true
                                    });
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
            },
            //发手机验证码
            forget_pad_code:function () {
                if(this.merber_phone==''){
                    this.$message.error('手機號不能為空！');
                }else {
                    $.ajax({
                        type: "POST",
                        url: "https://www.egopay.com.tw/1.0/forget_pad_code",
                        dataType:"json",
                        data: {merber_phone:this.wjimimaform.merber_phone},
                        success:(res)=>{
                            if(res.success==1){
                                this.$message({
                                    message: '驗證碼已發送！',
                                    type: 'success',
                                    center:true
                                });
                                this.phcode.time=60;
                                this.phcode.bled=true
                                this.phcodetimer()
                            }else {
                                this.$message.error('發送失敗，請刷新後重試');
                            }
                        }
                    })
                }
            },
            phcodetimer:function () {
                if (this.phcode.time > 0) {
                    this.phcode.time--;
                    this.phcode.text=this.phcode.time+"s後重新獲取";
                    setTimeout(this.phcodetimer, 1000);
                } else{
                    this.phcode.time=0;
                    this.phcode.text="獲取驗證碼";
                    this.phcode.bled=false;
                }
            },
            doLogin:function(){
                var reg=/^([0][9])\d{8}$/
                if(!reg.test(this.email_phone)){
                    this.$message.error('帳號請輸入正確手機號碼');
                }else {
                    $.ajax({
                        type: "POST",
                        url: "https://www.egopay.com.tw/1.0/login",
                        dataType:"json",
                        data: {
                            email_phone:this.email_phone,
                            password:this.password,
                            aging:this.islogin?30:1
                        },
                        success:(res)=>{
                            if(res.success==1){
                                this.dialogFormVisible = false;
                                this.$message({
                                    message: '登入成功！',
                                    type: 'success',
                                    center:true
                                });
                                this.merber_id=res.data.merber_id
                                // this.create_store()
                                if(this.islogin==true){
                                    Cookies.set('merber_id', res.data.merber_id,{ expires: 7 });
                                    Cookies.set('merber_name',res.data.merber_name,{ expires: 7 });
                                    Cookies.set('egopay_key',res.data.token,{ expires: 7 });
                                    Cookies.set('merber_nickname',res.data. merber_nickname,{ expires: 7 });
                                    Cookies.set('head_portrait',res.data.head_portrait,{ expires: 7 });
                                }else {
                                    Cookies.set('merber_id', res.data.merber_id,{ expires: 1 });
                                    Cookies.set('merber_name',res.data.merber_name,{ expires: 1 });
                                    Cookies.set('egopay_key',res.data.token,{ expires: 1 });
                                    Cookies.set('merber_nickname',res.data.merber_nickname,{ expires: 1 });
                                    Cookies.set('head_portrait',res.data.head_portrait,{ expires: 1 });
                                }
                            }else {
                                this.$message.error('登入失敗，請檢查帳戶或密碼');
                            }
                        }
                    })
                }

            },

            getdata:function () {
                var id=this.$route.query.id
                if(id==undefined){
                    this.$router.push({path: '/vipindex'})
                }else {
                    $.ajax({
                        type: "POST",
                        url: "https://www.egopay.com.tw/1.0/get_store",
                        data:{goods_id:id},
                        dataType: "json",
                        success: (res) => {
                            if (res.success == 1) {
                                this.storedata=res.data
                                console.log(typeof res.data.specification[0].specification_rmb);
                            }
                        }
                    })
                }
            },
            Addtocart:function (data) {
                if(data.quantity==undefined){
                    data.quantity=1
                }
                this.Cartdata.push(data)
            },
            delCart:function(index){
                this.Cartdata.splice(index,1);
            },
            Totalchange:function () {
                this.Total_twd=0
                this.Total_rmb=0
                for(var i=0;i<this.Cartdata.length;i++){
                   this.Total_twd+=this.Cartdata[i].specification_twd*this.Cartdata[i].quantity
                   this.Total_rmb+=Number(this.Cartdata[i].specification_rmb)*Number(this.Cartdata[i].quantity)
                }
                console.log(this.Total_twd);
                console.log(this.Total_rmb);
            },
              create_store:function () {
                this.jiezhang=false
                var id=this.$route.query.id
                    this.loading=true
                    $.ajax({
                        type: "POST",
                        url: "https://www.egopay.com.tw/1.0/create_store",
                        data:{
                            merber_id:this.merber_id,
                            token:this.token,
                            goods_id:id,
                            payment_method:this.radioBank,
                            specification:this.Cartdata,
                            order_rmb:this.Total_rmb,
                            order_twd:this.Total_twd,
                            site_id:this.radioaddress
                        },
                        dataType: "json",
                        success: (res) => {
                            if (res.success == 1) {
                                if(this.radioBank==2){
                                    this.loading=true
                                    this.chaoshang=res.data
                                    window.setTimeout(function () {
                                        document.getElementById("__ecpayForm").submit();
                                    },1000)
                                }else {
                                    this.loading=false
                                    this.$router.push({
                                        path:'/orderDetails_cmy',
                                        query:{
                                            id:res.data.order_id
                                        }
                                    });

                                }
                            }
                        }
                    })
            }
        },
        computed: {},
        watch: {
            Cartdata:function(val){
                this.Total_rmb=0
                this.Total_twd=0
                for(var i=0;i<val.length;i++){
                  this.Total_twd+=this.Cartdata[i].specification_twd*this.Cartdata[i].quantity
                  this.Total_rmb+=this.Cartdata[i].specification_rmb*this.Cartdata[i].quantity
              }
            },

        },
        mounted: function () {
            this.getdata()
        }
    }
</script>
<style>
    .Specifications ul li{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
