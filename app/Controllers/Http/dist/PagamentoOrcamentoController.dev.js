'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pagamentoorcamentos
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Env = use('Env');
var PagamentoOrcamento = use('App/Models/PagamentoOrcamento');
var ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao');
var Orcamento = use('App/Models/Orcamento');
var BoletosPagamento = use('App/Models/BoletosPagamento');
var FormaPagamento = use('App/Models/FormaPagamento');
var SaldoEspecialidade = use('App/Models/SaldoEspecialidade');
var Database = use('Database');
var Assas = use('App/Helpers/assas'); //  const HelpersComissao = use('App/Helpers/comissao')

var moment = require('moment');

require("moment/locale/pt-br");

moment.locale("pt-br");

var PagamentoOrcamentoController =
/*#__PURE__*/
function () {
  function PagamentoOrcamentoController() {
    _classCallCheck(this, PagamentoOrcamentoController);
  }

  _createClass(PagamentoOrcamentoController, [{
    key: "index",

    /**
     * Show a list of all pagamentoorcamentos.
     * GET pagamentoorcamentos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    value: function index(_ref) {
      var request, response, view;
      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = _ref.request, response = _ref.response, view = _ref.view;

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
    /**
     * Render a form to be used for creating a new pagamentoorcamento.
     * GET pagamentoorcamentos/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */

  }, {
    key: "create",
    value: function create(_ref2) {
      var request, response, view;
      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              request = _ref2.request, response = _ref2.response, view = _ref2.view;

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
    /**
     * Create/save a new pagamentoorcamento.
     * POST pagamentoorcamentos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */

  }, {
    key: "store",
    value: function store(_ref3) {
      var request, response, trx, _request$all, condicao, orcamento_id, procedimento_ids, formaPagamento, valor, especialidades, cobranca, gerarBoletos, orcamento, orcamentoRestante, ids_procedimento, _pagamento, especiAplicado, especiSaldo, _pagamento2, saldoEspecialidade, newSaldo, boleto, _pagamento3, paciente, _ref4, installment, pagamento;

      return regeneratorRuntime.async(function store$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              request = _ref3.request, response = _ref3.response;
              _context4.next = 3;
              return regeneratorRuntime.awrap(Database.beginTransaction());

            case 3:
              trx = _context4.sent;
              _request$all = request.all(), condicao = _request$all.condicao, orcamento_id = _request$all.orcamento_id, procedimento_ids = _request$all.procedimento_ids, formaPagamento = _request$all.formaPagamento, valor = _request$all.valor, especialidades = _request$all.especialidades, cobranca = _request$all.cobranca, gerarBoletos = _request$all.gerarBoletos;
              _context4.next = 7;
              return regeneratorRuntime.awrap(Orcamento.findBy('id', orcamento_id));

            case 7:
              orcamento = _context4.sent;

              if (!(condicao === 'procedimento')) {
                _context4.next = 20;
                break;
              }

              orcamentoRestante = orcamento.restante;
              ids_procedimento = procedimento_ids.map(function (item) {
                return item.id;
              });
              procedimento_ids = procedimento_ids.map(function (item) {
                console.log(orcamentoRestante);
                console.log(item.valorTotal);
                orcamentoRestante = Number(orcamentoRestante) - Number(item.valorTotal);
                return {
                  orcamento_id: orcamento_id,
                  procedimento_id: item.id,
                  formaPagamento: formaPagamento,
                  status: 'pago',
                  valor: item.valor,
                  desconto: item.desconto ? item.desconto : item.valor,
                  restanteOrcamento: orcamentoRestante
                };
              });
              _context4.next = 14;
              return regeneratorRuntime.awrap(PagamentoOrcamento.createMany(procedimento_ids));

            case 14:
              _pagamento = _context4.sent;
              _context4.next = 17;
              return regeneratorRuntime.awrap(ProcedimentoExecucao.query().whereIn('id', ids_procedimento).update({
                status_pagamento: 'pago'
              }));

            case 17:
              _context4.next = 19;
              return regeneratorRuntime.awrap(Orcamento.query().where('id', orcamento_id).update({
                status: 'andamento',
                saldo: orcamento.saldo + valor,
                restante: orcamento.restante - valor
              }));

            case 19:
              return _context4.abrupt("return", _pagamento);

            case 20:
              if (!(condicao === 'total')) {
                _context4.next = 38;
                break;
              }

              especialidades = especialidades.filter(function (item) {
                return item.valorAplicado > 0;
              });
              especiAplicado = [];
              especiSaldo = [];
              especialidades = especialidades.forEach(function (item) {
                especiAplicado.push({
                  orcamento_id: orcamento_id,
                  especialidade_id: item.id,
                  formaPagamento: formaPagamento,
                  status: 'pago',
                  valor: item.valor,
                  restanteOrcamento: orcamento.restante - valor,
                  valorAplicado: item.valorAplicado,
                  restante: item.restante ? item.restante - item.valorAplicado : item.valor - item.valorAplicado
                });
                especiSaldo.push({
                  orcamento_id: orcamento_id,
                  especialidade_id: item.id,
                  saldo: item.valorAplicado
                });
              });
              _context4.next = 27;
              return regeneratorRuntime.awrap(PagamentoOrcamento.createMany(especiAplicado));

            case 27:
              _pagamento2 = _context4.sent;
              _context4.next = 30;
              return regeneratorRuntime.awrap(Database.from('saldo_especialidades').where('orcamento_id', orcamento_id));

            case 30:
              saldoEspecialidade = _context4.sent;
              newSaldo = [];
              saldoEspecialidade.forEach(function (item) {
                var index = especiSaldo.findIndex(function (current) {
                  return current.especialidade_id === item.especialidade_id;
                });

                if (index === -1) {
                  return;
                }

                especiSaldo[index].saldo = especiSaldo[index].saldo + item.saldo;
                especiSaldo[index].id = item.id;
              });
              especiSaldo.forEach(function _callee(element) {
                var row;
                return regeneratorRuntime.async(function _callee$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return regeneratorRuntime.awrap(SaldoEspecialidade.query().where('especialidade_id', element.especialidade_id).andWhere('orcamento_id', element.orcamento_id).first());

                      case 3:
                        row = _context3.sent;

                        if (!row) {
                          _context3.next = 8;
                          break;
                        }

                        _context3.next = 7;
                        return regeneratorRuntime.awrap(SaldoEspecialidade.query().where('id', element.id).update({
                          saldo: element.saldo
                        }, trx));

                      case 7:
                        return _context3.abrupt("return");

                      case 8:
                        _context3.next = 10;
                        return regeneratorRuntime.awrap(SaldoEspecialidade.create({
                          orcamento_id: element.orcamento_id,
                          especialidade_id: element.especialidade_id,
                          saldo: element.saldo
                        }, trx));

                      case 10:
                        _context3.next = 15;
                        break;

                      case 12:
                        _context3.prev = 12;
                        _context3.t0 = _context3["catch"](0);
                        console.log(_context3.t0);

                      case 15:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, null, null, [[0, 12]]);
              }); // return newSaldo
              // await SaldoEspecialidade.createMany(newSaldo)
              // const teste = await ProcedimentoExecucao.query().whereIn('id', ids_procedimento)
              // .update({status: 'pago'})

              _context4.next = 36;
              return regeneratorRuntime.awrap(Orcamento.query().where('id', orcamento_id).update({
                status: 'andamento',
                saldo: orcamento.saldo + valor,
                restante: orcamento.restante - valor
              }, trx));

            case 36:
              trx.commit();
              return _context4.abrupt("return");

            case 38:
              if (!(condicao === 'boleto')) {
                _context4.next = 61;
                break;
              }

              // return especialidades
              boleto = []; // boleto.push({
              //   orcamento_id,
              //   formaPagamento: formaPagamento,
              //   status: 'pago',
              //   valor: Number(cobranca.entrada),
              // })
              ///////////////////////
              // boleto.push({
              //   orcamento_id,
              //   paciente_id: orcamento.paciente_id,
              //   status: gerarBoletos ? 'gerado' : 'salvo',
              //   value: (Number(valor) - Number(cobranca.entrada)) / cobranca.parcelas,
              //   vencimento: String(moment(cobranca.vencimento).format()),
              //   description: cobranca.descricao,
              //   numberParcela: 1
              // })
              // for (let index = 1; index < cobranca.parcelas; index++) {
              //   boleto.push({
              //     orcamento_id,
              //     paciente_id: orcamento.paciente_id,
              //     status: gerarBoletos ? 'gerado' : 'salvo',
              //     value: (Number(valor) - Number(cobranca.entrada)) / cobranca.parcelas,
              //     vencimento: String(moment(boleto[boleto.length - 1].vencimento).add(30, 'days').format()),
              //     description: cobranca.descricao,
              //     numberParcela: index + 1
              //   })
              // }
              ////////////////////////////
              // return boleto

              _context4.next = 42;
              return regeneratorRuntime.awrap(PagamentoOrcamento.create({
                orcamento_id: orcamento_id,
                formaPagamento: formaPagamento,
                status: 'pago',
                valor: Number(cobranca.entrada)
              }, trx));

            case 42:
              _pagamento3 = _context4.sent;

              if (!gerarBoletos) {
                _context4.next = 55;
                break;
              }

              _context4.next = 46;
              return regeneratorRuntime.awrap(Assas.returnClientOrCreate(orcamento.paciente_id));

            case 46:
              paciente = _context4.sent;
              _context4.next = 49;
              return regeneratorRuntime.awrap(Assas.createPayment({
                clientID: paciente.id,
                parcelas: cobranca.parcelas,
                valorParcela: (Number(valor) - Number(cobranca.entrada)) / cobranca.parcelas,
                vencimento: cobranca.vencimento,
                description: cobranca.descricao,
                externalReference: orcamento_id
              }));

            case 49:
              _ref4 = _context4.sent;
              installment = _ref4.installment;
              _context4.next = 53;
              return regeneratorRuntime.awrap(Orcamento.query().where('id', orcamento_id).update({
                carneLink: Env.get('CARNE_URL') + installment.split('_')[1],
                status: 'andamento',
                saldo: orcamento.valor,
                restante: 0
              }, trx));

            case 53:
              _context4.next = 57;
              break;

            case 55:
              _context4.next = 57;
              return regeneratorRuntime.awrap(Orcamento.query().where('id', orcamento_id).update({
                status: 'andamento',
                saldo: cobranca.entrada,
                restante: orcamento.valor - cobranca.entrada
              }, trx));

            case 57:
              _context4.next = 59;
              return regeneratorRuntime.awrap(FormaPagamento.query().where('orcamento_id', orcamento.id).update({
                entrada: cobranca.entrada,
                parcelas: cobranca.parcelas
              }));

            case 59:
              trx.commit();
              return _context4.abrupt("return", _pagamento3);

            case 61:
              _context4.next = 63;
              return regeneratorRuntime.awrap(PagamentoOrcamento.create({
                orcamento_id: orcamento_id,
                formaPagamento: formaPagamento,
                status: 'aguardando',
                valor: valor
              }));

            case 63:
              pagamento = _context4.sent;

              if (!(orcamento.valor === pagamento.valor)) {
                _context4.next = 67;
                break;
              }

              _context4.next = 67;
              return regeneratorRuntime.awrap(Orcamento.query().where('id', orcamento_id).update({
                status: 'pago',
                saldo: valor
              }));

            case 67:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
    /**
     * Display a single pagamentoorcamento.
     * GET pagamentoorcamentos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */

  }, {
    key: "show",
    value: function show(_ref5) {
      var params, request, response, view;
      return regeneratorRuntime.async(function show$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              params = _ref5.params, request = _ref5.request, response = _ref5.response, view = _ref5.view;

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
    /**
     * Render a form to update an existing pagamentoorcamento.
     * GET pagamentoorcamentos/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */

  }, {
    key: "edit",
    value: function edit(_ref6) {
      var params, request, response, view;
      return regeneratorRuntime.async(function edit$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              params = _ref6.params, request = _ref6.request, response = _ref6.response, view = _ref6.view;

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
    /**
     * Update pagamentoorcamento details.
     * PUT or PATCH pagamentoorcamentos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */

  }, {
    key: "update",
    value: function update(_ref7) {
      var params, request, response;
      return regeneratorRuntime.async(function update$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              params = _ref7.params, request = _ref7.request, response = _ref7.response;

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
    /**
     * Delete a pagamentoorcamento with id.
     * DELETE pagamentoorcamentos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */

  }, {
    key: "destroy",
    value: function destroy(_ref8) {
      var params, request, response;
      return regeneratorRuntime.async(function destroy$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              params = _ref8.params, request = _ref8.request, response = _ref8.response;

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      });
    }
  }]);

  return PagamentoOrcamentoController;
}();

module.exports = PagamentoOrcamentoController;