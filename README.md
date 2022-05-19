# Firefox New-Newtab

An open source custom new tab in HTML, intended for firefox but theoretically can be used for any browser.

## How to customize:

### Layout, welcome name

- Edit `index.html` to your tastes

### Colors, fonts, and other visual changes

- `style.css` has variables for colors, rounding, and the font used throughout at the top
- Everything else can be changed in the rest of `style.css`

### Profile picture, icons

- All these images are in the `imgs` folder, switch them out to your preference

### Add/remove/edit search engines:

#### Add/edit search engine

1. In `index.html`, create a new/edit an existing button with the following format, replacing ID and class with the desired search engine

```html
<button class="dropdown-button dropdown-button-google" id="selector-button-google">#</button>
```

2. In `style.cs`, add a new/edit an existing rule that points background image to your desired icon

```css
.dropdown-button-google {
    background-image: url("imgs/logos/google\ logo.png");
}
```

3. In `index.js`, add/edit the following lines to match your new search engine (recommended to put them in their proper sections in the JS file)

```js
// Search engine options
const selectorButtonGoogle = document.getElementById('selector-button-google');

// Base URLs used for searching
const googleBaseUrl = 'https://www.google.com/search?q='; // Be sure to test this URL with spaces

// Search engine listeners
selectorButtonGoogle.addEventListener('click', changeSelectedSearchEngine);
```

4. In `index.js`, adda new/edit an existing case in the `changeSelectedSearchEngine()` function, and change the appropriate values

```js
// Change search engine dropdown to reflect currently selected engine
function changeSelectedSearchEngine(event) {
    event.preventDefault();

    switch(event.target.id) {
        case "selector-button-google":
            selectorButton.style.backgroundImage = "url('imgs/logos/google\ logo.png')";
            selectedBaseUrl = googleBaseUrl;
            searchQuery.placeholder = "Search with Google";
            break;
    }
}
```

### Edit RSS feed sources:

1. Find your chosen RSS feed, preferably one with a format resembling the defalt ones
2. Go to https://rss2json.com and get your converted URL
3. Edit one of the 3 `loadFeed()` functions, replacing the URL to what you created earlier, and adding a title of choice (RSS feeds already have their own titles, this is just to make the titles shorter and cleaner)

## How to set your Firefox newtab to an HTML file (Working on Firefox 100.1):

1. Create `enable-autoconfig.js` in `FIREFOX PROGRAM FOLDER/defaults/pref/`, and paste in the below code (the first line needs to start with `//`)

```js
// enable autoconfig
pref("general.config.sandbox_enabled", false);

pref("general.config.filename", "autoconfig.cfg");
pref("general.config.obscure_value", 0);
```

2. Create `autoconfig.cfg` in `FIREFOX PROGRAM FOLDER`, and paste in below code, replacing the newTabUrl with your HTML file's path (again the first line needs to start with `//`)

```cfg
//
var {classes:Cc,interfaces:Ci,utils:Cu} = Components;

// Set new tab page
try {
  Cu.import("resource:///modules/AboutNewTab.jsm");
  var newTabURL = "file:///LOCAL HTML PATH";
  AboutNewTab.newTabURL = newTabURL;
}
catch(e) {
  Cu.reportError(e); // Report errors in the Browser Console
}
```

3. In Firefox, go to `Menu > Settings > Home > Homepage and new windows`, select Custon Urls, and paste in your HTML file's path
4. Restart Firefox, and your new tab should have changed!
