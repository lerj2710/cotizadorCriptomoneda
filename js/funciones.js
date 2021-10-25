import {criptomonedasSelect} from './selectores.js';

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