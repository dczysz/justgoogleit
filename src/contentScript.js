window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const url = window.location.href;

  //TODO: Not working
  if (/google.com/.test(url)) {
    alert('youre on google')
    sendResponse({ result:'You\'re already on Google!' });
    return;
  }

  const querySelectorString = getQuerySelectorString(url);

  // Double check if query input was found
  // even though this should only run on urls allowed in manifest
  if (querySelectorString === null) {
    return;
  }

  const query = document.querySelector(querySelectorString).value;

  // Only continue if query isn't empty string
  if (query !== '') {
    sendResponse({ result:'Opening Google...' });
    const googleSearch = `https://www.google.com/search?q=${swapSpaceForPlus(query)}`;
    window.location.href = googleSearch;
  } else {
    sendResponse({ result:'Please enter a search query' });
  }

});


const swapSpaceForPlus = q => q.replace(/ /g, '+');

const getQuerySelectorString = url => {
  switch (true) {
    case /qwant.com/.test(url):
      return 'input[name="q"]';

    case /duckduckgo.com/.test(url):
      return 'input.js-search-input';

    case /startpage.com/.test(url):
      return 'input#query';

    case /searx.me/.test(url):
      return 'input#q';
    default:
      return null;
  }
};