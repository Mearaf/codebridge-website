import { google } from 'googleapis';

export class GoogleCalendarService {
  private calendar;
  private auth;

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      // These will need to be set as environment variables
      credentials: process.env.GOOGLE_CALENDAR_CREDENTIALS ? JSON.parse(process.env.GOOGLE_CALENDAR_CREDENTIALS) : undefined,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    
    this.calendar = google.calendar({ version: 'v3', auth: this.auth });
  }

  async createEvent(eventDetails: {
    summary: string;
    description?: string;
    startDateTime: string;
    endDateTime: string;
    attendeeEmail: string;
    location?: string;
  }) {
    try {
      const event = {
        summary: eventDetails.summary,
        description: eventDetails.description,
        location: eventDetails.location,
        start: {
          dateTime: eventDetails.startDateTime,
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: eventDetails.endDateTime,
          timeZone: 'America/New_York',
        },
        attendees: [
          { email: eventDetails.attendeeEmail },
          { email: 'hello@codebridge.tech' }, // Business email
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24 hours before
            { method: 'popup', minutes: 30 }, // 30 minutes before
          ],
        },
        conferenceData: {
          createRequest: {
            requestId: `meet-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      };

      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all',
      });

      return response.data;
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      throw error;
    }
  }

  async getAvailableSlots(startDate: string, endDate: string) {
    try {
      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin: startDate,
        timeMax: endDate,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }

  async updateEvent(eventId: string, updates: any) {
    try {
      const response = await this.calendar.events.patch({
        calendarId: 'primary',
        eventId: eventId,
        resource: updates,
        sendUpdates: 'all',
      });

      return response.data;
    } catch (error) {
      console.error('Error updating Google Calendar event:', error);
      throw error;
    }
  }

  async deleteEvent(eventId: string) {
    try {
      await this.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
        sendUpdates: 'all',
      });

      return true;
    } catch (error) {
      console.error('Error deleting Google Calendar event:', error);
      throw error;
    }
  }
}

export const googleCalendar = new GoogleCalendarService();