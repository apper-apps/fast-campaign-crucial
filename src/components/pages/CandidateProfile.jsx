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
    Name: "",
    personal_background_c: "",
    political_history_c: "",
    achievements_c: "",
    vision_c: "",
    social_work_c: "",
    core_positioning_c: "",
    party_manifesto_c: "",
    primary_color_c: "#1E3A8A",
    secondary_color_c: "#DC2626",
    accent_color_c: "#F59E0B",
    logo_c: "",
    fonts_c: "",
    slogan_c: ""
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
        // Transform database structure to UI structure
        setProfile({
          Id: currentProfile.Id,
          Name: currentProfile.Name || "",
          personal_background_c: currentProfile.personal_background_c || "",
          political_history_c: currentProfile.political_history_c || "",
          achievements_c: currentProfile.achievements_c || "",
          vision_c: currentProfile.vision_c || "",
          social_work_c: currentProfile.social_work_c || "",
          core_positioning_c: currentProfile.core_positioning_c || "",
          party_manifesto_c: currentProfile.party_manifesto_c || "",
          primary_color_c: currentProfile.primary_color_c || "#1E3A8A",
          secondary_color_c: currentProfile.secondary_color_c || "#DC2626",
          accent_color_c: currentProfile.accent_color_c || "#F59E0B",
          logo_c: currentProfile.logo_c || "",
          fonts_c: currentProfile.fonts_c || "",
          slogan_c: currentProfile.slogan_c || ""
        });
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
    setProfile(prev => ({ ...prev, [field]: value }));
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
                value={profile.personal_background_c}
                onChange={(e) => handleInputChange("personal_background_c", e.target.value)}
                rows={4}
              />
              <TextArea
                label="Social Work"
                placeholder="Detail your social work and community service initiatives..."
                value={profile.social_work_c}
                onChange={(e) => handleInputChange("social_work_c", e.target.value)}
                rows={4}
              />
            </div>
          )}

          {activeTab === "political" && (
            <div className="space-y-6">
<TextArea
                label="Political History"
                placeholder="Outline your political journey, positions held, and key milestones..."
                value={profile.political_history_c}
                onChange={(e) => handleInputChange("political_history_c", e.target.value)}
                rows={4}
              />
              <TextArea
                label="Core Positioning"
                placeholder="Define your core political positioning and key differentiators..."
                value={profile.core_positioning_c}
                onChange={(e) => handleInputChange("core_positioning_c", e.target.value)}
                rows={3}
              />
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="space-y-6">
<TextArea
                label="Key Achievements"
                placeholder="List your major achievements, awards, and recognitions..."
                value={profile.achievements_c}
                onChange={(e) => handleInputChange("achievements_c", e.target.value)}
                rows={5}
              />
            </div>
          )}

          {activeTab === "vision" && (
            <div className="space-y-6">
<TextArea
                label="Vision Statement"
                placeholder="Articulate your vision for the community and future goals..."
                value={profile.vision_c}
                onChange={(e) => handleInputChange("vision_c", e.target.value)}
                rows={4}
              />
              <TextArea
                label="Party Manifesto"
                placeholder="Describe your party's manifesto and key policy positions..."
                value={profile.party_manifesto_c}
                onChange={(e) => handleInputChange("party_manifesto_c", e.target.value)}
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
                      value={profile.primary_color_c}
                      onChange={(e) => handleInputChange("primary_color_c", e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={profile.primary_color_c}
                      onChange={(e) => handleInputChange("primary_color_c", e.target.value)}
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
                      value={profile.secondary_color_c}
                      onChange={(e) => handleInputChange("secondary_color_c", e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={profile.secondary_color_c}
                      onChange={(e) => handleInputChange("secondary_color_c", e.target.value)}
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
                      value={profile.accent_color_c}
                      onChange={(e) => handleInputChange("accent_color_c", e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={profile.accent_color_c}
                      onChange={(e) => handleInputChange("accent_color_c", e.target.value)}
                      placeholder="#F59E0B"
                    />
                  </div>
                </div>
              </div>
              <Input
                label="Campaign Slogan"
                placeholder="Enter your campaign slogan..."
                value={profile.slogan_c}
                onChange={(e) => handleInputChange("slogan_c", e.target.value)}
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