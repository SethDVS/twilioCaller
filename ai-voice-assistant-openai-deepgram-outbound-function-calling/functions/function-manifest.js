// Create metadata for all the available functions to pass to completions API
const tools = [
  {
    type: 'function',
    function: {
      name: 'bookService',
      say: 'Let me check the availability and book that service time for you.',
      description: 'Book a car service appointment for the customer',
      parameters: {
        type: 'object',
        properties: {
          booking_time: {
            type: 'string',
            description: 'The requested date and time for the service booking'
          }
        },
        required: ['booking_time'],
      },
      returns: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Whether the booking was successful or not'
          },
          message: {
            type: 'string',
            description: 'Details about the booking or error message'
          }
        }
      }
    },
  }
];

module.exports = tools;