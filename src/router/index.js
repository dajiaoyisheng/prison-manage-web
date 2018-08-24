import Vue from 'vue'
import Router from 'vue-router'
import content from '@/components/commons/content.vue'
import workbench from '@/components/pages/workbench/workbench.vue'
import tvmonitor from '@/components/pages/tvmonitor/tvmonitor.vue'
import personnelposition from '@/components/pages/personnelposition/personnelposition.vue'
import pointname from '@/components/pages/pointname/pointname.vue'
import posunusual from '@/components/pages/querystats/posunusual/posunusual.vue'
import violation from '@/components/pages/querystats/violation/violation.vue'
import prewarningstats from '@/components/pages/querystats/prewarningstats/prewarningstats.vue'
import querystats from '@/components/pages/querystats/querystats.vue'
import prisonmanagement from '@/components/pages/systemset/prisonmanagement/prisonmanagement.vue'
import prisonermanagement from '@/components/pages/systemset/prisonermanagement/prisonermanagement.vue'
import operation from '@/components/pages/systemset/prisonermanagement/operation.vue'
import cameramanagement from '@/components/pages/systemset/cameramanagement/cameramanagement.vue'
import servermanagement from '@/components/pages/systemset/servermanagement/servermanagement.vue'
import calendarmanagement from '@/components/pages/systemset/calendarmanagement/calendarmanagement.vue'
import sysoptionsmanagement from '@/components/pages/systemset/sysoptionsmanagement/sysoptionsmanagement.vue'
import systemmanagement from '@/components/pages/systemset/systemmanagement/systemmanagement.vue'

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
                path: '/querystats',
                name: 'querystats',
                component: querystats
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
    } else if (to.path === '/querystats') {
        next()
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
        next({ path: '/workbench' })
    }
})
export default router