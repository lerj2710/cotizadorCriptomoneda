import {criptomonedasSelect, formulario} from './selectores.js';

const objBusqueda ={
    moneda: '',
    criptomoneda: ''
};

const objetenerCriptomoneda= criptomonedas=> new Promise( resolve =>{
    resolve(criptomonedas);
});

export function consultarCriptomoneda(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => objetenerCriptomoneda(resultado.Data))
        .then(criptomonedas => slectCriptomoneda(criptomonedas))
};

const slectCriptomoneda = criptomonedas =>{
    criptomonedas.forEach( cripto => {
        const {FullName, Name}= cripto.CoinInfo;

        const option = document.createElement('option');
        option.value= Name;
        option.textContent= FullName;
        criptomonedasSelect.appendChild(option);
    });
};
export function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
    // console.log(objBusqueda);
}
export function submitFormulario(e){
    e.preventDefault();

    //validar moneda

    const { moneda, criptomoneda} = objBusqueda;

    if (moneda === ''|| criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');
    }
    //consultar la API
    consultarAPI();
};

function mostrarAlerta(msg) {
    const existeError = document.querySelector('.error');
    if (!existeError) {
        
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        divMensaje.textContent = msg;
        formulario.appendChild(divMensaje);
        setTimeout(()=>{
            divMensaje.remove();
        },3000);
    }


};

const consultarAPI = ()=>{
    const {moneda, criptomoneda}= objBusqueda;

   const  url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
           mostarCotizacion(resultado.DISPLAY[criptomoneda][moneda])
        })
};

function mostarCotizacion(cotizacion) {
    console.log(cotizacion);
}