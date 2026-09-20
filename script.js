const escenas = {
    portada: document.getElementById("portada"),
    dedicatoria: document.getElementById("dedicatoria"),
    flores: document.getElementById("segundaEscena"),
    carta: document.getElementById("escenaCarta"),
    mensaje: document.getElementById("escenaMensaje"),
    siguiente: document.getElementById("escenaSiguiente"),
    creditos: document.getElementById("escenaCreditos")
};

const transicionLuz =
    document.getElementById("transicionLuz");

const audioFondo =
    document.getElementById("audioFondo");

if (audioFondo) {
    audioFondo.volume = 0.12;
}

const btnVerRegalo =
    document.getElementById("btnVerRegalo");

const btnRegresarDedicatoria =
    document.getElementById(
        "btnRegresarDedicatoria"
    );

const btnIrFlores =
    document.getElementById("btnIrFlores");

const btnRegresarFlores =
    document.getElementById(
        "btnRegresarFlores"
    );

const btnIrCarta =
    document.getElementById("btnIrCarta");

const btnRegresarCarta =
    document.getElementById(
        "btnRegresarCarta"
    );

const btnRegresarMensaje =
    document.getElementById(
        "btnRegresarMensaje"
    );

const btnContinuarMensaje =
    document.getElementById(
        "btnContinuarMensaje"
    );

const btnContinuarCarta =
    document.getElementById(
        "btnContinuarCarta"
    );

const btnCartaCompleta =
    document.getElementById(
        "btnCartaCompleta"
    );

const btnEnd =
    document.getElementById("btnEnd");

const sobre =
    document.getElementById("sobre");

const cartaContenido =
    document.getElementById(
        "cartaContenido"
    );

const textoCarta =
    document.getElementById("textoCarta");

const marcoFoto =
    document.getElementById("marcoFoto");

const textoMensaje =
    document.getElementById("textoMensaje");

const contadorFinal =
    document.getElementById(
        "contadorFinal"
    );

const escenaSiguiente =
    escenas.siguiente;

const escenaCreditos =
    escenas.creditos;

const mensajeFlor =
    document.getElementById("mensajeFlor");

const floresOrbitales =
    document.querySelectorAll(
        ".flor-orbital"
    );

let escenaActual =
    escenas.portada;

let temporizadorContador = null;
let temporizadorCreditos = null;
let temporizadorLluvia = null;
let intervaloLluvia = null;
let temporizadorCarta = null;
let temporizadorFoto = null;
let temporizadorBotonCarta = null;
let temporizadorMensaje = null;
let temporizadorMensajeFlor = null;
let temporizadorReanudarScrollCarta = null;
let seguirScrollCarta = true;
let animacionScrollCarta = null;

let cartaEscrita = false;
let mensajeEscrito = false;
let audioIniciado = false;

const textoDeLaCarta = `Alisson,

Tal vez esto no sea algo grande, y tal vez no sea la forma en la que pensaba hacerlo hace unos meses atrás... pero es lo más cercano a darte un lindo detalle por el inicio de la Primavera 🌸 y los nuevos comienzos 🌼✨

Seguramente hayas o estés comenzando nuevos comienzos como la Uni 📚 y esas cosas, y aunque puede ser un poco estresante y agobiante 😮‍💨, sé que puedes hacer eso y mucho más súper bien 💪

Ya que aparte de ser extremadamente hermosa 😍 eres súper aplicada y responsable, y eso se veía reflejado cuando fuiste Abanderada del Pabellón Institucional del colegio y para mí, la mejor por cierto 🤗👑

Espero haberte hecho sonreír, tal vez no tanto como sonrío yo al acordarme de ti cuando veo cosas lindas, ya que te veo reflejada en toda cosa linda que puede existir 🥹🌹💛

Con cariño,
Omar.`;

const textoDelMensaje = `Y si llegaste hasta aquí...

todavía queda una última parte de esta historia.

Porque algunas historias no terminan cuando llegamos a la última página.

Simplemente esperan a que escribamos la siguiente.`;

function iniciarAudioFondo() {

    if (
        audioIniciado ||
        !audioFondo
    ) {
        return;
    }

    audioFondo.volume =
        0.12;

    audioFondo.play()
        .then(() => {
            audioIniciado = true;
        })
        .catch(() => {
            /* El navegador puede exigir otra interacción antes de reproducir. */
        });
}

document.addEventListener(
    "pointerdown",
    iniciarAudioFondo
);

