/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const EmergenciesController = () => import('#controllers/emergencies_controller')
import router from '@adonisjs/core/services/router'

router.get('/emergencies', [EmergenciesController, 'findMany'])
router.get('/emergencies/count/byType', [EmergenciesController, 'countByType'])
router.get('/emergencies/count/byReason', [EmergenciesController, 'countByReason'])
router.get('/emergencies/count/byCallType', [EmergenciesController, 'countByCallType'])
router.get('/emergencies/count/byRegion', [EmergenciesController, 'countByRegion'])
router.get('/emergencies/count/byNeighborhood', [EmergenciesController, 'countByNeighborhood'])
router.get('/emergencies/count/byRisk', [EmergenciesController, 'countByRisk'])
router.get('/emergencies/count/byHospital', [EmergenciesController, 'countByHospital'])
router.get('/emergencies/count/byIntercurrence', [EmergenciesController, 'countByIntercurrence'])
router.get('/emergencies/count/byVehicles', [EmergenciesController, 'countByVehicles'])
router.get('/emergencies/:id', [EmergenciesController, 'findOne'])
router.get('/emergencies/:id/patients', [EmergenciesController, 'patients'])
//
//router.get("/vehicles/report")
//router.get("/vehicles/types")
//router.get("/vehicles/statuses")
//router.get("/vehicles/patients")
//router.get("/vehicles/:id/emergencies")
//
//router.get("/patients/count/by-gender-and-age")
//
//router.get("/protocols")
//router.get("/protocols/categories")
//router.get("/protocols/:id")
//router.get("/protocols/:id/pdf")
//
//router.get("/hospitals")
//router.get("/hospitals/reports")
//router.get("/hospitals/reports/:id")
//router.post("/hospitals/reports")
//router.get("/hospitals/:id/equipments")
//router.get("/hospitals/:id/specialties")
//
//router.get("/equipments")
//router.post("/equipments")
//
//router.get("/specialties")
//router.post("/specialties")
