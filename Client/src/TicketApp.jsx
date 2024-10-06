import { UIProvider } from "./Context/UIContext";
import { SocketProvider } from "./Context/SocketContext";
import { RouterPage } from "./Pages/RouterPage";

export const TicketApp = () => {
  return (
    <SocketProvider>
      <UIProvider>
        <RouterPage />
      </UIProvider>
    </SocketProvider>
  );
};
