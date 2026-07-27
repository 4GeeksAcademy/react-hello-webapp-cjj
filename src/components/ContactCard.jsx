import React, { useContext, useState } from "react";
import { Context } from "../store";
import { useNavigate } from "react-router-dom";

export const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleEdit = () => {
        actions.setContactToEdit(contact);
        navigate(`/edit/${contact.id}`);
    };

    return (
        <div className="card mb-3 p-3 shadow-sm">
            <div className="row g-0 align-items-center">
                <div className="col-md-3 text-center">
                    <img
                        src="https://picsum.photos/200"
                        className="rounded-circle img-fluid"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        alt="Avatar"
                    />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text mb-1"><i className="fas fa-map-marker-alt me-2 text-muted"></i>{contact.address}</p>
                        <p className="card-text mb-1"><i className="fas fa-phone me-2 text-muted"></i>{contact.phone}</p>
                        <p className="card-text"><i className="fas fa-envelope me-2 text-muted"></i>{contact.email}</p>
                    </div>
                </div>
                <div className="col-md-2 text-end">
                    <button className="btn text-primary me-2" onClick={handleEdit}>
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className="btn text-danger" onClick={() => setShowModal(true)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">¿Estás seguro?</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Vas a eliminar a {contact.name} de tus contactos.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-danger" onClick={() => { actions.deleteContact(contact.id); setShowModal(false); }}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};