import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
    const [store, setStore] = useState({
        contacts: [],
        currentContact: null
    });

    const HOST = "https://playground.4geeks.com/contact";
    const AGENDA_SLUG = "charleychimpy07";

    const actions = {
        loadContacts: async () => {
            try {
                let response = await fetch(`${HOST}/agendas/${AGENDA_SLUG}/contacts`);
                if (response.status === 404) {
                    await actions.createAgenda();
                    return;
                }
                let data = await response.json();
                setStore((prev) => ({ ...prev, contacts: data.contacts }));
            } catch (error) {
                console.error(error);
            }
        },
        createAgenda: async () => {
            try {
                let response = await fetch(`${HOST}/agendas/${AGENDA_SLUG}`, {
                    method: "POST"
                });
                if (response.ok) {
                    actions.loadContacts();
                }
            } catch (error) {
                console.error(error);
            }
        },
        createContact: async (contactData, navigate) => {
            try {
                let response = await fetch(`${HOST}/agendas/${AGENDA_SLUG}/contacts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData)
                });
                if (response.ok) {
                    await actions.loadContacts();
                    navigate("/");
                }
            } catch (error) {
                console.error(error);
            }
        },
        updateContact: async (id, contactData, navigate) => {
            try {
                let response = await fetch(`${HOST}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData)
                });
                if (response.ok) {
                    await actions.loadContacts();
                    setStore((prev) => ({ ...prev, currentContact: null }));
                    navigate("/");
                }
            } catch (error) {
                console.error(error);
            }
        },
        deleteContact: async (id) => {
            try {
                let response = await fetch(`${HOST}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    await actions.loadContacts();
                }
            } catch (error) {
                console.error(error);
            }
        },
        setContactToEdit: (contact) => {
            setStore((prev) => ({ ...prev, currentContact: contact }));
        }
    };

    useEffect(() => {
        actions.loadContacts();
    }, []);

    return (
        <Context.Provider value={{ store, actions }}>
            {children}
        </Context.Provider>
    );
};