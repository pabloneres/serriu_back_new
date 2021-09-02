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
  Route.put('/:id', 'OrcamentoController.update')
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
  Route.get('/:id', 'ClinicConfigController.show')
  Route.put('/:id', 'ClinicConfigController.update')
}).prefix('clinicConfig').middleware(['auth'])

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
  Route.get('/', 'OrcamentoController.index')
  Route.get('/:id', 'OrcamentoController.show')
  Route.post('/', 'OrcamentoController.store')
  Route.put('/:id', 'OrcamentoController.update')
  Route.delete('/:id', 'OrcamentoController.destroy')
}).prefix('orcamentos').middleware(['auth'])

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

Route.group(() => {
  Route.get('/', 'EquipamentoController.index')
  Route.post('/', 'EquipamentoController.store')
}).prefix('equipamento').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'RoleController.index')
  Route.post('/', 'RoleController.store')
}).prefix('roles').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'DepartmentController.index')
  Route.post('/', 'DepartmentController.store')
}).prefix('department').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'DepartmentRoleController.index')
  Route.post('/', 'DepartmentRoleController.store')
}).prefix('departmentRoles').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'LaboratorioController.index')
  Route.post('/', 'LaboratorioController.store')
  Route.post('/:id', 'LaboratorioController.show')
  Route.put('/', 'LaboratorioController.update')
  Route.delete('/:id', 'LaboratorioController.destroy')
}).prefix('laboratorio').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'LaboratorioServicoController.index')
  Route.post('/', 'LaboratorioServicoController.store')
  Route.put('/', 'LaboratorioServicoController.update')
  Route.delete('/:id', 'LaboratorioServicoController.destroy')
}).prefix('laboratorioServicos').middleware(['auth'])


Route.group(() => {
  Route.get('/', 'DepartmentClincController.index')
  Route.post('/:id', 'DepartmentClincController.store')
  Route.put('/', 'DepartmentClincController.update')
  Route.delete('/:id', 'DepartmentClincController.destroy')
}).prefix('departmento_desconto').middleware(['auth'])


Route.group(() => {
  Route.get('/', 'FormaPagamentoController.index')
  Route.post('/:id', 'FormaPagamentoController.store')
  Route.put('/:id', 'FormaPagamentoController.update')
  Route.delete('/:id', 'FormaPagamentoController.destroy')
}).prefix('forma_pagamento').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'PagamentoOrcamentoController.index')
  Route.post('/', 'PagamentoOrcamentoController.store')
  Route.put('/:id', 'PagamentoOrcamentoController.update')
  Route.delete('/:id', 'PagamentoOrcamentoController.destroy')
}).prefix('pagamento').middleware(['auth'])

Route.post('/pagamento_total', 'PagamentoOrcamentoController.total').middleware(['auth'])
Route.post('/pagamento_boleto', 'PagamentoOrcamentoController.boleto').middleware(['auth'])
Route.post('/negociacao', 'PagamentoOrcamentoController.negociacao').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'MetodosPagamentoController.index')
  Route.post('/', 'MetodosPagamentoController.store')
}).prefix('metodosPagamento').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'ProcedimentoExecucaoController.index')
  Route.post('/', 'ProcedimentoExecucaoController.store')
  Route.put('/:id', 'ProcedimentoExecucaoController.update')
  Route.delete('/:id', 'ProcedimentoExecucaoController.destroy')
  Route.post('/discount', 'ProcedimentoExecucaoController.discount')
}).prefix('procedimentoExecucao').middleware(['auth'])


Route.group(() => {
  Route.post('/', 'PermissaoController.hasPermission')
}).prefix('permissaoCode').middleware(['auth'])


Route.group(() => {
  Route.get('/:id', 'TesteController.index')
  Route.post('/', 'TesteController.createBoleto')
}).prefix('teste').middleware(['auth'])


Route.group(() => {
  Route.post('/', 'AssaController.event')
  Route.post('/clean', 'AssaController.clean')
  Route.post('/paymentCash/:id', 'AssaController.paymentCash')
}).prefix('assas').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'EspecialidadeDentistaController.index')
  Route.post('/:id', 'EspecialidadeDentistaController.store')
}).prefix('especialidade_config').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'ComissaoConfigController.index')
  Route.post('/:id', 'ComissaoConfigController.store')
  Route.get('/:id', 'ComissaoConfigController.show')
}).prefix('comissao_config').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'ComissaoController.index')
  Route.get('/:id', 'ComissaoController.show')
  Route.put('/:id', 'ComissaoController.update')
}).prefix('comissoes').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'FichaClinicaController.index')
  Route.get('/:id', 'FichaClinicaController.show')
  Route.post('/updateTitular', 'FichaClinicaController.updateTitular')
}).prefix('fichaClinica').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'NegociacaoController.index')
  Route.get('/:id', 'NegociacaoController.show')
  Route.put('/:id', 'NegociacaoController.update')
}).prefix('faturamento').middleware(['auth'])

Route.group(() => {
  Route.put('/:id', 'NegociacaoBoletoController.update')
  Route.put('/change/:id', 'NegociacaoBoletoController.changeNegociacao')
}).prefix('negociacao_boleto').middleware(['auth'])


Route.group(() => {
  Route.get('/agendamentos', 'AgendamentoController.index')
  Route.post('/agendamentos', 'AgendamentoController.store')
  Route.delete('/agendamentos/:id', 'AgendamentoController.destroy')
  Route.put('/agendamentos/:id', 'AgendamentoController.update')
}).middleware(['auth'])


Route.group(() => {
  Route.get('/', 'AgendaController.index')
  Route.get('/:id', 'AgendaController.show')
  Route.post('/', 'AgendaController.store')
  Route.put('/:id', 'AgendaController.update')
}).prefix('agenda').middleware(['auth'])