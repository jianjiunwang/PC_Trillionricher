<template>
  <div class="packagelist">
    <div style="display: flex;align-items:center;justify-content: space-between;background-color: #fff;padding: 10px">
      <div>
        <el-select v-model="entrepot" placeholder="请选择" style="width: 150px">
          <el-option
              v-for="item in entrepotoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small " style="font-size: 15px;;margin-left: 20px" @click="add_freight(1)">打包出貨</el-button>
      </div>
      <div>
        <el-button type="primary" size="small " style="font-size: 15px" @click="Register_package"><i class="el-icon-plus"></i> 登記包裹</el-button>
      </div>
    </div>
    <el-table
        ref="multipleTable"
        :row-class-name="tableRowClassName"
        height="80vh"
        :data="tableData"
        v-loading = "isLoading"
        element-loading-background = "rgba(255, 255, 255, .5)"
        element-loading-spinner = "el-icon-loading"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          :selectable="iselect"
      >

      </el-table-column>
      <el-table-column
          prop="express_num"
          label="運單號碼"
      >
      </el-table-column>
      <el-table-column
          label="入庫時間"
          sortable
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
          label="類別"
      >
      </el-table-column>
      <el-table-column
          label="貨運狀態"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status == 1">未到倉</p>
          <p v-if="scope.row.status == 2">已到倉</p>
          <p v-if="scope.row.status == 3">已上架</p>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-button
              :disabled="scope.row.status==1?false:true"
              size="mini"
              @click.native.prevent="updata(scope.$index, scope.row)">修改</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.$index, tableData)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="showpackage" :show-close="false">
      <span slot="title" style="font-weight: bold;color: #fff;font-size: 18px">{{packagetext}}包裹 - 新深圳倉庫</span>
      <div style="padding:  20px">
        <div style="display: flex;justify-content: space-between">
          <el-input placeholder="请输入内容" v-model="Expressnumber" style="width: 60%">
            <template slot="prepend">運單號碼</template>
          </el-input>
        </div>
        <el-input placeholder="如：衣服 / 數碼產品等" v-model="Category" style="margin-top: 20px">
          <template slot="prepend">物品品類</template>
        </el-input>
        <br><br>
        <h3 style="display: flex;align-items: center"> 該物品屬於 </h3>
        <div style="margin-top: 20px;">
          <el-radio label="普貨" v-model="Expresstype">普貨</el-radio>
          <el-radio label="特貨" v-model="Expresstype">特貨</el-radio>
          <el-radio label="敏感貨" v-model="Expresstype">敏感貨</el-radio>
        </div>
        <br>
        <br>
        <h3>備註</h3>
        <br>
        <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="Remarks"
            show-word-limit
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showpackage = false">取 消</el-button>
        <el-button type="primary" @click="create_upda(1)">确 定</el-button>
      </div>
    </el-dialog>
    <!--打包出貨-->
    <el-dialog :visible.sync="Packshow"
               :show-close="false"
               :close-on-click-modal="false"
               width="60%"
               top="10vh">
      <span slot="title" style="font-weight: bold;color: #fff;font-size: 18px;">打 包 出 貨</span>
      <div style="padding:0  20px">
        <el-table
            :data="chosendata"
            :row-class-name="selecttableRowClassName"
            show-summary
            :summary-method="getSummaries"
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
        <div class="total">
          <p><span>應付款項 ：</span> <span>NT$ {{order_rmb}}</span></p>
        </div>
        <div class="Payment">
          <h5>收貨地址</h5>
          <el-select v-model="address" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in sitedata"
                :key="item.site_id"
                :label="item.city + item.country +item.road + item.address"
                :value="item.site_id">
            </el-option>
          </el-select>
          <h5>付款方式</h5>
          <div v-if="this.order_rmb < this.r_money">
            <el-radio v-model="payment_method" label="3" style="display: flex;align-items: center">
              <div  class="payment_method">
                <div>
                  <p>錢包餘額付款</p>
                  <p>錢包餘額<span class="color_green">{{Number(r_money).toFixed(2)}}</span>個（E幣付款不另外新開手續費發票）</p>
                </div>
              </div>
            </el-radio>
          </div>
          <div v-else>
            <el-radio v-model="payment_method" label="5" style="display: flex;align-items: center">
              <div  class="payment_method">
                <div>
                  <p>錢包餘額付款</p>
                  <p>錢包餘額<span class="color_green">{{Number(r_money).toFixed(2)}}</span>個（E幣付款不另外新開手續費發票）</p>
                </div>
              </div>
            </el-radio>
          </div>
          <div>
            <el-radio v-model="payment_method" label="9" style="display: flex;align-items: center;margin: 10px 0">
              <div  class="payment_method">
                <img src="../../assets/image/ZGXT1.png" alt="">
                <div>
                  <p>網路ATM/ATM櫃機</p>
                  <p>中國信託(822)虛擬帳號</p>
                </div>
              </div>
            </el-radio>
          </div>

          <el-input
              v-if="payment_method == 9"
              style="margin: 10px 0"
              type="text"
              placeholder="請輸入銀行碼後5位"
              v-model="bankcode"
              maxlength="10"
          ></el-input>
          <div style="margin: 20px 0">
            <el-radio v-model="payment_method" label="2" style="display: flex;align-items: center">
              <div  class="payment_method">
                <img src="../../assets/image/1585229780-784296694_wn.jpg"  alt="">
                <div>
                  <p>超商付款（超商繳費程式碼將發至您的手機）</p>
                  <p>手續費30元 ，不足30臺幣按30臺幣收取</p>
                  <p>使用超商付款不能超過5970元新台幣</p>
                </div>
              </div>
            </el-radio>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="Packshow = false">取 消</el-button>
        <el-button type="primary" @click="add_freight(2)" :loading="add_freightloading">确 定</el-button>
      </div>
    </el-dialog>
    <!--滑动验证弹出框-->
    <el-dialog
        :visible.sync="dragverify"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="Reset"
        style="margin-top: 15vh;"
        width="400px"
    >
            <span slot="title" >

                    請進行認證
            </span>
      <div>
        <div class="Slider"  v-show="!slideshow" >
          <slide-verify
              :l="42"
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
        </div>
        <div style="font-size: 18px;font-weight: bold;margin: 0 auto" v-show="slideshow" >
          <div class="phone">
            <div style="color: #606266">
              <span>手機號碼</span>
              <span>{{merber_phone}}</span>
            </div>
            <div>
              <el-input  maxlength="6" size="mini"  v-model="payment_code"  placeholder="請輸入驗證碼"></el-input>
              <el-button type="primary" size="mini"  @click="slideshow = false" :disabled="yzm.bled">{{yzm.text}}</el-button>
            </div>
            <div> <el-button type="primary" size="mini" @click="add_freightajax(2)">送出並驗證</el-button></div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--补款弹出框-->
    <el-dialog  :visible.sync="Supplement"  width="500px" :close-on-click-modal="false" style="margin-top: 20vh" >
                <span slot="title" >
                   補款方式
                </span>
      <div  >
        <p style="font-size: 14px;text-align: center">您的E幣餘額不足{{order_rmb}},需補款 <span style="color: red">￥{{(order_rmb-r_money).toFixed(2)}}</span>，請選擇補款方式。</p>
        <el-radio-group v-model="withhold_type" size="medium" style="display: flex;justify-content: space-around;margin-top: 10px">
          <!--<el-radio label="8"  style="padding: 10px 10px">星展銀行</el-radio>-->
          <el-radio label="9"  style="padding: 10px 10px">中國信託</el-radio>
          <!--<el-radio label="2" style="padding: 10px 10px">超商補款</el-radio>-->
        </el-radio-group>
        <el-input v-show="withhold_type == 9 || withhold_type == 8" v-model="bankcode"  placeholder="匯款銀行後五位 " style="margin-top: 15px" ></el-input>
        <div style="display: flex;flex-direction: row-reverse;padding:20px 0 10px">
          <el-button type="primary" style="margin-left: 20px" @click="add_freightajax(3)" size="mini">確定並送出</el-button>
          <el-button type="info" @click="again" size="mini">重新選擇付款方式</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import qs from 'qs';
