import { Request } from '@adonisjs/core/http'
import { ZodSchema } from 'zod'

declare module '@adonisjs/core/http' {
  export interface Request {
    validateUsing<T>(schema: ZodSchema<T>): Promise<T>
  }
}

Request.macro('validateUsing', async function <T>(this: Request, schema: ZodSchema<T>) {
  return schema.parse(this.all())
})
