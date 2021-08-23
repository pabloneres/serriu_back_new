const NegociacaoBoleto = use('App/Models/NegociacaoBoleto')

const Helper = {
  async boleto(data) {
    const {
      negociacao_id,
      parcelas,
      vencimento,
      entrada
    } = data

    await NegociacaoBoleto.create({
      negociacao_id,
      parcelas,
      vencimento,
      entrada
    })

    return

  }
}

module.exports = Helper