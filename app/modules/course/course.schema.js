const createUpdateProperties = {
  status: {
    type: 'string',
    enum: ['draft', 'active']
  },
  name: {
    type: 'string'
  },
  description: {
    type: 'string'
  },
  color: {
    type: 'string'
  },
  sports: {
    type: 'array',
    items: {
      type: 'string',
      typeof: 'ObjectId'
    }
  },
  guests: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['profileId'],
      properties: {
        profileId: {
          type: 'string',
          typeof: 'ObjectId'
        }
      }
    }
  },
  activityId: {
    type: 'string'
  },
  inPresence: {
    type: 'object',
    properties: {
      price: {
        type: 'number'
      },
      singleBuy: {
        type: 'boolean'
      }
    }
  },
  inRemote: {
    type: 'object',
    properties: {
      price: {
        type: 'number'
      },
      singleBuy: {
        type: 'boolean'
      }
    }
  },
  singleBuyDate: {
    type: 'object',
    properties: {
      start: {
        type: 'string'
      },
      end: {
        type: 'string'
      }
    }
  },
  intensity: {
    type: 'number'
  },
  vatRateId: {
    type: 'string'
  },
  weightOfZeroVat: {
    type: 'string'
  },
  isPublic: {
    type: 'boolean'
  },
  age: {
    type: 'object',
    properties: {
      min: {
        type: 'number'
      },
      max: {
        type: 'number'
      }
    }
  },
  date: {
    type: 'object',
    properties: {
      start: {
        type: 'string'
      },
      end: {
        type: 'string'
      }
    }
  },
  reporting: {
    type: 'boolean'
  },
  chatGroup: {
    type: 'string',
    nullable: true
  },
  note: {
    type: 'string'
  },
  lessons: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        location: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['room', 'address']
              },
              roomId: {
                type: 'string'
              },
              address: {
                type: 'object',
                properties: {
                  loc: {
                    type: 'string'
                  },
                  lat: {
                    type: 'number'
                  },
                  lng: {
                    type: 'number'
                  },
                  placeId: {
                    type: 'string'
                  }
                }
              },
              capacity: {
                type: 'number'
              }
            }
          }
        },
        time: {
          type: 'object',
          properties: {
            start: {
              type: 'string'
            },
            end: {
              type: 'string'
            }
          }
        },
        datetime: {
          type: 'object',
          properties: {
            start: {
              type: 'string'
            },
            end: {
              type: 'string'
            },
            endAfter: {
              type: 'number'
            }
          }
        },
        sanitificationTime: {
          type: 'number'
        },
        recurrence: {
          type: 'number'
        },
        period: {
          type: 'string',
          enum: ['day', 'week']
        },
        dayOfWeek: {
          type: 'array',
          items: {
            type: 'number',
            minimum: 0,
            maximum: 6
          }
        },
        trainerIds: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        entries: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              location: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['room', 'address']
                    },
                    roomId: {
                      type: 'string'
                    },
                    address: {
                      type: 'object',
                      properties: {
                        loc: {
                          type: 'string'
                        },
                        lat: {
                          type: 'number'
                        },
                        lng: {
                          type: 'number'
                        },
                        placeId: {
                          type: 'string'
                        }
                      }
                    },
                    capacity: {
                      type: 'number'
                    }
                  }
                }
              },
              datetime: {
                type: 'object',
                properties: {
                  start: {
                    type: 'string'
                  },
                  end: {
                    type: 'string'
                  }
                }
              },
              trainers: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    trainerId: {
                      type: 'string'
                    },
                    time: {
                      type: 'object',
                      properties: {
                        start: {
                          type: 'string'
                        },
                        end: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
module.exports = {
  createCourse: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['name', 'status'],
        properties: {
          ...createUpdateProperties
        }
      }
    }
  },
  updateCourse: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['courseId', 'name', 'status'],
        properties: {
          courseId: {
            type: 'string',
            typeof: 'ObjectId'
          },
          ...createUpdateProperties
        }
      }
    }
  },
  deleteCourse: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['courseId'],
        properties: {
          courseId: {
            type: 'string',
            typeof: 'ObjectId'
          }
        }
      }
    }
  },
  getCourses: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object'
      }
    }
  },
  getCourse: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['courseId'],
        properties: {
          courseId: {
            type: 'string',
            typeof: 'ObjectId'
          }
        }
      }
    }
  }
}
