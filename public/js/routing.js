document.addEventListener('DOMContentLoaded', function () {
    navigateTo(window.location.pathname);  // Handle initial page load
  
    // Handle navigation on popstate (back/forward) events
    window.addEventListener('popstate', function (event) {
      navigateTo(event.state.path);
    });
  
    // Handle clicks on links
    document.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        navigateTo(path);
        history.pushState({ path }, '', path);
      }
    });
  });
  
  function navigateTo(path) {
    fetchPage(path)
      .then(response => response.text())
      .then(html => {
        document.getElementById('content').innerHTML = html;
      });
  }
  
  function fetchPage(path) {
    return fetch(path);
  }
  