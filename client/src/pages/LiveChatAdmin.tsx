import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, User, Clock, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LiveChatSession {
  id: string;
  userId: string;
  status: 'active' | 'waiting' | 'closed';
  messages: Array<{
    id: string;
    text: string;
    isBot: boolean;
    timestamp: Date;
    type?: 'ai' | 'scripted' | 'live';
  }>;
  createdAt: Date;
  lastActivity: Date;
}

export default function LiveChatAdmin() {
  const [sessions, setSessions] = useState<LiveChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch active sessions
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/chat/live/sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  // Send reply to customer
  const sendReply = async (sessionId: string) => {
    if (!replyMessage.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/chat/live/${sessionId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: replyMessage,
          isBot: true
        })
      });

      if (response.ok) {
        setReplyMessage("");
        fetchSessions(); // Refresh sessions
        toast({
          title: "Message Sent",
          description: "Your reply has been sent to the customer.",
        });
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const selectedSessionData = sessions.find(s => s.id === selectedSession);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Live Chat Admin</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <div className="lg:col-span-1">
            <Card className="bg-zinc-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare size={20} />
                  Active Sessions ({sessions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sessions.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No active sessions</p>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => setSelectedSession(session.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedSession === session.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span className="font-medium">User {session.userId.slice(-6)}</span>
                        </div>
                        <Badge variant={session.status === 'waiting' ? 'destructive' : 'default'}>
                          {session.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm opacity-75">
                        <Clock size={12} />
                        <span>{new Date(session.lastActivity).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-sm mt-1">
                        {session.messages.length} messages
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            {selectedSessionData ? (
              <Card className="bg-zinc-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Chat with User {selectedSessionData.userId.slice(-6)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 overflow-y-auto mb-4 space-y-3 p-4 bg-black rounded-lg">
                    {selectedSessionData.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg text-sm ${
                            msg.isBot
                              ? 'bg-gray-800 text-gray-300'
                              : 'bg-blue-500 text-white'
                          }`}
                        >
                          {msg.text}
                          <div className={`text-xs mt-1 opacity-60`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="bg-black border-gray-700 text-white"
                      onKeyPress={(e) => e.key === 'Enter' && sendReply(selectedSessionData.id)}
                    />
                    <Button
                      onClick={() => sendReply(selectedSessionData.id)}
                      disabled={isLoading || !replyMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-zinc-900 border-gray-800">
                <CardContent className="flex items-center justify-center h-96">
                  <p className="text-gray-400">Select a session to start chatting</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}