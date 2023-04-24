var inicio = new Vue({
	el:"#cadastro",
    data: {
        id: '',
        form: {
			id: null,
			nome: '',
			setor: null,
			salario: null,
			email: '',
			idade: null
		},
		funcionario: null,
		setores: [],
		edicao: false
    },
    mounted: function() {
		let vm =  this;
        vm.id = window.location.search.substring(4);
        if(vm.id.length > 0){
			vm.edicao = true;
			vm.findUser(vm.id);
		} else {
			vm.edicao = false;
		}
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
			axios.post("http://localhost:8080/funcionarios/rest/funcionarios/salvar", vm.form)
			.then(response => {
				vm.funcionario = response.data;
				window.location.href = 'http://localhost:8080/funcionarios/index.html';
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
		findUser: function(id) {
			const vm = this;
			axios.get(`http://localhost:8080/funcionarios/rest/funcionarios/find/${id}`)
			.then(response => {
				vm.form = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		clickEdit: function(){
			const vm = this;
			axios.put("http://localhost:8080/funcionarios/rest/funcionarios/atualizar", vm.form)
			.then(response => {
				vm.funcionario = response.data;
				window.location.href = 'http://localhost:8080/funcionarios/index.html';
			})
			.catch(function (error) {
				console.log(error);
			});
		},
    }
});