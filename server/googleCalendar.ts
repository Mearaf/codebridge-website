import { google } from 'googleapis';

export class GoogleCalendarService {
  private calendar;
  private oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'https://code-bridge-hub-mtaffere.replit.app/auth/google/callback'
    );

    if (process.env.GOOGLE_REFRESH_TOKEN) {
      this.oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });
    }
    
    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  getAuthUrl() {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  async getTokenFromCode(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    return tokens;
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
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        requestBody: event,
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
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
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
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        eventId: eventId,
        requestBody: updates,
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
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
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