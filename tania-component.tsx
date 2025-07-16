import React from "react";

export default function Component() {
  return (
    <>
      <div
        className="w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl overflow-hidden"
        style={{
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(229, 231, 235)",
          boxSizing: "border-box",
          height: "20rem",
          width: "20rem",
          borderRadius: "1.5rem",
          overflow: "hidden",
        }}
      >
        <img
          src="/Tania.jpeg"
          alt="Tania's Photo"
          className="w-full h-full object-cover"
          style={{
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(229, 231, 235)",
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
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