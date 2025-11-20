const minScreenWidth = 600;
let resizeTimeout: number | null = null;

// Debounce function to limit the frequency of resize handling
const debounceResize = (callback: () => void, delay: number): (() => void) => {
  return (): void => {
    if (resizeTimeout !== null) clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      callback();
      resizeTimeout = null; // Clean up after invocation
    }, delay);
  };
};

function handleImages(): void {
  const fullWidthSplitScreens = document.querySelectorAll<HTMLElement>(
    '.full-width-split-screen',
  );

  // Use for...of to loop through each full-width-split-screen element
  for (const element of fullWidthSplitScreens) {
    const imgElements =
      element.querySelectorAll<HTMLImageElement>('img, picture img');

    // If the window is wider than the minimum width
    if (window.innerWidth > minScreenWidth) {
      for (const imgElement of imgElements) {
        const adjustImageSize = (): void => {
          const parentHeight = element.clientHeight;
          const naturalWidth = imgElement.naturalWidth;
          const naturalHeight = imgElement.naturalHeight;

          if (naturalWidth > 0 && naturalHeight > 0) {
            // Set the image height to match the parent container height
            imgElement.style.height = `${parentHeight}px`;

            // Calculate and apply width to maintain the aspect ratio
            const aspectRatio = naturalWidth / naturalHeight;
            imgElement.style.width = `${parentHeight * aspectRatio}px`;

            // Add debug logging to check the applied styles
            console.log(`Image adjusted: ${imgElement.src}`);
            console.log(`Height set: ${imgElement.style.height}`);
            console.log(`Width set: ${imgElement.style.width}`);
          }
        };

        // Adjust immediately if the image is fully loaded, or wait for load event
        if (imgElement.complete) {
          adjustImageSize();
        } else {
          imgElement.addEventListener('load', adjustImageSize);
        }
      }
    } else {
      // If the window is narrower, clear the styles so images revert to natural sizing
      for (const imgElement of imgElements) {
        imgElement.style.height = ''; // Reset height
        imgElement.style.width = ''; // Reset width

        // Add debug logging to ensure styles are reset
        console.log(`Image reset: ${imgElement.src}`);
      }
    }
  }
}

// Attach the event listeners to handle images on page load and resize
document.addEventListener('astro:page-load', handleImages);
window.addEventListener('resize', debounceResize(handleImages, 200));
