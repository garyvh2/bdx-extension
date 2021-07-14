chrome.storage.local.get(['store'], ({ store }) => {
  updateStore(store);
  chrome.storage.local.remove('store');
});

function updateStore(store){
  location.reload();
  window.localStorage.setItem("persist:reduxstate", JSON.stringify(store.app));
  window.localStorage.setItem("jwtToken", store.token);
  window.localStorage.setItem("jwtTokenExp", "1");
}
