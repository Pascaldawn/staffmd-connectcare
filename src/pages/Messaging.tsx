
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Video, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  is_read: boolean;
}

const MessagingPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
        .order("created_at", { ascending: true });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive",
        });
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${user?.id}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedUser, user?.id, toast]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !user) return;

    const { error } = await supabase.from("messages").insert({
      content: newMessage,
      sender_id: user.id,
      receiver_id: selectedUser,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return;
    }

    setNewMessage("");
  };

  const startVideoCall = async () => {
    if (!selectedUser || !user) return;

    // This is a placeholder - integrate with your preferred video call provider
    const meetingUrl = `https://meet.google.com/${Math.random().toString(36).substring(7)}`;

    const { error } = await supabase.from("video_calls").insert({
      company_id: user.id,
      provider_id: selectedUser,
      meeting_url: meetingUrl,
      status: "scheduled",
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to start video call",
        variant: "destructive",
      });
      return;
    }

    window.open(meetingUrl, "_blank");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Contacts List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>Select a contact to start chatting</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Implement contacts list here */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setSelectedUser("some-user-id")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Name
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Chat</CardTitle>
              <CardDescription>
                {selectedUser ? "Chatting with Contact Name" : "Select a contact"}
              </CardDescription>
            </div>
            {selectedUser && (
              <Button onClick={startVideoCall} variant="outline">
                <Video className="mr-2 h-4 w-4" />
                Start Video Call
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender_id === user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[70%] ${
                        message.sender_id === user?.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex items-center gap-2 mt-4">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessagingPage;
