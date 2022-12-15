import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'FindMusic',
    component: () => import('@/pages/findMusic/index.vue'),
    redirect: "findMusic/personal-recommend",
    children: [
      {
        path: "findMusic/personal-recommend",
        name: "PersonalRecommend",
        component: () => import('@/pages/findMusic/personalRecommend/index.vue'),
      },
      {
        path: "findMusic/song-menu",
        name: "SongMenu",
        component: () => import('@/pages/findMusic/SongMenu.vue')
      },
      {
        path: "findMusic/host-radio",
        name: "HostRadio",
        component: () => import('@/pages/findMusic/HostRadio.vue'),
      },
      {
        path: "findMusic/rank",
        name: "Rank",
        component: () => import('@/pages/findMusic/Rank.vue'),
      },
      {
        path: "findMusic/singer",
        name: "Singer",
        component: () => import('@/pages/findMusic/Singer.vue'),
      },

      {
        path: "findMusic/newest-music",
        name: "NewestMusic",
        component: () => import('@/pages/findMusic/NewestMusic.vue'),
      },
    ]
  },
  {
    path: '/personal-fm',
    name: 'PersonalFM',
    component: () => import('@/pages/personalFm/index.vue'),
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/pages/video/index.vue'),
    redirect: "video/video-inside",
    children: [
      {
        path: 'video-inside',
        name: 'VideoChild',
        component: () => import('@/pages/video/Video.vue'),
      },
      {
        path: 'mv',
        name: 'VideoMv',
        component: () => import('@/pages/video/Mv.vue'),
      },
      {
        path: 'all-mv',
        name: 'AllMv',
        component: () => import('@/pages/video/AllMv.vue'),
      },
    ]
  },
  // {
  //   path: '/focus',
  //   name: 'Focus',
  //   component: () => import('@/pages/focus/index.vue'),
  // },
  {
    path: '/personal-center',
    name: 'PersonalCenter',
    component: () => import('@/pages/personalCenter/index.vue'),
  },
  {
    path: '/song-list',
    name: 'SongList',
    component: () => import('@/pages/songList/index.vue'),
  },
  {
    path: '/singer-home',
    name: 'SingerHome',
    component: () => import('@/pages/singer/index.vue'),
  },
  {
    path: '/unique-play',
    name: 'UniquePlay',
    component: () => import('@/pages/uniquePlay/index.vue'),
  },
  {
    path: '/fans',
    name: 'Fans',
    component: () => import('@/pages/personalCenter/Fans.vue'),
  },
  {
    path: '/focus',
    name: 'Focus',
    component: () => import('@/pages/personalCenter/Focus.vue'),
  },
  {
    path: '/dynamic',
    name: 'Dynamic',
    component: () => import('@/pages/personalCenter/Dynamic.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
