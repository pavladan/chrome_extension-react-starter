console.log("Content injected to " + window.location.href);
chrome.runtime.sendMessage("Content injected", resp => {
  console.log("Response from background: " + resp);
});
