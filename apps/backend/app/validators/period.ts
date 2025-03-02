import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const periodSchema = vine.object({
  from: vine.date({ formats: ['iso8601'] }),
  to: vine.date({ formats: ['iso8601'] }),
})

export const periodValidator = vine.compile(periodSchema)

export type Period = Infer<typeof periodSchema>
