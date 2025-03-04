import type { HttpContext } from '@adonisjs/core/http'
import { AuthService, BETTER_AUTH_SESSION_TOKEN_NAME } from '#services/auth_service'
import { inject } from '@adonisjs/core'
import { credentialsSchema } from '#validators/index'

@inject()
export default class SessionController {
  constructor(protected authService: AuthService) {}

  async singUp({ request }: HttpContext) {
    const credentials = await request.validateUsing(credentialsSchema)
    return this.authService.singUp(credentials)
  }

  async signIn({ request, response }: HttpContext) {
    const credentials = await request.validateUsing(credentialsSchema)

    const data = await this.authService.signIn(credentials)

    if (!data) {
      return response.unauthorized({ message: 'Usuário ou senha inválidos' })
    }

    response.cookie(BETTER_AUTH_SESSION_TOKEN_NAME, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      domain: 'localhost',
      path: '/',
    })

    return data.user
  }

  async signOut({ request, response }: HttpContext) {
    const sessionToken = request.cookie(BETTER_AUTH_SESSION_TOKEN_NAME)
    const result = await this.authService.signOut(sessionToken)
    if (result.success) {
      response.clearCookie(BETTER_AUTH_SESSION_TOKEN_NAME)
    }
    return result
  }

  async getSession({ request }: HttpContext) {
    const sessionToken = request.cookie(BETTER_AUTH_SESSION_TOKEN_NAME)

    return this.authService.getSession(sessionToken)
  }
}
