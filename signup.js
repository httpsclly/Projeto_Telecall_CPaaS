let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')


let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

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
    labelNome.innerHTML = 'Nome *Insira no minimo 15 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

usuario.addEventListener('keyup', () => {
  if(usuario.value.length <= 7){
    labelUsuario.setAttribute('style', 'color: red')
    labelUsuario.innerHTML = 'Usuário *Insira no minimo 6 caracteres'
    usuario.setAttribute('style', 'border-color: red')
    validUsuario = false
  } else {
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = 'Usuário'
    usuario.setAttribute('style', 'border-color: green')
    validUsuario = true
  }
})

senha.addEventListener('keyup', () => {
  if(senha.value.length <= 9){
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no minimo 8 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
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
        window.location.href = '../html/signin.html'
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
  elemento.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
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
