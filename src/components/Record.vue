<template>
    <div class="record">
        <div class="recordlist  hoverxg"  v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">

            <el-menu :default-active="activeIndex"  @select="handleSelect" mode="horizontal"   text-color="#255aac" active-text-color=" #255aac">
                <el-menu-item index="1">
                    我的訂單
                </el-menu-item>
<!--                <el-menu-item index="2">-->
<!--                    直播訂單-->
<!--                </el-menu-item>-->
            </el-menu>
            <div class="recordlist_body" v-if="activeIndex == 1">
                <table class="order_table" style="padding: 20px 0px">
                    <tr>
                        <th>類型</th>
                        <th>訂單編號</th>
                        <th>訂單金額</th>
                        <th>匯率</th>
                        <th>應付新臺幣</th>
                        <th>完成時間</th>
                        <th colspan="2" class="ordertype_slect">
                            <div>
                                <el-select v-model="order_state" placeholder="全部" size="mini" >
                                    <el-option style="height:30px;"
                                               v-for="item in options"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </th>
                    </tr>

                    <tr v-for="(item,index) in orderList" :key="index" >
                        <!--<el-tooltip class="item" effect="light" placement="bottom" popper-class="ordertooltip" >-->
                        <!--<div slot="content" >-->
                        <!--完成時間 : {{item.update_time |convTimehms}}<br>-->
                        <!--創建時間 : {{item.create_time |convTimehms}}<br>-->
                        <!--應付新台幣計算公式 : <br>-->
                        <!--￥{{item.robot_rmb}} * {{item.exchange_rate}} =  {{(item.robot_rmb*item.exchange_rate).toFixed(0)}} TWD-->
                        <!--</div>-->
                        <td v-if="item.service_type==1">代付</td>
                        <td v-if="item.service_type==2">儲值</td>
                        <td v-if="item.service_type==3">貨款</td>
                        <td v-if="item.service_type==5">代收</td>
                        <td>{{item.order_num}}</td>
                        <td>{{item.robot_rmb}}</td>
                        <td>{{item.exchange_rate}}</td>
                        <td>{{item.robot_twd}}</td>
                        <td>{{item.update_time| convTime}}</td>
                        <td class="ordericon" >
                            <div style="width: 193px;justify-content: space-between;display: flex">
                                <span  v-if="item.order_state==0" style="color:#FFA801">訂單處理中</span>
                                <span  v-if="item.order_state==30 || item.order_state==31" style="color:#efb300">已匯款</span>
                                <span  v-if="item.order_state==3" style="color:#FFA801">等待匯款</span>
                                <span  v-if="item.order_state==4 || item.order_state==19 || item.order_state==33 || item.order_state==34" style="padding: 0">
                                        <span v-if="item.service_type==1" style="color:#004bd9">代付中</span>
                                        <span v-if="item.service_type==2" style="color:#004bd9">儲值中</span>
                                        <span v-if="item.service_type==3" style="color:#004bd9">處理中</span>
                                        <span v-if="item.service_type==4" style="color:#004bd9">提現中</span>
                                    </span>
                                <span v-if="item.order_state==6" style="color:#49B85C">交易成功</span>
                                <span v-if="item.order_state==7" style="color:#363636">取消訂單</span>
                                <span v-if="item.order_state==5 || item.order_state==8 || item.order_state==9 ||item.order_state==10" style="padding:0">
                                        <span v-if="item.service_type==1" style="color:#ff0004">代付失敗</span>
                                        <span v-if="item.service_type==2" style="color:#ff0004">儲值失敗</span>
                                        <span v-if="item.service_type==3" style=" color:#ff0004">處理失敗</span>
                                        <span v-if="item.service_type==4" style="color:#ff0004">提現失敗</span>
                                    </span>
                                <span style="color:#a66cb9" v-if="item.order_state==11">退款成功</span>
                                <span style="color:#f62400" v-if="item.order_state==12">申请退款</span>
                                <span style="color:#f62400" v-if="item.order_state==41">匯款帳號不符</span>
                                <span v-if="item.order_state==13" style="background:#49B85C">單筆退款</span>
                                <span style="color:#FF5000" v-if="item.order_state==14 || item.order_state==15 || item.order_state==16" @click="yanzheng(item.kadan)">請做驗證</span>
                                <!--<span style="background:#49b85c" v-else-if="item.order_state==15">提現成功</span>-->
                                <!--<span style="background:#FF5000" v-else-if="item.order_state==16">提現失敗</span>-->
                                <span style="color:#FF5000" v-if="item.order_state==18">交易失敗</span>
                                <span class="scs">
                                <span v-show="item.service_type==1" style="width: 30px" ></span>
                                <el-tooltip class="item" effect="dark" content="交易截圖" placement="bottom">
                                    <img  src="../assets/image/img/jietu.png" v-show="item.service_type==3" class="imgicon" style="font-size: 20px;cursor: pointer;margin-left:10px "  @click="picture(item.order_num,item.service_type) ">
                                </el-tooltip>
                                <i  class="el-icon-arrow-right" style="font-size: 20px;cursor: pointer;margin-left: 10px"  @click="goOrderData(item.order_id,1) "></i>
                            </span>
                            </div>


                        </td>
                        <!--</el-tooltip>-->
                    </tr>

                </table>
                <p v-show="showdata" style="font-size: 20px;text-align: center;padding: 20px 0;display: block">暫無數據</p>
                <div class="listpage">
                    <el-pagination
                            background
                            :pager-count="5"
                            layout="prev, pager, next"
                            @current-change="Currentpage"
                            @prev-click="Currentpage"
                            @next-click="Currentpage"
                            :total="listtotal">
                    </el-pagination>
                </div>
            </div>
            <div class="recordlist_body" v-if="activeIndex == 2">
                <table class="order_table">
                    <tr>
                        <th>直播平台</th>
                        <th>訂單編號</th>
                        <th>訂單金額</th>
                        <th>應付新臺幣</th>
                        <th>完成時間</th>
                        <th>查看詳情</th>
                    </tr>

                    <tr v-for="(item,index) in myplatorderdata" :key="index" >
                        <td v-if="item.order_type == '1'">鬥魚直播</td>
                        <td v-if="item.order_type == '2'">虎牙直播</td>
                        <td v-if="item.order_type == '3'">抖音直播</td>
                        <td v-if="item.order_type == '4'">快手直播</td>
                        <td>{{item.order_num}}</td>
                        <td>{{item.product_name}}</td>
                        <td>{{item.order_twd}}</td>
                        <td>{{item.update_time| convTime}}</td>
                        <td class="ordericon" >
                            <span>
                                <i class="el-icon-arrow-right" style="font-size: 20px;cursor: pointer;margin-left: 10px"  @click="goOrderData(item.pid,2) "></i>
                            </span>

                        </td>
                        <!--</el-tooltip>-->
                    </tr>

                </table>
                <p v-show="showdata_zb" style="font-size: 20px;text-align: center;padding: 20px 0;display: block">暫無數據</p>
                <div class="listpage">

                    <el-pagination
                            background
                            :pager-count="5"
                            :page-size="5"
                            layout="prev, pager, next"
                            @current-change="Currentpage_zb"
                            @prev-click="Currentpage_zb"
                            @next-click="Currentpage_zb"
                            :total="listtotal_zb">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog  :visible.sync="pictureshow" width="1200px"  class="Avatardialog" :close-on-click-modal="false" :show-close=false>
            <span slot="title" style="display: flex;align-items: center;justify-content: space-between" >
                <span>
                     <i class="iconfont el-icon-al-guanyu"></i>
                     交易截圖
                </span>
                <span>
                        <el-tooltip class="item" effect="dark" content="複製連結" placement="bottom">
                            <i class="iconfont el-icon-al-Group- grhover"
                               style="line-height: 1;color: #6762ff;cursor:pointer"
                               @click="Copylink"
                               :data-clipboard-text="imgsrc"
                            ></i>
                        </el-tooltip>
                        <i class="iconfont el-icon-al-error" style="font-size: 14px;margin:0 10px;color:#909399;cursor: pointer " @click="pictureshow = false"></i>
                </span>
            </span>
            <div style="height: 600px">
                <img :src="imgsrc" alt="" style="width: 100%;height: 100% ">
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'

    import Clipboard from 'clipboard';
    let rst=new Clipboard('.grhover');
    export default {
        data: function () {
            return{
                merber_id:Cookies.get('merber_id'),
                merber_name:Cookies.get('merber_name'),
                token:Cookies.get('egopay_key'),
                activeIndex:'1',
                options: [{
                    value: '1',
                    label: '全部'
                },{
                    value: '3',
                    label: '等待匯款'
                }, {
                    value: '4',
                    label: '代付中'
                }, {
                    value: '6',
                    label: '交易成功'
                }, {
                    value: '7',
                    label: '交易關閉'
                }, {
                    value: '11',
                    label: '退款'
                }],
                order_state:'1',
                orderList:[],
                loading:false,
                pictureshow:false,
                imgsrc:'',
                listtotal:0,
                listtotal_zb:0,
                showdata:false,
                showdata_zb:false,
                activeName:'daifu',
                storedata:{},
                myplatorderdata:[]
            }},
        components: {
        },
        methods: {
            handleSelect(id){
                console.log(id);
                this.activeIndex = id
            },
            Copylink:function(){
                this.$notify({
                    title: '成功',
                    message: '連結複製成功',
                    type: 'success',
                    duration:2000
                });
            },
            yanzheng:function(type){
                    this.$router.push({
                        path:'/',
                        query:{
                            kadan:type,
                        }
                    });
            },
            TheLastStep:function () {
                this.$router.go(-1);
            },
            goOrderData:function(index,type){
                if(type == 1){
                    this.$router.push({
                        path:'/orderDetails',
                        query:{
                            id:index
                        }
                    });
                    return false
                }
                if(type == 2){
                    this.$router.push({
                        path:'/orderDeta_zb',
                        query:{
                            id:index
                        }
                    });
                }

            },
            getrecorddata:function (page,type) {
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/order_list",
                    dataType:"json",
                    beforeSend:function(XMLHttpRequest){
                        _this.loading=true
                    },
                    data:{
                        merber_id:_this.merber_id,
                        token:_this.token,
                        page:page,
                        order_state:type,
                    },
                    success:(res)=>{
                        if(res.success==-1){
                            this.Logout()
                        }else if(res.success==1){
                            this.showdata=false
                            this.orderList=res.data
                            this.listtotal=Number(res.msg)
                            _this.loading=false
                        }else if(res.success==0){
                            _this.loading=false
                            this.orderList=[]
                            this.listtotal=0
                            this.showdata=true
                        }
                    }
                })
            },
            getmyplatorder:function(page){
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/myplatorder",
                    dataType:"json",
                    beforeSend:function(XMLHttpRequest){
                        _this.loading=true
                    },
                    data:{
                        merber_id:_this.merber_id,
                        token:_this.token,
                        page:page
                    },
                    success:(res)=>{
                        if(res.success==-1){
                            this.Logout()
                        }else if(res.success==1){
                            this.loading=false
                            this.myplatorderdata = res.data
                            this.listtotal_zb = Number(res.msg)
                        }else if(res.success==0){
                            _this.loading=false
                            this.listtotal_zb=0
                            this.showdata_zb=true
                        }
                    }
                })
            },
            Currentpage:function (val) {
                this.getrecorddata(val,this.order_state)
                scrollTo(0,0)
            },
            Currentpage_zb:function(val){
                this.getmyplatorder(val)
                scrollTo(0,0)
            },
            picture:function (id,type) {
                this.pictureshow=true
                if(type==1){
                    this.imgsrc='https://trillionricher-1258896139.cos.ap-tokyo.myqcloud.com/daifu_pics/'+id+'.jpg'
                }else if(type==3){
                    this.imgsrc='https://trillionricher-1258896139.cos.ap-tokyo.myqcloud.com/daichu_pics/'+id+'.jpg'
                }
            },
            getstoredata: function () {
                var _this = this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/shop_order",
                    data: {
                        merber_id:_this.$store.state.merber_id,
                        token:_this.$store.state.token
                    },
                    dataType: "json",
                    beforeSend: function (XMLHttpRequest) {
                        _this.loading = true
                    },
                    success: function(res){
                        if(res.success==1){
                            _this.storedata=res.data
                        }
                    }
                })
            },
            goOrderData_cmy:function(id){
                this.$router.push({
                    path:'/orderDetails_cmy',
                    query:{
                        id:id
                    }
                });
            },
        },

        created:function(){
            this.getmyplatorder(1)
            this.getrecorddata(1,1)

            // this.getstoredata()
        },
        watch:{
            order_state:function (val) {
               var  _this=this
                if (val!=='全部'){
                    this.getrecorddata(1,val)
                }else {
                    this.getrecorddata(1,1)
                }
            },

        }

    }
</script>
<style >

</style>
