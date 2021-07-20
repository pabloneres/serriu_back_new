'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with procedimentoexecucaos
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao');
var User = use('App/Models/User');
var Orcamento = use('App/Models/Orcamento');
var DepartmentClinc = use('App/Models/DepartmentClinc');
var SaldoEspecialidade = use('App/Models/SaldoEspecialidade');
var Database = use('Database');

var ProcedimentoExecucaoController =
/*#__PURE__*/
function () {
  function ProcedimentoExecucaoController() {
    _classCallCheck(this, ProcedimentoExecucaoController);
  }

  _createClass(ProcedimentoExecucaoController, [{
    key: "index",
    value: function index(_ref) {
      var request, response, view, _request$get, status, paciente_id, procedimentos;

      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = _ref.request, response = _ref.response, view = _ref.view;
              _request$get = request.get(), status = _request$get.status, paciente_id = _request$get.paciente_id;
              _context.next = 4;
              return regeneratorRuntime.awrap(Orcamento.query().where('paciente_id', paciente_id)["with"]('procedimentos', function (builder) {
                builder["with"]('dentista', function (builder) {
                  builder.select('id', 'firstName', 'lastName');
                })["with"]('procedimento.especialidade', function (builder) {
                  builder.select('id', 'name');
                }).orderBy('id', 'cres');
              })["with"]('pagamento')["with"]('pagamentos.especialidades')["with"]('saldoEspecialidade')["with"]('boletos', function (builder) {
                builder.orderBy('invoiceNumber', 'cres');
              }).orderBy('id', 'desc').fetch());

            case 4:
              procedimentos = _context.sent;
              return _context.abrupt("return", procedimentos);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }
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
  }, {
    key: "store",
    value: function store(_ref3) {
      var request, response, data, user, orcamento, diff, porcentagem, department, descontoPermitido, permitido, procedimento;
      return regeneratorRuntime.async(function store$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              request = _ref3.request, response = _ref3.response;
              // return request.all()
              data = request.all();
              _context3.next = 4;
              return regeneratorRuntime.awrap(User.findBy('code', data.passwordCode));

            case 4:
              user = _context3.sent;

              if (!user) {
                response.status(401).send({
                  message: 'Acesso negado'
                });
              }

              _context3.next = 8;
              return regeneratorRuntime.awrap(Orcamento.findBy('id', data.orcamento_id));

            case 8:
              orcamento = _context3.sent;
              diff = data.valor - Number(data.valorTotal);
              porcentagem = (diff * 100 / data.valor).toFixed(1);
              _context3.next = 13;
              return regeneratorRuntime.awrap(user.department().first());

            case 13:
              department = _context3.sent;
              _context3.next = 16;
              return regeneratorRuntime.awrap(DepartmentClinc.query().where('clinic_id', orcamento.clinic_id).andWhere('department_id', department.id).first());

            case 16:
              descontoPermitido = _context3.sent;
              permitido = descontoPermitido.discount >= porcentagem;

              if (permitido) {
                _context3.next = 21;
                break;
              }

              response.status(401).send({
                message: 'Desconto não autorizado'
              });
              return _context3.abrupt("return");

            case 21:
              _context3.next = 23;
              return regeneratorRuntime.awrap(Orcamento.query().where('id', orcamento.id).update({
                restante: orcamento.restante - diff,
                valorDesconto: orcamento.valorDesconto - diff
              }));

            case 23:
              _context3.next = 25;
              return regeneratorRuntime.awrap(ProcedimentoExecucao.query().where('id', data.id).update({
                desconto: Number(data.valorTotal)
              }));

            case 25:
              procedimento = _context3.sent;
              return _context3.abrupt("return", procedimento);

            case 27:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "show",
    value: function show(_ref4) {
      var params, request, response, view;
      return regeneratorRuntime.async(function show$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              params = _ref4.params, request = _ref4.request, response = _ref4.response, view = _ref4.view;

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "edit",
    value: function edit(_ref5) {
      var params, request, response, view;
      return regeneratorRuntime.async(function edit$(_context5) {
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
  }, {
    key: "update",
    value: function update(_ref6) {
      var params, request, response, trx, data, orcamento, procedimento, sobra, saldo;
      return regeneratorRuntime.async(function update$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              params = _ref6.params, request = _ref6.request, response = _ref6.response;
              _context6.next = 3;
              return regeneratorRuntime.awrap(Database.beginTransaction());

            case 3:
              trx = _context6.sent;
              data = request.all();
              _context6.next = 7;
              return regeneratorRuntime.awrap(Orcamento.findBy('id', data.orcamento_id));

            case 7:
              orcamento = _context6.sent;
              _context6.next = 10;
              return regeneratorRuntime.awrap(ProcedimentoExecucao.query().where('id', data.procedimento_id)["with"]('procedimento.especialidade').first());

            case 10:
              procedimento = _context6.sent;
              procedimento = procedimento.toJSON();
              sobra = Number(orcamento.saldo) - Number(procedimento.desconto);
              _context6.next = 15;
              return regeneratorRuntime.awrap(ProcedimentoExecucao.query().where('id', procedimento.id).update({
                status_execucao: 'executado',
                detalhes: data.detalhes
              }, trx));

            case 15:
              _context6.next = 17;
              return regeneratorRuntime.awrap(SaldoEspecialidade.query().where('orcamento_id', data.orcamento_id).andWhere('especialidade_id', procedimento.procedimento.especialidade_id).first());

            case 17:
              saldo = _context6.sent;

              if (saldo) {
                _context6.next = 23;
                break;
              }

              _context6.next = 21;
              return regeneratorRuntime.awrap(SaldoEspecialidade.create({
                orcamento_id: data.orcamento_id,
                especialidade_id: procedimento.procedimento.especialidade_id,
                saldo: 0 - procedimento.desconto
              }, trx));

            case 21:
              _context6.next = 25;
              break;

            case 23:
              _context6.next = 25;
              return regeneratorRuntime.awrap(SaldoEspecialidade.query().where('id', saldo.id).update({
                saldo: saldo.saldo - procedimento.desconto
              }));

            case 25:
              _context6.next = 27;
              return regeneratorRuntime.awrap(Orcamento.query().where('id', orcamento.id).update({
                saldo: sobra
              }, trx));

            case 27:
              // const [{ "count(*)": totalExecutado }] = await Database.table('procedimentos_orcamentos').count('*').where('orcamento_id', id).andWhere('status', 'executado')
              // if(totalAberto === 0) {
              //   await Orcamento.query().where('id', id).update({
              //     status: 'finalizado'
              //   }, trx)
              //   await ComissaoDentista.query().where('orcamento_id', orcamento.id).update({
              //     status_comissao: 'pagar'
              //   })
              // }
              trx.commit();

            case 28:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy(_ref7) {
      var params, request, response;
      return regeneratorRuntime.async(function destroy$(_context7) {
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
  }]);

  return ProcedimentoExecucaoController;
}();

module.exports = ProcedimentoExecucaoController;