import mjson from "../manifest.json";

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension has been installed");
});

chrome.runtime.onConnect.addListener(port => {
  if (port.name === mjson.name + "-popup") {
    port.onMessage.addListener(message => {
      console.log("Message from popup: " + message);
      port.postMessage("I'm background");
    });
  }
});

chrome.runtime.onMessage.addListener((msg, msgSender, sendResponse) => {
  console.log("Message from content scripts: ", msg);
  sendResponse("I'm background");
  return true; // for async response
});
