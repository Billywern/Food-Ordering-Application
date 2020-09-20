import moment from 'moment'

export const convertMomentTimeLocale = (time: string) => moment(time, 'HHmm').format('h:mma')

export const convertToMomentCalendarDate = (date: string) => moment(date).calendar({
  sameDay: '[Today], hh:mm a',
  lastDay: '[Yesterday], hh:mm a',
  lastWeek: '[Last] dddd, hh:mm a',
  sameElse: 'DD/MM/YYY, hh:mm a',
  nextDay: '[Tomorrow], hh:mm a',
  nextWeek: 'dddd, hh:mm a'
})
