
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawVisualization);
google.charts.setOnLoadCallback(drawVisualization2);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Day', 'Income'],
        ['Mon',  5000],
        ['Tue',  7000],
        ['Wed',  6600],
        ['Thu',  10300],
        ['Fri',  12000],
        ['Sat',  8800],
        ['Sun',  15390]
    ]);

var options = {
    title: 'Income',
    curveType: 'function',
    legend: { position: 'bottom' }
};

var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
chart.draw(data, options);
}

function drawVisualization() {
    // Some raw data (not necessarily accurate)
    var data = google.visualization.arrayToDataTable([
      ['Day', 'Appetizers', 'Main', 'Beverages'],
      ['Mon',  165,      938,         522],
      ['Tue',  135,      1120,        599],
      ['Wed',  157,      1167,        587],
      ['Thu',  139,      1110,        615],
      ['Fri',  136,      691,         629],
      ['Sat',  136,      691,         629],
      ['Sun',  136,      691,         629]
    ]);

    var options = {
      title : 'Daily Sales in Different Category',
      vAxis: {title: 'Sales'},
      hAxis: {title: 'Day'},
      seriesType: 'bars',
      series: {5: {type: 'line'}}
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function drawVisualization2() {
  // Some raw data (not necessarily accurate)
  var data = google.visualization.arrayToDataTable([
    ['Review', 'Rating'],
    ['Exc',5],
    ['Good',4 ],
    ['Ok',  1],
    ['Dis', 2 ],
    ['Wor',  1],
  ]);

  var options = {
    title : 'Ratings',
    seriesType: 'bars',
    series: {5: {type: 'line'}}
  };

  var chart = new google.visualization.ComboChart(document.getElementById('chart_div2'));
  chart.draw(data, options);
}
