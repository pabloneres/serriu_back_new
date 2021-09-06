const ComissaoConfig = require('../Models/ComissaoConfig')
const EspecialidadeExecucao = require('../Models/EspecialidadeExecucao')

const helper = {
  async executarSemSaldo(data) {
    let {
      orcamento,
      procedimento,
      dentista_id
    } = data

    let config = await ComissaoConfig
      .query()
      .where('dentista_id', dentista_id)
      .andWhere('clinica_id', orcamento.clinic_id).first()
    config = config.toJSON()

    let especialidade = await EspecialidadeExecucao.query()
      .where('orcamento_id', orcamento.id)
      .andWhere('especialidade_id', procedimento.especialidade_id)
      .first()
    especialidade = especialidade.toJSON()

    const haveSaldo = especialidade.saldo >= procedimento.desconto

    if (!haveSaldo && !config.executar_sem_saldo) {
      return false
    }

    return true
  },
}

module.exports = helper