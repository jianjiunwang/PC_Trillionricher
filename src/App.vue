<template>
  <div id="app">
      <div class="wrapper">
          <Header v-if="$route.path.slice(0,8)!='/index_c'"></Header>
          <router-view v-if="isRouterAlive"></router-view>
          <Footer v-if="$route.path.slice(0,8)!='/index_c'"></Footer>
      </div>
      <el-dialog
              :visible.sync="dialogVisible"
              :close-on-click-modal="false"
              :close-on-press-escape="false"
              :show-close="false"
              width="600px"
      >
             <span slot="title"  @click="webpwd = true">
                兆富通維護公告
            </span>
          <div class="tongzhistyle"  v-html="gonggaohtmnl">

          </div>
          <el-input v-show="webpwd" v-model="WEBpassword" placeholder="請輸入" @keyup.enter.native="webpassword"></el-input>
      </el-dialog>
  </div>
</template>

<script>
    import Header from './components/vues/Header'
    import Footer from './components/vues/Footer'
    import '../src/assets/css/style.css'
    import Cookies from 'js-cookie'

    export default {
        name: 'App',
        provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
            return {
                reload: this.reload
            }
        },
        data() {
            return{
                gonggaohtmnl:'',
                isRouterAlive: true,                    //控制视图是否显示的变量
                dialogVisible:false,//维修公告
                WEBpassword:'',
                webpwd:false,
                merber_id:Cookies.get('merber_id'),
                merber_name:Cookies.get('merber_name'),
                token:Cookies.get('egopay_key'),
            }
        },
        methods: {
            islogin:function () {
                if(this.merber_id != undefined && this.token!==undefined){
                    this.$store.state.islogin = true
                }
            },
            webpassword:function () {
                if(this.WEBpassword=='0978522319'){
                    this.dialogVisible = false
                }
            }
        },
        components:{
            Footer,
            Header,
        },
        created:function () {
            this.islogin()
            console.log(this.$route.path.slice(0,8));
            $.ajax({
                type: "POST",
                url: "https://www.trillionricher.com/1.0/notice_switch",
                dataType: "json",
                success: (res) => {
                    if (res.success == 1) {
                        if (res.data[1].switch == 1) {
                            this.dialogVisible = true
                            this.gonggaohtmnl = res.data[1].content
                        }else {
                            this.dialogVisible = false
                        }
                    }
                }
            })
        }
    }
</script>
<style>
    .tongzhistyle{
        padding:30px 20px;
        font-size: 18px;

    }
    .tongzhistyle img{
        width: 100%;
    }
</style>
