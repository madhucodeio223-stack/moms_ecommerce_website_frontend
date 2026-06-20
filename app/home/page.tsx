import { redirect } from 'next/navigation';

export default function HomeRedirect() {
  // keep /home available for older links by redirecting to root
  redirect('/');
}
