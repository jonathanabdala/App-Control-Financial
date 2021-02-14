// Objetos JS, com duas funções que tem funcionalidades
const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
       document.querySelector('.modal-overlay')
       .classList.add('active')
    },
    close(){
        // fechar o Modal
        // remover a class active do modal
        document.querySelector('.modal-overlay')
       .classList.remove('active')
    }
}
// Primeiro Objeto
const transactions = [
 {
    id: 1,
    description:'Luz',
    amount:-50000,
    date:'23/01/2021'
 },
 {
    id: 2,
    description:'Website',
    amount:500000,
    date:'23/01/2021'
 },
 {
    id: 3,
    description:'Internet',
    amount:-20000,
    date:'23/01/2021'
 },
 {
    id: 4,
    description:'APP',
    amount:20000,
    date:'23/01/2021'
 },
]


//Etapa
/*Preciso somar as entradas. Depois eu preciso somar as saídas e remover as entradas os valores das saídas */

const transaction = {
    incomes(){
        return "Cheguei"
    },
    expanses(){
        return "Aqui"
    },
    total(){
        return "Discover"
    }
}

// Substituir os Dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
            const tr = document.createElement('tr') 
            tr.innerHTML = DOM.innerHTMLTransaction(transaction)
            
            DOM.transactionsContainer.appendChild(tr)
        },
    
    innerHTMLTransaction(transaction)  {
        // Parte lógica - usando ternário, verificando se um dado é verdadeiro ou falso
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        // Receber a formatação
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
           <td class="description">${transaction.description}</td>
           <td class="${CSSclass}">${transaction.amount}</td>
           <td class="date">${transaction.date}</td>
                <td>
                    <img src="./assets/minus.svg" alt="Remover transação">
                </td> 
                `

                return html
    }

    updateBalance(){
    document
        .getElementById('incomeDisplay')
        .innerHTML = "Somas das entradas"
    document
        .getElementById('expenseDisplay')
        .innerHTML = "Somas das saídas"
    document
        .getElementById('totalDisplay')
        .innerHTML = "total"    
    }
}

const Utils = {
    // Formatação da moeda 
    formatCurrency(value){
        // Parte lógica - o valor da string sera um numero negativo ou não recebe nada.
        const signal = Number(value) < 0 ? " - " : ""
        // Expressões regulares 
        value = String(value).replace(/\D/g, "" )

        value = Number(value) / 100

        // Transformar o valor em Moeda
        value = value.toLocaleString("pt-BR" , {
            style: "currency", 
            currency: "BRL"
        
    })
    return signal + value
}

}


transactions.forcEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()