document.addEventListener(
    "click",
    iniciarAudioFondo
);

function activarTransicion(callback) {

    transicionLuz.classList.remove(
        "activa"
    );

    void transicionLuz.offsetWidth;

    transicionLuz.classList.add(
        "activa"
    );

    setTimeout(() => {

        callback();

    }, 620);

    setTimeout(() => {

        transicionLuz.classList.remove(
            "activa"
        );

    }, 1400);
}

function mostrarEscena(nuevaEscena) {

    if (
        !nuevaEscena ||
        nuevaEscena === escenaActual
    ) {
        return;
    }

    cancelarProcesosDeEscena();

    activarTransicion(() => {

        Object.values(escenas).forEach(
            escena => {

                escena.classList.remove(
                    "activa"
                );

            }
        );

        nuevaEscena.classList.add(
            "activa"
        );

        escenaActual =
            nuevaEscena;

        activarVideosDeEscena(
            nuevaEscena
        );

        if (
            nuevaEscena ===
            escenas.carta
        ) {

            prepararCarta();

        }

        if (
            nuevaEscena ===
            escenas.mensaje
        ) {

            prepararMensaje();

        }

        if (
            nuevaEscena ===
            escenas.siguiente
        ) {

            iniciarEscenaFinal();

        }

        if (
            nuevaEscena ===
            escenas.creditos
        ) {

            iniciarCreditos();

        }

    });
}

function cancelarProcesosDeEscena() {

    if (animacionScrollCarta) {

        cancelAnimationFrame(
            animacionScrollCarta
        );

        animacionScrollCarta =
            null;
    }

    if (temporizadorCarta) {

        clearTimeout(
            temporizadorCarta
        );

        temporizadorCarta =
            null;
    }

    if (temporizadorFoto) {

        clearTimeout(
            temporizadorFoto
        );

        temporizadorFoto =
            null;
    }

    if (temporizadorBotonCarta) {

        clearTimeout(
            temporizadorBotonCarta
        );

        temporizadorBotonCarta =
            null;
    }

    if (temporizadorReanudarScrollCarta) {

        clearTimeout(
            temporizadorReanudarScrollCarta
        );

        temporizadorReanudarScrollCarta =
            null;
    }

    if (temporizadorMensaje) {

        clearTimeout(
            temporizadorMensaje
        );

        temporizadorMensaje =
            null;
    }

    if (temporizadorMensajeFlor) {

        clearTimeout(
            temporizadorMensajeFlor
        );

        temporizadorMensajeFlor =
            null;
    }

    if (temporizadorContador) {

        clearInterval(
            temporizadorContador
        );

        temporizadorContador =
            null;
    }

    detenerLluviaFlores();
}

function activarVideosDeEscena(escena) {

    document
        .querySelectorAll("video")
        .forEach(video => {

            const pertenece =
                escena.contains(video);

            if (pertenece) {

                video.play().catch(
                    () => {}
                );

            } else {

                video.pause();

            }

        });
}

function activarVideosTransparentes() {

    const videos =
        document.querySelectorAll(
            "video[data-key-white]"
        );

    videos.forEach(video => {

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.className =
            "flor-video-canvas";

        if (
            video.classList.contains(
                "stitch-lluvia"
            )
        ) {
            canvas.classList.add(
                "stitch-lluvia-canvas"
            );
        }

        const contexto =
            canvas.getContext(
                "2d",
                {
                    willReadFrequently: true
                }
            );

        video.style.display =
            "none";

        video.parentElement.appendChild(
            canvas
        );

        let ancho = 0;
        let alto = 0;

        function dibujar() {

            if (
                video.readyState <
                HTMLMediaElement.HAVE_CURRENT_DATA
            ) {

                requestAnimationFrame(
                    dibujar
                );

                return;
            }

            if (
                video.videoWidth !== ancho ||
                video.videoHeight !== alto
            ) {

                ancho =
                    video.videoWidth ||
                    1280;

                alto =
                    video.videoHeight ||
                    720;

                canvas.width =
                    ancho;

                canvas.height =
                    alto;
            }

            if (
                !ancho ||
                !alto
            ) {

                requestAnimationFrame(
                    dibujar
                );

                return;
            }

            contexto.drawImage(
                video,
                0,
                0,
                ancho,
                alto
            );

            const imagen =
                contexto.getImageData(
                    0,
                    0,
                    ancho,
                    alto
                );

            const datos =
                imagen.data;

            for (
                let i = 0;
                i < datos.length;
                i += 4
            ) {

                const rojo =
                    datos[i];

                const verde =
                    datos[i + 1];

                const azul =
                    datos[i + 2];

                const brillo =
                    (
                        rojo +
                        verde +
                        azul
                    ) / 3;

                const diferencia =
                    Math.max(
                        rojo,
                        verde,
                        azul
                    ) -
                    Math.min(
                        rojo,
                        verde,
                        azul
                    );

                if (
                    brillo > 225 &&
                    diferencia < 24
                ) {

                    datos[i + 3] =
                        0;

                } else if (
                    brillo > 205 &&
                    diferencia < 35
                ) {

                    const opacidad =
                        Math.max(
                            0,
                            255 -
                            (
                                (
                                    brillo -
                                    205
                                ) * 5
                            )
                        );

                    datos[i + 3] =
                        Math.min(
                            datos[i + 3],
                            opacidad
                        );
                }
            }

            contexto.putImageData(
                imagen,
                0,
                0
            );

            requestAnimationFrame(
                dibujar
            );
        }

        video.addEventListener(
            "loadedmetadata",
            () => {

                ancho =
                    video.videoWidth;

                alto =
                    video.videoHeight;

                canvas.width =
                    ancho || 1280;

                canvas.height =
                    alto || 720;

                video.play().catch(
                    () => {}
                );

            }
        );

        dibujar();

    });
}

