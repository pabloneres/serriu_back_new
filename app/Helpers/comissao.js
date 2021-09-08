const Comissao = use('App/Models/Comissao')
const LabsService = use('App/Models/LaboratorioServico')
const Orcamento = use('App/Models/Orcamento')
const EspecialidadeDentista = use('App/Models/EspecialidadeDentista')
const FormaPagamento = use('App/Models/FormaPagamento')
const ComissaoConfig = use('App/Models/ComissaoConfig')
const ClinicConfig = use('App/Models/ClinicConfig')
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')
const EspecialidadeExecucao = use('App/Models/EspecialidadeExecucao')
const EspecialidadeHelper = use('App/Helpers/especialidade')


const comissao = {
  async executadoProcedimento(data) {
    const {
      procedimento,
      orcamento,
      isBoleto,
      formaPagamento
    } = data

    let especialidade = await EspecialidadeExecucao.query() //busca a especialidade
      .where('especialidade_id', procedimento.especialidade_id)
      .andWhere('orcamento_id', orcamento.id)
      .first()
    especialidade = especialidade.toJSON()  //busca a especialidade do procedimento


    let config = await comissaoConfig(especialidade.titular, orcamento.clinic_id) //configuração do dentista
    let clinicConfig = await EspecialidadeHelper.clinicConfig(orcamento.clinic_id) //configuração da clinica

    if (!config || !config.recebe_comissao) {
      if (!isBoleto) { // se o dentista recebe por orcamento
        return
      }
      return
    } // se nao houver configuração ou o dentista nao receber comissão ele para a função

    if (config.forma_recebimento === 'orcamento') {
      await this.pagamentoRecebido({
        especialidade,
        procedimento,
        orcamento,
        config,
        clinicConfig,
        formaPagamento
      })
      return
    }


    let status = config.necessita_aprovacao ? 'aprovacao' : 'pendente' // status para aprovação da comissao

    if (formaPagamento === 'boleto') {
      if (clinicConfig.comissao_boleto === 'concluido') {
        status = 'boleto'
        // verificar quantos orcamentos tem pendentes 
        // se não for sobrar nenhum alterar o status de todas as comissões para pendente
        let countComissoes = await CountComissoesByEspecialidade(orcamento.id, procedimento.especialidade_id)
        let countProcedimentos = await CountProcedimentossByEspecialidade(orcamento.id, procedimento.especialidade_id)

        console.log(countComissoes)
        console.log(countProcedimentos)

        if (countProcedimentos == countComissoes) {
          status = config.necessita_aprovacao ? 'aprovacao' : 'pendente'

          await Comissao.query()
            .where('orcamento_id', orcamento.id).update({
              status: config.necessita_aprovacao ? 'aprovacao' : 'pendente'
            })
        }
      }
      if (clinicConfig.comissao_boleto === 'orcamento') {
        status = 'orcamento'
        // cria as comissoes com o status 'orcamento'
        // esse status não exibe nos orcaçemtos porque o dentista recebe a entrada e as parcelas
      }
    }


    let porcentagem = await returnPorcentagemByEspecialidade({
      especialidade_id: procedimento.especialidade_id,
      clinica_id: orcamento.clinic_id,
      dentista_id: especialidade.titular
    })

    if (!porcentagem) {
      return
    }

    console.log(porcentagem)

    let labValue
    let comissao

    if (procedimento.procedimento.labsService) {
      labValue = await verifylab(procedimento.procedimento.labsService)
      comissao = await comissaoValor(orcamento.id, procedimento.desconto, labValue, porcentagem, formaPagamento)
    } else {
      comissao = await comissaoValor(orcamento.id, procedimento.desconto, 0, porcentagem, formaPagamento)
    }

    console.log(comissao)

    if (comissao === 0) {
      if (!clinicConfig.comissoes_zeradas) {
        return
      }
    }

    let dentista_id = especialidade.titular
    let clinica_id = orcamento.clinic_id
    let orcamento_id = procedimento.orcamento_id
    let procedimento_id = procedimento.id
    let dente = procedimento.dente
    let total = procedimento.desconto

    try {
      await Comissao.create({
        dentista_id,
        clinica_id,
        orcamento_id,
        procedimento_id,
        paciente_id: orcamento.paciente_id,
        dente,
        total,
        lab: labValue,
        comissao,
        status,
      })
    } catch (error) {
      console.log(error)
    }

    // console.log(orcamento)
    // console.log(porcentagem)
    // console.log(labValue)
    // console.log(comissao)
  },
  async pagamentoRecebido(data) {
    const {
      especialidade,
      procedimento,
      orcamento,
      config,
      clinicConfig,
      formaPagamento
    } = data

    if (especialidade.saldoComissao === 0) {
      return
    }

    if (!config || !config.recebe_comissao || config.recebe_comissao === 'procedimento') {
      return
    }

    let status = config.necessita_aprovacao ? 'aprovacao' : 'pendente'

    let porcentagem = await returnPorcentagemByEspecialidade({
      especialidade_id: procedimento.especialidade_id,
      clinica_id: orcamento.clinic_id,
      dentista_id: especialidade.titular
    })

    let comissao

    comissao = await comissaoValor(orcamento.id, especialidade.saldoComissao, 0, porcentagem, formaPagamento)

    console.log(comissao)

    try {
      await Comissao.create({
        dentista_id: especialidade.titular,
        clinica_id: orcamento.clinic_id,
        orcamento_id: orcamento.id,
        paciente_id: orcamento.paciente_id,
        total: especialidade.saldoComissao,
        lab: 0,
        comissao,
        status,
      })

      await EspecialidadeExecucao.query() //busca a especialidade
        .where('especialidade_id', procedimento.especialidade_id)
        .andWhere('orcamento_id', orcamento.id)
        .update({
          saldoComissao: 0
        })

    } catch (error) {
      console.log(error)
    }
    // orcamento_id
    // procedimento_id
    // especialidade_id
    // formaPagamento
    // status
    // valor
    // desconto
  },
  async comissaoAvaliador(orcamento, procedimento, boleto = false) {
    let configComissao = await ComissaoConfig.query()
      .where('dentista_id', orcamento.avaliador)
      .andWhere('clinica_id', orcamento.clinic_id)
      .first()
    configComissao = configComissao.toJSON()

    let formaPagamento = await FormaPagamento
      .query()
      .where('orcamento_id', orcamento.id).first()
    formaPagamento = formaPagamento.toJSON()

    let status = configComissao.necessita_aprovacao ? 'aprovacao' : 'pendente'

    if (configComissao.funcao === 'executor') {
      return
    }

    let condicao = formaPagamento.condicao === 'boleto' ? 'boleto' : 'vista'

    let porcentagem = configComissao[condicao]

    let labValue
    let comissao

    if (!boleto) {
      if (procedimento.procedimento.labsService) {
        labValue = await verifylab(procedimento.procedimento.labsService)
        comissao = await returnCalc(procedimento.desconto, labValue, porcentagem)
      } else {
        comissao = await returnCalc(procedimento.desconto, 0, porcentagem)
      }
    } else {
      let labValue
      let comissao
    }

    let dentista_id
    let clinica_id
    let orcamento_id
    let dente
    let total

    if (!boleto) {
      dentista_id = orcamento.avaliador
      clinica_id = orcamento.clinic_id
      orcamento_id = orcamento.id
      procedimento_id = procedimento.id
      dente = procedimento.dente
      total = procedimento.desconto
    } else {
      dentista_id = orcamento.avaliador
      clinica_id = orcamento.clinic_id
      orcamento_id = orcamento.id
      total = orcamento.valorDesconto
    }

    try {
      await Comissao.create({
        dentista_id,
        clinica_id,
        orcamento_id,
        procedimento_id,
        paciente_id: orcamento.paciente_id,
        dente,
        total,
        lab: labValue,
        comissao,
        status,
        avaliacao: true
      })
    } catch (error) {
      console.log(error)
    }


  },
  async comissaoAvaliadorTotal(data) {
    console.log(data)

    let {
      orcamento,
      valorDigitado,
      lab,
      boleto,
    } = data

    lab = lab ? lab : 0

    let configComissao = await ComissaoConfig.query()
      .where('dentista_id', orcamento.avaliador)
      .andWhere('clinica_id', orcamento.clinic_id)
      .first()
    configComissao = configComissao.toJSON()

    let status = configComissao.necessita_aprovacao ? 'aprovacao' : 'pendente'

    if (configComissao.funcao === 'executor') {
      return
    }

    let condicao = boleto ? 'boleto' : 'vista'

    let porcentagem = configComissao[condicao]

    let comissao = Number(((Number(valorDigitado) - lab) * porcentagem) / 100)
    console.log(Number(valorDigitado))
    console.log(porcentagem)
    console.log(comissao)

    let dentista_id
    let clinica_id
    let orcamento_id
    let dente
    let total

    dentista_id = orcamento.avaliador
    clinica_id = orcamento.clinic_id
    orcamento_id = orcamento.id
    total = Number(valorDigitado)

    try {
      await Comissao.create({
        dentista_id,
        clinica_id,
        orcamento_id,
        paciente_id: orcamento.paciente_id,
        total,
        comissao,
        lab,
        status,
        isComissao: true
      })
    } catch (error) {
      console.log(error)
    }
  },
  async comissaoBoletoOrcamento(orcamento, dentista_id, valor, labValue = 0) {
    let configComissao = await ComissaoConfig.query()
      .where('dentista_id', dentista_id)
      .andWhere('clinica_id', orcamento.clinic_id)
      .first()
    configComissao = configComissao.toJSON()


    let formaPagamento = await FormaPagamento
      .query()
      .where('orcamento_id', orcamento.id).first()
    formaPagamento = formaPagamento.toJSON()

    let status = configComissao.necessita_aprovacao ? 'aprovacao' : 'pendente'

    let condicao = formaPagamento.condicao === 'boleto' ? 'boleto' : 'vista'

    let porcentagem = configComissao[condicao]

    let comissao = Number(((valor - labValue) * porcentagem) / 100)

    let clinica_id
    let orcamento_id
    let dente
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
        lab: labValue,
        status,
        avaliacao: true
      })
    } catch (error) {
      console.log(error)
    }
  },
  async comissaoTotal(data) {
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
        avaliacao: false
      })
    } catch (error) {
      console.log(error)
    }
  }
}

