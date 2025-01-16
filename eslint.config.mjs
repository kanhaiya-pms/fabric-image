const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Disable specific rules
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
