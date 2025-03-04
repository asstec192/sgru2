/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
//const HospitalsController = () => import('#controllers/hospitals_controller')
const EmergenciesController = () => import('#controllers/emergencies_controller')
//const EquipmentsController = () => import('#controllers/equipments_controller')
///const SpecialtiesController = () => import('#controllers/specialties_controller')
const SessionController = () => import('#controllers/session_controller')
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
router.get('/emergencies/:id/patients', [EmergenciesController, 'findEmergencyPatients'])
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
//router.get('/hospitals/:id/equipments', [HospitalsController, 'findEquipments'])
//router.get('/hospitals/:id/specialties', [HospitalsController, 'findSpecialties'])
//
//router.get('/equipments', [EquipmentsController, 'findMany'])
//router.post('/equipments', [EquipmentsController, 'create'])
//router.patch('/equipements/:id', [EquipmentsController, 'update'])
//
// /router.get('/specialties', [SpecialtiesController, 'findMany'])
// /router.post('/specialties', [SpecialtiesController, 'create'])
// /router.patch('/specialties/:id', [SpecialtiesController, 'update'])

router.post('/auth/signUp', [SessionController, 'singUp'])
router.get('/auth/signIn', [SessionController, 'signIn'])
router.post('/auth/signOut', [SessionController, 'signOut'])
router.get('/auth/getSession', [SessionController, 'getSession'])