async function comissaoConfig(dentista_id, clinica_id) {
  try {
    let config = await ComissaoConfig
      .query()
      .where('dentista_id', dentista_id)
      .andWhere('clinica_id', clinica_id).first()
    return config.toJSON()
  } catch (error) {
    console.log(error)
  }
}
async function returnPorcentagem(especialidade_id, clinica_id) {
  try {
    let porcentagem = await EspecialidadeDentista
      .query()
      .where('especialidade_id', especialidade_id)
      .andWhere('clinica_id', clinica_id).first()

    return porcentagem.toJSON()
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
async function returnOrcamento(id) {
  try {
    let orcamento = await Orcamento
      .query()
      .where('id', id).first()

    orcamento = orcamento.toJSON()
    return orcamento
  } catch (error) {

  }
}
async function comissaoValor(orcamento_id, procedimentoValue, labValue, porcentagem, formaPagamento) {
  try {
    if (formaPagamento === 'boleto') {
      return returnCalc(procedimentoValue, labValue, porcentagem.boleto)
    }

    return returnCalc(procedimentoValue, labValue, porcentagem.vista)
  } catch (error) {

  }
}
function returnCalc(procedimentoValue, labValue, porcentagem) {
  let subs = Number(procedimentoValue) - Number(labValue)

  return Number((subs * porcentagem) / 100)
}
async function verifylab(id) {
  try {
    let labsService = await LabsService.query().where('id', id).first()
    labsService = labsService.toJSON()
    if (labsService) {
      return labsService.valor
    }
    return 0
  } catch (error) {
    console.log
  }
}

async function CountComissoesByEspecialidade(orcamento_id, especialidade_id) {
  try {
    const count = await Comissao.query()
      .where('orcamento_id', orcamento_id)
      .with('procedimento', builder => {
        builder.where('especialidade_id', especialidade_id)
      })
      .getCount()
    console.log(count)
    return count
  } catch (error) {
    console.log(error)
  }
}
async function CountProcedimentossByEspecialidade(orcamento_id, especialidade_id) {
  try {
    const count = await ProcedimentoExecucao.query()
      .where('orcamento_id', orcamento_id)
      .andWhere('especialidade_id', especialidade_id)
      .getCount()
    console.log(count)
    return count
  } catch (error) {
    console.log(error)
  }
}

module.exports = comissao