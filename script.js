/* ==============================
   CONTROLE DE ACESSIBILIDADE
============================== */

const body = document.body;

const aumentarFonte = document.getElementById("aumentarFonte");
const diminuirFonte = document.getElementById("diminuirFonte");
const contraste = document.getElementById("contraste");
const espacamento = document.getElementById("espacamento");

const ouvir = document.getElementById("ouvir");
const parar = document.getElementById("parar");

const texto = document.getElementById("texto");


/* ==============================
   TAMANHO DA FONTE
============================== */

let tamanhoFonte = 20;

const TAMANHO_MINIMO = 16;
const TAMANHO_MAXIMO = 32;
const PASSO = 2;


function atualizarFonte() {
    document.documentElement.style.setProperty(
        "--tamanho-base",
        `${tamanhoFonte}px`
    );
}


aumentarFonte.addEventListener("click", () => {

    if (tamanhoFonte < TAMANHO_MAXIMO) {
        tamanhoFonte += PASSO;
        atualizarFonte();
    }

});


diminuirFonte.addEventListener("click", () => {

    if (tamanhoFonte > TAMANHO_MINIMO) {
        tamanhoFonte -= PASSO;
        atualizarFonte();
    }

});


/* ==============================
   ALTO CONTRASTE
============================== */

contraste.addEventListener("click", () => {

    body.classList.toggle("alto-contraste");

    const ativo = body.classList.contains("alto-contraste");

    contraste.setAttribute(
        "aria-pressed",
        ativo
    );

});


/* ==============================
   ESPAÇAMENTO DO TEXTO
============================== */

espacamento.addEventListener("click", () => {

    body.classList.toggle("espacamento-extra");

    const ativo = body.classList.contains("espacamento-extra");

    espacamento.setAttribute(
        "aria-pressed",
        ativo
    );

});


/* ==============================
   LEITURA DO TEXTO
============================== */

ouvir.addEventListener("click", () => {

    // Verifica se o navegador suporta síntese de voz
    if (!("speechSynthesis" in window)) {

        alert(
            "A leitura de texto não é compatível com este navegador."
        );

        return;
    }


    // Interrompe uma leitura anterior
    window.speechSynthesis.cancel();


    // Obtém somente o texto do artigo
    const conteudo = texto.innerText;


    const fala = new SpeechSynthesisUtterance(conteudo);


    // Idioma português do Brasil
    fala.lang = "pt-BR";


    // Velocidade confortável para leitura
    fala.rate = 0.9;


    // Tom da voz
    fala.pitch = 1;


    // Inicia a leitura
    window.speechSynthesis.speak(fala);

});


/* ==============================
   PARAR LEITURA
============================== */

parar.addEventListener("click", () => {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

});


/* ==============================
   PARAR A LEITURA AO SAIR DA PÁGINA
============================== */

window.addEventListener("beforeunload", () => {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

});