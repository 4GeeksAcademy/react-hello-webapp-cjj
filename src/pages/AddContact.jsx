import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id && store.currentContact) {
            setFormData(store.currentContact);
        } else {
            setFormData({ name: "", email: "", phone: "", address: "" });
        }
    }, [id, store.currentContact]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            alert("Por favor llena todos los campos");
            return;
        }

        if (id) {
            actions.updateContact(id, formData, navigate);
        } else {
            actions.createContact(formData, navigate);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">{id ? "Editar Contacto" : "Añadir un nuevo contacto"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre y Apellido" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Número de teléfono" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="Calle, Ciudad" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar</button>
                <Link className="btn btn-link mt-2 w-100" to="/">Volver a contactos</Link>
            </form>
        </div>
    );
};