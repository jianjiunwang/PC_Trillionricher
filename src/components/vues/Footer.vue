<template>
        <div class="footer">
            <div >
                <div class="content"> 
                    <div >
                       
                         <div style="    display: flex;
    align-content: center;
    align-items: center;    filter: opacity(0.5);">
                            <img src="../../assets/image/LOGO_header.png"  width="104">
                           <img src="../../assets/image/cf-logo-h-rgb-rev.png"  width="104">       
                         </div>
                         <p style="padding:0 20px;">© 兆富通 JF Transcation 2023 | 版本號 : Trlver.21050</p>                 
                    </div>
                </div>
            </div>
            <el-dialog  :visible.sync="Company"  width="800px" :close-on-click-modal="false" >
                <span slot="title" >
                    <i class="iconfont el-icon-al-guanyu"></i>
                    {{noticedata.title}}
                </span>
                <div class="notice_xq"
                     v-loading="footloading"
                     element-loading-background="rgba(255, 255, 255, 0.9)">
                    <!--<div class="notice_xq_title">-->
                        <!--<h2>{{noticedata.title}}</h2>-->
                        <!--<p>{{noticedata.create_time | convTimehms}}</p>-->
                    <!--</div>-->
                    <div class="notice_xq_body" v-html="noticedata.content" >
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
                noticedata:{},
                footloading:false,
            }
        },
        components: {
        },
        methods: {
            getnotice:function (page) {
                var _this=this
                this.Company=true
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/notice",
                    dataType:"json",
                    data:{page:page},
                    beforeSend:function(XMLHttpRequest){
                        _this.footloading=true
                    },
                    success:(res)=>{
                        if(res.success===1)
                        this.footloading=false
                        this.noticedata=res.data[0]
                    }
                })
            }
        },
        computed: {},
        watch: {},
        mounted: function () {

        }
    }
</script>

