export type Profile = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
};

const KEY = 'moms_profile_v1';

export function getProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('getProfile error', e);
    return {};
  }
}

export function saveProfile(p: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch (e) {
    console.error('saveProfile error', e);
  }
}
