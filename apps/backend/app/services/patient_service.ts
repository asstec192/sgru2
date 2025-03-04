/* import { sql } from 'kysely'
import { db } from './database_service.js'
import env from '#start/env'

export class PatientService {
  private selectFromPatients() {
    return db
      .selectFrom('Vitimas as p')
      .leftJoin('IdadeTP as it', 'it.IdadeTP', 'p.IdadeTP')
      .select([
        'p.VitimaId as id',
        'p.VitimaNM as name',
        'p.Idade as age',
        'it.IdadeTPDS as ageIn',
        'p.OcorrenciaID as emergencyId',
      ])
  }

  async findManyByEmergencyId(emergencyId: string) {
    return this.selectFromPatients().where('p.OcorrenciaID', '=', emergencyId)
  }

  async findManyByVehiclesIds(vehiclesId: number[]) {
    {
      return this.selectFromPatients()
        .innerJoin('OcorrenciaMovimentacao as om', 'om.OcorrenciaID', 'p.OcorrenciaID')
        .select(['om.VeiculoID as vehicleId'])
        .where('om.VeiculoID', 'in', vehiclesId)
        .execute()
    }
  }

  async findPatientAssessments(patientId: number) {
    return db
      .selectFrom('OCORRENCIA_AVALIACAO_INICIAL as av')
      .leftJoin('OperadoresDados as op', 'op.OperadorID', 'av.OPERADORID')
      .select((eb) => [
        'av.VITIMAID as patientId',
        'av.AVALICAO as description',
        'op.OperadorNM as doctorName',
        sql<Date>`dateadd(hour, ${env.get('TZ_OFFSET')}, ${eb.ref('av.DTHR')})`.as('createdAt'),
      ])
      .where('av.VITIMAID', '=', patientId)
      .execute()
  }
}
 */
