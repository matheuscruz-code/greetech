// Carregar os produtos do arquivo JSON
fetch('js/backend.json')
  .then(response => response.json())
  .then(data => {
    // SALVAR OS DADOS VINDOS DO BACK-END LOCALMENTE
    localStorage.setItem('produtos', JSON.stringify(data));
    console.log('Dados dos produtos salvos no localStorage');

    // Função para renderizar os produtos filtrados
    const renderizarProdutos = (produtos) => {
      // ESVAZIAR A ÁREA DE PRODUTOS
      $('#produtos').empty();

      produtos.forEach(produto => {
        var produtosHTML = `
          <!--Item card-->
          <div class="item-card">
            <a data-id="${produto.id}" href="#" class="item">
              <div class="img-container">
                <img src="${produto.imagem}" alt="${produto.nome}">
              </div>
              <div class="nome-rating">
                <span class="color-gray">${produto.nome}</span>
                <span class="bold margin-right">
                  <i class="mdi mdi-star"></i>
                  ${produto.rating}
                </span>
                <div class="price bold">${produto.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
              </div>
            </a>
          </div>
        `;
        $("#produtos").append(produtosHTML);
      });

      // Adicionar eventos aos links dos produtos
      $(".item").on('click', function () {
        var id = $(this).attr('data-id');
        localStorage.setItem('detalhe', id);
        app.views.main.router.navigate('/detalhes/');
      });
    };

    // Renderizar todos os produtos inicialmente
    renderizarProdutos(data);

    // Função de filtro ao pesquisar
    $('#search').on('input', function () {
      const termoPesquisa = $(this).val().toLowerCase();

      const produtosFiltrados = data.filter(produto => 
        produto.nome.toLowerCase().includes(termoPesquisa) ||
        produto.descricao.toLowerCase().includes(termoPesquisa)
      );

      renderizarProdutos(produtosFiltrados);
    });

  })
  .catch(error => console.error('Erro ao fazer fetch dos dados: ' + error));

// VER QUANTOS ITENS TEM NO CARRINHO
setTimeout(() => {
  var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Alimentar o contador da sacola
  $('.btn-cart').attr('data-count', carrinho.length);

}, 300);
