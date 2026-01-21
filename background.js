chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "OPEN_GALLERY") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("gallery.html"),
    });
  }
});
