import { AppState } from '../AppState.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('carBid', this.addBid)
      .on('success', this.popSuccess)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

  addBid(bid) {
    AppState.bids.unshift(bid)
  }

  popSuccess(message) {
    Pop.toast(message.message, 'success')
  }
}

export const socketService = new SocketService()
