 class posicao{
	constructor(obj){
		this.linha = obj.linha;
		this.coluna = obj.coluna
	}
}

class no{
	constructor(obj){
		this.id = ++id_increment;
		this.posicao = obj.posicao;
		// Tem ou teve dengue
		this.dengue = false;
		// Foco foi eliminado
		this.foco_eliminado = false;
		this.f = 0;
		// Quando adicionar os niveis
		// de rua tem que adicionar
		// o custo G (em teste vai ser
		// sempre 1)
		this.g = 0;
		this.h = 0;
		this.fila_adjacencia = [];
		// Determina se este no esta no conjuto fechado
		this.dentro_conjunto_fechado = false;
		// Determina se este no esta no conjuto aberto
		this.dentro_conjunto_aberto = false;
		this.antecessor = null;
		// Determina se eh obstaculo ou nao
		// se for ele sera excluido na busca
		this.eh_obstaculo = false;
		// Texto para ser colocado dentro do quadrado
		this.texto = null;
		// Atribui o custo daquela rua
		this.custo = 1;
		// Desenha o no de acordo com a sua
		// configuracao e atribui os nos que
		// sao paredes
		if(config_mapa[this.posicao.linha][this.posicao.coluna] == 1){//obstaculo
			this.eh_obstaculo = true;
			desenhar_bloco(this, 50);
			image(
				tijolos_img,
				this.posicao.coluna * largura_bloco,
				this.posicao.linha * altura_bloco,
				largura_bloco,
				altura_bloco
			);
		}else if(config_mapa[this.posicao.linha][this.posicao.coluna] == 0){//Rua
			desenhar_bloco(this, 255);
		}else if(config_mapa[this.posicao.linha][this.posicao.coluna] == 'D'){//Dengue
			contador_focos_dengue++;
			this.dengue = true;
			fila_comercios.push(this);
			focos_dengue.push(this);
			desenhar_bloco(this, color(220,20,60));
			image(
				mosquito_img,
				this.posicao.coluna * largura_bloco,
				this.posicao.linha * altura_bloco,
				largura_bloco,
				altura_bloco
			);
		}else if(config_mapa[this.posicao.linha][this.posicao.coluna] == '#'){//Casa
			casa = this;
			robo = JSON.parse(JSON.stringify(this.posicao));
			this.texto = "#";
			desenhar_bloco(this, color(0,176,240));
			image(robo_img,casa.posicao.coluna * largura_bloco, casa.posicao.linha * altura_bloco, largura_bloco, altura_bloco);
		}
		// Se nao for obstaculo adiciono os nos adjacentes
		if( ! this.eh_obstaculo){
			// No acima
			if(this.posicao.linha > 0
			&& config_mapa[this.posicao.linha - 1][this.posicao.coluna] != 1)
				this.fila_adjacencia.push(new posicao({linha: this.posicao.linha - 1,coluna: this.posicao.coluna}));
			// No a direita
			if(this.posicao.coluna < (colunas - 1)
			&& config_mapa[this.posicao.linha][this.posicao.coluna + 1] != 1)
				this.fila_adjacencia.push(new posicao({linha: this.posicao.linha,coluna: this.posicao.coluna + 1}));
			// No abaixo
			if(this.posicao.linha < (linhas - 1)
			&& config_mapa[this.posicao.linha + 1][this.posicao.coluna] != 1)
				this.fila_adjacencia.push(new posicao({linha: this.posicao.linha + 1,coluna: this.posicao.coluna}));
			// No a esquerda
			if(this.posicao.coluna > 0
			&& config_mapa[this.posicao.linha][this.posicao.coluna - 1] != 1)
				this.fila_adjacencia.push(new posicao({linha: this.posicao.linha,coluna: this.posicao.coluna - 1}));
		}
	}
}

