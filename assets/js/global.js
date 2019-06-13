function trazerDados() {
    const dadoComida = '../assets/comida.json'
    axios(dadoComida).then(resp => {
        const itens = resp.data.reduce(
            (html, comida) => html + `<li class="item card"><img src="./assets${comida.src}"></li>`, ''
        )
        $('#comidas').html(itens)
    })
    const dadoPrato = '../assets/prato.json'
    axios(dadoPrato).then(resp => {
        const itens = resp.data.reduce(
            (html, prato) => html + `<li class="item card"><img src="./assets${prato.src}"></li>`, ''
        )
        $('#prato').html(itens)
    })
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
        // revert: 'invalid'
    }).disableSelection()
}

trazerDados()
setInterval(() => {
 moverObjetos()
}, 500)