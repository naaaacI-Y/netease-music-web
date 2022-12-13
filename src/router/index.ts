import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'FindMusic',
    component: () => import('@/pages/findMusic/index.vue'),
    redirect: "findMusic/personalRecommend",
    children: [
      {
        path: "findMusic/personalRecommend",
        name: "PersonalRecommend",
        component: () => import('@/pages/findMusic/personalRecommend/index.vue'),
      },
      {
        path: "findMusic/songMenu",
        name: "SongMenu",
        component: () => import('@/pages/findMusic/SongMenu.vue')
      },
      {
        path: "findMusic/hostRadio",
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
        path: "findMusic/newestMusic",
        name: "NewestMusic",
        component: () => import('@/pages/findMusic/NewestMusic.vue'),
      },
    ]
  },
  {
    path: '/personalFm',
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
  {
    path: '/focus',
    name: 'Focus',
    component: () => import('@/pages/focus/index.vue'),
  },
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
    path: '/home-focus',
    name: 'HomeFocus',
    component: () => import('@/pages/homeFocus/index.vue'),
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
