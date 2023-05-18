<template>
    <div style="background-color: rgba(222,222,222,1)">
        <Vip-Header v-bind:switch='Msgswitch' @func="showRZ"></Vip-Header>
        <div class="tongzhi">
            <i class="iconfont el-icon-al-xitonggonggao" style="color: #fe5e00;font-size: 20px;margin-left: 10px"></i>
            <span>{{tongzhi_index}}</span>
        </div>
        <div class="vipindex_body">
            <div class="vipindex_body_left">
                <!--会员公告-->
                <div class="hoverxg notice">
                    <div class="nr_top">
                        <div>
                            <i class="iconfont el-icon-al-tongzhigonggao" style="color:#f6895b "></i>
                            <span><b>會員公告</b></span>
                        </div>
                        <el-button type="text" @click="popup.noticeAll = true">
                            <i class="iconfont el-icon-al-caidanzhankai"></i>
                        </el-button>
                    </div>
                    <div class="notice_body">
                        <div class="tz_item" v-for="(val,i) in vipnotice" :key="i" v-if='i<=2' @click="gonggaoxq(val.notice_id)">
                            <span>{{val.title}}</span>
                            <span style="font-size: 12px">{{val.create_time|convTime}}</span>
                        </div>
                    </div>
                </div>
                <!--帮帮宝服务-->
                <div class="hoverxg service">
                    <div class="personal" style="margin-top: 30px;border-bottom: 1px solid #EDB3CB">
                        <i class="iconfont el-icon-al-yingyongAPP" style="color: #D4237A;"></i>
                        <span style="color: #D4237A;"> <b>易支付服務</b></span>
                    </div>
                    <div class="service_body">
                        <ul>
                            <li>
                                <router-link to="/substitute" style="cursor: pointer"><img src="../assets/image/header_img/taobao2.png" alt="" ></router-link >
                                <span>淘寶代付</span>
                            </li>
                            <li>
                                <router-link to="/substitute"><img src="../assets/image/header_img/tianmao2.png" alt=""></router-link>
                                <span>天貓代付</span>
                            </li>
                            <li>
                                <router-link to="/substitute"><img src="../assets/image/header_img/16882.png" alt=""></router-link>
                                <span>阿里代付</span>
                            </li>
                            <!--<li>-->
                            <!--<a @click="godaichu" style="cursor: pointer"><img src="../assets/image/header_img/zhifubao2.png" alt=""></a>-->
                            <!--支付寶儲值-->
                            <!--</li>-->
                            <li>
                                <router-link to="/daichu" style="cursor: pointer"><img src="../assets/image/header_img/zhifubao2.png" alt=""></router-link>
                                <span>支付寶點數代購</span>
                            </li>
                            <li>
                                <a target="_blank" href="https://chrome.google.com/webstore/detail/%E6%98%93%E6%94%AF%E4%BB%98%E4%BB%A3%E4%BB%98%E5%B0%8F%E5%B9%AB%E6%89%8B/ibglbdfdnebojpnldjhknfdaekhbkcgd" style="cursor: pointer"><img src="../assets/image/header_img/chromestore.png" alt=""></a>
                                <span>代付小幫手</span>
                            </li>
                            <li>
                                <a target="_blank" href="https://egopay.1shop.tw/AF606" style="cursor: pointer"><img src="../assets/image/555.png" alt=""></a>
                                <span>限量秒殺</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--交易记录-->
                <div class="hoverxg record">
                    <div class="nr_top" style="margin-top: 30px;border-bottom: 1px solid #008cba;font-size: 13px">
                        <div>
                            <i class="iconfont el-icon-al-liebiao" style="color:#008cba "></i>
                            <span style="color:#008cba "><b>我的訂單</b></span>
                        </div>
                        <div >
                            <router-link to="/record" style="display: flex;justify-content: space-between;align-items: center">
                                <span style="margin-right: 10px;color:#008cba">交易明細</span>
                                <el-button type="text">
                                    <i class="iconfont el-icon-al-caidanzhankai"></i>
                                </el-button>
                            </router-link>
                        </div>
                    </div>
                    <el-tabs v-model="activeName"  style="padding: 0 20px">
                        <el-tab-pane label="代付\支點" name="daifu">
                            <div class="record_body">
                                <div class="r_table">
                                    <ul class="table_header">
                                        <li>服務</li>
                                        <li>訂單編號</li>
                                        <li>訂單金額</li>
                                        <li>匯率</li>
                                        <li>應付新臺幣</li>
                                        <li>完成時間</li>
                                        <li>交易狀態</li>
                                        <li></li>
                                    </ul>
                                    <div class="table_body" v-for="(item,index) in vipdata.order" :key="index" v-if='index<=2'>
                                        <el-tooltip class="item" effect="light" placement="right" popper-class="ordertooltip" >
                                            <div slot="content" >
                                                完成時間 : {{item.update_time |convTimehms}}<br>
                                                創建時間 : {{item.create_time |convTimehms}}<br>
                                                應付新台幣計算公式 : <br>
                                                ￥{{item.robot_rmb}} * {{item.exchange_rate}} =  {{(item.robot_rmb*item.exchange_rate).toFixed(0)}} TWD
                                            </div>
                                            <ul class="ordercolor" >
                                                <!--<li>{{item.payment_method|service}}</li>-->
                                                <li v-if="item.service_type==1">代付</li>
                                                <li v-else-if="item.service_type==2">儲值</li>
                                                <li v-else-if="item.service_type==3">支點</li>
                                                <li v-else-if="item.service_type==4">提現</li>
                                                <li v-else>数据异常</li>
                                                <li>{{item.order_num}}</li>
                                                <li>{{item.robot_rmb}}</li>
                                                <li>{{item.exchange_rate}}</li>
                                                <li>{{item.robot_twd}}</li>
                                                <li>{{item.update_time | convTime}}</li>
                                                <li v-if="item.order_state==0" ><span style="background:#FFA801">正在處理</span></li>
                                                <li v-else-if="item.order_state==3" ><span style="background:#FFA801">等待匯款</span></li>
                                                <li v-else-if="item.order_state==4 || item.order_state==19 || item.order_state==33 || item.order_state==34" >
                                                    <span v-if="item.service_type==1" style="background:#004bd9">代付中</span>
                                                    <span v-if="item.service_type==2" style="background:#004bd9">儲值中</span>
                                                    <span v-if="item.service_type==3" style="background:#004bd9">處理中</span>
                                                    <span v-if="item.service_type==4" style="background:#004bd9">提現中</span>
                                                </li>
                                                <li v-else-if="item.order_state==21" ><span style="background:#004bd9">處理中</span></li>
                                                <li v-else-if="item.order_state==6" ><span style="background:#49B85C">交易成功</span></li>
                                                <li v-else-if="item.order_state==7" ><span style="background:#777A86">取消訂單</span></li>
                                                <li v-else-if="item.order_state==5 ||item.order_state==8 || item.order_state==9 ||item.order_state==10 ||item.order_state==17" >
                                                    <span v-if="item.service_type==1" style="background:#ff0004">代付失敗</span>
                                                    <span v-if="item.service_type==2" style="background:#ff0004">儲值失敗</span>
                                                    <span v-if="item.service_type==3" style="background:#ff0004">處理失敗</span>
                                                    <span v-if="item.service_type==4" style="background:#ff0004">提現失敗</span>
                                                </li>
                                                <li v-else-if="item.order_state==11" ><span style="background:#a66cb9">退款成功</span></li>
                                                <li v-else-if="item.order_state==12" ><span style="background:#f62400">申请退款</span></li>
                                                <li v-else-if="item.order_state==13" ><span style="background:#49B85C">單筆退款</span></li>
                                                <li v-else-if="item.order_state==14 || item.order_state==15 ||item.order_state==16" ><span style="background:#FF5000" @click="yanzheng(item.kadan)">請做驗證</span></li>
                                                <!--<li v-else-if="item.order_state==15" ><span style="background:#49b85c">提現成功</span></li>-->
                                                <!--<li v-else-if="item.order_state==16" ><span style="background:#ff5000">提現失敗</span></li>-->
                                                <li v-else-if="item.order_state==18" ><span style="background:#ff5000">交易失敗</span></li>
                                                <li v-else><span style="background: #000000">數據異常</span></li>
                                                <li >
                                                    <el-tooltip class="item" effect="dark" content="查看詳情" placement="bottom">
                                                        <i class="iconfont el-icon-al-qingdan iconhover" @click="goOrderData(item.order_id) "></i>
                                                    </el-tooltip>
                                                </li>
                                            </ul>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark"  placement="bottom">
                                            <div slot="content">
                                                手續費 : 0 <br>
                                                支付寶帳號 : {{item.alipay_name+item.alipay_num}}<br>
                                                訂單金額 : {{item.robot_rmb}}<br>
                                                商品明細 : <br> <span v-for="(val,i) in item.product_name" :key="i">{{val.product_name+'￥'+val.product_price}} <br></span>
                                            </div>
                                            <div class="ordercolor" v-if="item.service_type==1">{{(item.pay_url).substring(0,50)}}...</div>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="代購" name="daigou">
                            <div style="padding:10px 10px 0 10px;border: 1px solid #E7E7E7;font-size: 14px;margin-bottom: 20px">
                                <table   rules=none  >
                                    <tr style="background-color: #E7E7E7;height: 35px">
                                        <th style="width: 100px">服務</th>
                                        <th style="width: 250px">訂單編號</th>
                                        <th style="width: 150px">商品金額(新台幣)</th>
                                        <th style="width: 100px">交易時間</th>
                                        <th style="width: 150px">交易狀態</th>
                                        <td width="30"></td>
                                    </tr>
                                    <tr style="text-align: center;height: 50px;border-bottom:1px solid #E7E7E7" v-for="(item,index) in storedata"  v-if="index<3">
                                        <td>代購</td>
                                        <td>{{item.order_num}}</td>
                                        <td>{{item.order_twd}}</td>
                                        <td>{{item.create_time| convTime}}</td>
                                        <td>
                                            <!--<span style="background-color: #44e02b;padding: 5px 10px;border-radius: 5px;font-size: 12px">正在派送中</span>-->
                                            <span v-if="item.order_state==0" style="background:#FFA801;padding: 5px 10px;border-radius: 5px;font-size: 12px">等待付款</span>
                                            <span v-if="item.order_state==1" style="background:#aaff11;padding: 5px 10px;border-radius: 5px;font-size: 12px">等待出货</span>
                                            <span v-if="item.order_state==2" style="background:#0083ff;padding: 5px 10px;border-radius: 5px;font-size: 12px">理貨中</span>
                                            <span v-if="item.order_state==3" style="background:#45ff01;padding: 5px 10px;border-radius: 5px;font-size: 12px">出貨中</span>
                                            <span v-if="item.order_state==4" style="background:#ff0000;padding: 5px 10px;border-radius: 5px;font-size: 12px">退貨中</span>
                                            <span v-if="item.order_state==5" style="background:#ff0005;padding: 5px 10px;border-radius: 5px;font-size: 12px">拒绝退货</span>
                                            <span v-if="item.order_state==6" style="background:#ff490b;padding: 5px 10px;border-radius: 5px;font-size: 12px">已退貨</span>
                                            <span v-if="item.order_state==7" style="background:#7bff68;padding: 5px 10px;border-radius: 5px;font-size: 12px">取消交易</span>
                                            <span v-if="item.order_state==8" style="background:#45ff01;padding: 5px 10px;border-radius: 5px;font-size: 12px">交易完成</span>
                                            <span v-if="item.order_state==9" style="background:#ff0012;padding: 5px 10px;border-radius: 5px;font-size: 12px">交易關閉</span>
                                            <span v-if="item.order_state==9" style="background:#49ff00;padding: 5px 10px;border-radius: 5px;font-size: 12px">已退款</span>
                                        </td>
                                        <td style="text-align: left">
                                            <el-tooltip class="item" effect="dark" content="查看詳情" placement="bottom">
                                                <i class="iconfont el-icon-al-qingdan iconhover" @click="goOrderData_cmy(item.order_id) "></i>
                                            </el-tooltip>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="vipindex_body_right hoverxg">
                <div class="personal" >
                    <i class="iconfont el-icon-al-fuwuzhuce" style="color: #6f85bf;margin-top: 2px"></i>
                    <span style="font-size: 14px"><b>會員資料</b></span>
                </div>
                <div class="right">
                    <div class="details">
                        <div style="position: relative" v-on:mouseover="overimguser" v-on:mouseout="outimguser">
                            <div class="Avatar">
                                <img :src="vipdata.head_portrait" alt="" >
                            </div>
                            <div class="up_userimg" v-show="showuserimg">
                                <span @click="popup.Avatar=true">更换</span>
                            </div>
                        </div>
                        <div>
                            <span v-if="merber_name!==undefined">{{merber_nickname}}</span>
                            <span v-else>{{ merber_name }}</span>
                            <span style="cursor:pointer"><a @click="popup.upDataUser = true">編輯個人資料</a></span>
                            <ul>
                                <li v-if="vipdata.authentication==1">
                                    <el-tooltip class="item" effect="dark" content="未認證" placement="bottom">
                                        <el-button @click="popup.userId = true">
                                            <img src="../assets/image/name.png" alt="">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                                <li v-if="vipdata.authentication==2">
                                    <el-tooltip class="item" effect="dark" content="認證中" placement="bottom">
                                        <el-button style="background: #ff9f23" >
                                            <img src="../assets/image/name.png" alt="">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                                <li v-if="vipdata.authentication==3">
                                    <el-tooltip class="item" effect="dark" content="身份認證已完成" placement="bottom">
                                        <el-button style="background: #19BE6B">
                                            <img src="../assets/image/name.png" alt="">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                                <li v-if="vipdata.authentication==4">
                                    <el-tooltip class="item" effect="dark" content="身份認證失敗請重新認證" placement="bottom">
                                        <el-button style="background: #ff090c" @click="popup.userId = true">
                                            <img src="../assets/image/name.png" alt="">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                                <li>
                                    <el-tooltip style="background: #19BE6B" class="item" effect="dark" content="手機號碼已認證" placement="bottom">
                                        <el-button>
                                            <img src="../assets/image/phone.png" alt="">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                                <!--<li>-->
                                <!--<el-tooltip class="item" effect="dark" content="超商未認證" placement="bottom">-->
                                <!--<el-button>-->
                                <!--<img src="../assets/image/shangdian.png" alt="">-->
                                <!--</el-button>-->
                                <!--</el-tooltip>-->
                                <!--</li>-->
                                <li v-if="vipdata.fileverify_authentication==0">
                                    <el-tooltip class="item" effect="dark" content="防洗錢聲明書未上傳" placement="bottom">
                                        <el-button @click="popup.Fileupload=true">
                                            <img src="../assets/image/gwb.png" alt="">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                                <li v-if="vipdata.fileverify_authentication==1">
                                    <el-tooltip class="item" effect="dark" content="防洗錢聲明書認證中" placement="bottom">
                                        <el-button  style="background: #ff9f23">
                                            <img src="../assets/image/gwb.png" alt="">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                                <li v-if="vipdata.fileverify_authentication==2">
                                    <el-tooltip class="item" effect="dark" content="防洗錢聲明書已認證" placement="bottom">
                                        <el-button style="background: #19BE6B">
                                            <img src="../assets/image/gwb.png" alt="">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                                <li v-if="vipdata.fileverify_authentication==3">
                                    <el-tooltip class="item" effect="dark" content="防洗錢檔案認證失敗,請重新認證" placement="bottom">
                                        <el-button @click="popup.Fileupload=true" style="background: #ff090c">
                                            <img src="../assets/image/gwb.png" alt="">
                                        </el-button>
                                    </el-tooltip>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="balance">
                        <div>
                            <img src="../assets/image/rmb.png" alt="">
                            <span>E幣退款 : &nbsp;</span><span class="font_color">{{(Number(vipdata.r_money)).toFixed(1)}}</span>
                        </div>
                        <div>
                            <!--<router-link to="/stored" style="text-decoration:underline;color: #31b0d5;margin-right: 10px">儲值E幣</router-link>-->
                            <router-link to="/recordrb" style="text-decoration:underline;color: #31b0d5">交易明細</router-link>
                        </div>
                    </div>
                    <p style="font-size: 12px;margin-left: 22px;font-weight: bold;padding-top: 2px">*本功能不提供儲值*</p>
                    <div class="bank">
                        <!--银行账户-->
                        <!--<div>-->
                        <!--<div>-->
                        <!--<span><b>提現銀行帳戶</b></span>-->
                        <!--<span @click="bank_state" class="moveradd" >-->
                        <!--<span><b>新增</b></span>-->
                        <!--<i class="iconfont el-icon-al-shuliang-zengjia"></i>-->
                        <!--</span>-->
                        <!--</div>-->
                        <!--<div v-for="(item,index) in vipdata.bank" :key="index" v-if='index<=2' style="display: flex;justify-content: space-between;margin-right: 10px">-->
                        <!--<span>-->
                        <!--<el-tooltip class="item" effect="dark" content="認證成功" placement="bottom">-->
                        <!--<i class="iconfont el-icon-al-duihao" style="color:#19be6b;margin-right: 10px"></i>-->
                        <!--</el-tooltip>-->
                        <!--<span>{{item.bank_code}}</span>-->
                        <!--<span>{{item.bank_name}}</span>-->
                        <!--<span>{{merber_name}}</span>-->
                        <!--<span>{{item.card_no}}</span>-->
                        <!--</span>-->
                        <!--<a  class="moverdelete" @click="deletezfb_Bank(item.card_no,'bank')"><i class="iconfont el-icon-al-shanchu" ></i></a>-->
                        <!--</div>-->
                        <!--<div v-if="vipdata.defeated_bank.is_authentication==1" style="display: flex;justify-content: space-between;margin-right: 10px" >-->
                        <!--<span>-->
                        <!--<el-tooltip class="item" effect="dark" content="正在人工驗證中" placement="bottom">-->
                        <!--<i class="iconfont el-icon-al-jinhangzhong" style="color: #f7ed2e;margin-right: 10px"></i>-->
                        <!--</el-tooltip>-->
                        <!--<span>{{vipdata.defeated_bank.bank_code}}</span>-->
                        <!--<span>{{vipdata.defeated_bank.bank_name}}</span>-->
                        <!--<span>{{merber_name}}</span>-->
                        <!--<span>{{vipdata.defeated_bank.card_no}}</span>-->
                        <!--</span>-->
                        <!--</div>-->
                        <!--<div v-else-if="vipdata.defeated_bank.is_authentication==3" style="display: flex;justify-content: space-between;margin-right: 10px" >-->
                        <!--<span>-->
                        <!--<el-tooltip class="item" effect="dark" content="認證失敗" placement="bottom">-->
                        <!--<i class="iconfont el-icon-al-error" style="color: #ff090c;margin-right: 10px"></i>-->
                        <!--</el-tooltip>-->
                        <!--<span>{{vipdata.defeated_bank.bank_code}}</span>-->
                        <!--<span>{{vipdata.defeated_bank.bank_name}}</span>-->
                        <!--<span>{{merber_name}}</span>-->
                        <!--<span>{{vipdata.defeated_bank.card_no}}</span>-->
                        <!--</span>-->
                        <!--<a  class="moverdelete" @click="deletezfb_Bank(vipdata.defeated_bank.card_no,'bank')"><i class="iconfont el-icon-al-shanchu" ></i></a>-->
                        <!--</div>-->
                        <!--<div v-else></div>-->
                        <!--</div>-->
                        <!--支付宝账户-->
                        <div>
                            <div>
                                <span><b>支付寶帳戶</b></span>
                                <span type="text" @click="popup.zhifubao = true" class="moveradd">
                                        <span ><b>新增</b></span>
                                        <i class="iconfont el-icon-al-shuliang-zengjia"></i>
                                    </span>
                            </div>
                            <div v-for="(val) in vipdata.alipay"    style="display: flex;justify-content: space-between;margin-right: 10px" >
                                    <span >
                                        <el-tooltip class="item" effect="dark" content="認證成功" placement="bottom">
                                            <i class="iconfont el-icon-al-duihao" style="color:#19be6b;margin-right: 10px"></i>
                                        </el-tooltip>
                                        <span>{{val.authentication_name}}</span>
                                        <span>({{val.alipay_num}})</span>
                                    </span>
                                <a class="moverdelete" @click="deletezfb_Bank(val.alipay_num,'alipay')"><i class="iconfont el-icon-al-shanchu"></i></a>
                            </div>
                            <div  v-for="(val,i) in vipdata.defeated_alipay " :key='i'  style="display: flex;justify-content: space-between;margin-right: 10px" >
                                    <span>
                                        <el-tooltip class="item" effect="dark" content="認證失敗" placement="bottom">
                                             <i class="iconfont el-icon-al-error" style="color: #ff090c;margin-right: 10px"></i>
                                        </el-tooltip>
                                        <span >
                                            {{val.alipay_num}}
                                            <!--<i title="重新檢測" class="el-icon-refresh" style="font-size: 16px;font-weight: bold;margin-left: 10px;cursor: pointer" @click="up_Addzfb(val.alipay_num)"></i>-->
                                        </span>
                                    </span>
                                <a class="moverdelete" @click="deletezfb_Bank(val.alipay_num,'alipay')"><i class="iconfont el-icon-al-shanchu"></i></a>
                            </div>
                        </div>
                    </div>
                    <!--<div class="bank">-->
                    <!--<div>-->
                    <!--<div>-->
                    <!--<span><b>臺灣收件地址</b></span>-->
                    <!--<span type="text" class="moveradd" @click="popup.Address_TW=true">-->
                    <!--<span ><b>新增</b></span>-->
                    <!--<i class="iconfont el-icon-al-shuliang-zengjia"></i>-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--<div style="display: flex;justify-content: space-between" v-for="item in vipdata.site">-->
                    <!--<span>{{(item.city+item.country+item.road+item.address).substr(0,14)+'...'}}</span>-->
                    <!--<p  v-if="item.default_address==1" style="width: 40px;background-color: #efef96;border-radius: 20px;text-align: center" >預設</p>-->
                    <!--<span>-->
                    <!--<a class="moverupdata" style="margin-right: 10px" @click="edit_site(item.city,item.country,item.road,item.address,item.site_id,item.default_address,item.recipients,item.recipients_phone)"><i class="iconfont el-icon-al-bianji"></i></a>-->
                    <!--<a class="moverdelete"  @click="deletesite(item.site_id)"><i class="iconfont el-icon-al-shanchu"></i></a>-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--<div class="recommend">-->
                    <!--<div>-->
                    <!--<img src="../assets/image/huo.png" alt="" style="margin-left: 10px">-->
                    <!--<span class="font_color">今日精選商品推薦</span>-->
                    <!--</div>-->
                    <!--<div  class="recommend_xq">-->
                    <!--<div></div>-->
                    <!--<div class="recommend_xq_2">-->
                    <!--<span>秋冬季新款情侣风衣外套外套秋冬季新款情-->
                    <!--秋冬季新款情侣风衣外套格子长款</span>-->
                    <!--<span>原價<s>￥169.00</s></span>-->
                    <!--<span>特價<s>￥135.00</s></span>-->
                    <!--<span>券後價 <span>￥135.00</span></span>-->
                    <!--<span>領券購買<img src="../assets/image/youhuijuan.png" alt=""></span>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
        <!---------------------------------------------------------------------------------------->
        <!--新增银行卡弹出框-->
        <el-dialog  :visible.sync="popup.bank" width="900px" :close-on-click-modal="popup.modelon">
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                新增退款提領銀行帳戶
            </span>
            <div class="Bank_card" v-loading="loading">
                <div>
                    <div>
                        <img src="../assets/image/jingao.png" alt="" width="20px" height="20px">&nbsp<span>請上傳您本人銀行存摺正反面或帶有您姓名羅馬拼音之金融卡正反面照片（可遮住信用卡卡號及安全碼）。</span>
                    </div>
                    <div>
                        <img src="../assets/image/jingao.png" alt="" width="20px" height="20px">&nbsp;<span>退款銀行帳號限登記您本人名下之銀行帳號；除公司戶帳號外不接受不屬於您本人之帳號新增。</span>
                    </div>
                    <div>
                        <img src="../assets/image/jingao.png" alt="" width="20px" height="20px">&nbsp;<span>以個人名義註冊欲登記公司戶之帳號者，必須上傳在職相關證明，如：名片、員工識別證、印有公司大小章之在職證明。</span>
                    </div>
                    <div>
                        <img src="../assets/image/jingao.png" alt="" width="20px" height="20px">&nbsp;<span>因E幣為代您買匯為人民幣在支付寶備用之預付金，故E幣退款匯率按申請日之玉山銀行人民幣現金買出匯率計算。</span>
                    </div>
                </div>
                <div>
                    <div style="margin: 30px 0 20px;height: 40px">
                        <p class="selectBank">請選擇銀⾏</p>
                        <el-select v-model="bank" filterable  placeholder="請選擇" >
                            <el-option
                                    v-for="(item) in allback"
                                    :key="item.value"
                                    :label="item.bank_code +'—'+ item.bank_name"
                                    :value="item.bank_code+item.bank_name">
                            </el-option>
                        </el-select>
                    </div>
                    <el-input  :value="merber_name" :disabled="true" style="margin-bottom: 20px">
                        <template slot="prepend">銀行帳戶姓名:</template>
                    </el-input>
                    <br>
                    <el-input placeholder="請輸入完整銀行帳號" v-model="bankcard.card_no">
                        <template slot="prepend">請輸入銀行帳戶:</template>
                    </el-input>
                </div>
                <div class="inputidentity" style="margin-top: 20px">
                    <div>
                        <div style="width:100%;height: 230px;border: 1px solid #e7e7e7;position: relative">
                            <p v-show="imageUrl3" style="color: #FE0000;z-index: 10;;position:absolute; top: 100px;left: 70px;font-size: 20px;font-weight: bold;opacity: 0.5">僅供EGP易支付審核認證使用</p>
                            <div style="width: 100%;height: 230px;position: absolute;top: 0;z-index: 999"></div>
                            <img :src="imageUrl3" alt="" width="100%" height="100%">
                        </div>
                        <div style="position: relative">
                            <input type="file" class="inputfr" id="bank_front"  accept=".jpg,.jpeg,.png" @change="onchange(3)">
                            <el-button type="primary">點擊上傳卡片或存摺正面照</el-button>
                        </div>
                    </div>
                    <div>
                        <div style="width:100%;height: 230px;border: 1px solid #e7e7e7;position: relative">
                            <p v-show="imageUrl4" style="color: #FE0000;z-index: 10;;position:absolute; top: 100px;left: 70px;font-size: 20px;font-weight: bold;opacity: 0.5">僅供EGP易支付審核認證使用</p>
                            <img :src="imageUrl4" alt="" width="100%" height="100%">
                            <div style="width: 100%;height: 230px;position: absolute;top: 0;z-index: 999"></div>
                        </div>
                        <div style="position: relative">
                            <input type="file"  id="bank_reverse"  t="onchange(4)">
                            <el-button type="primary">點擊上傳卡片或存摺反面照</el-button>
                        </div>
                    </div>
                </div>
                <div style="display: flex;flex-direction:row-reverse;margin:10px 0" >
                    <div style="display: flex">
                        <div>
                            <p style="color: #FE0000">上傳的照片請勿遮蓋姓名及帳戶號碼，審核均為人工處理，敬請耐心等待。</p>
                            <p style="text-align: right">需要上傳名片或員工識別證照片請&nbsp;&nbsp; <a style="font-weight: bold;color: #5a7fef" @click="ContactCustomerService">點此處聯絡客服</a> 。</p>
                        </div>
                        <el-button type="primary" @click="AddBankcard">送出驗證</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <!--新增支付宝弹出框-->
        <el-dialog  :visible.sync="popup.zhifubao" width="600px" class="pzhidubao" :close-on-click-modal="popup.modelon" @close="deletezfbdata">
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                新增支付寶帳戶
            </span>
            <el-tabs type="border-card" >
                <el-tab-pane label="新增個人支付寶">
                    <div class="zhifubao" >
                        <div class="zhifubao_tishi" style="color: #FE0000" >* 易支付提醒您~! ! 新增非本人支付寶帳戶會有資金風險，請小心謹慎!</div>
                        <div class="zhifubao_tishi" style="color: #FE0000" >
                            支付寶格式錯誤（請使用Email)，請參照幫助中心 <br>
                            <a href="https://www.egopay.com.tw/dist/#/helpcenter?notice_id=49" target="_blank"  style="color: #FE0000">https://www.egopay.com.tw/dist/#/helpcenter?notice_id=49</a>
                        </div>
                        <div class="zhifubao_input">
                            <span style="width: 40%;font-size: 13px">真實姓名（簡體）</span>
                            <el-input   placeholder="請輸入您支付宝帳戶簡體姓名" v-model="alipay_name" :disabled="zhifubao_inputbled"></el-input>
                        </div>
                        <div class="zhifubao_input">
                            <span style="width: 40%;font-size: 13px">支付寶帳戶</span>
                            <el-input   placeholder="請輸入您已實名的支付寶帳號" v-model="insertzfb" :disabled="zhifubao_inputbled"></el-input>
                        </div>
                        <div v-show="zhifubao_yztextshow">
                            <div  class="zhifubao_yztext" style="background-color:#EAF4FE;">我們正在努力檢測您的支付寶帳戶認證情況，請耐心等待{{zhifubao_time}}秒</div>
                            <div   class="zhifubao_yztext">{{insertzfb}} &nbsp&nbsp<span style="color:#409EFF">檢查中，請稍後...</span></div>
                        </div>
                        <div v-show="zhifubao_yztexterror"  class="zhifubao_yztext" style="color: #FE0000;font-size: 16px;font-weight: bold"> <span v-show="zhifubao_huiying"  style="font-weight: bold;color: #0f0f0f">支付寶回應 : </span>{{zhifubao_errortext}}</div>
                        <div class="zhifubao_sub">
                            <el-button type="primary"  @click="Addzfb(1)" :disabled="zhifubao_subbled">確認並送出</el-button>
                            <div style="display: flex;align-items: center">  <el-checkbox v-model="RTbook"></el-checkbox>我已閱讀並同意 <a  style="font-weight: bold;color: #5a7fef"  @click="RiskTakingBook = true">【風險承擔同意書】</a></div>
                            <!--<el-button type=" <el-checkbox v-model="isconfirm"danger"  @click="Addzfb">删除账户</el-button>-->
                        </div>
                    </div>
                </el-tab-pane>
                <!--<el-tab-pane label="添加公司支付寶">-->
                <!--<div class="zhifubao" >-->
                <!--<div class="zhifubao_tishi" >請輸入與支付寶企業號相同的公司全名（簡體），如有問題請向客服詢問</div>-->
                <!--<div class="zhifubao_input">-->
                <!--<span style="width: 40%;font-size: 13px">請輸入支付寶帳戶</span>-->
                <!--<el-input   placeholder="請輸入支付寶帳戶" v-model="insertzfbgs" :disabled="zhifubaogs_inputbled"></el-input>-->
                <!--</div>-->
                <!--<div class="zhifubao_input">-->
                <!--<span style="width: 40%;font-size: 13px">請輸入公司全名（簡體）</span>-->
                <!--<el-input   placeholder="請輸入公司全名（簡體）" v-model="insertzfbname" :disabled="zhifubaogs_inputbled"></el-input>-->
                <!--</div>-->
                <!--<div v-show="zhifubaogs_yztextshow" class="zhifubao_yztext" style="background-color:#EAF4FE;">我們正在努力檢測您的支付寶帳戶認證情況，請耐心等待{{zhifubao_time}}秒</div>-->
                <!--<div v-show="zhifubaogs_yztextshow"  class="zhifubao_yztext">{{insertzfbgs}} &nbsp&nbsp<span style="color:#409EFF">檢查中，請稍後...</span></div>-->
                <!--<div v-show="zhifubaogs_yztexterror"  class="zhifubao_yztext" style="color: #FE0000;font-size: 16px;font-weight: bold">{{zhifubaogs_errortext}}</div>-->
                <!--<div></div>-->
                <!--<div class="zhifubao_sub">-->
                <!--<el-button type="primary"  @click="Addzfb(2)" :disabled="zhifubao_subbled">確認並送出</el-button>-->
                <!--&lt;!&ndash;<el-button type="danger"  @click="Addzfb">删除账户</el-button>&ndash;&gt;-->
                <!--</div>-->
                <!--</div>-->
                <!--</el-tab-pane>-->
            </el-tabs>
        </el-dialog>
        <!--新增地址弹出框-->
        <el-dialog  :visible.sync="popup.Address_TW" width="800px"  :close-on-click-modal="popup.modelon" >
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                新增臺灣收件地址
            </span>
            <div style="padding: 15px">
                <el-checkbox v-model="isdefault" size="medium" border>設為預定地址</el-checkbox>
                <div style="margin-top: 30px;">
                    <el-input placeholder="请输入收件人" v-model="Addressee" style="width: 300px;">
                        <template slot="prepend">收件人</template>
                    </el-input>
                    <br>
                    <br>
                    <el-input placeholder="请输入手機號" v-model="Addphone" style="width: 300px">
                        <template slot="prepend">手機號</template>
                    </el-input>
                    <br><br>
                    <el-input placeholder="请输入身份證" v-model="Address_card" style="width: 300px">
                        <template slot="prepend">身份證</template>
                    </el-input>
                </div>

                <div style="margin-top: 30px">
                    <el-select v-model="City_county" placeholder="請選擇市/縣"  filterable style="width: 200px" @change="citychange" @focus="cityfocus">
                        <el-option
                                v-for="item in C_cuyoptions"
                                :key="item.country"
                                :label="item.country"
                                :value="item.country">
                        </el-option>
                    </el-select>
                    市/縣
                    <el-select v-model="District_Town" placeholder="請選擇區/鎮"  filterable style="width: 200px" @change="dtownchange" @focus="dtownfocus">
                        <el-option
                                v-for="item in D_townoptions"
                                :key="item.country"
                                :label="item.country"
                                :value="item.country">
                        </el-option>
                    </el-select>
                    區/鎮
                    <el-select v-model="Street" placeholder="請選擇路/街道" filterable style="width: 200px">
                        <el-option
                                v-for="item in Streetoptions"
                                :key="item.road"
                                :label="item.road"
                                :value="item.road">
                        </el-option>
                    </el-select>
                    路/街道
                </div>

                <div style="margin-top: 30px">
                    詳細地址
                    <el-input
                            type="textarea"
                            placeholder="請輸入詳細地址"
                            v-model="Detailedaddress"
                            maxlength="50"
                            show-word-limit
                    >
                    </el-input>
                </div>
                <div style="display: flex;flex-direction:row-reverse;margin-top:10px" >
                    <el-button type="primary" @click="add_site">送出驗證</el-button>
                </div>
            </div>
        </el-dialog>
        <!--会员公告（更多）弹出框-->
        <el-dialog  :visible.sync="popup.noticeAll"  width="50%" :close-on-click-modal="popup.modelon">
            <span slot="title">
                <i class="iconfont el-icon-al-guanyu"></i>
                會員公告
            </span>
            <div style="height: 500px;overflow:auto;" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.9)">
                <div style="padding: 10px 20px;border-bottom: 1px solid #E7E7E7;display: flex;justify-content: space-between" v-for="(val,index) in vipnotice" :key="index" @click="gonggaoxq(val.notice_id)">
                    <span style="cursor: pointer">{{val.title}}</span>
                    <span>{{val.create_time|convTime}}</span>
                </div>
            </div>
        </el-dialog>
        <!--会员公告详情弹出框-->
        <el-dialog  :visible.sync="popup.noticeXq"  width="900px" :close-on-click-modal="popup.modelon">
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                會員公告
            </span>
            <div class="notice_xq">
                <div class="notice_xq"
                     v-loading="loading"
                     element-loading-background="rgba(255, 255, 255, 0.9)">
                    <div class="notice_xq_title">
                        <h2>{{vipnoticedata.title}}</h2>
                        <p>{{vipnoticedata.create_time | convTimehms}}</p>
                    </div>
                    <div class="notice_xq_body" v-html="vipnoticedata.content" >
                    </div>
                    <div class="notice_xq_out">
                        <el-button type="primary" @click="popup.noticeXq=false" >離開</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <!--编辑个人资料弹出框-->
        <el-dialog  :visible.sync="popup.upDataUser" title="編輯個人資料" width="600px" :close-on-click-modal="popup.modelon" >
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                編輯個人資料
            </span>
            <div class="personal_data">
                <el-tabs  tab-position="left" v-model="upuserdata">
                    <el-tab-pane label="個人資料">
                        <ul class="userdata">
                            <li>
                                <span>暱稱:</span>
                                <span>{{personal.merber_nickname}}</span>
                            </li>
                            <li>
                                <span>真實姓名:</span>
                                <span>{{personal.merber_name}}</span>
                            </li>
                            <li>
                                <span>手機號:</span>
                                <span>{{personal.merber_phone}}</span>
                            </li>
                            <li>
                                <span>E-mail:</span>
                                <span>{{personal.merber_email}}</span>
                            </li>
                            <li>
                                <span>會員編號:</span>
                                <span>{{personal.merber_num}}</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="修改暱稱" tab-position="left" name="upuname">
                        <div class="up_phone">
                            <el-form :model="ruleForm" :rules="rulesuname" ref="rulesuname" >
                                <ul>
                                    <li>
                                        <el-form-item label="目前暱稱" >
                                            {{personal.merber_nickname}}
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="新暱稱"  prop="uname" >
                                            <el-input maxlength="18"  type="text" placeholder=""  v-model="ruleForm.uname"></el-input>
                                        </el-form-item>
                                    </li>
                                </ul>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="修改密碼" tab-position="left" name="uppwd">
                        <div class="up_pwd">
                            <el-form :model="ruleForm" :rules="rulespwd" ref="rulespwd" >
                                <ul>
                                    <li>
                                        <el-form-item label="目前密碼"  prop="password" >
                                            <el-input  type="password" placeholder="" required v-model="ruleForm.password"></el-input>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="驗 證 碼" prop="merber_phcode" >
                                            <el-input maxlength="6"  placeholder="" v-model="ruleForm.merber_phcode" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-button class="yzm" type="primary" size="small" @click="dragverify = true" :disabled="yzmdata.disabled">{{yzmdata.btntext}}</el-button>
                                    </li>
                                    <li>
                                        <el-form-item  label="設定密碼"  prop="merber_password" >
                                            <el-input type="password" v-model="ruleForm.merber_password" placeholder="設定登入密碼"></el-input>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="再次輸入密碼" prop="checkPass">
                                            <el-input type="password" v-model="ruleForm.checkPass" placeholder="請再次輸入登入密碼"></el-input>
                                        </el-form-item>
                                    </li>
                                </ul>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="修改E-mail" name="upemail">
                        <el-form  :model="ruleForm" :rules="rulesmail" ref="rulesmail" >
                            <div class="up_mali">
                                <ul >
                                    <li>
                                        <el-form-item label="E-mail:" prop="merber_email" >
                                            <el-input v-model="ruleForm.merber_email" placeholder="請輸入新的E-mail"></el-input>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="驗 證 碼" prop="merber_phcode" >
                                            <el-input maxlength="6"  placeholder="" v-model="ruleForm.merber_phcode" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-button class="yzm" type="primary" size="small" @click="dragverify = true" :disabled="yzmdata.disabled">{{yzmdata.btntext}}</el-button>
                                    </li>
                                </ul>
                            </div>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="修改手機號" name="upphone">
                        <el-form :model="ruleForm" :rules="rulesphone" ref="rulesphone" >
                            <div class="up_phone">
                                <div>
                                    <el-form-item label="手機號碼" prop="merber_phone1" >
                                        <el-input v-model="ruleForm.merber_phone1" placeholder="請填入本人手機號碼"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item label="驗 證 碼"  maxlength="6"  prop="merber_phcode1" >
                                        <el-input   placeholder="請輸入簡訊驗證碼" v-model="ruleForm.merber_phcode1" ></el-input>
                                    </el-form-item>
                                    <el-button type="primary" size="small" @click="updataphoneyzm" :disabled="yzmdata.disabled">{{yzmdata.btntext}}</el-button>
                                </div>
                            </div>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <div class="subupdata">
                    <el-button type="primary" size="medium" @click="updata_user">送出</el-button>
                </div>
            </div>
        </el-dialog>
        <!--身份认证弹出框-->
        <el-dialog  :visible.sync="popup.userId" title="會員身份認證" width="900px" :close-on-click-modal="popup.modelon" >
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                會員身份認證
            </span>
            <div class="shenfen">
                <div>
                    因應金融監督管理委員會及銀行要求，避免第三方詐騙與有心人士利用本公司作為洗錢管道，
                    易支付有責任確認需要代收付款項的網站會員真實身分，請您如實提供身份證件，證明註冊者是您本人。

                    您在易支付網站內所填寫及上傳的所有圖資，易支付將登記造冊，集中保密管理，以便金管會備查。
                    易支付若對您的個資做出超出《個人資料管理法》規範之事、挪做他用，願負一切法律責任。
                </div>
                <div>
                    請依據所持國民身份證記載的【身份證字號】及【發證日期】輸入資料。<br>
                    每日認證錯誤2次後，此身份證字號將暫時無法進行認證，<span style="color: red">圖片格式僅限:JPG、PNG、GIF檔。</span>
                </div>
                <el-form :model="identitydata" :rules="identityReg" ref="identityReg" label-width="120px"  >
                    <div class="shenfen_xq">
                        <el-form-item label="身份證字號:" prop="identity_num">
                            <el-input placeholder="" v-model="identitydata.identity_num" name="identity_num" style="margin-left: 30px;width: 200px"></el-input>
                        </el-form-item>
                        <el-form-item label="發證地點 :" prop="region">
                            <el-select v-model="identitydata.region" placeholder="" style="margin-left: 30px;width: 200px">
                                <el-option
                                        v-for="item in Location"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div class="date" style="display: flex;">
                            <span style="width:108px;height:40px;line-height:40px;text-align: right;padding: 0 12px 0 0;"> <span style="color: #f56c6c;">*</span> 發證日期 :</span>
                            <span style="padding-top: 10px">民國</span>
                            <el-form-item  prop="year" >

                                <el-select v-model="identitydata.year" placeholder="" style="width: 70px;">
                                    <el-option
                                            v-for="item in yearoptions"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                                年
                            </el-form-item>
                            <el-form-item  prop="month" >
                                <el-select v-model="identitydata.month" placeholder="" style="width: 70px;">
                                    <el-option
                                            v-for="item in 12"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                                月
                            </el-form-item>
                            <el-form-item  prop="day" >
                                <el-select v-model="identitydata.day" placeholder="" style="width: 70px;">
                                    <el-option
                                            v-for="item in 31"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                                日
                            </el-form-item>
                        </div>
                        <el-form-item label="領補換類型 :" prop="identity_type">
                            <el-radio-group v-model="identitydata.identity_type">
                                <el-radio label="初發" name="identity_type" border style="margin-left: 30px;">初發</el-radio>
                                <el-radio label="換發" name="identity_type" border>換發</el-radio>
                                <el-radio label="補發" name="identity_type" border>補發</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="inputidentity">
                    <div>
                        <div style="width:100%;height: 230px;border: 1px solid #e7e7e7;position: relative">
                            <img :src="imageUrl1" alt="" width="100%" height="100%">
                            <p v-show="imageUrl1" style="color: #FE0000;z-index: 10;;position:absolute; top: 100px;left: 70px;font-size: 20px;font-weight: bold;opacity: 0.5">僅供EGP易支付審核認證使用</p>
                            <div style="width: 100%;height: 230px;position: absolute;top: 0;z-index: 999"></div>
                        </div>
                        <div style="position: relative">
                            <input type="file" class="inputfr" id="identity_front"  accept=".jpg,.png,.gif"  @change="onchange(1)">

                            <el-button type="primary">點擊選擇身份證正面圖片</el-button>
                        </div>
                    </div>
                    <div>
                        <div style="width:100%;height: 230px;border: 1px solid #e7e7e7;position: relative">
                            <img :src="imageUrl2" alt="" width="100%" height="100%">
                            <p v-show="imageUrl2" style="color: #FE0000;z-index: 10;;position:absolute; top: 100px;left: 70px;font-size: 20px;font-weight: bold;opacity: 0.5">僅供EGP易支付審核認證使用</p>
                            <div style="width: 100%;height: 230px;position: absolute;top: 0;z-index: 999"></div>
                        </div>
                        <div style="position: relative">
                            <input type="file"  id="identity_reverse"  accept=".jpg,.png,.gif" @change="onchange(2)">
                            <el-button type="primary">點擊選擇身份證反面圖片</el-button>
                        </div>
                    </div>
                </div>
                <div>
                    <el-button type="primary" @click="submitUpload">確認並送出</el-button>
                </div>
            </div>
        </el-dialog>
        <!--手机号码认证-->
        <el-dialog  :visible.sync="popup.userphone" title="手機認證" width="30%" :close-on-click-modal="popup.modelon">
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                手機認證
            </span>
            <div class="phone">
                <div>
                    <span>手機號碼</span>
                    <span style="font-weight: bold;font-size: 18px;margin-left: 10px">{{personal.merber_phone }}</span>
                </div>
                <div>
                    <span>驗證碼</span>
                    <el-input   placeholder="請輸入6位數的密碼"></el-input>
                    <el-button type="primary">發送驗證碼</el-button>
                </div>
                <div> <el-button type="primary">送出並驗證</el-button></div>
            </div>
        </el-dialog>
        <!--更换头像-->
        <el-dialog  :visible.sync="popup.Avatar" width="300px" :close-on-click-modal="false" class="Avatardialog">
            <div>
                <div class="upAvatar" style="width: 100px;height: 100px">
                    <img :src="Avatarimgurl" alt="">
                </div>
                <div class="upAvatarbutton">
                    <input type="file" id="Avatarimg"  accept=".jpg,.jpeg,.png" @change="onchange(5)">
                    <el-button type="primary">選擇照片</el-button>
                </div>
                <div style="display: flex;flex-direction: column;padding: 10px">
                    <el-button type="primary" @click="upuserAvatar">確認並送出</el-button>
                </div>
            </div>
        </el-dialog>
        <!--文件认证-->
        <el-dialog  :visible.sync="popup.Fileupload" width="700px" :close-on-click-modal="false">
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                防洗錢聲明文檔上傳
            </span>
            <div style="padding: 20px">
                <div class="Tips">
                    <p>1、請先下載防洗錢聲明文件，列印後親簽，或使用APP電子簽名。</p>
                    <p>2、將已簽名文件拍照或擷圖上傳,圖片格式：僅限<span style="color: red">JPG、PNG。</span></p>
                </div>
            </div>
            <div style="padding: 20px;display: flex">
                <div style="width: 50%;">
                    <div style="display: flex;width: 100%;height: 150px;">
                            <img :src="fileimageUrl" alt=""  height="100%" style="margin: 0 auto">
                    </div>
                    <div  class="Choiceimg" style="padding:10px">
                        <input type="file" style="width: 100%"  @change="onchange(6)"  id="imgUpFile" accept=".jpg,.png,">
                        <el-button type="primary" style="width: 100%">點擊選擇圖片</el-button>
                    </div>
                </div>
                <div style="width: 50%;">
                    <p>防洗錢聲明檔請點選以下連結下載</p><br>
                    <a target="_blank" href="https://drive.google.com/file/d/1VqV9qTVqPmvNREA2VvURsDiRs0Y8hJZV/" style="color: #3399FF">【防洗錢聲明文檔】</a><br><br>
                    <a target="_blank" href="https://play.google.com/store/apps/details?id=com.adobe.reader&hl=zh_TW" style="color: #3399FF">【Android : Adobe pdf 簽名App】</a><br><br>
                    <a target="_blank" href="https://itunes.apple.com/tw/app/adobe-acrobat-reader/id469337564?mt=8" style="color: #3399FF">【IOS : Adobe pdf 簽名App】</a><br><br>
                    <p style="color: red;">防洗錢聲明均由人工驗證，請務必簽名後上傳清楚圖檔，以免驗證失敗。</p>
                </div>
            </div>
            <div style="display: flex;flex-direction:row-reverse;padding: 10px;border-top: 1px solid #e7e7e7">
                <el-button type="primary" @click="file_verify">確認並送出</el-button>
            </div>
        </el-dialog>
        <!--风险承担书-->
        <el-dialog  :visible.sync="RiskTakingBook"  width="600px" :close-on-click-modal="false" >
                <span slot="title" >
                    <i class="iconfont el-icon-al-guanyu"></i>
                    風險承擔同意書
                </span>
            <div>
                <div class="ConsentBook" style="padding: 20px 30px;" >
                    <h2 style="">風 險 承 擔 同 意 書 </h2>
                    <p style="margin-top:30px">●  本人已清楚了解在易支付金融科技有限公司（Egopay易支付）為第三方支付公司，只是委託媒介，並非支付寶的合作公司或分公司、與本人轉帳交易對象無任何關係。</p>
                    <p style="">●	本人亦清楚了解，委託Egopay易支付轉帳到不屬於自己的支付寶帳號，進行私人購物消費行為是有風險的。</p>
                    <p style="">●	轉帳到他人支付寶帳號是自身意願，本人同意若之後產生消費糾紛，會自行與對方(廠商或非本人支付寶帳號)聯繫解決問題，Egopay易支付除了提供我本人轉帳的證明之外，並無協助與對方(廠商或非本人支付寶帳號)斡旋協議之義務。</p>
                    <p style="">●	我同意Egopay易支付對本人委託完成履約義務之後，若與對方(廠商或非本人支付寶帳號)之間產生消費糾紛時自行承擔後果。</p>
                    <p style="">●	若有必要請Egopay易支付協助幫忙索償時，我同意Egopay易支付可以按照勞基法向我收取合理的人事服務費用，並非無償協助幫忙。</p>
                </div>
                <div style="display: flex;flex-direction: row-reverse;padding: 10px">
                    <el-button type="primary" @click="RiskTakingBook=false" >離開</el-button>
                </div>
            </div>
        </el-dialog>
        <!--是否有进行过身份、文件认证提示框-->
        <el-dialog  :visible.sync="popup.Verification" width="500px" :close-on-click-modal="false" class="Avatardialog" style="margin-top: 20vh">
            <span slot="title" >
                <i class="iconfont el-icon-al-guanyu"></i>
                提示
            </span>
            <div>
                <p style="font-size: 18px;padding: 10px;line-height: 30px">
                    你尚未通過 <span style="color: #FE0000;font-weight: bold">身份認證</span>、<span style="color: #FE0000;font-weight: bold">文件認證</span>, 請盡速提交。<br>
                    本站與警方165反詐騙中心直接通報，勿存僥倖心態提交假資料。</p>
                <p style="font-size: 18px;padding: 10px;line-height: 20px;text-align: center">審核時間 : 10:00AM~21:00PM</p>
                <div style="display: flex;padding: 10px;flex-direction: row-reverse;">
                    <el-button type="primary" style="margin-left: 10px" @click="gorenzheng(1)">身份認證</el-button>
                    <el-button type="primary"  @click="gorenzheng(2)">文件認證</el-button>
                </div>
            </div>
        </el-dialog>
        <!--发送验证码滑块认证-->
        <el-dialog
                :visible.sync="dragverify"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                style="margin-top: 20vh;"
                width="400px"
        >
            <span slot="title" >
                    <i class="iconfont el-icon-al-guanyu"></i>
                    請進行認證
            </span>
            <div style="padding: 20px 10px;font-size: 18px;font-weight: bold;margin: 0 auto"  >
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
                <div class="slide-verify" :style="{color:textcolor}" >{{msg}}</div>
            </div>
        </el-dialog>
        <!--------------------------------------------------------------------------------------------->
        <!--<el-dialog-->
        <!--title="提示"-->
        <!--:visible.sync="dialogVisible"-->
        <!--:close-on-click-modal="true"-->
        <!--:close-on-press-escape="false"-->
        <!--:show-close="false"-->
        <!--width="30%"-->
        <!--style="margin-top: 20vh"-->
        <!--&gt;-->
        <!--<div style="padding: 30px 20px;font-size: 18px;font-weight: bold">由於虛擬帳號付款系統進行調整，代付及支付寶點數代購服務，將暫時無法提供虛擬帳號進行付款，選擇超商付款者將不受影響，我們將加快調整腳步並恢復服務，造成您的不便我們深感抱歉，也感謝您的諒解。</div>-->
        <!--</el-dialog>-->
        <Footer></Footer>

        <Loading v-show="viploading"></Loading>
    </div>
