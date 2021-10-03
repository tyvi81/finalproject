const generateweather = async function (event) {

    event.preventDefault();

    var rootGet = $("#root");
    rootGet.empty();

    console.log("test");
    var lattitude = "" + $("#latitude").val();
    var longitude =  "" +document.getElementById("longitude").value;
    const result = await axios({
        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        params: {lon: longitude, lattitude: lattitude, units: 'imperial', lang: 'en'},
        headers: {
          'x-rapidapi-key': '36aa2a1ac6msh0df9f4e9860a347p12561bjsn88032da9b9aa',
          'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
      
    });

    let arr = {};
    arr =result.data.data;
    console.log(arr);
    console.log(arr[0].temp)


    let table = $(`
    <table class="table is-hoverable">
    <thead>
      <tr>
        <th>Category</th>
        <th></th>
        <th></th>
        <th>Ammount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Temperature</td>
        <td></td>
        <td></td>
        <td> ${arr[0].temp} </td>
      </tr>
      <tr>
        <td>TimeZone</td>
        <td></td>
        <td></td>
        <td>${arr[0].timezone}</td>
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

    rootGet.append(table);
  
}

$(document).ready(function () {

    let body = $("body");

    body.on("click", "#submitCoord", generateweather);

});