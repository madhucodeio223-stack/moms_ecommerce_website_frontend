import Link from 'next/link';

type Props = {
  searchParams?: {
    expertId?: string;
    slot?: string;
  };
};

export default function BookingSuccess({ searchParams }: Props) {
  const expertId = searchParams?.expertId ?? 'unknown';
  const slot = searchParams?.slot ?? 'unspecified time';

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed</h1>
      <p className="mb-2">Your session with expert {expertId} is scheduled for {slot}.</p>
      <p className="text-sm text-muted-foreground">We've sent a confirmation to your account.</p>

      <div className="mt-6">
        <Link href="/consult" className="inline-flex items-center gap-2 bg-sage text-white py-2 px-4 rounded">
          Back to Experts
        </Link>
      </div>
    </div>
  );
}
