<template>
    <div class="index">
	
		
        <div class="index_top" >
		 <img src="../assets/image/banner@3x.png" alt="" style="width:700px;border-radius: 20px;
    box-shadow: 2px 2px 10px #555;" >
		<div class="indexlogin">
            <div class="content ">
                <div class="login">
                    <IndexLogin></IndexLogin>
                </div>

            
            </div>
          
        </div>
             
<!--            <div class="Carousel ">-->
<!--                <el-carousel arrow="never" height="600px" :interval="5000" @change="carfun">-->
<!--                    <el-carousel-item v-for="item in imgList" :key="item">-->
<!--                        <img :src="item" alt="">-->
<!--                    </el-carousel-item>-->
<!--                </el-carousel>-->
<!--            </div>-->
        </div>
		
        <div style="position: relative;top: 0px;">
            <div class="tongzhi">
                <div>
                    <img src="../assets/image/img/xiaoxitz.png" alt="">
                    <span>{{ tongzhi_index }}</span>
                </div>
            </div>
        </div>

        <div class="index_service">
            <div class="content">
                <h2>支持各種平台  滿足您的需求</h2>
                <p>正陸續接入更多平台</p>
                <div class="service">
                    <div>
                        <img src="../assets/image/taobao.png" alt="">
                        <h2>淘寶</h2>
                        <el-button @click="goservice(1)" :disabled="issubstitutebled">{{ isalipay }}</el-button>
                    </div>
                    <div>
                        <img src="../assets/image/tmall.png" alt="">
                        <h2>天貓</h2>
                        <el-button  @click="goservice(1)" :disabled="issubstitutebled">{{ isalipay }}
                        </el-button>
                    </div>
