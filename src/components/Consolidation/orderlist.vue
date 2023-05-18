<template>
        <div class="orderlist">
            <el-tabs v-model="dd_Type" @tab-click="handleClick">
                <el-tab-pane label="全部訂單" name="quanbu"></el-tab-pane>
                <el-tab-pane label="運輸中" name="intransit"></el-tab-pane>
                <el-tab-pane label="待收貨" name="Tobereceived"></el-tab-pane>
                <el-tab-pane label="已完成" name="Havebeenreceived"></el-tab-pane>
            </el-tabs>
            <el-table
                    ref="filterTable"
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="創建訂單時間"
                        column-key="date"
                >
                    <template slot-scope="scope">
                        {{scope.row.create_time | convTime}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="order_num"
                        label="訂單編號">
                </el-table-column>
                <el-table-column
                        prop="order_twd"
                        label="訂單金額">
                </el-table-column>
                <el-table-column
                        prop="weight"
                        label="重量">
                </el-table-column>

                <el-table-column
                        prop="Freightstatus"
                        label="狀態"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag disable-transitions effect="dark" v-if="scope.row.order_state === '1'">货运中</el-tag>
                        <el-tag disable-transitions effect="dark" v-if="scope.row.order_state === '2'">已到件</el-tag>
                        <el-tag disable-transitions effect="dark" v-if="scope.row.order_state === '3'" type="success">已签收</el-tag>
                        <el-tag disable-transitions effect="dark" v-if="scope.row.order_state === '5'" >出貨中</el-tag>
                        <el-tag disable-transitions effect="dark" v-if="scope.row.order_state === '41'" type="warning">匯款賬號不符</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        property="Residential"
                        label="詳情"
                        width="100">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="medium">
                            <i style="font-size: 20px" class="el-icon-tickets"  @click="getorderdata(scope.row.fid,scope.row)"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :visible.sync="showorderdata" :show-close="false" >
                <span slot="title" style="font-weight: bold;color: #fff;font-size: 18px" v-if="orderdata!=''">集運訂單 {{orderdata[0].order_num}}</span>
                <div v-if="orderdata!=''">
                    <div>
                        <div style="display: flex;justify-content: space-between;align-items: center;margin-bottom:10px" >
                            <el-tag disable-transitions effect="dark" v-if="orderdata[0].order_state === '1'">货运中</el-tag>
                            <el-tag disable-transitions effect="dark" v-if="orderdata[0].order_state === '2'">已到件</el-tag>
                            <el-tag disable-transitions effect="dark" v-if="orderdata[0].order_state === '3'" type="success">已签收</el-tag>
                            <el-tag disable-transitions effect="dark" v-if="orderdata[0].order_state === '5'" >出貨中</el-tag>
                            <el-tag disable-transitions effect="dark" v-if="orderdata[0].order_state === '41'" type="warning">匯款賬號不符</el-tag>
                            <span style="font-size: 14px">新深圳倉庫</span>
                        </div>
                        <el-table
                                :header-cell-style="{background:'#eeeeee',color:'#606266'}"
                                :data="orderdatalist"
                                style="width: 100%">
                            <el-table-column
                                    prop="express_num"
                                    label="運單號"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="入庫時間"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.create_time | convTime}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="goods_type"
                                    label="品類"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="goods_sort"
                                    width="80"
                                    label="類別"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="weight"
                                    label="重量(kg)"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="add_money"
                                    label="金额(￥)"
                            >
                            </el-table-column>
                        </el-table>
                        <el-table
                                :header-cell-style="{background:'#eeeeee',color:'#606266'}"
                                :data="orderdata"
                                style="width: 100%">
                            <el-table-column
                                    label="付款方式"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.payment_method == 9" style="font-size: 14px">中國信託(822)</span>
                                    <span v-if="scope.row.payment_method == 2" style="font-size: 14px">超商付款</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="payment_account"
                                    label="虛擬賬戶/超商代碼"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="weight"
                                    label="總重量(kg)"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="order_rmb"
                                    label="總金额(￥)"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="order_twd"
                                    label="應付款項(NT$)"
                            >
                            </el-table-column>
                        </el-table>

                        <div class="packagedata2" >
                            <span style="display: flex;align-items: center" > 收貨地址 : {{orderdata[0].city + orderdata[0].country +orderdata[0].road + orderdata[0].address }}</span>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>

</template>

<script>
    import qs from 'qs';
    export default {
        name:'packagelist',
        data: function () {
            return {
                showorderdata:false,
                Expressdeta:false,
                dd_Type:'quanbu',
                tableData: [],
                orderdata:[],//查看详情 订单数据
                orderdatalist:[],//查看详情 包裹数据
                activities: [{
                    content: '支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                }, {
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87'
                }, {
                    content: '支持自定义尺寸',
                    timestamp: '2018-04-03 20:46',
                    size: 'large'
                }, {
                    content: '默认样式的节点',
                    timestamp: '2018-04-03 20:46'
                }],
            }
        },
        components: {},
        methods: {
            handleClick:function () {

            },
            selecttableRowClassName({row, rowIndex}){
                console.log(row);
            },
            //总计
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '總計';
                        return;
                    }
                    if(index === 4 || index === 5){
                        const values = data.map(item => Number(item[column.property]));
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                            if(index === 4){
                                sums[index] += ' kg' ;
                            }else if(index === 5){
                                sums[index] += ' 元';
                            }

                        }
                    }

                });
                return sums;
            },
            get_freight(){
                var _this=this
                this.$axios.post('https://www.trillionricher.com/1.0/get_freight',qs.stringify({
                    merber_id:this.$store.state.merber_id,
                    token:this.$store.state.token,
                })).then(function (res) {
                    console.log(res);
                    if(res.data.success == -1){
                        _this.Logout()
                    }
                    if(res.data.success == 1) {
                        _this.tableData = res.data.data
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getorderdata(id,row){
                console.log(row);
                var _this=this
                this.orderdata[0] = row
                _this.showorderdata = true
                this.$axios.post('https://www.trillionricher.com/1.0/express_details',qs.stringify({
                    merber_id:this.$store.state.merber_id,
                    token:this.$store.state.token,
                    fid:id
                })).then(function (res) {
                    if(res.data.success == -1){
                        _this.Logout()
                    }
                    if(res.data.success == 1) {
                        _this.orderdatalist = res.data.data
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
        },
        computed: {},
        watch: {},
        mounted: function () {
            this.get_freight()
        }
    }
</script>
<style>
    .el-tabs__nav-wrap{
        padding:  0 15px;
    }
    .el-tabs__item{
        font-size: 16px;
        font-weight: 500;
        padding: 0 15px;
    }
    .iconhover:hover{
        color: #0083ff;
        cursor: pointer;
    }
    .packagedata{
        padding: 10px;
        height: 40px;
        background-color: #eeeeee;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        font-size: 14px;
    }
    .packagedata2{
        padding: 20px 10px;
        height: 30px;
        background-color: #eeeeee;
        margin-top: 10px;
        display: flex;
        align-items: center;
        border-radius: 5px
    }
    .packagedata span,.packagedata2 span{
        font-size: 16px;
    }
</style>
