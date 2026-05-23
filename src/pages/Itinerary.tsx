import { Calendar, Clock, MapPin, Footprints, Users, Heart } from 'lucide-react';
import ItineraryCard from '../components/ItineraryCard';
import itineraries from '../data/itinerary.json';

const itineraryTypes = [
  { icon: Footprints, name: '经典一日游', color: 'bg-blue-500' },
  { icon: Calendar, name: '深度三日游', color: 'bg-green-500' },
  { icon: Users, name: '亲子欢乐游', color: 'bg-purple-500' },
  { icon: Heart, name: '浪漫情侣游', color: 'bg-pink-500' },
];

export default function Itinerary() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">行程规划</h1>
          <p className="text-green-100 max-w-2xl">
            根据你的时间和需求，为你精心规划最适合的青岛之旅
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {itineraryTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">{type.name}</h3>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          {itineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">旅游小贴士</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">提前规划</h3>
              <p className="text-gray-500 text-sm">
                热门景点建议提前在线预约门票，节省排队时间。崂山景区建议安排一整天。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">住宿建议</h3>
              <p className="text-gray-500 text-sm">
                建议住在市南区，靠近景点和美食街，出行方便。八大关附近有很多特色民宿。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">最佳季节</h3>
              <p className="text-gray-500 text-sm">
                4-6月和9-10月是最佳旅游季节，避开暑期人流高峰，天气舒适宜人。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}