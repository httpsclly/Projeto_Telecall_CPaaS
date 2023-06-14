function validar() {
    let nome = document.getElementById("nome");
         if(nome.value == ""){
            alert("Por favor, preencha todos os campos!");
            nome.focus();
        }
}