var linhas = 20;
var colunas = 20;
/**
0 - Rua
1 - Obstaculo
# - Casa
D - Foco de dengue
*/
var config_mapa = new Array(linhas);
config_mapa[0] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
config_mapa[1] = [0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,0];
config_mapa[2] = [0,1,'#',0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,0];
config_mapa[3] = [0,1,1,0,1,1,1,0,0,0,0,0,1,1,0,1,1,1,1,0];
config_mapa[4] = [0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0];
config_mapa[5] = [0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,0];
config_mapa[6] = [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0];
config_mapa[7] = [0,1,1,0,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0];
config_mapa[8] = [0,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0];
config_mapa[9] = [0,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0];
config_mapa[10] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0];
config_mapa[11] = [0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0];
config_mapa[12] = [0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0];
config_mapa[13] = [0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,0,0,0];
config_mapa[14] = [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0];
config_mapa[15] = [0,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0];
config_mapa[16] = [0,0,0,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0];
config_mapa[17] = [0,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0];
config_mapa[18] = [0,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0];
config_mapa[19] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// Lista de nos candidatos para serem focos de dengue
var candidatos_foco = [{"linha":1,"coluna":1},{"linha":1,"coluna":2},{"linha":1,"coluna":4},{"linha":1,"coluna":5},{"linha":1,"coluna":6},{"linha":1,"coluna":8},{"linha":1,"coluna":9},{"linha":1,"coluna":10},{"linha":1,"coluna":12},{"linha":1,"coluna":13},{"linha":1,"coluna":15},{"linha":1,"coluna":16},{"linha":1,"coluna":17},{"linha":1,"coluna":18},{"linha":2,"coluna":1},{"linha":2,"coluna":4},{"linha":2,"coluna":6},{"linha":2,"coluna":8},{"linha":2,"coluna":9},{"linha":2,"coluna":10},{"linha":2,"coluna":12},{"linha":2,"coluna":13},{"linha":2,"coluna":15},{"linha":2,"coluna":18},{"linha":3,"coluna":1},{"linha":3,"coluna":2},{"linha":3,"coluna":4},{"linha":3,"coluna":6},{"linha":3,"coluna":12},{"linha":3,"coluna":13},{"linha":3,"coluna":15},{"linha":3,"coluna":16},{"linha":3,"coluna":17},{"linha":3,"coluna":18},{"linha":4,"coluna":1},{"linha":4,"coluna":2},{"linha":4,"coluna":4},{"linha":4,"coluna":6},{"linha":4,"coluna":8},{"linha":4,"coluna":9},{"linha":4,"coluna":10},{"linha":4,"coluna":12},{"linha":4,"coluna":13},{"linha":5,"coluna":1},{"linha":5,"coluna":2},{"linha":5,"coluna":4},{"linha":5,"coluna":5},{"linha":5,"coluna":6},{"linha":5,"coluna":8},{"linha":5,"coluna":9},{"linha":5,"coluna":10},{"linha":5,"coluna":12},{"linha":5,"coluna":13},{"linha":5,"coluna":15},{"linha":5,"coluna":16},{"linha":5,"coluna":17},{"linha":5,"coluna":18},{"linha":6,"coluna":12},{"linha":6,"coluna":13},{"linha":6,"coluna":15},{"linha":6,"coluna":16},{"linha":6,"coluna":17},{"linha":6,"coluna":18},{"linha":7,"coluna":1},{"linha":7,"coluna":2},{"linha":7,"coluna":4},{"linha":7,"coluna":5},{"linha":7,"coluna":7},{"linha":7,"coluna":8},{"linha":7,"coluna":9},{"linha":7,"coluna":10},{"linha":8,"coluna":1},{"linha":8,"coluna":2},{"linha":8,"coluna":4},{"linha":8,"coluna":5},{"linha":8,"coluna":7},{"linha":8,"coluna":10},{"linha":8,"coluna":12},{"linha":8,"coluna":13},{"linha":8,"coluna":14},{"linha":8,"coluna":15},{"linha":8,"coluna":17},{"linha":8,"coluna":18},{"linha":9,"coluna":1},{"linha":9,"coluna":2},{"linha":9,"coluna":4},{"linha":9,"coluna":5},{"linha":9,"coluna":7},{"linha":9,"coluna":8},{"linha":9,"coluna":9},{"linha":9,"coluna":10},{"linha":9,"coluna":12},{"linha":9,"coluna":13},{"linha":9,"coluna":14},{"linha":9,"coluna":15},{"linha":9,"coluna":17},{"linha":9,"coluna":18},{"linha":10,"coluna":17},{"linha":10,"coluna":18},{"linha":11,"coluna":1},{"linha":11,"coluna":2},{"linha":11,"coluna":4},{"linha":11,"coluna":5},{"linha":11,"coluna":6},{"linha":11,"coluna":7},{"linha":11,"coluna":9},{"linha":11,"coluna":10},{"linha":11,"coluna":12},{"linha":11,"coluna":13},{"linha":11,"coluna":14},{"linha":11,"coluna":15},{"linha":11,"coluna":17},{"linha":11,"coluna":18},{"linha":12,"coluna":1},{"linha":12,"coluna":2},{"linha":12,"coluna":4},{"linha":12,"coluna":7},{"linha":12,"coluna":9},{"linha":12,"coluna":10},{"linha":12,"coluna":12},{"linha":12,"coluna":15},{"linha":12,"coluna":17},{"linha":12,"coluna":18},{"linha":13,"coluna":1},{"linha":13,"coluna":2},{"linha":13,"coluna":4},{"linha":13,"coluna":5},{"linha":13,"coluna":6},{"linha":13,"coluna":7},{"linha":13,"coluna":9},{"linha":13,"coluna":10},{"linha":13,"coluna":12},{"linha":13,"coluna":13},{"linha":13,"coluna":14},{"linha":13,"coluna":15},{"linha":14,"coluna":1},{"linha":14,"coluna":2},{"linha":14,"coluna":17},{"linha":14,"coluna":18},{"linha":15,"coluna":1},{"linha":15,"coluna":2},{"linha":15,"coluna":4},{"linha":15,"coluna":5},{"linha":15,"coluna":7},{"linha":15,"coluna":8},{"linha":15,"coluna":9},{"linha":15,"coluna":11},{"linha":15,"coluna":12},{"linha":15,"coluna":14},{"linha":15,"coluna":15},{"linha":15,"coluna":17},{"linha":15,"coluna":18},{"linha":16,"coluna":4},{"linha":16,"coluna":5},{"linha":16,"coluna":7},{"linha":16,"coluna":9},{"linha":16,"coluna":11},{"linha":16,"coluna":12},{"linha":16,"coluna":14},{"linha":16,"coluna":15},{"linha":16,"coluna":17},{"linha":16,"coluna":18},{"linha":17,"coluna":1},{"linha":17,"coluna":2},{"linha":17,"coluna":4},{"linha":17,"coluna":5},{"linha":17,"coluna":7},{"linha":17,"coluna":9},{"linha":17,"coluna":11},{"linha":17,"coluna":12},{"linha":17,"coluna":14},{"linha":17,"coluna":15},{"linha":17,"coluna":17},{"linha":17,"coluna":18},{"linha":18,"coluna":1},{"linha":18,"coluna":2},{"linha":18,"coluna":4},{"linha":18,"coluna":5},{"linha":18,"coluna":7},{"linha":18,"coluna":8},{"linha":18,"coluna":9},{"linha":18,"coluna":11},{"linha":18,"coluna":12},{"linha":18,"coluna":14},{"linha":18,"coluna":15},{"linha":18,"coluna":17},{"linha":18,"coluna":18}];
var mapa = [];
var cp_mapa = [];
var conjunto_aberto = [];
var conjunto_fechado = [];
var id_increment = 0;
var caminho = [];
var casa = null;
var fila_comercios = [];
var focos_dengue = [];
var robo = null;
var contador_movimentos = 0;
var num_focos_inicial = 4;
var contador_focos_dengue = 0;
var modo_jogo = "manual";
var custo_minimo = null;

