import {criptomonedasSelect, formulario, resultado} from './selectores.js';

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
    limpiarHtnl();
   const {PRICE,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE,HIGHDAY}=cotizacion;
   const precio = document.createElement('p');
            precio.classList.add('precio');
            precio.innerHTML = `El precio es:<span>${PRICE}</span>`;
            
   const precioAlto = document.createElement('p');
         precioAlto.innerHTML=`El precio mas alto<span>${HIGHDAY}</span>`;
   
   const precioBajo = document.createElement('p');
        precioBajo.innerHTML=`El precio mas bajo<span>${LOWDAY}</span>`;
  
   const precioHoras = document.createElement('p');
         precioHoras.innerHTML=`ultimas horas 24 horas<span>${CHANGEPCT24HOUR}</span>`;
       
   const precioAcualizacion = document.createElement('p');
         precioAcualizacion.innerHTML=`ultima actualización <span>${LASTUPDATE}</span>`;

   resultado.appendChild(precio);
   resultado.appendChild(precioAlto);
   resultado.appendChild(precioBajo);
   resultado.appendChild(precioHoras);
   resultado.appendChild(precioAcualizacion);
};
function limpiarHtnl() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}