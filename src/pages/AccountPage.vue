<template>
  <div class="container-fluid mb-3 px-0">
    <div class="row py-2 bg-dark mb-4 top-bar">
      <div class="col-12 d-flex align-items-center text-success lighten-30">
        <img class="rounded" :src="account.picture" alt="" height="45" />
        <p class="mb-0 ms-2">
          Welcome {{ account.name }}
        </p>

        <ul class="nav-links mb-0 d-flex align-items-center">
          <router-link :to="{name:'Account.Settings'}" class="text-success lighten-30">
            <li class="nav-link">
              Settings
            </li>
          </router-link>
          <router-link :to="{name:'Account.Listings'}" class="text-success lighten-30">
            <li class="nav-link">
              Your Listings
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