function quitarFondoBlancoFlores() {

    document
        .querySelectorAll(
            "img.flor-orbital-icono, .flor-lluvia img"
        )
        .forEach(imagen => {

            if (
                imagen.dataset.transparente ===
                "true"
            ) {
                return;
            }

            const procesar = () => {

                if (
                    imagen.dataset.transparente ===
                    "true" ||
                    !imagen.naturalWidth
                ) {
                    return;
                }

                const canvas =
                    document.createElement(
                        "canvas"
                    );

                canvas.width =
                    imagen.naturalWidth;

                canvas.height =
                    imagen.naturalHeight;

                const contexto =
                    canvas.getContext(
                        "2d",
                        {
                            willReadFrequently: true
                        }
                    );

                if (!contexto) {
                    return;
                }

                contexto.drawImage(
                    imagen,
                    0,
                    0
                );

                const fotograma =
                    contexto.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                const pixeles =
                    fotograma.data;

                for (
                    let indice = 0;
                    indice < pixeles.length;
                    indice += 4
                ) {

                    const rojo =
                        pixeles[indice];

                    const verde =
                        pixeles[indice + 1];

                    const azul =
                        pixeles[indice + 2];

                    const minimo =
                        Math.min(
                            rojo,
                            verde,
                            azul
                        );

                    const diferencia =
                        Math.max(
                            rojo,
                            verde,
                            azul
                        ) - minimo;

                    if (
                        minimo > 238 &&
                        diferencia < 24
                    ) {
                        pixeles[indice + 3] = 0;
                    } else if (
                        minimo > 215 &&
                        diferencia < 30
                    ) {
                        pixeles[indice + 3] =
                            Math.max(
                                0,
                                255 -
                                (
                                    minimo -
                                    215
                                ) *
                                10
                            );
                    }
                }

                contexto.putImageData(
                    fotograma,
                    0,
                    0
                );

                imagen.src =
                    canvas.toDataURL(
                        "image/png"
                    );

                imagen.dataset.transparente =
                    "true";
            };

            if (imagen.complete) {
                procesar();
            } else {
                imagen.addEventListener(
                    "load",
                    procesar,
                    { once: true }
                );
            }
        });
}

function prepararCarta() {

    if (temporizadorCarta) {

        clearTimeout(
            temporizadorCarta
        );

        temporizadorCarta =
            null;
    }

    if (temporizadorFoto) {

        clearTimeout(
            temporizadorFoto
        );

        temporizadorFoto =
            null;
    }

    if (temporizadorBotonCarta) {

        clearTimeout(
            temporizadorBotonCarta
        );

        temporizadorBotonCarta =
            null;
    }

    sobre.classList.remove(
        "abierto"
    );

    cartaContenido.classList.remove(
        "visible"
    );

    marcoFoto.classList.remove(
        "visible"
    );

    btnContinuarCarta.classList.remove(
        "visible"
    );

    btnCartaCompleta.classList.remove(
        "visible"
    );

    seguirScrollCarta = true;

    if (temporizadorReanudarScrollCarta) {

        clearTimeout(
            temporizadorReanudarScrollCarta
        );

        temporizadorReanudarScrollCarta =
            null;
    }

    textoCarta.textContent =
        "";

    cartaEscrita =
        false;
}

