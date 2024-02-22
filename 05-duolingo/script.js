let perguntas = [
    {
        titulo: 'Gato',
        alternativas: ['Gat', 'Cat', 'Gate', 'Dog'],
        correta: 1,
    },
    {
        titulo: 'Fire',
        alternativas: ['Fogo', 'Água', 'Terra', 'Ar'],
        correta: 0,
    },
    {
        titulo: 'Bird',
        alternativas: ['Gato', 'Urubú', 'Pombo', 'Pássaro'],
        correta: 3,
    },
];



let app = {
    start: function() {
        this.atualPos = 0;
        this.totalPontos = 0;
        let alts = document.querySelectorAll('.alternativa');
        alts.forEach((element, index) => {
            element.addEventListener('click', () => {
                this.checaResposta(index);
            })
        });
        this.atualizaPontos();
        app.mostraQuestao(perguntas[this.atualPos]);
    },

    mostraQuestao: function(q) {
        this.qAtual = q;
        // Mostrando o título
        let titleDiv = document.getElementById('titulo');
        titleDiv.textContent = q.titulo;

        // Mostrando as alternativas
        let alts = document.querySelectorAll('.alternativa');
        alts.forEach(function(element, index) {
            element.textContent = q.alternativas[index];
        });
    },

    proximaPerg: function() {
        if(this.atualPos + 1 == perguntas.length) {
            this.atualPos = 0;
        }
        else {
            this.atualPos++;
        }
    },

    checaResposta: function(user) {
        let valor = false;
        if(this.qAtual.correta == user) {
            console.log("ACERTOU!");
            this.totalPontos++;
            valor = true;
        }
        else {
            console.log("ERROU!");
        }
        this.atualizaPontos();
        this.mostraResposta(valor);
        this.proximaPerg();
        this.mostraQuestao(perguntas[this.atualPos]);
    },

    atualizaPontos: function() {
        let scoreDiv = document.getElementById('pontos');
        scoreDiv.textContent = `Sua pontuação é: ${this.totalPontos}`;
    },

    mostraResposta: function(correto) {
        let resultDiv = document.getElementById('result');
        let result = '';
        // Formatar como a mensagem deve ser exibida
        if(correto) {
            result = 'Resposta Correta!';
        }
        else {
            // Obtendo a questão atual
            let pergunta = this.qAtual;
            // Obtendo o índice da resposta correta da questão atual
            let cIndex = pergunta.correta;
            // Obtendo o texto correto
            let cText = pergunta.alternativas[cIndex];
            result = `Incorreto. A resposta correta é: ${cText}`;
        }
        resultDiv.textContent = result;
    }
}
app.start();