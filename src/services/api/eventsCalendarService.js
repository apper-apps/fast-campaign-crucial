import eventsCalendarData from "@/services/mockData/eventsCalendar.json";

class EventsCalendarService {
  constructor() {
    this.events = [...eventsCalendarData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.events];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const event = this.events.find(e => e.Id === parseInt(id));
    if (!event) {
      throw new Error(`Event with Id ${id} not found`);
    }
    return { ...event };
  }

  async create(eventData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = this.events.length > 0 ? Math.max(...this.events.map(e => e.Id)) + 1 : 1;
    const newEvent = {
      Id: newId,
      ...eventData
    };
    this.events.push(newEvent);
    return { ...newEvent };
  }

  async update(id, eventData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = this.events.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Event with Id ${id} not found`);
    }
    this.events[index] = { ...this.events[index], ...eventData };
    return { ...this.events[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.events.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Event with Id ${id} not found`);
    }
    this.events.splice(index, 1);
    return true;
  }

  async getUpcoming(days = 30) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const today = new Date();
    const future = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return this.events.filter(event => {
      const eventDate = new Date(event.eventDate);
      return eventDate >= today && eventDate <= future;
    });
  }
}

export default new EventsCalendarService();