<template>
    <div>
        <div class="body_right_bottom hoverxg">
            <h3>使用遇到的問題？</h3>
            <ul>
                <li v-for="(val,i) in noticedata" :key="i"><a @click="getnoticelist(val.notice_id)">{{val.title}}</a></li>
            </ul>
        </div>
        <el-dialog   :visible.sync="Company"  width="800px" :close-on-click-modal="false" id="notice_window">
                <span slot="title" >
                    <i class="iconfont el-icon-al-guanyu"></i>
                    會員公告

                </span>
            <div class="notice_xq"
                 v-loading="loading"
                 element-loading-background="rgba(255, 255, 255, 0.9)">
                <div class="notice_xq_title">
                    <h2>{{noticelistdata.title}}</h2>
                    <p>{{noticelistdata.create_time | convTimehms}}</p>
                </div>
                <div class="notice_xq_body" v-html="noticelistdata.content" >
                </div>
                <div class="notice_xq_out">
                    <el-button type="primary" @click="Company=false" >離開</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                Company:false,
                noticedata:Array,
                noticelistdata:Object,
                loading:false,
            }
        },
        props:['page'],
        components: {},
        methods: {
            getnotice:function () {
                var _this=this
                var page=this.page
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/notice",
                    dataType:"json",
                    data:{page:page},
                    success:(res)=>{
                        if(res.success==1){
                            this.noticedata=res.data
                        }
                    }
                })
            },
            getnoticelist:function (id) {
                var _this=this
                this.Company=true
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/notice_details",
                    dataType:"json",
                    data:{notice_id:id},
                    beforeSend:function(XMLHttpRequest){
                        _this.loading=true
                    },
                    success:(res)=>{
                        if(res.success==1){
                            this.noticelistdata=res.data[0]
                            this.loading=false
                        }
                    }
                })
            }
        },
        computed: {},
        watch: {
            page:function (page) {
                var _this=this
                var page=this.page
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/notice",
                    dataType:"json",
                    data:{page:page},
                    success:(res)=>{
                        if(res.success==1){
                            this.noticedata=res.data
                        }
                    }
                })
            }
        },
        created: function () {
            this.getnotice()
        }
    }
</script>
