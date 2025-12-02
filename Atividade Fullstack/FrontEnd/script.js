async function carregarConsultas() {
  const resposta = await fetch("dadosConsultas.txt");
  return await resposta.json();
}

async function listarConsultas() {
  const consultas = await carregarConsultas();
  const lista = document.getElementById("listaConsultas");

  consultas.forEach(function(consulta) {
    const item = document.createElement("li");

    item.textContent = consulta.paciente_nome + " - " + consulta.especialidade + " - " + consulta.data + " - " + consulta.status; lista.appendChild(item);
  });
}

async function buscarPorEspecialidade() {
  const consultas = await carregarConsultas();
  const esp = document.getElementById("buscaEspecialidade").value.toLowerCase();
  const resultado = document.getElementById("resultadoBusca");

  resultado.innerHTML = "";

  const filtradas = consultas.filter(function(consulta) {
    return consulta.especialidade.toLowerCase().includes(esp);
  });

  if (filtradas.length === 0) {
    resultado.innerHTML = "<p>Nenhuma consulta encontrada.</p>";
    return;
  }

  filtradas.forEach(function(consulta) {
    const item = document.createElement("p");

    item.textContent = consulta.paciente_nome + " - " + consulta.especialidade + " - " + consulta.data; resultado.appendChild(item);
  });
}

async function gerarRelatorios() {
  const consultas = await carregarConsultas();

  document.getElementById("totalConsultas").textContent = consultas.length;

  const porStatus = {};
  consultas.forEach(function(consulta) {
    porStatus[consulta.status] =
      (porStatus[consulta.status] || 0) + 1;
  });

  const listaStatus = document.getElementById("totalStatus");
  for (const status in porStatus) {
    const item = document.createElement("li");
    item.textContent = status + ": " + porStatus[status];
    listaStatus.appendChild(item);
  }

  const porEspecialidade = {};
  consultas.forEach(function(consulta) {
    porEspecialidade[consulta.especialidade] =
      (porEspecialidade[consulta.especialidade] || 0) + 1;
  });

  const listaEspecialidade = document.getElementById("totalEspecialidade");
  for (const esp in porEspecialidade) {
    const item = document.createElement("li");
    item.textContent = esp + ": " + porEspecialidade[esp];
    listaEspecialidade.appendChild(item);
  }
}
