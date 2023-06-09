// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

const mainE1 = document.querySelector('main');
const root = document.querySelector(':root');
mainE1.style.backgroundColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--main-bg');


changeHeader("DOM Manipulation");

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

subMenuE1 = document.querySelector('#sub-menu');
subMenuE1.style.height = '100%';
subMenuE1.style.backgroundColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--sub-menu-bg');
subMenuE1.className = 'flex-around';

subMenuE1.style.position = 'absolute';
subMenuE1.style.top = '0';

topMenuLinks = document.querySelectorAll('a');
let showingSubMenu = false;

topMenuE1.addEventListener('click', function (evt) {
  evt.preventDefault();
  if(evt.target.tagName != 'A') {
    return;
  }
  
  //if submenu is active, toggle it off
  if(evt.target.classList.contains('active')) {
    evt.target.classList.remove('active');
    showingSubMenu = false;
    subMenuE1.style.top = '0';
    return;
  }

  //otherwise show the submenu if there is one
  for(link of topMenuLinks) {
    link.classList.remove('active');
  }
  evt.target.classList.add('active');

  let index = getIndex(evt);
  if(menuLinks[index].subLinks) {
    showingSubMenu = true;
  }
  else {
    showingSubMenu = false;
    changeHeader("About");
  }

  if(showingSubMenu == true) {
    let index = getIndex(evt);
    let subLinks = menuLinks[index].subLinks;
    buildSubMenu(subLinks);
    subMenuE1.style.top = '100%';
  }
  else {
    subMenuE1.style.top = '0';
  }
  

});

subMenuE1.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (evt.target.tagName != 'A') {
    return;
  }

  for(link of topMenuLinks) {
    link.classList.remove('active');
  }

  showingSubMenu = false;
  subMenuE1.style.top = '0';
  changeHeader(evt.target.textContent);
});


function buildSubMenu(subLinks) {
  while(subMenuE1.firstChild) {
    subMenuE1.removeChild(subMenuE1.lastChild);
  }
  for(link of subLinks) {
    let newLink = document.createElement('a');
    newLink.setAttribute('href', link.href);
    newLink.textContent = link.text;
    subMenuE1.append(newLink);
  }
}

function getIndex(evt) {
  return menuLinks.findIndex(obj => obj.text == evt.target.textContent);
}

function changeHeader(text) {
  //solution without innerHTML
  mainE1.append(document.createElement('h1'));
  mainE1.removeChild(mainE1.firstChild);
  mainE1.lastChild.textContent = text;
}