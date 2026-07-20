export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error reading "${key}" from localStorage.`, error);
    return defaultValue;
  }
};

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving "${key}" to localStorage.`, error);
  }
};

export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing "${key}" from localStorage.`, error);
  }
};

export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage.", error);
  }
};

/*Referral Storage*/
const REFERRALS_KEY = "palc_referrals";

export function getReferrals<T>(defaultValue: T): T {
  return getStorageItem(REFERRALS_KEY, defaultValue);
};

export function saveReferrals<T>(referrals: T): void {
  setStorageItem(REFERRALS_KEY, referrals);
};

export function clearReferrals(): void {
  removeStorageItem(REFERRALS_KEY);
};
export const getRewardHistory = <T,>(initial: T): T => {
  const data = localStorage.getItem("rewardHistory");
  return data ? JSON.parse(data) : initial;
};

export const saveRewardHistory = <T,>(data: T) => {
  localStorage.setItem("rewardHistory", JSON.stringify(data));
};