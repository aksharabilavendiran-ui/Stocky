import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    srcDirectory: ".",
    router: {
      routesDirectory: "src/routes",
      generatedRouteTree: "routeTree.gen.ts",
    },
  },
});