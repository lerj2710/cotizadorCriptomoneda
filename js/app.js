
import {criptomonedasSelect ,formulario, monedaSelect} from './selectores.js';
import {consultarCriptomoneda, submitFormulario, leerValor} from './funciones.js';

window.onload = ()=>{
  consultarCriptomoneda();
  criptomonedasSelect.addEventListener('change', leerValor);
  monedaSelect.addEventListener('change', leerValor);
  formulario.addEventListener('submit', submitFormulario);
};



