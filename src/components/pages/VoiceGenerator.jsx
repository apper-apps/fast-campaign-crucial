import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import TextArea from "@/components/atoms/TextArea";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
const VoiceGenerator = () => {
  const [campaignObjective, setCampaignObjective] = useState("");
  const [userInput, setUserInput] = useState("");
  const [script, setScript] = useState("");
  const [generating, setGenerating] = useState(false);
  const [audioGenerating, setAudioGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceType, setVoiceType] = useState("professional");
  const [speechSpeed, setSpeechSpeed] = useState("normal");
  const [audioQuality, setAudioQuality] = useState("standard");
  
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const objectiveOptions = [
    { value: "Voter Registration", label: "Voter Registration" },
    { value: "Event Reminder", label: "Event Reminder" },
    { value: "Get Out The Vote", label: "Get Out The Vote" },
    { value: "Press Release", label: "Press Release" },
    { value: "Campaign Speech", label: "Campaign Speech" },
    { value: "Social Media Post", label: "Social Media Post" }
  ];

  const voiceOptions = [
    { value: "professional", label: "Professional" },
    { value: "authoritative", label: "Authoritative" },
    { value: "friendly", label: "Friendly" },
    { value: "inspirational", label: "Inspirational" }
  ];

  const speedOptions = [
    { value: "slow", label: "Slow" },
    { value: "normal", label: "Normal" },
    { value: "fast", label: "Fast" }
  ];

  const qualityOptions = [
    { value: "standard", label: "Standard" },
    { value: "high", label: "High Quality" },
    { value: "premium", label: "Premium" }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setUserInput(prev => prev + ' ' + finalTranscript.trim());
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error('Speech recognition error. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

const startVoiceRecording = async () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    try {
      setIsListening(true);
      recognitionRef.current.start();
      toast.info("Listening... Start speaking your content requirements");
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      toast.error("Could not start voice recording");
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    toast.success("Voice input stopped");
  };

  const generateScript = async () => {
    if (!campaignObjective && !userInput.trim()) {
      toast.error("Please select a campaign objective or provide voice/text input");
      return;
    }

    try {
      setGenerating(true);
      
      // Simulate AI script generation with enhanced intelligence
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let generatedContent = "";
      
      if (userInput.trim()) {
        // AI generates content based on user's voice/text input
        generatedContent = await generateAIContent(userInput, campaignObjective, voiceType);
      } else {
        // Use predefined templates
        const scriptTemplates = {
          "Voter Registration": generateVoterRegistrationScript(voiceType),
          "Event Reminder": generateEventReminderScript(voiceType),
          "Get Out The Vote": generateGetOutVoteScript(voiceType),
          "Press Release": generatePressReleaseScript(voiceType),
          "Campaign Speech": generateCampaignSpeechScript(voiceType),
          "Social Media Post": generateSocialMediaScript(voiceType)
        };
        
        generatedContent = scriptTemplates[campaignObjective] || "Generated content based on your requirements.";
      }

      setScript(generatedContent);
      toast.success("AI content generated successfully!");
    } catch (err) {
      console.error('Generation error:', err);
      toast.error("Failed to generate content");
    } finally {
      setGenerating(false);
    }
  };

  const generateAIContent = async (input, objective, tone) => {
    // Simulate advanced AI content generation based on voice input
    const toneAdjustments = {
      professional: "formal and authoritative",
      authoritative: "commanding and decisive", 
      friendly: "warm and approachable",
      inspirational: "motivational and uplifting"
    };

    const basePrompt = `Based on the user's input: "${input}" and campaign objective: "${objective}", generate ${toneAdjustments[tone]} political campaign content.`;
    
    // Simulated AI response - in real implementation, this would call an AI API
    return `Dear fellow citizens,

${input.includes('community') ? 'Our community stands at a crossroads.' : 'We face important decisions ahead.'}

${input.includes('change') ? 'Change is not just possible - it\'s necessary.' : 'Together, we can build a brighter future.'}

Based on your voice: "${input}"

${objective === 'Voter Registration' ? 'Every voice matters. Register to vote and make your voice heard.' : 
  objective === 'Event Reminder' ? 'Join us as we discuss the issues that matter most to our community.' :
  objective === 'Get Out The Vote' ? 'Your vote is your voice in democracy. Exercise this fundamental right.' :
  'Let\'s work together to create positive change for everyone.'}

Thank you for your engagement and participation.

[Generated by AI based on your voice input and campaign objectives]`;
  };

  const generateVoterRegistrationScript = (tone) => {
    const scripts = {
      professional: `Hello, this is an important message from your local campaign headquarters regarding voter registration.

Voter registration is currently open, and we want to ensure every eligible citizen can participate in our democratic process.

If you haven't registered to vote yet, please visit your local registration office or complete the process online. The registration deadline is approaching.

Your vote is your voice in democracy. Together, we can build a stronger, more representative community.

For voter registration assistance, please contact our helpline or visit our campaign website.

Thank you for your civic participation.`,
      
      authoritative: `Citizens, this is a call to action regarding voter registration.

Democracy demands participation. Your registration is not just a right - it's a responsibility.

Register now. The deadline will not wait. Every eligible citizen must be counted.

Your community needs your voice. Your vote shapes our future.

Act today. Register to vote.`,
      
      friendly: `Hi there! 👋 

Just wanted to reach out about something really important - voter registration!

We're making sure everyone in our community gets a chance to have their say in the upcoming election. 

If you haven't registered yet, no worries! It's super easy - you can do it online or stop by the registration office.

Your vote really does matter, and we'd love to have you as part of our democratic process.

Thanks for being an awesome community member! 🗳️`,
      
      inspirational: `My fellow citizens,

This is more than voter registration - this is about claiming your power in democracy.

Every great movement in history started with ordinary people who decided their voices mattered. Today, that person is you.

When you register to vote, you join a legacy of citizens who refused to be silent, who stood up for what they believed in.

Your registration is your declaration that you will not be a bystander in your own democracy.

Register today. Your future is calling.`
    };
    
    return scripts[tone] || scripts.professional;
  };

  const generateEventReminderScript = (tone) => {
    return `Dear community members, this is a reminder about our upcoming town hall meeting this Saturday at 6 PM at the Community Center. We'll discuss infrastructure, education, and healthcare. Your participation is crucial for our community's future. Thank you for your civic engagement.`;
  };

  const generateGetOutVoteScript = (tone) => {
    return `Election Day is here! Polling stations are open from 7 AM to 7 PM. Bring valid ID and make your voice heard. Every vote shapes our community's future. Thank you for participating in democracy.`;
  };

  const generatePressReleaseScript = (tone) => {
    return `FOR IMMEDIATE RELEASE: Our campaign announces new community initiatives focused on economic development, education improvement, and healthcare accessibility. These programs will create jobs, strengthen schools, and ensure quality healthcare for all residents.`;
  };

  const generateCampaignSpeechScript = (tone) => {
    return `My fellow citizens, we stand together at this pivotal moment. Our community has incredible potential, and with your support, we can unlock new opportunities for growth, prosperity, and unity. Together, we will build a brighter future.`;
  };

  const generateSocialMediaScript = (tone) => {
    return `🗳️ Your voice matters! Join us in building a stronger community. Together, we're creating opportunities for growth, supporting local businesses, and ensuring everyone has a chance to thrive. #CommunityFirst #YourVoiceMatters`;
  };
const generateAudio = async () => {
if (!script.trim()) {
      toast.error("Please generate or enter a script first");
      return;
    }

    try {
      setAudioGenerating(true);
      
      // Simulate advanced TTS with voice customization
      const estimatedTime = Math.ceil(script.length / 100) * 1000; // More realistic timing
      await new Promise(resolve => setTimeout(resolve, Math.max(2000, estimatedTime)));
      
      // Simulate audio generation with quality settings
      const audioSettings = {
        voice: voiceType,
        speed: speechSpeed,
        quality: audioQuality
      };
      
      // In a real implementation, this would call a TTS API like Azure Speech Services, AWS Polly, or Google Cloud TTS
      const simulatedAudioUrl = `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAECAPA...${Date.now()}`;
      setAudioUrl(simulatedAudioUrl);
      
      toast.success(`High-quality ${voiceType} voice audio generated successfully!`);
    } catch (err) {
      console.error('Audio generation error:', err);
      toast.error("Failed to generate audio. Please try again.");
    } finally {
      setAudioGenerating(false);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) {
      toast.error("No audio available to download");
      return;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `campaign-audio-${Date.now()}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Audio download started!");
  };

  const clearAll = () => {
    setUserInput("");
    setScript("");
    setAudioUrl(null);
    setCampaignObjective("");
    toast.info("All content cleared");
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

              {/* Voice Input Section */}
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <ApperIcon name="Mic" size={18} className="mr-2 text-blue-600" />
                      Voice Input
                    </h3>
                    {isListening && (
                      <div className="flex items-center text-red-500 animate-pulse">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                        Recording
                      </div>
                    )}
                  </div>
                  
                  <TextArea
                    label="Describe what you want to create"
                    placeholder="Speak or type what kind of content you want to generate..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                  
                  <div className="flex gap-2">
                    <Button
                      variant={isListening ? "danger" : "secondary"}
                      icon={isListening ? "Square" : "Mic"}
                      onClick={isListening ? stopVoiceRecording : startVoiceRecording}
                      className="flex-1 text-sm"
                      disabled={generating}
                    >
                      {isListening ? "Stop" : "Voice Input"}
                    </Button>
                    <Button
                      variant="outline"
                      icon="X"
                      onClick={() => setUserInput("")}
                      className="px-3"
                      disabled={generating || isListening}
                    />
                  </div>
                </div>
              </Card>

              <Button
                variant="primary"
                icon="Sparkles"
                onClick={generateScript}
                loading={generating}
                className="w-full"
              >
                Generate AI Content
              </Button>

              <Button
                variant="outline"
                icon="RotateCcw"
                onClick={clearAll}
                className="w-full"
                disabled={generating || audioGenerating}
              >
                Clear All
              </Button>
            </div>

            <div className="lg:col-span-2">
              <TextArea
                label="Generated Content"
                placeholder="AI-generated content will appear here based on your voice input or campaign objective..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
                rows={16}
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
                  <Select
                    label="Voice Type"
                    options={voiceOptions}
                    value={voiceType}
                    onChange={(e) => setVoiceType(e.target.value)}
                  />

                  <Select
                    label="Speech Speed"
                    options={speedOptions}
                    value={speechSpeed}
                    onChange={(e) => setSpeechSpeed(e.target.value)}
                  />

                  <Select
                    label="Audio Quality"
                    options={qualityOptions}
                    value={audioQuality}
                    onChange={(e) => setAudioQuality(e.target.value)}
                  />

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      icon="Volume2"
                      onClick={generateAudio}
                      loading={audioGenerating}
                      className="w-full"
                      disabled={!script.trim()}
                    >
                      Generate Voice Audio
                    </Button>
                  </div>

                  {audioUrl && (
                    <div className="space-y-2">
                      <audio
                        controls
                        src={audioUrl}
                        className="w-full"
                      >
                        Your browser does not support the audio element.
                      </audio>
                      <Button
                        variant="secondary"
                        icon="Download"
                        onClick={downloadAudio}
                        className="w-full"
                      >
                        Download Audio
                      </Button>
                    </div>
                  )}
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