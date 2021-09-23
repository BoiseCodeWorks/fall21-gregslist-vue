<template>
  <div class="listing">
    <router-link :to="{name: 'Car', params: { carId: car.id }}" :title="car.make">
      <div class="card selectable text-dark">
        <!-- REVIEW PROPS -->
        <div class="position-relative w-100">
          <div class="gradient">
            <div class="position-absolute clip-text" style="bottom: 1rem; left: 1rem; z-index: 1;">
              <b class="text-white f-20">{{ car.year }} {{ car.make }} {{ car.model }}</b>
            </div>
            <img :src="car.img" alt="listing image" class="rounded w-100">
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { logger } from '../utils/Logger.js'
import { Car } from '../models/Car.js'

export default {
  // REVIEW PROPS
  props: {
    car: { type: Car, required: true }
  },
  setup(props) {
    return {
      deleteCar() {
        logger.log('working?')
      }
    }
  }
}
</script>

<style>
.gradient:after{
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0),hsla(0, 0%, 0%, .35), hsla(0, 0%, 0%, 1));
}
</style>
