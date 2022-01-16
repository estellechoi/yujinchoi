import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

export type DayjsUnit =
	| 'day'
	| 'week'
	| 'month'
	| 'year'
	| 'hour'
	| 'minute'
	| 'second'
	| 'millisecond'

export const getTimeAdded = (
	date: Date,
	value: number,
	unit: DayjsUnit
): Date => {
	return dayjs(date).add(value, unit).toDate()
}
