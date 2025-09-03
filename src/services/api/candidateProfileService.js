import { toast } from 'react-toastify';

class CandidateProfileService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'candidate_profile_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "personal_background_c" } },
          { field: { Name: "political_history_c" } },
          { field: { Name: "achievements_c" } },
          { field: { Name: "vision_c" } },
          { field: { Name: "social_work_c" } },
          { field: { Name: "core_positioning_c" } },
          { field: { Name: "party_manifesto_c" } },
          { field: { Name: "primary_color_c" } },
          { field: { Name: "secondary_color_c" } },
          { field: { Name: "accent_color_c" } },
          { field: { Name: "logo_c" } },
          { field: { Name: "fonts_c" } },
          { field: { Name: "slogan_c" } }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching profiles:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "personal_background_c" } },
          { field: { Name: "political_history_c" } },
          { field: { Name: "achievements_c" } },
          { field: { Name: "vision_c" } },
          { field: { Name: "social_work_c" } },
          { field: { Name: "core_positioning_c" } },
          { field: { Name: "party_manifesto_c" } },
          { field: { Name: "primary_color_c" } },
          { field: { Name: "secondary_color_c" } },
          { field: { Name: "accent_color_c" } },
          { field: { Name: "logo_c" } },
          { field: { Name: "fonts_c" } },
          { field: { Name: "slogan_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching profile with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async getCurrent() {
    try {
      const profiles = await this.getAll();
      return profiles.length > 0 ? profiles[0] : null;
    } catch (error) {
      console.error("Error fetching current profile:", error);
      return null;
    }
  }

  async create(profileData) {
    try {
      // Only include updateable fields
      const params = {
        records: [{
          Name: profileData.Name || "Candidate Profile",
          Tags: profileData.Tags || "",
          personal_background_c: profileData.personalBackground || profileData.personal_background_c || "",
          political_history_c: profileData.politicalHistory || profileData.political_history_c || "",
          achievements_c: profileData.achievements || profileData.achievements_c || "",
          vision_c: profileData.vision || profileData.vision_c || "",
          social_work_c: profileData.socialWork || profileData.social_work_c || "",
          core_positioning_c: profileData.corePositioning || profileData.core_positioning_c || "",
          party_manifesto_c: profileData.partyManifesto || profileData.party_manifesto_c || "",
          primary_color_c: profileData.brandKit?.primaryColor || profileData.primary_color_c || "#1E3A8A",
          secondary_color_c: profileData.brandKit?.secondaryColor || profileData.secondary_color_c || "#DC2626",
          accent_color_c: profileData.brandKit?.accentColor || profileData.accent_color_c || "#F59E0B",
          logo_c: profileData.brandKit?.logo || profileData.logo_c || "",
          fonts_c: Array.isArray(profileData.brandKit?.fonts) ? profileData.brandKit.fonts.join(',') : (profileData.fonts_c || ""),
          slogan_c: profileData.brandKit?.slogan || profileData.slogan_c || ""
        }]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create candidate profiles ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating candidate profile:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async update(id, profileData) {
    try {
      // Only include updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          Name: profileData.Name || "Candidate Profile",
          Tags: profileData.Tags || "",
          personal_background_c: profileData.personalBackground || profileData.personal_background_c || "",
          political_history_c: profileData.politicalHistory || profileData.political_history_c || "",
          achievements_c: profileData.achievements || profileData.achievements_c || "",
          vision_c: profileData.vision || profileData.vision_c || "",
          social_work_c: profileData.socialWork || profileData.social_work_c || "",
          core_positioning_c: profileData.corePositioning || profileData.core_positioning_c || "",
          party_manifesto_c: profileData.partyManifesto || profileData.party_manifesto_c || "",
          primary_color_c: profileData.brandKit?.primaryColor || profileData.primary_color_c || "#1E3A8A",
          secondary_color_c: profileData.brandKit?.secondaryColor || profileData.secondary_color_c || "#DC2626",
          accent_color_c: profileData.brandKit?.accentColor || profileData.accent_color_c || "#F59E0B",
          logo_c: profileData.brandKit?.logo || profileData.logo_c || "",
          fonts_c: Array.isArray(profileData.brandKit?.fonts) ? profileData.brandKit.fonts.join(',') : (profileData.fonts_c || ""),
          slogan_c: profileData.brandKit?.slogan || profileData.slogan_c || ""
        }]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update candidate profiles ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating candidate profile:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete candidate profiles ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting candidate profile:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }
}

export default new CandidateProfileService();