
const carrinho = [];

const listaItens = document.getElementById("itens-carrinho");
const totalElemento = document.getElementById("total");
const quantidadeElemento = document.getElementById("quantidade");

const formatarPreco = (valor) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

function atualizarCarrinho() {
  listaItens.innerHTML = "";

  if (carrinho.length === 0) {
    listaItens.innerHTML =
      '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
  }

  carrinho.forEach((item, indice) => {
    const linha = document.createElement("div");
    linha.className = "item-carrinho";

    const nome = document.createElement("span");
    nome.textContent = `${item.nome} × ${item.quantidade}`;

    const subtotal = document.createElement("strong");
    subtotal.textContent = formatarPreco(
      item.preco * item.quantidade
    );

    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "botao remover";
    remover.textContent = "Remover";
    remover.addEventListener("click", () => {
      carrinho.splice(indice, 1);
      atualizarCarrinho();
    });

    linha.append(nome, subtotal, remover);
    listaItens.appendChild(linha);
  });

  const quantidadeTotal = carrinho.reduce(
    (soma, item) => soma + item.quantidade,
    0
  );

  const valorTotal = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  quantidadeElemento.textContent =
    `(${quantidadeTotal} ${quantidadeTotal === 1 ? "item" : "itens"})`;

  totalElemento.textContent = formatarPreco(valorTotal);
}

document.querySelectorAll(".adicionar").forEach((botao) => {
  botao.addEventListener("click", () => {
    const nome = botao.dataset.nome;
    const preco = Number(botao.dataset.preco);

    const itemExistente = carrinho.find(
      (item) => item.nome === nome
    );

    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({
        nome,
        preco,
        quantidade: 1
      });
    }

    atualizarCarrinho();

    botao.textContent = "✓ Adicionado!";
    setTimeout(() => {
      botao.textContent = "+ Adicionar";
    }, 900);
  });
});

document.getElementById("whatsapp").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Adicione pelo menos um lanche ao carrinho!");
    return;
  }

  const linhas = carrinho.map((item) =>
    `${item.quantidade}x ${item.nome} — ${formatarPreco(item.preco * item.quantidade)}`
  );

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  const mensagem = [
    "Olá! Gostaria de fazer este pedido:",
    "",
    ...linhas,
    "",
    `Total demonstrativo: ${formatarPreco(total)}`,
    "",
    "Pedido gerado por uma demonstração da Black Tech. Confirmar disponibilidade e valores com o estabelecimento."
  ].join("\n");

  // Número de teste: substituiremos após autorização da hamburgueria.
  const telefone = "";
  
  if (!telefone) {
    alert(
      "Demonstração: o carrinho está funcionando! " +
      "O WhatsApp será ativado após autorização do estabelecimento."
    );
    return;
  }

  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

document.getElementById("pagamento").addEventListener("click", () => {
  alert(
    "Pagamento apenas demonstrativo. " +
    "Nenhuma cobrança será feita. " +
    "A integração será configurada após autorização do estabelecimento."
  );
});

atualizarCarrinho();

