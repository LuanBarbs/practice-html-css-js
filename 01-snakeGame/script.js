window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    // Variáveis
    snake = [];
    positionX = 10;
    positionY = 10;
    foodX = 15;
    foodY = 15;
    velX = 0;
    velY = 0;
    grid = 20;
    tam = 3;

    // Chamada da função jogo a cada 100 milisegundos
    setInterval(jogo, 90);

    // Controles
    document.addEventListener("keydown", function(e) {
        switch(e.keyCode) {
            // Seta direita = 39
            case 39:
                velX = 1;
                velY = 0;
                break;
            // Seta esquerda = 37
            case 37:
                velX = -1;
                velY = 0;
                break;
            // Seta cima = 38
            case 38:
                velX = 0;
                velY = -1;
                break;
            // Seta baixo = 40
            case 40:
                velX = 0;
                velY = 1;
                break;
        }
    });
}

function jogo() {
    // Configuração da tela
    ctx.fillStyle = "#2980B9";

    // Distância da borda horizontal, distância da borda vertical, largura, altura
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Deslocamento da cobra
    positionX += velX;
    positionY += velY;

    // Espelhamento da tela
    if(positionX < 0) {
        positionX = grid;
    }
    if(positionX > grid) {
        positionX = 0;
    }
    if(positionY < 0) {
        positionY = grid;
    }
    if(positionY > grid) {
        positionY = 0;
    }

    // Configuração da cobra
    ctx.fillStyle = "#00f102";
    for(let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x*grid, snake[i].y*grid, grid, grid);
        if(snake[i].x == positionX && snake[i].y == positionY) {
            tam = 3;
        }
    }

    // Posicionando a cobra
    snake.push({x: positionX, y: positionY});

    // Apagando o resto da cobra
    while(snake.length > tam) {
        snake.shift();
    }

    // Comida
    ctx.fillStyle = "#F1C40F";
    ctx.fillRect(foodX*grid, foodY*grid, grid-1, grid-1);

    // Comendo a comida
    if(positionX == foodX && positionY == foodY) {
        tam++;
        foodX = Math.floor(Math.random()*grid);
        foodY = Math.floor(Math.random()*grid);
    }

}