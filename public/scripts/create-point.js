/*document. 
    querySelector("select[name=uf]") //Procura o seletor "select" que tem o nome "uf"
    .addEventListener("change", () => { //Ouvidor de eventos, primeiro parametro "mudar" e chamo uma função "resumida", "arrow function"
        console.log("mudei")
    })*/

//Estados
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json() ) //Transformou os dados em json
        .then(states => { //Vai retornar os estados
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

//Cidades
function getCities(event) { //getCities é chamado toda vez que troco o uf (estado)
    const citySelect = document.querySelector("select[name=city]") //Pegar as cidades
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    //A seguir configuramos o link que irá aparecer
    const indexOfSelectedState = event.target.selectedIndex//Qual o numero do estado selecionado
    stateInput.value = event.target.options[indexOfSelectedState].text //O valor dele será atualizado com o event.target (que é o select) e vamos pegar todos os options que é um array de 0 a 26 estados/ Vamos precisar saber qual option esta selecioando para pegar o texto dele

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` //URL de mandeira dinamica, mudou o ufValue irá mudar o url

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"//Antes de fazer a chamada para cidades, limpamos "" o campo antes de gerar novas cidades ou troca o conteudo interno, mudando para o texto <option value>Selecione a cidade</option>
    citySelect.disabled = true //Irá bloquear o campo

    //Transformação dos dados:
    fetch(url)
        .then(res => res.json()) //Transformou os dados em json
        .then(cities => { //Vai retornar as cidades

            for (const city of cities) { //city: cidade de cada cities (cidades de cada estado)
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //Nessa lógica que adicionamos uma cidade nova
            }
            //Habilitar o select do campo "cidade":
            citySelect.disabled = false
        })
}

//Adicionamos um ouvidor de evento a apenas um elemento (uf)
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//ITENS DE COLETA
//Pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

//Estrutura de repetição
for (const item of itemsToCollect) { //Para cada um dos itens, vamos adicionar um ouvidor de evento (callback) quando for clicar
    item.addEventListener("click", handleSelectedItem)
}


//LÓGICA PARA GUARDAR OS ITENS SELECIONADOS PARA INFORMAR NO BANCO DE DADOS
const collectedItems = document.querySelector("input[name=items]") //Irá inicar vazio
let selectedItems = [] //Desse array vou tirar ou adicionar um item, ele começa vazio.

function handleSelectedItem(event) {
    const itemLi = event.target //salvo o target de cada li dentro de uma variavel

    //Add or remove uma classe com JavaScript
    //Se fosse adicionar: itemLi.classList.add("selected")
    //Se fosse remover: itemLi.classList.remove("selected")
    itemLi.classList.toggle("selected") //toggle faz adiciona ou remove. Explicação: Na lista de classe (classList) existe selected? Existe! Então irá remover. Não existe! Então irá adicionar //Resumindo, clica e desclica focus no elemento

    const itemId = itemLi.dataset.id//colocamos o dataset.id (para pegar os numeros de id dos itens) dentro de uma variável. Ou seja, quando clico, jogo o id dentro dessa variavel

    //console.log('ITEM ID: ', itemId)

    //Verificar se existem itens selecionados, se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => { //findIndex irá receber uma função curta
        const itemFound = item == itemId//Encontrei o item, se o item for igual ao itemId /return é sempre tru or false
        return itemFound
    })

    //Se já estiver selecionado:
    if (alreadySelected >= 0) {
        //tirar da seleção:
        const filteredItems = selectedItems.filter(item => {
            //Caso retorne false, irá adicionar em um novo array na constante filteredItems:
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems //Pego o valor dos itens selecionados e coloque o valor dos itens filtrados
    } else { //Se não estiver selecionado, adicionar à seleção:
        selectedItems.push(itemId)//Adicionar um elemento dentro de um array
    }
    //console.log('selectedItems', selectedItems)

    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems



}