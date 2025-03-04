/* import { prisma } from '#services/prisma_service'
import { createSpecialtyValidator, updateSpecialtyValidator } from '#validators/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class SpecialtiesController {
  async create(ctx: HttpContext) {
    const { description } = await ctx.request.validateUsing(createSpecialtyValidator)

    return prisma.specialty.create({
      data: {
        description,
      },
    })
  }

  async update(ctx: HttpContext) {
    const { description, params } = await ctx.request.validateUsing(updateSpecialtyValidator)

    return prisma.specialty.update({
      where: {
        id: params.id,
      },
      data: {
        description,
      },
    })
  }

  async findMany(ctx: HttpContext) {
    return prisma.specialty.findMany()
  }
}
 */
