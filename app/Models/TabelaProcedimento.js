'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TabelaProcedimento extends Model {
    preco() {
        return this
            .belongsTo('App/Models/Preco')
    }

    relation() {
        return this.belongsToMany(
            'App/Models/EspecialidadesDentista',
            'dentista_id',
            'especialidade_id',
            'id',
            'id'
        )
    }

    especialidade() {
        return this.belongsTo('App/Models/TabelaEspecialidade', 'especialidade_id', 'id')
    }
    lab() {
        return this.belongsTo('App/Models/LaboratorioServico', 'labsService', 'id')
    }
}

module.exports = TabelaProcedimento
