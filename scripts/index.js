//Pegar  botão
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide") //Quando clicar no 
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})