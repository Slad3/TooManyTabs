let tabsList = document.getElementById("topTabsList");

let size = 10;

for (var i = 0; i < size; i++) {

  var li = document.createElement("li");
  console.log(1)
  li.innerHTML = "asdfasdfasidfasef";
  console.log(2)
  tabsList.appendChild(li);
  console.log(3);
  document.tabsList.appendChild(li)
}
console.log(tabsList)

document.addEventListener("click", (e) => {
  console.log("click");

  if (e.target.tagName === "BUTTON") {
    console.log(e.target);
  }

  if (e.target.classList.contains("button")) {
    var tabId = +e.target.getAttribute("href");

    console.log("asdfasdfasdf");

    browser.tabs
      .query({
        currentWindow: true,
      })
      .then((tabs) => {
        for (var tab of tabs) {
          if (tab.id === tabId) {
            browser.tabs.update(tabId, {
              active: true,
            });
          }
        }
      });
  }

  if (e.target.id === "listTabs") {
    callOnActiveTab((tab) => {
      console.log("Listing Tabs");
    });
  }

  e.preventDefault();
});
