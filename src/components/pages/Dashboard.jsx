import React, { useState, useEffect } from "react";
import StatCard from "@/components/molecules/StatCard";
import ContentCard from "@/components/molecules/ContentCard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import postIdeasService from "@/services/api/postIdeasService";
import eventsCalendarService from "@/services/api/eventsCalendarService";
import messageLibraryService from "@/services/api/messageLibraryService";
import candidateProfileService from "@/services/api/candidateProfileService";

const Dashboard = () => {
  const [data, setData] = useState({
    postIdeas: [],
    events: [],
    messages: [],
    profile: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [postIdeas, events, messages, profile] = await Promise.all([
        postIdeasService.getAll(),
        eventsCalendarService.getUpcoming(),
        messageLibraryService.getAll(),
        candidateProfileService.getCurrent()
      ]);

      setData({ postIdeas, events, messages, profile });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) return <Loading message="Loading dashboard data..." />;
  if (error) return <Error message="Failed to load dashboard data" description={error} onRetry={loadDashboardData} />;

  const stats = {
    totalIdeas: data.postIdeas.length,
    draftIdeas: data.postIdeas.filter(idea => (idea.status_c || idea.status) === "Draft").length,
    upcomingEvents: data.events.length,
    savedMessages: data.messages.length
  };

  const recentIdeas = data.postIdeas.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary via-blue-700 to-secondary rounded-xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold font-display mb-4">
            Welcome to Campaign Hub
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Your all-in-one platform for managing political campaign content and communications. 
            Generate ideas, create messages, and coordinate your campaign strategy from one central location.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="accent" size="lg" icon="Plus">
              Generate New Ideas
            </Button>
            <Button variant="outline" size="lg" icon="User" className="text-white border-white hover:bg-white hover:text-primary">
              Update Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Post Ideas"
          value={stats.totalIdeas}
          icon="Lightbulb"
          color="primary"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Draft Content"
          value={stats.draftIdeas}
          icon="Edit"
          color="accent"
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon="Calendar"
          color="secondary"
          trend="up"
          trendValue="+3 this week"
        />
        <StatCard
          title="Message Library"
          value={stats.savedMessages}
          icon="MessageCircle"
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-display text-gray-900">Recent Post Ideas</h2>
            <Button variant="outline" size="sm" icon="Eye">
              View All
            </Button>
          </div>
          {recentIdeas.length > 0 ? (
            <div className="space-y-4">
              {recentIdeas.map((idea) => (
<ContentCard
                  key={idea.Id}
                  title={idea.brief_c || idea.brief}
                  type={idea.content_type_c || idea.contentType}
                  tags={typeof (idea.theme_tags_c || idea.themeTags) === 'string' ? (idea.theme_tags_c || idea.themeTags).split(',') : (idea.theme_tags_c || idea.themeTags || [])}
                  status={idea.status_c || idea.status}
                  actionLabel="Edit"
                />
              ))}
            </div>
          ) : (
            <Empty
              title="No post ideas yet"
              description="Start generating content ideas for your campaign"
              icon="Lightbulb"
              actionLabel="Generate Ideas"
            />
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-display text-gray-900">Upcoming Events</h2>
            <Button variant="outline" size="sm" icon="Plus">
              Add Event
            </Button>
          </div>
          {data.events.length > 0 ? (
<div className="space-y-4">
              {data.events.slice(0, 4).map((event) => (
                <div key={event.Id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {new Date(event.event_date_c || event.eventDate).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{event.event_name_c || event.eventName}</h3>
                    <p className="text-sm text-gray-600">{event.location_c || event.location}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(event.event_date_c || event.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty
              title="No upcoming events"
              description="Add events to your campaign calendar"
              icon="Calendar"
              actionLabel="Add Event"
            />
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-display text-gray-900 mb-2">
              Quick Actions
            </h2>
            <p className="text-gray-600">
              Jump into content creation with these popular tools
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" icon="Calendar">
              Plan Posts
            </Button>
            <Button variant="secondary" icon="MessageCircle">
              Create Message
            </Button>
            <Button variant="accent" icon="Mic">
              Generate Speech
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;