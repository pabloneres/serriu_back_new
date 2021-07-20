'use strict';
/** @type {import('@adonisjs/lucid/src/Schema')} */

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Schema = use('Schema');

var BoletosPagamentoSchema =
/*#__PURE__*/
function (_Schema) {
  _inherits(BoletosPagamentoSchema, _Schema);

  function BoletosPagamentoSchema() {
    _classCallCheck(this, BoletosPagamentoSchema);

    return _possibleConstructorReturn(this, _getPrototypeOf(BoletosPagamentoSchema).apply(this, arguments));
  }

  _createClass(BoletosPagamentoSchema, [{
    key: "up",
    value: function up() {
      this.create('boletos_pagamentos', function (table) {
        table.integer('orcamento_id').references('id').inTable('orcamentos').notNullable().onUpdate('CASCADE').onDelete('CASCADE'); // table
        //   .integer('paciente_id')
        //   .unsigned()
        //   .notNullable()
        //   .references('id')
        //   .inTable('patients')
        //   .onUpdate('CASCADE')
        //   .onDelete('CASCADE')

        table.string('object');
        table.string('id').primary();
        table.string('dateCreated');
        table.string('customer');
        table.string('installment');
        table.string('paymentLink');
        table["float"]('value');
        table["float"]('netValue');
        table["float"]('originalValue');
        table["float"]('interestValue');
        table.string('description');
        table.string('billingType');
        table.string('status');
        table.string('dueDate');
        table.string('confirmedDate');
        table.string('originalDueDate');
        table.string('paymentDate');
        table.string('clientPaymentDate');
        table.string('invoiceUrl');
        table.string('invoiceNumber');
        table.string('externalReference');
        table["boolean"]('deleted');
        table["boolean"]('anticipated');
        table.string('creditDate');
        table.string('estimatedCreditDate');
        table.string('bankSlipUrl');
        table.string('lastInvoiceViewedDate');
        table.string('lastBankSlipViewedDate');
        table["boolean"]('postalService');
        table.timestamps();
      });
    }
  }, {
    key: "down",
    value: function down() {
      this.drop('boletos_pagamentos');
    }
  }]);

  return BoletosPagamentoSchema;
}(Schema);

module.exports = BoletosPagamentoSchema;