import { useFilters } from '../../context/FilterContext';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';

const categories = [
    { value: 'all', labelKey: 'filter_controls.all_categories' },
    { value: 'Chairs', labelKey: 'filter_controls.category_chairs' },
    { value: 'Tables', labelKey: 'filter_controls.category_tables' },
    { value: 'Lamps', labelKey: 'filter_controls.category_lamps' },
]; 

const tags = ["fashion", "men", "jacket", "full sleeve", "women", "coat", "top"];

const Sidebar = () => {
  const { t } = useTranslation();
  const { category, setCategory, searchTerm, setSearchTerm } = useFilters();

  return (
    <div className="space-y-10">
      <div className="p-6 border border-gray-200 rounded-lg">
        <h4 className="mb-5 text-xl font-semibold">{t('sidebar.search')}</h4>
        <form className="relative">
          <input 
            type="text" 
            placeholder={t('sidebar.search_placeholder') || ''}
            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute text-gray-400 -translate-y-1/2 top-1/2 right-3">
            <FiSearch />
          </button>
        </form>
      </div>
      <div className="p-6 border border-gray-200 rounded-lg">
        <h4 className="mb-5 text-xl font-semibold">{t('sidebar.categories')}</h4>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => setCategory(cat.value)}
                className={`flex items-center text-gray-600 hover:text-primary transition-colors
                  ${category === cat.value ? 'font-bold text-primary' : ''}`
                }
              >
                <span className="flex items-center justify-center w-5 h-5 mr-3 border-2 border-gray-300 rounded-sm">
                  {category === cat.value && <span className="w-3 h-3 rounded-sm bg-primary"></span>}
                </span>
                {t(cat.labelKey)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Color Widget */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <h4 className="mb-5 text-xl font-semibold">{t('sidebar.color')}</h4>
        <p className="text-sm text-gray-400">{t('sidebar.color_placeholder')}</p>
      </div>

      {/* Size Widget */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <h4 className="mb-5 text-xl font-semibold">{t('sidebar.size')}</h4>
        <p className="text-sm text-gray-400">{t('sidebar.size_placeholder')}</p>
      </div>
      
      {/* Tag Widget */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <h4 className="mb-5 text-xl font-semibold">{t('sidebar.tag')}</h4>
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
                <button key={tag} className="px-3 py-1 text-sm text-gray-600 transition-colors bg-gray-100 rounded hover:bg-primary hover:text-white">
                    {tag}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;