var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Carregando imagens
var bird = new Image();
var bg = new Image();
var chao = new Image();
var canoCima = new Image();
var canoBaixo = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
chao.src = "images/chao.png";
canoCima.src = "images/canocima.png";
canoBaixo.src = "images/canobaixo.png";

// Carregando sons
var fly = new Audio();
var score = new Audio();

fly.src = "sounds/fly.mp3";
score.src = "sounds/score.mp3";

// Variáveis
var eec = 100;
var constant;
var bX = 33;
var bY = 200;
var gravity = 1.4;
var score = 0;
var cano = [];

cano[0] = {
    x: canvas.width,
    y: 0,
}

// Captura de tecla
document.addEventListener("keydown", voa);

// Voando
function voa() {
    fly.play();
    bY -= 26;
}

function jogo() {
    // Fundo do jogo
    ctx.drawImage(bg, 0, 0); // drawImage(imagem, X, Y)

    // Criando canos
    for(let i = 0; i < cano.length; i++) {
        // Posicao do cano de baixo
        constant = canoCima.height + eec;
        // Configurando cano de cima
        ctx.drawImage(canoCima, cano[i].x, cano[i].y);
        // Configurando cano de baixo
        ctx.drawImage(canoBaixo, cano[i].x, cano[i].y+constant);
        // Movimentação do cano
        cano[i].x--;
        // Criando novos canos
        if(cano[i].x == 125) {
            cano.push({
                x: canvas.width,
                y: Math.floor(Math.random()*canoCima.height) - canoCima.height,
            })
        }

        // Pássaro entre as bordas do cano
        if(bX + bird.width >= cano[i].x && bX <= cano[i].x + canoCima.width
            // Pássaro colidiu com cano de cima ou baixo
            && (bY <= cano[i].y + canoCima.height || bY + bird.height >= cano[i].y + constant)
            // Pássaro colidou com o chão
            || bY + bird.height >= canvas.height - chao.height) {
                location.reload();
            }
        
        // Marcando pontos
        if(cano[i].x == 5) {
            score++;
        }

    }

    // Desenhando o chão
    ctx.drawImage(chao, 0, canvas.height - chao.height);

    // Pássaro
    ctx.drawImage(bird, bX, bY);
    bY += gravity;

    // Criando placar
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Placar: " + score, 10, canvas.height - 20);

    requestAnimationFrame(jogo);
}

jogo();