'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Boleto = use('App/Models/BoletosPagamento');
var Orcamento = use('App/Models/Orcamento');
var Assas = use('App/Helpers/assas');

var AssaController =
/*#__PURE__*/
function () {
  function AssaController() {
    _classCallCheck(this, AssaController);
  }

  _createClass(AssaController, [{
    key: "event",
    value: function event(_ref) {
      var request, response, data, boleto, orcamento, _boleto;

      return regeneratorRuntime.async(function event$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = _ref.request, response = _ref.response;
              data = request.all();
              _context.t0 = data.event;
              _context.next = _context.t0 === 'PAYMENT_RECEIVED' ? 5 : _context.t0 === 'PAYMENT_CREATED' ? 15 : 33;
              break;

            case 5:
              _context.next = 7;
              return regeneratorRuntime.awrap(Boleto.query().where('id', data.payment.id).first());

            case 7:
              boleto = _context.sent;

              if (boleto) {
                _context.next = 11;
                break;
              }

              response.status(200).send({
                message: 'Boleto não encontrado'
              });
              return _context.abrupt("return");

            case 11:
              _context.next = 13;
              return regeneratorRuntime.awrap(boleto.update(_objectSpread({}, data.payment)));

            case 13:
              response.status(200).send({
                message: "Pagamento confirmado em dinheiro, ID: ".concat(boleto.id)
              });
              return _context.abrupt("return");

            case 15:
              _context.prev = 15;
              _context.next = 18;
              return regeneratorRuntime.awrap(Orcamento.query().where('parcelamento_id', data.payment.installment).first());

            case 18:
              orcamento = _context.sent;

              if (orcamento) {
                _context.next = 22;
                break;
              }

              response.status(401).send({
                message: 'Orcamento não encontrado'
              });
              return _context.abrupt("return");

            case 22:
              _context.next = 24;
              return regeneratorRuntime.awrap(Boleto.create(_objectSpread({}, data.payment, {
                orcamento_id: orcamento.id
              })));

            case 24:
              _boleto = _context.sent;
              response.status(200).send({
                message: _boleto
              });
              return _context.abrupt("return");

            case 29:
              _context.prev = 29;
              _context.t1 = _context["catch"](15);
              response.status(401).send({
                message: _context.t1
              });
              return _context.abrupt("return");

            case 33:
              response.status(200).send({
                message: 'Recebido mas não houve uma ação!'
              });
              return _context.abrupt("return");

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[15, 29]]);
    }
  }, {
    key: "paymentCash",
    value: function paymentCash(_ref2) {
      var request, response, params, id, boleto;
      return regeneratorRuntime.async(function paymentCash$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              request = _ref2.request, response = _ref2.response, params = _ref2.params;
              id = params.id;
              _context2.next = 4;
              return regeneratorRuntime.awrap(Boleto.query().where('id', id).first());

            case 4:
              boleto = _context2.sent;
              boleto = boleto.toJSON();
              _context2.next = 8;
              return regeneratorRuntime.awrap(Assas.paymentCash(id, boleto.value));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "clean",
    value: function clean(_ref3) {
      var request, response;
      return regeneratorRuntime.async(function clean$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              request = _ref3.request, response = _ref3.response;
              response.status(200).send({
                message: 'Fila foi zerada'
              });
              return _context3.abrupt("return");

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return AssaController;
}();

module.exports = AssaController;