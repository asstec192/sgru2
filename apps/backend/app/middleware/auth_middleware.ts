import { AuthService, BETTER_AUTH_SESSION_TOKEN_NAME } from '#services/auth_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class AuthMiddleware {
  constructor(protected authService: AuthService) {}

  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.request.url() !== '/auth/signIn') {
      const sessionToken = ctx.request.cookie(BETTER_AUTH_SESSION_TOKEN_NAME)

      if (!sessionToken) {
        return ctx.response.status(401).json({ message: 'Unauthorized' })
      }

      const isValid = await this.authService.verifySession(sessionToken)

      if (!isValid) {
        return ctx.response.status(401).json({ message: 'Session expired or invalid' })
      }
    }

    await next()
  }
}
