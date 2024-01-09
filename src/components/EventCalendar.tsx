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
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from '@mui/material';
import { Add } from '@mui/icons-material';
import AddEventModal from './AddEventModal';

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
    const [addEventModal, setAddEventModal] = React.useState<boolean>(false);
    const [events, setEvents] = React.useState<IEventInfo[]>([]);

    const handleSelectEvent = (event: IEventInfo) => {
        setCurrentEvent(event);
        setEventInfoModal(true);
    }

    const fetchEvents = () => {
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
    }


    React.useEffect(fetchEvents, []);
    
    return (
        <Box 
            mt={2}
            mb={2}
            component="main"
            sx={{
                flexGrow: 1,
            }}
        >
            <Container maxWidth={false}>
                <Card>
                <CardHeader title="WTD (what to do?)" subheader="Create Events and share them easily" />
                    <CardContent>
                        <Box sx={{ justifyContent: "space-between" }}>
                            <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
                                <Button color="secondary">Map View</Button>
                                <Button color="primary" onClick={() => setAddEventModal(true)}>Create Event</Button>
                            </ButtonGroup>
                        </Box>
                        <Divider style={{ margin: 15 }} />
                        <EventInfoModal
                            open={eventInfoModal}
                            handleClose={() => setEventInfoModal(false)}
                            currentEvent={currentEvent as IEventInfo}
                        />
                        <AddEventModal
                            open={addEventModal}
                            handleClose={() => setAddEventModal(false)}
                            fetchEvents={fetchEvents}
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
                    </CardContent>
                </Card>
            </Container>
        </Box>
        );
  }
  
  export default EventCalendar;
  