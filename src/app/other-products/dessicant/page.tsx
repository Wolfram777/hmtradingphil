import OtherProductsSidebar from '@/components/OtherProductsSidebar';
import { getOtherProductCategories } from '@/lib/otherProducts';

export const metadata = { title: 'Dessicant | Timbermate-HMT Industries Corp.' };

export default function DessicantPage() {
  const categories = getOtherProductCategories();

  return (
    <div className="flex flex-col flex-1">
      <OtherProductsSidebar categories={categories} initialCategory="dessicant" />
    </div>
  );
}
