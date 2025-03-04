import { betterAuth } from 'better-auth'
import hash from '@adonisjs/core/services/hash'
import { username } from 'better-auth/plugins'
import { prisma } from './prisma_service.js'
import { fileURLToPath } from 'url'
import path from 'path'
import Database from 'better-sqlite3'
import { CredentialsSchema } from '#validators/index'

// Ajuste o caminho relativo para o arquivo dev.db
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const databasePath = path.resolve(__dirname, '../../prisma/dev.db')

export const BETTER_AUTH_SESSION_TOKEN_NAME = 'better-auth.session_token'

export class AuthService {
  private authInstance

  constructor() {
    this.authInstance = betterAuth({
      database: new Database(databasePath),
      emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        autoSignIn: false,
        password: {
          hash: (password) => hash.make(password),
          verify: ({ hash: hashedPassword, password }) => hash.verify(hashedPassword, password),
        },
      },
      plugins: [
        username({
          usernameValidator: () => {
            return true
          },
        }),
      ],
    })
  }

  get auth() {
    return this.authInstance
  }

  async singUp({ username, password }: CredentialsSchema) {
    const data = await this.auth.api.signUpEmail({
      body: {
        username,
        password,
        email: `${username}@example.com`,
        name: username,
      },
    })

    return data
  }

  async signIn(credentials: CredentialsSchema) {
    return this.auth.api.signInUsername({
      body: credentials,
    })
  }

  async signOut(sessionToken: string) {
    let success = false
    const session = await this.getSession(sessionToken)

    if (session) {
      const deletedSession = await prisma.session.delete({
        where: {
          id: session.session.id,
        },
      })
      success = !!deletedSession
    }
    return { success }
  }

  async getSession(sessionToken: string) {
    const _session = await prisma.session.findFirst({
      include: {
        user: true,
      },
      where: {
        token: sessionToken,
      },
    })

    if (_session) {
      const { user, ...session } = _session
      return {
        session,
        user,
      }
    }

    return null
  }

  async verifySession(sessionToken: string) {
    const sessionData = await this.getSession(sessionToken)

    if (!sessionData) {
      return false
    }

    const now = new Date()
    const sessionExpiry = new Date(sessionData.session.expiresAt)

    return sessionExpiry > now
  }
}
