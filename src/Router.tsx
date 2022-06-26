import { Route, Routes } from "react-router-dom";
import { Event } from "./pages/Event";
import { Landing } from "./pages/Landing";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/event" element={<Event />}/>
            <Route path="/event/lesson/:slug" element={<Event />}/>
        </Routes>
    )
}