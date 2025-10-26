
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "../store/store";
import { Provider } from "react-redux";


export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}
