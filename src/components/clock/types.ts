export type ClockType = 'hours' | 'minutes' | 'seconds'

export type ClockSize = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800

export interface ClockHandMeta {
	type: ClockType
	show: boolean
}

export interface ClockUtilMeta {
	unitDeg: number
	label: string
	className: string
}

export interface ClockUtils {
	hours: ClockUtilMeta
	minutes: ClockUtilMeta
	seconds: ClockUtilMeta
}