function congestionamento(nivel){
	var custo = null;
	if(nivel == 1)
		custo = 3;
	else if(nivel == 2)
		custo = 8;
	else if(nivel == 3)
		custo = 14;
	else if(nivel == 4)
		custo = 20;
	else if(nivel == 5)
		custo = 30;
	return custo;
}

function resetar_no(no){
	no.f = 0;
	no.g = 0;
	no.h = 0;
	no.dentro_conjunto_fechado = false;
	no.dentro_conjunto_aberto = false;
	no.antecessor = null;
}

function reseta_variaveis(){
	let l = conjunto_aberto.length;
	for(let i = 0; i < l; i++){
		resetar_no(conjunto_aberto[i]);
	}
	conjunto_aberto = [];

	l = conjunto_fechado.length;
	for(let i = 0; i < l; i++){
		resetar_no(conjunto_fechado[i]);
	}
	conjunto_fechado = [];
}

function preload(){
	robo_img = loadImage("imgs/robot.png");
	mosquito_img = loadImage("imgs/mosquito.png");
	tijolos_img = loadImage("imgs/tijolos.png");
}

function montar_candidatos_foco(){
	var fila_candidatos = [];
	for(i = 0; i < linhas; i++){
		for(j = 0; j < colunas; j++){
			let no_atual = mapa[i][j];
			if( ! no_atual.eh_obstaculo)
				continue;

			let tem_vizinho_rua = false;
			// No acima
			if(no_atual.posicao.linha > 0
			&& mapa[no_atual.posicao.linha - 1][no_atual.posicao.coluna].eh_obstaculo === false
			&& mapa[no_atual.posicao.linha - 1][no_atual.posicao.coluna].id != 43){
				fila_candidatos.push(JSON.parse(JSON.stringify(no_atual.posicao)));
				continue;
			}
			// No a direita
			if(no_atual.posicao.coluna < (colunas - 1)
			&& mapa[no_atual.posicao.linha][no_atual.posicao.coluna + 1].eh_obstaculo === false
			&& mapa[no_atual.posicao.linha][no_atual.posicao.coluna + 1].id != 43){
				fila_candidatos.push(JSON.parse(JSON.stringify(no_atual.posicao)));
				continue;
			}
			// No abaixo
			if(no_atual.posicao.linha < (linhas - 1)
			&& mapa[no_atual.posicao.linha + 1][no_atual.posicao.coluna].eh_obstaculo === false
			&& mapa[no_atual.posicao.linha + 1][no_atual.posicao.coluna].id != 43){
				fila_candidatos.push(JSON.parse(JSON.stringify(no_atual.posicao)));
				continue;
			}
			// No a esquerda
			if(no_atual.posicao.coluna > 0
			&& mapa[no_atual.posicao.linha][no_atual.posicao.coluna - 1].eh_obstaculo === false
			&& mapa[no_atual.posicao.linha][no_atual.posicao.coluna - 1].id != 43){
				fila_candidatos.push(JSON.parse(JSON.stringify(no_atual.posicao)));
				continue;
			}
		}
	}
	return fila_candidatos;
}

