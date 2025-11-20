chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  try {
    let iconUrl = info.srcUrl;
    let s = iconUrl.slice(-4);
    if (s == "=s60" || s == "s120") {
      iconUrl = iconUrl.slice(0, (s == "=s60") - 3) + ((await chrome.system.display.getInfo())[0].dpiY >>> 2);
      let tabUrl = tab.url;
      let title = tab.title.replace(/ - Chrome .*/, "");
      let fr = new FileReader;
      fr.onload = e => {
        iconUrl = e.target.result;
        let key = tabUrl.substr(tabUrl.indexOf("/", 43) + 1,  32);
        chrome.storage.local.get(v => {
          let hole = null;
          let j;
          let i = 0;
          while (i in v && ((j = v[i][0]) ? j != key : (hole ??= i, 1)))
            ++i;
          chrome.storage.local.set({
            [i in v && hole != null ? hole : i]: [key, title, tabUrl, iconUrl]
          });
        });
      }
      fr.readAsDataURL(await (await fetch(iconUrl)).blob());
    }
  } catch {}
});
chrome.runtime.onStartup.addListener(() =>
  chrome.sidePanel.setOptions({
    path: "sidepanel.htm"
  })
);
chrome.runtime.onInstalled.addListener(() => (
  chrome.contextMenus.create({
    id: "",
    title: "Like an extension",
    contexts: ["image"],
    documentUrlPatterns: ["https://chromewebstore.google.com/detail/*"],
    targetUrlPatterns: ["https://lh3.googleusercontent.com/*"]
  }),
  chrome.sidePanel.setOptions({
    path: "sidepanel.htm"
  }),
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: !0
  })
));