function updateCount() {
	let length = 0;
	return browser.tabs.query({}).then((tabs) => {
	  return tabs.length;
	});
  }

function update() {
  console.log("Updating");

  let totalNumberElement = document.getElementById("totalNumber");

  updateCount().then((length) => {
    console.log(`Tabs count: ${length}`);
    totalNumberElement.innerHTML = `Total # of tabs: ${length}`;
  });

  var urls = listCommonUrls();

  var size = 10;
  if (urls.length < 10) size = urls.length;

  let tabsList = document.getElementById("topTabsList");
  for (var i = 0; i < size; i++) {
    console.log("here");
    var li = document.createElement("li");
    li.innerHTML = "asdfasdfasidfasef";
    tabsList.appendChild(li);
  }
}



function listCommonUrls() {
  var resultDictionary = [];
  browser.tabs.query({}).then((tabs) => {
    var urlDictionary = [];

    count = 0;
    tabs.forEach(function (tab) {
      url = "";
      if (tab.url.substring(0, 8) === "https://") {
        url = tab.url.substring(8, tab.url.length);
      } else if (tab.url.substring(0, 7) === "http://") {
        url = tab.url.substring(7, tab.url.length);
      } else if (tab.url.substring(0, 8) === "file:///") {
      } else if (tab.url.substring(0, 6) === "about:") {
      } else {
        console.log("Empty: ", tab.url);
      }

      slashLocation = url.indexOf("/");
      baseURL = url.substring(0, slashLocation);
      if (baseURL === "length") {
        console.log("Length tab: ", tab.url);
      }

      if (urlDictionary[baseURL] === undefined) {
        urlDictionary[baseURL] = 0;
      }

      urlDictionary[baseURL] += 1;
    });

    var tempDictionary = [];
    for (let u in urlDictionary) {
      tempDictionary.push({ key: u, value: urlDictionary[u] });
    }

    urlDictionary = tempDictionary;

    for (let u in urlDictionary) {
      if (urlDictionary[u]["value"] > 3) {
        resultDictionary.push(urlDictionary[u]);
      }
    }

    resultDictionary.sort((a, b) => {
      return b.value - a.value;
    });
  });

  return resultDictionary;
}

function removeByURL(inputUrl) {
  console.log("here in remove");
  browser.tabs.query({}).then((tabs) => {
    count = 0;
    var listToRemove = [];
    tabs.forEach(function (tab) {
      if (tab.url.substring(0, inputUrl.length) === inputUrl) {
        count += 1;
        console.log("Here: ", tab.url);
        listToRemove.push(tab.id);
      }
    });

    for (let tab in listToRemove) {
      browser.tabs.remove(listToRemove[tab]);
    }
    console.log("Removed: ", count, " tabs");
  });
}

function countByURL(inputUrl) {
  var count = 0;
  browser.tabs.query({}).then((tabs) => {
    tabs.forEach(function (tab) {
      if (tab.url.substring(0, inputUrl.length) === inputUrl) {
        count += 1;
      }
    });

    console.log(inputUrl + " found:\t", count, " tabs");
  });
  return count;
}

function listTabs() {
  browser.tabs.query({}).then((tabs) => {
    // for (let tab in tabs) {
    // 	//asdfasdf
    // }
  });

  getCurrentWindowTabs().then((tabs) => {
    let tabsList = document.getElementById("tabs-list");
    let currentTabs = document.createDocumentFragment();
    let counter = 0;

    let tabOutList = document.getElementById("listOfTabs");
    let inside = "<li> inner Element hey </li>";
    tabOutList.appendChild(inside);
    tabsList.textContent = "";

    for (let tab of tabs) {
      console.log("Tab " + counter + ": " + tab.name);
      tabOutList.append(tab);
      counter += 1;
    }

    tabsList.appendChild(currentTabs);
  });
}

browser.tabs.onRemoved.addListener((tabId) => {
  update();
});
browser.tabs.onCreated.addListener((tabId) => {
  update();
});

var redditUrl = "https://old.reddit.com/";
var canvasUrl = "https://uwsto.instructure.com/";
var stackoverflowUrl = "https://stackoverflow.com/";
var microcenterUrl = "https://www.microcenter.com/";
var youtubeUrl = "https://www.youtube.com/";
var googleUrl = "https://www.google.com/";
var githubUrl = "https://github.com/";

// countByURL(redditUrl)
// countByURL(canvasUrl)
console.log("youtube: ");
// console.log("Count: ", countByURL(youtubeUrl));
// countByURL(googleUrl)
// countByURL(stackoverflowUrl)
// countByURL(githubUrl)

// console.log("Tabs summary");
// console.log(listCommonUrls());
// countByURL(microcenterUrl)

update();