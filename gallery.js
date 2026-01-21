function getExtension(url) {
  const match = url.match(/\.(jpg|jpeg|png|webp|gif)/i);
  return match ? match[1] : "jpg";
}

chrome.storage.local.get("images", (data) => {
  const gallery = document.getElementById("gallery");
  const images = data.images || [];

  images.forEach((src, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = src;

    const btn = document.createElement("button");
    btn.className = "download-btn";
    btn.innerText = "Download";

    btn.addEventListener("click", () => {
      const ext = getExtension(src);
      const filename = `image_${index}_${Date.now()}.${ext}`;

      chrome.downloads.download({
        url: src,
        filename,
        saveAs: false,
      });
    });

    card.appendChild(img);
    card.appendChild(btn);
    gallery.appendChild(card);
  });
});
