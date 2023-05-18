import Vue from 'vue'
import Vuex from  'vuex'
Vue.use(Vuex)
import Cookies from 'js-cookie'

export default new Vuex.Store({
    state:{
        islogin:false,
        merber_id :Cookies.get('merber_id'),
        merber_name :Cookies.get('merber_name') ,
        token :Cookies.get('egopay_key'),
    },
    mutations:{
        SET_MERBERNAME(state,data){
            state.merber_name = data
        }
    }
})