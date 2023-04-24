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
		alterarFuncionario: function(id){
		    window.location.href = 'http://localhost:8080/funcionarios/pages/novo-funcionario.html?id='+id;
		},
		deletarFuncionario: function(id){
	        const vm = this;
	        console.log('id do funcionário a ser excluído:', id);
	        axios.delete(`rest/funcionarios/deletar/${id}`)
	        .then(response => {
	            vm.listarFuncionarios(); // atualiza a lista de funcionários
	        }).catch(function (error) {
	            vm.mostraAlertaErro("Erro interno", "Não foi possível excluir o funcionário");
	        }).finally(function() {
        });
    	},
		clickSave: function(){
			 window.location.href = 'http://localhost:8080/funcionarios/pages/novo-funcionario.html';
		},	
		}
});