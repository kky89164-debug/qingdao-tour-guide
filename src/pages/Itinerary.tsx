import { useState } from 'react';
import { Calendar, Clock, MapPin, Footprints, Users, Heart, Map, ChevronRight, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ItineraryCard from '../components/ItineraryCard';
import RouteMap from '../components/RouteMap';
import itineraries from '../data/itinerary.json';
import attractions from '../data/attractions.json';
import special from '../data/special.json';

const itineraryTypes = [
  { icon: Footprints, name: '经典一日游', color: 'bg-blue-500', textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
  { icon: Calendar, name: '深度三日游', color: 'bg-green-500', textColor: 'text-green-600', bgColor: 'bg-green-50' },
  { icon: Users, name: '亲子欢乐游', color: 'bg-purple-500', textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
  { icon: Heart, name: '浪漫情侣游', color: 'bg-pink-500', textColor: 'text-pink-600', bgColor: 'bg-pink-50' },
];

const specialTypes = [
  { name: '文化艺术', type: 'culture', color: 'bg-purple-500' },
  { name: '自然风光', type: 'nature', color: 'bg-green-500' },
  { name: '浪漫约会', type: 'romantic', color: 'bg-pink-500' },
  { name: '历史古迹', type: 'historic', color: 'bg-yellow-500' },
  { name: '观景点', type: 'viewpoint', color: 'bg-blue-500' },
];

export default function Itinerary() {
  const [activeType, setActiveType] = useState<string>('all');
  const [selectedRoute, setSelectedRoute] = useState<string>('1');

  const filteredItineraries = activeType === 'all' 
    ? itineraries 
    : itineraries.filter(itinerary => itinerary.title === activeType);

  const getRoutePoints = (itineraryId: string) => {
    const itinerary = itineraries.find(i => i.id === itineraryId);
    if (!itinerary) return [];
    return itinerary.route.map(step => {
      const attraction = attractions.find(a => step.name.includes(a.name));
      return {
        name: step.name,
        latitude: attraction?.latitude || step.latitude || 36.0671,
        longitude: attraction?.longitude || step.longitude || 120.3826
      };
    });
  };

  const currentPoints = getRoutePoints(selectedRoute);
  const selectedItinerary = itineraries.find(i => i.id === selectedRoute);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Map className="w-10 h-10" />
            <h1 className="text-3xl md:text-5xl font-bold">行程规划</h1>
          </div>
          <p className="text-blue-100 max-w-2xl text-lg">
            根据你的时间和需求，为你精心规划最适合的青岛之旅
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveType('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeType === 'all'
                ? 'bg-gray-800 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            全部路线
          </button>
          {itineraryTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => setActiveType(type.name)}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeType === type.name
                  ? `${type.color} text-white shadow-lg`
                  : `bg-white ${type.textColor} hover:${type.bgColor} border border-gray-200`
              }`}
            >
              <type.icon className="w-4 h-4" />
              {type.name}
            </button>
          ))}
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              热门路线概览
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {itineraries.map((itinerary) => (
                <div
                  key={itinerary.id}
                  onClick={() => {
                    setSelectedRoute(itinerary.id);
                    setActiveType(itinerary.title);
                    document.getElementById('route-map')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`bg-white rounded-xl p-5 hover:shadow-md transition-all border cursor-pointer ${
                    selectedRoute === itinerary.id ? 'border-blue-400 shadow-md' : 'border-gray-100'
                  }`}
                >
                  <h3 className="font-bold text-gray-800 mb-2">{itinerary.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{itinerary.duration}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    查看路线图
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="route-map" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Map className="w-6 h-6 text-blue-600" />
            动态路线图
            {selectedItinerary && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                当前: {selectedItinerary.title}
              </span>
            )}
          </h2>
          <RouteMap points={currentPoints} title={selectedItinerary?.title || '请选择路线'} />
        </div>

        <div className="space-y-8 mb-12">
          {filteredItineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            特殊地点推荐
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {special.map((place) => (
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold text-lg">{place.name}</h3>
                    <p className="text-sm text-white/80 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {place.location}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{place.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                      specialTypes.find(t => t.type === place.type)?.color || 'bg-gray-500'
                    }`}>
                      {specialTypes.find(t => t.type === place.type)?.name || place.type}
                    </span>
                    <Link
                      to="/attractions"
                      className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1"
                    >
                      了解更多
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">旅游小贴士</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">提前规划</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                热门景点建议提前在线预约门票，节省排队时间。崂山景区建议安排一整天，太清宫和巨峰不可错过。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">住宿建议</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                建议住在市南区，靠近景点和美食街，出行方便。八大关附近有很多特色民宿，体验更佳。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">最佳季节</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                4-6月和9-10月是最佳旅游季节，避开暑期人流高峰，天气舒适宜人，最适合海滨漫步。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}