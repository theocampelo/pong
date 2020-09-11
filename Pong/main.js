console.log("log");

// "Método" = função

//Operações

/*function soma(a, b){
	return a + b
}

function mult(a, b){
	return a * b
}

function sub(a, b){
	return a - b
}*/

var canvas = document.getElementById("canvas") //Chama a id "canvas" do HTML
var height = canvas.height
var width = canvas.width
var ctx = canvas.getContext('2d') //"Pincel", funções de desenho são chamadas por aqui.
var velBola = 8 //Velocidade da bola.
var gameover1 = false
var gameover2 = false
var pontos1 = 0
var pontos2 = 0

// document.write('<p style="color:white;text-align:center;font-size:30px;padding:90px;">teste</p>')
// document.write('<p style="color:white;text-align:center;margin-right:200px;font-size:50px;">'$pontos1'</p>')

//background

var background = {
draw: function(){
		ctx.beginPath()
		ctx.setLineDash([5, 15])
		ctx.strokeStyle = 'white'
		ctx.rect(400,10,0,600)
		ctx.stroke()
	}
}

var bola = { // Vírgula para listar propriedades.
	x: width/2,
	y: height/2, //Y é pra baixo.
	vx: 0, //vel inicial, depois set velBola
	vy: 0, // same
	cor: "white",
	width: 20,
	height: 20,
	draw: function() { // Função dentro da variável (como propriedade), para a mesma: chama "this" ao invés de "bola", pois bola é a própria variável.
		ctx.clearRect(0, 0, width, height) //"largura, altura", nessa ordem.
		ctx.fillStyle = this.cor //"Molha o pincel na tinta."
		ctx.fillRect(this.x, this.y, this.width, this.height); //Desenha um arco / Em relação à função trigonométrica.
	}
}

var rect = {
	x: 4,
	y: 250,
	vy: 0,
	area: 2000,
	width: 20,
	height: 100,
	color: 'white',
	draw: function(){
		ctx.fillStyle = this.cor
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}

var rectd = {
	x: 776,
	y: 250,
	vy: 0,
	width: 20,
	height: 100,
	color: 'white',
	draw: function(){
		ctx.fillStyle = this.cor
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}

document.onmousedown = function(){
	if(gameover1 == true){
	gameover1 = false
	}

	if(gameover2 == true){
	gameover2 = false
	}
}

function draw(){

	if(pontos1 == 2){
		gameover1 == true
	}

	if(pontos2 == 2){
		gameover2 == true
	}

	if (gameover1 == true){
			ctx.clearRect(0, 0, width, height)
			ctx.font = '60px Verdana'
			ctx.fillText('Player 1 wins!', 110, 270)
			ctx.fillStyle = "blue"

			console.log('teste')

			ctx.font = '20px Verdana'
			ctx.fillText('Clique na tela para recomeçar.', 130, 330)
			ctx.fillStyle = "blue"
	}

	if (gameover2 == true){
			ctx.clearRect(0, 0, width, height)
			ctx.font = '60px Verdana'
			ctx.fillText('Player 2 wins!', 110, 270)
			ctx.fillStyle = "blue"

			ctx.font = '20px Verdana'
			ctx.fillText('Clique na tela para recomeçar.', 130, 330)
			ctx.fillStyle = "blue"
	}

		if(gameover1 == false && gameover2 == false){

		// document.getElementById('pontos1').innerHTML = pontos1
		// document.getElementById('pontos2').innerHTML = pontos2

	window.onkeypress = function(){	

		console.log(window.event.code)

		var codigo = window.event.code
		var codigo2 = window.event.code
		var codigo3 = window.event.code

		if(codigo == 'KeyW'){
			rect.vy = -15
		}

		if(codigo == 'KeyS'){
			rect.vy = 15		
		}

		if(codigo2 == 'Numpad8'){
			rectd.vy = -15
		}

		if(codigo2 == 'Numpad2'){
			rectd.vy = 15
		}

		if(codigo3 == 'Space'){
			bola.vx = velBola
			bola.vy = velBola
		}
	}

	window.onkeyup = function(){

		var codigo = window.event.code
		var codigo2 = window.event.code

		if(codigo == 'KeyS' || codigo == 'KeyW'){
			rect.vy = 0
		}

		if(codigo2 == 'Numpad8' || codigo2 == 'Numpad2'){
			rectd.vy = 0
		}
	}

		bola.draw()
		rect.draw()
		background.draw()
		rectd.draw()

		ctx.font="50px Arial Black";
		ctx.fillStyle = "white";
		ctx.textAlign = "end";
		ctx.fillText(pontos1, 350, 50);

		ctx.font="50px Arial Black";
		ctx.fillStyle = "white";
		ctx.textAlign = "end";
		ctx.fillText(pontos2, 480, 50);

		}//if
}//draw

function update(){

	//score

	bola.x = bola.x + bola.vx
	bola.y = bola.y + bola.vy

	rect.y = rect.y + rect.vy
	rectd.y = rectd.y + rectd.vy

	//y baixo || y cima
	if((bola.y + bola.height) >= canvas.height || (bola.y - bola.height) <= 0){
		bola.vy *= -1
	}

	//x dir (e pontos1)
	if((bola.x + (bola.width/2)) >= canvas.width){
		
		bola.x = width/2
		bola.y = height/2
		bola.vx = 0
		bola.vy = 0

		pontos1 += 1

		console.log(pontos1)
	}

	//x esq (e pontos2)
	if((bola.x - (bola.width/2)) <= 0){

		bola.x = width/2
		bola.y = height/2
		bola.vx = 0
		bola.vy = 0

		pontos2 += 1

		console.log(pontos2)
	}

//////////////////////////////////////////////////////////////////
//revisar

	//colisão rect esq

	if((bola.x - (bola.width/2)) <= (rect.x + (rect.width/2)) 
		&& (bola.y - (bola.height/2)) <= (rect.y + rect.height) 
		&& (bola.y + (bola.height/2)) >= (rect.y - (rect.height/8))){

		bola.vx *= -1
		console.log('bateutb')
	}

	//colisão rect dir

	if((bola.x + (bola.width/2)) >= (rectd.x - (rectd.width/2)) 
		&& (bola.y - (bola.height/2)) <= (rectd.y + rectd.height) 
		&& (bola.y + (bola.height/2)) >= (rectd.y - (rectd.height/8))){

		bola.vx *= -1
		console.log('bateu')
	}

////////////////////////////////////////////////////////////////////

	//colisão barra-canvas

//esquerda
	//baixo
	if((rect.y + rect.height) >= canvas.height){
		rect.y = 500
	}

	//cima
	if(rect.y <= 0){
		rect.y = 0
	}

//direita

	//baixo
	if((rectd.y + rectd.height) >= canvas.height){
		rectd.y = 500
	}

	//cima
	if(rectd.y <= 0){
		rectd.y = 0
	}


///WIN///


	// if((bola.x - bola.width) <= 0){
	// 	// console.log('Ponto do Jogador 2')
	// }

	// if((bola.x + bola.width) >= canvas.width){
	// 	// console.log('Ponto do Jogador 1')
	// }

}

	// Reminder: trocar window por event listeners 
	//(or at least read about it and try something out)

function main(){
	window.requestAnimationFrame(main, canvas)
	update()
	draw()
}

main()
