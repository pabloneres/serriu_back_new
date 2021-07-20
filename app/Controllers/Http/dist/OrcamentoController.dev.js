'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Database = use('Database');
var Orcamento = use('App/Models/Orcamento');
var ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao');
var FormaPagamento = use('App/Models/FormaPagamento');
var Helpers = use('App/Helpers/orcamento');

var OrcamentoController =
/*#__PURE__*/
function () {
  function OrcamentoController() {
    _classCallCheck(this, OrcamentoController);
  }

  _createClass(OrcamentoController, [{
    key: "index",
    value: function index(_ref) {
      var request, response, view, auth, _request$get, paciente_id, status, returnType, orcamento, _orcamentos, orcamentos;

      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = _ref.request, response = _ref.response, view = _ref.view, auth = _ref.auth;
              _request$get = request.get(), paciente_id = _request$get.paciente_id, status = _request$get.status, returnType = _request$get.returnType;

              if (!returnType) {
                _context.next = 7;
                break;
              }

              _context.next = 5;
              return regeneratorRuntime.awrap(Orcamento.query().where('paciente_id', paciente_id)["with"]('procedimentos', function (builder) {
                builder["with"]('dentista', function (builder) {
                  builder.select('id', 'firstName', 'lastName');
                })["with"]('procedimento', function (builder) {
                  builder.select('id', 'name');
                });
              })["with"]('pagamento')["with"]('pagamentos', function (builder) {
                builder["with"]('especialidades');
                builder["with"]('procedimentos');
              })["with"]('boletos', function (builder) {
                builder.orderBy('id', 'desc');
              }).orderBy('id', 'desc').fetch());

            case 5:
              orcamento = _context.sent;
              return _context.abrupt("return", orcamento);

            case 7:
              if (!status) {
                _context.next = 12;
                break;
              }

              _context.next = 10;
              return regeneratorRuntime.awrap(Orcamento.query().where('paciente_id', paciente_id).andWhere('status', status).withCount('procedimentos as total_procedimentos').fetch());

            case 10:
              _orcamentos = _context.sent;
              return _context.abrupt("return", _orcamentos);

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(Orcamento.query().where('paciente_id', paciente_id).withCount('procedimentos as total_procedimentos').orderBy('id', 'desc').fetch());

            case 14:
              orcamentos = _context.sent;
              return _context.abrupt("return", orcamentos);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "store",
    value: function store(_ref2) {
      var request, response, trx, data, procedimentos, orcamento, pagamento, saveOrcamento, saveProcedimento, savePagamento;
      return regeneratorRuntime.async(function store$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              request = _ref2.request, response = _ref2.response;
              _context2.next = 3;
              return regeneratorRuntime.awrap(Database.beginTransaction());

            case 3:
              trx = _context2.sent;
              data = request.all();
              procedimentos = Helpers.procedimentoHelper(data.procedimentos);
              orcamento = Helpers.orcamentoHelper(data);
              pagamento = Helpers.pagamentoHelper(data.pagamento); // return {procedimentos, orcamento, pagamento}

              saveOrcamento = _objectSpread({}, orcamento, {
                valor: procedimentos.reduce(function (a, b) {
                  return a + b.valor;
                }, 0),
                restante: procedimentos.reduce(function (a, b) {
                  return a + b.valor;
                }, 0),
                avaliador: data.avaliador,
                valorDesconto: procedimentos.reduce(function (a, b) {
                  return a + b.valor;
                }, 0)
              });
              _context2.next = 11;
              return regeneratorRuntime.awrap(Orcamento.create(saveOrcamento, trx));

            case 11:
              saveOrcamento = _context2.sent;
              saveProcedimento = procedimentos.map(function (item) {
                return _objectSpread({}, item, {
                  desconto: item.valor,
                  orcamento_id: saveOrcamento.id
                });
              });
              _context2.next = 15;
              return regeneratorRuntime.awrap(ProcedimentoExecucao.createMany(saveProcedimento, trx));

            case 15:
              saveProcedimento = _context2.sent;
              savePagamento = _objectSpread({}, pagamento, {
                orcamento_id: saveOrcamento.id
              });
              _context2.next = 19;
              return regeneratorRuntime.awrap(FormaPagamento.create(savePagamento, trx));

            case 19:
              savePagamento = _context2.sent;
              _context2.next = 22;
              return regeneratorRuntime.awrap(trx.commit());

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "show",
    value: function show(_ref3) {
      var params, request, response, view, orcamento;
      return regeneratorRuntime.async(function show$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params = _ref3.params, request = _ref3.request, response = _ref3.response, view = _ref3.view;
              _context3.next = 3;
              return regeneratorRuntime.awrap(Orcamento.query().where('id', params.id)["with"]('procedimentos', function (builder) {
                builder["with"]('dentista', function (builder) {
                  builder.select('id', 'firstName', 'lastName');
                })["with"]('procedimento.especialidade', function (builder) {
                  builder.select('id', 'name');
                }).orderBy('id', 'cres');
              })["with"]('pagamento')["with"]('pagamentos.especialidades').first());

            case 3:
              orcamento = _context3.sent;
              return _context3.abrupt("return", orcamento);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "edit",
    value: function edit(_ref4) {
      var params, request, response, view;
      return regeneratorRuntime.async(function edit$(_context4) {
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
    key: "update",
    value: function update(_ref5) {
      var params, request, response, trx, data, procedimentos, orcamento, pagamento, saveOrcamento, saveProcedimento, savePagamento;
      return regeneratorRuntime.async(function update$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              params = _ref5.params, request = _ref5.request, response = _ref5.response;
              _context5.next = 3;
              return regeneratorRuntime.awrap(Database.beginTransaction());

            case 3:
              trx = _context5.sent;
              data = request.all();
              procedimentos = Helpers.procedimentoHelper(data.procedimentos);
              orcamento = Helpers.orcamentoHelper(data);
              pagamento = Helpers.pagamentoHelper(data.pagamento);
              saveOrcamento = _objectSpread({}, orcamento, {
                valor: procedimentos.reduce(function (a, b) {
                  return a + b.valor;
                }, 0),
                restante: procedimentos.reduce(function (a, b) {
                  return a + b.valor;
                }, 0),
                avaliador: data.avaliador,
                valorDesconto: procedimentos.reduce(function (a, b) {
                  return a + b.valor;
                }, 0)
              });
              console.log(procedimentos);
              _context5.next = 12;
              return regeneratorRuntime.awrap(Orcamento.query().where('id', data.id).update(saveOrcamento, trx));

            case 12:
              saveOrcamento = _context5.sent;
              _context5.next = 15;
              return regeneratorRuntime.awrap(ProcedimentoExecucao.query().where('orcamento_id', data.id)["delete"](trx));

            case 15:
              saveProcedimento = procedimentos.map(function (item) {
                return _objectSpread({}, item, {
                  desconto: item.valor,
                  orcamento_id: data.id,
                  dentista_id: data.avaliador
                });
              });
              _context5.next = 18;
              return regeneratorRuntime.awrap(ProcedimentoExecucao.createMany(saveProcedimento, trx));

            case 18:
              saveProcedimento = _context5.sent;
              _context5.next = 21;
              return regeneratorRuntime.awrap(FormaPagamento.query().where('orcamento_id', data.id)["delete"](trx));

            case 21:
              savePagamento = _objectSpread({}, pagamento, {
                orcamento_id: data.id
              });
              _context5.next = 24;
              return regeneratorRuntime.awrap(FormaPagamento.create(savePagamento, trx));

            case 24:
              savePagamento = _context5.sent;
              _context5.next = 27;
              return regeneratorRuntime.awrap(trx.commit());

            case 27:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy(_ref6) {
      var params, request, response, orcamento;
      return regeneratorRuntime.async(function destroy$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              params = _ref6.params, request = _ref6.request, response = _ref6.response;
              orcamento = Orcamento.query().where('id', params.id)["delete"]();

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }]);

  return OrcamentoController;
}();

module.exports = OrcamentoController;