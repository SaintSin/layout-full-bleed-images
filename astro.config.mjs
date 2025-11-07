import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'http://localhost:4321',
	experimental: {},
	prefetch: true,
	integrations: [
		sitemap(),
		icon(),
		(await import('@playform/compress')).default({
			CSS: true,
			HTML: true,
			Image: false,
			JavaScript: true,
			JSON: true,
			SVG: false,
		}),
	],
});
