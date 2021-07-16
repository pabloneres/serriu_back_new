'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Boleto = use('App/Models/BoletosPagamento');
var Orcamento = use('App/Models/Orcamento');

var AssaController =
/*#__PURE__*/
function () {
  function AssaController() {
    _classCallCheck(this, AssaController);
  }

  _createClass(AssaController, [{
    key: "event",
    value: function event(_ref) {
      var request, response, data, orcamento, boleto;
      return regeneratorRuntime.async(function event$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = _ref.request, response = _ref.response;
              data = request.all(); // // response.status(200).send({ message: 'ok' })
              // return { messase: 'ok' }

              _context.next = 4;
              return regeneratorRuntime.awrap(Orcamento.query().where('parcelamento_id', data.payment.installment).first());

            case 4:
              orcamento = _context.sent;

              if (orcamento) {
                _context.next = 8;
                break;
              }

              response.status(401).send({
                message: 'Orcamento não encontrado'
              });
              return _context.abrupt("return");

            case 8:
              _context.t0 = data.event;
              _context.next = _context.t0 === 'PAYMENT_CREATED' ? 11 : 23;
              break;

            case 11:
              _context.prev = 11;
              _context.next = 14;
              return regeneratorRuntime.awrap(Boleto.create(_objectSpread({}, data.payment, {
                orcamento_id: orcamento.id
              })));

            case 14:
              boleto = _context.sent;
              response.status(200).send({
                message: boleto
              });
              return _context.abrupt("return");

            case 19:
              _context.prev = 19;
              _context.t1 = _context["catch"](11);
              response.status(401).send({
                message: _context.t1
              });
              return _context.abrupt("return");

            case 23:
              response.status(200).send({
                message: 'Recebido mas não houve uma ação!'
              });

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[11, 19]]);
    }
  }]);

  return AssaController;
}();

module.exports = AssaController;