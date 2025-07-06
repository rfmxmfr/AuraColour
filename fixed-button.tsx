import React from "react";

export default function Component() {
  return (
    <>
      <a
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
        href="/questionnaire"
        style={{
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(229, 231, 235)",
          boxSizing: "border-box",
          textDecoration: "inherit",
          display: "inline-flex",
          alignItems: "center",
          borderRadius: "9999px",
          backgroundImage: "linear-gradient(to right, #9333ea , #db2777)",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          fontWeight: 600,
          color: "rgb(255 255 255 / var(--tw-text-opacity, 1))",
          transitionProperty: "all",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "200ms",
          textAlign: "center",
        }}
      >
        Start Your Analysis
        <svg
          className="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(229, 231, 235)",
            boxSizing: "border-box",
            display: "block",
            verticalAlign: "middle",
            marginLeft: "0.5rem",
            height: "1.25rem",
            width: "1.25rem",
          }}
        >
          <path
            d="M13 7l5 5m0 0l-5 5m5-5H6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            style={{
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(229, 231, 235)",
              boxSizing: "border-box",
            }}
          />
        </svg>
      </a>
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
  border-width: 0px;
  border-style: solid;
  border-color: rgb(229, 231, 235);
  box-sizing: border-box;
  line-height: 1.5;
  text-size-adjust: 100%;
  tab-size: 4;
  font-feature-settings: normal;
  font-variation-settings: normal;
  -webkit-tap-highlight-color: transparent;
  scroll-behavior: smooth;
  font-family: Inter, "Century Gothic", sans-serif;
}

body {
  border-width: 0px;
  border-style: solid;
  border-color: rgb(229, 231, 235);
  box-sizing: border-box;
  margin: 0px;
  line-height: inherit;
  background: #000000;
  transition: background-color 0.3s, color 0.3s;
  color: #FFF5E1;
  font-feature-settings: "rlig", "calt";
  font-weight: 400;
  letter-spacing: normal;
  -webkit-font-smoothing: antialiased;
  font-family: Inter, "Inter Fallback";
  font-style: normal;
}
`,
        }}
      />
    </>
  );
}