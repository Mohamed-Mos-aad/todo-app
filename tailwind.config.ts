import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // 2. هنا بنربط الخط
                sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui"],
            },
            // ... هنا المفروض يكون فيه إعدادات Shadcn للألوان والـ Animations
        },
    },
    // plugins: [require("tailwindcss-animate")], // مهم جداً لـ Shadcn
};

export default config;