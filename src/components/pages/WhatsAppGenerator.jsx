import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import messageLibraryService from "@/services/api/messageLibraryService";
import ApperIcon from "@/components/ApperIcon";

const WhatsAppGenerator = () => {
  const [formData, setFormData] = useState({
    occasion: "",
    language: "",
    tone: ""
  });
  const [messages, setMessages] = useState({
    short: "",
    long: ""
  });
  const [generating, setGenerating] = useState(false);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const occasionOptions = [
    { value: "Festival Greeting", label: "Festival Greeting" },
    { value: "Event Invite", label: "Event Invite" },
    { value: "General Update", label: "General Update" }
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Marathi", label: "Marathi" }
  ];

  const toneOptions = [
    { value: "Formal", label: "Formal" },
    { value: "Casual", label: "Casual" },
    { value: "Inspirational", label: "Inspirational" }
  ];

  const loadMessageLibrary = async () => {
    try {
      setLoading(true);
      setError(null);
      const libraryData = await messageLibraryService.getAll();
      setLibrary(libraryData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessageLibrary();
  }, []);

  const generateMessage = async () => {
    if (!formData.occasion || !formData.language || !formData.tone) {
      toast.error("Please select all options before generating");
      return;
    }

    try {
      setGenerating(true);
      const baseMessage = await messageLibraryService.generateMessage(
        formData.occasion,
        formData.language,
        formData.tone
      );

      // Generate short and long versions
      const shortMessage = baseMessage.length > 100 
        ? baseMessage.substring(0, 97) + "..."
        : baseMessage;

      const longMessage = baseMessage + "\n\nWe appreciate your continued support and look forward to serving our community together. Please feel free to reach out with any questions or suggestions.";

      setMessages({
        short: shortMessage,
        long: longMessage
      });

      toast.success("Messages generated successfully!");
    } catch (err) {
      toast.error("Failed to generate message: " + err.message);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Message copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy message");
    }
  };

  const saveToLibrary = async (messageText) => {
    try {
      await messageLibraryService.create({
        messageText,
        occasion: formData.occasion,
        language: formData.language,
        tone: formData.tone
      });
      toast.success("Message saved to library!");
      loadMessageLibrary();
    } catch (err) {
      toast.error("Failed to save message: " + err.message);
    }
  };

  if (loading) return <Loading message="Loading message generator..." />;
  if (error) return <Error message="Failed to load generator" description={error} onRetry={loadMessageLibrary} />;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-success to-green-600">
          <h1 className="text-2xl font-bold font-display text-white">WhatsApp Message Generator</h1>
          <p className="text-green-100 mt-1">Create personalized messages for different occasions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Message Configuration</h2>
            
            <div className="space-y-4">
              <Select
                label="Occasion"
                options={occasionOptions}
                value={formData.occasion}
                onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                placeholder="Select occasion type"
              />

              <Select
                label="Language"
                options={languageOptions}
                value={formData.language}
                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                placeholder="Select language"
              />

              <Select
                label="Tone"
                options={toneOptions}
                value={formData.tone}
                onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                placeholder="Select message tone"
              />

              <Button
                variant="primary"
                icon="MessageCircle"
                onClick={generateMessage}
                loading={generating}
                className="w-full"
              >
                Generate Messages
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Generated Messages</h2>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <ApperIcon name="MessageSquare" className="w-4 h-4 mr-2 text-success" />
                  Short Version
                </h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    icon="Copy"
                    onClick={() => copyToClipboard(messages.short)}
                    disabled={!messages.short}
                  >
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    icon="Save"
                    onClick={() => saveToLibrary(messages.short)}
                    disabled={!messages.short}
                  >
                    Save
                  </Button>
                </div>
              </div>
              <div className="min-h-[100px] p-3 bg-gray-50 rounded-lg border">
                {messages.short ? (
                  <p className="text-gray-900 whitespace-pre-wrap">{messages.short}</p>
                ) : (
                  <p className="text-gray-500 italic">Short version will appear here</p>
                )}
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <ApperIcon name="FileText" className="w-4 h-4 mr-2 text-primary" />
                  Long Version
                </h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    icon="Copy"
                    onClick={() => copyToClipboard(messages.long)}
                    disabled={!messages.long}
                  >
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    icon="Save"
                    onClick={() => saveToLibrary(messages.long)}
                    disabled={!messages.long}
                  >
                    Save
                  </Button>
                </div>
              </div>
              <div className="min-h-[150px] p-3 bg-gray-50 rounded-lg border">
                {messages.long ? (
                  <p className="text-gray-900 whitespace-pre-wrap">{messages.long}</p>
                ) : (
                  <p className="text-gray-500 italic">Long version will appear here</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {library.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Message Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {library.slice(0, 6).map((message) => (
              <Card key={message.Id} className="p-4 hover">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex space-x-2 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{message.occasion}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">{message.language}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon="Copy"
                    onClick={() => copyToClipboard(message.messageText)}
                  />
                </div>
                <p className="text-sm text-gray-700 line-clamp-3">{message.messageText}</p>
                <div className="mt-2 text-xs text-gray-500">
                  {message.tone} tone
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppGenerator;