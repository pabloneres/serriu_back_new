const Helpers = {
  procedimentoHelper(procedimentos) {
    let dentes = []

    const procedimentosSerializados = procedimentos.map(item => { //serialiazedData
      if (item.dentes) {
        return {
          dente: item.dentes.map(dente => {
            return {
              procedimento_id: item.id,
              dentista_id: item.dentista_id,
              faces: JSON.stringify(dente.faces),
              // detalhes,
              status_pagamento: 'aguardando',
              // data_execucao: ,
              dente: dente.label,
              valor: item.valor
            }
          }),
        }
      }
    })

    procedimentosSerializados.forEach(item => {
      dentes.push(...item.dente)
    })


    const procedimentosGeraisSerializados = { //serialiazedDataGerais
      dente: procedimentos.map(item => {
        if (item.dentes.length === 0)
          return {
            // ...item,
            // procedimento_nome: item.label,
            // tabela_precos: item.nomeTabela,
            // valor: item.valor,
            // geral: true

            procedimento_id: item.id,
            dentista_id: item.dentista_id,
            // face: dente.faces,
            // detalhes,
            status_pagamento: 'aguardando',
            // data_execucao: ,
            // dente: dente.label,
            valor: item.valor
          }
      })
    }

    let procedimentosFiltrados = procedimentosGeraisSerializados.dente.filter(item => item != null)

    procedimentosFiltrados.forEach(item => {
      dentes.push(item)
    })

    return dentes
  },
  orcamentoHelper(orcamento) {
    orcamento = {
      paciente_id: Number(orcamento.paciente_id),
      status: orcamento.status,
      data_aprovacao: orcamento.data_aprovacao,
      clinic_id: orcamento.clinic_id
    }

    return orcamento
  },
  pagamentoHelper(pagamento) {
    pagamento = {
      condicao: pagamento.condicao.value,
      entrada: pagamento.entrada,
      parcelas: pagamento.parcelas
    }

    return pagamento
  }
}

module.exports = Helpers