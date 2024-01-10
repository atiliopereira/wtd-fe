import { Dispatch, SetStateAction } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import LocationMap from "./AddLocationPickerEventModal";
import { LatLngExpression } from "leaflet";


interface EventFormData {
    title: string
    description: string
    location: string
    start: Date
    end: Date
    tags: string[]
}

interface DatePickerEventFormData {
    start: Date
    end: Date
}

type FetchEventsCallback = () => void;

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    fetchEvents: FetchEventsCallback
}

const AddEventModal = ({ open, handleClose, fetchEvents }: IProps) => {
    const [eventFormData, setEventFormData] = React.useState<EventFormData>({
        title: "",
        description: "",
        location: "",
        start: new Date(),
        end: new Date(),
        tags: [],
    });

    const onSelectLocation = (location: LatLngExpression) => {
        setEventFormData({
            ...eventFormData,
            location: location.toString(),
        })
    }

    const onClose = () => handleClose()

    const onChange = (e: { target: { id: any; value: any; }; }) => {
        setEventFormData({ ...eventFormData, [e.target.id]: e.target.value });
    }

    const onAddEvent = () => {
        fetch("http://localhost:8000/api/v1/events/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventFormData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEventFormData({
                    title: "",
                    description: "",
                    location: "",
                    start: new Date(),
                    end: new Date(),
                    tags: [],
                });
                handleClose();
            })
            .then(() => fetchEvents())
            .catch(err => console.log(err));
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Event</DialogTitle>
            <DialogContent>
                <DialogContentText> Please fill out the form below to add an event to the calendar.</DialogContentText>
                    <Box component="form">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={eventFormData.title}
                            onChange={onChange}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={eventFormData.description}
                            onChange={onChange}
                        />
                        <LocationMap onSetLocation={onSelectLocation} />
                    </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onAddEvent}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddEventModal;