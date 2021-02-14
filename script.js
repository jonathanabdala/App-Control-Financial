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
// Criação do Array com seus Objetos
const transactions = [
 {
   
    description:'Luz',
    amount:-50000,
    date:'23/01/2021'
 },
 {
   
    description:'Website',
    amount:500000,
    date:'23/01/2021'
 },
 {
    
    description:'Internet',
    amount:-20000,
    date:'23/01/2021'
 },
 {
    
    description:'APP',
    amount:20000,
    date:'23/01/2021'
 },
]


//Etapa responsavel para efetuar os calculos matemáticos:
/*Preciso somar as entradas. Depois eu preciso somar as saídas e remover as entradas os valores das saídas */
const Transaction = {
    all : [
        {
          
           description:'Luz',
           amount:-50000,
           date:'23/01/2021'
        },
        {
          
           description:'Website',
           amount:500000,
           date:'23/01/2021'
        },
        {
           
           description:'Internet',
           amount:-20000,
           date:'23/01/2021'
        },
        {
           
           description:'APP',
           amount:20000,
           date:'23/01/2021'
        },
       ]
    // Refatoração
    // Crinado um atalho utilizando 'all' para transactions dentro de Transaction
    all: transactions,
       // Funcionalidade de Adcionar transações com o 'push' a uma lista 
    add(transaction){
          Transaction.all.push(transaction)

          App.reaload() 

        },
        // Funcionalidade de Remover trasações
    remove(index){
        // Metodo 'splice' tuilizado para esperar qual é a posição do Array
        // pegar cada index, é irformar a quantidade de elemento a ser deletado, neste caso somente um (1) elemento
        Transaction.all.splice(index, 1 )

        App.reaload()
    },

    incomes(){
        let income = 0;
        // Pegar todas as transações;
        // Para cada transação;
        Transaction.all.forEach(transaction => {
        // Verificar se a transação é maior que zero;
        if(transaction.amount > 0){
        // Se for maior que zero, somar a uma variavel e retornar a variavel
        income += transaction.amount;
        }
        })
        return income;
    },

    expanses(){
        let expanses = 0;
        // Pegar todas as transações;
        // Para cada transação;
        Transaction.all.forEach(transaction => {
        // Verificar se a transação é menor que zero;
        if(transaction.amount < 0){
        // Se for maior que zero, somar a uma variavel e retornar a variavel
        expanses += transaction.amount;
        }
        })
        return expanses;
    },

    total(){
       
        return Transaction.incomes() + Transaction.expanses();
    },
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
    },
    // Etapa responsavel pelo visual da DOM.
    updateBalance(){
    document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
        .getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expanses())
    document
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())  
    },
    // Função responsavel por limpar a tbody 
    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    },
}

// Criação dos formulários
const Form = {
    submit(event){
        // Função para não realizar o comportamento padrão de enviar o formulário com as informações na URL
        event.preventDefault()

        // Verificar se todas as informações foram preenchidas
        // Formatar os dados para salvar
        // Salvar
        // Apagar os dados do formulário
        // Modal vai fechar
        // Atualizar a aplicação
    }
}

// Etapa 'Util' responsavel pela formação do moeda 
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
},

}
// Refatoranção para realizar o fluxo da aplicação
// Funciinalidade que vai realizar a releitura das coisas
cont App = {
    init(){

    },
    reload(){

    },
}


const App = {
    init(){

// Etapa das execuções da aplicação:
Transaction.all.forcEach(transaction => {
    DOM.addTransaction(transaction)
    // Adiciona as transações que já existem na tela
})


DOM.updateBalance()


  },
  reload(){
    //   Ao entrar na DOM sera limpo
    DOM.clearTransactions()  
    // Retonara para as Transaction e Popular tudo novamente
    App.init()
  },
}
 App.init()

