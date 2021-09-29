<template>
  <form class="carbid-form" @submit.prevent="createBid">
    <div class="d-flex align-items-center">
      <label for="bid" class="sr-only"></label>
      <input type="text" class="form-control" placeholder="$100" name="bid" v-model="editable.bid">
      <button type="submit" class="btn btn-success">
        Bid
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { Car } from '../models/Car.js'
import { carsService } from '../services/CarsService.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    car: { type: Car, required: true }
  },
  setup(props) {
    const editable = ref({})
    return {
      editable,
      async createBid() {
        try {
          await carsService.createBid(props.car.id, editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
