async function atualizarCotacao(moeda) {
  try {
      let symbol = moeda === "USD" ? "BTCUSDT" : "BTCBRL";
      let response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
      let data = await response.json();
      return parseFloat(data.price);
  } catch (error) {
      console.error("Erro ao buscar cotação:", error);
      return null;
  }
}

async function converter() {
  let moedaSelecionada = document.getElementById("moeda").value;
  let valorFormatado = document.getElementById("valorMoeda").value;
  
  let valorNumerico = parseFloat(valorFormatado.replace(/[^0-9,]/g, "").replace(",", "."));
  
  if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Digite um valor válido!");
      return;
  }

  let cotacao = await atualizarCotacao(moedaSelecionada);
  if (!cotacao) {
      alert("Erro ao obter a cotação do Bitcoin. Tente novamente mais tarde.");
      return;
  }

  let valorComDesconto = valorNumerico * 0.9;
  let valorBitcoin = valorComDesconto / cotacao;
  document.getElementById("valorBitcoin").innerText = `₿${valorBitcoin.toFixed(8)}`;
}

function formatarMoeda(event) {
  let valor = event.target.value.replace(/\D/g, "");
  valor = (parseFloat(valor) / 100).toFixed(2);
  let partes = valor.split(".");
  let parteInteira = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let parteDecimal = partes[1];
  event.target.value = `${parteInteira},${parteDecimal}`;
}

function copiarBitcoin() {
  let texto = document.getElementById("valorBitcoin").innerText;
  navigator.clipboard.writeText(texto).then(() => {
      alert("Valor copiado: " + texto);
  }).catch((err) => {
      console.error("Erro ao copiar:", err);
  });
}

function atualizarPlaceholder() {
  let moedaSelecionada = document.getElementById("moeda").value;
  let input = document.getElementById("valorMoeda");
  input.placeholder = moedaSelecionada === "USD" ? "0.00" : "0,00";
}

