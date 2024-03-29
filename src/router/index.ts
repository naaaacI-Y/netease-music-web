
import useGlobalStore from '@/store/globalStore';
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
    path: '/personal-center/:id',
    name: 'PersonalCenter',
    component: () => import('@/pages/personalCenter/index.vue'),
  },
  {
    path: '/song-list/:id',
    name: 'SongList',
    component: () => import('@/pages/songList/index.vue'),
  },
  {
    path: '/singer-home/:id',
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
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: () => import('@/pages/album/index.vue'),
  },
  {
    path: '/mv-detail/:id',
    name: 'MvDetail',
    component: () => import('@/pages/video/MvDetail.vue'),
  },
  {
    path: '/video-detail/:id',
    name: 'VideoDetail',
    component: () => import('@/pages/video/VideoDetail.vue'),
  },
  {
    path: '/high-qualtity-song-list',
    name: 'HighQualtitySongList',
    component: () => import('@/pages/findMusic/HighQualtitySongList.vue'),
  },
  {
    path: '/day-recommend',
    name: 'DayRecommend',
    component: () => import('@/pages/findMusic/personalRecommend/components/DayRecommend.vue'),
  },
  {
    path: '/search-result-detail/:keywords',
    name: 'SearchResultDetail',
    component: () => import('@/pages/search/SearchResultDetail.vue'),
  },
  {
    path: '/hot-comment/:id/:type',
    name: 'HotComment',
    component: () => import('@/pages/hotComment/index.vue'),
  },
  {
    path: '/recent-play',
    name: 'RecentPlay',
    component: () => import('@/pages/reccentPlay/index.vue'),
  },
  {
    path: '/my-collection/:index',
    name: 'MyCollection',
    component: () => import('@/pages/myCollection/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  // router starts its navigation after the router is installed and pinia will be installed too
  const globalstate = useGlobalStore()
  if (globalstate.isShowPlayPage) {
    globalstate.isShowPlayPage = false
  }
  next()
})
export default router