<!--                    <div>-->
<!--                        <img src="../assets/image/xianyu.png" alt="">-->
<!--                        <h2>闲鱼</h2>-->
<!--                        <el-button  @click="goservice(1)" :disabled="issubstitutebled">{{ isalipay }}-->
<!--                        </el-button>-->
<!--                    </div>-->
                    <div>
                        <img src="../assets/image/1688.png" alt="">
                        <h2>阿里巴巴</h2>
                        <el-button  @click="goservice(1)" :disabled="issubstitutebled">{{ isalipay }}
                        </el-button>
                    </div>
                    <div>
                        <img src="../assets/image/alipay.png" alt="">
                        <h2>支付寶</h2>
                        <el-button  @click="goservice(2)" :disabled="isalipaybled">{{ issubstitute }}
                        </el-button>
                    </div>
                    <!--                    <div>-->
                    <!--                        <img src="../assets/image/995297.png" alt="">-->
                    <!--                        <h2 @click="jytest">集運</h2>-->
                    <!--                        <el-button type="warning"  @click="goservice(3)" :disabled="true">即將開放</el-button>-->
                    <!--                    </div>-->
                </div>
            </div>
            <!--            <div class="content">-->
            <!--                <div class="service">-->
            <!--                    <div>-->
            <!--                        <img src="../assets/image/douyu.png" alt="">-->
            <!--                        <h2>陸版鬥魚</h2>-->
            <!--                        <el-button type="warning"  @click="goservice(5)" disabled>充值</el-button>-->
            <!--                    </div>-->
            <!--                    <div>-->
            <!--                        <img src="../assets/image/huyalogo.png" alt="">-->
            <!--                        <h2>陸版虎牙</h2>-->
            <!--                        <el-button type="warning"  @click="goservice(6)"  disabled>充值</el-button>-->
            <!--                    </div>-->
            <!--                    <div>-->
            <!--                        <img src="../assets/image/douyinl.png" alt="">-->
            <!--                        <h2>陸版抖音</h2>-->
            <!--                        <el-button type="warning" @click="goservice(7)" disabled>充值</el-button>-->
            <!--                    </div>-->
            <!--                    <div>-->
            <!--                        <img src="../assets/image/kuaishou.png" alt="">-->
            <!--                        <h2>陸版快手</h2>-->
            <!--                        <el-button type="warning" @click="goservice(8)" disabled>充值</el-button>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>
        
        
        <Record v-if="this.$store.state.islogin"></Record>
        
        <!--会员公告-->
        <div class="notice content">
            <div class="nr_top">
                <div>
                    <span><b>會員公告</b></span>
                </div>
                <el-button type="text" size="small" @click="popup.noticeAll = true" >查看全部
                    <!-- <i class="iconfont el-icon-al-caidanzhankai"></i> -->
                </el-button>
            </div>
            <div class="notice_body">
                <div class="tz_item" v-for="(val,i) in vipnotice" :key="i" v-if='i<=5'
                     @click="gonggaoxq(val.notice_id)">
                    <span>{{ val.title }}</span>
                    <span style="font-size: 12px">{{ val.create_time|convTime }}</span>
                </div>
            </div>
        </div>
        <!--会员公告（更多）弹出框-->
        <el-dialog :visible.sync="popup.noticeAll" width="50%" :close-on-click-modal="popup.modelon" id="notice_list_win">
            <span slot="title">
                會員公告
            </span>
            <div style="max-height: 500px;overflow:auto;" element-loading-background="rgba(255, 255, 255, 0.9)">
                <div style="padding: 10px;border-bottom: 1px solid #E7E7E7;display: flex;justify-content: space-between"
                     v-for="(val,index) in vipnotice" :key="index" @click="gonggaoxq(val.notice_id)">
                    <span style="cursor: pointer">{{ val.title }}</span>
                    <span>{{ val.create_time|convTime }}</span>
                </div>
            </div>
        </el-dialog>
        <!--会员公告详情弹出框-->
        <el-dialog :visible.sync="popup.noticeXq" width="800px" :close-on-click-modal="popup.modelon" id="notice_window">
            <span slot="title">
                會員公告
            </span>
            <div class="notice_xq">
                <div class="notice_xq"
                     element-loading-background="rgba(255, 255, 255, 0.9)">
                    <div class="notice_xq_title">
                        <h2>{{ vipnoticedata.title }}</h2>
                        <p>{{ vipnoticedata.create_time | convTimehms }}</p>
                    </div>
                    <div class="notice_xq_body" v-html="vipnoticedata.content">
                    </div>
                    <div class="notice_xq_out">
                        <el-button type="primary" @click="popup.noticeXq=false">離開</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="wjmima" title="重置密碼" style="margin: 0 auto" :close-on-click-modal='false'
                   width="500px">
            <div style="padding: 10px 0">
                <div style="color: red;text-align: center;padding: 10px;font-size: 14px" v-show="wjmmtext">
                    親愛的用戶您好，為提升安全性，請重新修改密碼(英數組合10-20位)。
                </div>
                
                <el-form :model="wjimimaform" status-icon :rules="wjimimarules" ref="wjimimarules" label-width="100px"
                         class="demo-ruleForm" style="padding: 10px 30px 0 10px" v-show="!slideshow">
                    <ul class="wjmima">
                        <li>
                            <el-form-item label="手機號碼" prop="merber_phone">
                                
                                <el-input type="text" v-model="wjimimaform.merber_phone" :disabled="isphone"
                                          autocomplete="off" style="width: 200px"></el-input>
                            
                            </el-form-item>
                        </li>
                        <li>
                            <el-form-item label="驗證碼" prop="merber_phcode">
                                <div style="display: flex;justify-content: space-between">
                                    <el-input type="Number" maxlength="6" v-model="wjimimaform.merber_phcode"
                                              autocomplete="off" style="width: 200px"></el-input>
                                    <el-button type="primary" @click="forget_pad_code" :disabled="phcode.bled">
                                        {{ phcode.text }}
                                    </el-button>
                                </div>
                            </el-form-item>
                        </li>
                        <li>
                            <el-form-item label="新密碼" prop="merber_password">
                                <el-input type="password" v-model="wjimimaform.merber_password"
                                          autocomplete="new-password"></el-input>
                            </el-form-item>
                        </li>
                        <li>
                            <el-form-item label="再次輸入" prop="merber__password">
                                <el-input type="password" v-model="wjimimaform.merber__password"
                                          autocomplete="new-password"></el-input>
                            </el-form-item>
                        </li>
                        <li>
                            <el-form-item style="margin-bottom: 0">
                                <el-button type="primary" @click="resetForm">重置</el-button>
                                <el-button type="success" @click.enter="forget_pad" :disabled="forget_padbeld">確定送出
                                </el-button>
                            </el-form-item>
                        </li>
                    </ul>
                </el-form>
                <div style="padding: 30px 10px 0 10px;font-size: 18px;font-weight: bold;margin: 0 auto"
                     v-show="slideshow">
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
                <div class="slide-verify" :style="{color:textcolor}">{{ msg }}</div>
            </div>
        </el-dialog>
        <!--登入滑块认证-->
        <el-dialog
          :visible.sync="dragverify"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          style="margin-top: 20vh;"
          width="400px"
        >
            <span slot="title">
                    <i class="iconfont el-icon-al-guanyu"></i>
                    請進行認證
            </span>
            <div style="padding: 20px 10px;font-size: 18px;font-weight: bold;margin: 0 auto">
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
                <div class="slide-verify" :style="{color:textcolor}">{{ msg }}</div>
            </div>
        </el-dialog>
        <el-dialog
          :visible.sync="gonggao"
          :close-on-press-escape="false"
          width="600px"
        >
            <span slot="title">
                    公告
            </span>
            <div class="tongzhistyle" v-html="gonggaohtmnl">
            
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import '../assets/css/style.css'
import Record from './Record'
import Common from './vues/Common'
import IndexLogin from './index_login'

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
        var up_pwd = (rule, value, callback) => {
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
        var up__pwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('請再次輸入新密碼'));
            } else if (value !== this.wjimimaform.merber_password) {
                callback(new Error('兩次輸入密碼不一致!'));
            } else {
                callback();
            }
            
        }
        return {
            isalipay: '立即申請',
            issubstitute: '立即申請',
            vipdata: '',//首页数据
            tongzhi_index: '',//首页通知内容
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
                Verification: false,
                Address_TW: false,
            },//弹出框开关
            vipnotice: '',//会员公告
            vipnoticedata: '',//会员公告详情
            gonggao: false,
            gonggaohtmnl: '',
            wjmmtext: false,
            isphone: false,//重置密码手机号输入框是否禁止
            forget_padbeld: true,//提交重置密码按钮是否禁止
            slideshow: false,//滑块验证切换开关
            Resetpwd: false,
            
            
            phone_code: '',//验证码
            msg: '',   //提示内容
            textcolor: '#46ce04', //提示文字颜色
            imgs: Common.imgs, //滑动图片
            dragverify: false, //登入验证弹出框
            
            wjimimarules: {
                merber_phone: [
                    {validator: up_phone, trigger: 'blur'}
                ],
                merber_phcode: [
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
                merber_password: [
                    {validator: up_pwd, trigger: 'blur'}
                ],
                merber__password: [
                    {validator: up__pwd, trigger: 'blur'}
                ],
            },
            phcode: {
                text: '發送驗證碼',
                time: 60,
                bled: false,
                yzmnum: 3
            },//忘记密码——发送验证码，倒计时
            login: true,
            pwderror: false,
            merber_id: Cookies.get('merber_id'),
            merber_name: Cookies.get('merber_name'),
            token: Cookies.get('egopay_key'),
            email_phone: '',
            islogin: false,
            password: '',
            
            curHeight: '',
            key: '',
            imgindex: 0,
            Popular: [],
            imgList: [],
            carbgcolor: {
                background: "#EFEFEF",
            },
            
            wjmima: false,//重置密码开关
            wjmimatype: 2,
            wjimimaform: {
                merber_phone: '',//忘记密码——手机号
                merber_password: '',//忘记密码——密码
                merber__password: '',//忘记密码——确认密码
                merber_phcode: '',//忘记密码——验证码
            },
            helpdata: '',
            issubstitutebled: false,
            isalipaybled: false,
            jynum: 0,
        }
    },
    components: {
        Record,
        IndexLogin
    },
    methods: {
        jytest() {
            if (this.jynum == 10) {
                this.goservice(3)
                this.jynum++
            } else {
                this.jynum++
            }
            
        },
        //会员中心首页数据
        getvipindexdata: function () {
            var _this = this
            this.$axios.post('https://www.trillionricher.com/1.0/order_bank_alipay', {
                merber_id: _this.merber_id,
                token: _this.token
            }).then(function (res) {
                res = res.data
                if (res.data.success == -1) {
                    _this.Logout()
                } else if (res.success == 1) {
                    _this.vipdata = res.data
                    if (res.data.fileverify_authentication == 0 || res.data.fileverify_authentication == 3 || res.data.authentication == 1 || res.data.authentication == 4) {
                        _this.popup.Verification = true
                    }
                    _this.viploading = false
                } else {
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
        //公告
        getviptongzhi: function () {
            var _this = this
            this.$axios.post('https://www.trillionricher.com/1.0/inform', {
                page: 1
            }).then(function (res) {
                if (res.data.success == 1) {
                    _this.tongzhi_index = res.data.data[0].content
                }
            }).catch(function (error) {
                console.log(error);
            });
            
        },
        //会员中心公告
        getvipnotice: function () {
            var _this = this
            this.$axios.post('https://www.trillionricher.com/1.0/notice', {
                page: 1
            }).then(function (res) {
                if (res.data.success == 1) {
                    _this.vipnotice = res.data.data
                }
            }).catch(function (error) {
                console.log(error);
            });
            // $.ajax({
            //     type: "POST",
            //     url: "https://www.trillionricher.com/1.0/notice",
            //     dataType: "json",
            //     data: {page: 1},
            //     success: (res) => {
            //         if (res.success == 1) {
            //             this.vipnotice = res.data
            //         }
            //     }
            // })
        },
        // 查看公告详情
        gonggaoxq: function (id) {
            var _this = this
            this.popup.noticeXq = true
            this.$axios.post('https://www.trillionricher.com/1.0/notice_details', {
                notice_id: id
            }).then(function (res) {
                if (res.data.success == 1) {
                    _this.vipnoticedata = res.data.data[0]
                }
            }).catch(function (error) {
                console.log(error);
            });
            
        },
        //删除支付宝银行账户
        deletezfb_Bank: function (index, type) {
            var text = ''
            if (type == 'bank') {
                text = '您將删除此銀行帳戶, 是否繼續？'
            } else {
                text = '您將删除此支付寶帳戶, 是否繼續？'
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
                        token: this.token
                    },
                    success: (res) => {
                        if (res.success == -1) {
                            this.Logout()
                        } else if (res.success == 1) {
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
        
        
        //登入滑动验证成功
        onSuccess(times) {
            var _this = this
            this.textcolor = "#46ce04"
            this.msg = '驗證耗时' + (times / 1000).toFixed(1) + 's'
            $.ajax({
                type: "POST",
                url: "https://www.trillionricher.com/1.0/login",
                dataType: "json",
                data: {
                    email_phone: this.email_phone,
                    password: this.password,
                },
                success: (res) => {
                    this.$refs.slideblock.reset();
                    if (res.success == 1) {
                        
                        this.merber_name = res.data.merber_name;
                        this.dragverify = false
                        this.$message({
                            message: '登入成功！',
                            type: 'success',
                            center: true
                        });
                        
                        Cookies.set('merber_id', res.data.merber_id, {expires: 1});
                        Cookies.set('merber_email', res.data.merber_email, {expires: 1});
                        Cookies.set('merber_name', res.data.merber_name, {expires: 1});
                        Cookies.set('egopay_key', res.data.token, {expires: 1});
                        Cookies.set('merber_nickname', res.data.merber_nickname, {expires: 1});
                        Cookies.set('head_portrait', res.data.head_portrait, {expires: 1});
                        this.merber_id = res.data.merber_id
                        this.token = res.data.token
                        this.getvipindexdata()
                        this.login = false
                    } else if (res.success == 3) {
                        this.msg = ""
                        this.wjmimatype = 1
                        this.dragverify = false
                        this.wjmima = true
                        this.wjimimaform.merber_phone = this.email_phone
                        this.isphone = true
                        this.wjmmtext = true
                    } else {
                        this.dragverify = false
                        this.msg = ''
                        this.pwderror = true
                        this.$message.error('賬號或密碼錯誤');
                    }
                }
            })
        },
        //登入滑动验证失败
        onFail() {
            this.textcolor = "#f56c6c"
            this.msg = '驗證未通過，請從新認證!'
        },
        //登入滑动图片刷新
        onRefresh() {
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
        onSuccesssliResetpwd(times) {
            this.textcolor = "#46ce04"
            this.msg = '驗證耗时' + (times / 1000).toFixed(1) + 's'
            $.ajax({
                type: "POST",
                url: "https://www.trillionricher.com/1.0/forget_pad_code",
                dataType: "json",
                data: {merber_phone: this.wjimimaform.merber_phone},
                success: (res) => {
                    if (res.success == 1) {
                        this.forget_padbeld = false
                        this.$message({
                            message: '驗證碼已發送！',
                            type: 'success',
                            center: true
                        });
                        this.msg = ''
                        this.phcode.timie = 60;
                        this.phcode.bled = true
                        this.slideshow = false
                        this.phcodetimer()
                    } else if (res.success == 2) {
                        this.forget_padbeld = false
                        
                        this.$message({
                            message: '此手機號未註冊！',
                            type: 'error',
                            center: true
                        });
                        this.msg = ''
                        this.phcode.timie = 60;
                        this.phcode.bled = true
                        this.slideshow = false
                        this.phcodetimer()
                    } else {
                        this.$message.error('發送失敗，請刷新後重試');
                    }
                }
            })
            
        },
        //重置密码滑动验证失败
        onFailsliResetpwd() {
            this.textcolor = "#f56c6c"
            this.msg = '驗證未通過，請從新認證!'
        },
        //重置密码滑动图片刷新
        onRefreshsliResetpwd() {
            this.msg = ''
        },
        //重置密码检查为非人为操作回调
        onAgainsliResetpwd() {
            console.log('检测到非人为操作的哦！');
            this.msg = 'try again';
            // 刷新
            this.$refs.slideblock.reset();
        },
        
        
        gohelplist: function (id) {
            this.$router.push('/helpcenter?notice_id=' + id);
        },
        //登出
        dengchu(e) {
            this.$confirm('您將退出，是否繼續？', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '我再看看',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '登出成功!'
                });
                this.$router.push('/');
                this.login = true
                Cookies.remove('merber_id', '', {path: ''});
                Cookies.remove('merber_name', '', {path: ''});
                Cookies.remove('egopay_key', '', {path: ''});
                Cookies.remove('merber_nickname', '', {path: ''});
                Cookies.remove('head_portrait', '', {path: ''});
            }).catch((e) => {
            
            })
        },
        goservice: function (type) {
            //if (this.$store.state.islogin == false) {
             //   this.$message.error('您尚未登入！');
            //    return false
          //  }
            
            if (type == 1) {
                this.$router.push({path: '/SubStitute'})
            }
            if (type == 2) {
                this.$router.push({path: '/daichu'})
            }
            if (type == 3) {
                let routeUrl = this.$router.resolve({
                    path: "/index_c",
                });
                window.open(routeUrl.href, '_blank');
            }
            if (type > 5) {
                this.$router.push({
                    path: '/Platform_r',
                    query: {
                        type: type
                    }
                });
                return false
            }
        },
        govipindex: function (id) {
            if (id == 1) {
                this.$router.push({path: '/record'})
            }
            if (id == 2) {
                this.$router.push({path: '/vipindex'})
            }
            if (id == 3) {
                this.$router.push({path: '/helpcenter'})
            }
            if (id == 4) {
                this.$router.push({path: '/Register'})
            }
        },
        //登入验证
        doLogin: function () {
            Cookies.remove('merber_id', '', {path: ''});
            Cookies.remove('merber_name', '', {path: ''});
            Cookies.remove('egopay_key', '', {path: ''});
            Cookies.remove('merber_nickname', '', {path: ''});
            Cookies.remove('head_portrait', '', {path: ''});
            var reg = /^([0][9])\d{8}$/
            if (!reg.test(this.email_phone)) {
                this.$message.error('帳號請輸入正確手機號碼');
            } else {
                this.dragverify = true
            }
            
        },
        carfun: function () {
            if (this.imgindex < 3) {
                this.imgindex += 1
            } else {
                this.imgindex = 1
            }
        },
        gopagelist: function (q) {
            this.$router.push({
                path: '/pageList',
                query: {
                    key: q
                }
            });
        },
        resetForm: function () {
            this.$refs['wjimimarules'].resetFields()
        },
        //提交修改密码
        forget_pad: function () {
            if (this.wjmimatype == 1) {
                this.$refs['wjimimarules'].validate((valid) => {
                    if (valid) {
                        this.forget_padbeld = true
                        $.ajax({
                            type: "POST",
                            url: "https://www.egopay.com.tw/Kv4I1llx6/renewal_user",
                            dataType: "json",
                            data: this.wjimimaform,
                            success: (res) => {
                                this.$refs.sliResetpwd.reset();
                                this.forget_padbeld = false
                                this.msg = ""
                                if (res.success == 1) {
                                    this.$message({
                                        message: '密碼已經重置，請用新密碼登入！',
                                        type: 'success',
                                        center: true
                                    });
                                    this.wjmima = false
                                    this.$refs['wjimimarules'].resetFields()
                                } else if (res.success == 2) {
                                    this.$message({
                                        message: '驗證碼已過期！',
                                        type: 'error',
                                        center: true
                                    });
                                    this.textcolor = "#f56c6c"
                                    this.msg = "您的驗證碼已過期!"
                                } else if (res.success == 3) {
                                    if (this.phcode.yzmnum <= 1) {
                                        this.wjmima = false
                                        this.$message({
                                            message: '請核對您的手機號碼！',
                                            type: 'error',
                                            center: true
                                        });
                                        this.msg = ''
                                        this.$refs['wjimimarules'].resetFields()
                                    } else {
                                        this.phcode.yzmnum--
                                        this.wjimimaform.merber_phcode = ""
                                        this.textcolor = "#f56c6c"
                                        this.msg = "驗證碼錯誤，您還有" + this.phcode.yzmnum + "次機會"
                                        this.$refs.wjimimarules.validateField('merber_phcode', (phoneError) => {
                                        })
                                    }
                                    
                                } else if (res.success == 4) {
                                    this.$message({
                                        message: '手機號不存在！',
                                        type: 'error',
                                        center: true
                                    });
                                } else {
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
            } else {
                this.$refs['wjimimarules'].validate((valid) => {
                    if (valid) {
                        this.forget_padbeld = true
                        $.ajax({
                            type: "POST",
                            url: "https://www.trillionricher.com/1.0/forget_pad/",
                            dataType: "json",
                            data: this.wjimimaform,
                            success: (res) => {
                                this.forget_padbeld = false
                                this.$refs.slideblock.reset();
                                this.msg = ""
                                if (res.success == 1) {
                                    this.$message({
                                        message: '密碼已經重置，請用新密碼登入！',
                                        type: 'success',
                                        center: true
                                    });
                                    this.wjmima = false
                                    this.$refs['wjimimarules'].resetFields()
                                } else if (res.success == 2) {
                                    this.$message({
                                        message: '驗證碼已過期！',
                                        type: 'error',
                                        center: true
                                    });
                                    this.textcolor = "#f56c6c"
                                    this.msg = "您的验证码已过期"
                                } else if (res.success == 3) {
                                    if (this.phcode.yzmnum <= 1) {
                                        this.wjmima = false
                                        this.$message({
                                            message: '请核对您的手机号码！',
                                            type: 'error',
                                            center: true
                                        });
                                        this.msg = ''
                                        this.$refs['wjimimarules'].resetFields()
                                    } else {
                                        this.phcode.yzmnum--
                                        this.wjimimaform.merber_phcode = ""
                                        this.textcolor = "#f56c6c"
                                        this.msg = "验证码错误，您还有" + this.phcode.yzmnum + "次机会"
                                        this.$refs.wjimimarules.validateField('merber_phcode', (phoneError) => {
                                        })
                                    }
                                    
                                } else if (res.success == 4) {
                                    this.$message({
                                        message: '手機號不存在！',
                                        type: 'error',
                                        center: true
                                    });
                                } else {
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
        forget_pad_code: function () {
            this.slideshow = true
        },
        phcodetimer: function () {
            this.phcode.bled = true
            if (this.phcode.time > 0) {
                this.phcode.time--;
                this.phcode.text = this.phcode.time + "s後重新獲取";
                setTimeout(this.phcodetimer, 1000);
            } else {
                this.phcode.time = 0;
                this.phcode.text = "獲取驗證碼";
                this.phcode.bled = false;
            }
        },
        gethomedata: function () {
            var _this = this
            $.ajax({
                type: "POST",
                url: "https://www.trillionricher.com/1.0/home",
                dataType: "json",
                success: (res) => {
                    
                    if (res.success == 1) {
                        _this.imgList = res.data.banana
                        _this.helpdata = res.data.notice
                    }
                }
            })
        },
        Openandclose: function () {
            $.ajax({
                type: "POST",
                url: "https://www.trillionricher.com/1.0/notice_switch",
                dataType: "json",
                success: (res) => {
                    if (res.success == 1) {
                        if (res.data[0].switch == 1) {
                            this.gonggao = true
                            this.gonggaohtmnl = res.data[0].content
                        }
                        if (res.data[2].switch == 1) {
                            this.isalipay = '服務暫停'
                            this.issubstitutebled = true
                        }
                        if (res.data[3].switch == 1) {
                            this.issubstitute = '服務暫停'
                            this.isalipaybled = true
                        }
                    }
                    
                }
            })
        }
    },
    computed: {},
    created: function () {
        this.Openandclose()
        // if(this.merber_id != undefined){
        //     this.getvipindexdata()
        // }
        this.getviptongzhi()//首页通告数据
        this.getvipnotice()//会员公告数据
        
        
        var egopay_key = this.$route.query.egopay_key
        var id = this.$route.query.merber_id
        var name = this.$route.query.merber_name
        var type = this.$route.query.type
        var order_money = this.$route.query.order_money
        var pay_number = this.$route.query.pay_number
        var pay_url = this.$route.query.pay_url + '&peerpayType=' + this.$route.query.peerpayType + '&sign=' + this.$route.query.sign
        var exchange = this.$route.query.exchange
        if (egopay_key !== undefined && id !== undefined && name !== undefined) {
            Cookies.set('merber_id', id, {expires: 7});
            Cookies.set('merber_name', name, {expires: 7});
            Cookies.set('egopay_key', egopay_key, {expires: 7});
            if (type == 1) {
                this.$router.push({path: '/vipindex'})
            }
            if (type == 2) {
                this.$router.push({
                    path: '/substitute',
                    query: {
                        order_money: order_money,
                        pay_number: pay_number,
                        pay_url: pay_url,
                        exchange: exchange
                    }
                });
            }
            
        }
        this.gethomedata()
        if (this.merber_id !== undefined) {
            this.login = false
        }
        
        
    },
    watch: {},
}
</script>
