// Menu data structure
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '/catalog'},
    {text: 'orders', href: '/orders'},
    {text: 'account', href: '/account'},
  ];

const mainE1 = document.querySelector('main');
const root = document.querySelector(':root');
mainE1.style.backgroundColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--main-bg');

//solution without innerHTML
mainE1.append(document.createElement('h1'));
mainE1.removeChild(mainE1.firstChild);
mainE1.lastChild.textContent = "DOM Manipulation";

mainE1.className = "flex-ctr";

const topMenuE1 = document.querySelector("#top-menu");
topMenuE1.style.height = "100%";
topMenuE1.style.backgroundColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--top-menu-bg'); 
topMenuE1.className = "flex-around";

for (link of menuLinks) {
    let newLink = document.createElement('a');
    newLink.setAttribute('href', link.href);
    newLink.textContent = link.text;
    topMenuE1.append(newLink);
}