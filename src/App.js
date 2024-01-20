import React from "react";
import ReactDOM from "react-dom/client";
import ChipInput from "./components/ChipInput";

const AppLayout = () => {
    return (
        <div className="app">
            <ChipInput />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
