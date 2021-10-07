const jokePara = document.querySelector('.joke p');

const joke = document.querySelector('.joke');

const button = document.getElementById('btn');


button.addEventListener('click',getRandom);

getRandom();

async function getRandom(){


  
  const jokeFetch = await fetch('https://icanhazdadjoke.com/', {

    headers: {

      'Accept': 'application/json'

    }
  });



  const jeff = await jokeFetch.json();



  jokePara.innerHTML = jeff.joke;
}