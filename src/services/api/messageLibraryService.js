import messageLibraryData from "@/services/mockData/messageLibrary.json";

class MessageLibraryService {
  constructor() {
    this.messages = [...messageLibraryData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.messages];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const message = this.messages.find(m => m.Id === parseInt(id));
    if (!message) {
      throw new Error(`Message with Id ${id} not found`);
    }
    return { ...message };
  }

  async create(messageData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = this.messages.length > 0 ? Math.max(...this.messages.map(m => m.Id)) + 1 : 1;
    const newMessage = {
      Id: newId,
      createdAt: new Date().toISOString(),
      ...messageData
    };
    this.messages.push(newMessage);
    return { ...newMessage };
  }

  async update(id, messageData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Message with Id ${id} not found`);
    }
    this.messages[index] = { ...this.messages[index], ...messageData };
    return { ...this.messages[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Message with Id ${id} not found`);
    }
    this.messages.splice(index, 1);
    return true;
  }

  async generateMessage(occasion, language, tone) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate AI-generated messages based on parameters
    const messageTemplates = {
      "Festival Greeting": {
        "English": {
          "Formal": "We extend our warmest wishes to you and your family on this auspicious occasion. {voter_name}, may this festival bring prosperity and happiness to your home.",
          "Casual": "Hey {voter_name}! 🎉 Hope you're having an amazing celebration with your loved ones. Wishing you all the best!",
          "Inspirational": "Dear {voter_name}, as we celebrate this beautiful festival, let's remember that unity and joy make our community stronger. May this occasion inspire us all!"
        },
        "Marathi": {
          "Formal": "या शुभ अवसरावर आपल्या आणि आपल्या कुटुंबाला मनापासून शुभेच्छा. {voter_name}, हा सण आपल्या घरात समृद्धी आणि आनंद आणो.",
          "Casual": "अरे {voter_name}! 🎉 तुमचा सण कसा जात आहे? खूप आनंद करा आणि मिठाई खा!",
          "Inspirational": "प्रिय {voter_name}, या सुंदर सणाच्या निमित्ताने आपण सगळे मिळून आपल्या समाजाला मजबूत बनवूया!"
        }
      },
      "Event Invite": {
        "English": {
          "Formal": "Dear {voter_name}, You are cordially invited to attend our upcoming community event. Your presence would be highly valued.",
          "Casual": "Hi {voter_name}! 👋 Got an awesome event coming up - would love to see you there!",
          "Inspirational": "Join us, {voter_name}, as we come together to build a better tomorrow for our community!"
        },
        "Marathi": {
          "Formal": "आदरणीय {voter_name}, आपल्याला आमच्या येत्या सामुदायिक कार्यक्रमास उपस्थित राहण्यासाठी आमंत्रित करतो.",
          "Casual": "अरे {voter_name}! एक छान कार्यक्रम येत आहे - तुम्ही नक्की या!",
          "Inspirational": "{voter_name}, आपल्या समाजाचे चांगले भविष्य घडवण्यासाठी आमच्यासोबत सामील व्हा!"
        }
      },
      "General Update": {
        "English": {
          "Formal": "Dear {voter_name}, We would like to update you on the recent developments in our community initiatives.",
          "Casual": "Hey {voter_name}! Quick update on what's happening in our neighborhood 📢",
          "Inspirational": "{voter_name}, together we're making real progress! Here's what we've accomplished recently."
        },
        "Marathi": {
          "Formal": "आदरणीय {voter_name}, आमच्या सामुदायिक उपक्रमांमधील अलीकडील घडामोडींची माहिती देत आहोत.",
          "Casual": "अरे {voter_name}! आमच्या परिसरात काय चालू आहे ते सांगतो 📢",
          "Inspirational": "{voter_name}, आपण सगळे मिळून खरोखर प्रगती करत आहोत! पाहा आपण काय साध्य केले आहे."
        }
      }
    };

    const template = messageTemplates[occasion]?.[language]?.[tone] || 
      "Dear {voter_name}, thank you for your continued support and engagement with our community initiatives.";

    return template;
  }
}

export default new MessageLibraryService();