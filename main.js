chrome.storage.local.get(v => {
  let _a = document.createElement("a");
  _a.target = "_blank";
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
onclick = e =>
  innerWidth - e.x > 20 ||
  e.preventDefault(
    e.target.remove(
      chrome.storage.local.set({
        [e.target.nonce] : [0]
      })
    )
  );