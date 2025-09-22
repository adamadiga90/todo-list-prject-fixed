import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // or @vitejs/plugin-react
import tailwindcss from "@tailwindcss/vite"; // Add this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // Add Tailwind CSS plugin
    react(), // Keep React plugin
  ],
});
