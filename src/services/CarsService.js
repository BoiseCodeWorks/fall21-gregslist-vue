import { AppState } from '../AppState.js'
import { Car } from '../models/Car.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { socketService } from './SocketService.js'

class CarsService {
  async getCars(query = '') {
    AppState.cars = []
    const res = await api.get('api/cars' + query)
    AppState.cars = res.data.map(c => new Car(c))
  }

  async getCarBids(carId) {
    const res = await api.get(`api/cars/${carId}/bids`)
    logger.log('the res', res.data)
    AppState.bids = res.data
  }

  async getCarById(carId) {
    AppState.car = null
    const res = await api.get(`api/cars/${carId}`)
    AppState.car = new Car(res.data)
    socketService.emit('JOIN_CAR_ROOM', carId)
    this.getCarBids(carId)
  }

  // NOTE passes in the entire car object not just the id
  async createCar(car) {
    const res = await api.post('api/cars', car)
    AppState.cars.push(new Car(res.data))
  }

  async createBid(carId, bid) {
    await api.post(`api/cars/${carId}/bids`, bid)
    // NOTE you no longer need this when the socket is handeling the add
    // AppState.bids.unshift(res.data)
  }

  // NOTE passes in the entire car object not just the id
  async editCar(car) {
    const res = await api.put(`api/cars/${car.id}`, car)
    AppState.car = new Car(res.data)
  }

  async removeCar(carId) {
    await api.delete(`api/cars/${carId}`)
    AppState.car = null
    AppState.cars.filter(c => c.id !== carId)
  }
}

export const carsService = new CarsService()
