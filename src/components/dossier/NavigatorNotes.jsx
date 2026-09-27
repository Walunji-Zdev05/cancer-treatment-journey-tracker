import { useState } from "react";
import { noteTagOptions } from "../../data/dossier.js";

export default function NavigatorNotes({ notes, onAddNote }) {
  const [draft, setDraft] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleLog = () => {
    if (!draft.trim()) return;
    onAddNote({ body: draft.trim(), tags: selectedTags });
    setDraft("");
    setSelectedTags([]);
  };

  return (
    <div className="bg-surface-container-lowest rounded shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">edit_note</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Navigator Notes</h3>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">{notes.length} entries</span>
      </div>

      <div className="mb-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full p-3 bg-surface-container-low text-on-surface placeholder:text-outline rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Add clinical navigation observation, psychosocial update, or family caregiver barrier note..."
          rows={3}
        />
        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {noteTagOptions.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2 py-1 rounded-full font-label-sm text-label-sm cursor-pointer transition-colors ${
                    active
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleLog}
            className="px-4 py-1.5 bg-primary text-on-primary rounded-full font-label-sm text-label-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Log Note
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="p-3 bg-surface-container-low rounded">
            <div className="flex items-center justify-between text-bilingual-caption font-bilingual-caption mb-1">
              <span className={`font-semibold ${note.highlight ? "text-secondary" : "text-primary"}`}>
                {note.author}
              </span>
              <span className="text-on-surface-variant">{note.time}</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface">{note.body}</p>
            {note.tags?.length > 0 && (
              <div className="mt-1 flex gap-1 flex-wrap">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
