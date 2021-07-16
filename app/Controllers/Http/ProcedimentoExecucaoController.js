'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with procedimentoexecucaos
 */
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')
const User = use('App/Models/User')
const Orcamento = use('App/Models/Orcamento')
const DepartmentClinc = use('App/Models/DepartmentClinc')
const SaldoEspecialidade = use('App/Models/SaldoEspecialidade')
const Database = use('Database')

class ProcedimentoExecucaoController {
  async index({ request, response, view }) {
    const { status, paciente_id } = request.get()

    const procedimentos = await Orcamento.query()
      .where('paciente_id', paciente_id)
      .with('procedimentos', builder => {
        builder
          .with('dentista', builder => {
            builder.select('id', 'firstName', 'lastName')
          })
          .with('procedimento.especialidade', builder => {
            builder.select('id', 'name')
          })
          .orderBy('id', 'cres')
      })
      .with('pagamento')
      .with('pagamentos.especialidades')
      .with('saldoEspecialidade')
      .with('boletos')
      .orderBy('id', 'desc')
      .fetch()

    // .with('procedimentos', builder => {
    //   builder
    //     .with('dentista', builder => {
    //       builder.select('id', 'firstName', 'lastName')
    //     })
    //     .with('procedimento.especialidade', builder => {
    //       builder.select('id', 'name')
    //     })
    //     .orderBy('id', 'cres')
    // })
    // .with('pagamento')
    // .with('pagamentos.especialidades')

    return procedimentos
  }

  async create({ request, response, view }) {
  }

  async store({ request, response }) {
    // return request.all()
    const data = request.all()

    const user = await User.findBy('code', data.passwordCode)

    if (!user) {
      response.status(401).send({ message: 'Acesso negado' })
    }

    const orcamento = await Orcamento.findBy('id', data.orcamento_id)

    const diff = data.valor - Number(data.valorTotal)
    const porcentagem = ((diff * 100) / data.valor).toFixed(1)

    const department = await user.department().first()

    const descontoPermitido = await DepartmentClinc
      .query()
      .where('clinic_id', orcamento.clinic_id)
      .andWhere('department_id', department.id).first()

    const permitido = descontoPermitido.discount >= porcentagem

    if (!permitido) {
      response.status(401).send({ message: 'Desconto não autorizado' })
      return
    }

    await Orcamento.query().where('id', orcamento.id).update({
      restante: orcamento.restante - diff,
      valorDesconto: orcamento.valorDesconto - diff
    })

    const procedimento = await ProcedimentoExecucao.query().where('id', data.id).update({
      desconto: Number(data.valorTotal)
    })

    return procedimento

  }

  async show({ params, request, response, view }) {
  }

  async edit({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
    const trx = await Database.beginTransaction();
    const data = request.all()

    const orcamento = await Orcamento.findBy('id', data.orcamento_id)

    let procedimento = await ProcedimentoExecucao.query()
      .where('id', data.procedimento_id)
      .with('procedimento.especialidade')
      .first()

    procedimento = procedimento.toJSON()

    let sobra = Number(orcamento.saldo) - Number(procedimento.desconto)

    await ProcedimentoExecucao.query().where('id', procedimento.id).update({
      status_execucao: 'executado',
      detalhes: data.detalhes
    }, trx)

    const saldo = await SaldoEspecialidade
      .query()
      .where('orcamento_id', data.orcamento_id)
      .andWhere('especialidade_id', procedimento.procedimento.especialidade_id).first()

    if (!saldo) {
      await SaldoEspecialidade.create({
        orcamento_id: data.orcamento_id,
        especialidade_id: procedimento.procedimento.especialidade_id,
        saldo: 0 - procedimento.desconto,
      }, trx)
    } else {
      await SaldoEspecialidade.query()
        .where('id', saldo.id)
        .update({
          saldo: saldo.saldo - procedimento.desconto
        })

    }

    await Orcamento.query().where('id', orcamento.id).update({
      saldo: sobra
    }, trx)

    // const [{ "count(*)": totalExecutado }] = await Database.table('procedimentos_orcamentos').count('*').where('orcamento_id', id).andWhere('status', 'executado')

    // if(totalAberto === 0) {
    //   await Orcamento.query().where('id', id).update({
    //     status: 'finalizado'
    //   }, trx)

    //   await ComissaoDentista.query().where('orcamento_id', orcamento.id).update({
    //     status_comissao: 'pagar'
    //   })
    // }

    trx.commit()
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = ProcedimentoExecucaoController
