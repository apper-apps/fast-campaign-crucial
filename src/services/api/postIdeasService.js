import postIdeasData from "@/services/mockData/postIdeas.json";

class PostIdeasService {
  constructor() {
    this.postIdeas = [...postIdeasData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.postIdeas];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const idea = this.postIdeas.find(p => p.Id === parseInt(id));
    if (!idea) {
      throw new Error(`Post idea with Id ${id} not found`);
    }
    return { ...idea };
  }

  async create(ideaData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = this.postIdeas.length > 0 ? Math.max(...this.postIdeas.map(p => p.Id)) + 1 : 1;
    const newIdea = {
      Id: newId,
      ...ideaData
    };
    this.postIdeas.push(newIdea);
    return { ...newIdea };
  }

  async update(id, ideaData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = this.postIdeas.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Post idea with Id ${id} not found`);
    }
    this.postIdeas[index] = { ...this.postIdeas[index], ...ideaData };
    return { ...this.postIdeas[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.postIdeas.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Post idea with Id ${id} not found`);
    }
    this.postIdeas.splice(index, 1);
    return true;
  }

  async generateIdeas(candidateProfile, eventsCalendar) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate AI-generated ideas
    const generatedIdeas = [
      {
        brief: "Share a powerful quote about community unity with inspiring background visuals",
        contentType: "Image",
        themeTags: ["Unity", "Community", "Inspiration"]
      },
      {
        brief: "Create a video highlighting recent infrastructure improvements and their impact",
        contentType: "Video", 
        themeTags: ["Infrastructure", "Progress", "Development"]
      },
      {
        brief: "Post about upcoming healthcare initiatives and their benefits for families",
        contentType: "Text",
        themeTags: ["Healthcare", "Family", "Community"]
      },
      {
        brief: "Feature local business success stories and job creation achievements",
        contentType: "Image",
        themeTags: ["Economy", "Business", "Jobs"]
      },
      {
        brief: "Behind-the-scenes video of community engagement activities",
        contentType: "Video",
        themeTags: ["Community", "Engagement", "Transparency"]
      }
    ];

    const createdIdeas = [];
    for (const idea of generatedIdeas) {
      const newId = this.postIdeas.length > 0 ? Math.max(...this.postIdeas.map(p => p.Id)) + 1 : 1;
      const newIdea = {
        Id: newId,
        postDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: "Idea",
        ...idea
      };
      this.postIdeas.push(newIdea);
      createdIdeas.push({ ...newIdea });
    }

    return createdIdeas;
  }
}

export default new PostIdeasService();