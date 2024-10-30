var localCarrinho = localStorage.getItem('carrinho');

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho);
    if(carrinho.length >0){
        //TEM ITENS NO CARRINHO
        //RENDERIZAR O CARRINHO
        renderizarCarrinho();
        //SOMAR TOTAIS DE PRODUTOS 
        calcularTotal();
    } else{
        //MOSTRAR CARRINHO VAZIO
        carrinhoVazio();
    }
   
} else {
    //MOSTRAR O CARRINHO VAZIO 
    carrinhoVazio();
} 

function renderizarCarrinho(){
    $("#listaCarrinho").empty();

    //PERCORRER O NOSSO CARRINHO E ALIMENTAR A ÁREA
    $.each(carrinho, function(index, itemCarrinho){
        var itemDiv = `
        <!--ITEM DO CARRINHO-->
            <div class="item-carrinho" data-index="${index}">
                <div class="area-img">
                    <img src="${itemCarrinho.item.imagem}">
                </div>
                <div class="area-detalhes">
                    <div class="sup">
                        <span class="name-prod">
                            ${itemCarrinho.item.nome} <!-- Corrigi aqui -->
                        </span>
                        <a class="delet-item" href="#"><i class="mdi mdi-close"></i></a>
                    </div>
                    <div class="meio">
                        <span>${itemCarrinho.item.principal_caracteristica} <!-- Corrigi aqui também -->
                        </span>
                    </div>
                    <div class="preco-quantidade">
                        <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        <div class="count">
                            <a class="menos" data-index="${index}" href="#">-</a>
                            <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}"> <!-- Corrigi a quantidade -->
                            <a class="mais" data-index="${index}" href="#">+</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('#listaCarrinho').append(itemDiv);
    });
}

function calcularTotal(){
    var totalCarrinho = 0;
    $.each(carrinho, function (index, itemCarrinho){
        totalCarrinho += itemCarrinho.total_item;
    });
    //MOSTRAR O TOTAL
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}



function carrinhoVazio() {
    console.log('Carrinho está vazio');
    //ESVAZIAR LISTA DO CARRINHO
    $("#listaCarrinho").empty();

    //SUMIR OS ITENS DE BAIXO, BOTÃO E TOTAIS
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');

    // MOSTRAR A SACOLA VAZIA
    $("#listaCarrinho").html(`
        <div class="text-align-center">
            <img width="300" src="img/empty.gif">
            <br><span class="color-gray">Nada por enquanto...</span>
        </div>
    `);
}

// Usar o ID correto para o botão "esvaziar"
$("#esvaziar").on('click', function() {
    // Usar o dialog do Framework7 corretamente
    app.dialog.confirm('Tem certeza que quer esvaziar o carrinho?', '<strong>ESVAZIAR</strong>', function() {
        // Apagar o localStorage do carrinho
        localStorage.removeItem('carrinho');
        
        // Recarregar a página para atualizar o carrinho
        app.views.main.router.refreshPage();
    });
});

$("#listaCarrinho").on('click', '.delet-item', function(){
    var itemClicado = $(this); // Salva o botão clicado
    
    // CONFIRMAR
    app.dialog.confirm('Tem certeza que deseja remover este item?', 'Remover', function(){
        // Use 'itemClicado' para encontrar o item correto
        var index = itemClicado.closest('.item-carrinho').data('index');
        
        // REMOVER O ITEM DO CARRINHO
        carrinho.splice(index, 1);
        
        // ATUALIZAR O CARRINHO COM ITEM REMOVIDO
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        // ATUALIZAR A PÁGINA
        app.views.main.router.refreshPage();
    });
});

// Delegação de eventos para o botão "menos"
$("#listaCarrinho").on('click', '.menos', function(){
    var index = $(this).data('index');
    console.log('O índice é:', index);

    if(carrinho[index].quantidade > 1){
        carrinho[index].quantidade--;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Corrigido aqui
        app.views.main.router.refreshPage();
    } else {
        var itemName = carrinho[index].item.nome;
        app.dialog.confirm(`Gostaria de remover <strong>${itemName}</strong>?`, 'REMOVER', function(){
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Certifique-se de atualizar o localStorage
            app.views.main.router.refreshPage();
        });
    }
});

// Delegação de eventos para o botão "mais"
$("#listaCarrinho").on('click', '.mais', function(){
    var index = $(this).data('index');
    console.log('O índice é:', index);

    carrinho[index].quantidade++;
    carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Corrigido aqui
    app.views.main.router.refreshPage();
});


