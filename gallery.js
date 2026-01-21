chrome.storage.local.get("images", (data) => {
  const images = data.images || [];

  const gallery = document.getElementById("gallery");
  const count = document.getElementById("count");
  const selectAllBtn = document.getElementById("selectAllBtn");
  const downloadSelectedBtn = document.getElementById("downloadSelectedBtn");

  count.innerText = `${images.length} images`;

  let selected = new Set();

  function getExtension(url) {
    const match = url.match(/\.(jpg|jpeg|png|webp|gif)/i);
    return match ? match[1] : "jpg";
  }

  images.forEach((src, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selected.add(src);
      } else {
        selected.delete(src);
      }
    });

    const img = document.createElement("img");
    img.src = src;

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const downloadBtn = document.createElement("button");
    downloadBtn.className = "download-btn";
    downloadBtn.innerText = "Download";

    downloadBtn.addEventListener("click", () => {
      const filename = `image_${index}_${Date.now()}.${getExtension(src)}`;
      chrome.downloads.download({
        url: src,
        filename,
        saveAs: false,
      });
    });

    footer.appendChild(downloadBtn);
    card.appendChild(checkbox);
    card.appendChild(img);
    card.appendChild(footer);
    gallery.appendChild(card);
  });

  // 🔘 Select All / Deselect All
  selectAllBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkbox");

    const selectAll = selected.size !== images.length;
    selected.clear();

    checkboxes.forEach((cb, i) => {
      cb.checked = selectAll;
      if (selectAll) {
        selected.add(images[i]);
      }
    });

    selectAllBtn.innerText = selectAll ? "Deselect All" : "Select All";
  });

  // ⬇️ Download Selected
  downloadSelectedBtn.addEventListener("click", () => {
    if (selected.size === 0) {
      alert("No images selected");
      return;
    }

    [...selected].forEach((src, idx) => {
      const filename = `selected_${idx}_${Date.now()}.${getExtension(src)}`;
      chrome.downloads.download({
        url: src,
        filename,
        saveAs: false,
      });
    });
  });
});
