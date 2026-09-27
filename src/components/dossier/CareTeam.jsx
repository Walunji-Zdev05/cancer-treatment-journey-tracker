export default function CareTeam({ team, onCall, onMail }) {
  return (
    <div className="bg-surface-container-lowest rounded shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Assigned Care Team</h3>
        </div>
        <span className="font-label-sm text-label-sm text-secondary font-bold">Active Cluster</span>
      </div>

      <div className="space-y-3">
        {team.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-2.5 bg-surface-container-low rounded">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-label-md ${member.avatarClass}`}
              >
                {member.initials}
              </div>
              <div>
                <div className="font-label-md text-label-md text-on-surface font-semibold">{member.name}</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">{member.role}</div>
              </div>
            </div>
            <button
              onClick={() => (member.action === "call" ? onCall(member) : onMail(member))}
              title={member.action === "call" ? "Call" : "Send Internal Referral"}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                {member.action === "call" ? "call" : "mail"}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
