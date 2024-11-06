
const ctx = document.getElementById('incomeChart');
const ctx2 = document.getElementById('salesChart');
const ctx3 = document.getElementById('ratingsChart');

const api_url = "http://localhost:8088/getDashboardData"
const api_url1 = "http://localhost:8088/getDashboardData/income_data"
const api_url2 = "http://localhost:8088/getDashboardData/sales_data"
const api_url3 = "http://localhost:8088/getDashboardData/top_items"
const api_url4 = "http://localhost:8088/getDashboardData/rating_data"
// const api_url = "http://universities.hipolabs.com/search?name=middle&country=turkey"

const pointImage = new Image(10,12);
pointImage.src = "../css/img2/rupeee.png"

async function loading(){

  // income chart
  let chart1Data = await organizeIncomeData(api_url1);
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chart1Data.day,
      datasets: [{
        label: 'Daily Income',
        data: chart1Data.dailyIncome,
        borderWidth: 3,
      }]
    },
    options: {
      elements : {
        point : {
          pointStyle : ["circle"],
          borderWidth : 10
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks : {
            display : true,
            stepSize : 1000,
            maxTicksLimit : 4
          },
          grid : {
            display : false
          }
        },
      }
    }
  });

  // Sales Chart
  let chart2Data = await organizeSalesData(api_url2);
  const chart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: chart2Data.category,
      datasets: [{
        label: 'Total Sale Amount',
        data: chart2Data.amount,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          display : false
        }
      }
    }
  });

  // top Items
  let names = document.querySelectorAll(".name");
  let ranks = document.querySelectorAll(".rank");
  let prices = document.querySelectorAll(".price");
  let quantities = document.querySelectorAll(".quantity");
  let images = document.querySelectorAll(".image");
  console.log(images);
  

  let topItemsDataJson = await fetch(api_url3);
  let topItemsData = await topItemsDataJson.json();
  
  for(let i=0; i<4; i++){
    names[i].textContent = topItemsData.result[i].itemName
    ranks[i].textContent = "#" + (i+1);
    prices[i].textContent =  "₹"+ topItemsData.result[i].itemPrice + ".00/-"
    quantities[i].textContent = "Order "+ topItemsData.result[i].totalQuantity + "X"
    images[i].src = topItemsData.result[i].imageUrl;
    images[i].alt = topItemsData.result[i].itemName; 
  }

  // rating Chart
  const chart3 = new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star'],
      datasets: [{
        label: 'Total rating count',
        data: [0, 0, 0, 17, 43],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          display : false
        }
      }
    }
  });


  // dashOverview
  let dashOverviewJson = await fetch(api_url);
  let dashOverview = await dashOverviewJson.json();
  let overallDatas = document.querySelectorAll(".overallData");
  let adminName = document.getElementById("adminName")
  adminName.textContent += dashOverview.response[4];
  // console.log(dashOverview.response);
  
  for(let i=0; i<4; i++){
    if (overallDatas[i].textContent == "₹") {
      overallDatas[i].textContent = overallDatas[i].textContent  + dashOverview.response[i] + ".00/-"
    }
    else{
    overallDatas[i].textContent = overallDatas[i].textContent  + dashOverview.response[i]
    }
  }
}


// functions

async function organizeIncomeData(api){
  let response = await fetch(api);
  let dataSet = await response.json();
  
  
  let day = [];
  let dailyIncome = [];
  for(let i=0; i<7; i++) {
    // console.log(dataSet.newResult[i]._id);
    if(dataSet.newResult[i]){
      day.push(dataSet.newResult[i]._id);
      dailyIncome.push(dataSet.newResult[i].totalAmount)
    }else{
      day.push(0)
      dailyIncome.push(0)
    }
  }
  let result = {
    day : day,
    dailyIncome : dailyIncome
  };

  return result;
}

async function organizeSalesData(api){
  let response = await fetch(api);
  let dataSet = await response.json();
  let category = [];
  let amount = [];
  
  for(let i=0; i<dataSet.result.length; i++) {
    if(dataSet.result[i]){
      category.push(dataSet.result[i]._id[0]);
      amount.push(dataSet.result[i].totalSales)
    }else{
      category.push(0)
      amount.push(0)
    }
  }
  
  let result ={
    category : category,
    amount : amount
  }
  return result
  
}

async function oraganizeRatingsData(api) {
  let response = await fetch(api);
  let dataSet = await response.json();

  let count = [];
  let averageRating = [];
  for(let i=0; i<5; i++) {
    if(dataSet.result[i] && (dataSet.result[i].averageRating == 4 || dataSet.result[i].averageRating == 5)){
      count.push(dataSet.result[i].count);
      averageRating.push(dataSet.result[i].averageRating)
    }else{
      count.push(0)
      averageRating.push(i)
    }
  }
  let result = {
    count : count,
    averageRating : averageRating
  };

  return result
  
}
oraganizeRatingsData(api_url4)