function matchSplitScreenImageHeights(): void {
  const splitScreens = document.querySelectorAll<HTMLElement>(
    ".full-width-split-screen",
  );

  for (const container of splitScreens) {
    const images = container.querySelectorAll<HTMLImageElement>("img");
    const pictures = container.querySelectorAll<HTMLPictureElement>("picture");
    const nonImageElements = Array.from(container.children).filter(
      (child): child is HTMLElement =>
        child.tagName !== "IMG" && child.tagName !== "PICTURE",
    );

    // Reset any previously set heights
    for (const img of images) {
      img.style.height = "";
      img.style.minHeight = "";
    }

    for (const picture of pictures) {
      picture.style.height = "";
      picture.style.minHeight = "";
      // Also reset the img inside the picture element
      const innerImg = picture.querySelector<HTMLImageElement>("img");
      if (innerImg) {
        innerImg.style.height = "";
        innerImg.style.minHeight = "";
      }
    }

    // Check if we're in desktop mode (matches the CSS media query)
    const isDesktop = window.matchMedia("(min-width: 600px)").matches;

    if (!isDesktop) {
      // On mobile, let images maintain their natural aspect ratio
      return;
    }

    // On desktop, match image heights to content heights
    if (
      (images.length > 0 || pictures.length > 0) &&
      nonImageElements.length > 0
    ) {
      // Get the maximum height of all non-image elements
      let maxContentHeight = 0;

      for (const element of nonImageElements) {
        const rect = element.getBoundingClientRect();
        maxContentHeight = Math.max(maxContentHeight, rect.height);
      }

      // Apply the height to all images and pictures
      if (maxContentHeight > 0) {
        for (const img of images) {
          img.style.height = `${maxContentHeight}px`;
          img.style.minHeight = `${maxContentHeight}px`;
        }

        for (const picture of pictures) {
          picture.style.height = `${maxContentHeight}px`;
          picture.style.minHeight = `${maxContentHeight}px`;
          // Apply the same height to the img inside the picture element
          const innerImg = picture.querySelector<HTMLImageElement>("img");
          if (innerImg) {
            innerImg.style.height = `${maxContentHeight}px`;
            innerImg.style.minHeight = `${maxContentHeight}px`;
            innerImg.style.objectFit = "cover";
          }
        }
      }
    }
  }
}

// Debounce function to prevent excessive resize event firing
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Initialize the height matching
function initSplitScreenHeightMatcher(): void {
  // Run immediately when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", matchSplitScreenImageHeights);
  } else {
    matchSplitScreenImageHeights();
  }

  // Also run on full page load (after all resources are loaded)
  if (document.readyState === "complete") {
    matchSplitScreenImageHeights();
  } else {
    window.addEventListener("load", matchSplitScreenImageHeights);
  }

  // Handle Astro view transitions
  document.addEventListener("astro:page-load", matchSplitScreenImageHeights);
  document.addEventListener("astro:after-swap", matchSplitScreenImageHeights);

  // Run on window resize with debouncing
  const debouncedResize = debounce(matchSplitScreenImageHeights, 150);
  window.addEventListener("resize", debouncedResize);

  // Also run when images load (in case they affect layout)
  const images = document.querySelectorAll<HTMLImageElement>(
    ".full-width-split-screen img",
  );
  const pictures = document.querySelectorAll<HTMLPictureElement>(
    ".full-width-split-screen picture",
  );

  for (const img of images) {
    if (img.complete) {
      // Image already loaded
      matchSplitScreenImageHeights();
    } else {
      // Wait for image to load
      img.addEventListener("load", matchSplitScreenImageHeights);
      img.addEventListener("error", matchSplitScreenImageHeights);
    }
  }

  for (const picture of pictures) {
    const innerImg = picture.querySelector<HTMLImageElement>("img");
    if (innerImg) {
      if (innerImg.complete) {
        // Image already loaded
        matchSplitScreenImageHeights();
      } else {
        // Wait for image to load
        innerImg.addEventListener("load", matchSplitScreenImageHeights);
        innerImg.addEventListener("error", matchSplitScreenImageHeights);
      }
    }
  }
}

// Auto-initialize
initSplitScreenHeightMatcher();

// Export for manual use if needed
export { matchSplitScreenImageHeights, initSplitScreenHeightMatcher };
