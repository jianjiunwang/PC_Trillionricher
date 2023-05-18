<template>
    <div class="Substitute">
        <div class="tongzhi">
            <div class="content">
                <i class="iconfont el-icon-al-xitonggonggao" style="color: #fe5e00;font-size: 20px;margin-left: 10px"></i>
                <span>{{tongzhi_df}}</span>
            </div>
        </div>
        <div class="Substitute_body">
            <div>
                  <router-view></router-view>
            </div>
            <div class="Description" >
                <h3>服務申請說明</h3>
                <p>1、本站支付寶秒到，歡迎使用。</p>
                <p>2、<span>24小時</span>繳費成功後銀行會通知兆富通，一旦通知，支付寶秒到。</p>
                <p>3、交易處理時間為24H，除非有例外狀況會另行通知</p>
                <p>4、網路客服服務時間為早上10點到下午5點。</p>
                <p>5、商品如淘寶管制，有部分無法代付，請見諒</p>
                <p>6、交易失敗得商品將退至餘額錢包。</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import '../assets/css/Substitute  .css'
    import 'element-ui/lib/theme-chalk/display.css';
    import Clipboard from 'clipboard';
    import Loading from './vues/loading';
    import Common from './vues/Common'
    let rst=new Clipboard('.zfb');

    export default {
        inject:['reload'],
        data: function () {
            return {
                tongzhi_df:'',//代付通知
                merber_id:Cookies.get('merber_id'),
                token:Cookies.get('egopay_key'),
            }
        },
        components: {
        },
        methods: {
            getNotice:function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/inform",
                    dataType:"json",
                    data:{page:2},
                    success:(res)=>{
                        if(res.success==1){
                            this.tongzhi_df=res.data[0].content
                        }
                    }
                })
            },
            gethistory_order:function () {
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/history_order",
                    dataType:"json",
                    data: {
                        merber_id:_this.merber_id,
                        token:_this.token
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
                            this.$router.push({name: 'Two',params: {
                                    id:res.data.order,
                             }})
                        }
                    }
                })
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
                        }
                        if (res.success == 3){
                            this.$router.push({path: '/'})
                            this.$message({
                                showClose: true,
                                message: '請先完成身份認證',
                                type: 'error'
                            });
                        }
                        if (res.success == 4){
                            this.$router.push({path: '/'})
                            this.$message({
                                showClose: true,
                                message: '請先完成文件認證',
                                type: 'error'
                            });
                        }
                    }
                })

            },
        },

        computed: {
        },

        watch: {
        },
        created: function () {
            this.getNotice()
            this.check_order()
            this.gethistory_order()
        },

    }
</script>
<style>
   .body_right_data{
	   font-size: 16px;
	   padding: 20px;
	   margin-bottom: 20px;
   }
	.body_right_data>div{
		display: flex;
		margin: 10px 0;
	}

</style>
