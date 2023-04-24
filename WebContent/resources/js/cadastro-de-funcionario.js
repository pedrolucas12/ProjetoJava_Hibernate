var inicio = new Vue({
	el:"#cadastro",
    data: {
        id: null,
        form: {
			id: null,
			nome: '',
			setor: null,
			salario: null,
			email: '',
			idade: null
		},
		funcionario: null,
		setores: []
    },
      created: function(){
        let vm =  this;
        vm.listarSetores();
    },
    methods:{
		mostraAlertaErro: function(erro, mensagem){
			console.log(erro);
			alert(mensagem);
		},
		clickSave: function(){
			const vm = this;
			console.log("aqui0", vm.form);
			console.log("aqui1", vm.$refs.form);
			console.log("aqui0", this.$refs.form.submit());
			axios.post("http://localhost:8080/funcionarios/rest/funcionarios/salvar", vm.form)
			.then(response => {
				vm.funcionario = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		listarSetores: function(){
			const vm = this;
			axios.get("http://localhost:8080/funcionarios/rest/setor/listar")
			.then(response => {
				vm.setores = response.data;
			}).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi possível listar os itens");
			}).finally(function() {
			});
		},
    }
});