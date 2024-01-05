import React from 'react';
import { Calendar, type Event, dateFnsLocalizer } from "react-big-calendar"


import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "react-big-calendar/lib/css/react-big-calendar.css"

import EventInfoModal from './EventInfoModal';
import { set } from 'date-fns';

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export interface IEventInfo extends Event {
    _id: string
    description: string
    start: Date
    end: Date
    location: string
    status: string
}


function EventCalendar() {
    const [currentEvent, setCurrentEvent] = React.useState<IEventInfo | null>(null);
    const [eventInfoModal, setEventInfoModal] = React.useState<boolean>(false);
    const [events, setEvents] = React.useState<IEventInfo[]>([]);

    const handleSelectEvent = (event: IEventInfo) => {
        setCurrentEvent(event);
        setEventInfoModal(true);
    }

    React.useEffect(() => {
        fetch("http://localhost:8000/api/v1/events/")
            .then(res => res.json())
            .then(data => {
                data.forEach((event: IEventInfo) => {
                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                });
                console.log(data);
                setEvents(data);
            });
    }, []);

    return (
        <div> 
            <EventInfoModal
                open={eventInfoModal}
                handleClose={() => setEventInfoModal(false)}
                currentEvent={currentEvent as IEventInfo}
            />
            <Calendar
            localizer={localizer}
            events={events}
            onSelectEvent={handleSelectEvent}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            style={{
                height: 900,
            }}
            />
        </div>
        );
  }
  
  export default EventCalendar;
  