import vine from '@vinejs/vine'
import { periodSchema } from './period.js'

export const emergencyFilterSchema = vine.object({
  period: periodSchema,
  callIds: vine.array(vine.number()),
  riskIds: vine.array(vine.number()),
})
