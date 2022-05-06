import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [products, setProducts] = useState<{ name: string; sku: string }[]>([]);

  const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === "IFRAME";

  window.onmessage = (event) => {
    if (event.data.type === "ADD TO BASKET") {
      setProducts([...event.data.data, ...products]);
    }
  };
  const iframe_popup = () => {
    const iframe = document.getElementById("iframe");
    if (isIFrame(iframe) && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          type: "Get products",
        },
        "*"
      );
    }
    // window.top?.postMessage("Сообщение из 1.html", "*");
  };
  // window.addEventListener("message", receiveMessage, false);
  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          right: 0,
          display: "flex",
          width: "15%",
          justifyContent: "space-evenly",
        }}
      >
        <button
          style={{ padding: "0.5rem", height: "max-content" }}
          onClick={() => iframe_popup()}
        >
          Get Progucts
        </button>
        <div
          style={
            {
              // position: "absolute",
              // top: "3rem",
              // right: "0",
              // zIndex: "9999",
              // background: "#fff",
              // paddingRight: "1rem",
            }
          }
        >
          <h3 style={{ fontSize: "25px" }}>Basket</h3>
          <ul>
            {products.map((pr) => (
              <li style={{ fontSize: "20px", listStyle: "none" }}>
                <p>{pr.name}</p>{" "}
                <p
                  style={{
                    color: "#a19a9a",
                    textAlign: "left",
                    fontSize: "11.5px",
                  }}
                >
                  sku: #{pr.sku}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <iframe
        id="iframe"
        // width={500}
        // height={200}
        src="https://living-spaces-ui.herokuapp.com/"
      />
    </div>
  );
}

export default App;
