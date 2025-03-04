/* import { Expression, expressionBuilder, sql } from 'kysely'
import { db } from './database_service.js'
import { DB } from '../../types/db.types.js'
import { Period } from '#validators/index'

type OptionalFilters = {
  doctorId?: number
  withVehiclesAssigned?: boolean
}

export class EmergencyService {
  private hasVehiclesAssigned(emergencyId: Expression<string>) {
    const eb = expressionBuilder<DB, never>()
    return eb.exists(
      eb
        .selectFrom('OcorrenciaMovimentacao as om')
        .select('om.VeiculoID')
        .where('om.OcorrenciaID', '=', emergencyId)
    )
  }

  private hasDoctor(doctorId: Expression<number>, emergencyId: Expression<string>) {
    const eb = expressionBuilder<DB, never>()
    return eb.exists(
      eb
        .selectFrom('PosicaoOcorrencias as po')
        .innerJoin('OperadoresDados as od', 'od.OperadorID', 'po.OperadorDestino')
        .select('po.OperadorDestino as doctorId')
        .where('po.OcorrenciaID', '=', emergencyId)
        .where('OperadorDestino', '=', doctorId)
        .where('od.ProfisionalTP', '=', 'MEDICO')
        .orderBy('po.RegistroDT asc')
        .top(1)
    )
  }

  private selectFromEmergenciesWithinPeriod(period: Period, optionalFilters?: OptionalFilters) {
    return db
      .selectFrom('Ocorrencia as o')
      .where((eb) => eb.between('o.DtHr', period.from, period.to))
      .$if(!!optionalFilters?.doctorId, (qb) =>
        qb.where((eb) =>
          this.hasDoctor(eb.val(optionalFilters?.doctorId), eb.ref('o.OcorrenciaID'))
        )
      )
      .$if(!!optionalFilters?.withVehiclesAssigned, (qb) =>
        qb.where((eb) => this.hasVehiclesAssigned(eb.ref('o.OcorrenciaID')))
      )
  }

  async countByCallType(period: Period) {
    return this.selectFromEmergenciesWithinPeriod(period)
      .leftJoin('LigacaoTP as lt', 'lt.LigacaoTPID', 'o.LigacaoTPID')
      .select((eb) => [
        eb.fn.coalesce('lt.LigacaoTPDS', sql.lit('Não informado')).as('callType'),
        eb.fn.count<number>('o.OcorrenciaID').distinct().as('emergencyCouunt'),
      ])
      .execute()
  }

  async countByType(period: Period, optionalFilters?: OptionalFilters) {
    return this.selectFromEmergenciesWithinPeriod(period, optionalFilters)
      .leftJoin('Tipo as t', 't.TipoID', 'o.TipoID')
      .select((eb) => [
        't.TipoID as typeId',
        eb.fn.coalesce('t.TipoDS', sql.lit('Não informado')).as('typeDescription'),
        eb.fn.count<number>('o.OcorrenciaID').distinct().as('emergencyCount'),
      ])
      .groupBy(['t.TipoID', 't.TipoDS'])
      .orderBy('emergencyCount')
      .execute()
  }

  async countByReason(period: Period, optionalFilters?: OptionalFilters) {
    return this.selectFromEmergenciesWithinPeriod(period, optionalFilters)
      .leftJoin('Motivo as m', 'm.MotivoID', 'o.MotivoID')
      .select((eb) => [
        'm.MotivoID as reasonId',
        'm.TipoID as typeId',
        eb.fn.coalesce('m.MotivoDS', sql.lit('Não informado')).as('reasonDescription'),
        eb.fn.count<number>('o.OcorrenciaID').distinct().as('emergencyCount'),
      ])
      .groupBy(['m.MotivoID', 'm.TipoID', 'm.MotivoDS'])
      .orderBy('emergencyCount')
      .execute()
  }

  async countByRisk(period: Period, optionalFilters?: OptionalFilters) {
    return this.selectFromEmergenciesWithinPeriod(period, optionalFilters)
      .select((eb) => [
        'o.RISCOCOD as riskId',
        eb.fn.count<number>('o.OcorrenciaID').distinct().as('emergencyCount'),
      ])
      .where('o.RISCOCOD', 'in', [1, 2, 3, 4])
      .groupBy(['o.RISCOCOD'])
      .orderBy('emergencyCount')
      .execute()
  }

  async countByVehicle(period: Period) {
    return db
      .selectFrom('OcorrenciaMovimentacao as om')
      .innerJoin('Veiculos as v', 'v.VeiculoID', 'om.VeiculoID')
      .leftJoin('Vitimas as vi', 'vi.OcorrenciaID', 'om.OcorrenciaID')
      .select((eb) => [
        'v.VeiculoDS as vehicle',
        eb.fn.count('om.OcorrenciaID').distinct().as('emergencyCount'),
        eb.fn.count('vi.VitimaId').distinct().as('patientsCount'),
      
      ])
      .where((eb) => eb.between('om.EnvioEquipeDT', period.from, period.to))
      .execute()
  }

  async countByDestination(period: Period) {
    return this.selectFromEmergenciesWithinPeriod(period)
      .innerJoin('HISTORICO_DECISAO_GESTORA as hdg', 'hdg.OCORRENCIAID', 'o.OcorrenciaID')
      .innerJoin('UnidadesDestino as ud', 'ud.UnidadeCOD', 'hdg.DESTINOID')
      .select((eb) => [
        'ud.UnidadeCOD as destinationId',
        'ud.UnidadeDS as destinationName',
        eb.fn.count<number>('o.OcorrenciaID').distinct().as('emergencyCount'),
      ])
      .groupBy(['ud.UnidadeCOD', 'ud.UnidadeDS'])
      .orderBy('emergencyCount')
      .execute()
  }

  async countByIntercurrence(period: Period) {
    return this.selectFromEmergenciesWithinPeriod(period)
      .innerJoin('HISTORICO_DECISAO_GESTORA as hdg', 'hdg.OCORRENCIAID', 'o.OcorrenciaID')
      .innerJoin('Intercorrencias as i', 'i.IntercorrenciaID', 'hdg.INTERCORRENCIAID')
      .select((eb) => [
        'i.IntercorrenciaID as intercurrenceId',
        'i.IntercorrenciaDS as intercurrenceDescription',
        eb.fn.count<number>('o.OcorrenciaID').distinct().as('emergencyCount'),
      ])
      .groupBy(['i.IntercorrenciaID', 'i.IntercorrenciaDS'])
      .orderBy('emergencyCount')
      .execute()
  }
}
 */
