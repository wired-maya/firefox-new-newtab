// Strip all HTML, breaks formatting
function strip(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

// TODO: Add text truncating, make all the cards the same consistent size
//       Make this function async, add "Error" cards and "empty" cards
//       Try no descriptions? -> It is good, add this back as an option later
//       Make RSS2JSON conversion automatic
//       Make cards themselves clickable for links, instead of just the title
//       Make this an async fetch function
function loadFeed(feed, url, title) {
    var content = document.getElementById(feed);

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var itemsContainer = document.createElement('DIV');

            if (data.status == 'ok') {


                for (var i = 0, t = data.items.length; i < t; ++i) {
                    var item = data.items[i];
                    var itemContainer = document.createElement('DIV');
                    var itemTextContainer = document.createElement('DIV');
                    
                    itemContainer.classList.add("feed-card");
                    itemTextContainer.classList.add("feed-card-text");

                    var itemThumbnailElement = document.createElement('IMG')
                    itemThumbnailElement.classList.add("feed-card-thumbnail")
                    itemThumbnailElement.setAttribute('src', item.thumbnail);

                    var itemTitleElement = document.createElement('H2');
                    var itemLinkElement = document.createElement('A');
                    var itemDescriptionElement = document.createElement('P');

                    itemTitleElement.classList.add("feed-card-title");
                    itemLinkElement.classList.add("feed-card-link");
                    itemDescriptionElement.classList.add("feed-card-desc");

                    itemLinkElement.setAttribute('href', item.link);
                    itemLinkElement.innerText = item.title;
                    itemTitleElement.appendChild(itemLinkElement);

                    // Removes first image from description so it can be used as thumbnails instead, then makes "Read more" uniform
                    // itemDescriptionElement.innerHTML = item.description.replace(/<img[^>]*>/, "").replace("Read more...", "Read More");

                    itemTextContainer.appendChild(itemTitleElement);
                    itemTextContainer.appendChild(itemDescriptionElement);

                    itemContainer.appendChild(itemThumbnailElement);
                    itemContainer.appendChild(itemTextContainer);

                    itemsContainer.appendChild(itemContainer);

                }

                // var titleElement = document.createElement('H1');
                // titleElement.classList.add("feed-title");
                // titleElement.innerText = data.feed.title;
                // titleElement.innerText = title;

                // content.appendChild(titleElement);
                content.replaceChildren(itemsContainer);
            }

            console.log(data);
        }
    };
    xhr.open(
        'GET',
        url,
        true
    );
    xhr.send();
}

loadFeed("rss-feed-1-content", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fkotaku.com%2Frss', "Kotaku");
loadFeed("rss-feed-2-content", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.rockpapershotgun.com%2Ffeed%2Fnews', "Rock Paper Shotgun");
loadFeed("rss-feed-3-content", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.vg247.com%2Ffeed', "VG247");
loadFeed("rss-feed-4-content", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.gameinformer.com%2Fnews.xml', "Game Informer");
// Change to siliconera RSS feed if this doesn't update enough
// loadFeed("rss-feed-5-content", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fstore.steampowered.com%2Ffeeds%2Fnewreleases.xml', "New Releases");
loadFeed("rss-feed-5-content", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.siliconera.com%2Ffeed%2F', "Siliconera");
loadFeed("rss-feed-6-content", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.rpgsite.net%2Ffeed', "RPG Site");