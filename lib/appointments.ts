export type Appointment = {
  id: string;
  title: string;
  datetime: string;
  status: 'upcoming' | 'past' | 'cancelled' | string;
};

const KEY = 'moms_appointments_v1';

export function getAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('getAppointments error', e);
    return [];
  }
}

export function saveAppointments(list: Appointment[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    console.error('saveAppointments error', e);
  }
}
