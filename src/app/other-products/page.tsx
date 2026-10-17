import OtherProductsSidebar from '@/components/OtherProductsSidebar';
import { getOtherProductCategories } from '@/lib/otherProducts';

export const metadata = { title: 'Other Products | Timbermate-HMT Industries Corp.' };

export default function OtherProductsPage() {
  const categories = getOtherProductCategories();

  return (
    <div className="flex flex-col flex-1">
      <OtherProductsSidebar categories={categories} />
    </div>
  );
}
