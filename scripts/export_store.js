chrome.storage.local.get(['fileName'], ({ fileName }) => {
  exportStore(fileName);
  chrome.storage.local.remove('fileName');
});

function download(state, fileName) {
  var blob = new Blob([state], { type: 'octet/stream' });
  var href = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.style = 'display: none';
  a.download = `${fileName || "state"}.json`;
  a.href = href;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(href);
  }, 0);
}

function exportStore(fileName) {
  const app = JSON.parse(window.localStorage.getItem("persist:reduxstate"));
  const token = window.localStorage.getItem("jwtToken");
  const store = {
    app,
    token
  };

  download(JSON.stringify(store), fileName);
}