function abrirCarta() {

    if (
        escenaActual !==
        escenas.carta
    ) {
        return;
    }

    if (
        sobre.classList.contains(
            "abierto"
        )
    ) {
        return;
    }

    sobre.classList.add(
        "abierto"
    );

    setTimeout(() => {

        if (
            escenaActual !==
            escenas.carta
        ) {
            return;
        }

        cartaContenido.classList.add(
            "visible"
        );

        btnCartaCompleta.classList.add(
            "visible"
        );

        escribirCarta();

    }, 750);
}

function escribirCarta() {

    if (temporizadorCarta) {

        clearTimeout(
            temporizadorCarta
        );

        temporizadorCarta =
            null;
    }

    cartaEscrita =
        false;

    let indice = 0;

    textoCarta.textContent =
        "";

    const velocidadBase = 31.5;

    function escribir() {

        if (
            escenaActual !==
            escenas.carta
        ) {

            return;
        }

        if (
            indice >=
            textoDeLaCarta.length
        ) {

            temporizadorCarta =
                null;

            cartaEscrita =
                true;

            mostrarFotoDespuesDeCarta();

            return;
        }

        const caracter =
            textoDeLaCarta[indice];

        textoCarta.textContent +=
            caracter;

        indice++;

        const hoja =
            cartaContenido.querySelector(
                ".hoja-carta"
            );

        if (
            hoja &&
            seguirScrollCarta
        ) {

            desplazarCartaSuavemente(hoja);
        }

        function desplazarCartaSuavemente(hoja) {

            if (animacionScrollCarta) {
                return;
            }

            function avanzar() {

                const distancia =
                    hoja.scrollHeight -
                    hoja.clientHeight -
                    hoja.scrollTop;

                if (
                    !seguirScrollCarta ||
                    distancia <= 1
                ) {
                    animacionScrollCarta = null;
                    return;
                }

                hoja.scrollTop += Math.max(
                0.55,
                distancia * 0.06
                );

                animacionScrollCarta =
                    requestAnimationFrame(avanzar);
            }

            animacionScrollCarta =
                requestAnimationFrame(avanzar);
        }

        temporizadorCarta =
            setTimeout(
                escribir,
                velocidadBase +
                (
                    ".!?;\n".includes(caracter)
                        ? 112
                        : Math.random() * 9
                )
            );
    }

    function pausarSeguimientoScrollCarta() {

        seguirScrollCarta = false;

        if (animacionScrollCarta) {

            cancelAnimationFrame(
                animacionScrollCarta
            );

            animacionScrollCarta =
                null;
        }

        if (temporizadorReanudarScrollCarta) {

            clearTimeout(
                temporizadorReanudarScrollCarta
            );
        }

        temporizadorReanudarScrollCarta =
            setTimeout(() => {

                temporizadorReanudarScrollCarta =
                    null;

                if (
                    escenaActual !==
                    escenas.carta
                ) {
                    return;
                }

                seguirScrollCarta = true;

                const hoja =
                    cartaContenido.querySelector(
                        ".hoja-carta"
                    );

                if (hoja) {

                    desplazarCartaSuavemente(hoja);
                }

            }, 3000);
    }

    function completarCarta() {

        if (
            escenaActual !==
            escenas.carta
        ) {
            return;
        }

        if (temporizadorCarta) {

            clearTimeout(
                temporizadorCarta
            );

            temporizadorCarta =
                null;
        }

        textoCarta.textContent =
            textoDeLaCarta;

        cartaEscrita =
            true;

        seguirScrollCarta = true;

        btnCartaCompleta.classList.remove(
            "visible"
        );

        mostrarFotoDespuesDeCarta();
    }

    const hojaCarta =
        cartaContenido.querySelector(
            ".hoja-carta"
        );

    if (hojaCarta) {

        hojaCarta.addEventListener(
            "wheel",
            pausarSeguimientoScrollCarta,
            { passive: true }
        );

        hojaCarta.addEventListener(
            "touchmove",
            pausarSeguimientoScrollCarta,
            { passive: true }
        );

        hojaCarta.addEventListener(
            "keydown",
            (evento) => {

                if (
                    [
                        "ArrowUp",
                        "ArrowDown",
                        "PageUp",
                        "PageDown",
                        "Home",
                        "End",
                        " "
                    ].includes(evento.key)
                ) {
                    pausarSeguimientoScrollCarta();
                }
            }
        );
    }

    window.addEventListener(
        "keydown",
        (evento) => {

            if (
                escenaActual !==
                escenas.carta
            ) {
                return;
            }

            if (
                [
                    "ArrowUp",
                    "ArrowDown",
                    "PageUp",
                    "PageDown",
                    "Home",
                    "End",
                    " "
                ].includes(evento.key)
            ) {
                pausarSeguimientoScrollCarta();
            }
        }
    );

    btnCartaCompleta.addEventListener(
        "click",
        completarCarta
    );

    escribir();
}

