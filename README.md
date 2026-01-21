# Image Downloader Chrome Extension

A Chrome extension that extracts, previews, and downloads images from modern websites.

## Features
- Extracts images from `<img>` tags
- Supports lazy-loaded images
- Detects CSS background images
- Displays images in a gallery view
- Download images individually using Chrome Downloads API

## Installation (No Chrome Web Store)

1. Click **Code → Download ZIP**
2. Extract the ZIP file
3. Open Chrome and go to `chrome://extensions`
4. Enable **Developer mode** (top-right)
5. Click **Load unpacked**
6. Select the extracted extension folder

## Usage
1. Open any webpage
2. Click the extension icon
3. Click **Get All Images**
4. A gallery page opens with all detected images
5. Click **Download** under any image

## Permissions Used
- `activeTab` – access current page
- `scripting` – inject content script
- `storage` – pass image URLs
- `downloads` – download images safely

## Notes
- Some images (canvas, DRM-protected assets) cannot be extracted due to browser limitations.
- This extension runs entirely in the browser and does not send data to any server.
