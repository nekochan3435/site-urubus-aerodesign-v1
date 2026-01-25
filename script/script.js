// função mobile
function mostramenu() {
  // Mostra o menu principal com animação
  $("header nav#nav-esq ul#menu-principal")
    .removeClass("animate__fadeOutRight")
    .addClass("animate__animated animate__fadeInRight animate")
    .css("display", "flex");

  // Adiciona a classe 'ativo' no pai dos ícones para disparar o CSS
  $("header nav#nav-esq ul#icone-menu").addClass("ativo");
  $("body").addClass("no-scroll");
}

function escondermenu() {
  $("header nav#nav-esq ul#menu-principal")
    .removeClass("animate__fadeInRight")
    .addClass("animate__animated animate__fadeOutRight animate");

  setTimeout(() => {
    $("header nav#nav-esq ul#menu-principal")
      .css("display", "none")
      .removeClass("animate__fadeOutRight");
  }, 500);

  // Remove a classe 'ativo' para os ícones voltarem ao normal
  $("header nav#nav-esq ul#icone-menu").removeClass("ativo");
  $("body").removeClass("no-scroll");
}

let controle = true;
$("header nav#nav-esq ul#icone-menu").click(function () {
  if (controle == true) {
    mostramenu();
    controle = false;
  } else {
    escondermenu();
    controle = true;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const windContainer = document.getElementById("wind-container");

  const windDensity = 180;

  function createWindLine() {
    const line = document.createElement("div");
    line.classList.add("wind-line");

    const positionPercent = Math.random() * 50 + 25;
    line.style.left = positionPercent + "%";

    let curveDirection = positionPercent < 50 ? -1 : 1;

    line.style.setProperty("--curve-dir", curveDirection);

    const height = Math.random() * 300 + 250;
    line.style.height = height + "px";

    const duration = Math.random() * 0.6 + 0.5;

    const randomOpacity = Math.random() * 0.5 + 0.2;
    line.style.setProperty("--wind-opacity", randomOpacity);

    line.style.animation = `windDrop ${duration}s ease-in infinite`;

    windContainer.appendChild(line);

    setTimeout(
      () => {
        line.remove();
      },
      duration * 1000 + 100,
    );
  }

  setInterval(createWindLine, windDensity);
});
$(window).resize(function () {
  if ($(window).width() > 630) {
    // Se a tela for maior que 630px, remove o display: flex/none e as animações
    $("header nav#nav-esq ul#menu-principal").css("display", "");
    $("header nav#nav-esq ul#menu-principal").removeClass(
      "animate__animated animate__fadeInRight animate__fadeOutRight",
    );

    // Reseta o controle do menu hamburguer
    controle = true;
    $("header nav#nav-esq ul#icone-menu").removeClass("ativo");
  }
});
