var inicio = new Vue({
	el:"#inicio",
    data: {
        lista: [],
        id: null,
    },
    created: function(){
        let vm =  this;
        vm.listarFuncionarios();
    },
    methods:{
	//Busca os itens para a lista da primeira página
        listarFuncionarios: function(){
			const vm = this;
			axios.get("rest/funcionarios/listar")
			.then(response => {vm.lista = response.data;
			}).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi possível listar os itens");
			}).finally(function() {
			});
		},
		mostraAlertaErro: function(erro, mensagem){
			console.log(erro);
			alert(mensagem);
		},
		clickEdit: function(){
		    window.location.href = 'http://localhost:8080/funcionarios/pages/novo-funcionario.html';
		}
    }
});