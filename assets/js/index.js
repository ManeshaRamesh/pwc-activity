// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var headers = [
  "CNTRYNAME",
  "CODE",
  "122",
  "123",
  "124",
  "125",
  "126",
  "127",
  "128",
  "129",
  "130",
  "131",
  "201",
  "202",
  "203",
  "204",
  "205",
  "206",
  "207",
  "208",
  "209",
  "210",
  "211",
  "212",
  "213",
  "214",
  "215",
  "216",
  "217",
  "218",
  "219",
  "220",
  "221",
  "222",
  "223",
  "224",
  "225",
  "226",
  "227",
  "228",
  "229",
  "301",
  "302",
  "303",
  "304",
  "305",
  "306",
  "307",
  "308",
  "309",
  "310",
  "311",
  "312",
  "313",
  "314",
  "315",
  "316",
  "317",
  "318",
  "319",
  "320",
  "321",
  "322",
  "323",
  "324",
  "325",
  "326",
  "327",
  "328",
  "329",
  "330",
  "331",
  "401",
  "402",
  "403",
  "404",
  "405",
  "406",
  "407",
  "408",
  "409",
  "410",
  "411",
  "412",
  "413",
  "414",
  "415",
  "416",
  "417",
  "418",
  "419",
  "420",
  "421",
  "422",
  "423",
  "424",
  "425",
];

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
}
var lines;
$.get("data/codes.csv", function (data) {
  lines = data.split("\n");
  //   console.log("lines", lines);
  $.each(lines, function (lineNo, line) {
    var items = line.split(",");
    if (lineNo !== 0) {
      var iso_country = items[1],
        name = items[0],
        no_items = parseInt(items[items.length - 1]);
      //options.series[0].data.push([visits]);
      options.series[0].data.push([iso_country, no_items]);
    }
  });
  //   console.log(options.series[0].data);
  Highcharts.mapChart("map", options);
});
// Create the chart

var options = {
  chart: {
    map: "custom/world-highres",
  },
  plotOptions: {
    series: {
      point: {
        events: {
          click: function (e) {
            var message = document.getElementById("message");
            message.style.visibility = "hidden";
            console.log(this.name);
            var url =
              "http://newsapi.org/v2/everything?" +
              "q=" +
              this.name +
              "+" +
              "covid19" +
              "&" +
              "sortBy=publishedAt&" +
              "apiKey=70bccbb286ce43618d92c8d18a9b4cd8";
            //    get newsfeed - send get request
            var req = new Request(url);
            fetch(req)
              .then((response) => response.json())
              .then((data) => {
                // console.log(data.articles);
                var articles = document.getElementById("carouselBody");
                articles.innerHTML = "";
                // populate the nwes feed section of the page
                for (i = 0; i < data.articles.length; i++) {
                  var article = document.createElement("div");
                  article.className = "carousel-item";
                  article.style.textAlign = "left";
                  if (i == 0) {
                    article.className = "carousel-item active";
                  } else {
                    article.className = "carousel-item";
                  }
                  article.innerHTML =
                    '<img class="d-block w-100"  style ="opacity: 0.3; width: auto; max-height: 300px;" src="' +
                    data.articles[i].urlToImage +
                    '" alt="Slide">  \
                        <div class="carousel-caption text-left d-none d-md-block"> \
                        <a href="' +
                    data.articles[i].url +
                    '"><h5 style = "color: black;">  ' +
                    data.articles[i].title +
                    "</h5></a> \
                        <p style = 'color: black;'>" +
                    formatDate(data.articles[i].publishedAt) +
                    "</p>";

                  articles.appendChild(article);
                }
              });

            //   attach info
            // this displays the stats on the webpage - total cases
            var displayInfoTitle = document.getElementById("selectedCountry");
            displayInfoTitle.innerHTML = "<h5>" + this.name + "</h5><br>";
            var displayInfo = document.getElementById("selectedCountryInfo");
            displayInfo.innerHTML = "Total Confirmed Cases: " + this.value;
            // console.log(this.options["hc-key"]);
            var array;
            // find the row with the information for the selected country
            for (var line of lines) {
              var element = line.split("\n");

              for (var value of element) {
                var values = value.split(",");
                if (values[1] === this.options["hc-key"]) {
                  array = values;
                  break;
                }
              }
            }

            //    displays percent change

            var tablestat = document.getElementById("statstable");
            tablestat.innerHTML = "";
            var table = document.getElementById("table");
            table.style.visibility = "visible";
            console.log(tablestat);
            for (var count = array.length - 2; count > 3; count--) {
              //   console.log(
              //     array[count],
              //     " - ",
              //     array[count - 1],
              //     " = ",
              //     (array[count] - array[count + 1]) / array[count]
              //   );

              var row = document.createElement("tr");
              //   date format
              var date = new Date(
                2020,
                parseInt(headers[count + 1].substr(0, 1)) - 1,
                parseInt(headers[count + 1].substring(1))
              );
              // calculates and fills  in the table
              row.innerHTML =
                "<td> " +
                date.toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                }) +
                "</td><td> " +
                ((array[count] - array[count + 1]) / array[count]).toFixed(2) +
                "</td>";
              tablestat.appendChild(row);
            }
            // console.log("array: ", array, array.length);
            // console.log(
            //   "percentage change: ",
            //   percentChange,
            //   percentChange.length
            // );

            // for (var counter = percentChange.length; counter > 3; counter--) {

            // }
          },
        },
      },
    },
  },
  colors: [
    "rgba(19,64,117,0.05)",
    "rgba(19,64,117,0.2)",
    "rgba(19,64,117,0.4)",
    "rgba(19,64,117,0.5)",
    "rgba(19,64,117,0.6)",
    "rgba(19,64,117,0.8)",
    "rgba(19,64,117,1)",
  ],
  title: {
    text: "COVID-19 cases by Country",
  },

  //   subtitle: {
  //     text:
  //       '',
  //   },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },

  colorAxis: {
    dataClasses: [
      {
        to: 100,
      },
      {
        from: 100,
        to: 500,
      },
      {
        from: 500,
        to: 1000,
      },
      {
        from: 1000,
        to: 5000,
      },
      {
        from: 5000,
        to: 10000,
      },
      {
        from: 10000,
        to: 50000,
      },
      {
        from: 50000,
      },
    ],
  },
  legend: {
    title: {
      text: "Individuals per km²",
      style: {
        color:
          // theme
          (Highcharts.defaultOptions &&
            Highcharts.defaultOptions.legend &&
            Highcharts.defaultOptions.legend.title &&
            Highcharts.defaultOptions.legend.title.style &&
            Highcharts.defaultOptions.legend.title.style.color) ||
          "black",
      },
    },
    align: "left",
    verticalAlign: "bottom",
    floating: true,
    layout: "vertical",
    valueDecimals: 0,
    backgroundColor:
      // theme
      (Highcharts.defaultOptions &&
        Highcharts.defaultOptions.legend &&
        Highcharts.defaultOptions.legend.backgroundColor) ||
      "rgba(255, 255, 255, 0.85)",
    symbolRadius: 0,
    symbolHeight: 14,
  },

  series: [
    {
      data: [],
      states: {
        hover: {
          color: "#BADA55",
        },
      },
      dataLabels: {
        enabled: false,
        format: "{point.name}",
      },
    },
  ],
};
