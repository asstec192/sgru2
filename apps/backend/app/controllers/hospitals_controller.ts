/* import type { HttpContext } from '@adonisjs/core/http'

import { prisma } from '#services/prisma_service'

const LOCAL_DA_OCORRENCIA = '90'

export default class HospitalsController {
  async findMany() {
    return prisma.destination.findMany({
      where: {
        id: {
          notIn: [LOCAL_DA_OCORRENCIA],
        },
      },
    })
  }

  async findSpecialties(ctx: HttpContext) {
    const lastReport = await prisma.destinationReport.findFirst({
      select: {
        reportEquipments: {
          select: {
            count: true,
            equipment: true,
          },
        },
      },
      where: { destinationId: ctx.params.id },
      orderBy: { createdAt: 'desc' },
    })

    return lastReport?.reportEquipments.map((e) => ({
      id: e.equipment.id,
      description: e.equipment.description,
      count: e.count,
    }))
  }

  async findEquipments(ctx: HttpContext) {
    const lastReport = await prisma.destinationReport.findFirst({
      select: {
        reportSpecialties: {
          select: {
            count: true,
            specialty: true,
          },
        },
      },
      where: { destinationId: ctx.params.id },
      orderBy: { createdAt: 'desc' },
    })

    return lastReport?.reportSpecialties.map((e) => ({
      id: e.specialty.id,
      description: e.specialty.description,
      count: e.count,
    }))
  }
}
 */
