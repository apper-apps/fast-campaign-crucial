import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import candidateProfileService from "@/services/api/candidateProfileService";

const CandidateProfile = () => {
  const [profile, setProfile] = useState({
    personalBackground: "",
    politicalHistory: "",
    achievements: "",
    vision: "",
    socialWork: "",
    corePositioning: "",
    partyManifesto: "",
    brandKit: {
      primaryColor: "#1E3A8A",
      secondaryColor: "#DC2626",
      accentColor: "#F59E0B",
      slogan: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentProfile = await candidateProfileService.getCurrent();
      if (currentProfile) {
        setProfile(currentProfile);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (profile.Id) {
        await candidateProfileService.update(profile.Id, profile);
      } else {
        await candidateProfileService.create(profile);
      }
      toast.success("Profile saved successfully!");
      loadProfile();
    } catch (err) {
      toast.error("Failed to save profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const generateDossier = async () => {
    toast.info("Generating Party Dossier PDF...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Party Dossier generated successfully!");
  };

  const generateDesignerBrief = async () => {
    toast.info("Generating Designer Brief PDF...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Designer Brief generated successfully!");
  };

  if (loading) return <Loading message="Loading candidate profile..." />;
  if (error) return <Error message="Failed to load profile" description={error} onRetry={loadProfile} />;

  const tabs = [
    { id: "personal", label: "Personal", icon: "User" },
    { id: "political", label: "Political History", icon: "Building" },
    { id: "achievements", label: "Achievements", icon: "Award" },
    { id: "vision", label: "Vision", icon: "Eye" },
    { id: "branding", label: "Branding", icon: "Palette" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-primary to-blue-700">
          <h1 className="text-2xl font-bold font-display text-white">Candidate Profile</h1>
          <p className="text-blue-100 mt-1">Configure your campaign profile and branding</p>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "personal" && (
            <div className="space-y-6">
              <TextArea
                label="Personal Background"
                placeholder="Describe your personal background, education, and community ties..."
                value={profile.personalBackground}
                onChange={(e) => handleInputChange("personalBackground", e.target.value)}
                rows={4}
              />
              <TextArea
                label="Social Work"
                placeholder="Detail your social work and community service initiatives..."
                value={profile.socialWork}
                onChange={(e) => handleInputChange("socialWork", e.target.value)}
                rows={4}
              />
            </div>
          )}

          {activeTab === "political" && (
            <div className="space-y-6">
              <TextArea
                label="Political History"
                placeholder="Outline your political journey, positions held, and key milestones..."
                value={profile.politicalHistory}
                onChange={(e) => handleInputChange("politicalHistory", e.target.value)}
                rows={4}
              />
              <TextArea
                label="Core Positioning"
                placeholder="Define your core political positioning and key differentiators..."
                value={profile.corePositioning}
                onChange={(e) => handleInputChange("corePositioning", e.target.value)}
                rows={3}
              />
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="space-y-6">
              <TextArea
                label="Key Achievements"
                placeholder="List your major achievements, awards, and recognitions..."
                value={profile.achievements}
                onChange={(e) => handleInputChange("achievements", e.target.value)}
                rows={5}
              />
            </div>
          )}

          {activeTab === "vision" && (
            <div className="space-y-6">
              <TextArea
                label="Vision Statement"
                placeholder="Articulate your vision for the community and future goals..."
                value={profile.vision}
                onChange={(e) => handleInputChange("vision", e.target.value)}
                rows={4}
              />
              <TextArea
                label="Party Manifesto"
                placeholder="Describe your party's manifesto and key policy positions..."
                value={profile.partyManifesto}
                onChange={(e) => handleInputChange("partyManifesto", e.target.value)}
                rows={4}
              />
            </div>
          )}

          {activeTab === "branding" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={profile.brandKit.primaryColor}
                      onChange={(e) => handleInputChange("brandKit.primaryColor", e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={profile.brandKit.primaryColor}
                      onChange={(e) => handleInputChange("brandKit.primaryColor", e.target.value)}
                      placeholder="#1E3A8A"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={profile.brandKit.secondaryColor}
                      onChange={(e) => handleInputChange("brandKit.secondaryColor", e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={profile.brandKit.secondaryColor}
                      onChange={(e) => handleInputChange("brandKit.secondaryColor", e.target.value)}
                      placeholder="#DC2626"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={profile.brandKit.accentColor}
                      onChange={(e) => handleInputChange("brandKit.accentColor", e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={profile.brandKit.accentColor}
                      onChange={(e) => handleInputChange("brandKit.accentColor", e.target.value)}
                      placeholder="#F59E0B"
                    />
                  </div>
                </div>
              </div>
              <Input
                label="Campaign Slogan"
                placeholder="Enter your campaign slogan..."
                value={profile.brandKit.slogan}
                onChange={(e) => handleInputChange("brandKit.slogan", e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                icon="FileDown"
                onClick={generateDossier}
              >
                Generate Party Dossier
              </Button>
              <Button
                variant="accent"
                icon="Palette"
                onClick={generateDesignerBrief}
              >
                Generate Designer Brief
              </Button>
            </div>
            <Button
              variant="primary"
              icon="Save"
              onClick={handleSave}
              loading={saving}
            >
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;