import OtherProductsSidebar from '@/components/OtherProductsSidebar';
import { getOtherProductCategories } from '@/lib/otherProducts';

export const metadata = { title: 'Electrical Fittings | Timbermate-HMT Industries Corp.' };

export default function ElectricalFittingsPage() {
  const categories = getOtherProductCategories();

  return (
    <div className="flex flex-col flex-1">
      <OtherProductsSidebar categories={categories} initialCategory="electrical-fittings" />
    </div>
  );
}
