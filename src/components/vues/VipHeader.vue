<template>
    <div class="vip-header">
        <div class="vip-header-left">
            <div class="vip-header-logo" >
                <router-link to="/vipindex" >
                    <img src="../../assets/image/logo(黑).png" alt=""  style="display: inline-block;width: 100px;height: 100%">
                </router-link>
            </div>
            <div class="vip-header-huilv">
                <div>
                    <b></b>今日匯率 : {{huilv}}
                </div>
                <div>
                    <span>更新時間 : </span><span>{{ huilvtime|convTime}}</span>
                </div>
            </div>
            <div class="vip-header-tongzhi" @click="New_news = true">
                <i class="iconfont el-icon-al-tixing" style="font-size: 20px;margin-right: 10px;color:#F4EA2A "></i>
                <span  v-if="Notice_Number!=0">{{Notice_Number}} 條新通知</span>
                <span v-else>暫無消息</span>
            </div>
            <div class="vip-header-kefu" @click="check_message">
                <i class="iconfont el-icon-al-xiaoxi1" style="font-size: 20px;margin-top: 3px"></i>
                &nbsp&nbsp&nbsp
                <span>線上客服</span>&nbsp
                <span style="color: #44AA56;font-weight: bold">ONLINE</span>
            </div>
        </div>
        <div class="vip-header-right">
            <div class="vip-header-govindex">
                <router-link to="/vipindex" style="color:#fff;display:flex;align-items: center">
                    <i class="iconfont el-icon-al-kefuyouxian" style="font-size: 20px;margin-top:2px"></i>&nbsp&nbsp
                    <span class="hidden-sm-only">會員中心</span>
                </router-link>
            </div>
            <div>
                <router-link to="/" style="color:#fff;display:flex;align-items: center">
                    <i class="iconfont el-icon-al-home2" style="font-size: 19px;"></i>&nbsp&nbsp
                    <span class="hidden-sm-only">首 頁</span>
                </router-link>
            </div>
            <div style="cursor: pointer">
                <i class="iconfont el-icon-al-zhuxiao1" style="font-size: 19px;"></i>&nbsp
                <span class="hidden-sm-only" @click="dengchu"  >登 出</span>
            </div>
        </div>
        <!--消息通知-->
        <el-dialog  :visible.sync="New_news" width="670px"  >
            <span slot="title"  style="font-size: 20px ;color: #000;font-weight: bold" >
                <i class="iconfont el-icon-al-guanyu"></i>
                消息通知
            </span>
            <div style="height: 400px;overflow :auto">
                <div v-for="item in  Alltongzhi" class="News" @click="clicktz(item.notification_id,item.type,item.is_receive,item.id,item.content)">
                    <div v-if="item.type.substr(0,1)==7  || item.type.substr(0,1)==8 ">驗證失敗,點擊查看詳情<span style="font-size: 12px;margin: 20px 0 0 20px">{{item.create_time | convTimehms}}</span></div>
                    <div v-else> {{item.content}}   <span style="font-size: 12px;margin: 20px 0 0 20px">{{item.create_time | convTimehms}}</span></div>
                    <i v-if="item.is_receive==0" class="iconfont el-icon-al-New-Tga" style="color: #ff090c;font-size: 30px"></i>
                </div>
            </div>
        </el-dialog>

        <!--新留言提交-->
        <el-dialog  :visible.sync="service" width="670px" :close-on-click-modal="false">

            <div>
                <div style="width: 620px;margin: 30px auto 0">
                    <el-input
                            type="textarea"
                            :rows="14"
                            placeholder="請輸入内容(内容不可空白)"
                            v-model="servicetext">
                    </el-input>
                </div>
                <div class="Choiceimg">
                    <input type="file" id="uploadimg"  @change="onchanges(1)">
                    <button>點擊上傳圖片</button>
                </div>
                <div style="height: 100px;padding: 0 20px" v-show="messageimgurl">
                    <img :src="messageimgurl" alt="" height="100%">
                </div>
                <div style="display: flex;flex-direction: row-reverse;padding: 0 10px 10px 0">
                    <div> <el-button  type="primary" @click="newsubmitUpload" :loading="serviceloding">送出留言</el-button></div>
                </div>
            </div>
        </el-dialog>

        <!--二次提交-->
        <el-dialog  :visible.sync="check_service" width="670px" :close-on-click-modal="false" >
            <div style="max-height: 700px;overflow:auto" >
                <div style="width: 620px;margin: 20px auto 0">
                     <span style="font-weight: bold;font-size: 16px">您的留言: </span><br>
                     <p style="line-height: 30px;margin-top: 10px;" v-html="Mymessager.content"></p>
                    <div style="display: flex;width: 620px;margin: 20px auto 0" v-if="Mymessagerimg!=''">
                        <div style="width: 80px;height: 80px;margin-right: 15px" v-for="val in Mymessagerimg">
                            <img :src="val" alt="" width="100%" height="100%">
                        </div>
                    </div>
                </div>
                <div style="width: 620px;margin: 20px auto 0;padding: 10px" v-for="val in leave_message" :style="{backgroundColor:val.service_name!==''?'#EDEDED':'#fff'}">
                    <span style="font-weight: bold;font-size: 16px" v-if="val.service_name!=='' ">客服回覆:<br> </span>
                    <span style="font-weight: bold;font-size: 16px" v-if="val.service_name=='' ">您的留言:<br> </span>
                    <p style="line-height: 30px" v-html="val.content"></p>
                    <div style="display: flex;width: 620px;margin: 20px auto 0" v-if="val.image!==''">
                        <div style="width: 80px;height: 80px;margin-right: 15px" v-for="item in val.image.split(',')" >
                            <a :href="item" target="_blank"><img :src="item" alt="" width="100%" height="100%"></a>
                        </div>
                    </div>
                </div>
                <div v-if="isclose=='0'" style="width: 620px;margin: 20px auto 0;padding: 10px;background-color:#EDEDED ">
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
                    </div>
                    <div style="height: 100px;padding: 0 20px" v-show="checkmessageimgurl">
                        <img :src="checkmessageimgurl" alt="" height="100%">
                    </div>
                    <div style="display: flex;    flex-direction: row-reverse;padding: 0 10px 10px 0">
                        <div> <el-button  type="primary" @click="anew_message" :loading="anew_messageloding" >送出留言</el-button></div>
                    </div>
                </div>
                <div style="padding: 10px;display: flex;justify-content: center">
                    <el-button type="success" @click="close_solve">已解決</el-button>
                    <el-button type="danger" @click="Unsolved=true" :disabled="isclose=='0'">未解決,回覆訊息</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog  :visible.sync="getmessage" width="670px" :close-on-click-modal="false" >
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
                <div style="width: 620px;margin: 20px auto 0;padding: 10px" v-for="val in messageDetails.leave_message" :style="{backgroundColor:val.service_name!==''?'#EDEDED':'#fff'}">
                    <span style="font-weight: bold;font-size: 16px" v-if="val.service_name!=='' ">客服回覆:<br> </span>
                    <span style="font-weight: bold;font-size: 16px" v-if="val.service_name=='' ">您的留言:<br> </span>
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

        <el-dialog  :visible.sync="failNotice" width="600px" :close-on-click-modal="false" style="margin-top: 18vh">
            <span slot="title"  style="font-size: 20px ;color: #000;font-weight: bold"  >
                <i class="iconfont el-icon-al-guanyu"></i>
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
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import COS  from 'cos-js-sdk-v5'
    import 'element-ui/lib/theme-chalk/display.css';
    import 'lrz/dist/lrz.bundle'
    const cos = new COS({
        SecretId: 'AKIDSuCrZ9K9oNo7HOr2Suytf4Naftxvc1Pb',
        SecretKey: 'JSRpZ9A5tZAs3ISYX1iJUtAJLJIZUJzb',
        FileParallelLimit:120
    })
    export default {
        inject:['reload'],
        data: function () {

            return {
                serviceloding:false,//新留言提交按钮loding
                anew_messageloding:false,//回复留言按钮loding
                huilv:'',
                merber_id:Cookies.get('merber_id'),
                token:Cookies.get('egopay_key'),

                messageimgfile:'',
                checkmessageimgfile:'',
                messageimgurl:'',
                checkmessageimgurl:'',

                fileverify_authentication:'',//文件验证当前状态
                authentication:'',//身份认证当前状态
                huilvtime:'',
                Notice_Number:0,
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
            }
        },
        props:['switch'],
        components: {},
        methods: {
            getvipindexdata: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/order_bank_alipay",
                    data: {merber_id: this.merber_id,token:this.token},
                    dataType: "json",
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if(res.success==1){
                            this.fileverify_authentication = res.data.fileverify_authentication
                            this.authentication=res.data.authentication
                        }

                    }
                })
            },

            gethuilv:function(){
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/exchange",
                    dataType:"json",
                    data:{
                        exchange_type:4
                    },
                    success:(res)=>{
                        if(res.msg==""){
                            this.huilv='网络故障。请稍后....'
                        }
                        this.huilv=res.data[0].exchange
                        this.huilvtime=res.data[0].update_time
                    }
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
                            Bucket: 'egopay-1258561482',
                            Region: 'ap-hongkong',
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
                            Bucket: 'egopay-1258561482',
                            Region: 'ap-hongkong',
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
                var date=new Date();
                var aa=date.getHours()
                if(aa<10 || aa>21){
                            this.$message({
                                // type: 'success',
                                dangerouslyUseHTMLString: true,
                                duration:4000,
                                message: '<h2 style="padding: 10px">目前是下班時間，線上客服服務時間 : 10:00AM~21:00PM</h2>',
                            })
                }
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
                                    sum+=1
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
        },
        computed:{

        },
        watch: {
            switch:function (val) {
                    this.check_message()
            }
        },
        created: function () {
            this.getvipindexdata()
            var _this=this
            this.gettongzhi()
            window.setInterval(() => {
                setTimeout(_this.gettongzhi(), 0)
            },30000)
            this.gethuilv();
        }
    }
