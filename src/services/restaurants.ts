import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getAvailableRestaurants = async (): Promise<GetAvailableRestaurantResponse> => {
  /**
   * @description
   * Get list of restaurants
   */
  const { data } = await axios.get('/restaurants')
  return data
}

export const sendOrders = async (restaurantId: string, menuIds: string[], deliverBy: string): Promise<SendOrdersResponse> => {
  /**
   * @description
   * Send orders to restaurant
   */
  const { data } = await axios.post('/restaurants/order', {
    restaurantId,
    menuIds,
    deliverBy
  })
  return data
}
export const getPastOrders = async(): Promise<GetPastOrdersResponse> => {
  /**
   * @description
   * Get order histories
   */
  const { data } = await axios.get('restaurants/past-orders')
  return data
}

export interface GetAvailableRestaurantResponse {
  data: GetAvailableRestaurantData[]
}

export interface GetAvailableRestaurantData {
  restaurantId: string
  name: string
  operationHours: OperationHours
  offDays: string[]
  menu: menuItem[]
  isAvailable: boolean
}

interface OperationHours {
  startTime: string
  endTime: string
}

interface menuItem {
  menuId: string
  name: string
  price: number
}

interface SendOrdersResponse {
  isOrdered: boolean
}

export interface GetPastOrdersResponse {
  data: GetPastOrdersData[]
}

export interface GetPastOrdersData {
  orderId: string
  restaurantId: string
  name: string
  offDays: string[]
  menu: menuItem
  deliverBy: string
  createdOn: string
}
