import {criptomonedasSelect, formulario, resultado} from './selectores.js';

const objBusqueda ={
    moneda: '',
    criptomoneda: ''
};

const objetenerCriptomoneda= criptomonedas=> new Promise( resolve =>{
    resolve(criptomonedas);
});

export async function consultarCriptomoneda(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    try {
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const criptomonedas = await objetenerCriptomoneda(resultado.Data)
            slectCriptomoneda(criptomonedas)
        } catch (error) {
            console.log(error);
        }
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

async function consultarAPI (){
    const {moneda, criptomoneda}= objBusqueda;

   const  url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
   mostrartSpinner();


    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
             mostarCotizacion(resultado.DISPLAY[criptomoneda][moneda])
    } catch (error) {
        console.log(error);
    }
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

function mostrartSpinner() {
    const spinner = document.createElement('div');
          spinner.classList.add('spinner');
          spinner.innerHTML = `
          <div></div>
          `;
          resultado.appendChild(spinner);
}