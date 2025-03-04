import type { HttpContext } from '@adonisjs/core/http'
import _ from 'lodash'
import { faker } from '@faker-js/faker'
import { inject } from '@adonisjs/core'
import { periodSchema } from '#validators/index'
//import { EmergencyService } from '#services/emergency_service'
//import { PatientService } from '#services/patient_service'

function generateEmergencies(count: number) {
  const types = ['Fire', 'Accident', 'Medical']
  const reasons = ['Accident', 'Human Error', 'Illness']
  const callTypes = ['911', 'Direct', 'Regulação', 'Trote', 'Engano', 'Informação', 'Atendimento']
  const regions = ['North', 'South', 'East', 'West']
  const neighborhoods = ['Downtown', 'Suburb', 'Uptown']
  const risks = ['Alto', 'Médio', 'Baixo', 'Indefinível']
  const hospitals = ['Hospital A', 'Hospital B', 'Hospital C']
  const intercurrences = ['None', 'Minor', 'Major']
  const vehicles = ['USB', 'USI', 'USA', 'BIK', 'MOT', 'HEL']

  return Array.from({ length: count }, (_, id) => ({
    id: id + 1,
    type: faker.helpers.arrayElement(types),
    reason: faker.helpers.arrayElement(reasons),
    callType: faker.helpers.arrayElement(callTypes),
    region: faker.helpers.arrayElement(regions),
    neighborhood: faker.helpers.arrayElement(neighborhoods),
    risk: faker.helpers.arrayElement(risks),
    hospital: faker.helpers.arrayElement(hospitals),
    intercurrence: faker.helpers.arrayElement(intercurrences),
    vehicle: faker.helpers.arrayElement(vehicles),
    date: faker.date.between({ from: '2025-01-01', to: '2025-03-01' }),
  }))
}

const emergencies = generateEmergencies(1000)

@inject()
export default class EmergenciesController {
  // constructor(
  //   protected emergencyService: EmergencyService,
  //   protected patientService: PatientService
  // ) {}

  private filterByPeriod(data: typeof emergencies, period: { from: Date; to: Date }) {
    return data.filter((item) => item.date >= period.from && item.date <= period.to)
  }

  public async findMany({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    return filteredEmergencies
  }

  public async findOne({ params }: HttpContext) {
    return emergencies.find((emergency) => emergency.id === parseInt(params.id))
  }

  public async countByType({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    const counts = _.countBy(filteredEmergencies, 'type')

    return _.map(counts, (count, type) => ({ type, count }))

    // return this.emergencyService.countByType(period)
  }

  public async countByReason({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    const counts = _.countBy(filteredEmergencies, 'reason')

    return _.map(counts, (count, reason) => ({ reason, count }))

    //return this.emergencyService.countByReason(period)
  }

  public async countByCallType({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    const counts = _.countBy(filteredEmergencies, 'callType')

    return _.map(counts, (count, callType) => ({ callType, count }))

    //return this.emergencyService.countByCallType(period)
  }

  public async countByRegion({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    const counts = _.countBy(filteredEmergencies, 'region')

    return _.map(counts, (count, region) => ({ region, count }))
  }

  public async countByNeighborhood({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    const counts = _.countBy(filteredEmergencies, 'neighborhood')

    return _.map(counts, (count, neighborhood) => ({ neighborhood, count }))
  }

  public async countByRisk({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    const counts = _.countBy(filteredEmergencies, 'risk')

    return _.map(counts, (count, risk) => ({ risk, count }))

    //return this.emergencyService.countByRisk(period)
  }

  public async countByHospital({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    const counts = _.countBy(filteredEmergencies, 'hospital')

    return _.map(counts, (emergencyCount, hospital) => ({
      hospital,
      emergencyCount,
      avgResponseTime: (Math.random() * 10).toFixed(0),
    }))

    //return this.emergencyService.countByDestination(period)
  }

  public async countByIntercurrence({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    const counts = _.countBy(filteredEmergencies, 'intercurrence')

    return _.map(counts, (emergencyCount, intercurrence) => ({ intercurrence, emergencyCount }))

    //return this.emergencyService.countByIntercurrence(period)
  }

  public async countByVehicles({ request }: HttpContext) {
    const period = await request.validateUsing(periodSchema)
    const filteredEmergencies = this.filterByPeriod(emergencies, period)
    const counts = _.countBy(filteredEmergencies, 'vehicle')

    return _.map(counts, (emergencyCount, vehicle) => ({
      vehicle,
      emergencyCount,
      patientCount: emergencyCount + 1,
      avgLocationArrivalTime: (Math.random() * 10).toFixed(0),
      avgLocationExitTime: (Math.random() * 10).toFixed(0),
      avgDestinationExitTime: (Math.random() * 10).toFixed(0),
    }))

    //return this.emergencyService.countByVehicle(period)
  }

  public async findEmergencyPatients() {
    // return this.patientService.findManyByEmergencyId(ctx.params.id as string)
  }
}
