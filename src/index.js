   async function atualizarCotacao() {
    try {
      let response = await fetch(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCBRL"
      );
      let data = await response.json();
      return parseFloat(data.price);
    } catch (error) {
      console.error("Erro ao buscar cotação:", error);
      return null;
    }
  }

  async function converter() {
    let real = parseFloat(
      document
        .getElementById("valorReal")
        .value.replace("R$", "")
        .replace(",", ".")
    );
    if (isNaN(real) || real <= 0) {
      alert("Digite um valor válido!");
      return;
    }

    let cotacao = await atualizarCotacao();
    if (!cotacao) {
      alert(
        "Erro ao obter a cotação do Bitcoin. Tente novamente mais tarde."
      );
      return;
    }

    let valorComDesconto = real * 0.9; // Aplica 10% de desconto
    let valorBitcoin = valorComDesconto / cotacao;
    let valorFormatado = `₿${valorBitcoin.toFixed(8)}`;
    document.getElementById("valorBitcoin").innerText = valorFormatado;
  }

  function formatarMoeda(event) {
    let valor = event.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    valor = (parseFloat(valor) / 100).toFixed(2); // Converte para número e mantém duas casas decimais

    // Formata com separadores de milhares e mantém a vírgula para os centavos
    let partes = valor.split(".");
    let parteInteira = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let parteDecimal = partes[1];

    event.target.value = `R$${parteInteira},${parteDecimal}`;
}


  function copiarBitcoin() {
    let texto = document.getElementById("valorBitcoin").innerText;
    navigator.clipboard
      .writeText(texto)
      .then(() => {
        alert("Valor copiado: " + texto);
      })
      .catch((err) => {
        console.error("Erro ao copiar:", err);
      });
  }

  ScrollReveal({ distance: '60px' });
  ScrollReveal().reveal('body', { origin: 'bottom' }, { duration: 1000 });
  ScrollReveal().reveal('body', { duration: 1000 });