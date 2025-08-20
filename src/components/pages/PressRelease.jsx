import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Card from "@/components/atoms/Card";

const PressRelease = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    keyQuotes: "",
    impactStatistics: "",
    summary: ""
  });
  const [pressRelease, setPressRelease] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePressNote = async () => {
    // Validate form
    const requiredFields = ["eventName", "date", "location", "summary"];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setGenerating(true);
      
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const generatedPress = `FOR IMMEDIATE RELEASE

**HEADLINE OPTIONS:**
1. ${formData.eventName}: A Major Step Forward for Community Development
2. Local Leadership Announces ${formData.eventName} Initiative
3. ${formData.eventName} Set to Transform Community Landscape

**PRESS RELEASE**

${formData.location} - ${new Date(formData.date).toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})} - ${formData.summary}

The event, scheduled for ${new Date(formData.date).toLocaleDateString()}, will take place at ${formData.location} and is expected to have significant positive impact on our community.

${formData.keyQuotes ? `**KEY STATEMENTS:**\n\n${formData.keyQuotes}` : ''}

${formData.impactStatistics ? `**IMPACT & STATISTICS:**\n\n${formData.impactStatistics}` : ''}

**ABOUT THE INITIATIVE:**

This initiative represents our continued commitment to transparent governance and community-centered development. We believe in working closely with residents to address their needs and build a stronger, more prosperous future for all.

The event is open to the public and media representatives are invited to attend. For more information or to arrange interviews, please contact our campaign office.

**CONTACT INFORMATION:**

Campaign Headquarters
Phone: (555) 123-4567
Email: info@campaignhub.com
Website: www.campaignhub.com

###

Note: This press release has been generated using AI technology. Please review and customize as needed before distribution.`;

      setPressRelease(generatedPress);
      toast.success("Press release generated successfully!");
    } catch (err) {
      toast.error("Failed to generate press release");
    } finally {
      setGenerating(false);
    }
  };

  const exportAsDoc = () => {
    if (!pressRelease) {
      toast.error("Please generate a press release first");
      return;
    }

    // Create and download as text file (simulating DOC export)
    const element = document.createElement('a');
    const file = new Blob([pressRelease], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `press-release-${formData.eventName.replace(/\s+/g, '-').toLowerCase()}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Press release exported successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800">
          <h1 className="text-2xl font-bold font-display text-white">Press Release Generator</h1>
          <p className="text-indigo-100 mt-1">Create professional press releases for media distribution</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Event Information</h2>
              
              <div className="space-y-4">
                <Input
                  label="Event Name"
                  placeholder="Community Infrastructure Launch"
                  value={formData.eventName}
                  onChange={(e) => handleInputChange("eventName", e.target.value)}
                  required
                />

                <Input
                  label="Event Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />

                <Input
                  label="Location"
                  placeholder="City Hall, Main Auditorium"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />

                <TextArea
                  label="Event Summary"
                  placeholder="Brief description of the event and its significance..."
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  rows={3}
                  required
                />

                <TextArea
                  label="Key Quotes"
                  placeholder="Include important quotes from speakers or officials..."
                  value={formData.keyQuotes}
                  onChange={(e) => handleInputChange("keyQuotes", e.target.value)}
                  rows={4}
                />

                <TextArea
                  label="Impact Statistics"
                  placeholder="Relevant statistics, numbers, or measurable impacts..."
                  value={formData.impactStatistics}
                  onChange={(e) => handleInputChange("impactStatistics", e.target.value)}
                  rows={3}
                />

                <Button
                  variant="primary"
                  icon="FileText"
                  onClick={generatePressNote}
                  loading={generating}
                  className="w-full"
                >
                  Generate Press Release
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Generated Press Release</h2>
                <Button
                  variant="secondary"
                  icon="Download"
                  onClick={exportAsDoc}
                  disabled={!pressRelease}
                  size="sm"
                >
                  Export as DOC
                </Button>
              </div>

              <Card className="p-6">
                <div className="min-h-[400px]">
                  {pressRelease ? (
                    <div className="space-y-4">
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap text-sm text-gray-900 font-mono leading-relaxed">
                          {pressRelease}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96 text-gray-500">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-lg font-medium mb-2">No press release generated</p>
                        <p className="text-sm">Fill in the event details and click "Generate Press Release"</p>
                      </div>
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

export default PressRelease;