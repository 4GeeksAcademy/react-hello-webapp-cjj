import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Contacts } from "./pages/Contacts";
import { AddContact } from "./pages/AddContact";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Contacts />} />
                <Route path="/add" element={<AddContact />} />
                <Route path="/edit/:id" element={<AddContact />} />
                <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>
        </BrowserRouter>
    );
};