'use strict'

const Orcamento = use('App/Models/Orcamento')
const EspecialidadeExecucao = use('App/Models/EspecialidadeExecucao')
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')


class FichaClinicaController {
  async index({ request, response }) {
    const { paciente_id } = request.get()

    let orcamentos = await Orcamento
      .query()
      .where('paciente_id', paciente_id)
      .with('especialidades', especialidades => {
        especialidades.with('procedimentos', procedimentos => {
          procedimentos.with('procedimento')
          procedimentos.with('dentista', dentista => {
            dentista.select('id', 'firstName', 'lastName')
          })
        })
        especialidades.with('especialidade')
        especialidades.orderBy('id', 'desc')
      })
      .fetch()

    orcamentos = orcamentos.toJSON()

    orcamentos = orcamentos.map(orcamento => ({
      ...orcamento,
      especialidades: orcamento.especialidades.map(especialidade => ({
        ...especialidade,
        procedimentos: especialidade.procedimentos.filter(item => item.orcamento_id === especialidade.orcamento_id)
      }))
    }))

    return orcamentos
  }

  async show({ request, response, params }) {
    const { paciente_id } = request.get()
    const especialidades = await Orcamento
      .query()
      .where('id', params.id)
      .andWhere('paciente_id', paciente_id)
      .with('especialidades', builder => {
        builder.with('procedimentos', procedimentos => {
          procedimentos.with('procedimento')
          procedimentos.with('dentista', dentista => {
            dentista.select('id', 'firstName', 'lastName')
          })
        }
        )
        builder.with('especialidade')
        builder.orderBy('id', 'desc')
      })
      .first()

    return especialidades
  }


  async updateTitular({ request, response }) {
    const {
      orcamento_id,
      especialidade_id,
      dentista_id
    } = request.all()

    await ProcedimentoExecucao.query()
      .where('orcamento_id', orcamento_id)
      .andWhere('especialidade_id', especialidade_id)
      .update({
        titular: dentista_id
      })

    await EspecialidadeExecucao.query()
      .where('orcamento_id', orcamento_id)
      .andWhere('especialidade_id', especialidade_id)
      .update({
        titular: dentista_id
      })

    return
  }
}

module.exports = FichaClinicaController
