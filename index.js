// TODO: Rename this file, and simplify process of adding/editing/removing search engines

// Get required elements
const searchQuery = document.getElementById('query');
const selectorButton = document.getElementById('selector-button');

// Search engine options
const selectorButtonGoogle = document.getElementById('selector-button-google');
const selectorButtonArchWiki = document.getElementById('selector-button-arch-wiki');
const selectorButtonInternetArchive = document.getElementById('selector-button-internet-archive');
const selectorButtonWaybackMachine = document.getElementById('selector-button-wayback-machine');
const selectorButtonWikipedia = document.getElementById('selector-button-wikipedia');
const selectorButtoWikimediaCommons = document.getElementById('selector-button-wikimedia-commons');

// Base URLs used for searching
const googleBaseUrl = 'https://www.google.com/search?q=';
const archWikiBaseUrl = 'https://wiki.archlinux.org/index.php?search=';
const internetArchiveBaseUrl = 'https://archive.org/search.php?query=';
const waybackMachineBaseUrl = 'https://web.archive.org/web/*/';
const wikipediaBaseUrl = 'https://en.wikipedia.org/w/index.php?search=';
const wikimediaCommonsBaseUrl = 'https://commons.wikimedia.org/w/index.php?title=Special:MediaSearch&search=';

let selectedBaseUrl;

// Perform the actual search
function performSearch(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    
        const url = selectedBaseUrl + searchQuery.value;
        const win = window.open(url, '_self');
        win.focus;
    }
}

// Change search engine dropdown to reflect currently selected engine
function changeSelectedSearchEngine(event) {
    event.preventDefault();

    switch(event.target.id) {
        case "selector-button-google":
            selectorButton.style.backgroundImage = "url('imgs/logos/google\ logo.png')";
            selectedBaseUrl = googleBaseUrl;
            searchQuery.placeholder = "Search with Google";
            break;
        case "selector-button-arch-wiki":
            selectorButton.style.backgroundImage = "url('imgs/logos/arch\ logo.png')";
            selectedBaseUrl = archWikiBaseUrl;
            searchQuery.placeholder = "Search the Arch Wiki";
            break;
        case "selector-button-internet-archive":
            selectorButton.style.backgroundImage = "url('imgs/logos/internet\ archive\ logo.png')";
            selectedBaseUrl = internetArchiveBaseUrl;
            searchQuery.placeholder = "Search the Internet Archive";
            break;
        case "selector-button-wayback-machine":
            selectorButton.style.backgroundImage = "url('imgs/logos/wayback\ machine\ logo.png')";
            selectedBaseUrl = waybackMachineBaseUrl;
            searchQuery.placeholder = "Search the Wayback Machine";
            break;
        case "selector-button-wikipedia":
            selectorButton.style.backgroundImage = "url('imgs/logos/wikipedia\ logo.png')";
            selectedBaseUrl = wikipediaBaseUrl;
            searchQuery.placeholder = "Search Wikipedia, The Free Encyclopedia";
            break;
        case "selector-button-wikimedia-commons":
            selectorButton.style.backgroundImage = "url('imgs/logos/wikimedia\ commons\ logo.png')";
            selectedBaseUrl = wikimediaCommonsBaseUrl;
            searchQuery.placeholder = "Search Wikimedia Commons";
            break;
    }
}

// Add necessary event listeners
searchQuery.addEventListener("keypress", performSearch);

// Search engine listeners
selectorButtonGoogle.addEventListener('click', changeSelectedSearchEngine);
selectorButtonArchWiki.addEventListener('click', changeSelectedSearchEngine);
selectorButtonInternetArchive.addEventListener('click', changeSelectedSearchEngine);
selectorButtonWaybackMachine.addEventListener('click', changeSelectedSearchEngine);
selectorButtonWikipedia.addEventListener('click', changeSelectedSearchEngine);
selectorButtoWikimediaCommons.addEventListener('click', changeSelectedSearchEngine);

// Set google as default engine
selectorButtonGoogle.click();