export default function StoryCard({ story, onApprove, onReject }) {
  const isPending = story.status === "pending";

  return (
    <article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col gap-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-on-surface">{story.authorName}</h3>
            {story.verified && (
              <span className="material-symbols-outlined text-secondary text-base">verified</span>
            )}
          </div>
          <p className="text-sm text-outline">{story.meta}</p>
        </div>
        <span className="text-xs text-outline whitespace-nowrap">{story.timeLabel}</span>
      </header>

      <div>
        <h4 className="font-medium text-on-surface mb-1">{story.title}</h4>
        <p className="text-on-surface leading-relaxed">{story.body}</p>
        <p className="text-sm text-outline italic mt-2">{story.summary}</p>
      </div>

      {isPending && story.checks && (
        <ul className="flex flex-wrap gap-2">
          {story.checks.map((c) => (
            <li
              key={c.label}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-surface-container text-${c.tone}`}
            >
              <span className="material-symbols-outlined text-sm">{c.icon}</span>
              {c.label}
            </li>
          ))}
        </ul>
      )}

      <footer className="flex items-center justify-between">
        {isPending ? (
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => onReject(story)}
              className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container"
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(story)}
              className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:opacity-90"
            >
              Approve & Publish
            </button>
          </div>
        ) : (
          <>
            <span className="flex items-center gap-1 text-sm text-tertiary">
              <span className="material-symbols-outlined text-base">favorite</span>
              {story.reactions} "Mwandilimbikitsa"
            </span>
            <span className="text-xs text-outline">Approved by {story.approvedBy}</span>
          </>
        )}
      </footer>
    </article>
  );
}
