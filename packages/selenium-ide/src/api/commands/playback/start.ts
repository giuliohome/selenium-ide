import browserHandler from 'browser/api/classes/Handler'
import mainHandler from 'main/api/classes/Handler'
import { Session } from 'main/types'

export type Shape = Session['playback']['start']

export const browser = browserHandler<Shape>()

export const main = mainHandler<Shape>()
