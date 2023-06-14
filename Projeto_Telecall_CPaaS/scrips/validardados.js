function validarCPF(cpf) {
  // Removendo caracteres especiais do CPF
  cpf = cpf.replace(/[^\d]/g, '');

  // Verificando se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
    alert('CPF inválido. Certifique-se de digitar os 11 dígitos corretamente.');
    return false;
  }

  // Verificando se todos os dígitos do CPF são iguais
  if (/^(\d)\1+$/.test(cpf)) {
    alert('CPF inválido. Não são permitidos CPFs com todos os dígitos iguais.');
    return false;
  }

  // Calculando o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

  // Verificando o primeiro dígito verificador
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
    alert('CPF inválido. O primeiro dígito verificador não é válido.');
    return false;
  }

  // Calculando o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

  // Verificando o segundo dígito verificador
  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
    alert('CPF inválido. O segundo dígito verificador não é válido.');
    return false;
  }

  // CPF válido
  return true;
}

function Login_Vali() {
  // Validando os campos Nome, Sobrenome, CPF, CEP, Celular e Telefone Fixo
  let nome = document.getElementById('Name').value.trim();
  let sobrenome = document.getElementById('Sobrenome').value.trim();
  let cpf = document.getElementById('CPF').value.trim();
  let cep = document.getElementById('cep').value.trim();
  let celular = document.getElementById('Celular').value.trim();
  let telefoneFixo = document.getElementById('Telefone').value.trim();

  if (nome.length < 15 || nome.length > 60 || !/^[a-zA-Z]+$/.test(nome)) {
    alert("O nome deve ter entre 15 e 60 caracteres alfabéticos.");
    document.getElementById("Name").value = "";
    return false;
  }

  if (sobrenome === '') {
    alert('O campo Sobrenome é obrigatório.');
    return false;
  }

  if (cpf === '') {
    alert('O campo CPF é obrigatório.');
    return false;
  }

  if (!validarCPF(cpf)) {
    return false;
  }

  if (cep === '') {
    alert('O campo CEP é obrigatório.');
    return false;
  }

  if (celular === '') {
    alert('O campo Celular é obrigatório.');
    return false;
  }

  if (telefoneFixo === '') {
    alert('O campo Telefone Fixo é obrigatório.');
    return false;
  }

  // Todos os campos válidos, você pode fazer a submissão do formulário ou realizar outras ações aqui
  return true;
}
