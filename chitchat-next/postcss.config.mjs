const config = {
  plugins: [
    "@tailwindcss/postcss",
    [
      "postcss-pxtorem",
      {
        rootValue: 75,
        propList: ["*"],
        exclude: /node_modules/i,
      },
    ],
  ],
};

export default config;
