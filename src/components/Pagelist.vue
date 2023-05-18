<template>
    <div>
        <Header></Header>
        <div style="background-color: #f3f3f3;padding-bottom:20px ">
            <div class="pagelist_body">
                <div>
                    <div class="Search_box" >
                        <div>
                            &nbsp;&nbsp;
                            <i class="iconfont el-icon-al-sousuo" style="color:#ff5000 "></i>
                            <input type="text" @keyup.enter="searchkey" v-model="inputKey" placeholder="請輸入關鍵字或品牌，搜尋優惠券">
                            <button style="cursor: pointer;" @click="searchkey">查找優惠券</button>
                        </div>
                    </div>
                    <div class="alltabs" style="position: relative">
                       <div style="position: absolute;width: 100px;height: 40px;background-color: #FE0000;top:10px;right:20px;z-index: 200">
                           <el-select v-model="sort" placeholder="全部" >
                               <el-option style="height:30px;"
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                               </el-option>
                           </el-select>
                       </div>
                       <el-tabs v-model="Keyword" >
                            <el-tab-pane v-for="(val,i) in tabs_nav" :key="i" :name="val.title">
                                <span slot="label" ><i :class="val.icon"></i> &nbsp;{{val.title}}</span>
                            </el-tab-pane>
                       </el-tabs>
                    </div>
                    <div class="commodity_all">
                        <div class="commodity_item hoverxg" v-for="val in pageList">
                            <a :href="val.coupon_click_url" target="_blank">
                                <div class="commodity_item_img">
                                    <img :src="val.pict_url" alt="">
                                    <span class="volume">销量: {{val.volume}}</span>
                                </div>
                                <p>{{val.title}}</p>
                                <div class="price_info">
                                    <span> ￥ {{val.zk_final_price}}</span>
                                    <span> </span>
                                    <span>
                                            <img src="../assets/image/header_img/taobao2.png"  alt="">
                                    </span>
                                </div>
                                <div class="youhuijuan">
                                    <img src="../assets/image/youhuijuanbg.png" alt="" width="100%" height="45px">
                                    <div class="golingjuan">去领劵 ></div>
                                    <span v-if="val.coupon_info.toString()!=='[object Object]'">{{(val.coupon_info).toString().split('减')[0]}}<span style="margin: 0 auto;display:block">减{{(val.coupon_info).toString().split('减')[1]}}</span></span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div style="width: 400px;margin: 20px auto">
                        <el-pagination
                                layout="prev, pager, next"
                                :total="total"
                                @next-click="next_click"
                                @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <Loading v-show="loading"></Loading>
        <!--<el-dialog  :visible.sync="dialogVisible" :close-on-press-escape="false"  :show-close="false" width="500px" :close-on-click-modal="false" class="Avatardialog" style="margin-top: 20vh">-->
            <!--<span slot="title" >-->
                <!--<i class="iconfont el-icon-al-guanyu"></i>-->
                <!--提示-->
            <!--</span>-->
            <!--<div>-->
                <!--<p style="font-size: 18px;padding: 40px 0  50px 0;line-height: 30px;text-align: center">優惠券商城維護中，其餘功能服務不受影響。</p>-->
            <!--</div>-->
        <!--</el-dialog>-->

    </div>
</template>

<script>
    import Header from './vues/Header'
    import Footer from './vues/Footer'
    import Loading from './vues/loading'
    import '../assets/js/jquery-3.3.1'

    export default {
        data: function () {
            return {
                // dialogVisible:true,
                tabs_nav:[
                    {title:"全部",icon:"iconfont el-icon-al-tubiaolunkuo-"},
                    {title:"家装",icon:"iconfont el-icon-al-icon-test"},
                    {title:"居家",icon:"iconfont el-icon-al-jiaju-"},
                    {title:"女裝",icon:"iconfont el-icon-al-nvzhuang1"},
                    {title:"美妝",icon:"iconfont el-icon-al-meizhuangyongpin"},
                    {title:"内衣",icon:"iconfont el-icon-al-neiyi1"},
                    {title:"男裝",icon:"iconfont el-icon-al-nanzhuang"},
                    {title:"數碼",icon:"iconfont el-icon-al-shumaxiangji"},
                    {title:"汽車",icon:"iconfont el-icon-al-qiche"},
                    {title:"寵物",icon:"iconfont el-icon-al-chongwu"},
                    {title:"玩具",icon:"iconfont el-icon-al-wanjuxiong"},
                ],
                yhjbg:[
                   '../assets/image/youhuijuanbg.png' ,
                   '../assets/image/youhuijuanbg1.png' ,
                   '../assets/image/youhuijuanbg2.png' ,
                ],
                sort:"排序",
                pageList:[],
                Keyword:"女装",
                inputKey:"",
                loading:false,
                options: [{
                    value: '1',
                    label: '销量升序'
                },{
                    value: '2',
                    label: '销量降序'
                },{
                    value: '3',
                    label: '價格升序'
                },{
                    value: '4',
                    label: '價格降序'
                }],
                total:1000,
            }
        },
        components: {
            Footer,
            Header,
            Loading
        },
        methods: {
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if(scrollTop>160){
                    $(".alltabs").css({
                        position: 'fixed',
                        top:0,
                        width:"1200px"
                    })
                }else {
                    $(".alltabs").css({
                        position: 'relative',
                    })
                }

            },
            searchkey:function () {
                this.Keyword=this.inputKey
            },
            handleCurrentChange:function(val) {
                this.page_no=val
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/discount",
                    dataType:"json",
                    data:{product_name:this.Keyword,page_no:val},
                    beforeSend:function(XMLHttpRequest){
                        _this.loading=true
                    },
                    success:(res)=>{
                        if(res.success!==null){
                            this.loading=false
                            this.pageList=res.data
                        }
                    }
                })
            },
            getpagelist:function (keyword) {
                window.addEventListener('scroll', this.handleScroll)
                var key=this.$route.query.key
                if(key=='' || key==undefined){
                    this.keyword='女装'
                }else {
                    this.keyword=key
                }
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/discount",
                    dataType:"json",
                    data:{product_name:this.keyword,page_no:1},
                    beforeSend:function(XMLHttpRequest){
                        _this.loading=true
                    },
                    success:(res)=>{
                        if(res.success!==null){
                            _this.loading=false
                            this.pageList=res.data

                        }
                    }
                })
            },
            next_click:function (val) {

            }
        },
        computed: {},
        watch: {
            Keyword:function (key) {
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/discount",
                    dataType:"json",
                    data:{product_name:key,page_no:1},
                    beforeSend:function(XMLHttpRequest){
                        _this.loading=true
                    },
                    success:(res)=>{
                        if(res.success!==null){
                            this.loading=false
                            this.pageList=res.data
                        }
                    }
                })
            },
            sort:function (sort) {
                if(sort!==0){
                    var _this=this
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/sort_discount",
                        dataType:"json",
                        data:{product_name:this.Keyword,sort:sort,page_no:1},
                        beforeSend:function(XMLHttpRequest){
                            _this.loading=true
                        },
                        success:(res)=>{
                            if(res.success!==null){
                                this.loading=false
                                this.pageList=res.data
                            }
                        }
                    })
                }
            }

        },
        mounted: function () {
            this.getpagelist()
        },
        created:function () {

        }
    }
