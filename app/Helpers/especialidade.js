const EspecialidadeExecucao = use('App/Models/EspecialidadeExecucao')
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')
const ComissaoConfig = use('App/Models/ComissaoConfig')
const ClinicConfig = use('App/Models/ClinicConfig')
const FormaPagamento = use('App/Models/FormaPagamento')
const EspecialidadeNegociacao = use('App/Models/EspecialidadeNegociacao')
const ComissaoHelper = use('App/Helpers/comissao')
const Comissao = use('App/Models/Comissao')
const LabsService = use('App/Models/LaboratorioServico')
const Orcamento = use('App/Models/Orcamento')
const EspecialidadeDentista = use('App/Models/EspecialidadeDentista')
const EspecialidadeHelper = use('App/Helpers/especialidade')

const Helpers = {
  async updateValues(especiallidades, orcamento_id) {
    especiallidades.forEach(async (item) => {
      try {
        let especialidade = await EspecialidadeExecucao.query()
          .where('especialidade_id', item.id)
          .andWhere('orcamento_id', orcamento_id)
          .first()
        especialidade = especialidade.toJSON()

        await EspecialidadeExecucao.query()
          .where('especialidade_id', item.id)
          .andWhere('orcamento_id', orcamento_id)
          .update({
            restante: especialidade.restante - Number(item.valorAplicado),
            saldo: especialidade.saldo + Number(item.valorAplicado),
            saldoComissao: especialidade.saldoComissao + Number(item.valorAplicado),
          })
      } catch (error) {
        console.log(error)
      }
    })
  },
  async updateValuesExecutado(data) {
    const {
      especialidade_id,
      orcamento,
      procedimento
    } = data

    let especialidade = await EspecialidadeExecucao.query()
      .where('especialidade_id', especialidade_id)
      .andWhere('orcamento_id', orcamento.id)
      .first()
    especialidade = especialidade.toJSON()

    await EspecialidadeExecucao.query()
      .where('especialidade_id', especialidade_id)
      .andWhere('orcamento_id', orcamento.id)
      .update({
        saldo: especialidade.saldo - Number(procedimento.desconto),
      })

  },
  async payComissao(especialidades, orcamento) {
    especialidades.forEach(async (item) => {
      try {
        let especialidade = await EspecialidadeExecucao.query()
          .where('id', item.especialidade_id)
          .first()
        especialidade = especialidade.toJSON()

        if (especialidade.titular) {
          await comissaoTotal({
            dentista_id: especialidade.titular,
            especialidade_id: item.especialidadeExecucao.especialidade_id,
            orcamento,
            valor: Number(item.valorAplicado),
          })

          await EspecialidadeExecucao.query()
            .where('id', item.especialidade_id)
            .update({
              saldoComissao: 0,
            })
        }
      } catch (error) {
        console.log(error)
      }
    })
  },
  async payComissaoById(id, orcamento) {
    let especialidade = await EspecialidadeExecucao.query()
      .where('id', id)
      .first()
    especialidade = especialidade.toJSON()
    console.log(especialidade)

    if (especialidade.titular) {
      await ComissaoHelper.comissaoTotal(
        {
          dentista_id: especialidade.titular,
          especialidade_id: especialidade.especialidade_id,
          orcamento,
          valor: Number(especialidade.saldoComissao),
        })

      await EspecialidadeExecucao.query()
        .where('id', id)
        .update({
          saldoComissao: 0,
        })
    }
  },
  async verifyTitular(data) {
    const {
      orcamento,
      especialidade_id,
      dentista_id
    } = data

    let especialidade = await EspecialidadeExecucao.query()
      .where('orcamento_id', orcamento.id)
      .andWhere('especialidade_id', especialidade_id)
      .first()
    especialidade = especialidade.toJSON()  //tras a especialidade

    if (!especialidade.titular) {
      await ProcedimentoExecucao.query()
        .where('orcamento_id', orcamento.id)
        .andWhere('especialidade_id', especialidade_id)
        .update({
          titular: dentista_id
        })
      await EspecialidadeExecucao.query()
        .where('orcamento_id', orcamento.id)
        .andWhere('especialidade_id', especialidade_id)
        .update({
          titular: dentista_id
        })
    } // se não tiver um titular na especialidade ele adiciona um titular

    let config = await comissaoConfig(dentista_id, orcamento.clinic_id)

    if (!config || !config.recebe_comissao || config.forma_recebimento === 'procedimento') {
      return
    }

    if (especialidade.saldoComissao > 0) {
      console.log('ok')
      await Helpers.payComissaoById(especialidade.id, orcamento)
    }  // se o saldo da comissao for maior que 0 ele paga a comissao para o titular
  },
  async verifyTitularBoletoOrcamento(data) {
    const {
      orcamento,
      especialidade_id,
      dentista_id
    } = data

    let especialidade = await EspecialidadeExecucao.query()
      .where('orcamento_id', orcamento.id)
      .andWhere('especialidade_id', especialidade_id)
      .first()
    especialidade = especialidade.toJSON()  //tras a especialidade

    if (!especialidade.titular) {
      await ProcedimentoExecucao.query()
        .where('orcamento_id', orcamento.id)
        .andWhere('especialidade_id', especialidade_id)
        .update({
          titular: dentista_id
        })
      await EspecialidadeExecucao.query()
        .where('orcamento_id', orcamento.id)
        .andWhere('especialidade_id', especialidade_id)
        .update({
          titular: dentista_id
        })
    } // se não tiver um titular na especialidade ele adiciona um titular

    let config = await Helpers.clinicConfig(orcamento.clinic_id)

    if (especialidade.saldoComissao > 0 && config.comissao_boleto === 'orcamento') {
      await Helpers.payComissaoById(especialidade.id, orcamento)
    }  // se o saldo da comissao for maior que 0 ele paga a comissao para o titular
  },
  async verifyTitularBoleto(data) {
    const {
      orcamento,
      especialidade_id,
      dentista_id
    } = data

    let especialidade = await EspecialidadeExecucao.query()
      .where('orcamento_id', orcamento.id)
      .andWhere('especialidade_id', especialidade_id)
      .first()
    especialidade = especialidade.toJSON()  //busca a especialidade

    if (!especialidade.titular) {
      await ProcedimentoExecucao.query()
        .where('orcamento_id', orcamento.id)
        .andWhere('especialidade_id', especialidade_id)
        .update({
          titular: dentista_id
        })
      await EspecialidadeExecucao.query()
        .where('orcamento_id', orcamento.id)
        .andWhere('especialidade_id', especialidade_id)
        .update({
          titular: dentista_id
        })
    } // se não tiver um titular na especialidade ele adiciona um titular
  },
  async clinicConfig(clinica_id) {
    try {
      let config = await ClinicConfig
        .query()
        .where('clinic_id', clinica_id)
        .first()

      return config.toJSON()
    } catch (error) {
      console.log(error)
    }
  },
  async formaPagamento(orcamento_id) {
    try {
      let formaPagamento = await FormaPagamento.query()
        .where('orcamento_id', orcamento_id)
        .first()
      return formaPagamento.toJSON()

    } catch (error) {
      console.log(error)
    }
  },
  async especialidadeNegociacao(data) {
    console.log(data)
    const {
      especialidades,
      orcamento_id,
      negociacao_id
    } = data

    especialidades.forEach(async (item) => {
      try {
        let especialidade = await EspecialidadeExecucao
          .query()
          .where('especialidade_id', item.id)
          .andWhere('orcamento_id', orcamento_id)
          .first()
        especialidade = especialidade.toJSON()

        await EspecialidadeNegociacao.create({
          negociacao_id,
          especialidade_id: especialidade.id,
          restante: item.restante - item.valorAplicado,
          pago: item.valorAplicado
        })

        await EspecialidadeExecucao
          .query()
          .where('especialidade_id', item.id)
          .andWhere('orcamento_id', orcamento_id)
          .update({
            restante: especialidade.restante - item.valorAplicado,
            saldo: item.valorAplicado,
            saldoComissao: item.valorAplicado,
          })
      } catch (error) {
        console.error(error)
      }
    })
  },
  async especialidadeNegociacaoUpdate(data) {
    console.log(data)
    const {
      especialidades,
      orcamento_id,
      negociacao_id
    } = data

    especialidades.forEach(async (item) => {
      try {
        let especialidade = await EspecialidadeExecucao
          .query()
          .where('especialidade_id', item.id)
          .andWhere('orcamento_id', orcamento_id)
          .first()
        especialidade = especialidade.toJSON()

        await EspecialidadeNegociacao.create({
          negociacao_id,
          especialidade_id: especialidade.id,
          restante: item.restante - item.valorAplicado,
          pago: item.valorAplicado
        })
      } catch (error) {
        console.error(error)
      }
    })
  },

}

