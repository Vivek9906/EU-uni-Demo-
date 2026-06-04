import { Metadata } from 'next';
import SubscribersClient from './SubscribersClient';

export const metadata: Metadata = {
  title: 'Subscribers | Admin Dashboard',
  description: 'Manage newsletter subscribers and send broadcasts.',
};

export default function SubscribersPage() {
  return <SubscribersClient />;
}
