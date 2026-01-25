// função mobile
function mostramenu(){
    // Remove qualquer classe de saída e adiciona a de entrada
    $('header nav#nav-esq ul#menu-principal')
        .removeClass('animate__fadeOutRight')
        .addClass('animate__animated animate__fadeInRight animate__slow')
        .css('display', 'flex');

    $('header nav#nav-esq ul#icone-menu li#menu').css('display', 'none');
    $('header nav#nav-esq ul#icone-menu li#menuX').css('display', 'flex');
}

function escondermenu(){
    // Remove a classe de entrada e adiciona a de saída
    $('header nav#nav-esq ul#menu-principal')
        .removeClass('animate__fadeInRight')
        .addClass('animate__animated animate__fadeOutRight animate__slow');

    // Espera a animação de saída terminar para esconder
    setTimeout(() => {
        $('header nav#nav-esq ul#menu-principal')
            .css('display', 'none')
            .removeClass('animate__fadeOutRight');
    }, 1000); // Duração da animação com animate__slow

    $('header nav#nav-esq ul#icone-menu li#menu').css('display', 'flex');
    $('header nav#nav-esq ul#icone-menu li#menuX').css('display', 'none');
}

let controle = true;
$('header nav#nav-esq ul#icone-menu').click(function(){
    if(controle==true){
        mostramenu();
        controle = false;
    }else{
        escondermenu();
        controle = true;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const windContainer = document.getElementById('wind-container');

    // Configurações
    const windDensity = 180; // Aumentei um pouco para ficar mais sutil

    function createWindLine() {
        const line = document.createElement('div');
        line.classList.add('wind-line');

        // --- MUDANÇA 1: Centralizando o vento ---
        // Em vez de 0 a 100%, vamos gerar entre 25% e 75%.
        // Math.random() * (max - min) + min
        // Math.random() * (75 - 25) + 25  => Math.random() * 50 + 25
        const positionPercent = Math.random() * 50 + 25;
        line.style.left = positionPercent + '%';

        // --- MUDANÇA 2: Definindo a direção da curva ---
        // Se a posição for menor que 50% (esquerda), a direção é -1.
        // Se for maior que 50% (direita), a direção é 1.
        let curveDirection = positionPercent < 50 ? -1 : 1;
        
        // Passamos essa informação para o CSS através de uma variável
        line.style.setProperty('--curve-dir', curveDirection);


        // Altura (rastros longos)
        const height = Math.random() * 300 + 250; 
        line.style.height = height + 'px';

        // Velocidade (rápida)
        const duration = Math.random() * 0.6 + 0.5;

        // Opacidade variável
        const randomOpacity = Math.random() * 0.5 + 0.2;
        line.style.setProperty('--wind-opacity', randomOpacity);
        
        // Animação "ease-in" para começar lento e acelerar na curva final fica melhor
        line.style.animation = `windDrop ${duration}s ease-in infinite`;

        windContainer.appendChild(line);

        // Limpeza
        setTimeout(() => {
            line.remove();
        }, duration * 1000 + 100); 
    }

    setInterval(createWindLine, windDensity);
});