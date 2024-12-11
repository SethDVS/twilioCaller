const axios = require('axios');

const WEBHOOK_URL = 'url';

const bookService = async function(args) {
  try {
    // Send booking request to webhook with caller number and booking time
    const response = await axios.post(WEBHOOK_URL, {
      number: args.callerNumber,
      message: args.booking_time
    });

    // Parse the webhook response
    const data = response.data;
    const status = data.Status || 'unknown';
    const bookingMessage = data.Booking || 'Unable to process booking request';

    // Return formatted response
    return {
      status: status === 'Successful' ? 'success' : 'failed',
      message: status === 'Successful' 
        ? `Successfully booked your service for ${args.booking_time}. ${bookingMessage}`
        : `Booking unsuccessful: ${bookingMessage}`
    };

  } catch (error) {
    console.error('Error booking service:', error);
    return {
      status: 'failed',
      message: 'Sorry, there was an error processing your booking request. Please try again or call during business hours.'
    };
  }
};

module.exports = bookService;