import { toast } from 'react-toastify';

class PostIdeasService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'post_idea_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "post_date_c" } },
          { field: { Name: "brief_c" } },
          { field: { Name: "content_type_c" } },
          { field: { Name: "theme_tags_c" } },
          { field: { Name: "status_c" } }
        ],
        orderBy: [
          { fieldName: "post_date_c", sorttype: "ASC" }
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
        console.error("Error fetching post ideas:", error?.response?.data?.message);
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
          { field: { Name: "post_date_c" } },
          { field: { Name: "brief_c" } },
          { field: { Name: "content_type_c" } },
          { field: { Name: "theme_tags_c" } },
          { field: { Name: "status_c" } }
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
        console.error(`Error fetching post idea with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(ideaData) {
    try {
      // Only include updateable fields
      const params = {
        records: [{
          Name: ideaData.Name || ideaData.brief_c || "Post Idea",
          Tags: ideaData.Tags || "",
          post_date_c: ideaData.post_date_c || ideaData.postDate,
          brief_c: ideaData.brief_c || ideaData.brief,
          content_type_c: ideaData.content_type_c || ideaData.contentType,
          theme_tags_c: Array.isArray(ideaData.theme_tags_c) ? ideaData.theme_tags_c.join(',') : (Array.isArray(ideaData.themeTags) ? ideaData.themeTags.join(',') : (ideaData.theme_tags_c || ideaData.themeTags || "")),
          status_c: ideaData.status_c || ideaData.status || "Idea"
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
          console.error(`Failed to create post ideas ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating post idea:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async update(id, ideaData) {
    try {
      // Only include updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          Name: ideaData.Name || ideaData.brief_c || "Post Idea",
          Tags: ideaData.Tags || "",
          post_date_c: ideaData.post_date_c || ideaData.postDate,
          brief_c: ideaData.brief_c || ideaData.brief,
          content_type_c: ideaData.content_type_c || ideaData.contentType,
          theme_tags_c: Array.isArray(ideaData.theme_tags_c) ? ideaData.theme_tags_c.join(',') : (Array.isArray(ideaData.themeTags) ? ideaData.themeTags.join(',') : (ideaData.theme_tags_c || ideaData.themeTags || "")),
          status_c: ideaData.status_c || ideaData.status || "Idea"
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
          console.error(`Failed to update post ideas ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
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
        console.error("Error updating post idea:", error?.response?.data?.message);
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
          console.error(`Failed to delete post ideas ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting post idea:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }

  async generateIdeas(candidateProfile, eventsCalendar) {
    try {
      // Simulate AI-generated ideas
      const generatedIdeas = [
        {
          brief_c: "Share a powerful quote about community unity with inspiring background visuals",
          content_type_c: "Image",
          theme_tags_c: "Unity,Community,Inspiration"
        },
        {
          brief_c: "Create a video highlighting recent infrastructure improvements and their impact",
          content_type_c: "Video", 
          theme_tags_c: "Infrastructure,Progress,Development"
        },
        {
          brief_c: "Post about upcoming healthcare initiatives and their benefits for families",
          content_type_c: "Text",
          theme_tags_c: "Healthcare,Family,Community"
        },
        {
          brief_c: "Feature local business success stories and job creation achievements",
          content_type_c: "Image",
          theme_tags_c: "Economy,Business,Jobs"
        },
        {
          brief_c: "Behind-the-scenes video of community engagement activities",
          content_type_c: "Video",
          theme_tags_c: "Community,Engagement,Transparency"
        }
      ];

      const createdIdeas = [];
      for (const idea of generatedIdeas) {
        const postDate = new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const newIdea = {
          Name: idea.brief_c,
          Tags: "",
          post_date_c: postDate,
          brief_c: idea.brief_c,
          content_type_c: idea.content_type_c,
          theme_tags_c: idea.theme_tags_c,
          status_c: "Idea"
        };
        
        const created = await this.create(newIdea);
        if (created) {
          createdIdeas.push(created);
        }
      }

      return createdIdeas;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error generating post ideas:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }
}

export default new PostIdeasService();