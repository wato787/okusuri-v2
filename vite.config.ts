import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "icon-192x192.png", "icon-512x512.png"],
			manifest: {
				name: "Okusuri - 薬管理アプリ",
				short_name: "Okusuri",
				description: "服薬記録と管理のためのアプリケーション",
				theme_color: "#2563eb",
				background_color: "#ffffff",
				display: "standalone",
				scope: "/",
				start_url: "/",
				icons: [
					{
						src: "icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any maskable",
					},
					{
						src: "icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/api\./,
						handler: "NetworkFirst",
						options: {
							cacheName: "api-cache",
							networkTimeoutSeconds: 10,
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
