import { useState } from 'react';
import { Search, Star, MapPin, Clock, Ticket } from 'lucide-react';
import AttractionCard from '../components/AttractionCard';
import attractions from '../data/attractions.json';

export default function Attractions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredAttractions = attractions.filter((attraction) => {
    const matchesSearch =
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.location.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (filterType === 'free') {
      matchesFilter = attraction.ticket === '免费';
    } else if (filterType === 'paid') {
      matchesFilter = attraction.ticket !== '免费';
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">景点推荐</h1>
          <p className="text-blue-100 max-w-2xl">
            探索青岛最美丽的景点，从百年栈桥到山海相连的崂山，每一处都值得细细品味
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索景点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilterType('free')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterType === 'free'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              免费
            </button>
            <button
              onClick={() => setFilterType('paid')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterType === 'paid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              收费
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAttractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>

        {filteredAttractions.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">未找到匹配的景点</h3>
            <p className="text-gray-400">尝试更换搜索关键词或筛选条件</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">旅游小贴士</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">最佳旅游时间</h3>
              <p className="text-gray-500 text-sm">
                4-10月是最佳旅游季节，气候宜人，风景优美。夏季可游泳，秋季可赏红叶。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">错峰出行</h3>
              <p className="text-gray-500 text-sm">
                节假日景点人流量大，建议提前预约门票，或选择工作日出行体验更佳。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">必游路线</h3>
              <p className="text-gray-500 text-sm">
                栈桥→八大关→五四广场→奥帆中心是经典一日游路线，可步行或骑行串联。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}