import OtherProductsSidebar from '@/components/OtherProductsSidebar';
import { getOtherProductCategories } from '@/lib/otherProducts';

export const metadata = { title: 'Adhesives | Timbermate-HMT Industries Corp.' };

export default function AdhesivesPage() {
  const categories = getOtherProductCategories();

  return (
    <div className="flex flex-col flex-1">
      <OtherProductsSidebar categories={categories} initialCategory="adhesives" />
    </div>
  );
}
