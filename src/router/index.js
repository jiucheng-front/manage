import Vue            from 'vue'
import Router         from 'vue-router'

import home           from '@/views/home'
import userList       from '@/views/user-list'
import godList        from '@/views/god-list'
import login          from '@/views/login'
import hobbyWord      from '@/views/basesys/hobby-word'
import cityBizcatList from '@/views/basesys/city-bizcat-list'
import godCityList    from '@/views/basesys/god-city-list'
import bizCert        from '@/views/basesys/biz-cert'
import bizCat         from '@/views/basesys/biz-cat'

import userReport     from '@/views/user/user-report'
import userFreezeList from '@/views/user/user-freeze-list'

import adminUserList  from '@/views/admin_user/user-list'
import adminRoleList  from '@/views/admin_user/role-list'
import adminPowerList from '@/views/admin_user/power-list'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/adminUserList',
            name: 'adminUserList',
            component: adminUserList
        },
        {
            path: '/adminRoleList',
            name: 'adminRoleList',
            component: adminRoleList
        },
        {
            path: '/adminPowerList',
            name: 'adminPowerList',
            component: adminPowerList
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/userList',
            name: 'userList',
            component: userList
        },
        {
            path: '/user/user-report',
            name: 'userReport',
            component: userReport
        },
        {
            path: '/user/user-freeze-list',
            name: 'userFreezeList',
            component: userFreezeList
        },
        {
            path: '/basesys/biz-cert',
            name: 'bizCert',
            component: bizCert
        },
        {
            path: '/basesys/biz-cat',
            name: 'bizCat',
            component: bizCat
        },
        {
            path: '/basesys/god-city-list',
            name: 'godCityList',
            component: godCityList
        },
        {
            path: '/basesys/hobby-word',
            name: 'hobbyWord',
            component: hobbyWord
        },
        {
            path: '/basesys/city-bizcat-list',
            name: 'cityBizcatList',
            component: cityBizcatList
        },
        {
            path: '/godList',
            name: 'godList',
            component: godList
        }
    ]
})
