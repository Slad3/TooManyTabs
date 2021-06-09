let tabsList = document.getElementById("topTabsList");
console.log("Main.js");

function listCommonUrls() {
	var resultDictionary = [];
	return browser.tabs.query({}).then((tabs) => {
		var urlDictionary = [];

		count = 0;
		tabs.forEach(function (tab) {
			// Concatinating urls
			//
			var isAbout = false;
			url = "";
			if (tab.url.substring(0, 8) === "https://") {
				url = tab.url.substring(8, tab.url.length);
			} else if (tab.url.substring(0, 7) === "http://") {
				url = tab.url.substring(7, tab.url.length);
			} else if (tab.url.substring(0, 8) === "file:///") {
				isAbout = true;
				url = tab.url.substring(8, tab.url.length);
			} else if (tab.url.substring(0, 6) === "about:") {
				isAbout = true;
				url = tab.url;
			} else {
				url = tab.url;
				console.log("Empty: ", tab.url);
			}

			if (!isAbout) {
				slashLocation = url.indexOf("/");
				baseURL = url.substring(0, slashLocation);
			} else {
				baseURL = url;
			}

			if (baseURL.length > 30) {
				baseURL = baseURL.substring(0, 45);
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
			if (urlDictionary[u]["value"] > 0) {
				resultDictionary.push(urlDictionary[u]);
			}
		}

		resultDictionary = resultDictionary.sort((a, b) => {
			return b.value - a.value;
		});

		var totalTabs = document.getElementById("totalNumber");
		totalTabs.innerHTML = `Total Number of Tabs: ${resultDictionary.length}`;

		console.log("total tabs", resultDictionary.length);
		return resultDictionary;
	});
}

function tabsSetup(tabs, first) {
	//   if (!first) {
	//     console.log("here");
	//     tabsList.innerHTML = "";
	//     console.log("clear");
	//   }

	tabsList.innerHTML = "";
	let size = 7;

	if (tabs.length < size) {
		size = tabs.length;
	}

	for (var i = 0; i < size; i++) {
		var parent = document.createElement("div");

		parent.classList.add("topTab");

		var title = document.createElement("h2");
		title.classList.add("tabTitle");
		title.innerText = tabs[i].key;
		parent.appendChild(title);

		var tabsCount = document.createElement("h3");
		tabsCount.classList.add("tabsCount");
		tabsCount.innerText = "Count: " + tabs[i].value;
		parent.appendChild(tabsCount);

		var breakElement = document.createElement("br");
		parent.appendChild(breakElement);

		var deleteButton = document.createElement("button");
		deleteButton.classList.add("delete");
		deleteButton.classList.add("tabButton");
		deleteButton.innerHTML = "Delete All";
		parent.appendChild(deleteButton);

		var moveAll = document.createElement("button");
		moveAll.classList.add("moveAll");
		moveAll.classList.add("tabButton");
		moveAll.innerHTML = "Move All to End";
		parent.appendChild(moveAll);

		// var listAll = document.createElement("button");
		// listAll.classList.add("listAll");
		// listAll.classList.add("tabButton");
		// listAll.innerHTML = "List All";
		// parent.appendChild(listAll);

		tabsList.appendChild(parent);

	}


	return;
}

function addSingularFunctions(first) {
	if (first) {
		var singularFunctions = document.getElementById("singularFunctions");

		var deleteAllBlankTabs = document.createElement("button");
		deleteAllBlankTabs.id = "deleteAllBlankTabs";
		deleteAllBlankTabs.classList.add("singularURLButton");
		deleteAllBlankTabs.innerHTML = "Delete All Blank Tabs";
		singularFunctions.appendChild(deleteAllBlankTabs);

		var breakElement = document.createElement("br");
		singularFunctions.appendChild(breakElement);

		var deleteNonPinned = document.createElement("button");
		deleteNonPinned.id = "deleteNonPinned";
		deleteNonPinned.classList.add("singularURLButton");
		deleteNonPinned.innerHTML = "Delete All Non-Pinned";
		singularFunctions.appendChild(deleteNonPinned);

		var breakElement = document.createElement("br");
		singularFunctions.appendChild(breakElement);

		var deleteAllYoutube = document.createElement("button");
		deleteAllYoutube.id = "deleteAllYoutube";
		deleteAllYoutube.classList.add("singularURLButton");
		deleteAllYoutube.innerHTML = "Delete All YouTube";
		singularFunctions.appendChild(deleteAllYoutube);

		var breakElement = document.createElement("br");
		singularFunctions.appendChild(breakElement);

		var deleteAllGoogle = document.createElement("button");
		deleteAllGoogle.id = "deleteAllGoogle";
		deleteAllGoogle.classList.add("singularURLButton");
		deleteAllGoogle.innerHTML = "Delete All Google";
		singularFunctions.appendChild(deleteAllGoogle);

		var breakElement = document.createElement("br");
		singularFunctions.appendChild(breakElement);
	}
}

document.addEventListener("click", (e) => {

	if (e.target.tagName === "BUTTON") {
		url = e.target.parentElement.firstChild.innerText;
		action = e.target.classList[0];

		console.log(url);
		console.log(action);

		if (action === "delete") {
			deleteByURL(url);
		}

		if (action === "moveAll") {
			moveToEndByURL(url);
		}
		if (action === "listAll") {
		}
	}

	if (e.target.id === "listTabs") {
		callOnActiveTab((tab) => {
			console.log("Listing Tabs");
		});
	}

	e.preventDefault();
});

function deleteByURL(inputUrl) {
	console.log("here in remove");
	browser.tabs.query({}).then((tabs) => {
		count = 0;
		var listToRemove = [];
		tabs.forEach(function (tab) {
			var startIndex = 0;
			if (tab.url.substring(0, 8) === "https://") {
				startIndex = 8;
			} else if (tab.url.substring(0, 7) === "http://") {
				startIndex = 7;
			} else if (tab.url.substring(0, 8) === "file:///") {
				startIndex = 0;
			} else if (tab.url.substring(0, 6) === "about:") {
				startIndex = 0;
			} else {
				startIndex = 0;
			}

			if (tab.url.substring(startIndex, startIndex + inputUrl.length) === inputUrl) {
				count += 1;
				listToRemove.push(tab.id);
			}
		});

		for (let tab in listToRemove) {
			browser.tabs.remove(listToRemove[tab]);
		}
		console.log("Removed: ", count, " tabs");
		update(false);
	});
}

function moveToEndByURL(inputUrl) {
	browser.tabs.query({}).then((tabs) => {
		var tabIds = [];


		tabs.forEach(function (tab) {
			var startIndex = 0;
			if (tab.url.substring(0, 8) === "https://") {
				startIndex = 8;
			} else if (tab.url.substring(0, 7) === "http://") {
				startIndex = 7;
			} else if (tab.url.substring(0, 8) === "file:///") {
				startIndex = 0;
			} else if (tab.url.substring(0, 6) === "about:") {
				startIndex = 0;
			} else {
				startIndex = 0;
			}

			if (tab.url.substring(startIndex, startIndex + inputUrl.length) === inputUrl) {
				count += 1;
				tabIds.push(tab.id);
			}
		});

		browser.tabs.move(tabIds, { index: -1 });

		console.log(`Moved ${tabIds.length} tabs to end`);
		update(false);
	});
}

function update(firstTime) {
	listCommonUrls().then((result) => {
		console.log(result);
		
		
		tabsSetup(result, firstTime);
		addSingularFunctions(firstTime);
		console.log(document.documentElement.innerHTML)
	});
}

update(true);
