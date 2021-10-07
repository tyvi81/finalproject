const generateweather = async function (event) {

    event.preventDefault();

    var rootFetch = $("#root");
    rootFetch.empty();

    
    var latitude = "" + $("#latitude").val();

    var longitude =  "" +document.getElementById("longitude").value;

    const result = await axios({

        method: 'GET',

        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        params: {lon: longitude, lat: latitude, units: 'imperial', lang: 'en'},
        headers: {
          'x-rapidapi-key': '2800d53380msh8f72c6375618846p12e496jsn98db37572e60',
          'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
      
    });

    let arr = {};

    arr =result.data.data;
    


    let table = $(`
    <thead>
      <tr>
        <th>Categories</th>
        <th></th>
        <th></th>
        <th>Results</th>
      </tr>
    </thead>
    <tbody>
      
      <tr>
        <td>TimeZone</td>
        <td></td>
        <td></td>
        <td>${arr[0].timezone}</td>
      </tr>
      <tr>
        <td>Temperature</td>
        <td></td>
        <td></td>
        <td> ${arr[0].temp} </td>
      </tr>
      <tr>
        <td>Weather</td>
        <td></td>
        <td></td>
        <td>${arr[0].weather.description}</td>
      </tr>
      <tr>
        <td>Humidity Percentage</td>
        <td></td>
        <td></td>
        <td>${arr[0].rh}</td>
      </tr>
      <tr>
        <td>Cloud Coverage</td>
        <td></td>
        <td></td>
        <td>${arr[0].clouds}</td>
      </tr>
    </tbody>
  </table>
    
    `);


    rootFetch.append(table);
  
}

$(document).ready(function () {

  
    let body = $("body");

    body.on("click", "#submitCoord", generateweather);

});