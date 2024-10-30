$(document).ready(function () {
    // Recuperar os produtos do localStorage
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Função para renderizar os produtos favoritos
    const renderizarFavoritos = () => {
        $('#produtos-favoritos').empty(); // Limpar a área de favoritos

        if (favoritos.length === 0) {
            $('#produtos-favoritos').append('<div>Nenhum produto favorito.</div>');
            return;
        }

        favoritos.forEach(favorito => {
            const produto = produtos.find(p => p.id === favorito);
            if (produto) {
                const produtoHTML = `
                    <div class="item-card">
                        <a data-id="${produto.id}" href="#" class="item">
                            <div class="img-container">
                                <img src="${produto.imagem}" alt="${produto.nome}">
                            </div>
                            <div class="nome-rating">
                                <span class="color-gray">${produto.nome}</span>
                                <span class="bold margin-right">
                                    <i class="mdi mdi-star favorito"></i>
                                </span>
                                <div class="price bold">${produto.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                            </div>
                        </a>
                    </div>
                `;
                $('#produtos-favoritos').append(produtoHTML); // Adicionar o produto ao DOM
            }
        });

        // Adicionar eventos aos links dos produtos
        $(".item").on('click', function () {
            var id = $(this).attr('data-id');
            localStorage.setItem('detalhe', id);
            app.views.main.router.navigate('/detalhes/');
        });
    };

    // Renderizar produtos favoritos ao carregar a página
    renderizarFavoritos();
});
