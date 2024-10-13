const min_screen_width = 600;

function handleImages() {
  console.log("Function Called");

  if (window.innerWidth > min_screen_width) {
    const fullWidthSplitScreens = document.querySelectorAll(
      ".full-width-split-screen",
    );

    for (const element of fullWidthSplitScreens) {
      const imgElements = element.querySelectorAll("img");

      for (const imgElement of imgElements) {
        imgElement.style.height = `${element.clientHeight}px`;

        imgElement.addEventListener("load", () => {
          imgElement.style.height = `${element.clientHeight}px`;
          // console.log("Image loaded and resized!");
        });
      }
    }
  }

  // Remove height styling if window goes below minimum width
  if (window.innerWidth <= min_screen_width) {
    const fullWidthSplitScreens = document.querySelectorAll(
      ".full-width-split-screen",
    );

    for (const element of fullWidthSplitScreens) {
      const imgElement = element.querySelector(
        "img",
      ) as HTMLImageElement | null;
      if (imgElement) {
        imgElement.style.height = "";
      }
    }
  }
}

document.addEventListener("astro:page-load", handleImages);
window.addEventListener("resize", handleImages);