</script>
<style>
    input,button{outline:none;}
    .pagelist_body .el-input__inner{
        border: none;
    }
    .pagelist_body{
        width: 1200px;
        margin: 0 auto;
    }
    .alltabs{
        z-index:200 ;
        position: relative;
    }
    .el-tabs__header{
        z-index: 100;
        height: 60px;
        box-sizing: border-box;
        background-color: #fff;
        padding: 0 20px;
        margin: 0;
    }
    .el-tabs__item{
        height:60px ;
        line-height: 60px;
        font-size: 15px;
    }
    .Search_box{
        display: flex;
        height: 100px;
        align-items: center;
        border-radius: 20px;
        margin: 0 auto;
        width: 600px;
    }
    .Search_box>div{
        border:2px solid #ff5000;
        padding: 2px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        border-radius: 20px;
    }
    .Search_box input,.Search_box button{
        border: none;
        height: 35px;
        font-size:16px;
    }
    .Search_box button{
        width: 100px;
        height: 37px;
        background-color:#ff5000 ;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        color: #fff;
        font-weight: 600;
    }
    .Search_box input{
        width: 300px;
        background-color: rgb(243,243,243);
        margin-left: 20px;
    }
    .commodity_all{
        box-sizing: border-box;
        width: 1200px;
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
        padding: 0 2px;
        flex-wrap:wrap;
    }
    .commodity_item{
        width: 23%;
        box-sizing: border-box;
        background-color: #fff;
        height: 350px;
        padding: 15px;
        position: relative;
        margin-top: 30px;
    }
    .commodity_item_img{
        box-sizing: border-box;
        width: 240px;
        height: 240px;
        margin: 0 auto 10px;
        position: relative;

    }
    .commodity_item_img img{
        width: 100%;
        height: 100%;
    }
    .commodity_item_img span.volume{
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 14px;
        color: #fff;
        background-color: rgba(0,0,0,0.8);
        padding: 2px 5px;
    }
    .commodity_item p{
        width: 100%;
        font-size: 14px;
        color:#008cba ;
        line-height: 30px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .commodity_item  div.price_info{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
    }
    .commodity_item  div.price_info span:nth-child(1){
        font-size:25px;
        font-weight: bold;
        color: #FE0000;
        height: 40px;
        width: 150px;
        line-height: 40px;
    }
    .commodity_item  div.price_info span:nth-child(2){
        font-size:14px;
        color: #a3a3a3;
        margin: 10px 0 0 0;
        text-decoration:line-through;
    }
    .commodity_item  div.price_info span:nth-child(3){
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #ff4600;
    }
    .commodity_item  div.price_info span:nth-child(3) img{
        width: 25px;
        height: 25px;
        margin-left: 15px;
    }
    .commodity_item .youhuijuan{
        position: absolute;
        top:-10px;
        right: -5px;
        width: 80px;
        height: 90px;
        background-color: #fff;
        border-radius: 5px;
    }
    .commodity_item .youhuijuan>span{
        color: #fff;
        font-size: 14px;
        position: absolute;
        top: 0;
        text-align: center;
        width: 100%;
        padding: 4px 0 0 0;
    }
    .commodity_item  .golingjuan{
        width: 80%;
        margin: 0 auto;
        font-size: 14px;
        padding: 5px 0;
        text-align: center;
        background-color:#FF0036 ;
        color: #fff;
        border-radius: 4px;
    }
</style>