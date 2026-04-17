import { CommunitiesList } from '@/components/farmer/communities/CommunitiesList';

export const metadata = {
  title: 'All Communities - AgriSathi',
  description: 'Explore all farming communities',
};

export default function AllCommunitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Communities</h1>
        <p className="text-muted-foreground">
          Discover and join communities that match your interests
        </p>
      </div>
      <CommunitiesList />
    </div>
  );
}