function mostrarFotoDespuesDeCarta() {

    if (
        escenaActual !==
        escenas.carta
    ) {
        return;
    }

    if (temporizadorFoto) {

        clearTimeout(
            temporizadorFoto
        );
    }

    temporizadorFoto =
        setTimeout(() => {

            temporizadorFoto =
                null;

            if (
                escenaActual !==
                escenas.carta
            ) {
                return;
            }

            marcoFoto.classList.add(
                "visible"
            );

            temporizadorBotonCarta =
                setTimeout(() => {

                    temporizadorBotonCarta =
                        null;

                    if (
                        escenaActual !==
                        escenas.carta
                    ) {
                        return;
                    }

                    btnContinuarCarta.classList.add(
                        "visible"
                    );

                }, 1250);

        }, 450);
}

function prepararMensaje() {

    if (temporizadorMensaje) {

        clearTimeout(
            temporizadorMensaje
        );

        temporizadorMensaje =
            null;
    }

    textoMensaje.textContent =
        "";

    mensajeEscrito =
        false;
}

function escribirMensaje() {

    if (temporizadorMensaje) {

        clearTimeout(
            temporizadorMensaje
        );

        temporizadorMensaje =
            null;
    }

    mensajeEscrito =
        false;

    let indice = 0;

    textoMensaje.textContent =
        "";

    function escribir() {

        if (
            escenaActual !==
            escenas.mensaje
        ) {

            return;
        }

        if (
            indice >=
            textoDelMensaje.length
        ) {

            temporizadorMensaje =
                null;

            mensajeEscrito =
                true;

            return;
        }

        textoMensaje.textContent +=
            textoDelMensaje[indice];

        indice++;

        temporizadorMensaje =
            setTimeout(
                escribir,
                25
            );
    }

    escribir();
}

function iniciarEscenaFinal() {

    detenerLluviaFlores();

    if (temporizadorContador) {

        clearInterval(
            temporizadorContador
        );

        temporizadorContador =
            null;
    }

    escenaSiguiente.classList.remove(
        "mostrar-final"
    );

    contadorFinal.style.display =
        "flex";

    contadorFinal.style.opacity =
        "1";

    contadorFinal.style.visibility =
        "visible";

    let contador = 5;

    contadorFinal.textContent =
        contador;

    temporizadorContador =
        setInterval(() => {

            if (
                escenaActual !==
                escenas.siguiente
            ) {

                clearInterval(
                    temporizadorContador
                );

                temporizadorContador =
                    null;

                return;
            }

            contador--;

            if (contador <= 0) {

                clearInterval(
                    temporizadorContador
                );

                temporizadorContador =
                    null;

                contadorFinal.style.opacity =
                    "0";

                setTimeout(() => {

                    if (
                        escenaActual !==
                        escenas.siguiente
                    ) {
                        return;
                    }

                    contadorFinal.style.display =
                        "none";

                    escenaSiguiente.classList.add(
                        "mostrar-final"
                    );

                    setTimeout(() => {

                        if (
                            escenaActual ===
                            escenas.siguiente
                        ) {

                            iniciarLluviaFlores();

                            temporizadorLluvia =
                                setTimeout(() => {

                                    if (
                                        escenaActual ===
                                        escenas.siguiente
                                    ) {

                                        detenerLluviaFlores();

                                        mostrarEscena(
                                            escenaCreditos
                                        );

                                    }

                                }, 11000);

                        }

                    }, 1000);

                }, 450);

                return;
            }

            contadorFinal.textContent =
                contador;

        }, 1000);
}

