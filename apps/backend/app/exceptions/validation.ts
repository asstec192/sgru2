import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { ZodError } from 'zod'

export default class ValidationExceptionHandler extends ExceptionHandler {
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof ZodError) {
      // Retorna o status 422 com os erros de validação
      return ctx.response.status(422).send({
        message: 'Erro de validação',
        errors: error.format(), // Formata os erros do Zod
      })
    }

    // Re-lança outros erros para o ExceptionHandler padrão
    return super.handle(error, ctx)
  }
}
