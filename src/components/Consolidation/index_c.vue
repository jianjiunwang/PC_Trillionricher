<template>
    <div >
        <div class="indexhead">
            兆富通集運
        </div>
        <div class="indexbody">
            <div style="min-height:100%">
                <el-menu  :default-active="activeIndex" style="height: 100%"  :collapse="isCollapse"  :router="true">
                    <el-menu-item index="packagelist">
                        <i class="el-icon-menu"></i>
                        <span slot="title">包裹列表</span>
                    </el-menu-item>
                    <el-menu-item index="orderlist">
                        <i class="el-icon-document"></i>
                        <span slot="title">訂單列表</span>
                    </el-menu-item>
                    <el-menu-item index="address">
                        <i class="el-icon-location"></i>
                        <span slot="title">地址管理</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div style="width: 70%;">
                <router-view></router-view>
            </div>
            <div class="gathbody-right" >
                <div class="gathbody-right-ck hoverxg">
                    <el-tabs v-model="ck_Name" @tab-click="handleClick" >
                        <el-tab-pane label="新深圳倉庫" name="shenzhen" >
                            <div class="ckxx">
                                <ul>
                                    <li> <span>收件人：</span><span>孙凯（0954854515）</span></li>
                                    <li> <span>電  話 ：</span><span>18373017337</span></li>
                                    <li> <span>郵 編 ：</span><span>518000</span></li>
                                    <li>
                                        <span> 地 址 ：</span>
                                        <span style="width: 320px">广东省深圳市宝安区福永街道白石厦工业sssssssssss厂房一栋一楼-175595號</span>
                                    </li>
                                </ul>
                                <el-tabs v-model="ck_type" @tab-click="handleClick" style="margin-top: 20px" >
                                    <el-tab-pane label="新深圳倉庫" name="kyph" >
                                        <div>
                                            <table width="100%" class="cktable">
                                                <tr style="border-bottom: 1px solid #E4E4E4">
                                                    <td colspan="4">不足10公斤加收20派件費</td>
                                                </tr>
                                                <tr>
                                                    <td>服務標準</td>
                                                    <td>站點</td>
                                                    <td>參考時效</td>
                                                    <td>1公斤/元</td>
                                                </tr>
                                                <tr v-for="item in Tolldata.Shenzhen">
                                                    <td>{{ item.standard }}</td>
                                                    <td>{{ item.Site }}</td>
                                                    <td>{{ item.aging}}</td>
                                                    <td>{{ item.unitprice }}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </el-tab-pane>

                                </el-tabs>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'index_c',
        data: function () {
            return {
                isCollapse: true,
                ck_Name:'shenzhen',
                ck_type:'kyph',
                activeIndex:'orderlist',
                Tolldata:{
                  Shenzhen:[
                    {
                      standard:'普貨空運',
                      Site:'義烏正常航班',
                      aging:'2-4天',
                      unitprice:'20（含稅）'
                    },
                    {
                      standard:'普貨空運',
                      Site:'深圳正常航班',
                      aging:'2-4天',
                      unitprice:'21（含稅）'
                    },
                    {
                      standard:'特貨空運',
                      Site:'深圳正常航班',
                      aging:'2-4天',
                      unitprice:'23（含稅）'
                    },
                    {
                      standard:'普貨',
                      Site:'義烏海快',
                      aging:'5-7天',
                      unitprice:'9（含稅）'
                    },
                    {
                      standard:'普貨',
                      Site:'深圳海快',
                      aging:'5-7天',
                      unitprice:'9（含稅）'
                    },
                    {
                      standard:'特貨',
                      Site:'義烏/深圳',
                      aging:'5-7天',
                      unitprice:'10（含稅）'
                    },
                  ]
                }
            }
        },
        components: {},
        methods: {
            handleClick:function() {

            },
        },
        computed: {},
        watch: {
            activeIndex:function (val) {
                console.log(val);
            }
        },
        mounted: function () {

        }
    }
</script>
<style >
    /*公共样式*/
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    html, body{
        min-height: 100%;
    }
    ul {
        list-style: none;
    }

    .indexbody{
        height: 90vh;
        display: flex;
        /*margin-top: 10px;*/
        justify-content: space-between;
    }
    .gathbody-right{
        width: 25%;
    }
    .gathbody-right-gg{
        border: 1px solid #dadbdd;
        border-radius: 5px;
        /*padding: 10px;*/
        font-size: 15px;
    }
    .gathbody-right-gg ul li{
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;

    }
    .gathbody-right-gg ul li a{
        color: #5d7eff;
        font-weight: bold;
    }
    .gathbody-right-gg ul li span{
        font-size: 12px;
    }
    .gathbody-right-ck{
        border-radius: 5px;
        border: 1px solid #dadbdd;
    }

    .ckxx{
        padding: 10px;
    }
    .ckxx ul li{
        display: flex;
        justify-content: left;
        /*margin-bottom:5px;*/
    }
    .ckxx ul li span:nth-child(1){
        width:80px;
    }
    .newadd{
        /*padding:5px 10px 10px;*/
        margin-top: 10px;
        border: 1px solid #dadbdd;
    }
    .el-menu--collapse{
        height: 100%;
    }
    .el-tabs__header{
        background-color:#E4E4E4;
    }
    .cktable{
        border: 0;
        border-collapse: collapse;
        width: 100%;
        text-align: center;
        line-height: 30px;
    }
    .cktable td{
        border: 1px solid rgba(0,0,0,.12);
        padding: 0 5px;
    }
    .indexhead{
        padding: 0 30px;
        font-size: 40px;
        height: 70px;
        background-color: #3d8be9;
        color: aliceblue;
        line-height:70px;
        font-weight: bold;
        /*position: fixed;*/
        /*top: 0;*/
        /*width: 100%;*/
        /*z-index: 99;*/
    }
</style>