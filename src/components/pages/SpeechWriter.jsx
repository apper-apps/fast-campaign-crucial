import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";

const SpeechWriter = () => {
  const [audienceType, setAudienceType] = useState("");
  const [speeches, setSpeeches] = useState({
    full: "",
    summary: "",
    bullets: ""
  });
  const [activeTab, setActiveTab] = useState("full");
  const [generating, setGenerating] = useState(false);

  const audienceOptions = [
    { value: "Public Rally", label: "Public Rally" },
    { value: "Press Conference", label: "Press Conference" },
    { value: "Internal Meeting", label: "Internal Meeting" },
    { value: "Town Hall", label: "Town Hall" },
    { value: "Campaign Launch", label: "Campaign Launch" }
  ];

  const generateSpeech = async () => {
    if (!audienceType) {
      toast.error("Please select an audience type first");
      return;
    }

    try {
      setGenerating(true);
      
      // Simulate AI speech generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const speechTemplates = {
        "Public Rally": {
          full: `Friends, neighbors, fellow citizens,

Thank you for being here today. Your presence shows that our community is alive, engaged, and ready for positive change.

We stand at a crossroads in our community's history. We can choose to accept the status quo, or we can choose to build something better together.

I've walked through your neighborhoods. I've listened to your concerns. I've seen the challenges we face - from infrastructure needs to economic opportunities, from education funding to healthcare access.

But I've also seen something else. I've seen the strength of our community. I've seen neighbors helping neighbors. I've seen small businesses thriving despite challenges. I've seen young people with big dreams and older residents with invaluable wisdom.

This is what gives me hope. This is what drives my commitment to serve.

Together, we will:
- Modernize our infrastructure to support growth
- Create economic opportunities for all residents  
- Ensure our children receive quality education
- Make healthcare more accessible and affordable
- Protect our environment for future generations

But I cannot do this alone. Democracy is not a spectator sport. It requires all of us to participate, to engage, to hold our leaders accountable.

Your voice matters. Your vote counts. Your participation makes the difference.

Together, we will build a stronger, more prosperous, more inclusive community.

Thank you, and let's get to work!`,

          summary: `Thank you for being here today. We face challenges, but I see the strength in our community.

I've listened to your concerns about infrastructure, economy, education, and healthcare. But I've also seen neighbors helping neighbors and businesses thriving.

Together, we will modernize infrastructure, create opportunities, improve education, make healthcare accessible, and protect our environment.

Democracy requires participation from all of us. Your voice matters, your vote counts.

Let's build a stronger community together!`,

          bullets: `• Thank community for engagement and participation
• Acknowledge current challenges and crossroads moment
• Share experiences listening to residents' concerns
• Highlight community strengths and resilience
• Present key policy priorities:
  - Infrastructure modernization
  - Economic opportunity creation
  - Education funding improvement
  - Healthcare accessibility
  - Environmental protection
• Emphasize need for citizen participation
• Call for unity and collective action
• Close with inspirational call to action`
        },

        "Press Conference": {
          full: `Good morning, and thank you for joining us today.

I want to address recent developments and share our vision for moving forward as a community.

First, let me be clear about our administration's commitment to transparency and accountability. Every decision we make is guided by what best serves our constituents.

Today, I'm announcing several key initiatives that will have immediate and long-term benefits for our community:

The Infrastructure Improvement Plan will address our most pressing needs, creating jobs while building the foundation for future growth. This $2.5 million investment will repair roads, upgrade water systems, and improve public transportation.

The Small Business Support Program will provide low-interest loans and mentorship to local entrepreneurs, particularly those from underrepresented communities. We expect this to create over 200 new jobs in the first year.

Our Education Excellence Initiative will increase funding for schools, reduce class sizes, and expand after-school programs. Every child deserves access to quality education regardless of their zip code.

These initiatives reflect our core values: fiscal responsibility, community partnership, and sustainable growth.

We're also launching a new community engagement platform where residents can directly communicate with our office, track project progress, and participate in policy discussions.

I want to be clear - these are not just campaign promises. These are commitments backed by detailed budgets and timelines.

Our success will be measured not by political victories, but by real improvements in people's lives.

I'll now take your questions.`,

          summary: `Thank you for joining us today. I want to address recent developments and share our vision.

I'm announcing key initiatives: a $2.5M Infrastructure Improvement Plan, Small Business Support Program creating 200+ jobs, and Education Excellence Initiative.

These reflect our values of fiscal responsibility and community partnership. We're also launching a community engagement platform.

These aren't campaign promises - they're budgeted commitments measured by real improvements in people's lives.

I'll now take questions.`,

          bullets: `• Welcome press and acknowledge purpose
• Emphasize transparency and accountability commitment
• Announce Infrastructure Improvement Plan ($2.5M investment)
• Detail Small Business Support Program (200+ jobs)
• Explain Education Excellence Initiative
• Highlight core values: fiscal responsibility, community partnership
• Introduce community engagement platform
• Distinguish commitments from campaign promises
• Define success metrics as real life improvements
• Open for questions from press`
        },

        "Internal Meeting": {
          full: `Thank you all for being here. Today's meeting is crucial for aligning our efforts and ensuring we deliver on our commitments to the community.

Let me start with our progress update. Over the past quarter, we've achieved several key milestones:

- Completed phase one of the infrastructure assessment
- Launched the small business grant application process
- Secured additional funding for education programs
- Established partnerships with three community organizations

However, we also face challenges that require our immediate attention and coordinated response.

Budget constraints require us to prioritize initiatives carefully. We need to maximize impact while maintaining fiscal responsibility.

Staff capacity is stretched thin. We need to delegate effectively and ensure everyone has the resources they need to succeed.

Communication gaps have led to some confusion in the community. We must improve our messaging coordination.

Moving forward, our priorities are:

1. Complete the infrastructure planning phase by month-end
2. Launch the community engagement platform
3. Finalize education initiative partnerships
4. Prepare for the upcoming budget hearings

Each team lead will provide detailed updates on their areas. I want honest assessments - what's working, what isn't, and what resources you need.

Remember, we're not just managing projects - we're building trust with our community. Every decision, every interaction, every deliverable reflects on our commitment to serve.

Our next milestone review is in two weeks. Let's use this time effectively.

Questions or concerns before we dive into department reports?`,

          summary: `Thank you all for being here. We've achieved key milestones this quarter but face challenges with budget constraints, staff capacity, and communication gaps.

Our priorities: complete infrastructure planning, launch engagement platform, finalize education partnerships, and prepare for budget hearings.

I want honest assessments from each team about what's working and what resources you need. We're building community trust through every action.

Next milestone review is in two weeks. Any questions before department reports?`,

          bullets: `• Acknowledge team attendance and meeting importance
• Review quarterly milestones achieved
• Address current challenges:
  - Budget constraints requiring prioritization
  - Stretched staff capacity
  - Communication coordination issues
• Outline immediate priorities:
  - Infrastructure planning completion
  - Community platform launch
  - Education partnerships
  - Budget hearing preparation
• Request honest assessments from team leads
• Emphasize community trust-building mission
• Set next milestone review timeline
• Open floor for questions and concerns`
        }
      };

      const selectedTemplate = speechTemplates[audienceType] || speechTemplates["Public Rally"];
      setSpeeches(selectedTemplate);
      
      toast.success("Speech generated successfully!");
    } catch (err) {
      toast.error("Failed to generate speech");
    } finally {
      setGenerating(false);
    }
  };

  const exportAsPDF = () => {
    if (!speeches[activeTab]) {
      toast.error("No speech content to export");
      return;
    }

    // Create and download as text file (simulating PDF export)
    const content = speeches[activeTab];
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `speech-${activeTab}-${audienceType.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Speech exported successfully!");
  };

  const tabs = [
    { id: "full", label: "Full Speech", icon: "FileText" },
    { id: "summary", label: "Short Summary", icon: "FileTextIcon" },
    { id: "bullets", label: "Bullet Points", icon: "List" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-rose-600 to-rose-800">
          <h1 className="text-2xl font-bold font-display text-white">AI Speech Writer</h1>
          <p className="text-rose-100 mt-1">Generate compelling speeches for any audience</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="space-y-6">
              <Select
                label="Audience Type"
                options={audienceOptions}
                value={audienceType}
                onChange={(e) => setAudienceType(e.target.value)}
                placeholder="Select audience"
              />

              <Button
                variant="primary"
                icon="Edit3"
                onClick={generateSpeech}
                loading={generating}
                className="w-full"
              >
                Draft Speech
              </Button>
            </div>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        activeTab === tab.id
                          ? "bg-white text-rose-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  icon="Download"
                  onClick={exportAsPDF}
                  disabled={!speeches[activeTab]}
                  size="sm"
                >
                  Export as PDF
                </Button>
              </div>

              <Card className="p-6">
                <div className="min-h-[500px]">
                  {speeches[activeTab] ? (
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-gray-900 leading-relaxed font-sans">
                        {speeches[activeTab]}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96 text-gray-500">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <p className="text-lg font-medium mb-2">No speech generated</p>
                        <p className="text-sm">Select an audience type and click "Draft Speech" to get started</p>
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

export default SpeechWriter;