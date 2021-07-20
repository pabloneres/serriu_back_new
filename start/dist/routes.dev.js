'use strict';
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

var Route = use('Route');
Route.get('/api_status', 'SessionController.index');
Route.post('/sessions', 'SessionController.store');
Route.post('/users', 'UserController.store');
Route.group(function () {
  Route.get('/', 'OrcamentoController.index');
  Route.post('/', 'OrcamentoController.store');
  Route.put('/:id', 'OrcamentoController.update');
}).prefix('orcamentos').middleware(['auth']);
Route.group(function () {
  Route.get('/', 'UserController.index');
  Route.get('/:id', 'UserController.show'); // Route.get('/profile', 'UserController.profile')
}).prefix('users').middleware(['auth']);
Route.group(function () {
  Route.get('/', 'ProfileController.show');
}).prefix('profile').middleware(['auth']);
Route.group(function () {
  Route.get('/', 'ClinicController.index');
  Route.get('/:id', 'ClinicController.show');
  Route.post('/', 'ClinicController.store');
  Route.put('/:id', 'ClinicController.update');
  Route["delete"]('/:id', 'ClinicController.destroy');
}).prefix('clinic').middleware(['auth']);
Route.group(function () {
  Route.get('/:id', 'ClinicConfigController.show');
  Route.put('/:id', 'ClinicConfigController.update');
}).prefix('clinicConfig').middleware(['auth']);
Route.group(function () {
  Route.get('/', 'PatientController.index');
  Route.get('/:id', 'PatientController.show');
  Route.post('/', 'PatientController.store');
  Route.put('/:id', 'PatientController.update');
  Route["delete"]('/:id', 'PatientController.destroy');
}).prefix('patient').middleware(['auth']);
Route.group(function () {
  Route.get('/', 'TabelaEspecialidadeController.index');
  Route.get('/:id', 'TabelaEspecialidadeController.show');
  Route.post('/', 'TabelaEspecialidadeController.store');
  Route.put('/:id', 'TabelaEspecialidadeController.update');
  Route["delete"]('/:id', 'TabelaEspecialidadeController.destroy');
}).prefix('especialidade').middleware(['auth']);
Route.group(function () {
  Route.get('/', 'TabelaPrecoController.index');
  Route.get('/:id', 'TabelaPrecoController.show');
  Route.post('/', 'TabelaPrecoController.store');
  Route.put('/:id', 'TabelaPrecoController.update');
  Route["delete"]('/:id', 'TabelaPrecoController.destroy');
}).prefix('preco').middleware(['auth']);
Route.group(function () {
  Route.get('/', 'OrcamentoController.index');
  Route.get('/:id', 'OrcamentoController.show');
  Route.post('/', 'OrcamentoController.store');
  Route.put('/:id', 'OrcamentoController.update');
  Route["delete"]('/:id', 'OrcamentoController.destroy');
}).prefix('orcamentos').middleware(['auth']);
Route.group(function () {
  Route.get('/', 'TabelaProcedimentoController.index');
  Route.get('/:id', 'TabelaProcedimentoController.show');
  Route.post('/', 'TabelaProcedimentoController.store');
  Route.put('/:id', 'TabelaProcedimentoController.update');
  Route["delete"]('/:id', 'TabelaProcedimentoController.destroy');
}).prefix('procedimento').middleware(['auth']);
Route.group(function () {
  Route.get('/', 'CargoController.index');
  Route.post('/', 'CargoController.store');
}).prefix('cargo').middleware(['auth']);
Route.post('/attachment', 'AttachmentController.store').middleware(['auth']);
Route.post('/mqtt', 'MqttController.store');
Route.group(function () {
  Route.get('/', 'EquipamentoController.index');
  Route.post('/', 'EquipamentoController.store');
}).prefix('equipamento');
Route.group(function () {
  Route.get('/', 'RoleController.index');
  Route.post('/', 'RoleController.store');
}).prefix('roles');
Route.group(function () {
  Route.get('/', 'DepartmentController.index');
  Route.post('/', 'DepartmentController.store');
}).prefix('department');
Route.group(function () {
  Route.get('/', 'DepartmentRoleController.index');
  Route.post('/', 'DepartmentRoleController.store');
}).prefix('departmentRoles');
Route.group(function () {
  Route.get('/', 'LaboratorioController.index');
  Route.post('/', 'LaboratorioController.store');
  Route.post('/:id', 'LaboratorioController.show');
  Route.put('/', 'LaboratorioController.update');
  Route["delete"]('/:id', 'LaboratorioController.destroy');
}).prefix('laboratorio');
Route.group(function () {
  Route.get('/', 'LaboratorioServicoController.index');
  Route.post('/', 'LaboratorioServicoController.store');
  Route.put('/', 'LaboratorioServicoController.update');
  Route["delete"]('/:id', 'LaboratorioServicoController.destroy');
}).prefix('laboratorioServicos');
Route.group(function () {
  Route.get('/', 'DepartmentClincController.index');
  Route.post('/:id', 'DepartmentClincController.store');
  Route.put('/', 'DepartmentClincController.update');
  Route["delete"]('/:id', 'DepartmentClincController.destroy');
}).prefix('departmento_desconto');
Route.group(function () {
  Route.get('/', 'FormaPagamentoController.index');
  Route.post('/:id', 'FormaPagamentoController.store');
  Route.put('/:id', 'FormaPagamentoController.update');
  Route["delete"]('/:id', 'FormaPagamentoController.destroy');
}).prefix('forma_pagamento');
Route.group(function () {
  Route.get('/', 'PagamentoOrcamentoController.index');
  Route.post('/', 'PagamentoOrcamentoController.store');
  Route.put('/:id', 'PagamentoOrcamentoController.update');
  Route["delete"]('/:id', 'PagamentoOrcamentoController.destroy');
}).prefix('pagamento');
Route.group(function () {
  Route.get('/', 'MetodosPagamentoController.index');
  Route.post('/', 'MetodosPagamentoController.store');
}).prefix('metodosPagamento');
Route.group(function () {
  Route.get('/', 'ProcedimentoExecucaoController.index');
  Route.post('/', 'ProcedimentoExecucaoController.store');
  Route.put('/:id', 'ProcedimentoExecucaoController.update');
}).prefix('procedimentoExecucao');
Route.group(function () {
  Route.post('/', 'PermissaoController.hasPermission');
}).prefix('permissaoCode').middleware(['auth']);
Route.group(function () {
  Route.get('/:id', 'TesteController.index');
  Route.post('/', 'TesteController.createBoleto');
}).prefix('teste');
Route.group(function () {
  Route.post('/', 'AssaController.event');
  Route.post('/clean', 'AssaController.clean');
}).prefix('assas');