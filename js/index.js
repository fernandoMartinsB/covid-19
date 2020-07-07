
var body = document.querySelector('body');
var headerList = body.querySelector('#header-list');
var regionsList = body.querySelector('#regions-list');
HttpService.get('https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalGeralApi', (response) => {
   let confirmed = null;
   let deaths = null;
   if(response.hasOwnProperty('confirmados') && response.hasOwnProperty('obitos')) {
       confirmed = response.confirmados;
       deaths = response.obitos;
       let confirmedTotal = document.createElement('div');
       confirmedTotal.innerHTML = `<span class="title">Confirmados</span><br><span class="description">${this.formatNumber(confirmed.total)}</span>`;
       let confirmedRecovered = document.createElement('div');
       confirmedRecovered.innerHTML = `<span class="title">Recuperados</span><br><span class="description">${this.formatNumber(confirmed.recuperados)}</span>`;
       let confirmedInFollowUP = document.createElement('div');
       confirmedInFollowUP.innerHTML = `<span class="title">Em Acompanhamento</span><br><span class="description">${this.formatNumber(confirmed.acompanhamento)}</span>`;
       let deathsTotal = document.createElement('div');
       deathsTotal.innerHTML = `<span class="title">Óbitos</span><br><span class="description">${this.formatNumber(deaths.total)}</span>`;
       headerList.appendChild(confirmedTotal);
       headerList.appendChild(confirmedRecovered);
       headerList.appendChild(confirmedInFollowUP);
       headerList.appendChild(deathsTotal);
   }
});

HttpService.get('https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalRegiaoUf', (response) => {
   if(response) {
      let list = document.createElement('ul');
      Object.keys(response).forEach((element) => {
         if(!Array.isArray(response[element])) {
            let region = document.createElement('li');
            let statesList = document.createElement('ul');
            region.innerHTML = element;
            Object.keys(response[element]).forEach(elementItem => {
               let state = document.createElement('li');
               state.innerHTML = elementItem;
               let stateUl = document.createElement('ul');
               let stateTotal = document.createElement('li');
               stateTotal.innerHTML = `Casos Acumulados : ${this.formatNumber(response[element][elementItem].semana[response[element][elementItem].semana.length -1].casosAcumulado)}`;
               let stateDeath = document.createElement('li');
               stateDeath.innerHTML = `Obitos Acumulados : ${this.formatNumber(response[element][elementItem].semana[response[element][elementItem].semana.length -1].obitosAcumulado)}`;
               stateUl.appendChild(stateTotal);
               stateUl.appendChild(stateDeath);
               state.appendChild(stateUl);
               statesList.appendChild(state);
            });
            region.appendChild(statesList);
            list.appendChild(region);
         }
      });
      regionsList.appendChild(list);
   }
});

function formatNumber(number) {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}