</script>
<style>
    .vip-header .el-dialog__header{
        border: none;
        z-index: 100;
    }
    .vip-header{
        width: 100%;
        height: 60px;
        display: flex;
        font-size: 16px;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.99);
        color: #fff;
    }
    .vip-header-left{
        display: flex;
    }
    /*LOGO*/
    .vip-header-left .vip-header-logo{
        padding: 2px 5px;
    }
    /*汇率*/
    .vip-header-huilv{
        background-color: #FE0000;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 10px 20px;
    }
    .vip-header-huilv>div:nth-child(1){
        font-size: 16px;
        font-weight: 900;
    }
    .vip-header-huilv>div:nth-child(2){
        font-size: 13px;
    }
    /*通知*/
    .vip-header-tongzhi{
        width: 130px;
        display: flex;
        align-items: center;
        padding: 0 0 0 20px;
        cursor: pointer;
        position: relative;
    }
    .vip-header-tongzhi:hover{
        background-color: #212121;
    }
    .vip-header-tongzhi .tongzhixl ul li:hover{
        background-color: #E4E4E4;
    }
    .tongzhiitem{
        height: 40px;
        line-height:40px;
        font-size: 16px;
        color: #000;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ececec;
    }
    .News{
        padding: 0 0 0 20px;
        font-size: 16px;
        line-height: 40px;
        border: 1px solid #e4e4e4;
        display: flex;
        justify-content: space-between;
    }
    .News:hover{
        cursor: pointer;
        background-color: #e7e7e7;
    }
    /*客服*/
    .vip-header-kefu{
        display: flex;
        align-items: center;
        padding: 0 20px;
        cursor: pointer;
    }
    .vip-header-kefu:hover{
        background-color: #212121;
    }
    .vip-header-right{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 300px;
        padding: 0 50px;
    }
    .vip-header .el-upload--text{
        display: inline-block;
    }
    .vip-header i{
        font-size: 18px;
    }


</style>
