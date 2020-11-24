function updateCount(tabId, isOnRemoved) {
	browser.tabs.query({}).then((tabs) => {
	  let length = tabs.length;
	  console.log("Total number of open tabs: " + length);
  
	  // onRemoved fires too early and the count is one too many.
	  // see https://bugzilla.mozilla.org/show_bug.cgi?id=1396758
  
	  // if (isOnRemoved && tabId && tabs.map((t) => { return t.id; }).includes(tabId)) {`
	  //   length--;
	  // }
  
	  // browser.browserAction.setBadgeText({text: length.toString()});
	  // if (length > 2) {
	  //   browser.browserAction.setBadgeBackgroundColor({'color': 'green'});
	  // } else {
	  //   browser.browserAction.setBadgeBackgroundColor({'color': 'red'});
	  // }
	});
  }
  
  function listCommonUrls(){
	  var resultDictionary = []
	  browser.tabs.query({}).then((tabs) => {
	  
		  var urlDictionary = []
  
		  count = 0
		  tabs.forEach(function(tab) {
			  url = ""
			  if(tab.url.substring(0, 8) === "https://"){
				  url = tab.url.substring(8, tab.url.length)
			  }
			  else if (tab.url.substring(0, 7) === "http://"){
				  url = tab.url.substring(7, tab.url.length)
			  }
			  else if (tab.url.substring(0, 8) === "file:///"){
			  }
			  else if (tab.url.substring(0, 6) === "about:"){
			  }
			  else{
				  console.log(tab.url)
			  }
  
			  slashLocation = url.indexOf("/")
			  baseURL = url.substring(0, slashLocation)
			  if(baseURL === "length"){
				  console.log("Length tab: ", tab.url)
			  }
  
			  if(urlDictionary[baseURL] === undefined){
				  urlDictionary[baseURL] = 0
  
			  }
  
			  urlDictionary[baseURL] += 1
  
		  });
  
  
		  for(let u in urlDictionary){
			  // console.log(urlDictionary[u])
			  if(urlDictionary[u] > 10){
				  resultDictionary[u] = urlDictionary[u]
			  }
		  }
  
		  
  
		});
  
		return resultDictionary;
  }
  
  function removeByURL(inputUrl) {
	  console.log("here in remove")
	  browser.tabs.query({}).then((tabs) => {
	  
	  count = 0
	  var listToRemove = []
	  tabs.forEach(function(tab) {
		  if (tab.url.substring(0, inputUrl.length) === inputUrl) {
			  count += 1
			  console.log("Here: ", tab.url)
			  listToRemove.push(tab.id)
		  }
	  })
  
	  for(let tab in listToRemove){
		  browser.tabs.remove(listToRemove[tab])
	  }
	  console.log("Removed: ", count, " tabs")
	});
  }
  
  function countByURL(inputUrl){
	  var count = 0
	  browser.tabs.query({}).then((tabs) => {
	  
  
		  tabs.forEach(function(tab) {
			  if (tab.url.substring(0, inputUrl.length) === inputUrl) {
				  count += 1;
			  }
  
		  });
  
		  console.log(inputUrl + " found:\t", count, " tabs")
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
	updateCount(tabId, true);
  });
  browser.tabs.onCreated.addListener((tabId) => {
	updateCount(tabId, false);
  });
  console.log("start")
  
  var redditUrl = "https://old.reddit.com/";
  var canvasUrl = "https://uwsto.instructure.com/";
  var stackoverflowUrl = "https://stackoverflow.com/"
  var microcenterUrl = "https://www.microcenter.com/"
  var youtubeUrl = "https://www.youtube.com/"
  var googleUrl = "https://www.google.com/"
  var githubUrl = "https://github.com/"
  
  // countByURL(redditUrl)
  // countByURL(canvasUrl)
  // countByURL(youtubeUrl)
  // countByURL(googleUrl)
  // countByURL(stackoverflowUrl)
  // countByURL(githubUrl)
  
  console.log("Tabs summary")
  console.log(listCommonUrls());
  // countByURL(microcenterUrl)