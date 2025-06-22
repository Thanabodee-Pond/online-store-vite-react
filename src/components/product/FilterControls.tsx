// src/components/product/FilterControls.tsx

import { useTranslation } from 'react-i18next';
import { useFilters } from '../../context/FilterContext';
import { FiChevronDown } from 'react-icons/fi'; // 1. Import ไอคอนลูกศร

const categories = [
    { value: 'all', labelKey: 'filter_controls.all_categories' },
    { value: 'Chairs', labelKey: 'filter_controls.category_chairs' },
    { value: 'Tables', labelKey: 'filter_controls.category_tables' },
    { value: 'Lamps', labelKey: 'filter_controls.category_lamps' },
]; 

const FilterControls = () => {
  const { t } = useTranslation();
  const { category, setCategory, sortBy, setSortBy } = useFilters();

  return (
    <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
      <div className="flex flex-wrap items-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-3 py-1 text-base font-semibold transition-colors ${
              category === cat.value 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-dark'
            }`}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* --- ส่วนของ Sort ที่แก้ไขแล้ว --- */}
      <div className="flex items-center gap-2">
        <span className="text-gray-600">{t('filter_controls.sort_by')}</span>
        {/* 2. ครอบ select และ icon ด้วย div ที่เป็น relative */}
        <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              // 3. เพิ่ม padding-right เพื่อเว้นที่ให้ลูกศร และเปลี่ยนเป็นขอบสี่เหลี่ยม
              className="py-2 pl-4 pr-10 bg-transparent border-2 border-gray-300 rounded-md appearance-none focus:outline-none focus:border-primary"
            >
              <option value="default">{t('filter_controls.default_sort')}</option>
              <option value="price-asc">{t('filter_controls.price_asc')}</option>
              <option value="price-desc">{t('filter_controls.price_desc')}</option>
            </select>
            {/* 4. เพิ่มไอคอนลูกศร */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FiChevronDown className="text-gray-400" />
            </div>
        </div>
      </div>
      {/* --- จบส่วนที่แก้ไข --- */}

    </div>
  );
};

export default FilterControls;