import { createRoot } from "react-dom/client";
import { DynamicForm } from "./DynamicForm";
import { setupStore } from "./app/store";
import { Provider } from "react-redux";
import { AlchemyProvider } from "@m/alchemy-ui/AlchemyProvider";

createRoot(document.getElementById("root")!).render(
  <Provider store={setupStore()}>
    <AlchemyProvider>
      <DynamicForm />
    </AlchemyProvider>
  </Provider>
);
