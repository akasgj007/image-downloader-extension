(() => {
  const urls = new Set();

  // 🔹 Force lazy images to load
  window.scrollTo(0, document.body.scrollHeight);

  // 🔹 Extract from <img>
  document.querySelectorAll("img").forEach((img) => {
    if (img.src) urls.add(img.src);

    if (img.dataset.src) urls.add(img.dataset.src);
    if (img.dataset.lazySrc) urls.add(img.dataset.lazySrc);

    if (img.srcset) {
      img.srcset.split(",").forEach((item) => {
        const url = item.trim().split(" ")[0];
        if (url) urls.add(url);
      });
    }
  });

  // 🔹 Extract CSS background images
  document.querySelectorAll("*").forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== "none") {
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1]) {
        urls.add(match[1]);
      }
    }
  });

  const images = [...urls].filter((u) => u.startsWith("http"));

  chrome.storage.local.set({ images }, () => {
    chrome.runtime.sendMessage({ action: "OPEN_GALLERY" });
  });
})();
