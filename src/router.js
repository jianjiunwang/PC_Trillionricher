import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index'
import Register from './components/Register'
// import VipIndex from './components/VipIndex'
import Record from './components/Record'
import SubStitute from './components/SubStitute'
import SubStituteOne from './components/SubStitute_one'
import SubStituteTwo from './components/SubStitute_two'
import OrderDetails from './components/OrderDetails'
import OrderDetails_cmy from './components/OrderDetails_cmy'
import RecordRb from './components/RecordRb'
import Stored from './components/Stored'
import Pagelist from './components/Pagelist'
import Daichu from './components/daichu'
import Helpcenter from './components/Helpcenter'
import Sellwell from './components/Sellwell'
import Platform_r from './components/Platform_r'
import OrderDetails_zb from './components/OrderDetails_zb'
import Daishou from './components/daishou'

import Indexc from './components/Consolidation/index_c'
import OrderList from './components/Consolidation/orderlist'
import Packagelist from './components/Consolidation/packagelist'
import Address from './components/Consolidation/address'


import demo from './components/demo'




Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {path: '/', component: Index},
        {path: '/register', component: Register},
        {path: '/record', component: Record},
        {path: '/stored',component: Stored},
		{path: '/recordrb',component: RecordRb},
        {path: '/substitute', name:'Substitute',component: SubStitute,redirect:'/substitute/One',children:[
            {
                path:'One',
                name:'One',
                component:SubStituteOne
            },
            {
                path:'Two',
                name:'Two',
                component:SubStituteTwo
            }
         ]},
        
        {path: '/orderDetails',component: OrderDetails},
        {path: '/orderDetails_cmy',component: OrderDetails_cmy},
        {path: '/pagelist', component: Pagelist},
        {path: '/daichu', component: Daichu},
        {path: '/daishou', component: Daishou},
        {path: '/helpcenter', component: Helpcenter},
        {path: '/sellwell', component: Sellwell},
        {path: '/Platform_r', component: Platform_r},
        {path: '/orderDeta_zb', component: OrderDetails_zb},
        {path: '/demo', component: demo},
            {path: '/index_c', name: 'index_c', component: Indexc,redirect:'/index_c/orderlist',children:[
                {path: 'orderlist' ,name:'orderlist' ,component: OrderList},
                {path: 'packagelist' ,name:'packagelist' ,component: Packagelist},
                {path: 'address' ,name:'address' ,component: Address},
            ]
        },
    ]
});





