/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/index.css";
import "@radix-ui/colors/blackA.css";
import "@radix-ui/colors/grass.css";
import "@radix-ui/colors/green.css";
import "@radix-ui/colors/mauve.css";
import "@radix-ui/colors/violet.css";
import "@radix-ui/colors/amber.css";
import "@radix-ui/colors/red.css";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "./context/user.jsx";
import { Tooltip } from "@radix-ui/react-tooltip";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <TooltipProvider delayDuration={700}>
            <App />
          </TooltipProvider>
        </UserProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
