// Objetos JavaScript, com duas funções que tem funcionalidades
const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
       document.querySelector('.modal-overlay')
       .classList.
       add('active')
    },
    close(){
        // fechar o Modal
        // remover a class active do modal
        document.querySelector('.modal-overlay')
       .classList
       .remove('active')
    },
}
// Local para guardar 
const Storage = {
    // Pegar as informações
    get () {
        // O parse transforma string para array ou devolve este array vazio neste get
        return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
    },
    // Guardar as informações 
    set(transactions) {
        // Transformar um Array em uma String usando um objeto chamado JSON com a funcionalidade stringify
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

//Etapa responsavel para efetuar os calculos matemáticos:
/*Preciso somar as entradas. Depois eu preciso somar as saídas e remover as entradas os valores das saídas */
const Transaction = {
    all : Storage.get(),
    
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
        expanse += transaction.amount;
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
            tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
            tr.dataset.index = index
            
            DOM.transactionsContainer.appendChild(tr)
     },
    
    innerHTMLTransaction(transaction, index)  {
        // Parte lógica - usando ternário, verificando se um dado é verdadeiro ou falso
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        // Receber a formatação
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
           <td class="description">${transaction.description}</td>
           <td class="${CSSclass}">${transaction.amount}</td>
           <td class="date">${transaction.date}</td>
                <td>
                // 
                    <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
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

// Etapa 'Util' responsavel pela formação do moeda 
const Utils = {
    formatAmount(value){
       
        value = value * 100
        //  Math.round arredonda o numero
        return Math.round(value) 
    },

    formateDate(date){
        // Formatando a separação de ano, mês e dia  por "-" o Array utilizando o splittedDate
        const splittedDate = date.split("-")
        // Separando as strings utilizando o Template literals (Template strings) 
        return`${splittedDate[2]}/${splittedDate[1]}${splittedDate[0]}`

    },
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

// Criação dos formulários

const Form = {
    // Fazendo um link entre JavaScript e HTML. Pegar o elemento inteiro do HTML e guardar no Form, para a validação.
    description:document.querySelector('input#description'),
    amount:document.querySelector('input#amount'),
    date:document.querySelector('input#date'),

    // Pegar cada  valor e deixar guardado na funtção getValues.
    getValues(){
        // Retornar um objeto que contenha:
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateFields() {
        // Obter todos os valores:
        const { description, amount, date } = Form.getValues()

        // Lógica que vrifica se description, amount ou date estão vazios ou não
        if( description.trim()=== " " ||
            amount.trim()===" " ||
            date.trim()===""){
                throw new Error("Por favor, preencha todos os campos")
            }
    },

    formatValues(){
        let {description, amount, date} = Form.getValues()
        
        amount = Utils.formatAmount(amount)

        date =  Utils.formateDate(date)

        return {
            description,
            amount,
            date
        }
    },

    clearFields(){
            // Limpando os campos
            Form.description.value = ""
            Form.amount.value = ""
            Form.date.value = ""
    }  
 },
submit(event){
        // Função para não realizar o comportamento padrão de enviar o formulário com as informações na URL
        event.preventDefault()

        // Tratamento de Error com try(tentar)
        try{
            // Verificar se os campos estão validos
           Form.validateFields()
           const transaction =  Form.formatValues()
           
           // Adcionar uma transação
          Transaction.add(transaction)
          
          // Apagar os dados do formulário
           Form.clearFields()

           // Modal vai fechar
           Modal.close()
           
        } catch(error){
            alert(error.message)
        }
        
    },
}


const App = {
    init(){

// Etapa das execuções da aplicação:
Transaction.all.forcEach(DOM.addTransaction)
// Adcionando na DOM

DOM.updateBalance()
// Atualizando o localStorage

Storage.set(Transaction.all)

  },

  reload(){
    //   Ao entrar na DOM sera limpo
    DOM.clearTransactions()  
    // Retonara para as Transaction e Popular tudo novamente
    App.init()
  },
}
 App.init()

