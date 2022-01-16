export type ClockType = 'hours' | 'minutes' | 'seconds'

export type ClockSize = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800

export type ClockHandMeta = {
	[index: string]: string | boolean
	type: string
	show: boolean
}

export type ClockUtilMeta = {
	[index: string]: string | number
	unitDeg: number
	label: string
	className: string
}

export type ClockUtils = {
	[index: string]: ClockUtilMeta
	hours: ClockUtilMeta
	minutes: ClockUtilMeta
	seconds: ClockUtilMeta
}
