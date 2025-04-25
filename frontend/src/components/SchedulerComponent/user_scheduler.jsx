import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import './scheduler.css';
import Booking from './Booking';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const localizer = momentLocalizer(moment);

export default function UserMyCalendar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const EventComponent = ({ event }) => (
    <div style={{ textAlign: 'left', paddingLeft: '10px' }}>
      <FontAwesomeIcon
        icon={faBuilding}
        style={{ display: 'block', marginBottom: 5, paddingTop: 10, paddingLeft: 2 }}
      />
      <div style={{ fontWeight: 550, fontSize: '15px' }}>{event.title}</div>
      <div style={{ fontWeight: 'bold', fontSize: '10px', color: '#E8E9EB', paddingBottom: '20px' }}>
        {event.location}
      </div>
    </div>
  );

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fixed URL to match the server route structure - added /PropertiesController prefix
        const response = await axios.get('http://localhost:5001/PropertiesController/getproperties');
        if (response.data && response.data.data) {
          const propertyEvents = response.data.data.map(property => ({
            id: property._id,
            title: property.propertyName,
            start: new Date(property.eventDate),
            end: new Date(new Date(property.eventDate).setHours(new Date(property.eventDate).getHours() + 1)),
            location: property.sellerName,
            description: property.description,
            contactNumber: property.contactNumber,
            priceNegotiable: property.priceNegotiable,
            propertyPhotos: property.propertyPhotos,
            availableTime: property.availableTime,
            allDay: false,
            resource: property
          }));
          console.log('Fetched properties:', propertyEvents);
          setEvents(propertyEvents);
          setProperties(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        // Show a more user-friendly message and error details
        alert('Unable to load properties. Please ensure the server is running.');
        // Add fallback or placeholder content if needed
        setEvents([]);
      }
    };

    fetchProperties();
  }, []);

  // ✅ Fix: Ensure start & end dates are parsed correctly
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      const parsedEvents = storedEvents.map(event => ({
        ...event,
        start: new Date(event.start), 
        end: new Date(event.end),
      }));
      setEvents(prevEvents => [...prevEvents, ...parsedEvents]);
    }
  }, []);

  const saveEventsToLocalStorage = (updatedEvents) => {
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  // ✅ Fix: Proper event handling & date conversion
  const handleAddOrUpdateEvent = (eventData) => {
    let updatedEvents;
    
    if (selectedEvent) {
      updatedEvents = events.map((event) =>
        event.id === selectedEvent.id
          ? { ...eventData, start: new Date(eventData.start), end: new Date(eventData.end) }
          : event
      );
    } else {
      updatedEvents = [
        ...events,
        { ...eventData, id: Date.now(), start: new Date(eventData.start), end: new Date(eventData.end) }
      ];
    }

    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    setShowOffcanvas(false);
    setSelectedEvent(null);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowOffcanvas(true);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter((event) => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      saveEventsToLocalStorage(updatedEvents);
      setSelectedEvent(null);
      setShowOffcanvas(false);
    }
  };

  return (
    <div className="user-calender-container">
      <div className="toolBar">
        <div className="btn-sidebar-group">
          <div className="calender-logo"><i className="bi bi-buildings-fill"></i> Ease Estate</div>
          <h6 className="menu-heading">MENU</h6>
          <div className="btn-with-text" style={{ cursor: "pointer" }}>
            <button><i className="bi bi-house-door-fill"></i></button>
            <span>Home</span>
          </div>
          <div className="btn-with-text" style={{ cursor: "pointer" }}>
            <button><i className="bi bi-credit-card-2-back-fill"></i></button>
            <span>Payments</span>
          </div>
          <div className="btn-with-text" style={{ cursor: "pointer" }}>
            <button><i className="bi bi-house-up-fill"></i></button>
            <span>Maintenance</span>
          </div>
          <div className="btn-with-text" onClick={() => navigate("/Addprop")} style={{ cursor: "pointer" }}>
            <button><i className="bi bi-patch-plus-fill"></i></button>
            <span>Add Property</span>
          </div>
          <h6 className="data-heading" >DATA</h6>
          <div className="btn-with-text" style={{ cursor: "pointer" }}>
            <button><i className="bi bi-people-fill"></i></button>
            <span>Tenants</span>
          </div>
          <div className="btn-with-text" style={{ cursor: "pointer" }}>
            <button><i className="bi bi-arrow-left-right"></i></button>
            <span>Transactions</span>
          </div>
        </div>
      </div>

      <div className="calenderio">
        <Calendar
          localizer={localizer}
          events={events} 
          startAccessor="start"
          endAccessor="end"
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          views={['month', 'week', 'day', 'agenda']}
          view={view}
          onView={setView}
          onSelectEvent={handleSelectEvent}
          className="calender"
          components={{
            toolbar: CustomToolbar,
            event: EventComponent,
          }}
       
        />
      </div>

      <Booking
        show={showOffcanvas}
        setShow={setShowOffcanvas}
        selectedEvent={selectedEvent}
      />
    </div>
  );
}

const CustomToolbar = ({ label, onView, onNavigate, views }) => {
  const [itemText, setItemText] = useState('month');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleViewChange = (view) => {
    onView(view);
    setItemText(view);
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-6 py-4 px-2">
      {/* Calendar Label */}
      <h1 className="text-3xl font-semibold text-gray-800">{label}</h1>

      {/* Dropdown and Navigation */}
      <div className="flex items-center gap-9">
        {/* View Dropdown */}
        <div className="relative">
          <button
            type="button"
            className="px-3.5 py-2 bg-white text-green-800 rounded-full shadow-md hover:bg-gray-100 hover:text-black transition focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-haspopup="true"
            aria-expanded={showDropdown ? "true" : "false"}
            aria-label="Select calendar view"
          >
            <i className="bi bi-calendar4 mr-2" />
            {itemText}
            <i className="bi bi-caret-down-fill ml-1" />
          </button>

          {showDropdown && (
            <ul className="absolute right-0 z-50 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md">
              {views.map((view, index) => (
                <div key={index}>
                  <li>
                    <button
                      onClick={() => handleViewChange(view)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-gray-800 font-semibold"
                      aria-label={`Select ${view} view`}
                    >
                      {view}
                    </button>
                  </li>
                  {index === 2 && <hr className="border-t my-1" />}
                </div>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-6 mr-10">
          <button
            className="px-3.5 py-2 bg-white text-green-800 rounded-full shadow-md hover:bg-gray-100 hover:text-black transition focus:outline-none"
            onClick={() => onNavigate('TODAY')}
            aria-label="Go to today's date"
          >
            Today
          </button>
          <button
            className="text-green-700 hover:text-green-800 transition"
            onClick={() => onNavigate('PREV')}
            aria-label="Go to previous date"
            title="Previous"
          >
            <i className="bi bi-caret-left-fill text-xl" />
          </button>
          <button
            className="text-green-700 hover:text-green-800 transition"
            onClick={() => onNavigate('NEXT')}
            aria-label="Go to next date"
            title="Next"
          >
            <i className="bi bi-caret-right-fill text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
