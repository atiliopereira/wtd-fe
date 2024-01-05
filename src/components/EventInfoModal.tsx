import React, { SetStateAction, MouseEvent, Dispatch } from "react";
import { IEventInfo } from "./EventCalendar";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Button } from "@mui/material";

interface EventProps {
    open: boolean;
    handleClose: Dispatch<SetStateAction<void>>;
    currentEvent: IEventInfo | null;
}

const EventInfoModal = ({ open, handleClose, currentEvent }: EventProps) => {
    const onClose = () => {
        handleClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {currentEvent?.title} <span style={{ color: "gray", fontWeight: "lighter", fontSize: "0.8em"}}>({currentEvent?.status})</span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography sx={{ fontsize: 14 }} color="text.secondary" gutterBottom>
                        <p>{currentEvent?.description}</p>
                        <p> &#128205; {currentEvent?.location}</p>
                        <ul style={{ margin: 0, padding: 0 }}>
                            <li>start: {currentEvent?.start.toLocaleString()}</li>
                            <li>end: {currentEvent?.end.toLocaleString()}</li>
                        </ul>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EventInfoModal;