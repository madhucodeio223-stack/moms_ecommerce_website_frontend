 'use client';

import { memo, useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Activity, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SummaryCards from '@/components/tracker/SummaryCards';
import ProgressCard from '@/components/tracker/ProgressCard';
import Timeline from '@/components/tracker/Timeline';
import HealthCharts from '@/components/tracker/HealthCharts';
import SymptomTracker from '@/components/tracker/SymptomTracker';
import KickCounter from '@/components/tracker/KickCounter';
import ContractionTimer from '@/components/tracker/ContractionTimer';
import Appointments from '@/components/tracker/Appointments';
import NutritionDashboard from '@/components/tracker/NutritionDashboard';
import ExerciseSummary from '@/components/tracker/ExerciseSummary';
import JournalAndPhotos from '@/components/tracker/JournalAndPhotos';
import AIInsights from '@/components/tracker/AIInsights';
import { getPregnancyProfile, getUpcomingAppointment } from '@/lib/tracker';
import supabase from '@/lib/supabaseClient';

interface GrowthDataPoint {
  week: string;
  size: string;
  cm: number;
  weight: number;
}

interface Milestone {
  week: number;
  title: string;
  desc: string;
}

const growthData: GrowthDataPoint[] = [
  { week: 'Wk 4', size: 'Poppy', cm: 0.3, weight: 0.04 },
  { week: 'Wk 8', size: 'Raspberry', cm: 1.6, weight: 1.2 },
  { week: 'Wk 12', size: 'Lime', cm: 5.4, weight: 14 },
  { week: 'Wk 16', size: 'Avocado', cm: 11.6, weight: 100 },
  { week: 'Wk 20', size: 'Banana', cm: 16.4, weight: 300 },
  { week: 'Wk 24', size: 'Melon', cm: 21.2, weight: 600 },
  { week: 'Wk 28', size: 'Eggplant', cm: 26, weight: 1000 },
  { week: 'Wk 32', size: 'Squash', cm: 29, weight: 1700 },
  { week: 'Wk 36', size: 'Honeydew', cm: 32, weight: 2600 },
  { week: 'Wk 40', size: 'Watermelon', cm: 35, weight: 3400 },
];

const milestones: Milestone[] = [
  { week: 12, title: 'First Trimester Complete', desc: 'Risk of miscarriage decreases significantly' },
  { week: 20, title: 'Halfway There', desc: 'You may start feeling baby movements' },
  { week: 28, title: 'Third Trimester', desc: 'Baby is practicing breathing movements' },
  { week: 36, title: 'Almost There', desc: 'Baby is considered early term' },
];

const trackerFeatures = [
  {
    icon: TrendingUp,
    title: 'Pregnancy Tracker',
    description: 'Week-by-week progress with baby size visualization',
    color: 'text-sage',
  },
  {
    icon: BarChart3,
    title: 'Baby Growth Charts',
    description: 'Track height, weight, and sleep patterns',
    color: 'text-dusty',
  },
  {
    icon: Activity,
    title: 'Development Milestones',
    description: 'Monitor cognitive and motor skills',
    color: 'text-lavender',
  },
];

// Custom chart component to avoid SSR issues
const GrowthChart = memo(function GrowthChart({ data, currentWeek }: { data: GrowthDataPoint[]; currentWeek:number }) {
  const chartData = data.slice(0, 8);
  const maxCm = Math.max(...chartData.map(d => d.cm));

  // find nearest index to highlight
  const activeIndex = chartData.reduce((bestIdx, p, i) => {
    const wk = parseInt(p.week.replace(/\D/g, ''), 10) || 0;
    const bestWk = parseInt(chartData[bestIdx].week.replace(/\D/g, ''), 10) || 0;
    return Math.abs(wk - currentWeek) < Math.abs(bestWk - currentWeek) ? i : bestIdx;
  }, 0);

  return (
    <div className="h-44 w-full">
      <div className="flex items-end h-36 gap-2">
        {chartData.map((point, index) => {
          const wkNum = parseInt(point.week.replace(/\D/g, ''), 10) || 0;
          const isActive = index === activeIndex;
          return (
            <div key={point.week} className="flex-1 flex flex-col items-center min-w-0">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(point.cm / maxCm) * 100}%`, scale: isActive ? 1.02 : 1 }}
                transition={{ delay: index * 0.03, duration: 0.45 }}
                className={`w-full rounded-t-md min-h-[4px] ${isActive ? 'bg-gradient-to-t from-sage-600 to-sage/60' : 'bg-gradient-to-t from-sage to-sage/50'}`}
              />
              <div className="mt-2 text-[10px] text-muted-foreground">{point.week}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export function GrowthTrackerSection() {
  const [currentWeek, setCurrentWeek] = useState(24);
  const [profile, setProfile] = useState<any | null>(null);
  const [nextAppointment, setNextAppointment] = useState<string | undefined>(undefined);

  useEffect(()=>{
    // load current user's pregnancy profile and upcoming appointment
    (async ()=>{
      try{
        const { data } = await supabase.auth.getSession();
        const user = data?.session?.user;
        if(!user) return;
        const p = await getPregnancyProfile(user.id);
        if(p){
          setProfile(p);
          if(p.due_date){
            const total = 280; // days
            const daysPassed = Math.round((Date.now() - new Date(p.lmp || p.created_at).getTime())/(1000*60*60*24));
            const percent = Math.min(100, Math.max(0, Math.round((daysPassed/total)*100)));
            // rough week
            const wk = Math.min(40, Math.max(1, Math.round(daysPassed/7)));
            setCurrentWeek(wk);
          }
        }
        const appt = await getUpcomingAppointment(user.id);
        if(appt) setNextAppointment(new Date(appt.date).toLocaleDateString());
      }catch(e){}
    })();
  },[]);

  const babySize = profile?.baby_size ?? 'Banana';
  // derive baby size from growthData based on selected week
  const derivedBabySize = useMemo(() => {
    const weekNum = Number(currentWeek);
    // parse available data into numeric weeks
    const mapped = growthData.map(g => ({
      wk: parseInt(g.week.replace(/\D/g, ''), 10) || 0,
      size: g.size,
    }));
    // find the largest wk <= weekNum
    let pick = mapped[0].size;
    for (let i = 0; i < mapped.length; i++) {
      if (weekNum >= mapped[i].wk) pick = mapped[i].size;
      else break;
    }
    return pick;
  }, [currentWeek]);
  const dueDate = profile?.due_date ?? new Date(Date.now() + 1000*60*60*24*120).toISOString();
  const completedPercent = profile?.due_date ? Math.min(100, Math.round((1 - (new Date(dueDate).getTime() - Date.now())/(1000*60*60*24*280))*100)) : 50;

  return (
    <section className="py-12 bg-background/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Baby Development</h2>
              <p className="text-sm text-muted-foreground">Select a week to preview growth and milestones.</p>
            </div>
            <div className="text-sm text-muted-foreground">Selected: Week {currentWeek} — {derivedBabySize}</div>
          </div>

          <div className="overflow-x-auto py-3">
            <div className="flex gap-2 px-1">
              {Array.from({ length: 40 }, (_, i) => i + 1).map((wk) => (
                <button
                  key={wk}
                  onClick={() => setCurrentWeek(wk)}
                  className={`min-w-[44px] px-3 py-1 rounded-md text-sm font-medium ${wk === currentWeek ? 'bg-sage text-white' : 'bg-card text-foreground border'}`}
                >
                  Wk {wk}
                </button>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <SummaryCards week={currentWeek} babySize={babySize} nextAppointment={nextAppointment} waterIntake={2} steps={3200} />
            <div className="lg:col-span-2 grid grid-cols-1 gap-4">
              <ProgressCard week={currentWeek} dueDate={dueDate} completedPercent={completedPercent} />
              <Timeline currentWeek={currentWeek} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <HealthCharts />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SymptomTracker userId={profile?.user_id ?? profile?.id} />
                <KickCounter userId={profile?.user_id ?? profile?.id} />
                <ContractionTimer />
                <Appointments userId={profile?.user_id ?? profile?.id} />
              </div>
            </div>
            <div className="space-y-4">
              <NutritionDashboard />
              <ExerciseSummary />
              <AIInsights week={currentWeek} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <JournalAndPhotos />
            </div>
            <div>
              {/* Placeholder for additional widgets: Growth charts, name wishlist, notifications */}
                <div className="p-4 bg-card rounded-lg border">
                  <div className="text-sm font-medium mb-2">Growth Charts</div>
                  <GrowthChart data={growthData} currentWeek={currentWeek} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
