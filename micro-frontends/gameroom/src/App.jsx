import { useState } from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import {
    GameRoomPage,
    LobbyPage
} from "./pages";
import {
    SpeedRun,
    Sprint50,
    GameOverModal
} from "./components";

function App() {
    return (
    <>
        <Routes>
            <Route path={"/lobby"} element={<LobbyPage />} />
            <Route path={"/game-room"} element={<GameRoomPage />}>
                <Route path={"speedrun"} element={<SpeedRun />} />
                <Route path={"sprint50"} element={<Sprint50 />} />
                <Route path={"*"} element={<h1>Route not found. Click <a href={"/lobby"}>here</a> to return to the lobby.</h1>} />
            </Route>
        </Routes>
        <GameOverModal />
    </>
    )
}

export default App
