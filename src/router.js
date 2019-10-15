import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFount from './views/404.vue'
import Backstage from './views/Backstage.vue'
import mainBar from './components/Backstage/mainBar.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Backstage',
      component: Backstage,
      children: [
        { path: 'Homepage',
          name: 'Homepage',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/HomePage'),
          meta: { title: '首页', icon: 'Backstage_Home', requireAuth: true } },

        { path: 'Album',
          name: 'Album',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/Album'),
          meta: { title: '专辑管理', icon: 'Backstage_Album' } },

        { path: 'Music',
          name: 'Music',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/Music'),
          meta: { title: '音乐管理', icon: 'Backstage_Music' }
        },

        { path: 'Radio',
          name: 'Radio',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/Radio'),
          meta: { title: '电台管理', icon: 'Backstage_Radio' }
        },

        { path: 'MusicianInfo',
          name: 'MusicianInfo',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/MusicianInfo'),
          meta: { title: '音乐人信息', icon: 'Backstage_Audio' },
          hidden: true },

        { path: 'About',
          name: 'About',
          show: false,
          mouseshow: false,
          component: mainBar,
          meta: { title: '关于作者', icon: 'Backstage_About' },
          haveChildren: false,
          children: [
            { path: 'Communicate',
              name: 'Communicate',
              show: false,
              mouseshow: false,
              component: () => import('@/views/Backstage/About/Communicate'),
              meta: { title: '联系交流', icon: 'Backstage_Communicate' } },
            { path: 'More',
              name: 'More',
              show: false,
              mouseshow: false,
              component: mainBar,
              meta: { title: '联系交流', icon: 'Backstage_Communicate' },
              children: [
                { path: 'Connection',
                  name: 'Connection',
                  show: false,
                  mouseshow: false,
                  component: () => import('@/views/Backstage/About/More/Connection'),
                  meta: { title: '联系交流', icon: 'Backstage_Communicate' } }
              ]
            }
          ]
        },
        { path: 'UploadMusic',
          name: 'UploadMusic',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/UploadMusic'),
          meta: { title: '歌曲上传', icon: 'Backstage_Music' },
          hidden: true },

        { path: 'EditMusic',
          name: 'EditMusic',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/EditMusic'),
          meta: { title: '编辑歌曲', icon: 'Backstage_Music' },
          hidden: true },

        { path: 'NewRadio',
          name: 'NewRadio',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/NewRadio'),
          meta: { title: '创建电台', icon: 'Backstage_Radio' },
          hidden: true
        },

        { path: 'EditRadio',
          name: 'EditRadio',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/EditRadio'),
          meta: { title: '编辑电台', icon: 'Backstage_Radio' },
          hidden: true
        },

        { path: 'UploadRadioShow',
          name: 'UploadRadioShow',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/UploadRadioShow'),
          meta: { title: '上传电台节目', icon: 'Backstage_Radio' },
          hidden: true
        },

        { path: 'NewAlbum',
          name: 'NewAlbum',
          show: false,
          mouseshow: false,
          component: () => import('@/views/Backstage/NewAlbum'),
          meta: { title: '创建专辑', icon: 'Backstage_Album' },
          hidden: true
        }

      ],
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '*',
      name: '404',
      component: NotFount
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (token === 'null' || token === '') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
