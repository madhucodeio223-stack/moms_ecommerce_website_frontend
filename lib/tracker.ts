import supabase from './supabaseClient';

export async function getPregnancyProfile(userId:string){
  const { data, error } = await supabase.from('pregnancy_profiles').select('*').eq('user_id', userId).single();
  if(error) return null;
  return data;
}

export async function getUpcomingAppointment(userId:string){
  const { data } = await supabase.from('appointments').select('*').eq('user_id', userId).order('date',{ascending:true}).limit(1);
  return data?.[0] ?? null;
}

export async function saveSymptomLog(userId:string, symptoms:string[]){
  return supabase.from('symptom_logs').insert([{user_id:userId, symptoms: JSON.stringify(symptoms)}]);
}

// Additional helpers can be added for logs, kicks, contractions, nutrition, etc.
