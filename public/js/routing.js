// js/routing.js
const routes = {
    '/': 'index.html',
    '/dashboard': 'dashboard/Dashboard.html',
    '/dashboard/objekwisata': 'dashboard/ObjekWisata.html',
    '/dashboard/restoran': 'dashboard/Restoran.html',
    '/dashboard/penginapan': 'dashboard/Penginapan.html',
};

const renderPage = () => {
    const path = window.location.pathname;
    const pagePath = routes[path] || 'index.html';

    fetch(pagePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;
        })
        .catch(error => console.error('Error loading page:', error));
};

// Initial rendering
renderPage();

// Event listener for navigation
window.addEventListener('popstate', renderPage);
