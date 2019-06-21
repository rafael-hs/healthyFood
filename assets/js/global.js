function trazerDados() {
    const dadoComida = '../assets/comida.json'
    axios(dadoComida).then(resp => {
        const itens = resp.data.reduce(
            (html, comida) => html + `<li class="item card"><img src="./assets${comida.src}">
            <span class="nome" style="visibility: hidden;">${comida.Nome}</span>
            <span class="idFood" style="visibility: hidden;">${comida.id}</span></li>`, ''
        )
        $('#comidas').html(itens)
    })
    axios(dadoComida).then(resp => {
        const pontos = resp.data.reduce(
            (html, ponto) => html + `
            <div class="divPonto"><span class="ponto" style="display: none;">${ponto.Pontos}</span> 
            <span class="nomePonto" style="visibility: hidden;">${ponto.Nome}</span></div>`, ''
        )
        $('#informacoes').html(pontos)
    })
}

function atualizarResultado() {
    let nomes = $('#prato').find('span')
    let nomesResultado = $('#resultado').find('.nomePonto')

    let divPonto = document.querySelectorAll('.divPonto')
    let soma;
    if (soma == undefined)
        soma = 0;

    for (let i = 0; i < nomes.length; i++) {
        for (let k = 0; k < nomesResultado.length; k++) {
            if (nomes[i].innerHTML.trim() === nomesResultado[k].innerHTML.trim()) {
                let pontos = parseInt(divPonto[k].firstChild.innerHTML)
                soma = soma + pontos
                $('#pontuacao').html(`<p class="texto">${soma}</p>`)
            }
        }
    }

    setTimeout(atualizarResultado, 1000)
}

function mostrarEmoji() {
    let ids = $('#prato').find('.idFood')

    let soma = 0;
    for (let i = 0; i < ids.length; i++) {
        let idsDiv = parseInt(ids[i].innerHTML.trim())
        soma = soma + idsDiv;
    }

    if (soma == 78)
        $('#emoji').html(`<img src="../assets/imgs/feliz.png" height="50px" width="50px">`)
    else if (soma == 143)
        $('#emoji').html(`<img src="../assets/imgs/feliz.png" height="50px" width="50px">`)
    else if (soma == 77)
        $('#emoji').html(`<img src="../assets/imgs/feliz.png" height="50px" width="50px">`)
    else if (soma == 101)
        $('#emoji').html(`<img src="../assets/imgs/triste.png" height="50px" width="50px">`)
    else if (soma == 142)
        $('#emoji').html(`<img src="../assets/imgs/triste.png" height="50px" width="50px">`)

    else {
        let itens = $('.prato li').length
        if (itens == 0)
            $('#emoji').html(``)
    }

    setTimeout(mostrarEmoji, 2000)

}

function moverObjetos() {
    $(function () {
        $('#comidas, #prato').sortable({
            connectWith: ".connectedSortable",
            revert: true
        }).disableSelection();
    })
    $('#comidas > item, #prato item').draggable({
        connectToSortable: '.connectedSortable',
    }).disableSelection()
}

function verificarSeExisteFilho() {
    let itens = $('.prato li').length
    if (itens == 0)
        $('#pontuacao').html(`<p class="texto">${0}</p>`)
    setTimeout(verificarSeExisteFilho, 2000)
}

function contatorDePontos() {
    const pontuacaoAtual = document.getElementById('pontuacao')
    let a = pontuacaoAtual.childNodes[0].innerText
    let pontAtual = parseInt(a)
    if (pontAtual <= 0)
        $('#estado').html(`<p class="texto">Ruim</p>`)
    else if (pontAtual > 0 && pontAtual < 2)
        $('#estado').html(`<p class="texto">Bom</p>`)
    else
        $('#estado').html(`<p class="texto">Ótimo</p>`)

    setTimeout(contatorDePontos, 2000)
}

function load() {
    trazerDados()
    atualizarResultado()
    verificarSeExisteFilho()
    mostrarEmoji()
    setInterval(() => {
        moverObjetos()
        contatorDePontos()
    }, 500)
}

load()