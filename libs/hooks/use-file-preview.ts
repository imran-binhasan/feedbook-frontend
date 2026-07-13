"use client";

import { useRef, useMemo, useEffect } from "react";

export function useFilePreview(file: File | null) {
  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  const prevUrlRef = useRef<string | null>(null);
  useEffect(() => {
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    if (preview) prevUrlRef.current = preview;
    else prevUrlRef.current = null;
    return () => { if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current); };
  }, [preview]);

  return preview;
}
