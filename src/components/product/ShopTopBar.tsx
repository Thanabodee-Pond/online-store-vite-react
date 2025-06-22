import { useFilters } from '../../context/FilterContext';

const ShopTopBar = () => {
    const { sortBy, setSortBy } = useFilters();

    return (
        <div className="flex items-center justify-end mb-6">
            <div className="flex items-center gap-4">
                <span className="text-gray-600">Sort by:</span>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>
        </div>
    );
}

export default ShopTopBar;