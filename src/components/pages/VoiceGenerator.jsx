import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const VoiceGenerator = () => {
  const [campaignObjective, setCampaignObjective] = useState("");
  const [script, setScript] = useState("");
  const [generating, setGenerating] = useState(false);
  const [audioGenerating, setAudioGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const objectiveOptions = [
    { value: "Voter Registration", label: "Voter Registration" },
    { value: "Event Reminder", label: "Event Reminder" },
    { value: "Get Out The Vote", label: "Get Out The Vote" }
  ];

  const generateScript = async () => {
    if (!campaignObjective) {
      toast.error("Please select a campaign objective first");
      return;
    }

    try {
      setGenerating(true);
      
      // Simulate AI script generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const scriptTemplates = {
        "Voter Registration": `Hello, this is a message from your local campaign headquarters.

Voter registration is now open and we want to make sure every eligible citizen has their voice heard in the upcoming election.

If you haven't registered to vote yet, please visit your local registration office or go online to complete the process. The deadline is approaching fast.

Your vote matters. Your voice counts. Together, we can build a stronger community.

For assistance with voter registration, call our helpline or visit our website.

Thank you for your participation in our democracy.`,

        "Event Reminder": `Dear community members,

This is a friendly reminder about our upcoming town hall meeting scheduled for this Saturday at 6 PM at the Community Center.

We'll be discussing important local issues including infrastructure development, education funding, and healthcare initiatives.

Your input and participation are crucial for making informed decisions that benefit our entire community.

Light refreshments will be served, and child care will be available.

We look forward to seeing you there and hearing your valuable perspectives.

Thank you for being an engaged citizen.`,

        "Get Out The Vote": `This is an important reminder that Election Day is tomorrow.

Your vote is your voice in shaping our community's future.

Polling stations are open from 7 AM to 7 PM. Find your polling location on your voter registration card or check our website.

Remember to bring a valid ID and arrive early to avoid lines.

Every vote matters. Every voice counts.

Make your voice heard tomorrow.

Thank you for participating in our democratic process.`
      };

      setScript(scriptTemplates[campaignObjective]);
      toast.success("Script generated successfully!");
    } catch (err) {
      toast.error("Failed to generate script");
    } finally {
      setGenerating(false);
    }
  };

  const generateAudio = async () => {
    if (!script.trim()) {
      toast.error("Please generate or enter a script first");
      return;
    }

    try {
      setAudioGenerating(true);
      
      // Simulate TTS API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate audio URL (would be from actual TTS service)
      const simulatedAudioUrl = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABA...";
      setAudioUrl(simulatedAudioUrl);
      
      toast.success("Audio generated successfully!");
    } catch (err) {
      toast.error("Failed to generate audio");
    } finally {
      setAudioGenerating(false);
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `campaign-audio-${campaignObjective.replace(/\s+/g, '-').toLowerCase()}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Audio download started!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800">
          <h1 className="text-2xl font-bold font-display text-white">Voice Campaign Generator</h1>
          <p className="text-purple-100 mt-1">Generate call scripts and IVR voice messages</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Select
                label="Campaign Objective"
                options={objectiveOptions}
                value={campaignObjective}
                onChange={(e) => setCampaignObjective(e.target.value)}
                placeholder="Select campaign objective"
              />

              <Button
                variant="primary"
                icon="FileText"
                onClick={generateScript}
                loading={generating}
                className="w-full"
              >
                Generate Script
              </Button>
            </div>

            <div className="lg:col-span-2">
              <TextArea
                label="Script Content"
                placeholder="Generated script will appear here or you can write your own..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
                rows={12}
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Audio Generation</h3>
              <Button
                variant="secondary"
                icon="Mic"
                onClick={generateAudio}
                loading={audioGenerating}
                disabled={!script.trim()}
              >
                Generate Audio
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <ApperIcon name="Play" className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Audio Preview</h4>
                    <p className="text-sm text-gray-600">Listen to generated audio</p>
                  </div>
                </div>

                {audioUrl ? (
                  <div className="space-y-4">
                    <audio 
                      controls 
                      className="w-full"
                      src={audioUrl}
                    >
                      Your browser does not support the audio element.
                    </audio>
                    <Button
                      variant="success"
                      icon="Download"
                      onClick={downloadAudio}
                      className="w-full"
                    >
                      Download Audio
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ApperIcon name="Headphones" className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Audio preview will appear here after generation</p>
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <ApperIcon name="Settings" className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Audio Settings</h4>
                    <p className="text-sm text-gray-600">Voice and quality options</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="professional">Professional (Default)</option>
                      <option value="authoritative">Authoritative</option>
                      <option value="friendly">Friendly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Speech Speed
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="normal">Normal (Default)</option>
                      <option value="slow">Slow</option>
                      <option value="fast">Fast</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Audio Quality
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="standard">Standard</option>
                      <option value="high">High Quality</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceGenerator;