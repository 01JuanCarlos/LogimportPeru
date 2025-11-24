

import AOS from "aos";
import "aos/dist/aos.css";

export default function initAOS() {
  AOS.init({
    duration: 800,        // duración de la animación en ms
    easing: 'ease-out',   // tipo de aceleración
    once: true,           // anima solo la primera vez (true/false)
    offset: 120,          // distancia antes de activar la animación
    delay: 0,             // retraso
    mirror: false         // si repite al hacer scroll hacia arriba
  });

}