function permutator(inputArr) {
	var results = [];

	function permute(arr, memo) {
		var cur, memo = memo || [];

		for (var i = 0; i < arr.length; i++) {
			cur = arr.splice(i, 1);
			if (arr.length === 0) {
				results.push(memo.concat(cur));
			}
			permute(arr.slice(), memo.concat(cur));
			arr.splice(i, 0, cur[0]);
		}

		return results;
	}

	return permute(inputArr);
}

function organiza_visita(){
	var cache = {};

	function custo_caminho(pos){
		var custo_total = 0;

		// Custo de casa para o primeiro
		// ponto de interesse
		if(typeof cache["casa"][pos[0]] == "undefined"){
			inicio = casa;
			meta = fila_comercios[pos[0]];
			conjunto_aberto.push(inicio);
			cache["casa"][pos[0]] = busca(true);
			cache[pos[0]]["casa"] = cache["casa"][pos[0]];
			custo_total += cache["casa"][pos[0]];
			reseta_variaveis();
		}else{
			custo_total += cache["casa"][pos[0]];
		}

		let l = pos.length;
		for(let i = 1; i < l; i++){
			if(typeof cache[pos[i - 1]][pos[i]] == "undefined"){
				inicio = fila_comercios[pos[i - 1]];
				meta = fila_comercios[pos[i]];
				conjunto_aberto.push(inicio);
				cache[pos[i - 1]][pos[i]] = busca(true);
				cache[pos[i]][pos[i - 1]] = cache[pos[i - 1]][pos[i]];
				custo_total += cache[pos[i - 1]][pos[i]];
				reseta_variaveis();
			}else{
				custo_total += cache[pos[i - 1]][pos[i]];
			}
		}

		// Custo do ultimo ponto de
		// interesse para casa
		if(typeof cache[pos[l - 1]]["casa"] == "undefined"){
			inicio = fila_comercios[pos[l - 1]];
			meta = casa;
			conjunto_aberto.push(inicio);
			cache[pos[l - 1]]["casa"] = busca(true);
			cache["casa"][pos[l - 1]] = cache[pos[l - 1]]["casa"];
			custo_total += cache[pos[l - 1]]["casa"];
			reseta_variaveis();
		}else{
			custo_total += cache[pos[l - 1]]["casa"];
		}

		return custo_total;
	}

	function define_caminho(){
		// Valores para realizar permutacao
		var aux = [];
		let l = fila_comercios.length;
		for(let i = 0; i < l; i++){
			aux.push(i);
			cache[i] = {};
		}
		cache["casa"] = {};

		// Procura o caminho com menor custo de
		// todos
		var caminhos = permutator(aux);
		l = caminhos.length;
		var melhor_caminho = 0;
		var melhor_custo = custo_caminho(caminhos[melhor_caminho]);
		for(let i = 1; i < l; i++){
			let aux_custo = custo_caminho(caminhos[i]);
			if(aux_custo < melhor_custo){
				console.log("Melhor caminho achado: "+JSON.stringify(caminhos[i]));
				melhor_caminho = i;
				melhor_custo = aux_custo;
			}
		}

		return caminhos[melhor_caminho];
	}

	// Melhor caminho definido
	var ordem_visita = define_caminho();
	var aux = [];
	let l = ordem_visita.length;
	for(let i = 0; i < l; i++){
		aux.push(fila_comercios[ordem_visita[i]]);
	}
	// fila de comercios organizada com a melhor
	// ordem de visita
	fila_comercios = aux;
	return;
}

