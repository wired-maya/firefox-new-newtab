// Strip all HTML, breaks formatting
function strip(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

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
                    var itemTitleElement = document.createElement('H2');
                    var itemLinkElement = document.createElement('A');
                    var itemDescriptionElement = document.createElement('P');

                    itemTitleElement.classList.add("feed-card-title");
                    itemLinkElement.classList.add("feed-card-link");
                    itemDescriptionElement.classList.add("feed-card-desc");

                    itemThumbnailElement.setAttribute('src', item.thumbnail);

                    itemLinkElement.setAttribute('href', item.link);
                    itemLinkElement.innerText = item.title;
                    itemTitleElement.appendChild(itemLinkElement);

                    // Removes first image from description so it can be used as thumbnails instead, then makes "Read more" uniform
                    itemDescriptionElement.innerHTML = item.description.replace(/<img[^>]*>/, "").replace("Read more...", "Read More");

                    itemTextContainer.appendChild(itemTitleElement);
                    itemTextContainer.appendChild(itemDescriptionElement);

                    itemContainer.appendChild(itemThumbnailElement);
                    itemContainer.appendChild(itemTextContainer);

                    itemsContainer.appendChild(itemContainer);

                }

                var titleElement = document.createElement('H1');
                titleElement.classList.add("feed-title");
                // titleElement.innerText = data.feed.title;
                titleElement.innerText = title;

                content.appendChild(titleElement);
                content.appendChild(itemsContainer);
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

loadFeed("rss-feed-left", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fkotaku.com%2Frss', "Kotaku");
loadFeed("rss-feed-middle", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.rockpapershotgun.com%2Ffeed%2Fnews', "Rock Paper Shotgun");
loadFeed("rss-feed-right", 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.vg247.com%2Ffeed', "VG247");