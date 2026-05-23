import { Waves, Utensils, MapPin, Bus, Map, Sparkles, Compass, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AttractionCard from '../components/AttractionCard';
import FoodCard from '../components/FoodCard';
import attractions from '../data/attractions.json';
import food from '../data/food.json';

export default function Home() {
  const featuredAttractions = attractions.slice(0, 4);
  const featuredFood = food.slice(0, 4);

  const quickLinks = [
    {
      icon: MapPin,
      title: '景点推荐',
      description: '八大关、栈桥、崂山等著名景点',
      color: 'from-blue-500 to-cyan-500',
      link: '/attractions',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Utensils,
      title: '美食攻略',
      description: '海鲜、啤酒、地道小吃',
      color: 'from-orange-500 to-yellow-500',
      link: '/food',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Map,
      title: '行程规划',
      description: '一日游、三日游等精选路线',
      color: 'from-green-500 to-teal-500',
      link: '/itinerary',
      bgColor: 'bg-green-50',
    },
    {
      icon: Bus,
      title: '交通指南',
      description: '机场、地铁、公交、出租车',
      color: 'from-purple-500 to-pink-500',
      link: '/transport',
      bgColor: 'bg-purple-50',
    },
  ];

  const features = [
    {
      icon: Waves,
      title: '海滨风光',
      description: '730公里海岸线，尽享碧海蓝天',
      color: 'bg-blue-500',
    },
    {
      icon: MapPin,
      title: '历史文化',
      description: '德式建筑与现代都市完美融合',
      color: 'bg-red-500',
    },
    {
      icon: Utensils,
      title: '特色美食',
      description: '海鲜大餐与地道小吃应有尽有',
      color: 'bg-orange-500',
    },
    {
      icon: Plane,
      title: '便捷交通',
      description: '海陆空立体交通网络',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              快速导航
            </h2>
            <p className="text-gray-500">一键到达你想去的地方</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((quickLink, index) => (
              <Link
                key={index}
                to={quickLink.link}
                className="group"
              >
                <div className={`${quickLink.bgColor} rounded-xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:scale-105`}>
                  <div className={`w-12 h-12 bg-gradient-to-r ${quickLink.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md`}>
                    <quickLink.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-center mb-1">{quickLink.title}</h3>
                  <p className="text-gray-500 text-xs text-center">{quickLink.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Compass className="w-6 h-6 text-blue-600" />
                热门景点
              </h2>
              <p className="text-gray-500">青岛最受欢迎的旅游胜地</p>
            </div>
            <Link
              to="/attractions"
              className="hidden sm:flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部 <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} onClick={() => {}} />
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link
              to="/attractions"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部景点 <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Utensils className="w-6 h-6 text-orange-600" />
                特色美食
              </h2>
              <p className="text-gray-500">舌尖上的青岛味道</p>
            </div>
            <Link
              to="/food"
              className="hidden sm:flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部 <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFood.map((item) => (
              <FoodCard key={item.id} food={item} />
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link
              to="/food"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部美食 <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                <Compass className="w-8 h-8" />
                计划你的青岛之旅
              </h2>
              <p className="text-blue-100 mb-6">
                无论你是想漫步海滨、探索历史，还是品尝美食，青岛都能满足你的期待。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/itinerary"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <Map className="w-4 h-4" />
                  查看行程推荐
                </Link>
                <Link
                  to="/transport"
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <Bus className="w-4 h-4" />
                  交通指南
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}