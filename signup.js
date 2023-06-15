let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')


let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let nome_m = document.querySelector('#nome_m')
let labelNomeM = document.querySelector('#labelNomeM')
let validNomeM = false



let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let cep = document.querySelector('#cep')
let labelCEP = document.querySelector('#labelCEP')
let validCep = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

nome.addEventListener('keyup', () => {
  if(nome.value.length <= 1){
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome Completo: *Insira no minimo 15 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome Completo:'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

nome_m.addEventListener('keyup', () => {
  if(nome_m.value.length <= 1){
    labelNomeM.setAttribute('style', 'color: red')
    labelNomeM.innerHTML = 'Nome Materno: *Insira no minimo 8 caracteres'
    nome_m.setAttribute('style', 'border-color: red')
    validNomeM = false
  } else {
    labelNomeM.setAttribute('style', 'color: green')
    labelNomeM.innerHTML = 'Nome Materno: *'
    nome_m.setAttribute('style', 'border-color: green')
    validNomeM = true
  }
})

cep.addEventListener('keyup', () => {
  if(cep.value.length <= 7){
    labelCEP.setAttribute('style', 'color: red')
    labelCEP.innerHTML = 'CEP: *Insira no minimo 8 caracteres'
    cep.setAttribute('style', 'border-color: red')
    validCEP = false
  } else {
    labelCEP.setAttribute('style', 'color: green')
    labelCEP.innerHTML = 'CEP:'
    cep.setAttribute('style', 'border-color: green')
    validCEP = true
  }
})

usuario.addEventListener('keyup', () => {
  if(usuario.value.length <= 7){
    labelUsuario.setAttribute('style', 'color: red')
    labelUsuario.innerHTML = 'Usuário: *Insira no minimo 6 caracteres'
    usuario.setAttribute('style', 'border-color: red')
    validUsuario = false
  } else {
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = 'Usuário:'
    usuario.setAttribute('style', 'border-color: green')
    validUsuario = true
  }
})

senha.addEventListener('keyup', () => {
  if(senha.value.length <= 9){
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha: *Insira no minimo 8 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha:'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha: *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha:'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})

function cadastrar(){
  if(validNome && validUsuario && validSenha && validConfirmSenha){
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
    
    listaUser.push(
    {
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value
    }
    )
    
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
    
   
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    
    setTimeout(()=>{
        window.location.href = 'cadastro.html'
    }, 3000)
  
    
  } else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

btnConfirm.addEventListener('click', ()=>{
  let inputConfirmSenha = document.querySelector('#confirmSenha')
  
  if(inputConfirmSenha.getAttribute('type') == 'password'){
    inputConfirmSenha.setAttribute('type', 'text')
  } else {
    inputConfirmSenha.setAttribute('type', 'password')
  }
})


// CPF//

function validarCPF() {
  var cpfInput = document.getElementById('cpf');
  var cpf = cpfInput.value.replace(/[^\d]+/g, '');

  if (cpf === '') {
    // CPF em branco, não faz nada
    return;
  }

  if (!validarDigitosCPF(cpf)) {
    // CPF com quantidade incorreta de dígitos
    exibirErro(cpfInput, 'CPF inválido');
    return;
  }

  if (!validarCPFRepetido(cpf)) {
    // CPF com todos os dígitos repetidos
    exibirErro(cpfInput, 'CPF inválido');
    return;
  }

  // Cálculo dos dígitos verificadores
  var digito1 = calcularDigitoVerificador(cpf.substring(0, 9));
  var digito2 = calcularDigitoVerificador(cpf.substring(0, 9) + digito1);

  if (cpf.substring(9, 11) !== digito1.toString() + digito2.toString()) {
    // CPF com dígitos verificadores inválidos
    exibirErro(cpfInput, 'CPF inválido');
    return;
  }

  // CPF válido, remove o estilo de erro (caso exista)
  removerErro(cpfInput);
}

function validarDigitosCPF(cpf) {
  return cpf.length === 11;
}

function validarCPFRepetido(cpf) {
  var cpfRepetido = /^(\d)\1+$/;
  return !cpfRepetido.test(cpf);
}

function calcularDigitoVerificador(cpfParcial) {
  var soma = 0;
  var peso = 10;

  for (var i = 0; i < cpfParcial.length; i++) {
    soma += parseInt(cpfParcial[i]) * peso;
    peso--;
  }

  var resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function exibirErro(elemento, mensagem) {
  elemento.style.borderColor = 'red';
  var msgError = document.getElementById('msgError');
  msgError.innerHTML = mensagem;
  msgError.style.color = 'red';
}

function removerErro(elemento) {
  elemento.style.borderColor = '';
  elemento.style.backgroundColor = '';
  var msgError = document.getElementById('msgError');
  msgError.innerHTML = '';
}

// Evento para validar o CPF quando o campo perder o foco
document.getElementById('cpf').addEventListener('blur', validarCPF);


// CEP //
 

function buscarEnderecoPorCEP() {
  var cep = document.getElementById('cep').value;
  var url = 'https://viacep.com.br/ws/' + cep + '/json/';

  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Erro ao buscar endereço');
      }
      return response.json();
    })
    .then(function(data) {
      if (data.erro) {
        console.error('CEP não encontrado');
      } else {
        document.getElementById('end').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
      }
    })
    .catch(function(error) {
      console.error(error);
    });
}