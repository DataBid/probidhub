export const serializeDate = (date: string | null) => {
  if (!date) return null;
  try {
    return new Date(date).toISOString();
  } catch (e) {
    console.error('Error serializing date:', e);
    return null;
  }
};