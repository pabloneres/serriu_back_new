"use strict";

var Paciente = use('App/Models/Patient');
var api = use('App/Helpers/assasApi');
var Assas = {
  returnClientByID: function returnClientByID(id) {
    var paciente;
    return regeneratorRuntime.async(function returnClientByID$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Paciente.query().where('id', id).first());

          case 2:
            paciente = _context.sent;
            paciente = paciente.toJSON();
            return _context.abrupt("return", api.get("/customers?cpfCnpj=".concat(paciente.cpf)));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  returnClientOrCreate: function returnClientOrCreate(id) {
    var paciente, _ref, data;

    return regeneratorRuntime.async(function returnClientOrCreate$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(Paciente.query().where('id', id).first());

          case 2:
            paciente = _context2.sent;
            paciente = paciente.toJSON();
            _context2.next = 6;
            return regeneratorRuntime.awrap(api.get("/customers?cpfCnpj=".concat(paciente.cpf)));

          case 6:
            _ref = _context2.sent;
            data = _ref.data;

            if (!(data.length > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", data[0]);

          case 10:
            return _context2.abrupt("return", api.post("/customers", {
              name: "".concat(paciente.firstName, " ").concat(paciente.lastName),
              email: paciente.email,
              mobilePhone: paciente.tel,
              cpfCnpj: paciente.cpf,
              address: paciente.address,
              province: paciente.city,
              externalReference: paciente.id
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  createClient: function createClient(id) {
    var paciente;
    return regeneratorRuntime.async(function createClient$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(Paciente.query().where('id', id).first());

          case 2:
            paciente = _context3.sent;
            paciente = paciente.toJSON();
            return _context3.abrupt("return", api.post("/customers", {
              name: "".concat(paciente.firstName, " ").concat(paciente.lastName),
              email: paciente.email,
              mobilePhone: paciente.tel,
              cpfCnpj: paciente.cpf,
              address: paciente.address,
              province: paciente.city,
              externalReference: paciente.id
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  createPayment: function createPayment(_ref2) {
    var clientID, _ref2$billingType, billingType, parcelas, valorParcela, vencimento, description, externalReference;

    return regeneratorRuntime.async(function createPayment$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            clientID = _ref2.clientID, _ref2$billingType = _ref2.billingType, billingType = _ref2$billingType === void 0 ? 'BOLETO' : _ref2$billingType, parcelas = _ref2.parcelas, valorParcela = _ref2.valorParcela, vencimento = _ref2.vencimento, description = _ref2.description, externalReference = _ref2.externalReference;
            console.log(externalReference);
            return _context4.abrupt("return", api.post("/payments", {
              customer: clientID,
              billingType: billingType,
              installmentCount: parcelas,
              installmentValue: valorParcela,
              dueDate: vencimento,
              description: description,
              externalReference: externalReference
            }));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  paymentCash: function paymentCash(id, value) {
    return regeneratorRuntime.async(function paymentCash$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", api.post("/payments/".concat(id, "/receiveInCash"), {
              paymentDate: new Date(),
              value: value
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};
module.exports = Assas;