const generateweather = async function (event) {

    event.preventDefault();

    var rootImg = $("#root");
    rootImg.empty();

    
    var lat = "" + $("#latitude").val();
    var long =  "" +document.getElementById("longitude").value;
    const result = await axios({
        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        params: {lon: long, lat: lat, units: 'imperial', lang: 'en'},
        headers: {
          'x-rapidapi-key': '2800d53380msh8f72c6375618846p12e496jsn98db37572e60',
          'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
      
    });

    let array = {};
    array =result.data.data;
    console.log(array);
    console.log(array[0].temp)


    let area = $(`
    <table class="table is-hoverable">
    <thead>
      <tr>
        <th>Attribute</th>
        <th></th>
        <th></th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Temperature</td>
        <td></td>
        <td></td>
        <td> ${array[0].temp} </td>
      </tr>
      <tr>
        <td>TimeZone</td>
        <td></td>
        <td></td>
        <td>${array[0].timezone}</td>
      </tr>
      <tr>
        <td>Weather</td>
        <td></td>
        <td></td>
        <td>${array[0].weather.description}</td>
      </tr>
      <tr>
        <td>Humidity%</td>
        <td></td>
        <td></td>
        <td>${array[0].rh}</td>
      </tr>
      <tr>
        <td>Cloud Coverage</td>
        <td></td>
        <td></td>
        <td>${array[0].clouds}</td>
      </tr>
    </tbody>
  </table>
    
    `);

    rootImg.append(area);
  
}

$(document).ready(function () {

    let body = $("body");

    body.on("click", "#submitCoord", generateweather);

});