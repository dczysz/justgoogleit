window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

document.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('p');

  text.innerHTML = 'Please use a <a href="https://github.com/dczysz/justgoogleit/blob/master/README.md#supported-browsers">supported search engine</a>';

  browser.tabs.query({ currentWindow: true, active: true}, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, 'google it baby!', (response) => {
        //! Google.com error: response/result is undefined even though it gets checked... wtf
        // alert(response.result);
        text.innerHTML = typeof response.result !== undefined ? response.result : 'Something went wrong...';
      });
    }
  );
}, false);
