import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/components/sections/Hero",
              message:
                "Home uses HomeIdentity. Recruiter chrome is WorkHeader on /work. Do not remount Hero.",
            },
            {
              name: "@/components/sections/ProofBand",
              message:
                "ProofBand is not on any live route. Do not import it from src/app.",
            },
            {
              name: "@/components/ui/ProofChips",
              message:
                "Proof chips are not on the publisher home. Do not import ProofChips from src/app.",
            },
            {
              name: "@/components/ui/EmployerRow",
              message:
                "EmployerRow is not on any live route. Do not import it from src/app.",
            },
            {
              name: "@/components/ui/card",
              message:
                "card.ts is unused. Do not import it from src/app.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
