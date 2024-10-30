// Função para carregar os resultados da busca
function carregarResultados(produtos) {
    $('#search-results').empty(); // Limpa a área de resultados
    if (produtos.length === 0) {
        $('#search-results').append('<p>Nenhum produto encontrado.</p>');
    } else {
        produtos.forEach(produto => {
            var produtoHTML = `
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
            $("#search-results").append(produtoHTML);
        });
    }

    // Adiciona evento de clique nos itens
    $(".item").on('click', function () {
        var id = $(this).attr('data-id');
        localStorage.setItem('detalhe', id);
        app.views.main.router.navigate('/detalhes/');
    });
}

// Função para buscar produtos com base no termo
function buscarProdutos(termo) {
    var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    var produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(termo.toLowerCase()));
    carregarResultados(produtosFiltrados);
}

// Evento no campo de busca
$('#search').on('input', function () {
    var termo = $(this).val();
    buscarProdutos(termo);
});
