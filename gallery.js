chrome.storage.local.get("images", (data) => {
  const gallery = document.getElementById("gallery");
  const count = document.getElementById("count");
  const empty = document.getElementById("empty");

  const images = data.images || [];

  count.innerText = `${images.length} images`;

  if (images.length === 0) {
    empty.style.display = "block";
    return;
  }

  images.forEach((src, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = src;

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const btn = document.createElement("button");
    btn.className = "download-btn";
    btn.innerText = "Download";

    btn.addEventListener("click", () => {
      const filename = `image_${index}_${Date.now()}.jpg`;
      chrome.downloads.download({
        url: src,
        filename,
        saveAs: false,
      });
    });

    footer.appendChild(btn);
    card.appendChild(img);
    card.appendChild(footer);
    gallery.appendChild(card);
  });
});
