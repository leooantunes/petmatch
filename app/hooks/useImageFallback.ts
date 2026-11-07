import { useEffect, useState } from "react";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80";

export const useImageFallback = (initialUri?: string, fallbackUri = DEFAULT_IMAGE) => {
  const [imageUri, setImageUri] = useState(initialUri ?? fallbackUri);

  useEffect(() => {
    setImageUri(initialUri ?? fallbackUri);
  }, [initialUri, fallbackUri]);

  const handleError = () => {
    if (imageUri !== fallbackUri) {
      setImageUri(fallbackUri);
    }
  };

  return { imageUri, handleError };
};
