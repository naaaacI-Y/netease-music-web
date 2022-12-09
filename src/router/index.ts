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
        path: "findMusic/songList",
        name: "SongList",
        component: () => import('@/pages/findMusic/personalRecommend/index.vue'),
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
        path: "findMusic/songList",
        name: "SongList",
        component: () => import('@/pages/findMusic/SongList.vue'),
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
    // component: PersonalFM
    component: () => import('@/pages/personalFm/index.vue'),
  },
  {
    path: '/video',
    name: 'Video',
    // component: Video
    component: () => import('@/pages/video/index.vue')
  },
  {
    path: '/focus',
    name: 'Focus',
    // component: Video
    component: () => import('@/pages/focus/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
