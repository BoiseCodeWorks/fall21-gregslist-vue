<template>
  <div v-if="car" class="py-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 m-auto">
          <Car :car="car" />
        </div>
      </div>

      <!-- CAR -->
      <div class="row">
        <div class="col-lg-8 m-auto">
          <div class="bg-white rounded p-4 elevation-2">
            <!-- DETAILS -->
            <div class="car-details">
              <h3 class="d-flex align-items-center justify-content-between text-capitalize">
                <span>
                  {{ car.year }} {{ car.make }} - {{ car.model }}
                </span>
                <span>${{ car.price }}</span>
              </h3>
              <p class="mt-3 pt-3 border-top">
                {{ car.description }}
              </p>
            </div>
            <!-- SELLER -->
            <div class="seller-info mt-3">
              <p>
                <b>Contact Seller</b>
              </p>
              <div class="d-flex clip-text align-items-center">
                <img :src="car.creator.picture" alt="" class="rounded" height="40">
                <b class="ms-3">
                  <i class="mdi mdi-account"></i>
                  {{ car.creator.name }}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CREATOR CONTROLS -->
      <div class="row my-4" v-if="car.creatorId === account.id">
        <div class="col-lg-8 m-auto">
          <div class="bg-white rounded elevation-2 p-4 border-danger border">
            <div class="d-flex justify-content-between">
              <button class="btn text-dark lighten-20 selectable" @click="remove(car)">
                <b>
                  Remove Listing
                </b>
              </button>
              <button class="btn text-danger lighten-20 selectable" data-bs-toggle="modal" data-bs-target="#edit-modal">
                <i class="mdi mdi-pencil"></i>
                <b>
                  EDIT
                </b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal id="edit-modal">
      <template #modal-title>
        {{ car.year }} {{ car.make }} - {{ car.model }}
      </template>
      <template #modal-body>
        <!-- REVIEW PROPS -->
        <!-- drawCarForm(car) -->
        <CarForm :car="car" />
      </template>
    </Modal>
  </div>
  <div v-else>
    loading.....
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { carsService } from '../services/CarsService.js'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { router } from '../router.js'

export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      carsService.getCarById(route.params.carId)
    })

    return {
      account: computed(() => AppState.account),
      car: computed(() => AppState.car),
      async remove(car) {
        try {
          const yes = await Pop.confirm('Are you really sure?')
          if (!yes) { return }
          await carsService.removeCar(car.id)
          router.push({ name: 'Cars' })
        } catch (e) {
          Pop.toast(e.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
