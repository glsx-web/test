import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import _ from 'lodash'
import Forbidden from '../views/403'
import {
  check,
  isLogin
} from '@/utils/auth'
// import Layout from '@/views/layout'

// const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const routers = [
  //   {
  //   path: '/layout',
  //   component: Layout
  // },
  {
    path: '/user',
    hideMenu: true,
    redirect: '/user/login',
    component: {
      render: h => h('router-view')
    },
    children: [{
      path: '/user/login',
      name: 'login',
      component: () => import('../views/user/login')
    }, {
      path: '/user/register',
      name: 'register',
      component: () => import('../views/user/register')
    }]
  }, {
    path: '/',
    meta: {
      authority: ['user', 'admin']
    },
    component: () => import('../views/layout/basicLayout'),
    children: [{
      path: '/',
      redirect: '/only'
    }, {
      path: '/only',
      name: 'only',
      meta: {
        icon: 'menu',
        title: '单个表单'
      },
      component: () => import('../views/dashboard/analysis')
    }, {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        icon: 'menu',
        title: '仪表盘'
      },
      component: {
        render: h => h('router-view')
      },
      children: [{
        path: '/dashboard/analysis',
        name: 'analysis',
        meta: {
          title: '分析页'
        },
        component: () => import('../views/dashboard/analysis')
      }]
    }, {
      path: '/form',
      name: 'form',
      component: {
        render: h => h('router-view')
      },
      meta: {
        icon: 's-order',
        title: '表单',
        authority: ['admin']
      },
      children: [{
        path: '/form/basic-form',
        name: 'basicform',
        meta: {
          icon: 's-order',
          title: '基础表单'
        },
        component: () => import('../views/forms/basicform')
      }, {
        path: '/form/step-form',
        name: 'stepform',
        // redirect: '/form/step-form/info',
        meta: {
          icon: 's-order',
          title: '分布表单'
        },
        hideChildrenMenu: true,
        component: () => import('../views/forms/stepForm'),
        children: [{
          path: '/form/step-form/info',
          name: 'info',
          meta: {
            icon: 's-order',
            title: '第一步'
          },
          component: () => import('../views/forms/StepForm/step1')
        }, {
          path: '/form/step-form/confirm',
          name: 'confirm',
          meta: {
            icon: 's-order',
            title: '第2步'
          },
          component: () => import('../views/forms/StepForm/step2')
        }, {
          path: '/form/step-form/result',
          name: 'result',
          meta: {
            icon: 's-order',
            title: '第3步'
          },
          component: () => import('../views/forms/StepForm/step3')
        }]
      }]
    }]
  }, {
    path: '/403',
    name: '403',
    hideMenu: true,
    component: Forbidden
  }
]

const router = new Router({
  // mode: 'history',
  routes: routers
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const record = _.findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if (to.path !== '403') {
      next({
        path: '/403'
      })
    }
    NProgress.done()
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
