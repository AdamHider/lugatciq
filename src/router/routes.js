import MainLayout from 'layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        component: () => import('pages/HomePage.vue'),
        meta: { pageTitle: 'Home' }
      },
      {
        path: 'wordform-:wordform_id',
        component: () => import('pages/WordformPage.vue'),
        meta: { pageTitle: 'Wordform' }
      },
      {
        path: 'sets',
        component: () => import('pages/SetsPage.vue'),
        meta: { pageTitle: 'Sets' }
      },
      {
        path: 'set-:set_id',
        component: () => import('pages/SetsPage.vue'),
        meta: { pageTitle: 'Set' }
      },
      {
        path: 'lemmas',
        component: () => import('pages/LemmasPage.vue'),
        meta: { pageTitle: 'Lemmas' }
      },
      {
        path: 'lemma-:lemma_id',
        component: () => import('pages/LemmaPage.vue'),
        meta: { pageTitle: 'Lemma' }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
