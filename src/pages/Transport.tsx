import { useState } from 'react';
import { Plane, Train, Bus, Ship, Car, Clock, DollarSign } from 'lucide-react';
import transport from '../data/transport.json';

const transportIcons: Record<string, typeof Plane> = {
  机场: Plane,
  地铁: Train,
  公交: Bus,
  出租车: Car,
  网约车: Car,
  轮渡: Ship,
  观光: Bus,
};

const transportColors: Record<string, string> = {
  机场: 'bg-blue-100 text-blue-600',
  地铁: 'bg-red-100 text-red-600',
  公交: 'bg-green-100 text-green-600',
  出租车: 'bg-yellow-100 text-yellow-600',
  网约车: 'bg-purple-100 text-purple-600',
  轮渡: 'bg-cyan-100 text-cyan-600',
  观光: 'bg-orange-100 text-orange-600',
};

export default function Transport() {
  const [selectedType, setSelectedType] = useState('all');

  const types = ['all', '机场', '地铁', '公交', '出租车', '网约车', '轮渡', '观光'];

  const filteredTransport =
    selectedType === 'all'
      ? transport
      : transport.filter((item) => item.type === selectedType);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">交通指南</h1>
          <p className="text-indigo-100 max-w-2xl">
            青岛交通便利，多种交通方式任你选择，轻松畅游全城
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedType === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? '全部' : type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTransport.map((item) => {
            const Icon = transportIcons[item.type] || Bus;
            const colorClass = transportColors[item.type] || 'bg-gray-100 text-gray-600';

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className={`w-14 h-14 ${colorClass} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>运营时间: {item.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>费用: {item.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">出行小贴士</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Train className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">地铁出行</h3>
              <p className="text-gray-500 text-sm">
                青岛地铁覆盖主要景点，下载"青岛地铁"APP可扫码乘车，方便快捷。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Plane className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">机场交通</h3>
              <p className="text-gray-500 text-sm">
                胶东机场可乘坐地铁8号线或机场大巴到达市区，车程约1小时。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Bus className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">双层巴士</h3>
              <p className="text-gray-500 text-sm">
                观光巴士覆盖主要景点，24小时票可随上随下，适合初次游览的游客。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}