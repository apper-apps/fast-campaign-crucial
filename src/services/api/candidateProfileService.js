import candidateProfilesData from "@/services/mockData/candidateProfiles.json";

class CandidateProfileService {
  constructor() {
    this.profiles = [...candidateProfilesData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.profiles];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const profile = this.profiles.find(p => p.Id === parseInt(id));
    if (!profile) {
      throw new Error(`Profile with Id ${id} not found`);
    }
    return { ...profile };
  }

  async getCurrent() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.profiles.length > 0 ? { ...this.profiles[0] } : null;
  }

  async create(profileData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = this.profiles.length > 0 ? Math.max(...this.profiles.map(p => p.Id)) + 1 : 1;
    const newProfile = {
      Id: newId,
      ...profileData
    };
    this.profiles.push(newProfile);
    return { ...newProfile };
  }

  async update(id, profileData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = this.profiles.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Profile with Id ${id} not found`);
    }
    this.profiles[index] = { ...this.profiles[index], ...profileData };
    return { ...this.profiles[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.profiles.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Profile with Id ${id} not found`);
    }
    this.profiles.splice(index, 1);
    return true;
  }
}

export default new CandidateProfileService();