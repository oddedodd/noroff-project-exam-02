import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Link } from 'react-router-dom';

/**
 * Sidebar component for venue details displaying availability calendar, booking button and amenities
 * @param {Object} props Component props
 * @param {Array<{name: string, icon: JSX.Element, enabled: boolean}>} props.amenities Array of venue amenities with name, icon and enabled status
 * @param {number} props.price Venue price per night
 * @param {number} props.maxGuests Maximum number of guests allowed
 * @param {number} props.rating Venue rating
 * @param {string} props.venueId Unique identifier for the venue
 * @param {Array<{dateFrom: string, dateTo: string}>} props.bookings Array of booking periods with start and end dates
 * @returns {JSX.Element} VenueSidebar component
 */
function VenueSidebar({ amenities, price, maxGuests, rating, venueId, bookings }) {
  // Convert bookings to calendar events
  const bookingEvents = bookings.map(booking => {
    const startDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);
    
    return {
      title: 'Booked',
      start: startDate,
      end: endDate,
      display: 'block',
      color: '#f25c54',
      textColor: '#fbf7f1',
      allDay: true
    };
  });

  return (
    <aside className="bg-white p-6 rounded space-y-6 self-start">
      <div>
        <h4 className="text-lg text-cocoa-dark font-semibold mb-2 font-[dm_sans]">Check availability</h4>
        <div className="p-2">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            dayMaxEvents={true}
            weekends={true}
            events={bookingEvents}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: ''
            }}
            timeZone="local"
            eventDisplay="block"
            selectable={false}
            editable={false}
            droppable={false}
          />
        </div>
      </div>

      <Link 
        to={`/venue/${venueId}/book`}
        className="block w-full bg-[#ef665b] hover:bg-[#e4534a] text-white py-2 font-semibold rounded text-center"
      >
        BOOK NOW
      </Link>

      <div>
        <h4 className="font-semibold mb-2">What this place offers</h4>
        <ul className="space-y-2">
          {amenities.map((a, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              {a.icon}
              {a.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default VenueSidebar;