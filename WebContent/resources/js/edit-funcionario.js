var editar = new Vue({
  el: '#editar',
  data: {
    funcionario: null,
    form: {
      nome: '',
      setor: null,
      salario: null,
      email: '',
      idade: null
    }
  },
  created: function() {
    // Preencher o formulário com os dados do funcionário que será editado
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const vm = this;

    axios.get(`http://localhost:8080/funcionarios/rest/funcionarios/atualizar/${id}`)
      .then(response => {
        vm.funcionario = response.data;
        vm.form.nome = vm.funcionario.nome;
        vm.form.setor = vm.funcionario.setor;
        vm.form.salario = vm.funcionario.salario;
        vm.form.email = vm.funcionario.email;
        vm.form.idade = vm.funcionario.idade;
      })
      .catch(function(error) {
        vm.mostraAlertaErro('Erro interno', 'Não foi possível carregar os dados do funcionário');
      });
  },
  methods: {
    mostraAlertaErro: function(erro, mensagem) {
      console.log(erro);
      alert(mensagem);
    },
    clickSave: function() {
      // Enviar as alterações para o servidor quando o formulário for enviado
      const vm = this;

      axios.put(`http://localhost:8080/funcionarios/rest/funcionarios/atualizar/${vm.funcionario.id}`, vm.form)
        .then(response => {
          // Redirecionar para a página de lista de funcionários após a atualização
          window.location.href = 'http://localhost:8080/funcionarios/pages/index.html';
        })
        .catch(function(error) {
          vm.mostraAlertaErro('Erro interno', 'Não foi possível atualizar o funcionário');
        });
    }
  }
});
