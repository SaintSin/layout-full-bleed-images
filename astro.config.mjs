import { defineConfig } from "astro/config";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
	experimental: {},
	prefetch: true,
	integrations: [
		(await import("@playform/compress")).default({
			CSS: true,
			HTML: true,
			Image: false,
			JavaScript: true,
			JSON: true,
			SVG: false,
		}),
	],
});