import Common from "~/components/vues/Common";
export default {
  data: function () {
    return {
      screeHeight: '',//屏幕高度

      entrepot:'新深圳倉庫',//仓库
      entrepotoptions:[{
        value: '新深圳倉庫',
        label: '新深圳倉庫'
      }, ],
      order_rmb:0,//打包包裹RMB总金额
      order_twd:0,//台币总金额
      address:'',//当前选择地址
      sitedata:[],//地址列表
      tableData:[],//预到件包裹数据列表
      chosendata:[],//当前已选择打包数据
      showpackage:false,//显示新增预到件弹出框
      Packshow:false,//显示打包出货弹出框
      Expressnumber:'',//快递单号
      Expresscompany:'',//快递公司
      Category:'',//品类
      Expresstype:'',//类型
      checkList:'',//附加需求
      Remarks:'',//备注
      isLoading:true,//加载未完成显示loading
      add_freightloading:false,//打包出货loading
      sites:[],//收货地址
      payment_method:'9',//付款方式
      bankcode:'',//银行号码后五位
      exchange_rate:4.7,//汇率
      packagetext:'',//登记修改弹出框文本
      cid:'',//修改预到件包裹id
      r_money:0,//余额
      merber_phone:'',//手机号码
      dragverify:false,//验证弹出框
      slideshow:true,//验证码输入框
      imgs:Common.imgs, //滑动图片
      payment_code:'',//手机验证码
      yzm:{
        bled:false,
        text:'發送驗證碼',
        time:60,
        num:3,
      },
      Supplement:false,//补款弹出框
      withhold_type:'',//补款方式
    }
  },
  components: {},
  methods: {
    //当前勾选的数据
    handleSelectionChange(val) {
      this.chosendata = val
      for (var i = 0;i<val.length;i++){
        this.order_rmb += Number(val[i].add_money) * this.exchange_rate
        this.order_twd += Number(val[i].add_money)
      }
      this.order_rmb = Math.ceil(this.order_rmb)
    },
    //是否能勾选
    iselect(row, index){
      if(row.status === '3'){
        return true
      }else {
        return false
      }
    },
    //当前包裹状态显示样式修改
    tableRowClassName({row, rowIndex}){
      if (row.status === '2') {
        return 'warning-row';
      } else if (row.status === '3') {
        return 'success-row';
      }
      return '';
    },
    selecttableRowClassName({row, rowIndex}){
      console.log(row);
    },

    //添加修改包裹
    create_upda(type){
      var _this = this
      var url = ''
      var data = {}
      if(type === 1){
        if(this.Expressnumber === '' || this.Category === '' || this.Expresstype === '' ){
          _this.$message({
            type: 'error',
            offset:50,
            duration:3000,
            message: '請填寫完整資料'
          });
          return false
        }
      }
      if(this.packagetext  === '登記' || type === 1 || type === 2){
        url = 'https://www.trillionricher.com/1.0/create_express'
        console.log(this.entrepot);
        data = {
          merber_id:this.$store.state.merber_id,
          token:this.$store.state.token,
          express_num:this.Expressnumber,//快递单号
          goods_type:this.Category,//物品品类
          goods_sort:this.Expresstype,//物品类别
          entrepot:this.entrepot,//到货仓库
          remark:this.Remarks,//备注
          request_type:type,//请求类型  1 新增预到件  2 查询到件
        }

      }
      if(this.packagetext  === '修改'){
        url = 'https://www.trillionricher.com/1.0/update_express'
        data = {
          merber_id:this.$store.state.merber_id,
          token:this.$store.state.token,
          express_num:this.Expressnumber,//快递单号
          goods_type:this.Category,//物品品类
          goods_sort:this.Expresstype,//物品类别
          entrepot:this.entrepot,//到货仓库
          remark:this.Remarks,//备注
          cid:this.cid
        }
      }

      this.isLoading = true
      this.$axios.post(url,qs.stringify(data))
          .then(function (res) {
            console.log(res);
            if(res.data.success == -1){
              _this.Logout()
            }
            if(res.data.success === 1){
              _this.isLoading = false
              if(_this.packagetext  === '修改'){
                _this.showpackage = false
                _this.packagetext  = '登記'
                _this.$message({
                  type: 'success',
                  offset:50,
                  duration:3000,
                  message: '修改成功',
                });
                _this.create_upda(2)
              }else {
                if(type === 1){
                  _this.$message({
                    type: 'success',
                    offset:50,
                    duration:3000,
                    message: '登記成功',
                  });
                }
                _this.tableData = res.data.data
                _this.showpackage =  false
                _this.Expressnumber = ''
                _this.Expresstype = ''
                _this.Category = ''
              }
            }
          }).catch(function (error) {
        console.log(error);
      });
    },

    //修改包裹
    updata(index, row) {
      this.packagetext = '修改'
      this.showpackage = true
      this.cid = row.cid
      this.Expressnumber = row.express_num
      this.Category = row.goods_type
      this.Expresstype = row.goods_sort
      this.entrepot =  row.entrepot
      this.Remarks = row.remark
      console.log(index, row);
    },
    //登记包裹
    Register_package(){
      this.packagetext = '登記'
      this.showpackage = true;
      this.Expressnumber = ''
      this.Category = ''
      this.Expresstype = ''
      this.Remarks = ''
    },
    //删除包裹
    Delete(index, row){
      console.log(index, tableData);
    },
    again:function(){
      this.Supplement = false;
      this.dragverify = false
      this.payment_method='';
    },
    //打包出货
    add_freight(type){
      if(type == 1){
        if(this.chosendata.length === 0){
          this.$message({
            type: 'error',
            offset:50,
            duration:3000,
            message: '請選擇出貨的包裹'
          });
          return false
        }
        this.Packshow = true
      }

      if(type == 2){
        var _this = this
        if(this.address == ''){
          this.$message({
            type: 'error',
            offset:50,
            duration:3000,
            message: '請選擇收穫地址'
          });
        }
        if(this.payment_method == 3 && this.order_rmb < this.r_money){
            this.dragverify = true
            return false
        }
        this.add_freightajax(1)
      }

    },
    //打包出货提交
    add_freightajax(type){
      var _this = this
      var cid = ''
      var data = {}
      if(this.chosendata.length === 1){
        cid = this.chosendata[0].cid
      }else {
        for (var i = 0;i<this.chosendata.length;i++){
          if(i != this.chosendata.length - 1){
            cid += this.chosendata[i].cid + ','
          }else {
            cid += this.chosendata[i].cid
          }
        }
      }
      this.add_freightloading = true

      if(type == 1){
        if(this.bankcode == ''){
          this.$message({
            type: 'error',
            offset:50,
            duration:3000,
            message: '請輸入銀行碼後5位'
          });
          this.add_freightloading = false
          return  false
        }
        data = {
          merber_id:this.$store.state.merber_id,
          token:this.$store.state.token,
          cid:cid,
          payment_method:this.payment_method,
          site_id:this.address,
          order_twd:this.order_twd,
          order_rmb:this.order_rmb,
          exchange_rate:this.exchange_rate,
          bankcode:this.bankcode
        }
      }
      if(type == 2){
        if(this.payment_method == 3){
          data = {
            merber_id:this.$store.state.merber_id,
            token:this.$store.state.token,
            cid:cid,
            payment_method:this.payment_method,
            site_id:this.address,
            order_twd:this.order_twd,
            order_rmb:this.order_rmb,
            exchange_rate:this.exchange_rate,
            bankcode:this.bankcode,
            merber_phone:this.merber_phone,
            payment_code:this.payment_code
          }
        }
        if(this.payment_method == 5){
          this.Supplement = true
          return false
        }
      }
      if(type == 3){
        if(this.withhold_type == ''){
          this.$message({
            type: 'error',
            offset:50,
            duration:3000,
            message: '請選擇補款方式'
          });
          return  false
        }
        data = {
          merber_id:this.$store.state.merber_id,
          token:this.$store.state.token,
          cid:cid,
          payment_method:this.payment_method,
          site_id:this.address,
          order_twd:this.order_twd,
          order_rmb:this.order_rmb,
          exchange_rate:this.exchange_rate,
          bankcode:this.bankcode,
          merber_phone:this.merber_phone,
          payment_code:this.payment_code,
          withhold_type:this.withhold_type
        }
      }
      this.$axios.post('https://www.trillionricher.com/1.0/add_freight',qs.stringify(data)).then(function (res) {
        if(res.data.success == -1){
          _this.Logout()
        }
        _this.add_freightloading = false
        if(res.data.success == 1) {
          if(_this.payment_method == 5){
            _this.$message({
              type: 'success',
              offset:50,
              duration:3000,
              message: '打包成功',
            });
          }else {
            _this.$message({
              type: 'success',
              offset:50,
              duration:3000,
              message: '打包成功,等待付款',
            });
          }

          _this.add_freightloading = false
          _this.Packshow = false
          _this.create_upda(2)
        }
        if(res.data.success == 8){
          _this.$message({
            type: 'error',
            offset:50,
            duration:3000,
            message: '驗證碼錯誤'
          });
          _this.payment_code = ''
        }
      }).catch(function (error) {
        console.log(error);
      });
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
    getsite(){
      var _this=this
      this.$axios.post('https://www.trillionricher.com/1.0/merber_site',qs.stringify({
        merber_id:this.$store.state.merber_id,
        token:this.$store.state.token,
      })).then(function (res) {
        console.log(res);
        if(res.data.success == -1){
          _this.Logout()
        }
        if(res.data.success == 1) {
          _this.sitedata = res.data.data
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getuserdata:function(){
      var _this = this
      this.$axios.post('https://www.trillionricher.com/1.0/order_bank_alipay',qs.stringify({
        merber_id:this.$store.state.merber_id,
        token:this.$store.state.token,
      })).then(function (res) {
        console.log(res);
        if(res.data.success == -1){
          _this.Logout()
        }
        if(res.data.success == 1) {
          _this.r_money = res.data.data.r_money
          _this.merber_phone = res.data.data.merber_phone
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    Reset:function(){
      this.slideshow = true
      this.dragverify = false
      this.Supplement = false;
      this.Agreement = false
      this.$refs.slideblock.reset();
    },
    //验证码60秒倒计时
    timer() {
      if (this.yzm.time > 0) {
        this.yzm.bled = true
        this.yzm.time--;
        this.yzm.text=this.yzm.time+"s後重新獲取";
        setTimeout(this.timer, 1000);
      } else{
        this.yzm.time=0;
        this.yzm.text="發送驗證碼";
        this.yzm.bled=false;
      }
    },
    //滑动验证成功
    onSuccess(times){
      var _this = this
      this.$axios.post('https://www.trillionricher.com/1.0/get_check',{
        merber_id:this.$store.state.merber_id,
        token:this.$store.state.token,
        merber_phone:this.merber_phone
      }).then(function (res) {
        if(res.data.success==-1) {
          this.Logout()
          return false
        }
        _this.$refs.slideblock.reset();
        _this.slideshow = true
        if(res.data.success==2){
          _this.$message.error("此手機號已註冊");
        }else if(res.data.success==1) {
          _this.$message({
            message: '短信驗證碼已發送',
            type: 'success'
          });
          _this.yzm.bled = true;
          _this.yzm.time = 60;
          _this.timer();
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    //滑动验证失败
    onFail(){
      this.$message({
        message: '驗證失敗',
        type: 'error',
        center: true
      });
    },
    //滑动图片刷新
    onRefresh(){
    },
    //检查为非人为操作回调
    onAgain() {
      this.$refs.slideblock.reset();
    },
  },
  computed: {},
  watch: {},
  mounted: function () {
    this.create_upda(2)
    this.getsite()
    this.getuserdata()
    this.screeHeight = document.body.clientHeight - 60
  }
}
</script>
<style>
*{
  font-family: "微软雅黑";
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-dialog{
  border-top-left-radius:10px !important;
  border-top-right-radius:10px !important;
}
.packagelist .el-dialog__body{
  padding: 10px 20px;
  max-height: 60vh;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.el-table__footer-wrapper table tbody tr td:nth-child(5) .cell{
  color: #ff464b;
  font-size: 14px !important;
  font-weight: bold;
}
.el-table__footer-wrapper table tbody tr td:nth-child(6) .cell{
  color: #ff464b;
  font-size: 14px !important;
  font-weight: bold;
}

.Payment{
  margin-top: 20px;
}
.Payment h5{
  margin: 10px 0;
}

.payment_method{
  display: flex;


}
.payment_method img{
  height: 60px;
  width: 180px;
}
.payment_method >div{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 30px;
  font-size: 14px;

}
.packagelist .payment_method >div p{
  font-size: 14px;
  margin: 3px 0;
}

.total p{
  text-align: right;
  padding:10px 20px;
  border-bottom:1px solid #EBEEF5;
}
.total p span:nth-child(2){
  color: red;
}
.packagelist .el-input--mini .el-input__inner {
  height: 32px;
}
</style>
