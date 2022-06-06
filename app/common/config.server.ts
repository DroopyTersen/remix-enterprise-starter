export const getConfigEntry = (key: string, fallback = ""): string => {
  return process.env?.[key] ?? fallback;
};