function crearFlorLluvia() {

    if (
        escenaActual !==
        escenas.siguiente
    ) {
        return;
    }

    const contenedor =
        document.getElementById(
            "lluviaFlores"
        );

    if (!contenedor) {
        return;
    }

    const flor =
        document.createElement(
            "div"
        );

    flor.className =
        "flor-lluvia";

    flor.setAttribute(
        "aria-hidden",
        "true"
    );

    const imagen =
        document.createElement("img");

    imagen.src =
        "Img/Flor-p.png";

    imagen.alt =
        "";

    flor.appendChild(imagen);

    const izquierda =
        Math.random() * 100;

    const duracion =
        5 +
        Math.random() * 5;

    const tamaño =
        18 +
        Math.random() * 18;

    flor.style.left =
        izquierda + "%";

    flor.style.width =
        tamaño + "px";

    flor.style.height =
        tamaño + "px";

    flor.style.animationDuration =
        duracion + "s";

    flor.style.animationDelay =
        "0s";

    contenedor.appendChild(
        flor
    );

    quitarFondoBlancoFlores();

    setTimeout(() => {

        flor.remove();

    }, (duracion + 1) * 1000);
}

function iniciarLluviaFlores() {

    detenerLluviaFlores();

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        setTimeout(() => {

            crearFlorLluvia();

        }, i * 180);

    }

    intervaloLluvia =
        setInterval(() => {

            crearFlorLluvia();

        }, 280);
}

function detenerLluviaFlores() {

    if (intervaloLluvia) {

        clearInterval(
            intervaloLluvia
        );

        intervaloLluvia =
            null;
    }

    if (temporizadorLluvia) {

        clearTimeout(
            temporizadorLluvia
        );

        temporizadorLluvia =
            null;
    }

    const contenedor =
        document.getElementById(
            "lluviaFlores"
        );

    if (contenedor) {

        contenedor.innerHTML =
            "";

    }
}

function iniciarCreditos() {

    if (temporizadorCreditos) {

        clearTimeout(
            temporizadorCreditos
        );

        temporizadorCreditos =
            null;
    }

    escenaCreditos.classList.remove(
        "apertura-creditos"
    );

    void escenaCreditos.offsetWidth;

    escenaCreditos.classList.add(
        "apertura-creditos"
    );
}

floresOrbitales.forEach(
    flor => {

        flor.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const mensaje =
                    flor.dataset.mensaje;

                mensajeFlor.textContent =
                    mensaje;

                mensajeFlor.classList.add(
                    "visible"
                );

                if (
                    temporizadorMensajeFlor
                ) {

                    clearTimeout(
                        temporizadorMensajeFlor
                    );

                }

                temporizadorMensajeFlor =
                    setTimeout(() => {

                        mensajeFlor.classList.remove(
                            "visible"
                        );

                    }, 6500);

            }
        );

    }
);

btnVerRegalo.addEventListener(
    "click",
    () => {

        mostrarEscena(
            escenas.dedicatoria
        );

    }
);

btnRegresarDedicatoria.addEventListener(
    "click",
    () => {

        mostrarEscena(
            escenas.portada
        );

    }
);

btnIrFlores.addEventListener(
    "click",
    () => {

        mostrarEscena(
            escenas.flores
        );

    }
);

btnRegresarFlores.addEventListener(
    "click",
    () => {

        mostrarEscena(
            escenas.dedicatoria
        );

    }
);

btnIrCarta.addEventListener(
    "click",
    () => {

        mostrarEscena(
            escenas.carta
        );

    }
);

btnRegresarCarta.addEventListener(
    "click",
    () => {

        mostrarEscena(
            escenas.flores
        );

    }
);

sobre.addEventListener(
    "click",
    abrirCarta
);

btnContinuarCarta.addEventListener(
    "click",
    () => {

        mostrarEscena(
            escenas.mensaje
        );

    }
);

btnRegresarMensaje.addEventListener(
    "click",
    () => {

        mostrarEscena(
            escenas.carta
        );

    }
);

btnContinuarMensaje.addEventListener(
    "click",
    () => {

        mostrarEscena(
            escenas.siguiente
        );

    }
);

btnEnd.addEventListener(
    "click",
    () => {

        location.reload();

    }
);

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            escenaActual !==
            escenas.portada
        ) {

            mostrarEscena(
                escenas.portada
            );

        }

    }
);

window.addEventListener(
    "resize",
    () => {

        if (
            escenaActual ===
            escenas.flores
        ) {

            const jardin =
                document.querySelector(
                    ".jardin"
                );

            if (jardin) {

                jardin.style.transform =
                    "translateZ(0)";

            }

        }

    }
);

activarVideosTransparentes();
quitarFondoBlancoFlores();

activarVideosDeEscena(
    escenas.portada
);