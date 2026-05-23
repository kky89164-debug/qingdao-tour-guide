import { useState } from 'react';
import { Search, Utensils, DollarSign, MapPin, Beer } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import food from '../data/food.json';

export default function Food() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', '海鲜', '饮品', '小吃', '主食'];

  const filteredFood = food.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">特色美食</h1>
          <p className="text-orange-100 max-w-2xl">
            从新鲜海鲜到地道小吃，青岛的美食文化令人回味无穷
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索美食..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFood.map((item) => (
            <FoodCard key={item.id} food={item} />
          ))}
        </div>

        {filteredFood.length === 0 && (
          <div className="text-center py-16">
            <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">未找到匹配的美食</h3>
            <p className="text-gray-400">尝试更换搜索关键词或筛选条件</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">美食推荐路线</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800">中山路美食街</h3>
              </div>
              <p className="text-gray-500 text-sm">老字号餐馆聚集地，品尝传统青岛美食</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-800">台东步行街</h3>
              </div>
              <p className="text-gray-500 text-sm">小吃夜市聚集地，各种特色小吃应有尽有</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800">啤酒街</h3>
              </div>
              <p className="text-gray-500 text-sm">啤酒博物馆附近，体验啤酒文化</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold text-gray-800">云霄路美食街</h3>
              </div>
              <p className="text-gray-500 text-sm">海鲜大排档集中地，新鲜实惠</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}