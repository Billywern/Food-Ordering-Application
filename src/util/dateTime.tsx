import moment from 'moment'

export const convertMomentTimeLocale = (time: string) => moment(time, 'HHmm').format('h:mma')
