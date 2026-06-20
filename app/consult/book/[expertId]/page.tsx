import Link from 'next/link';

type Props = {
  params: {
    expertId: string;
  };
};

export default function ExpertBookingPage({ params }: Props) {
  const { expertId } = params;
  const slots = ['2026-06-21 10:00 AM', '2026-06-22 02:00 PM', '2026-06-23 06:00 PM'];

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-2xl font-bold mb-4">Book Session</h1>
      <p className="text-muted-foreground mb-6">Booking with expert ID: {expertId}</p>

      <div className="grid gap-3">
        {slots.map((slot) => (
          <Link
            key={slot}
            href={`/consult/book/success?expertId=${expertId}&slot=${encodeURIComponent(slot)}`}
            className="block py-3 px-4 bg-card rounded-lg border border-border hover:shadow-soft transition"
          >
            Confirm {slot}
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/consult" className="text-sage">
          Back to Experts
        </Link>
      </div>
    </div>
  );
}
