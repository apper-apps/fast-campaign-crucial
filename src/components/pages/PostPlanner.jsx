import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ContentCard from "@/components/molecules/ContentCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import postIdeasService from "@/services/api/postIdeasService";
import candidateProfileService from "@/services/api/candidateProfileService";
import eventsCalendarService from "@/services/api/eventsCalendarService";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

const PostPlanner = () => {
  const [postIdeas, setPostIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const loadPostIdeas = async () => {
    try {
      setLoading(true);
      setError(null);
      const ideas = await postIdeasService.getAll();
      setPostIdeas(ideas);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPostIdeas();
  }, []);

  const generateNewIdeas = async () => {
    try {
      setGenerating(true);
      const [candidateProfile, eventsCalendar] = await Promise.all([
        candidateProfileService.getCurrent(),
        eventsCalendarService.getAll()
      ]);

      const newIdeas = await postIdeasService.generateIdeas(candidateProfile, eventsCalendar);
      toast.success(`Generated ${newIdeas.length} new post ideas!`);
      loadPostIdeas();
    } catch (err) {
      toast.error("Failed to generate ideas: " + err.message);
    } finally {
      setGenerating(false);
    }
  };

const handleDateChange = async (ideaId, newDate) => {
    try {
      await postIdeasService.update(ideaId, { post_date_c: format(newDate, "yyyy-MM-dd") });
      loadPostIdeas();
      toast.success("Post date updated successfully!");
    } catch (err) {
      toast.error("Failed to update post date");
    }
  };

  const generateCreative = (ideaId) => {
    toast.info("Creative generation feature coming soon!");
  };

  if (loading) return <Loading message="Loading post planner..." />;
  if (error) return <Error message="Failed to load post planner" description={error} onRetry={loadPostIdeas} />;

  // Generate calendar days
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Group posts by date
const postsByDate = postIdeas.reduce((acc, idea) => {
    const date = idea.post_date_c || idea.postDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(idea);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-primary to-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-display text-white">Post Ideas Planner</h1>
              <p className="text-blue-100 mt-1">Plan and schedule your social media content</p>
            </div>
            <Button
              variant="accent"
              icon="Sparkles"
              onClick={generateNewIdeas}
              loading={generating}
            >
              Generate New Ideas
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                icon="ChevronLeft"
                onClick={() => setCurrentDate(addDays(currentDate, -30))}
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <Button
                variant="outline"
                size="sm"
                icon="ChevronRight"
                onClick={() => setCurrentDate(addDays(currentDate, 30))}
              />
            </div>
            <div className="text-sm text-gray-600">
              {postIdeas.length} total ideas planned
            </div>
          </div>

          {postIdeas.length === 0 ? (
            <Empty
              title="No post ideas yet"
              description="Generate AI-powered content ideas to get started with your campaign planning."
              icon="Calendar"
              action={generateNewIdeas}
              actionLabel="Generate Ideas"
            />
          ) : (
            <div className="grid grid-cols-7 gap-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((day) => {
                const dayStr = format(day, "yyyy-MM-dd");
                const dayPosts = postsByDate[dayStr] || [];
                const isToday = isSameDay(day, new Date());
                const isSelected = isSameDay(day, selectedDate);

                return (
                  <div
                    key={dayStr}
                    className={`min-h-[120px] p-2 border rounded-lg cursor-pointer transition-all duration-200 ${
                      isToday
                        ? "bg-primary/10 border-primary"
                        : isSelected
                        ? "bg-blue-50 border-blue-300"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      isToday ? "text-primary" : "text-gray-700"
                    }`}>
                      {format(day, "d")}
                    </div>
                    <div className="space-y-1">
{dayPosts.slice(0, 2).map((post) => (
                        <div
                          key={post.Id}
                          className="p-1 bg-gradient-to-r from-primary/10 to-primary/5 rounded text-xs cursor-move"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", post.Id.toString());
                          }}
                        >
                          <div className="font-medium text-primary truncate">
                            {post.content_type_c || post.contentType}
                          </div>
                          <div className="text-gray-600 line-clamp-2">
                            {post.brief_c || post.brief}
                          </div>
                        </div>
                      ))}
                      {dayPosts.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayPosts.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {postIdeas.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Post Ideas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{postIdeas.map((idea) => (
              <ContentCard
                key={idea.Id}
                title={idea.brief_c || idea.brief}
                type={idea.content_type_c || idea.contentType}
                tags={typeof (idea.theme_tags_c || idea.themeTags) === 'string' ? (idea.theme_tags_c || idea.themeTags).split(',') : (idea.theme_tags_c || idea.themeTags || [])}
                status={idea.status_c || idea.status}
                onAction={() => generateCreative(idea.Id)}
                actionLabel="Generate Creative"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPlanner;