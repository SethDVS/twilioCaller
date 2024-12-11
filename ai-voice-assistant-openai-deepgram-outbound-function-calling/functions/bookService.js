require("dotenv").config();
const { Pool } = require("pg");

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessary for Neon; use true if you have a valid certificate
  },
});

const bookService = async function (args) {
  if (!args.callerNumber || !args.booking_time) {
    return {
      status: "failed",
      message:
        "Invalid input. Please provide both a phone number and a preferred booking time.",
    };
  }

  try {
    // Save booking details to the database
    const client = await pool.connect();
    try {
      const insertQuery = `
        INSERT INTO bookings (phone_number, preferred_date)
        VALUES ($1, $2)
        RETURNING id;
      `;
      const values = [args.callerNumber, args.booking_time];
      const result = await client.query(insertQuery, values);

      const bookingId = result.rows[0].id;
      console.log(`Booking saved with ID: ${bookingId}`);

      // Return success response
      return {
        status: "success",
        message: `Booking successfully saved with ID: ${bookingId}.`,
      };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error saving booking:", error);

    return {
      status: "failed",
      message:
        "There was an error saving your booking. Please try again later.",
    };
  }
};

module.exports = bookService;