</template>

<script>

    import Cookies from 'js-cookie'
    import '../assets/js/jquery-3.3.1'
    import '../assets/js/jqueryfrom'
    import COS  from 'cos-js-sdk-v5'

    import '../assets/css/vipindex.css'
    import VipHeader from './vues/VipHeader'
    import Footer from './vues/Footer'
    import Loading from './vues/loading'
    import Common from './vues/Common'

    export default {
        inject:['reload'],

        data: function () {
            var reguname=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('請輸入暱稱'));
                }else {
                    callback()
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('請輸入當前密碼'));
                }else {
                    callback()
                }
            };
            var regpwd =(rule, value, callback) => {
                const phoneReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,20}$/
                if (value === '') {
                    callback(new Error('請輸入新密碼'));
                }
                setTimeout(() => {
                    if (phoneReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('密碼必須由數字和字母組成且6-12位'))
                    }
                }, 100)
            };
            var checkPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('請再次輸入密碼'));
                } else if (value !== this.ruleForm.merber_password) {
                    callback(new Error('兩次輸入密碼不壹致!'));
                } else {
                    callback();
                }}
            var regEmail = (rule, value, callback) => {
                const mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)/g
                if (value==='') {
                    return callback(new Error('郵箱不能為空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    }else {
                        callback(new Error('請輸入正確的E-mail'))
                    }
                },100)
            }
            var regEmailcode=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('驗證碼'));
                }else {
                    callback()
                }
            };
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
            var regphonecode=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('驗證碼'));
                }else {
                    callback()
                }
            }
            var regidnum=(rule, value, callback) => {
                value = value.toUpperCase();
                var reg=/^[A-Z](1|2)\d{8}$/;  //身份證的正規表示式
                var city = [1,10,19,28,37,46,55,64,39,73,82,2,11,20,48,29,38,47,56,65,74,83,21, 3,12,30]

                if (value==="") {
                    return callback(new Error('身份證字號不能為空'))
                }else if(!reg.test( value )){
                    return callback(new Error('身分證字號格式错误'))
                }else {
                    setTimeout(() => {
                        value=value.split('');
                        var total = city[value[0].charCodeAt(0)-65];
                        for(var i=1; i<=8; i++){
                            total += eval(value[i]) * (9 - i);
                        }
                        total += eval(value[9]);
                        if((total%10 == 0 )){
                            callback()
                        }else {
                            callback(new Error('請輸入正確的身分證字號'))
                        }},100)
                }
            }
            var regdate=(rule, value, callback) => {

                if(rule.field=='year' || rule.field=='month' || rule.field=='day'){
                    if (value === '') {
                        callback(new Error('請選擇日期'));
                    }else {
                        callback()
                    }
                }else if(rule.field=='region'){
                    if (value === '') {
                        callback(new Error('請選擇發證地點'));
                    }else {
                        callback()
                    }
                }else if(rule.field=='identity_type'){
                    if (value === '') {
                        callback(new Error('請選擇領補換類型'));
                    }else {
                        callback()
                    }
                }
            };
            return {
                // dialogVisible:true,
                imgurl:[],
                imgfile:[],
                rulespwd: {
                    merber_password: [
                        { required: true, validator: regpwd, trigger: 'blur' }
                    ],
                    password: [
                        { required: true,validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        { required: true,validator: checkPass, trigger: 'blur'}
                    ],
                    merber_phcode:[
                        { required: true, validator: regEmailcode,trigger: 'blur' }
                    ]

                },//个人资料密码验证
                rulesmail: {
                    merber_email: [
                        { required: true, validator: regEmail, trigger: 'blur' }
                    ],
                    merber_phcode:[
                        { required: true, validator: regEmailcode,trigger: 'blur' }
                    ]

                },//个人资料邮箱验证
                rulesphone: {
                    merber_phone1:[
                        { required: true,validator: regPhone, trigger: 'blur' }
                    ],
                    merber_phcode1:[
                        { required: true, validator: regphonecode,trigger: 'blur' }
                    ]

                },//个人资料手机验证
                rulesuname:{
                    uname:[
                        { required: true,validator: reguname, trigger: 'blur' }
                    ],
                },//个人资料昵称验证
                identityReg:{
                    identity_num:[
                        { required: true,validator:regidnum, trigger: 'blur' }
                    ],
                    region:[
                        { required: true,validator:regdate,trigger: 'blur' }
                    ],
                    year:[{ required: true,validator:regdate, trigger: 'blur' }],
                    month:[{ required: true, validator:regdate,trigger: 'blur' }],
                    day:[{ required: true, validator:regdate,trigger: 'blur' }],
                    identity_type:[{ required: true,validator:regdate, trigger: 'blur' }]
                },//身份认证
                identitydata:{
                    identity_num:'',
                    year:'',
                    month:'',
                    day:'',
                    region:'',
                    identity_type: '',//身份认证——身份证类型
                },
                yearoptions:[94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111],
                Location:["北縣","宜縣","桃縣","竹縣","苗縣","中縣","彰縣","投縣","雲縣","嘉縣","南縣","高縣","屏縣","東縣","花縣","澎縣","基市","竹市","嘉市","連江","金門","北市","高市","新北市","中市","南市","桃市"],
                merber_id: Cookies.get('merber_id'),
                merber_name: Cookies.get('merber_name'),
                token: Cookies.get('egopay_key'),
                merber_nickname: Cookies.get('merber_nickname'),
                upuserdata: '', //个人资料数据
                yzmdata:{
                    disabled:false,
                    btntext:'發送驗證碼',
                    time:'60'
                },
                vipdata: {defeated_bank:{}},//会员中心数据
                bank: '',//添加银行卡的银行名称
                insertzfbname: '',//添加公司支付宝，公司名称名称
                alipay_name: '',//添加支付宝姓名
                ruleForm: {
                    uname:'',
                    currentpassword: '',
                    newpassword: '',
                    confirmpassword: '',
                    password: '',
                    merber_password: '',
                    checkPass: '',
                    merber_email: '',
                    merber_phone: '',
                    merber_phcode: '',
                    merber_phone1: '',
                    merber_phcode1: '',
                },//编辑个人资料
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
                    Verification:false,
                    Address_TW:false,
                },//弹出框开关
                Msgswitch:'',//留言开关
                showuserimg: false,
                vipnotice: [], //会员公告
                allback: [], //所有银行数据
                bankcard: [],//银行卡信息显示
                zfbcard: [],//成功的支付宝账号显示
                defeated_alipay: [{}],//失败的的支付宝账号显示
                TransactionRecord: [],//首页交易记录显示
                personal: {},//个人资料数据
                identity_num: '',//身份认证——身份证号码
                birthDate: '',//身份认证——发放日期
                imageUrl1: '', //身份认证——正面图片预览地址
                imageUrl2: '',//身份认证——反面图片预览地址
                identity_fronturl:'',//身份证正面上传地址
                identity_reverseurl:'',//身份证反面上传地址
                identity_frontfile:'',//身份证正面图片对象
                identity_reversefile:'',//身份证反面上传对象
                fileimageUrl:'',//文件认证预览地址
                fileverifyfile:'',//文件认证图片上传地址
                imageUrl3: '',//银行认证——反面图片预览地址
                imageUrl4: '',//银行认证——反面图片预览地址
                Avatarimgurl: '',//头像地址
                r_money: '', //R币余额
                tongzhi_index: '',//会员中心通知
                vipnoticedata: [],//公告详情
                loading_sf: false, //会员认证提交后的loding控制
                //添加支付宝--------------------------------------Begin-----------
                RiskTakingBook:false,//同意书
                RTbook:false,//是否勾选
                insertzfb: '',//添加支付宝的账号
                insertzfbgs: '',//添加公司支付宝的账号
                addzfb_lx: '添加個人支付寶',//添加支付宝的类型。  空为个人支付宝，不为空为公司支付宝

                zhifubao_inputbled: false,//添加支付宝input是否禁用
                zhifubaogs_inputbled: false,//添加公司支付宝input是否禁用

                zhifubao_subbled: true,//添加支付宝提交按钮是否禁用,
                zhifubao_id: '',//检测支付宝需要传入的id
                //添加支付宝--------------------------------------End-----------
                viploading: false,//loading
                loading: false,//弹出框loading


                isdefault:true,//新增地址是否设为默认地址
                Addressee:'',//收件人
                Addphone:'',//收件人手机号
                City_county:'',//市县
                District_Town:'',//区镇
                Street:'',//街道
                Detailedaddress:'',//详细地址
                C_cuyoptions:[
                    {country: '金門縣',},
                    {country: '宜蘭縣',},
                    {country: '新竹縣',},
                    {country: '苗栗縣',},
                    {country: '彰化縣',},
                    {country: '南投縣',},
                    {country: '雲林縣',},
                    {country: '嘉義縣',},
                    {country: '屏東縣',},
                    {country: '臺東縣',},
                    {country: '花蓮縣',},
                    {country: '澎湖縣',},
                    {country: '基隆市',},
                    {country: '新竹市',},
                    {country: '嘉義市',},
                    {country: '臺北市',},
                    {country: '高雄市',},
                    {country: '新北市',},
                    {country: '臺中市',},
                    {country: '臺南市',},
                    {country: '桃園市',}
                ],        //市县选项
                D_townoptions:[],//区镇选项
                Streetoptions:[],//街道选项
                add_sitetype:false,
                site_id:'',
                Address_card:'',
                activeName:'daifu',
                storedata:[],
                getyzmphone:'',//修改资料获取验证码手机号


                dragverify:false,//发送验证码滑块认证
                msg: '',   //提示内容
                textcolor:'#46ce04', //提示文字颜色
                imgs:Common.imgs, //滑动图片

                uploadnum:0,

            }
        },
        components: {
            VipHeader,
            Footer,
            Loading,
        },
        methods: {
            showRZ:function(type){
                if(type == 4){
                    this.popup.userId = true
                }
                if(type == 5){
                    this.popup.Fileupload = true
                }
            },
            cityfocus:function(){
                this.D_townoptions=[]
                this.Streetoptions=[]
                this.District_Town=''
                this.Street=''

            },
            dtownfocus:function(){
                this.Streetoptions=[]
                this.Street=''
            },
            citychange:function(val){
                var _this=this
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://www.trillionricher.com/1.0/gain_site",
                    data: {
                        city:val
                    },
                    success: function (res) {
                        _this.D_townoptions=res.data
                        _this.$forceUpdate()
                    },

                });
            },
            dtownchange:function(val){
                var _this=this
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://www.trillionricher.com/1.0/gain_site",
                    data: {
                        city:this.City_county,
                        country:val
                    },
                    success: function (res) {
                        _this.Streetoptions=res.data
                        _this.$forceUpdate()
                    },

                });
            },
            add_site:function(){
                var _this=this
                if(this.Addressee==''){
                    this.$message({
                        type: 'error',
                        message: '請填寫收件人!',
                    })
                }else if(this.Addphone=='' || !/^([0][9])\d{8}$/.test(this.Addphone)){
                    this.$message({
                        type: 'error',
                        message: '請填寫正確的手機號!',
                    })
                }else if(!/^[A-Z](1|2)\d{8}$/.test(this.Address_card)){
                    this.$message({
                        type: 'error',
                        message: '請填寫正確的身分證字號!',
                    })
                }else if(this.City_county=='' || this.District_Town=='' || this.Street=='' || this.Detailedaddress==''){
                    this.$message({
                        type: 'error',
                        message: '請填寫地址!',
                    })
                }else {
                    if (this.add_sitetype == false) {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "https://www.trillionricher.com/1.0/add_site",
                            data: {
                                merber_id: this.merber_id,
                                city: this.City_county,
                                country: this.District_Town,
                                road: this.Street,
                                address: this.Detailedaddress,
                                default_address: this.isdefault ? 1 : '',
                                token: this.token,
                                recipients: this.Addressee,
                                recipients_phone: this.Addphone,
                                identity_num:this.Address_card

                            },
                            success: function (res) {
                                console.log(res);
                                if (res.success == 1) {
                                    _this.$message({
                                        type: 'success',
                                        message: '地址添加成功!',
                                    })
                                    _this.popup.Address_TW = false
                                    Object.assign(_this.$data, _this.$options.data())
                                    _this.getvipindexdata()
                                }
                            },

                        });
                    } else {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "https://www.trillionricher.com/1.0/edit_site",
                            data: {
                                merber_id: this.merber_id,
                                city: this.City_county,
                                country: this.District_Town,
                                road: this.Street,
                                address: this.Detailedaddress,
                                default_address: this.isdefault ? 1 : '',
                                token: this.token,
                                recipients: this.Addressee,
                                recipients_phone: this.Addphone,
                                site_id:this.site_id

                            },
                            success: function (res) {
                                console.log(res);
                                if (res.success == 1) {
                                    _this.$message({
                                        type: 'success',
                                        message: '地址修改成功!',
                                    })
                                    _this.popup.Address_TW = false
                                    Object.assign(_this.$data, _this.$options.data())
                                    _this.getvipindexdata()
                                }
                            },

                        });
                    }
                }

            },
            deletesite:function(id){
                var _this=this
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://www.trillionricher.com/1.0/del_site",
                    data: {
                        merber_id:this.merber_id,
                        site_id:id,
                        token:this.token
                    },
                    success: function (res) {
                        if(res.success==1){
                            _this.$message({
                                type: 'success',
                                message: '刪除成功!'
                            });

                            _this.getvipindexdata()
                        }
                    },

                });
            },
            edit_site:function(city,country,road,address,site_id,default_address,recipients,recipients_phone){
                this.add_sitetype=true
                this.popup.Address_TW=true
                this.Detailedaddress=address
                this.City_county=city
                this.District_Town=country
                this.Street=road
                this.Addressee=recipients
                this.Addphone=recipients_phone
                this.isdefault=default_address=1?true:''
                this.site_id=site_id
            },

            yanzheng:function(type){
                if(type==1){
                    this.popup.userId=true
                }
                if(type==2){
                    this.popup.Fileupload=true
                }
            },
            gorenzheng:function(type){
                if(type==1){
                    if(this.vipdata.authentication==3){
                        this.$message({
                            type: 'success',
                            message: '身份認證已完成!',
                        })
                    }else {
                        this.popup.Verification=false
                        this.popup.userId=true
                    }
                }
                if(type==2){
                    if(this.vipdata.fileverify_authentication==2){
                        this.$message({
                            type: 'success',
                            message: '文件認證已完成!',
                        })
                    }else {
                        this.popup.Verification=false
                        this.popup.Fileupload=true
                    }
                }
            },
            startRead:function(){
                if(this.imgurl.length<3){
                    var fileDom=document.getElementById('imgUpFile').files[0];
                    if (!/\.(jpg|png|GIF|JPG|PNG)$/.test(fileDom.name) ) {
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else{
                        this.imgfile.push(fileDom)
                        this.imgurl.push(window.URL.createObjectURL(fileDom))
                    }

                }else {
                    this.$message({
                        message: '最多選擇三張圖片',
                        type: 'error'
                    });
                }
            },
            deleteimgurl:function(i){
                this.imgurl.splice(i,1)
                this.imgfile.splice(i,1)
            },

            //暂未开放功能
            nokf: function () {
                this.$message({
                    type: 'error',
                    message: '该該功能暫未開放!'
                });
            },
            overimguser: function () {
                this.showuserimg = true
            },
            outimguser: function () {
                this.showuserimg = false
            },
            ContactCustomerService:function(){
                this.popup.bank=false
                this.Msgswitch=true
            },
            deletezfbdata: function () {
                Object.assign(this.$data, this.$options.data())
                this.getvipindexdata()
                this.personalData()
                this.getvipnotice()
                this.getviptongzhi()
            },
            //会员中心首页数据
            getvipindexdata: function () {
                var _this = this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/order_bank_alipay",
                    data: {
                        merber_id:this.merber_id,
                        token:this.token
                    },
                    dataType: "json",
                    beforeSend: function (XMLHttpRequest) {
                        _this.viploading = true
                    },
                    success: function(res){
                        if(res.success==-1){
                            _this.Logout()
                        }else if(res.success==1){
                            _this.vipdata = res.data
                            if(res.data.fileverify_authentication==0 || res.data.fileverify_authentication==3 || res.data.authentication==1 || res.data.authentication==4){
                                _this.popup.Verification=true
                            }
                            _this.viploading = false
                        }else {
                            _this.$message({
                                message: '未知錯誤，請刷新後嘗試',
                                type: 'error',
                                center: true
                            });
                        }
                    }
                })
            },
            getstoredata: function () {
                var _this = this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/shop_order",
                    data: {
                        merber_id:this.merber_id,
                        token:this.token
                    },
                    dataType: "json",
                    beforeSend: function (XMLHttpRequest) {
                        _this.viploading = true
                    },
                    success: function(res){
                        if(res.success==1){
                            _this.storedata=res.data
                        }
                    }
                })
            },
            //判断是否可以继续添加银行卡
            bank_state:function(){
                if(this.vipdata.bank_state==1){
                    this.popup.bank = true
                } else if(this.vipdata.bank_state==2){
                    if(this.vipdata.defeated_bank.is_authentication==1){
                        this.$message({
                            message: '銀行卡人工驗證中，請耐心等待認證結果！',
                            type: 'error',
                            center: true
                        });
                    }
                } else if(this.vipdata.bank_state==3){
                    this.$message({
                        message: '最多只能添加3個銀行帳戶哦！',
                        type: 'warning',
                        center: true
                    });
                }
            },
            //会员中心数据更新
            upvipindexdata: function () {
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/order_bank_alipay",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token
                    },
                    dataType: "json",
                    success: function(res){
                        if (res.success==-1){
                            _this.Logout()
                        } else if(res.success==1){
                            this.vipdata = res.data
                        }
                    }
                })
            },
            //会员中心公告
            getvipnotice: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/notice",
                    dataType: "json",
                    data: {page: 1},
                    success: (res) => {
                        if (res.success == 1) {
                            this.vipnotice = res.data
                        }
                    }
                })
            },
            //删除支付宝银行账户
            deletezfb_Bank: function (index, type) {
                var text=''
                if(type=='bank'){
                    text='您將删除此銀行帳戶, 是否繼續？'
                }else {
                    text='您將删除此支付寶帳戶, 是否繼續？'
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
                            token:this.token
                        },
                        success: (res) => {
                            if(res.success==-1){
                                this.Logout()
                            }else if (res.success == 1) {
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
            //修改资料发送验证码
            updataphoneyzm:function(){
                this.$refs.rulesphone.validateField('merber_phone1', (phoneError) => {
                    if(!phoneError){
                        this.dragverify = true
                        this.getyzmphone = this.ruleForm.merber_phone1

                    }
                })
            },
            //验证码60秒倒计时
            yzm_timer:function(){
                if (this.yzmdata.time > 0) {
                    this.yzmdata.time--;
                    this.yzmdata.btntext=this.yzmdata.time+"s後重新獲取";
                    setTimeout(this.yzm_timer, 1000);
                } else{
                    this.yzmdata.time=0;
                    this.yzmdata.btntext="發送驗證碼";
                    this.yzmdata.disabled=false;
                }
            },
            //用户资料修改
            updata_user: function () {
                if (this.upuserdata == 'uppwd') {
                    this.$refs['rulespwd'].validate((valid) => {
                        if (valid==false) {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }else {
                            this.submitpwd()
                        }
                    })
                } else if (this.upuserdata == 'upemail') {
                    this.$refs['rulesmail'].validate((valid) => {
                        if (valid) {
                            this.submitEmail()
                        }else {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }
                    })
                } else if (this.upuserdata == 'upphone') {
                    this.$refs['rulesphone'].validate((valid) => {
                        if (valid==false) {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }else {
                            this.submitPhone()
                        }
                    })
                }else if(this.upuserdata == 'upuname'){
                    this.$refs['rulesuname'].validate((valid) => {
                        if (valid) {
                            this.submitUname()
                        }else {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }
                    })
                }
            },
            //加载个人资料
            personalData: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/personal_data",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.personal = res.data;
                            this.getyzmphone = res.data.merber_phone

                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                })
            },
            //修改密码
            submitpwd: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/up_pwd",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        merber_password: this.ruleForm.password,
                        merber_up_password: this.ruleForm.merber_password,
                        merber_phcode:this.ruleForm.merber_phcode
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.$message({
                                message: '密碼修改成功！',
                                type: 'success',
                                center: true
                            });
                            this.popup.upDataUser = false;
                            this.$refs['rulespwd'].resetFields()
                        } else {
                            this.$message.error("舊密碼錯誤");
                        }
                    }
                })
            },
            //修改邮箱
            submitEmail: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/up_email",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        merber_email: this.ruleForm.merber_email,
                        merber_phone: this.personal.merber_phone,
                        merber_phcode: this.ruleForm.merber_phcode
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.$message({
                                message: '郵箱修改成功！',
                                type: 'success',
                                center: true
                            });
                            this.popup.upDataUser = false;
                            Cookies.set('merber_email', this.ruleForm.merber_email,{ expires: 1 });
                            this.$refs['rulesmail'].resetFields()
                        } else if(res.success == 0){
                            this.$message.error("此E-mail已註冊");
                        }
                    }
                })

            },
            //修改手机
            submitPhone: function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/up_ph",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        merber_phone: this.ruleForm.merber_phone1,
                        merber_phcode: this.ruleForm.merber_phcode1
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.$message({
                                message: '手机號碼修改成功！',
                                type: 'success',
                                center: true
                            });
                            this.popup.upDataUser = false;
                            this.$refs['rulesphone'].resetFields()
                        } else if(res.success == 2) {
                            this.$message({
                                message: '驗證碼已過期！',
                                type: 'error',
                                center: true
                            });
                        }else if(res.success == 3){
                            this.$message({
                                message: '驗證碼錯誤！',
                                type: 'error',
                                center: true
                            });
                        }else if(res.success == 6){
                            this.$message({
                                message: '此手機號已綁定！',
                                type: 'error',
                                center: true
                            });

                        }
                    }
                })

            },
            //修改昵称
            submitUname: function () {
                var _this=this
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/up_personal/",
                    dataType: "json",
                    data: {
                        merber_id: this.merber_id,
                        token:this.token,
                        merber_nickname:this.ruleForm.uname
                    },
                    success: (res) => {
                        if(res.success==-1){
                            this.Logout()
                        }else if (res.success == 1) {
                            this.$message({
                                message: '暱稱修改成功！',
                                type: 'success',
                                center: true
                            });
                            Cookies.set('merber_nickname',this.ruleForm.uname,{ expires: 7 });
                            this.popup.upDataUser = false;
                            this.$refs['rulesuname'].resetFields()
                        } else {
                            this.$message.error(res.msg);
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

            //图片预览地址转base64并压缩
            onchange: function (index) {
                if (index == 1) {
                    var fileObj = document.getElementById("identity_front").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)
                    if(!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.imageUrl1 = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.identity_frontfile = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.identity_frontfile =  this.base64_file(res.base64,fileObj.name)
                                console.log(this.identity_frontfile);
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.identity_frontfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }
                } else if (index == 2) {
                    var fileObj = document.getElementById("identity_reverse").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)
                    if(!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.imageUrl2 = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize <1024){
                            this.identity_reversefile = fileObj
                        } else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.identity_reversefile = this.base64_file(res.base64,fileObj.name)
                                console.log(this.identity_reversefile);
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.identity_reversefile = this.base64_file(res.base64,fileObj.name)
                            })
                        }


                    }

                } else if (index == 3) {
                    var fileObj = document.getElementById("bank_front").files[0];
                    this.imageUrl3 = window.URL.createObjectURL(fileObj) //转base64
                } else if (index == 4) {
                    var fileObj = document.getElementById("bank_reverse").files[0];
                    this.imageUrl4 = window.URL.createObjectURL(fileObj) //转base64
                } else if (index == 5) {
                    var fileObj = document.getElementById("Avatarimg").files[0];
                    this.Avatarimgurl = window.URL.createObjectURL(fileObj) //转base64
                }else if(index == 6){
                    var fileObj = document.getElementById("imgUpFile").files[0];
                    var fileObjsize = (fileObj.size / 1024).toFixed(1)
                    if(!/\.(jpg|png|JPG|PNG|HEIC)$/.test(fileObj.name) ){
                        this.$message({
                            message: '請選擇JPG或PNG圖片',
                            type: 'error'
                        });
                    }else {
                        this.fileimageUrl = window.URL.createObjectURL(fileObj) //转base64
                        if(fileObjsize < 1024){
                            this.fileverifyfile = fileObj
                        }else if(fileObjsize > 1024 && fileObjsize < 5120){
                            lrz(fileObj,{quality:0.7}).then(res=>{
                                this.fileverifyfile =  this.base64_file(res.base64,fileObj.name)
                            })
                        }else if(fileObjsize > 5120){
                            lrz(fileObj,{quality:0.5}).then(res=>{
                                this.fileverifyfile = this.base64_file(res.base64,fileObj.name)
                            })
                        }
                    }
                }
            },
            //身份认证
            submitUpload: function () {
                var _this = this
                if(this.imageUrl1 == '' || this.imageUrl2 == ''){
                    this.$message({
                        message: '請選擇身份證圖片',
                        type: 'error'
                    });
                }else {
                    this.$refs['identityReg'].validate((valid) => {
                        let timestamp = Date.parse(new Date());
                        let num = '';
                        for(var i=0;i<5;i++)
                        {
                            num+=Math.floor(Math.random()*10);
                        }
                        let sign = timestamp + num
                        if (valid) {
                            this.viploading  = true

                            var cos = new COS({
                                SecretId: 'AKIDSuCrZ9K9oNo7HOr2Suytf4Naftxvc1Pb',
                                SecretKey: 'JSRpZ9A5tZAs3ISYX1iJUtAJLJIZUJzb',
                                FileParallelLimit:120
                            })
                            cos.putObject({
                                Bucket: 'egopay-1258561482',
                                Region: 'ap-hongkong',
                                Key:  'identity_front/'+'front'+sign,
                                StorageClass: 'STANDARD',
                                Body: _this.identity_frontfile, // 上传文件对象
                                onProgress: function(progressData) {
                                }
                            }, function(err, data) {
                                if(data.statusCode == 200){
                                    _this.identity_fronteurl = 'https://'+ data.Location //正面上传腾讯返回地址
                                    cos.putObject({
                                        Bucket: 'egopay-1258561482',
                                        Region: 'ap-hongkong',
                                        Key:  'identity_reverse/'+'reverse'+sign,
                                        StorageClass: 'STANDARD',
                                        Body: _this.identity_reversefile, // 上传文件对象
                                        onProgress: function(progressData) {
                                        }
                                    }, function(err, data) {
                                        if(data.statusCode == 200){
                                            _this.identity_reverseurl = 'https://'+data.Location  //反面上传腾讯云返回地址
                                            setTimeout(function () {
                                                _this.submitUploadid()
                                            },1000)
                                        }
                                    });
                                }
                            });



                        }else {
                            this.$message({
                                message: '請填寫完整的資料',
                                type: 'error'
                            });
                        }
                    })
                }
            },
            submitUploadid(){
                var _this = this
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://www.trillionricher.com/1.0/add_identity/",
                    data: {
                        identity_front:_this.identity_fronteurl,
                        identity_reverse:this.identity_reverseurl,
                        merber_id:_this.merber_id,
                        token:_this.token,
                        identity_num:_this.identitydata.identity_num,
                        year:_this.identitydata.year,
                        month: _this.identitydata.month,
                        day: _this.identitydata.day,
                        identity_type: _this.identitydata.identity_type,
                        region:_this.identitydata.region
                    },
                    success: function (res) {
                        _this.viploading  = false
                        if(res.success==-1){
                            _this.Logout()
                        }else if (res.success == 1) {

                            _this.$message({
                                message: '您的身份認證資訊已成功提交，請等待審核',
                                type: 'success'
                            });
                            _this.popup.userId = false
                            _this.getvipindexdata();
                        }else if(res.success == 2){
                            _this.$message({
                                message: '您等身份認證已成功或正在審核中。 請等待',
                                type: 'error'
                            });
                        }

                    },

                });

            },
            //文件验证
            file_verify:function () {
                let _this = this
                if(this.fileimageUrl == ''){
                    this.$message({
                        message: '請選擇圖片',
                        type: 'error'
                    });
                }else {
                    let timestamp = Date.parse(new Date());
                    let num = '';
                    for(var i=0;i<5;i++)
                    {
                        num+=Math.floor(Math.random()*10);
                    }
                    let sign = timestamp + num
                    var cos = new COS({
                        SecretId: 'AKIDSuCrZ9K9oNo7HOr2Suytf4Naftxvc1Pb',
                        SecretKey: 'JSRpZ9A5tZAs3ISYX1iJUtAJLJIZUJzb',
                        FileParallelLimit:120
                    })
                    cos.putObject({
                            Bucket: 'egopay-1258561482',
                            Region: 'ap-hongkong',
                            Key:  'verifyfile/'+sign,
                            StorageClass: 'STANDARD',
                            Body: _this.fileverifyfile, // 上传文件对象
                            onProgress: function(progressData) {
                            }
                        }, function(err, data) {
                            if(data.statusCode == 200){
                                console.log(data.Location);
                                $.ajax({
                                    type: "POST",
                                    dataType: "json",
                                    url: "https://www.trillionricher.com/1.0/file_verify",
                                    data: {
                                        merber_id:_this.merber_id,
                                        token:_this.token,
                                        image:"https://"+data.Location
                                    },
                                    success: function (res) {
                                        if(res.success==-1){
                                            this.Logout()
                                        }else if (res.success == 1) {
                                            _this.$message({
                                                message: '您的防洗錢聲明文件已成功提交，請等待審核',
                                                type: 'success'
                                            });
                                            _this.imgfile=''
                                            _this.imgurl=''
                                            _this.popup.Fileupload=false
                                            _this.getvipindexdata()
                                        }else {
                                            _this.$message({
                                                message: '反洗錢檔上傳失敗，請聯絡客服人員',
                                                type: 'error'
                                            });
                                        }

                                    },

                                });
                            }
                    })
                }
                //
                // var formData = new FormData();
                // for(var i=0;i<this.imgfile.length;i++){
                //     formData.append("image[]",this.imgfile[i]);
                // }
                // formData.append("merber_id", this.merber_id);
                // formData.append("token",this.token)
                // $.ajax({
                //     type: "POST",
                //     dataType: "json",
                //     url: "https://www.trillionricher.com/1.0/file_verify",
                //     data: formData,
                //     processData: false,
                //     contentType: false,
                //     async: false,
                //     success: function (res) {
                //         if(res.success==-1){
                //             this.Logout()
                //         }else if (res.success == 1) {
                //             _this.$message({
                //                 message: '您的防洗錢聲明文件已成功提交，請等待審核',
                //                 type: 'success'
                //             });
                //             _this.imgfile=''
                //             _this.imgurl=''
                //             _this.popup.Fileupload=false
                //             _this.getvipindexdata()
                //         }else {
                //             _this.$message({
                //                 message: '反洗錢檔上傳失敗，請聯絡客服人員',
                //                 type: 'error'
                //             });
                //         }
                //
                //     },
                //
                // });
            },
            //添加银行卡
            AddBankcard() {
                var _this = this
                var formData = new FormData();
                var fileObj = document.getElementById("bank_front").files[0];
                var fileObj2 = document.getElementById("bank_reverse").files[0];
                var bank_code = (this.bank).substring(0, 3)
                var bank_name = (this.bank).substring(3, 10)
                formData.append("bank_front", fileObj);
                formData.append("bank_reverse", fileObj2);
                formData.append("merber_id", this.merber_id);
                formData.append("token", this.token);
                formData.append("bank_code", bank_code);
                formData.append("bank_name", bank_name);
                formData.append("card_no", this.bankcard.card_no);
                if (fileObj == undefined || fileObj2 == undefined || bank_code == "" || bank_name == "" || this.bankcard.card_no == "") {
                    this.$message({
                        message: '請填寫完整資料！',
                        type: 'error',
                        center: true,
                    });
                } else {
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/add_bankcard",
                        dataType: "json",
                        data: formData,
                        processData: false,
                        contentType: false,
                        async: false,
                        beforeSend: function (XMLHttpRequest) {
                            _this.viploading = true
                        },
                        success: (res) => {
                            if(res.success==-1){
                                _this.Logout()
                            }else if (res.success == 1) {
                                this.popup.bank = false
                                this.$message({
                                    message: '新增銀行帳戶成功！',
                                    type: 'success',
                                    center: true,
                                });
                                this.upvipindexdata()
                                _this.viploading = false
                                Object.assign(this.$data, this.$options.data())
                            } else {
                                this.$message.error(res.msg);
                                Object.assign(this.$data, this.$options.data())
                            }
                        }
                    })

                }
            },
            //支付宝实名认证中，每10秒请求一次
            zfb_timer: function () {
                this.zhifubao_time--
                this.zhifubao_time = this.zhifubao_time
                if (this.zhifubao_time > 0 && this.zhifubao_time % 10 == 0) {
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/authentication",
                        dataType: "json",
                        data: {id: this.zhifubao_id},
                        success: (res) => {
                            console.log(res);
                            // if (res.success == 0) {
                            //     this.zhifubao_time--
                            //     this.zhifubao_time = this.zhifubao_time
                            //     setTimeout(this.zfb_timer, 1000);
                            // } else if (res.success == 4) {
                            //     this.$message({
                            //         message: '支付寶認證成功！',
                            //         type: 'success',
                            //         center: true
                            //     });
                            //     this.popup.zhifubao = false
                            //     this.getvipindexdata()
                            //     Object.assign(this.$data, this.$options.data())
                            // } else if (res.success == 3) {
                            //     // if(this.addzfb_lx==0){
                            //     this.zhifubao_yztextshow = false
                            //     this.zhifubao_yztexterror = true
                            //     this.zhifubao_errortext = '您的支付寶與真實姓名不符'
                            //     //
                            //     // }else {
                            //     //     this.zhifubaogs_yztextshow=false
                            //     //     this.zhifubaogs_yztexterror=true
                            //     //     this.zhifubaogs_errortext='您的支付寶帳戶與公司名稱不符'
                            //     //
                            // } else if (res.success == 2) {
                            //     this.zhifubao_yztextshow = false
                            //     this.zhifubao_yztexterror = true
                            //     this.zhifubao_huiying = true
                            //     this.zhifubao_errortext = res.msg
                            //
                            // }
                        }
                    })
                } else if (!this.zhifubao_time <= 0) {
                    setTimeout(this.zfb_timer, 1000);
                } else {
                    this.zhifubao_yztextshow = false
                    this.zhifubao_yztexterror = true
                    this.zhifubao_errortext = '人數過多，請關閉視窗，系統將自動驗證通過，若超過十分鐘未通過，請刪除帳號後重新提交。'
                }
            },
            //添加支付宝
            Addzfb(type) {
                if (type === 1) {
                    var company_name = '';
                    var alipay_num = this.insertzfb;
                } else {
                    var company_name = this.insertzfbname;
                    var alipay_num = this.insertzfbgs;
                }
                if(this.vipdata.alipay.length>=10){
                    this.$message({
                        message: '新增支付寶已達上限，請刪除舊的再次新增。！',
                        type: 'error',
                        center: true
                    });
                    return false
                }
                var reszfbphone=/^0?(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/
                var reszfbmail=/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                if (reszfbphone.test(this.insertzfb) || reszfbmail.test(this.insertzfb) ) {
                    this.zhifubao_inputbled = true;
                    this.zhifubao_yztextshow = true;
                    this.zhifubao_yztexterror = false;
                    this.zhifubao_subbled = true;
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/add_merber_alipay",
                        dataType: "json",
                        data: {
                            merber_id: this.merber_id,
                            token:this.token,
                            alipay_num: alipay_num,
                            company_name: company_name,
                            alipay_name: this.alipay_name
                        },
                        success: (res) => {
                            if(res.success==-1){

                                this.Logout()
                            }else if (res.success == 1) {
                                this.zhifubao_id = res.data.id
                                this.zfb_timer()
                            } else if (res.success == 3) {
                                this.zhifubao_yztextshow = false
                                this.zhifubao_yztexterror = true
                                this.zhifubao_errortext = '请删除认证失败账号，再添加'
                            } else if (res.success == 2) {
                                this.zhifubao_yztextshow = false
                                this.zhifubao_yztexterror = true
                                this.zhifubao_errortext = '該支付寶已被登記!'
                            }else if(res.success == 6){
                                this.zhifubao_yztextshow = false
                                this.zhifubao_yztexterror = true
                                this.zhifubao_errortext = '此賬戶已遭警告，禁止添加!'
                            }
                        }
                    })
                } else if (this.insertzfb == "" && this.insertzfbgs == "") {
                    this.$message({
                        message: '支付寶帳戶不能為空哦！',
                        type: 'error',
                        center: true
                    });
                } else if (this.alipay_name == "") {
                    this.$message({
                        message: '支付寶姓名不能為空哦！',
                        type: 'error',
                        center: true
                    });
                } else if (!/^0?(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|17[0123456789])[0-9]{8}$/.test(this.insertzfb) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.insertzfb)) {
                    this.$message({
                        message: '您的支付寶帳號格式不對！',
                        type: 'error',
                        center: true
                    });
                } else {
                    this.zhifubao_yztexterror = true
                }
            },
            //重新检测支付宝账户
            up_Addzfb: function (alipay_num) {
                this.zhifubao_subbled = true;
                this.zhifubao_inputbled = true;
                this.popup.zhifubao = true
                this.insertzfb = alipay_num
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/reauthentication",
                    dataType: "json",
                    data: {merber_id: this.merber_id, alipay_num: alipay_num,},
                    success: (res) => {

                        if (res.success == 1) {
                            this.zhifubao_id = res.data.id
                            this.zfb_timer()
                            this.zhifubao_yztextshow = true;
                        }
                    }
                })

            },
            //查看订单详情
            goOrderData: function (index) {
                this.$router.push({
                    path:'/orderDetails',
                    query:{
                        id:index
                    }
                });
            },
            goOrderData_cmy:function(id){
                this.$router.push({
                    path:'/orderDetails_cmy',
                    query:{
                        id:id
                    }
                });
            },
            //查看公告详情
            gonggaoxq: function (id) {
                var _this = this
                this.popup.noticeXq = true
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/notice_details",
                    data: {notice_id: id},
                    dataType: "json",
                    beforeSend: function (XMLHttpRequest) {
                        _this.loading = true
                    },
                    success: (res) => {
                        if (res.success == 1) {
                            this.vipnoticedata = res.data[0]
                            _this.loading = false
                        }
                    }
                })
            },

            //更换头像
            upuserAvatar: function () {
                var _this = this
                var formData = new FormData();
                var fileObj = document.getElementById("Avatarimg").files[0];

                if (!/\.(jpg|png|JPG|PNG)$/.test(fileObj.name) ) {
                    this.$message({
                        message: '請選擇JPG或PNG圖片',
                        type: 'error'
                    });
                }else {
                    formData.append("head_portrait", fileObj);
                    formData.append("merber_id", this.merber_id);
                    formData.append("token", this.token);
                    $.ajax({
                        type: "POST",
                        url: "https://www.trillionricher.com/1.0/change_head",
                        dataType: "json",
                        data: formData,
                        processData: false,
                        contentType: false,
                        async: false,
                        beforeSend: function (XMLHttpRequest) {
                            _this.viploading = true
                        },
                        success: (res) => {
                            if(res.success==-1){
                                this.Logout()
                            }else if (res.success == 1) {
                                this.reload();
                                this.popup.Avatar = false
                                this.$message({
                                    message: '頭像更換成功！',
                                    type: 'success',
                                    center: true,
                                });
                                _this.viploading = false
                            } else {
                                this.$message.error(res.msg);
                            }
                        }
                    })
                }
            },
            //历史订单查询
            // check_order: function (type) {
            //     $.ajax({
            //         type: "POST",
            //         url: "https://www.trillionricher.com/1.0/check_order",
            //         dataType: "json",
            //         data: {
            //             merber_id: this.merber_id,
            //             token:this.token,
            //             service_type: type
            //         },
            //         success: (res) => {
            //             if(res.success==-1){
            //                 this.Logout()
            //             }else if (res.success == 0) {
            //                 if (type == 1) {
            //                     this.$router.push({path: '/substitute'})
            //                 } else if (type == 2) {
            //                     this.$router.push({path: '/stored'})
            //                 } else if(type == 3) {
            //                     this.$router.push({path: '/daichu'})
            //                 }
            //             }else {
            //                 this.$router.push({
            //                     path:'/orderDetails',
            //                     query:{
            //                         id:res.data.order_id
            //                     }
            //                 });
            //                 this.$message({
            //                     showClose: true,
            //                     message: '您還有一筆待付款訂單未處理，請您付款或取消訂單後再下單',
            //                     type: 'error'
            //                 });
            //             }
            //         }
            //     })
            // },
            getviptongzhi:function () {
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/inform",
                    dataType: "json",
                    data: {page: 1},
                    success: (res) => {
                        if (res.success == 1) {
                            this.tongzhi_index = res.data[0].content
                        }
                    }
                })
            },
            //滑动验证成功
            onSuccess(times){
                var url = ""
                if(this.upuserdata == "upphone"){
                    url = "https://www.trillionricher.com/1.0/get_sms_code/"
                } else {
                    url = "https://www.trillionricher.com/1.0/forget_pad_code/"

                }
                var _this = this
                this.textcolor = "#46ce04"
                this.msg = '驗證耗时'+(times / 1000).toFixed(1)+'s'

                $.ajax({
                    type: "POST",
                    url: url,
                    dataType:"json",
                    data: {merber_phone:this.getyzmphone},
                    success:(res)=>{
                        this.dragverify = false
                        this.msg = ''
                        this.$refs.slideblock.reset();
                        if(res.success==2){
                            this.$message.error('此手機號已註冊');
                            this.ruleForm.merber_phone1 = ""
                        }else if(res.success==1){
                            this.yzmdata.disabled=true
                            this.yzmdata.time=60
                            this.yzm_timer()
                            this.$message({
                                message: '驗證碼已發送！',
                                type: 'success',
                                center: true
                            });
                        }
                    }
                })
            },
            //滑动验证失败
            onFail(){
                this.textcolor = "#f56c6c"
                this.msg = '驗證未通過，請從新認證!'
            },
            //滑动图片刷新
            onRefresh(){
                this.msg = ''
            },
            //检查为非人为操作回调
            onAgain() {
                console.log('检测到非人为操作的哦！');
                this.msg = 'try again';
                // 刷新
                this.$refs.slideblock.reset();
            },




        },
        computed: {},
        watch: {
            // City_county:function(val){
            //     var _this=this
            //     $.ajax({
            //         type: "POST",
            //         dataType: "json",
            //         url: "https://www.trillionricher.com/1.0/gain_site",
            //         data: {
            //             city:val
            //         },
            //         success: function (res) {
            //             _this.D_townoptions=res.data
            //             console.log(this.D_townoptions);
            //             _this.$forceUpdate()
            //         },
            //
            //     });
            // },

            RTbook:function (val) {
                if(val==false){
                    this.zhifubao_subbled=true
                }else {
                    this.zhifubao_subbled=false
                }
            }
        },
        created: function () {
            var _this =this

            var kadan=this.$route.query.kadan
            if(kadan!==undefined){
                this.yanzheng(kadan)
            }
            if(this.merber_id==undefined){
                this.$router.push({path: '/'})
            }else {
                var _this = this
                this.getvipindexdata()
                this.getstoredata()
                this.getviptongzhi()
                this.personalData()
                this.getvipnotice()

                window.setInterval(() => {
                    setTimeout(function (){
                        _this.upvipindexdata()
                        _this.getvipnotice()
                        _this.getviptongzhi()
                    }, 0)
                }, 30000)
                $.ajax({
                    type: "POST",
                    url: "https://www.trillionricher.com/1.0/get_bank",
                    dataType: "json",
                    success: (res) => {
                        if (res.success == 1) {
                            this.allback = res.data
                        }
                    }
                })


            }
        },
    }
</script>
