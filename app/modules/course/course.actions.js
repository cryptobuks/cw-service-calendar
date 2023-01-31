const { ctr } = require('@cowellness/cw-micro-service')()

/**
 * @class CourseActions
 * @classdesc Actions Course
 */
class CourseActions {
  async createCourse (data, reply) {
    const course = await ctr.course.createCourse(data)

    return reply.cwSendSuccess({
      data: {
        course
      }
    })
  }

  async updateCourse (data, reply) {
    const course = await ctr.course.updateCourse(data)

    return reply.cwSendSuccess({
      data: {
        course
      }
    })
  }

  async deleteCourse (data, reply) {
    const deleted = await ctr.course.deleteCourse(data)

    return reply.cwSendSuccess({
      data: {
        deleted
      }
    })
  }

  async getCourses (data, reply) {
    const courses = await ctr.course.getCourses(data)

    return reply.cwSendSuccess({
      data: {
        courses
      }
    })
  }

  async getCourse (data, reply) {
    const course = await ctr.course.getCourse(data)

    return reply.cwSendSuccess({
      data: {
        course
      }
    })
  }
}

module.exports = CourseActions
