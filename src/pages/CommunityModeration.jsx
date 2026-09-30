import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import PageHeader from "../components/community/PageHeader.jsx";
import StatsBar from "../components/community/StatsBar.jsx";
import QueueHeader from "../components/community/QueueHeader.jsx";
import StoryCard from "../components/community/StoryCard.jsx";

import { useToast } from "../hooks/useToast.js";
import { storyStatCards, storyFilterTabs } from "../data/community.js";
import { pendingStories, publishedStories } from "../data/stories.js";

export default function CommunityModeration() {
  const [activeNav, setActiveNav] = useState("community");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [pending, setPending] = useState(pendingStories);
  const [published, setPublished] = useState(publishedStories);
  const { toast, showToast } = useToast();

  const approve = (story) => {
    setPending((p) => p.filter((s) => s.id !== story.id));
    setPublished((p) => [
      { ...story, status: "published", timeLabel: "Published just now", reactions: 0, approvedBy: "Sr. Grace Phiri" },
      ...p,
    ]);
    showToast("Story approved and published", "check_circle");
  };

  const reject = (story) => {
    setPending((p) => p.filter((s) => s.id !== story.id));
    showToast("Story rejected", "cancel");
  };

  const visible = activeTab === "pending" ? pending : published;

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Sidebar active={activeNav} onNavigate={setActiveNav} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 pb-9 flex-1 bg-background">
          <div className="flex flex-col w-full">
            <PageHeader
              title="Survivor Stories Moderation"
              statusLabel="Live Moderation Desk Active"
              statusSub="Sister Grace Phiri on shift • Ward 3B"
              onRefresh={() => showToast("Refreshing story review queue...", "refresh")}
            />
            <StatsBar cards={storyStatCards} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <QueueHeader
                  title="Story Review Queue"
                  icon="auto_stories"
                  countLabel={`${pending.length} to review`}
                  tabs={storyFilterTabs}
                  defaultTab="pending"
                  onFilterChange={setActiveTab}
                />

                {visible.length === 0 ? (
                  <p className="text-outline text-center py-10">No stories here right now.</p>
                ) : (
                  visible.map((s) => (
                    <StoryCard key={s.id} story={s} onApprove={approve} onReject={reject} />
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Toast visible={toast.visible} message={toast.message} icon={toast.icon} />
    </div>
  );
}