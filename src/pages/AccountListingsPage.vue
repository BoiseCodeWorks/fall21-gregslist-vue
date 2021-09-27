<template>
  <div class="container">
    <div class="row">
      <div class="col-12  mb-3">
        <h1>
          Your Cars
        </h1>
      </div>
      <Car class="col-md-4" v-for="c in cars" :key="c.id" :car="c" />
    </div>

    <div class="row my-4">
      <h1>Your Houses</h1>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { carsService } from '../services/CarsService.js'
import { AppState } from '../AppState.js'
export default {
  setup() {
    const account = computed(() => AppState.account)
    onMounted(async() => {
      try {
        await Promise.all([
          carsService.getCars(`?creatorId=${account.value.id}`)
          // housesService.getHousess(`?creatorId=${account.value.id}`),

        ])
      } catch (error) {

      }
    })

    return {
      cars: computed(() => AppState.cars)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
