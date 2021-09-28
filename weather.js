const generateweather = async function (event) {

    event.preventDefault();


    var rootLocation = $("#root");

    
    rootLocation.empty();

    console.log("test");
    var latitude = "" + $("#latitudeitude").val();
    var longitude =  "" +document.getElementById("longitudeitude").value;
    const result = await axios({
        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        params: {lon: longitude, latitude: latitude, units: 'imperial', lang: 'en'},
        headers: {
          'x-rapidapi-key': '36aa2a1ac6msh0df9f4e9860a347p12561bjsn88032da9b9aa',
          'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
      
    });

    let arr = {};
    arr =result.data.data;
    console.log(arr);
    console.log(arr[0].temp)


    let location = $(`
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
        <td>Humidity%</td>
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

    rootLocation.append(location);
  
}

$(document).ready(function () {

    let ouput = $("body");

    output.on("click", "#submitCoord", generateweather);

});