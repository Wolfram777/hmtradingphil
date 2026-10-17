import OtherProductsSidebar from '@/components/OtherProductsSidebar';
import { getOtherProductCategories } from '@/lib/otherProducts';

export const metadata = { title: 'Scrapers & Glue Spreader | Timbermate-HMT Industries Corp.' };

export default function ScrapersAndGlueSpreaderPage() {
  const categories = getOtherProductCategories();

  return (
    <div className="flex flex-col flex-1">
      <OtherProductsSidebar
        categories={categories}
        initialCategory="scrapers-and-glue-spreader"
      />
    </div>
  );
}
