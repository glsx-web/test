import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import Layout from '@/views/layout'

// const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const routers = [
  // 依赖注入和slot
  // {
  //   path: '/layout',
  //   component: () => import('../views/layout')
  // },
  {
    path: '/user',
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
    component: () => import('../views/layout/basicLayout'),
    children: [{
      path: '/',
      redirect: '/dashboard/analysis'
    }, {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        icon: 'dashboard',
        title: '仪表盘'
      },
      component: {
        render: h => h('router-view')
      },
      children: [{
        path: 'analysis',
        name: 'analysis',
        meta: {
          requiresAuth: true
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
        icon: 'form',
        name: '表单'
      },
      children: [{
        path: '/form/basic-form',
        name: 'basicform',
        component: () => import('../views/forms/basicform')
      }, {
        path: '/form/step-form',
        name: 'stepform',
        hideChildrenMenu: true,
        component: () => import('../views/forms/stepForm'),
        children: [{
          path: '/form/step-form',
          redirect: '/form/step-form/info'
        }, {
          path: '/form/step-form/info',
          name: 'info',
          component: () => import('../views/forms/StepForm/step1')
        }, {
          path: '/form/step-form/confirm',
          name: 'confirm',
          component: () => import('../views/forms/StepForm/step2')
        }, {
          path: '/form/step-form/result',
          name: 'result',
          component: () => import('../views/forms/StepForm/step3')
        }]
      }]
    }]
  }
]

const router = new Router({
  // mode: 'history',
  routes: routers
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
