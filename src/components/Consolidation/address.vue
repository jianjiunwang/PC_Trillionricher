<template>
    <div class="address">
        <div class="addresshead">
            <div><i class="el-icon-s-custom" style="font-size: 25px"></i>  台灣收件人</div>
            <el-button type="primary" size="small " style="font-size: 14px" @click="add_site()"><i class="el-icon-plus"></i> 新增</el-button>
        </div>
        <div class="addressbody">
            <el-table
                    ref="singleTable"
                    :data="tableData"
                    style="width: 100%;text-align: center">
                <el-table-column
                        property="recipients"
                        label="姓名"
                        width="100">
                </el-table-column>
                <el-table-column
                        property="recipients_phone"
                        label="電話"
                        >
                </el-table-column>
                <el-table-column
                        property="identity_num"
                        label="身份證"
                       >
                </el-table-column>
                <el-table-column
                        label="地址"
                        >
                    <template slot-scope="scope">
                        {{scope.row.city + scope.row.country + scope.row.road + scope.row.address}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="修改"
                        width="100"
                >
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="up_site(scope.$index, tableData)"
                                type="text"
                                size="small">
                            <i class="el-icon-edit"></i>
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        label=" 刪除"
                        width="100">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="delete_site(scope.$index, tableData)"
                                type="text"
                                size="small">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :visible.sync="showaddress" :show-close="false">
            <span slot="title" style="font-weight: bold;color: #fff;font-size: 18px">{{addresstext}}台灣收貨地址</span>
            <div >
                <el-form ref="address" :model="addressdata" label-width="80px" :rules="addressReg">
                    <div style="display: flex;justify-content: space-between;">
                        <el-form-item  prop="addname" style="margin-left: 0">
                            <el-input placeholder="請輸入內容" v-model="addressdata.recipients">
                                <template slot="prepend">姓名/企業名</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item  prop="addname" style="margin-left: 30px">
                            <el-input placeholder="請輸入內容" v-model="addressdata.recipients_phone">
                                <template slot="prepend">手機門號</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item  prop="addname" style="margin-left: 0">
                            <el-checkbox v-model="addressdata.default_address" border>預設地址</el-checkbox>
                        </el-form-item>
                    </div>
                    <el-form-item  prop="addname" style="margin-left: 0;width: 70%">
                        <el-input placeholder="請輸入內容" v-model="addressdata.identity_num" >
                            <template slot="prepend">身分證字號/統一編號</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item  prop="addname" style="margin-left: 0;">
                        <div style="display: flex;height: 40px;align-items: center">
                            <div >
                                <el-select v-model="addressdata.City_county" placeholder="請選擇市/縣"  filterable style="width: 180px;" @change="citychange" @focus="cityfocus">
                                    <el-option
                                            v-for="item in C_cuyoptions"
                                            :key="item.country"
                                            :label="item.country"
                                            :value="item.country">
                                    </el-option>
                                </el-select>
                                市/縣
                                <el-select v-model="addressdata.District_Town" placeholder="請選擇區/鎮"  filterable style="width: 180px" @change="dtownchange" @focus="dtownfocus">
                                    <el-option
                                            v-for="item in D_townoptions"
                                            :key="item.country"
                                            :label="item.country"
                                            :value="item.country">
                                    </el-option>
                                </el-select>
                                區/鎮
                                <el-select v-model="addressdata.Street" placeholder="請選擇路/街道" filterable style="width: 180px">
                                    <el-option
                                            v-for="item in Streetoptions"
                                            :key="item.road"
                                            :label="item.road"
                                            :value="item.road">
                                    </el-option>
                                </el-select>
                                路/街道
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item  prop="addname" style="margin-left: 0;">
                        <el-input placeholder="详细地址" v-model="addressdata.address" >
                            <template slot="prepend" >
                                <div style="display: flex;align-items: center">
                                    <span style="margin-left: 10px">詳細地址</span>
                                </div>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showaddress = false">取 消</el-button>
                <el-button type="primary" @click="add_up_site()" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import qs from 'qs';
    export default {
        data: function () {
            return {
                tableData: [],
                currentRow: null,
                showaddress:false,
                addresstext:'',//新增和修改地址文案
                addressdata:{
                    site_id:'',
                    recipients:'',//收件人
                    recipients_phone:'',//手机号码
                    identity_num:'',//身份证号码
                    default_address:true,//是否设置默认地址
                    address:'',//详细地址
                    City_county:'',//市县
                    District_Town:'',//区镇
                    Street:'',//街道
                },
                addressReg:{},
                isdefault:'',//是否设置为默认

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

            }
        },
        components: {},
        methods: {
            //删除地址
            delete_site(index,data) {
                var _this = this
                this.$axios.post('https://www.trillionricher.com/1.0/del_site',qs.stringify({
                    merber_id:this.$store.state.merber_id,
                    token:this.$store.state.token,
                    site_id:data[index].site_id,
                })).then(function (res) {
                    if(res.data.success === 1){
                        data.splice(index, 1);
                        _this.$message({
                            type: 'success',
                            offset:50,
                            duration:3000,
                            message: '已刪除',
                        });
                        _this.getsite()
                    }

                }).catch(function (error) {
                    console.log(error);
                });
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
            citychange(val){
                var _this=this
                this.$axios.post('https://www.trillionricher.com/1.0/gain_site',qs.stringify({
                    city:val
                })).then(function (res) {
                    console.log(res);
                    _this.D_townoptions=res.data.data
                    _this.$forceUpdate()
                }).catch(function (error) {
                    console.log(error);
                });
            },
            dtownchange:function(val){
                var _this=this
                this.$axios.post('https://www.trillionricher.com/1.0/gain_site',qs.stringify({
                    city:this.addressdata.City_county,
                    country:val
                })).then(function (res) {
                    _this.Streetoptions=res.data.data
                    _this.$forceUpdate()
                }).catch(function (error) {
                        console.log(error);
                });
            },
            add_site(){
                this.showaddress = true
                this.addresstext='添加'
                this.addressdata = {
                    site_id:'',
                    recipients:'',//收件人
                    recipients_phone:'',//手机号码
                    identity_num:'',//身份证号码
                    default_address:true,//是否设置默认地址
                    City_county:'',//市县
                    District_Town:'',//区镇
                    Street:'',//街道
                    address:'',//详细地址
                }
            },
            up_site(index,table){
                this.showaddress = true
                this.addresstext='修改'
                this.addressdata = {
                    site_id:table[index].site_id,
                    recipients:table[index].recipients,//收件人
                    recipients_phone:table[index].recipients_phone,//手机号码
                    identity_num:table[index].identity_num,//身份证号码
                    default_address:table[index].default_address == 1?true:false,//是否设置默认地址
                    City_county:table[index].city,//市县
                    District_Town:table[index].country,//区镇
                    Street:table[index].road,//街道
                    address:table[index].address,//详细地址
                }

            },
            //添加地址、修改地址
            add_up_site(index,table){
                var _this=this
                var url = ''
                var data = {}
                if(this.addresstext == '添加'){
                    url = 'https://www.trillionricher.com/1.0/add_site'
                    data = {
                        merber_id:this.$store.state.merber_id,
                        token:this.$store.state.token,
                        city:this.addressdata.City_county,
                        country:this.addressdata.District_Town,
                        road:this.addressdata.Street,
                        default_address:this.addressdata.default_address?'1':'',
                        address:this.addressdata.address,
                        recipients:this.addressdata.recipients,
                        recipients_phone:this.addressdata.recipients_phone,
                        identity_num:this.addressdata.identity_num
                    }
                }
                if( this.addresstext == '修改'){
                    url = 'https://www.trillionricher.com/1.0/edit_site'
                    data = {
                        merber_id:this.$store.state.merber_id,
                        token:this.$store.state.token,
                        city:this.addressdata.City_county,
                        site_id:this.addressdata.site_id,
                        country:this.addressdata.District_Town,
                        road:this.addressdata.Street,
                        default_address:this.addressdata.default_address?'1':'',
                        address:this.addressdata.address,
                        recipients:this.addressdata.recipients,
                        recipients_phone:this.addressdata.recipients_phone,
                        identity_num:this.addressdata.identity_num
                    }
                }
                this.$axios.post(url,qs.stringify(data)).then(function (res) {
                    console.log(res);
                    if(res.data.success == 1){
                        _this.$message({
                            type: 'success',
                            offset:50,
                            duration:3000,
                            message: _this.addresstext+ '成功',
                        });
                        _this.showaddress = false
                        _this.getsite()
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                });
            },
            //获取所有地址
            getsite(){
                var _this=this
                this.$axios.post('https://www.trillionricher.com/1.0/merber_site',qs.stringify({
                    merber_id:this.$store.state.merber_id,
                    token:this.$store.state.token,
                })).then(function (res) {
                    if(res.data.success == 1) {
                         _this.tableData = res.data.data
                    }
                })
                .catch(function (error) {
                        console.log(error);
                });
            }
        },
        computed: {},
        watch: {},
        mounted: function () {
            this.getsite()
        }
    }
</script>
<style>
    .address{
        background-color: #fff;
        border-top-left-radius:5px ;
        border-top-right-radius:5px ;
        padding: 10px;
    }
    .addresshead{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #e7e7e7;
    }
    .addresshead div{
        font-size: 25px;
        font-weight: bold;
    }
    .el-form-item__content{
        margin-left: 0 !important;
    }
    .addressbody td th{
        text-align: center ;
    }
    .cell{
      font-size: 14px !important;
    }
</style>
