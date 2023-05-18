<template>
    <div class="helpcenter">
        <div class="orderdata_head"><router-link to="/"  style="color: #468DB9;margin-left: 10px;font-size: 16px;cursor: pointer;"><i class="el-icon-arrow-left"></i></router-link>幫助中心</div>
        <div>
            <div class="helpheader">
                <ul>
                    <li v-for="(item,i) in helpdata" :key="i" @click="gethelplist(i)" :class="current == i?'helpclickbg':''">
                        {{item.page_name}}
                    </li>
                </ul>
            </div>
            <div class="helpbody">
                <div class="helptitle">
                    <ul>
                        <li v-for="(item,i) in helptitlelist" :key="i" @click="gehelpdata(i,item.notice_id)" :class="titlecurrent == i?'helptitlebg':''">{{item.title}}</li>
                    </ul>
                </div>
                <div class="helpdata" v-html="listdata">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './vues/Header'
    import Footer from './vues/Footer'
    import Clipboard from 'clipboard';
    let rst=new Clipboard('.grhover');
    export default {
        data: function () {
            return {
                current:0,
                titlecurrent:0,
                helptitlelist:[],
                help:false,
                helpdata:'',
                listdata:'',
                alllistdata:[],
                keyword:'',
                notice_id:'',
            }
        },
        components: {
            Footer,
            Header
        },
        methods: {
            gethelplist:function(i){
                this.current = i
                // this.gehelpdata(this.titlecurrent,0)
            },
            gehelpdata:function(i,id){
               this.titlecurrent = i
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/help_details",
                    data:{
                        notice_id:id
                    },
                    dataType:"json",
                    success:(res)=>{
                        this.listdata=res.data.content
                    }
                })
            },
            Copylink:function(){
                this.$notify({
                    title: '成功',
                    message: '連結複製成功',
                    type: 'success',
                    duration:2000
                });
            },
            querySearch(queryString, cb) {
                var restaurants = this.alllistdata;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (alllistdata) => {
                    return (alllistdata.title.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
                };
            },

            gethelpdata:function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/gethelp",
                    dataType:"json",
                    success:(res)=>{
                        this.helpdata=res.data
                        this.helptitlelist = res.data[this.current].notice
                        this.gehelpdata(0,res.data[this.current].notice[0].notice_id)
                    }
                })
            },
            helplistdata:function (id) {
                this.help=true
                this.notice_id='https://www.egopay.com.tw/dist/#/helpcenter?notice_id='+id
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/help_details",
                    data:{
                        notice_id:id
                    },
                    dataType:"json",
                    success:(res)=>{
                        this.listdata=res.data
                    }
                })
            }
        },
        computed: {
        },
        watch: {
            current:function (val) {
                console.log(val);
                this.helptitlelist = this.helpdata[val].notice
                console.log(this.helptitlelist);
            }
        },
        mounted: function () {
            this.gethelpdata()
            // var notice_id=this.$route.query.notice_id
            // if(notice_id!==undefined){
            //     if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            //         window.location.href="https://m.egopay.com.tw/#/helplist?notice_id="+notice_id
            //     }else {
            //         this.help=true
            //         this.helplistdata(notice_id)
            //     }
            // }
        }
    }
</script>
