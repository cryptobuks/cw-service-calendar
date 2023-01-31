module.exports = {
  defaultSettings: {
    calendarVisibility: {
      daysBefore: 30,
      daysAfter: 30
    },
    bookingRules: {
      startTime: 72,
      endTime: 10,
      unBookingTime: 60,
      violationsPeriod: 60,
      numberOfViolations: 3,
      penaltyPeriod: 7
    },
    trackPresence: {
      startTime: 5,
      userEndTime: 15,
      trainerEndTime: 120
    },
    trainerSubstitution: {
      endTime: 72
    }
  }
}
