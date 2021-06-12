'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/api_status', 'SessionController.index')
Route.post('/sessions', 'SessionController.store')
Route.post('/users', 'UserController.store')

Route.group(() => {
    Route.get('/', 'OrcamentoController.index')
    Route.post('/', 'OrcamentoController.store')
  }).prefix('orcamentos').middleware(['auth'])

Route.group(() => {
    Route.get('/', 'UserController.index')
    Route.get('/:id', 'UserController.show')
    // Route.get('/profile', 'UserController.profile')
  }).prefix('users').middleware(['auth'])

  Route.group(() => {
    Route.get('/', 'ProfileController.show')
  }).prefix('profile').middleware(['auth'])


  Route.group(() => {
    Route.get('/', 'ClinicController.index')
    Route.get('/:id', 'ClinicController.show')
    Route.post('/', 'ClinicController.store')
    Route.put('/:id', 'ClinicController.update')
    Route.delete('/:id', 'ClinicController.destroy')
  }).prefix('clinic').middleware(['auth'])

  Route.group(() => {
    Route.get('/', 'PatientController.index')
    Route.get('/:id', 'PatientController.show')
    Route.post('/', 'PatientController.store')
    Route.put('/:id', 'PatientController.update')
    Route.delete('/:id', 'PatientController.destroy')
  }).prefix('patient').middleware(['auth'])


  Route.group(() => {
    Route.get('/', 'TabelaEspecialidadeController.index')
    Route.get('/:id', 'TabelaEspecialidadeController.show')
    Route.post('/', 'TabelaEspecialidadeController.store')
    Route.put('/:id', 'TabelaEspecialidadeController.update')
    Route.delete('/:id', 'TabelaEspecialidadeController.destroy')
  }).prefix('especialidade').middleware(['auth'])


  Route.group(() => {
    Route.get('/', 'TabelaPrecoController.index')
    Route.get('/:id', 'TabelaPrecoController.show')
    Route.post('/', 'TabelaPrecoController.store')
    Route.put('/:id', 'TabelaPrecoController.update')
    Route.delete('/:id', 'TabelaPrecoController.destroy')
  }).prefix('preco').middleware(['auth'])

  Route.group(() => {
    Route.get('/', 'TabelaProcedimentoController.index')
    Route.get('/:id', 'TabelaProcedimentoController.show')
    Route.post('/', 'TabelaProcedimentoController.store')
    Route.put('/:id', 'TabelaProcedimentoController.update')
    Route.delete('/:id', 'TabelaProcedimentoController.destroy')
  }).prefix('procedimento').middleware(['auth'])

  Route.group(() => {
    Route.get('/', 'CargoController.index')
    Route.post('/', 'CargoController.store')
  }).prefix('cargo').middleware(['auth'])


  Route.post('/attachment', 'AttachmentController.store').middleware(['auth'])

  Route.post('/mqtt', 'MqttController.store')