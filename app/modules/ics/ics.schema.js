module.exports = {
  getCalendarEvents: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      params: {
        type: 'object',
        required: ['token'],
        properties: {
          token: {
            type: 'string'
          }
        }
      }
    }
  }
}
