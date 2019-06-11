window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

document.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('p');

  //TODO: Add link to readme for supported engines
  text.innerHTML = 'Please use a supported search engine';

  browser.tabs.query({ currentWindow: true, active: true}, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, 'google it baby!', (response) => {
        // alert(response.result);
        //TODO: Remove readme link el before changing text below? Necessary?
        text.innerHTML = typeof response !== undefined ? response.result : 'Something went wrong...';
      });
    }
  );
}, false);