function setup(){
	let aux;
	if(document.body.clientHeight < document.body.clientWidth)
		aux = document.body.clientHeight;
	else
		aux = document.body.clientWidth;

	let altura_canv = aux * 0.85;
	let largura_canv = altura_canv;
	var canv = createCanvas(largura_canv,altura_canv);
	canv.parent("container-mapa");
	background(50);
	altura_bloco = height / linhas;
	largura_bloco = width / colunas;
	for(let i = 0; i < num_focos_inicial; i++){
		let posicao = candidatos_foco[Math.floor((Math.random() * candidatos_foco.length))];
		config_mapa[posicao.linha][posicao.coluna] = 'D';
		remover_elemento_array(candidatos_foco, posicao);
	}
	for(let i = 0; i < linhas; i++){
		mapa[i] = [];
		cp_mapa[i] = [];
		for(let j = 0; j < colunas; j++){
			mapa[i][j] = new no({
				posicao: new posicao({
					linha: i,
					coluna: j
				})
			});
			cp_mapa[i][j] = JSON.parse(JSON.stringify(mapa[i][j]));
		}
	}
	organiza_visita();
	atualizar_focos_dengue();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buscar(){
	inicio = casa;
	meta = fila_comercios[0];
	conjunto_aberto.push(inicio);
	if( ! busca()){
		swal("Sem solução!", "Não é possível exterminar todos os focos de dengue", "error");
		return false;
	}

	let l = fila_comercios.length;
	for(let i = 1; i < l; i++){
		reseta_variaveis();
		inicio = fila_comercios[i - 1];
		meta = fila_comercios[i];
		conjunto_aberto.push(inicio);
		if( ! busca()){
			swal("Sem solução!", "Não é possível exterminar todos os focos de dengue", "error");
			return false;
		}
	}

	reseta_variaveis();
	inicio = fila_comercios[fila_comercios.length - 1];
	meta = casa;
	conjunto_aberto.push(inicio);
	if( ! busca()){
		swal("Sem solução!", "Não é possível exterminar todos os focos de dengue", "error");
		return false;
	}
	desenhar_caminho();
}

function manhattan(no1, no2){
	return abs(no1.posicao.coluna - no2.posicao.coluna) + abs(no1.posicao.linha - no2.posicao.linha);
}

function remover_elemento_array(arr, el){
	let fim = arr.length - 1;
	for(let i = fim; i >= 0; i--){
		if(arr[i] == el)
			arr.splice(i, 1);
	}
}

function add_caminho(no_atual){
	var aux = no_atual;
	caminho.push(new Array());
	let l = caminho.length - 1;
	caminho[l].push(JSON.parse(JSON.stringify(no_atual)));
	while(aux.antecessor){
		caminho[l].push(JSON.parse(JSON.stringify(aux.antecessor)));
		aux = aux.antecessor;
	}
}

function desenhar_bloco(no, cor){
	stroke(100);
	fill(cor);
	rect(no.posicao.coluna * largura_bloco,no.posicao.linha * altura_bloco,largura_bloco,altura_bloco);
	if(no.texto != null){
		fill(0);
		text(no.texto, no.posicao.coluna * largura_bloco + (largura_bloco / 2), no.posicao.linha * altura_bloco + (altura_bloco / 2));
	}
}

async function desenhar_caminho(){
	let caminhos = caminho.length;
	for(let i = 0; i < caminhos; i++){
		let fim = caminho[i].length - 1;
		let passos = -1;
		for(let j = fim; j >= 0; j--){
			let cor;
			passos++;
			atualizar_contador_movimentos(parseInt(contador_movimentos) + parseInt(passos));
			$("#tabela-custo tbody").html(
				"<tr><td>"+passos+"</td><td>"+caminho[i][j].f+"</td><td>"+caminho[i][j].g+"</td><td>"+caminho[i][j].h+"</td></tr>"
			);
			if(caminho[i][j].foco_eliminado
			&& caminho[i][j].dengue == true
			&& j != fim){
				caminho[i][j].dengue = false;
				contador_focos_dengue--;
				atualizar_focos_dengue();
				cor = color(0,255,0);
			}else if(caminho[i][j].foco_eliminado){
				cor = color(0,255,0);
			}else{
				cor = color(95,158,160);
			}
			desenhar_bloco(caminho[i][j], color(cor));
			image(
				robo_img,
				caminho[i][j].posicao.coluna * largura_bloco,
				caminho[i][j].posicao.linha * altura_bloco,
				largura_bloco,
				altura_bloco
			);
			await sleep(350);
			desenhar_bloco(caminho[i][j], color(cor));
		}
		contador_movimentos += passos;
	}
	jogo_terminou();
}

function busca(so_custo = false){
	var custo = null;
	while(conjunto_aberto.length > 0){
		var menor_f = 0;
		let l = conjunto_aberto.length;
		for(let i = 0; i < l; i++){
			if(conjunto_aberto[i].f < conjunto_aberto[menor_f].f){
				menor_f = i;
			}
		}
		var no_atual = conjunto_aberto[menor_f];
		if(no_atual === meta){
			custo = no_atual.g;
			if( ! so_custo){
				if(no_atual.dengue == true){
					no_atual.foco_eliminado = true;
					remover_elemento_array(focos_dengue, no_atual);
				}
				add_caminho(no_atual);
			}
			break;
		}

		remover_elemento_array(conjunto_aberto, no_atual);
		no_atual.dentro_conjunto_aberto = false;
		conjunto_fechado.push(no_atual);
		no_atual.dentro_conjunto_fechado = true;
	
		l = no_atual.fila_adjacencia.length;
		for(let i = 0; i < l; i++){
			var posicao = no_atual.fila_adjacencia[i];
			var no_vizinho = mapa[posicao.linha][posicao.coluna];
			// Se o no ja estiver no conjunto fechado
			// nao eh necessario revisita-lo e mudar
			// o seu custo G
			if(no_vizinho.dentro_conjunto_fechado
			|| no_vizinho.eh_obstaculo)
				continue;

			var temp_g = no_atual.g + no_vizinho.custo;
			if(no_vizinho.dentro_conjunto_aberto)
			{
				if(temp_g < no_vizinho.g)
					no_vizinho.g = temp_g;
			}else{
				no_vizinho.g = temp_g;
				conjunto_aberto.push(no_vizinho);
				no_vizinho.dentro_conjunto_aberto = true;
			}

			no_vizinho.h = manhattan(no_vizinho, meta);
			no_vizinho.f = no_vizinho.g + no_vizinho.h;
			no_vizinho.antecessor = no_atual;
		}
	}

	return custo;
}

function atualizar_contador_movimentos(num = null){
	if(num === null)
		$("#contador_movimentos").html(contador_movimentos);
	else
		$("#contador_movimentos").html(num);
}

function atualizar_focos_dengue(){
	$("#contador_focos_dengue").html(contador_focos_dengue);
}

function jogo_terminou(){
	let conf = {
		icon: "success",
		buttons: {
			resetar: {
				text: "Resetar",
				value: false,
				visible: true,
				closeModal: true
			}
		}
	};
	if(modo_jogo == "manual"){
		conf.title = "Parabéns!";
		conf.text = "Você limpou todos os focos da dengue com "+contador_movimentos+" movimentos, por favor selecione uma das opções abaixo para continuar.";
		conf.buttons.melhor_caminho =  {
			text: "Melhor caminho",
			value: true,
			visible: true,
			closeModal: true
		};
	}else if(modo_jogo == "automatico"){
		conf.title = "Completado!";
		conf.text = "O melhor caminho é realizado com "+contador_movimentos+" movimentos, você conseguiu realizar a tarefa com o menor número de movimentos?";
	}
	swal({
		title: conf.title,
		text: conf.text,
		icon: conf.icon,
		buttons: conf.buttons
	}).then(function(result){
		if(result){
			$("#botoes").css("visibility", "hidden");
			$("#tabela-custo").parent().css("visibility", "visible");
			contador_focos_dengue = 0;
			contador_movimentos = 0;
			fila_comercios = [];
			focos_dengue = [];
			modo_jogo = "automatico";
			mapa = cp_mapa;
			for(let i = 0; i < linhas; i++){
				for(let j = 0; j < colunas; j++){
					let no_atual = mapa[i][j];
					if(config_mapa[no_atual.posicao.linha][no_atual.posicao.coluna] == 1){//obstaculo
						desenhar_bloco(no_atual, 50);
						image(
							tijolos_img,
							no_atual.posicao.coluna * largura_bloco,
							no_atual.posicao.linha * altura_bloco,
							largura_bloco,
							altura_bloco
						);
					}else if(config_mapa[no_atual.posicao.linha][no_atual.posicao.coluna] == 0){//Rua
						desenhar_bloco(no_atual, 255);
					}else if(config_mapa[no_atual.posicao.linha][no_atual.posicao.coluna] == 'D'){//Dengue
						contador_focos_dengue++;
						fila_comercios.push(no_atual);
						focos_dengue.push(no_atual);
						desenhar_bloco(no_atual, color(220,20,60));
						image(
							mosquito_img,
							no_atual.posicao.coluna * largura_bloco,
							no_atual.posicao.linha * altura_bloco,
							largura_bloco,
							altura_bloco
						);
					}else if(config_mapa[no_atual.posicao.linha][no_atual.posicao.coluna] == '#'){//Casa
						casa = no_atual;
						robo = JSON.parse(JSON.stringify(no_atual.posicao));
						desenhar_bloco(no_atual, color(0,176,240));
						image(robo_img,casa.posicao.coluna * largura_bloco, casa.posicao.linha * altura_bloco, largura_bloco, altura_bloco);
					}
				}
			}
			reseta_variaveis();
			organiza_visita();
			atualizar_focos_dengue();
			buscar();
		}else{
			window.location.reload();
		}
	});
}

function mover(direcao){
	contador_movimentos++;
	atualizar_contador_movimentos();
	switch(direcao){
		case "direita":
			// No a direita
			if(robo.coluna < (colunas - 1)
			&& config_mapa[robo.linha][robo.coluna + 1] != 1){
				if(mapa[robo.linha][robo.coluna].foco_eliminado)
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(0,255,0));
				else
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(95,158,160));
				robo.coluna++;
				if(mapa[robo.linha][robo.coluna] == casa
				&& contador_focos_dengue == 0){
					jogo_terminou();
				}else if(mapa[robo.linha][robo.coluna].dengue){
					contador_focos_dengue--;
					atualizar_focos_dengue();
					mapa[robo.linha][robo.coluna].dengue = false;
					mapa[robo.linha][robo.coluna].foco_eliminado = true;
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(0,255,0));
				}else{
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(95,158,160));
				}
				image(
					robo_img,
					mapa[robo.linha][robo.coluna].posicao.coluna * largura_bloco,
					mapa[robo.linha][robo.coluna].posicao.linha * altura_bloco,
					largura_bloco,
					altura_bloco
				);
			}
			break;
		case "esquerda":
			// No a esquerda
			if(robo.coluna > 0
			&& config_mapa[robo.linha][robo.coluna - 1] != 1){
				if(mapa[robo.linha][robo.coluna].foco_eliminado)
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(0,255,0));
				else
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(95,158,160));
				robo.coluna--;
				if(mapa[robo.linha][robo.coluna] == casa
				&& contador_focos_dengue == 0){
					jogo_terminou();
				}else if(mapa[robo.linha][robo.coluna].dengue){
					contador_focos_dengue--;
					atualizar_focos_dengue();
					mapa[robo.linha][robo.coluna].dengue = false;
					mapa[robo.linha][robo.coluna].foco_eliminado = true;
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(0,255,0));
				}else{
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(95,158,160));
				}
				image(
					robo_img,
					mapa[robo.linha][robo.coluna].posicao.coluna * largura_bloco,
					mapa[robo.linha][robo.coluna].posicao.linha * altura_bloco,
					largura_bloco,
					altura_bloco
				);
			}
			break;
		case "acima":
			// No acima
			if(robo.linha > 0
			&& config_mapa[robo.linha - 1][robo.coluna] != 1){
				if(mapa[robo.linha][robo.coluna].foco_eliminado)
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(0,255,0));
				else
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(95,158,160));
				robo.linha--;
				if(mapa[robo.linha][robo.coluna] == casa
				&& contador_focos_dengue == 0){
					jogo_terminou();
				}else if(mapa[robo.linha][robo.coluna].dengue){
					contador_focos_dengue--;
					atualizar_focos_dengue();
					mapa[robo.linha][robo.coluna].dengue = false;
					mapa[robo.linha][robo.coluna].foco_eliminado = true;
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(0,255,0));
				}else{
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(95,158,160));
				}
				image(
					robo_img,
					mapa[robo.linha][robo.coluna].posicao.coluna * largura_bloco,
					mapa[robo.linha][robo.coluna].posicao.linha * altura_bloco,
					largura_bloco,
					altura_bloco
				);
			}
			break;
		case "abaixo":
			// No abaixo
			if(robo.linha < (linhas - 1)
			&& config_mapa[robo.linha + 1][robo.coluna] != 1){
				if(mapa[robo.linha][robo.coluna].foco_eliminado)
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(0,255,0));
				else
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(95,158,160));
				robo.linha++;
				if(mapa[robo.linha][robo.coluna] == casa
				&& contador_focos_dengue == 0){
					jogo_terminou();
				}else if(mapa[robo.linha][robo.coluna].dengue){
					contador_focos_dengue--;
					atualizar_focos_dengue();
					mapa[robo.linha][robo.coluna].dengue = false;
					mapa[robo.linha][robo.coluna].foco_eliminado = true;
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(0,255,0));
				}else{
					desenhar_bloco(mapa[robo.linha][robo.coluna], color(95,158,160));
				}
				image(
					robo_img,
					mapa[robo.linha][robo.coluna].posicao.coluna * largura_bloco,
					mapa[robo.linha][robo.coluna].posicao.linha * altura_bloco,
					largura_bloco,
					altura_bloco
				);
			}
			break;
		default:
			break;
	}
}

$(document).ready(function(){
	$("#btn-mover-acima").on("click", function(){
		mover("acima");
	});
	$("#btn-mover-direita").on("click", function(){
		mover("direita");
	});
	$("#btn-mover-abaixo").on("click", function(){
		mover("abaixo");
	});
	$("#btn-mover-esquerda").on("click", function(){
		mover("esquerda");
	});
});
