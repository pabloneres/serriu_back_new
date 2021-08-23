const Helpers = {
  procedimentoHelperWithEspecialidade(procedimentos) {
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
              especialidade: item.especialidade,
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
            especialidade: item.especialidade,
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
  procedimentoHelper(procedimentos) {
    let dentes = []

    const procedimentosSerializados = procedimentos.map(item => { //serialiazedData
      if (item.dentes) {
        return {
          dente: item.dentes.map(dente => {
            return {
              especialidade_id: item.especialidade.id,
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
            especialidade_id: item.especialidade.id,
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
  },
  returnEspecialidadesBefore(procedimentos) {
    let arrEspecialidades = procedimentos.map((item) => ({
      id: item.especialidade.id,
      name: item.especialidade.name,
      valor: Number(item.valor),
      restante: Number(item.valor),
      valorAplicado: Number(),
    }))

    let valores = []

    arrEspecialidades.forEach((item) => {
      if (!valores.some((el, i) => el.id === item.id)) {
        valores.push(item);
      } else {
        var index = valores.findIndex(
          (current) => item.id === current.id
        );

        valores[index].valor = valores[index].valor + item.valor;
      }
    });

    const especi = valores.map((item) => ({
      ...item,
      restante: Number(item.valor),
    }))


    return especi
  },
  returnEspecialidades(orcamento) {
    let arrEspecialidades = orcamento.procedimentos.map((item) => ({
      id: item.procedimento.especialidade.id,
      name: item.procedimento.especialidade.name,
      valor: Number(item.desconto),
      restante: Number(item.desconto),
      valorAplicado: Number(),
    }))

    let valores = []

    arrEspecialidades.forEach((item) => {
      if (!valores.some((el, i) => el.id === item.id)) {
        valores.push(item);
      } else {
        var index = valores.findIndex(
          (current) => item.id === current.id
        );

        valores[index].valor = valores[index].valor + item.valor;
      }
    });

    const especi = valores.map((item) => ({
      ...item,
      restante: Number(item.valor),
    }))


    return especi
  },
  returnLabs(orcamento) {
    let labs = orcamento.procedimentos.filter(item => item.procedimento.lab)

    let arrLabs = labs.map((item) => ({
      id: item.procedimento.lab.id,
      name: item.procedimento.lab.name,
      valor: Number(item.procedimento.lab.valor),
    }))

    let valores = []

    arrLabs.forEach((item) => {
      if (!valores.some((el, i) => el.id === item.id)) {
        valores.push(item);
      } else {
        var index = valores.findIndex(
          (current) => item.id === current.id
        );

        valores[index].valor = valores[index].valor + item.valor;
      }
    });

    const especi = valores.map((item) => ({
      ...item,
      restante: Number(item.valor),
    }))


    return especi
  },
}

module.exports = Helpers