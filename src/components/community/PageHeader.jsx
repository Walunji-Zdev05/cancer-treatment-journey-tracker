export default function PageHeader({
  onRefresh,
  title = "Community & Peer Stories Moderation",
  statusLabel = "Live Triage Desk Active",
  statusSub = "Sister Grace Phiri on shift • Ward 3B",
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm uppercase tracking-wider">
          <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
          <span>Tikondane Community Care • Kusamalira ndi Chitsogozo</span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface">{title}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
          <span>Kamuzu Central & QECH Catchment</span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
          <span className="font-bilingual-caption text-bilingual-caption italic text-outline">
            Kuwunika Nkhani za Odwala ndi Thandizo Lapamtima
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded shadow-sm self-start md:self-auto">
        <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-on-surface">{statusLabel}</span>
          <span className="font-body-sm text-body-sm text-outline">{statusSub}</span>
        </div>
        <button onClick={onRefresh} className="ml-2 p-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">refresh</span>
        </button>
      </div>
    </div>
  );
}
