document.addEventListener('DOMContentLoaded', () => {
    // Referências
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    const alert = document.getElementById('alert');

    // Variávies
    let jumping = false;
    let gravity = 0.9;
    let gameof = false;
    let dinopy = 0;

    // Entrada de dados
    document.addEventListener('keyup', jumpControll);

    // Controle do pulo
    function jumpControll(e) {
        if(e.keyCode == 32) {
            if(!jumping) {
                jumping = true;
                jump();
            }
        }
    }

    function jump() {
        let count = 0;
        let timerId = setInterval(function(){
            // Caindo
            if(count == 15) {
                clearInterval(timerId);
                let downTimerId = setInterval(function() {
                    if(count == 0) {
                        clearInterval(downTimerId);
                        jumping = false;
                    }
                    dinopy -= 5;
                    count--;
                    dinopy = dinopy * gravity;
                    dino.style.bottom = dinopy + 'px';
                }, 20)
            }

            // Subida
            dinopy += 30;
            count++;
            dinopy = dinopy*gravity;
            dino.style.bottom = dinopy + 'px';
        }, 20);
    }

    function gerarObst() {
        let randomTime = Math.random()*4000;
        let obstaclepx = 1000;
        const obstacle = document.createElement('div');

        // Criando cópias
        if(!gameof) obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclepx + 'px';

        // Lógica do jogo mais movimento
        let timerId = setInterval(function () {
            // Colisão com o player
            if(obstaclepx > 0 && obstaclepx < 60 && dinopy < 60) {
                clearInterval(timerId);
                alert.innerHTML = 'Fim de Jogo!';
                gameof = true;
                // Removendo cópias
                body.removeChild(body.firstChild);
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild);
                }
            }

            // Movimento dos cactos
            obstaclepx -= 10;
            obstacle.style.left = obstaclepx + 'px';
        }, 20);

        if(!gameof) setTimeout(gerarObst, randomTime);
    }

    gerarObst();
})