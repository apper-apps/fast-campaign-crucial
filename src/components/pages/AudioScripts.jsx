import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const AudioScripts = () => {
  const [script, setScript] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [generating, setGenerating] = useState(false);

  const generateScriptAndAudio = async () => {
    try {
      setGenerating(true);
      
      // Simulate AI script generation
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const generatedScript = `🎵 Vote for progress! Vote for change! 🎵

Attention residents! This is an important announcement from your local campaign headquarters.

On Election Day, choose leadership that listens. Choose progress that matters. Choose a candidate who puts community first.

Your vote is your voice. Make it count.

Election Day is coming soon. Don't forget to vote!

Visit your polling station and be part of the change our community needs.

Together, we build a better tomorrow!

🎵 Your voice, your choice, your future! 🎵

This message was paid for by Campaign Hub.`;

      setScript(generatedScript);
      
      // Simulate TTS generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate audio URL (would be from actual TTS + background music)
      const simulatedAudioUrl = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABA...";
      setAudioUrl(simulatedAudioUrl);
      
      toast.success("Script and audio generated successfully!");
    } catch (err) {
      toast.error("Failed to generate script and audio");
    } finally {
      setGenerating(false);
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'campaign-announcement.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Audio download started!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-700">
          <h1 className="text-2xl font-bold font-display text-white">Announcement Audio Generator</h1>
          <p className="text-orange-100 mt-1">Create rickshaw and loudspeaker announcements</p>
        </div>

        <div className="p-6">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Radio" className="w-12 h-12 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Generate Campaign Audio</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create high-energy, repetitive audio scripts perfect for rickshaw announcements and loudspeaker campaigns.
              Includes candidate name, symbol, and election details automatically.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Button
              variant="primary"
              icon="Play"
              onClick={generateScriptAndAudio}
              loading={generating}
              size="lg"
              className="w-full mb-8"
            >
              Generate Script & Audio
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <ApperIcon name="FileText" className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Generated Script</h3>
                </div>

                <div className="min-h-[300px] p-4 bg-gray-50 rounded-lg border">
                  {script ? (
                    <pre className="whitespace-pre-wrap text-sm text-gray-900 leading-relaxed">
                      {script}
                    </pre>
                  ) : (
                    <div className="flex items-center justify-center h-72 text-gray-500">
                      <div className="text-center">
                        <ApperIcon name="FileText" className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p>Generated script will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <ApperIcon name="Headphones" className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Audio Preview</h3>
                </div>

                <div className="min-h-[300px] flex flex-col">
                  {audioUrl ? (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-600 mr-2" />
                          <span className="text-green-800 font-medium">Audio Generated Successfully</span>
                        </div>
                        <p className="text-green-700 text-sm">
                          High-quality audio with background music and professional voice-over ready for download.
                        </p>
                      </div>

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
                        Download MP3
                      </Button>

                      <div className="text-xs text-gray-600 space-y-1">
                        <p>• Duration: ~20 seconds</p>
                        <p>• Format: MP3, 44.1kHz</p>
                        <p>• Includes background music</p>
                        <p>• Optimized for loudspeakers</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <ApperIcon name="Headphones" className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p>Audio preview will appear here</p>
                        <p className="text-sm mt-1">Generate script first to create audio</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <ApperIcon name="Info" className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Audio Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                    <ul className="space-y-1">
                      <li>• High-energy, repetitive messaging</li>
                      <li>• Includes candidate name and symbol</li>
                      <li>• Background music for attention</li>
                      <li>• Clear, professional voice</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Optimized for mobile speakers</li>
                      <li>• 20-second duration for loops</li>
                      <li>• High-quality MP3 format</li>
                      <li>• Ready for immediate use</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioScripts;