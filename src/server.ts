// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://navid:DQvhMp3ubmVGhJ8@cluster1.rpviiqp.mongodb.net/')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

const bookingSchema = new mongoose.Schema({
    date: String,
    time: String,
    customerName: String,
    level: String,
    cleanerName: String,
    status: Boolean,
});

const Booking = mongoose.model('Booking', bookingSchema);

app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.json(newBooking);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/bookings/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
