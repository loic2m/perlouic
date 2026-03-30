const links = document.querySelectorAll('nav a');
const currentPath = window.location.pathname.replace(/\/$/, '/index.html');

console.log(links)

links.forEach(link => {
    let linkPath = link.pathname.replace(/\/$/, '/index.html');

    console.log('a');

    if (linkPath === currentPath) {
        link.setAttribute('aria-current', 'page');
    }
});
