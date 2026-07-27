import React, { useContext } from "react";
import { Context } from "../store";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Contacts = () => {
    const { store } = useContext(Context);

    return (
        <div className="container">
            <h1 className="text-center my-4">Lista de Contactos</h1>
            <p className="text-end">
                <Link to="/add" className="btn btn-success">
                    Añadir nuevo contacto
                </Link>
            </p>
            <div className="row-cols-1">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))
                ) : (
                    <p className="text-center">No hay contactos guardados todavía.</p>
                )}
            </div>
        </div>
    );
};