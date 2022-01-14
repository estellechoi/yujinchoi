export type ClockType = 'hours' | 'minutes' | 'seconds'

export type ClockMeta = {
	[index: string]: string | number
	unitDeg: number
	label: string
	className: string
}

export type ClockData = {
	[index: string]: ClockMeta
	hours: ClockMeta
	minutes: ClockMeta
	seconds: ClockMeta
}
