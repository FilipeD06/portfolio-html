document.addEventListener("DOMContentLoaded", function () {
    configurarTema();
    configurarMenu();
    configurarFormulario();
});

function configurarTema() {
    var botaoTema = document.getElementById("botaoTema");
    var temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("tema-escuro");
        botaoTema.textContent = "☀️";
    }

    botaoTema.addEventListener("click", function () {
        document.body.classList.toggle("tema-escuro");

        if (document.body.classList.contains("tema-escuro")) {
            localStorage.setItem("tema", "escuro");
            botaoTema.textContent = "☀️";
        } else {
            localStorage.setItem("tema", "claro");
            botaoTema.textContent = "🌙";
        }
    });
}

function configurarMenu() {
    var botaoMenu = document.getElementById("botaoMenu");
    var menu = document.getElementById("menuNavegacao");

    if (!botaoMenu || !menu) {
        return;
    }

    botaoMenu.addEventListener("click", function () {
        menu.classList.toggle("aberto");
    });

    var links = menu.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
            menu.classList.remove("aberto");
        });
    }
}

function configurarFormulario() {
    var formulario = document.getElementById("formularioContato");

    if (!formulario) {
        return;
    }

    var campoNome = document.getElementById("nome");
    var campoEmail = document.getElementById("email");
    var campoMensagem = document.getElementById("mensagem");
    var erroNome = document.getElementById("erroNome");
    var erroEmail = document.getElementById("erroEmail");
    var erroMensagem = document.getElementById("erroMensagem");
    var modal = document.getElementById("modalSucesso");
    var fecharModal = document.getElementById("fecharModal");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var valido = true;

        erroNome.textContent = "";
        erroEmail.textContent = "";
        erroMensagem.textContent = "";
        campoNome.classList.remove("invalido");
        campoEmail.classList.remove("invalido");
        campoMensagem.classList.remove("invalido");

        if (campoNome.value.trim() === "") {
            erroNome.textContent = "Preencha o nome.";
            campoNome.classList.add("invalido");
            valido = false;
        }

        if (campoEmail.value.trim() === "") {
            erroEmail.textContent = "Preencha o e-mail.";
            campoEmail.classList.add("invalido");
            valido = false;
        } else if (!emailValido(campoEmail.value.trim())) {
            erroEmail.textContent = "Informe um e-mail válido (ex: usuario@dominio.com).";
            campoEmail.classList.add("invalido");
            valido = false;
        }

        if (campoMensagem.value.trim() === "") {
            erroMensagem.textContent = "Preencha a mensagem.";
            campoMensagem.classList.add("invalido");
            valido = false;
        }

        if (!valido) {
            return;
        }

        campoNome.value = "";
        campoEmail.value = "";
        campoMensagem.value = "";

        modal.classList.add("ativo");
    });

    fecharModal.addEventListener("click", function () {
        modal.classList.remove("ativo");
    });

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            modal.classList.remove("ativo");
        }
    });
}

function emailValido(email) {
    var padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
}
