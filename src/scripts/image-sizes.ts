// scripts/image-sizes.ts
// 250625 Set maxContentHeight to integer, code refactoring

// Configuration constants
const DESKTOP_BREAKPOINT = 600;
const RESIZE_DEBOUNCE_DELAY = 150;

// Type guards for better type safety
function isImageElement(child: Element): child is HTMLImageElement {
	return child.tagName === "IMG";
}

function isPictureElement(child: Element): child is HTMLPictureElement {
	return child.tagName === "PICTURE";
}

function isNonImageElement(child: Element): child is HTMLElement {
	return child.tagName !== "IMG" && child.tagName !== "PICTURE";
}

// Cache for DOM elements to avoid repeated queries
const containerCache = new Map<
	HTMLElement,
	{
		images: HTMLImageElement[];
		pictures: HTMLPictureElement[];
		nonImageElements: HTMLElement[];
	}
>();

// Store event listener references for cleanup
let debouncedResize: (...args: any[]) => void;
let isInitialized = false;

function matchSplitScreenImageHeights(): void {
	try {
		// Early return for mobile - no height matching needed
		const isDesktop = window.matchMedia(
			`(min-width: ${DESKTOP_BREAKPOINT}px)`
		).matches;
		if (!isDesktop) {
			// Reset any heights that might have been set
			resetAllHeights();
			return;
		}

		const splitScreens = document.querySelectorAll<HTMLElement>(
			".full-width-split-screen"
		);
		if (splitScreens.length === 0) return; // No containers found

		for (const container of splitScreens) {
			processContainer(container);
		}
	} catch (error) {
		console.warn("Error matching split screen heights:", error);
	}
}

function processContainer(container: HTMLElement): void {
	// Get or cache element references
	let cachedElements = containerCache.get(container);

	if (!cachedElements) {
		const children = Array.from(container.children);
		cachedElements = {
			images: children.filter(isImageElement),
			pictures: children.filter(isPictureElement),
			nonImageElements: children.filter(isNonImageElement),
		};
		containerCache.set(container, cachedElements);
	}

	const { images, pictures, nonImageElements } = cachedElements;

	// Reset any previously set heights
	resetElementHeights(images, pictures);

	// Early return if no content to match
	if (
		(images.length === 0 && pictures.length === 0) ||
		nonImageElements.length === 0
	) {
		return;
	}

	// Get the maximum height of all non-image elements
	let maxContentHeight = 0;
	for (const element of nonImageElements) {
		const rect = element.getBoundingClientRect();
		maxContentHeight = Math.max(maxContentHeight, rect.height);
	}

	// Apply the height to all images and pictures (rounded to integer)
	if (maxContentHeight > 0) {
		const roundedHeight = Math.round(maxContentHeight);
		applyHeights(images, pictures, roundedHeight);
	}
}

function resetElementHeights(
	images: HTMLImageElement[],
	pictures: HTMLPictureElement[]
): void {
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
}

function resetAllHeights(): void {
	const splitScreens = document.querySelectorAll<HTMLElement>(
		".full-width-split-screen"
	);

	for (const container of splitScreens) {
		const images = Array.from(container.children).filter(isImageElement);
		const pictures = Array.from(container.children).filter(isPictureElement);
		resetElementHeights(images, pictures);
	}
}

function applyHeights(
	images: HTMLImageElement[],
	pictures: HTMLPictureElement[],
	height: number
): void {
	const heightPx = `${height}px`;

	for (const img of images) {
		img.style.height = heightPx;
		img.style.minHeight = heightPx;
	}

	for (const picture of pictures) {
		picture.style.height = heightPx;
		picture.style.minHeight = heightPx;
		// Apply the same height to the img inside the picture element
		const innerImg = picture.querySelector<HTMLImageElement>("img");
		if (innerImg) {
			innerImg.style.height = heightPx;
			innerImg.style.minHeight = heightPx;
			innerImg.style.objectFit = "cover";
		}
	}
}

// Debounce function to prevent excessive resize event firing
function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

// Clear cache when DOM changes significantly
function clearCache(): void {
	containerCache.clear();
}

// Initialize the height matching
function initSplitScreenHeightMatcher(): void {
	if (isInitialized) {
		console.warn("Split screen height matcher already initialized");
		return;
	}

	try {
		// Run immediately when DOM is ready
		if (document.readyState === "loading") {
			document.addEventListener(
				"DOMContentLoaded",
				matchSplitScreenImageHeights
			);
		} else {
			matchSplitScreenImageHeights();
		}

		// Also run on full page load (after all resources are loaded)
		if (document.readyState === "complete") {
			matchSplitScreenImageHeights();
		} else {
			window.addEventListener("load", matchSplitScreenImageHeights);
		}

		// Handle Astro view transitions - clear cache on page changes
		document.addEventListener("astro:page-load", () => {
			clearCache();
			matchSplitScreenImageHeights();
		});

		document.addEventListener("astro:after-swap", () => {
			clearCache();
			matchSplitScreenImageHeights();
		});

		// Run on window resize with debouncing
		debouncedResize = debounce(
			matchSplitScreenImageHeights,
			RESIZE_DEBOUNCE_DELAY
		);
		window.addEventListener("resize", debouncedResize);

		// Also run when images load (in case they affect layout)
		setupImageLoadListeners();

		isInitialized = true;
	} catch (error) {
		console.error("Failed to initialize split screen height matcher:", error);
	}
}

function setupImageLoadListeners(): void {
	const images = document.querySelectorAll<HTMLImageElement>(
		".full-width-split-screen img"
	);
	const pictures = document.querySelectorAll<HTMLPictureElement>(
		".full-width-split-screen picture"
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

// Cleanup function to remove event listeners and clear cache
function cleanup(): void {
	if (!isInitialized) return;

	try {
		// Remove event listeners
		document.removeEventListener(
			"DOMContentLoaded",
			matchSplitScreenImageHeights
		);
		window.removeEventListener("load", matchSplitScreenImageHeights);
		document.removeEventListener(
			"astro:page-load",
			matchSplitScreenImageHeights
		);
		document.removeEventListener(
			"astro:after-swap",
			matchSplitScreenImageHeights
		);

		if (debouncedResize) {
			window.removeEventListener("resize", debouncedResize);
		}

		// Clear cache
		clearCache();

		// Reset all heights
		resetAllHeights();

		isInitialized = false;
	} catch (error) {
		console.error("Error during cleanup:", error);
	}
}

// Auto-initialize
initSplitScreenHeightMatcher();

// Export for manual use if needed
export {
	matchSplitScreenImageHeights,
	initSplitScreenHeightMatcher,
	cleanup,
	clearCache,
};