async function comissaoConfig(dentista_id, clinica_id) {
  try {
    let config = await ComissaoConfig
      .query()
      .where('dentista_id', dentista_id)
      .andWhere('clinica_id', clinica_id)
      .first()

    return config.toJSON()
  } catch (error) {
    console.log(error)
  }
}

async function comissaoTotal(data) {
  const {
    orcamento,
    dentista_id,
    especialidade_id,
    valor
  } = data

  let porcentagem = await returnPorcentagemByEspecialidade({
    dentista_id,
    especialidade_id,
    clinica_id: orcamento.clinic_id
  })

  if (!porcentagem) {
    return
  }

  let configComissao = await comissaoConfig(dentista_id, orcamento.clinic_id)

  let status = configComissao.necessita_aprovacao ? 'aprovacao' : 'pendente'

  porcentagem = porcentagem['vista']

  let comissao = Number((valor * porcentagem) / 100)

  let clinica_id
  let orcamento_id
  let total

  clinica_id = orcamento.clinic_id
  orcamento_id = orcamento.id
  total = valor

  try {
    await Comissao.create({
      dentista_id,
      clinica_id,
      orcamento_id,
      paciente_id: orcamento.paciente_id,
      total,
      comissao,
      status,
      isComissao: false
    })
  } catch (error) {
    console.log(error)
  }
}

async function returnPorcentagemByEspecialidade(data) {
  try {
    const {
      especialidade_id,
      clinica_id,
      dentista_id
    } = data

    console.log(data)

    let porcentagem = await EspecialidadeDentista
      .query()
      .where('especialidade_id', especialidade_id)
      .andWhere('clinica_id', clinica_id)
      .andWhere('dentista_id', dentista_id)
      .first()

    return porcentagem.toJSON()
  } catch (error) {
    console.log(error)
  }
}

module.exports = Helpers