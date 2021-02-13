

const slideValue = document.getElementById("slider");
console.log(`this is the slideValue ${slideValue}`)
const inputSlider = document.querySelector("input");
console.log(inputSlider)



sample_text = "One black craft, one large white light, and two smaller orange lights west of Deming, NM. On September 4, 2018, at 7:20 p.m. in Deming, New Mexico, my wife and I saw a stationary ball of bright white light in the western sky at about 30 degrees.  There we no other stars or planets in the sky because the sky was still too bright.  I thought it was a supernova!   I ran to our shed and got my telescope which is pre-assembled and is covered only by a garbage bag making it always ready to go.  As I looked at the white ball with the telescope, it ejected two smaller orange balls of light.  They were flying in the area below the white ball.  All three objects could be seen with the naked eye. As I was scanning the area near the white ball with my telescope, I saw another object that looked somewhat similar to a Harrier jet.  It was stationary and was facing me nearly head-on with one bright white light in the middle of each wing.  It seemed to be fairly close to the white ball.  We could not see the jet-shaped object without the telescope.  I have no way to tell how large or how far away they were.  After about a minute or two, the jet-shaped object and the big white ball instantly disappeared leaving the two smaller orange balls.  They would alternate between being bright and dim.  The orange balls remained flying around in the same area of the western sky for about thirty seconds before fading from view. This whole event seems to me to have lasted only about 3 or 4 minutes.  If I would taken the time to get my camera and put it on a tripod so I could take some telephoto shots,  I would have missed the seeing the mysterious jet-shaped object.  I have since spoken with three other people who saw the big white object and one small object below the big one!  They did not have the advantage that I had--a telescope!"
    anychart.onDocumentReady(function () {
      $.ajax(
        'https://cdn.anychart.com/samples/tag-cloud/alice-in-wonderland/text.txt'
      ).done(function (text) {
          console.log(sample_text);
        // create tag cloud
        var chart = anychart.tagCloud();
        // set data with settings
        chart.data(sample_text, {
          mode: 'by-word',
          minLength: 4,
          maxItems: 200
        });
        // set chart title
        chart
        //   .title(
        //     'Top 200 word\'s in "Alice\'s Adventures in Wonderland" by Lewis Carroll'
        //   )
          // set array of angles, by which words will be placed
          .angles([0])
          .background('#1C00ff00')
          // enabled color range
          .colorRange(true)
          // set color scale
          .colorScale(anychart.scales.linearColor(["#9ff89f","#87f280","#6feb60","#56e440","#3ede21"]))
          // set settings for normal state
          .normal({
            fontFamily: 'Times New Roman'
          })
          // set settings for hovered state
          .hovered({
            fill: '#F5F5F5'
          })
          // set settings for selected state
          .selected({
            fill: '#df8892',
            fontWeight: 'bold'
          });

    

        // set container id for the chart
        chart.container('container');
        // initiate chart drawing
        chart.draw();
      });
    });




inputSlider.oninput = (()=>{
  let value = inputSlider.value /100;
  slideValue.textContent = value;
  slideValue.style.left = (value/2) + "%";
  slideValue.classList.add("show");
});

inputSlider.onblur = (()=>{
  slideValue.classList.remove("show");
});

//element and event listener for Tic Tac ML
const ttMl = document.getElementById("ticTac_ml")
const cubeML = document.getElementById("cubeml_button")
const ttFuzzy = document.getElementById("ttFuzzy")
const cubeFuzzy = document.getElementById("cubeFuzzy")


ttMl.addEventListener("click", function() {
  console.log('func ran')
  createFeatures(ticTac_sim);
});

cubeML.addEventListener("click", function() {
  console.log('reset func ran')
  createFeatures(cube_sim);
});

ttFuzzy.addEventListener("click", function() {
  console.log('reset func ran')
  fuzzyCreate(tic_tac);
});

cubeFuzzy.addEventListener("click", function() {
  console.log('reset func ran')
  fuzzyCreate(cube_data);
});



function colorGradient(d) {
  return d > 0.58906877? '#00AB08' :
        d > 0.503644943? '#00C301 ' :
        d > 0.474826217  ? '#26D701' :
        d > 0.462086171  ? '#4DED30' :
        d > 0.457342595   ? '#95F985' :
                   '#B7FFBF ';
 }

function createFeatures(ufoData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3> " + feature.properties.text +
      "</h3><hr><p>" + feature.properties.date_time + "</p>");
  }
    
  function style(feature) {
    var sim = feature.properties.similarity;
    var color_value=colorGradient(sim) 
    //var color_value= "#39FF14"
  
    return {radius: feature.properties.similarity*40,
      color: "#000",
      fillColor:color_value,
      fillOpacity: 0.65,
      weight: 1,
      opacity: 0}
    }

  // Create a GeoJSON layer containing the features array on the ufoData object
  // Run the onEachFeature function once for each piece of data in the array
  var ufos = L.geoJSON(ufoData, {

    onEachFeature: onEachFeature,

    filter: function(feature, latlng){
      let sim_value = inputSlider.value/100

      if (feature.properties.similarity > sim_value){
        console.log(sim_value)
        //console.log(feature.properties.similarity)
        return feature.properties;
      }
    },

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, style(feature));
    }

  });

  // Sending our ufos layer to the createMap function
  createMap(ufos);
}

function fuzzyCreate(ufoData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3> " + feature.properties.text +
      "</h3><hr><p>" + feature.properties.date_time + "</p>");
  }

  function style(feature) {
    var sim = feature.properties.similarity;
    var color_value=colorGradient(sim) 
    //var color_value= "#39FF14"
  
    return {radius: feature.properties.similarity*40,
      color: "#000",
      fillColor:color_value,
      fillOpacity: 0.65,
      weight: 1,
      opacity: 0}
    }

  // Create a GeoJSON layer containing the features array on the ufoData object
  // Run the onEachFeature function once for each piece of data in the array
  var ufos = L.geoJSON(ufoData, {

    onEachFeature: onEachFeature,

  });

  // Sending our ufos layer to the createMap function
  createMap(ufos);
}

function createMap(ufos) {


  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/dford11/ckkyfhgzs15ik17nz8aiz0oe1/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGZvcmQxMSIsImEiOiJja2lzYzdvZngxM2l1MnlvMGI1cjFnMDdlIn0.rijh3J4VSJlZEPBV0pGIwA", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Dark Map": darkmap
  };

  

  // Create our map, giving it the streetmap and ufos layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [darkmap, ufos]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  //overlayMaps,
  L.control.layers(baseMaps , {
    collapsed: false
  }).addTo(myMap);
}

function resetMap(ev){

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/dford11/ckkyfhgzs15ik17nz8aiz0oe1/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGZvcmQxMSIsImEiOiJja2lzYzdvZngxM2l1MnlvMGI1cjFnMDdlIn0.rijh3J4VSJlZEPBV0pGIwA", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Dark Map": darkmap,
  };


  // Create our map, giving it the streetmap and ufos layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [darkmap]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  //overlayMaps,
  L.control.layers(baseMaps , {
    collapsed: false
  }).addTo(myMap);
}

