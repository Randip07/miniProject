let dashboard = document.querySelector(".dashboard");
let order = document.querySelector(".order");
let customer = document.querySelector(".customer");
let menu = document.querySelector(".menu");
let table = document.querySelector(".table");

let main_dash =  document.querySelector(".main-dash");
let order_dash =  document.querySelector(".order-dash");
let cust_dash =  document.querySelector(".cust-dash");

dashboard.addEventListener("click", ()=>{
    if( dashboard.classList.contains("active")){
        return;
    }else{
        order.classList.remove("active")
        order_dash.classList.remove("show")
        customer.classList.remove("active")
        cust_dash.classList.remove("show")
        main_dash.classList.add("show")
        dashboard.classList.add("active")
    }
})

order.addEventListener("click", ()=>{
    if( order.classList.contains("active")){
        return;
    }else{
        main_dash.classList.remove("show")
        dashboard.classList.remove("active")
        customer.classList.remove("active")
        cust_dash.classList.remove("show")
        order.classList.add("active")
        order_dash.classList.add("show")
    }
})

customer.addEventListener("click", ()=>{
    if( customer.classList.contains("active")){
        return;
    }else{
        order.classList.remove("active")
        order_dash.classList.remove("show")
        main_dash.classList.remove("show")
        dashboard.classList.remove("active")
        customer.classList.add("active")
        cust_dash.classList.add("show")
    }
})