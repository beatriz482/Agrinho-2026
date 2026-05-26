<script>
    // Variáveis de estado do simulador
    let saudePlanta = 100;
    let qtdPragas = 50;
    let qtdDefensores = 0;
    let dia = 0;
    let jogoAtivo = true;

    // Elementos do HTML que o JavaScript vai atualizar
    const txtSaude = document.getElementById('txt-saude');
    const barraSaude = document.getElementById('barra-saude');
    const txtPragas = document.getElementById('txt-pragas');
    const txtDefensores = document.getElementById('txt-defensores');
    const txtDia = document.getElementById('txt-dia');
    const msgDiv = document.getElementById('mensagem');

    // Função que atualiza os dados na tela do usuário
    function atualizarTela() {
        txtSaude.innerText = Math.round(saudePlanta) + "%";
        barraSaude.value = saudePlanta;
        txtPragas.innerText = Math.round(qtdPragas);
        txtDefensores.innerText = Math.round(qtdDefensores);
        txtDia.innerText = dia;
    }

    // Função para o botão de soltar joaninhas
    function soltarJoaninhas() {
        if (!jogoAtivo) return;
        qtdDefensores += 10;
        atualizarTela();
    }

    // O "Coração" do simulador: a lógica que roda a cada turno/dia
    function avancarDia() {
        if (!jogoAtivo) return;

        dia++;

        // 1. Lógica de Predação: Cada joaninha come até 4 pulgões por dia
        let pragasComidas = qtdDefensores * 4;
        qtdPragas -= pragasComidas;
        if (qtdPragas < 0) qtdPragas = 0;

        // 2. Lógica de Dano: Cada pulgão vivo drena 0.4% da saúde da planta
        let danoDoDia = qtdPragas * 0.4;
        saudePlanta -= danoDoDia;
        if (saudePlanta < 0) saudePlanta = 0;

        // 3. Lógica do Equilíbrio Ecológico (Sustentabilidade):
        if (qtdPragas === 0 && qtdDefensores > 0) {
            // Se não há mais pragas, as joaninhas diminuem por falta de alimento (fome ou migração)
            qtdDefensores -= qtdDefensores * 0.3; 
            if (qtdDefensores < 1) qtdDefensores = 0;
        } else if (qtdPragas > 0) {
            // Se ainda tem comida, os pulgões sobreviventes se multiplicam rápido (15% ao dia)
            qtdPragas += qtdPragas * 0.15;
        }

        atualizarTela();
        verificarFimDeJogo();
    }

    // Função que analisa se o jogador ganhou ou perdeu
    function verificarFimDeJogo() {
        // VITÓRIA: Zerou as pragas e a planta sobreviveu
        if (qtdPragas === 0 && saudePlanta > 0) {
            jogoAtivo = false;
            msgDiv.style.display = "block";
            msgDiv.className = "sucesso";
            msgDiv.innerHTML = `🎉 <strong>Vitória Sustentável!</strong><br>Você controlou a praga usando biologia! A lavoura está salva e o meio ambiente agradece.`;
        } 
        // DERROTA: A saúde da planta chegou a zero
        else if (saudePlanta <= 0) {
            jogoAtivo = false;
            msgDiv.style.display = "block";
            msgDiv.className = "perigo";
            msgDiv.innerHTML = `❌ <strong>Lavoura Perdida!</strong><br>As pragas destruíram a plantação. Tente soltar os defensores biológicos mais cedo da próxima vez!`;
        }
    }

    // Função para resetar o simulador e começar de novo
    function reiniciarSimulador() {
        sa