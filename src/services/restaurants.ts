import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getAvailableRestaurants = async ():Promise<GetAvailableRestaurantResponse> => {
  const { data } = await axios.get('/restaurants')
  return data
}

export const sendOrders = async(restaurantId: string, menuIds: string[]): Promise<SendOrdersResponse> => {
  const { data } = await axios.post('/restaurants/order', {
    restaurantId,
    menuIds
  })
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