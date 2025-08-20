import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const SloganGenerator = () => {
  const [coreMessage, setCoreMessage] = useState("");
  const [slogans, setSlogans] = useState([]);
  const [generating, setGenerating] = useState(false);

  const generateSlogans = async () => {
    if (!coreMessage.trim()) {
      toast.error("Please enter a core message or vision first");
      return;
    }

    try {
      setGenerating(true);
      
      // Simulate AI slogan generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedSlogans = [
        "Progress That Matters",
        "Together We Rise",
        "Building Tomorrow Today",
        "Your Voice, Our Mission",
        "Unity Through Action",
        "Change You Can Trust",
        "Forward Together",
        "Community First",
        "Real Results, Real Change",
        "Stronger Together",
        "Hope in Action",
        "The Future is Now",
        "Empowering Every Voice",
        "Leadership That Listens",
        "Making a Difference",
        "United for Progress",
        "Building Bridges",
        "Inspiring Change",
        "Committed to Community",
        "Your Future, Our Focus"
      ];

      // Shuffle and add variety based on core message
      const shuffledSlogans = generatedSlogans
        .sort(() => Math.random() - 0.5)
        .map(slogan => ({
          id: Math.random().toString(36).substr(2, 9),
          text: slogan,
          tone: Math.random() > 0.7 ? "Emotional" : Math.random() > 0.4 ? "Authoritative" : "Inspirational"
        }));

      setSlogans(shuffledSlogans);
      toast.success("Generated 20 campaign slogans!");
    } catch (err) {
      toast.error("Failed to generate slogans");
    } finally {
      setGenerating(false);
    }
  };

  const copySlogan = async (sloganText) => {
    try {
      await navigator.clipboard.writeText(sloganText);
      toast.success("Slogan copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy slogan");
    }
  };

  const getToneColor = (tone) => {
    switch (tone) {
      case "Emotional":
        return "bg-red-100 text-red-800";
      case "Authoritative": 
        return "bg-blue-100 text-blue-800";
      case "Inspirational":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-700">
          <h1 className="text-2xl font-bold font-display text-white">Slogan Generator</h1>
          <p className="text-amber-100 mt-1">Create memorable campaign slogans that resonate</p>
        </div>

        <div className="p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Lightbulb" className="w-10 h-10 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">What's Your Core Message?</h2>
              <p className="text-gray-600">
                Enter your main vision, values, or campaign theme to generate targeted slogans
              </p>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="e.g., Community development, Unity, Progress, Education..."
                value={coreMessage}
                onChange={(e) => setCoreMessage(e.target.value)}
                className="text-center text-lg"
              />

              <Button
                variant="primary"
                icon="Sparkles"
                onClick={generateSlogans}
                loading={generating}
                className="w-full"
                size="lg"
              >
                Generate Slogans
              </Button>
            </div>
          </div>
        </div>
      </div>

      {slogans.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Generated Slogans</h2>
            <div className="text-sm text-gray-600">
              {slogans.length} slogans generated
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slogans.map((slogan) => (
              <Card key={slogan.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      "{slogan.text}"
                    </h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getToneColor(slogan.tone)}`}>
                      {slogan.tone}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    icon="Copy"
                    onClick={() => copySlogan(slogan.text)}
                    className="ml-3"
                  >
                    Copy
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-amber-50 rounded-lg">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <ApperIcon name="Info" className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">Tips for Choosing the Right Slogan:</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Keep it short and memorable (3-5 words work best)</li>
                  <li>• Make sure it reflects your core values and message</li>
                  <li>• Test it with different audiences to gauge effectiveness</li>
                  <li>• Ensure it's unique and doesn't conflict with other campaigns</li>
                  <li>• Consider how it will look on signs, shirts, and digital media</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SloganGenerator;