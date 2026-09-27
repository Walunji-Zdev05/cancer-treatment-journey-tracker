import { useCallback, useRef, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState({ visible: false, message: "", icon: "check_circle" });
  const timerRef = useRef(null);

  const showToast = useCallback((message, icon = "check_circle") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ visible: true, message, icon });
    timerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3500);
  }, []);

  return { toast, showToast };
}
