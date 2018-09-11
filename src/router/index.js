import Vue from 'vue'
import Router from 'vue-router'
const content = () =>
  import('@/components/commons/content.vue')
const workbench = () =>
  import('@/components/pages/workbench/workbench.vue')
const tvmonitor = () =>
  import('@/components/pages/tvmonitor/tvmonitor.vue')
const personnelposition = () =>
  import('@/components/pages/personnelposition/personnelposition.vue')
const pointname = () =>
  import('@/components/pages/pointname/pointname.vue')
const posunusual = () =>
  import('@/components/pages/querystats/posunusual/posunusual.vue')
const violation = () =>
  import('@/components/pages/querystats/violation/violation.vue')
const prewarningstats = () =>
  import('@/components/pages/querystats/prewarningstats/prewarningstats.vue')
const prisonmanagement = () =>
  import('@/components/pages/systemset/prisonmanagement/prisonmanagement.vue')
const prisonermanagement = () =>
  import('@/components/pages/systemset/prisonermanagement/prisonermanagement.vue')
const operation = () =>
  import('@/components/pages/systemset/prisonermanagement/operation.vue')
const cameramanagement = () =>
  import('@/components/pages/systemset/cameramanagement/cameramanagement.vue')
const servermanagement = () =>
  import('@/components/pages/systemset/servermanagement/servermanagement.vue')
const calendarmanagement = () =>
  import('@/components/pages/systemset/calendarmanagement/calendarmanagement.vue')
const sysoptionsmanagement = () =>
  import('@/components/pages/systemset/sysoptionsmanagement/sysoptionsmanagement.vue')
const systemmanagement = () =>
  import('@/components/pages/systemset/systemmanagement/systemmanagement.vue')

Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/Content'
  }, {
    path: '/Content',
    component: content,
    children: [{
        path: '/',
        redirect: '/workbench'
      },
      {
        path: '/workbench',
        name: 'workbench',
        component: workbench
      },
      {
        path: '/tvmonitor',
        name: 'tvmonitor',
        component: tvmonitor
      },
      {
        path: '/personnelposition',
        name: 'personnelposition',
        component: personnelposition
      },
      {
        path: '/pointname',
        name: 'pointname',
        component: pointname
      },
      {
        path: '/querystats/posunusual',
        name: 'posunusual',
        component: posunusual
      },
      {
        path: '/querystats/violation',
        name: 'violation',
        component: violation
      },
      {
        path: '/querystats/prewarningstats',
        name: 'prewarningstats',
        component: prewarningstats
      },
      {
        path: '/systemset/prisonmanagement',
        name: 'prisonmanagement',
        component: prisonmanagement
      },
      {
        path: '/systemset/prisonermanagement',
        name: 'prisonermanagement',
        component: prisonermanagement
      },
      {
        path: '/systemset/prisonermanagement/operation',
        name: 'operation',
        component: operation
      },
      {
        path: '/systemset/cameramanagement',
        name: 'cameramanagement',
        component: cameramanagement
      },
      {
        path: '/systemset/servermanagement',
        name: 'servermanagement',
        component: servermanagement
      },
      {
        path: '/systemset/calendarmanagement',
        name: 'calendarmanagement',
        component: calendarmanagement
      },
      {
        path: '/systemset/sysoptionsmanagement',
        name: 'sysoptionsmanagement',
        component: sysoptionsmanagement
      },
      {
        path: '/systemset/systemmanagement',
        name: 'systemmanagement',
        component: systemmanagement
      }
    ]
  }]
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/workbench') {
//     next()
//   } else if (to.path === '/tvmonitor') {
//     next()
//   } else if (to.path === '/personnelposition') {
//     next()
//   } else if (to.path === '/pointname') {
//     next()
//   } else if (to.path === '/querystats/posunusual') {
//     next()
//   } else if (to.path === '/querystats/violation') {
//     next()
//   } else if (to.path === '/querystats/prewarningstats') {
//     next()
//   } else if (to.path === '/systemset/prisonmanagement') {
//     next()
//   } else if (to.path === '/systemset/prisonermanagement') {
//     next()
//   } else if (to.path === '/systemset/prisonermanagement/operation') {
//     next()
//   } else if (to.path === '/systemset/cameramanagement') {
//     next()
//   } else if (to.path === '/systemset/servermanagement') {
//     next()
//   } else if (to.path === '/systemset/calendarmanagement') {
//     next()
//   } else if (to.path === '/systemset/sysoptionsmanagement') {
//     next()
//   } else if (to.path === '/systemset/systemmanagement') {
//     next()
//   } else if (localStorage.getItem('token')) {
//     next()
//   } else {
//     next({
//       path: '/workbench'
//     })
//   }
// })
export default router
