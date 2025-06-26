import { chatService, LiveChatSession } from './chatService';

export class LiveChatAdmin {
  // Get all active chat sessions for admin dashboard
  getActiveSessions(): LiveChatSession[] {
    return chatService.getActiveLiveChatSessions();
  }

  // Send message as admin to specific session
  sendAdminMessage(sessionId: string, message: string): boolean {
    return chatService.addMessageToLiveChat(sessionId, {
      text: message,
      isBot: true,
      type: 'live'
    });
  }

  // Close a chat session
  closeSession(sessionId: string): boolean {
    return chatService.closeLiveChatSession(sessionId);
  }

  // Get session details
  getSession(sessionId: string): LiveChatSession | undefined {
    return chatService.getLiveChatSession(sessionId);
  }
}

export const liveChatAdmin = new LiveChatAdmin();