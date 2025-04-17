
const currentPage = window.location.pathname.split('/').pop();
const nav = document.createElement ('nav');
nav.classList.add('navbar');

const navItems = [
    {name : 'Home', href: 'index.html', showOn: ['categories.html', 'view-together.html']},
    {name : 'categories', href: 'categories.html', showOn:['index.html', 'view-together.html']},
    {name : 'View Togeether', href: 'ViewTogether.html', showOn: ['indexe.html','categories.html']}
];


for (let {name, href, showOn} of navItems) {
if ( showOn === 'all' || showOn.includes(currentPage)){
    const link = document.createElement('a');
    link.textContent = name;
    link.href = href;
    nav.appendChild(link);
}
}

document.body.prepend(nav);