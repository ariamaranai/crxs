chrome.storage.local.get(v => {
  let _a = document.createElement("a");
  _a.append(new Image(24, 24), "");
  let i = 0;
  while (i in v) {
    let crx = v[i];
    if (crx[0]) {
      let a = _a.cloneNode(1);
      a.lastChild.data = crx[1];
      a.href = crx[2];
      a.nonce = i;
      document.body.appendChild(a).firstChild.src = crx[3];
    }
    ++i;
  }
});
onclick = e => {
  e.preventDefault();
  let { target } = e;
  target.tagName == "A" && (
    innerWidth - e.x < 20
      ? (target.remove(chrome.storage.local.set({ [target.nonce] : [0] })), document.links.length || close())
      : chrome.tabs.query({ currentWindow: !0, active: !0 }, tabs =>
          chrome.tabs[tabs[0].url != "chrome://newtab" ? "create": "update"]({ url: target.href })
        )
  );
}