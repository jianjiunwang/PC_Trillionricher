<template>
    <div class="register">
        <!--body-->
        <div id="register">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px"  >
                <el-form-item label="真實姓名" prop="merber_name">
                    <el-input  v-model="form.merber_name" placeholder="必須與本人身份證姓名相符"></el-input>
                </el-form-item>
                <el-form-item label="暱稱" >
                    <el-input placeholder="選填，可不填" v-model="form.merber_nickname" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="電子信箱:" prop="merber_email" >
                    <el-input v-model="form.merber_email" placeholder="請輸入本人常用的e-mail信箱"></el-input>
                </el-form-item>
                <el-form-item  label="設定密碼"  prop="merber_password" show-password>
                    <el-input type="password" v-model="form.merber_password" autocomplete="off"placeholder="密碼必須由數位和字母組成且 10-20 位"></el-input>
                </el-form-item>
                <el-form-item label="再次輸入密碼" prop="checkPass" show-password>
                    <el-input type="password" v-model="form.checkPass" autocomplete="off" placeholder="請再次輸入密碼"></el-input>
                </el-form-item>
                <el-form-item label="聯絡電話" prop="merber_phone" >
                    <el-input v-model="form.merber_phone" placeholder="請輸入本人手機號碼" style="width: 75%"></el-input>
                    <el-button type="primary" @click="phoneyzm" :disabled="phoneyzmdata.disabled">{{phoneyzmdata.btntext}}</el-button>
                </el-form-item>
                <el-form-item label="驗證碼" prop="merber_code" >
                    <el-input v-model="form.merber_code" maxlength="6"  placeholder="請輸入驗證碼" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="其他信息" prop="history">
                    <el-input v-model="form.history" maxlength="30"  type="textarea"  show-word-limit placeholder="請填寫有註冊過的平台 ex.易購寶、易支付、火速科技等等...如沒有填寫無。"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="submit">
                    <el-button type="primary" @click="resetForm" style="width: 50%">重新輸入</el-button>
                    <el-button type="primary" @click="onSubmit" style="width: 50%;background-color: #efb300;border: none">立即註冊</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import '../assets/js/jquery-3.3.1'
    import Footer from './vues/Footer'
    import Header from './vues/Header'
    export default {
        data() {
            var regEmail = (rule, value, callback) => {
                const mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g
                if (value==='') {
                    return callback(new Error('郵箱不能為空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    }else {
                        callback(new Error('請輸入正確的信箱格式'))
                    }
                },100)
            }
            var regpwd =(rule, value, callback) => {
                const phoneReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{10,20}$/
                if (value === '') {
                    callback(new Error('請輸入正確密碼格式'));
                }
                setTimeout(() => {
                    if (phoneReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('密碼必須是由數字與字母組成的10-20位元長度'))
                    }
                }, 100)
            };
            var regpwd2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('請再次輸入密碼'));
                } else if (value !== this.form.merber_password) {
                    callback(new Error('兩次輸入密碼不一致!'));
                } else {
                    callback();
                }}
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
            var reghistory = (rule, value, callback) =>{
                if (value==="") {
                    return callback(new Error('請填寫有註冊過的平台 ex.易購寶、易支付、火速科技等等...如沒有填寫無'))
                }else {
                    callback()
                }
            }
            return {
                rules: {
                    merber_name: [
                        {
                            required: true,
                            message: '請輸入真實姓名',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 6,
                            message: '長度在 2 到 6 個字符',
                            trigger: 'blur'
                        },
                        { pattern: /^[\u4E00-\u9FA5]+$/,
                            message: '用戶名只能為中文'
                        }
                    ],
                    merber_email: [
                        { required: true, validator: regEmail, trigger: 'blur' }
                    ],
                    merber_password: [
                        { required: true, validator: regpwd, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true,validator: regpwd2, trigger: 'blur' }
                    ],
                    merber_phone: [
                        { required: true,validator: regPhone, trigger: 'blur' }
                    ],
                    merber_code:[
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
                        }
                    ],
                    history:[
                        {required: true,validator:reghistory,trigger: 'blur'}
                    ]
                },
                phoneyzmdata:{
                    disabled:false,
                    btntext:'發送驗證碼',
                    time:'60'
                },
                activeIndex: '1',
                userPage: { page: 1, limit: 20 },
                tableData: [],
                tableLoading: false,
                userTotal: 0,
                searchName: '',
                invite_code:'',
                form: {
                    merber_name:'',
                    merber_nickname:'',
                    merber_email: '',
                    merber_password:'',
                    checkPass:'',
                    merber_phone: '',
                    merber_code:'',
                    history:'',
                },
                ruleForm: {
                    telPhone: '',
                    email: '',
                    password:'',
                    checkPass:'',
                    history:''
                },
            }},
        components: {
            Footer,
            Header
        },
        methods: {
            resetForm:function() {
                this.$refs['form'].resetFields()
            },
            phoneyzm:function(){
                if(this.form.merber_phone===''){
                    this.$message.error("手機號碼不能為空");
                }else {
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/get_sms_code/",
                        dataType:"json",
                        data: {merber_phone:this.form.merber_phone},
                        success:(res)=>{
                            if(res.success==2){
                                this.$message.error("此手機號已註冊");
                            }else if(res.success==1){
                                this.phoneyzmdata.disabled=true
                                this.phoneyzmdata.time=60
                                this.timer();
                            }else {
                                this.$message.error("手機號碼不能為空");
                            }
                        }
                    })
                }
            },
            timer() {
                if (this.phoneyzmdata.time > 0) {
                    this.phoneyzmdata.time--;
                    this.phoneyzmdata.btntext=this.phoneyzmdata.time+"s後重新獲取";
                    setTimeout(this.timer, 1000);
                } else{
                    this.phoneyzmdata.time=0;
                    this.phoneyzmdata.btntext="發送驗證碼";
                    this.phoneyzmdata.disabled=false;
                }
            },
            onSubmit:function(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        $.ajax({
                            type: "POST",
                            url: "https://www.trillionricher.com/1.0/register/",
                            dataType:"json",
                            data:{
                                merber_name:this.form.merber_name,
                                merber_nickname:this.form.merber_nickname,
                                merber_email: this.form.merber_email,
                                merber_password:this.form.merber_password,
                                merber_phone: this.form.merber_phone,
                                merber_code:this.form.merber_code,
                                history:this.form.history,
                                invite_code:this.invite_code
                            },
                            success:(res)=>{
                                if(res.success==1){
                                    this.$message({
                                        message: '恭喜妳，註冊成功',
                                        type: 'success'
                                    });
                                    Cookies.set('merber_id', res.data.merber_id,{ expires: 1 });
                                    Cookies.set('merber_name',res.data.merber_name,{ expires: 1 });
                                    Cookies.set('egopay_key',res.data.token,{ expires: 1 });
                                    this.$router.push('/vipindex');
                                }else if(res.success==5){
                                    this.$message.error(res.msg);
                                }else if(res.success==4){
                                    this.$message.error(res.msg);
                                }else if(res.success==3){
                                    this.$message({
                                        message: '驗證碼錯誤',
                                        type: 'error'
                                    });
                                }else if(res.success==2){
                                    this.$message({
                                        message: '驗證碼已過期',
                                        type: 'error'
                                    });
                                }else if(res.success==0){
                                    this.$message({
                                        message: '此郵箱已註冊',
                                        type: 'error'
                                    });
                                }else if(res.success==7){
                                    this.$message({
                                        message: '此手機號已註冊',
                                        type: 'error'
                                    });
                                }else {
                                    this.$message({
                                        message: '注册失败',
                                        type: 'error'
                                    });
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
        computed: {},
        watch: {},
        mounted: function () {
          var invite_code =this.$route.query.invite_code
          if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            window.location.href="https://m.trillionricher.com/#/register?invite_code="+invite_code
          }else {
            if(invite_code == undefined){
              this.invite_code = ''
            }else {
              this.invite_code = invite_code
            }
          }

        }
    }
</script>

