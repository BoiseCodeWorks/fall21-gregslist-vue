import { authGuard, authSettled } from '@bcwdev/auth0provider-client'
import { createRouter, createWebHashHistory } from 'vue-router'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage'),
    beforeEnter: authSettled
  },
  {
    path: '/cars',
    name: 'Cars',
    component: loadPage('CarsPage')
  },
  {
    path: '/cars/:carId',
    name: 'Car',
    component: loadPage('CarPage')
  },
  {
    path: '/houses',
    name: 'Houses',
    component: loadPage('HousesPage')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: loadPage('JobsPage')
  },
  {
    path: '/account/:accountId',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard,
    children: [
      {
        // NOTE no slashing / children
        path: 'settings',
        name: 'Account.Settings',
        component: loadPage('AccountSettingsPage')
      },
      {
        // NOTE no slashing / children
        path: 'listings',
        name: 'Account.Listings',
        component: loadPage('AccountListingsPage')
      }

    ]
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
