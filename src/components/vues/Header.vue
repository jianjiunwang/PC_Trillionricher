<template>
    <div class="header">
        <div class="header_container">
            <div>
                <div class="header_logo">
                    <router-link to="/">
                        <img src="../../assets/image/img/head_logo.png" >
                    </router-link>
                </div>
            </div>
            <div class="header_reat">
                <ul>
                    <li><img src="../../assets/image/img/kefu.png" alt=""> <a href="https://line.me/R/ti/p/%40653ymryv" target="_blank" >客服 </a> </li>
                    <li><img src="../../assets/image/img/bangzhu.png" alt=""><router-link to="/helpcenter">幫助中心 </router-link></li>
                    <li class="headimg" v-show="$store.state.merber_name"><img src="../../assets/image/img/newlogo.png" alt="" >{{ $store.state.merber_name }}</li>
                    <li style="cursor: pointer"  v-show="$store.state.merber_name" @click="dengchu"><img src="../../assets/image/img/tuichu.png" alt="" >登出</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/css/style.css'
    import Cookies from 'js-cookie'
    export default {
        data() {
            return {
                merber_id:Cookies.get('merber_id'),
                exRuptime:'',//汇率
                exchangeRrate :'',//汇率更新时间
            }
        },
        components: {},
        methods: {
            gethuilv:function(){
                var _this = this
                this.$axios.post('https://www.trillionricher.com/1.0/exchange', {
                    exchange_type:4
                }).then(function (res) {
                        if(res.data.msg==""){
                            this.huilv='网络故障。请稍后....'
                        }
                        _this.exchangeRrate=res.data.data[0].exchange
                        _this.exRuptime = res.data.data[0].update_time
                }).catch(function (error) {
                        console.log(error);
                });
            },
            dengchu(e) {
                var _this = this
                this.$confirm('您將退出兆富通，是否繼續？', '提示', {
                    confirmButtonText: '確定',
                    cancelButtonText: '我再看看',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '登出成功!'
                    });
                    _this.$router.push('/');
                    this.$store.state.islogin = false
                    Cookies.remove('merber_id','',{ path: '' });
                    Cookies.remove('merber_name','',{ path: '' });
                    Cookies.remove('egopay_key','',{ path: '' });
                    Cookies.remove('merber_nickname','',{ path: '' });
                    Cookies.remove('head_portrait','',{ path: '' });
                    this.$store.commit('SET_MERBERNAME','')
                    location.reload();
                }).catch((e)=>{
            
                })
            },

        },
        computed: {},
        watch: {
        },
        created: function () {
            this.gethuilv();
        }
    }
</script>
