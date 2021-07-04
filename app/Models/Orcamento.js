'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Orcamento extends Model {
    procedimentos() {
        return this.hasMany('App/Models/ProcedimentoExecucao')
    }

    pagamento() {
        return this.hasOne('App/Models/FormaPagamento')
    }

    pagamentos() {
        return this.hasMany('App/Models/PagamentoOrcamento')
    }

    boletos() {
        return this.hasMany('App/Models/BoletosPagamento')
    }

    dentistas() {
        return this.belongsTo('App/Models/Dentist', 'dentista_id', 'id')
    }

    comissoes() {
        return this.hasMany('App/Models/ComissaoDentista')
    }

    ordens() {
        return this.hasMany('App/Models/OrdemPagamento')
    }

    paciente() {
        return this.belongsTo('App/Models/Patient', 'paciente_id', 'id')
    }

    pacientes() {
        return this.belongsTo('App/Models/Patient', 'paciente_id', 'id')
    }
}

module.exports = Orcamento
