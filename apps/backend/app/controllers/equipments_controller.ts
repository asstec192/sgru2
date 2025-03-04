/* import { prisma } from '#services/prisma_service'
import { createEquipmentValidator, updateEquipmentValidator } from '#validators/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class EquipmentsController {
  async create(ctx: HttpContext) {
    const { description } = await ctx.request.validateUsing(createEquipmentValidator)

    return prisma.equipment.create({
      data: {
        description,
      },
    })
  }

  async update(ctx: HttpContext) {
    const { description, params } = await ctx.request.validateUsing(updateEquipmentValidator)
    return prisma.equipment.update({
      where: {
        id: params.id,
      },
      data: {
        description,
      },
    })
  }

  async findMany(ctx: HttpContext) {
    return prisma.equipment.findMany()
  }
}
 */
