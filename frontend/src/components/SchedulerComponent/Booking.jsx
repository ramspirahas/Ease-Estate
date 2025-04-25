import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import moment from "moment";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faPhone, faDollarSign, faClock, faCalendarAlt, faInfo } from '@fortawesome/free-solid-svg-icons';
import AddAppointment from '../AppointmentManagement/AddAppointment';

function Booking({ setShow, show, selectedEvent }) {
    const handleClose = () => setShow(false);
    const [showAppointment, setShowAppointment] = useState(false);
    
    // Check if we have a property selected
    const isProperty = selectedEvent && selectedEvent.resource;
    
    // Format price negotiable text
    const getPriceNegotiableText = () => {
        if (!selectedEvent || !selectedEvent.priceNegotiable) return 'No';
        return selectedEvent.priceNegotiable ? 'Yes' : 'No';
    };

    // Format the event date nicely
    const getFormattedDate = () => {
        if (!selectedEvent || !selectedEvent.start) return '';
        return moment(selectedEvent.start).format('MMMM DD, YYYY');
    };

    // Handle scheduling a visit - show appointment form
    const handleScheduleVisit = () => {
        setShow(false); // Hide the booking popup first
        setShowAppointment(true);
    };

    // Handle appointment form close
    const handleAppointmentClose = () => {
        setShowAppointment(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton className="bg-green-700 text-white">
                    <Modal.Title>
                        {selectedEvent ? selectedEvent.title : 'Property Details'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent ? (
                        <div className="property-details">
                            {/* Property Image */}
                            {selectedEvent.propertyPhotos && (
                                <div className="mb-4 text-center">
                                    <img 
                                        src={`http://localhost:5000${selectedEvent.propertyPhotos}`}
                                        alt={selectedEvent.title}
                                        className="img-fluid rounded"
                                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <h5 className="property-detail-heading">
                                        <FontAwesomeIcon icon={faBuilding} className="me-2 text-green-700" />
                                        Property Name
                                    </h5>
                                    <p className="property-detail-value">{selectedEvent.title}</p>
                                </div>
                                
                                <div className="col-md-6">
                                    <h5 className="property-detail-heading">
                                        <FontAwesomeIcon icon={faUser} className="me-2 text-green-700" />
                                        Seller Name
                                    </h5>
                                    <p className="property-detail-value">{selectedEvent.location}</p>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <h5 className="property-detail-heading">
                                        <FontAwesomeIcon icon={faPhone} className="me-2 text-green-700" />
                                        Contact Number
                                    </h5>
                                    <p className="property-detail-value">{selectedEvent.contactNumber}</p>
                                </div>
                                
                                <div className="col-md-6">
                                    <h5 className="property-detail-heading">
                                        <FontAwesomeIcon icon={faDollarSign} className="me-2 text-green-700" />
                                        Price Negotiable
                                    </h5>
                                    <p className="property-detail-value">{getPriceNegotiableText()}</p>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <h5 className="property-detail-heading">
                                        <FontAwesomeIcon icon={faClock} className="me-2 text-green-700" />
                                        Available Time
                                    </h5>
                                    <p className="property-detail-value">{selectedEvent.availableTime}</p>
                                </div>
                                
                                <div className="col-md-6">
                                    <h5 className="property-detail-heading">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-green-700" />
                                        Event Date
                                    </h5>
                                    <p className="property-detail-value">{getFormattedDate()}</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h5 className="property-detail-heading">
                                    <FontAwesomeIcon icon={faInfo} className="me-2 text-green-700" />
                                    Description
                                </h5>
                                <p className="property-detail-value">{selectedEvent.description}</p>
                            </div>
                        </div>
                    ) : (
                        <p>No property selected.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className='btn bg-green-500 text-white border-none hover:bg-green-700' onClick={handleScheduleVisit}>
                        Schedule Visit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* AddAppointment modal */}
            <AddAppointment 
                show={showAppointment}
                onHide={() => {
                    handleAppointmentClose();
                    handleClose(); // Optionally close the property details as well
                }}
                propertyData={selectedEvent}
            />
        </>
    );
}
export default Booking;