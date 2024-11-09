const header = document.querySelector("header");

window.addEventListener("scroll" , function(){
    header.classList.toggle("sticky", this.window.scrollY > 700);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = ()=>{
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

window.onscroll = ()=>{
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}

const sr = ScrollReveal({
    origin:'top',
    distance : '85px',
    duration : 2500,
    reset : false
})

sr.reveal('.home-text', {delay : 50});
sr.reveal('.offer-img', {delay : 100});
sr.reveal('.container', {delay : 50});

sr.reveal('.about-img', {});
sr.reveal('.about-text', {delay : 50});

sr.reveal('.middle-text', {});
sr.reveal('.row-btn,.shop-content', {delay : 50});

sr.reveal('.contact,.review-content', {delay : 50});
// Function to update the cart count
// Function to update the cart count
