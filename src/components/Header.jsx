import { useNavigate } from "react-router-dom";

export default function Header({ searchTerm, onSearchChange }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-surface-container-low text-on-surface placeholder:text-outline rounded-full font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search patient by Name, Health ID, or Passport #..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-full">
          <span className="material-symbols-outlined text-primary text-[18px]">local_hospital</span>
          <select className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer pr-1">
            <option value="kch">Kamuzu Central Hospital - Lilongwe Oncology Unit</option>
            <option value="qech">Queen Elizabeth Central Hospital - Blantyre Unit</option>
          </select>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-full text-on-surface hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined text-primary text-[18px]">translate</span>
          <span className="font-label-sm text-label-sm font-semibold">EN / NY</span>
        </button>

        <button className="relative p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-2">
          <button
            onClick={() => navigate("/login")}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-container transition-colors shadow-sm active:scale-95"
            title="Clinician Profile & Staff Sign In"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
}
