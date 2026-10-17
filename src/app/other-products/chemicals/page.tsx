import OtherProductsSidebar from '@/components/OtherProductsSidebar';
import { getOtherProductCategories } from '@/lib/otherProducts';

export const metadata = { title: 'Chemicals | Timbermate-HMT Industries Corp.' };

export default function ChemicalsPage() {
  const categories = getOtherProductCategories();

  return (
    <div className="flex flex-col flex-1">
      <OtherProductsSidebar categories={categories} initialCategory="chemicals" />
    </div>
  );
}
