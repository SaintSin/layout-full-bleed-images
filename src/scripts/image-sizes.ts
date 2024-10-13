const minScreenWidth = 600;
let resizeTimeout: number | null = null;

// Debounce function to limit the frequency of resize handling
const debounceResize = (callback: () => void, delay: number) => {
  return () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(callback, delay);
  };
};

function handleImages() {
  // console.log("Function Called");

  const fullWidthSplitScreens = document.querySelectorAll(
    ".full-width-split-screen",
  );

  if (window.innerWidth > minScreenWidth) {
    for (const element of fullWidthSplitScreens) {
      const imgElements = element.querySelectorAll("img");

      for (const imgElement of imgElements) {
        // Set image height to match parent container's height
        imgElement.style.height = `${element.clientHeight}px`;

        // Re-apply height when the image is fully loaded
        imgElement.addEventListener("load", () => {
          imgElement.style.height = `${element.clientHeight}px`;
        });
      }
    }
  } else {
    // Clear height styling if window width is below the threshold
    for (const element of fullWidthSplitScreens) {
      const imgElements = element.querySelectorAll("img");

      for (const imgElement of imgElements) {
        imgElement.style.height = ""; // Reset the height
      }
    }
  }
}

// Attach event listeners
document.addEventListener("astro:page-load", handleImages);
window.addEventListener("resize", debounceResize(handleImages, 200));
