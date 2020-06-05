/*document. 
    querySelector("select[name=uf]") //Procura o seletor "select" que tem o nome "uf"
    .addEventListener("change", () => { //Ouvidor de eventos, primeiro parametro "mudar" e chamo uma função "resumida", "arrow function"
        console.log("mudei")
    })*/

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //Transformou os dados em json
    .then( states => { //Vai retornar os estados
        for( const state of states ) { 
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }        
    })
}

populateUFs()

function getCities() {

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)