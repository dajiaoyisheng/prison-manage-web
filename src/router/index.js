import Vue from 'vue'
import Router from 'vue-router'
import content from '@/components/commons/content.vue'
// import workbench from '@/components/pages/workbench/workbench.vue'
// import tvmonitor from '@/components/pages/tvmonitor/tvmonitor.vue'
// import personnelposition from '@/components/pages/personnelposition/personnelposition.vue'
// import pointname from '@/components/pages/pointname/pointname.vue'
// import posunusual from '@/components/pages/querystats/posunusual/posunusual.vue'
// import violation from '@/components/pages/querystats/violation/violation.vue'
// import prewarningstats from '@/components/pages/querystats/prewarningstats/prewarningstats.vue'
// import prisonmanagement from '@/components/pages/systemset/prisonmanagement/prisonmanagement.vue'
// import prisonermanagement from '@/components/pages/systemset/prisonermanagement/prisonermanagement.vue'
// import operation from '@/components/pages/systemset/prisonermanagement/operation.vue'
// import cameramanagement from '@/components/pages/systemset/cameramanagement/cameramanagement.vue'
// import servermanagement from '@/components/pages/systemset/servermanagement/servermanagement.vue'
// import calendarmanagement from '@/components/pages/systemset/calendarmanagement/calendarmanagement.vue'
// import sysoptionsmanagement from '@/components/pages/systemset/sysoptionsmanagement/sysoptionsmanagement.vue'
// import systemmanagement from '@/components/pages/systemset/systemmanagement/systemmanagement.vue'

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
        // component: workbench
        component: () =>
          import('@/components/pages/workbench/workbench.vue')

      },
      {
        path: '/tvmonitor',
        name: 'tvmonitor',
        // component: tvmonitor
        component: () =>
          import('@/components/pages/tvmonitor/tvmonitor.vue')
      },
      {
        path: '/personnelposition',
        name: 'personnelposition',
        // component: personnelposition
        component: () =>
          import('@/components/pages/personnelposition/personnelposition.vue')
      },
      {
        path: '/pointname',
        name: 'pointname',
        // component: pointname
        component: () =>
          import('@/components/pages/pointname/pointname.vue')
      },
      {
        path: '/querystats/posunusual',
        name: 'posunusual',
        // component: posunusual
        component: () =>
          import('@/components/pages/querystats/posunusual/posunusual.vue')
      },
      {
        path: '/querystats/violation',
        name: 'violation',
        // component: violation
        component: () =>
          import('@/components/pages/querystats/violation/violation.vue')
      },
      {
        path: '/querystats/prewarningstats',
        name: 'prewarningstats',
        // component: prewarningstats
        component: () =>
          import('@/components/pages/querystats/prewarningstats/prewarningstats.vue')
      },
      {
        path: '/systemset/prisonmanagement',
        name: 'prisonmanagement',
        // component: prisonmanagement
        component: () =>
          import('@/components/pages/systemset/prisonmanagement/prisonmanagement.vue')
      },
      {
        path: '/systemset/prisonermanagement',
        name: 'prisonermanagement',
        // component: prisonermanagement
        component: () =>
          import('@/components/pages/systemset/prisonermanagement/prisonermanagement.vue')
      },
      {
        path: '/systemset/prisonermanagement/operation',
        name: 'operation',
        // component: operation
        component: () =>
          import('@/components/pages/systemset/prisonermanagement/operation.vue')
      },
      {
        path: '/systemset/cameramanagement',
        name: 'cameramanagement',
        // component: cameramanagement
        component: () =>
          import('@/components/pages/systemset/cameramanagement/cameramanagement.vue')
      },
      {
        path: '/systemset/servermanagement',
        name: 'servermanagement',
        // component: servermanagement
        component: () =>
          import('@/components/pages/systemset/servermanagement/servermanagement.vue')
      },
      {
        path: '/systemset/calendarmanagement',
        name: 'calendarmanagement',
        // component: calendarmanagement
        component: () =>
          import('@/components/pages/systemset/calendarmanagement/calendarmanagement.vue')
      },
      {
        path: '/systemset/sysoptionsmanagement',
        name: 'sysoptionsmanagement',
        // component: sysoptionsmanagement
        component: () =>
          import('@/components/pages/systemset/sysoptionsmanagement/sysoptionsmanagement.vue')
      },
      {
        path: '/systemset/systemmanagement',
        name: 'systemmanagement',
        // component: systemmanagement
        component: () =>
          import('@/components/pages/systemset/systemmanagement/systemmanagement.vue')
      }
    ]
  }]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/workbench') {
    next()
  } else if (to.path === '/tvmonitor') {
    next()
  } else if (to.path === '/personnelposition') {
    next()
  } else if (to.path === '/pointname') {
    next()
  } else if (to.path === '/querystats/posunusual') {
    next()
  } else if (to.path === '/querystats/violation') {
    next()
  } else if (to.path === '/querystats/prewarningstats') {
    next()
    // } else if (to.path === '/querystats') {
    //     next()
  } else if (to.path === '/systemset/prisonmanagement') {
    next()
  } else if (to.path === '/systemset/prisonermanagement') {
    next()
  } else if (to.path === '/systemset/prisonermanagement/operation') {
    next()
  } else if (to.path === '/systemset/cameramanagement') {
    next()
  } else if (to.path === '/systemset/servermanagement') {
    next()
  } else if (to.path === '/systemset/calendarmanagement') {
    next()
  } else if (to.path === '/systemset/sysoptionsmanagement') {
    next()
  } else if (to.path === '/systemset/systemmanagement') {
    next()
  } else if (localStorage.getItem('token')) {
    next()
  } else {
    next({
      path: '/workbench'
    })
  }
})
export default router
