import { X, Star, MapPin, Clock, Ticket, Camera, Info } from 'lucide-react';

interface Activity {
  name: string;
  desc: string;
}

interface AttractionDetail {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  ticket: string;
  opening_hours: string;
  rating: number;
  details?: {
    overview: string;
    activities: Activity[];
    images: string[];
    tips: string;
  };
}

interface DetailModalProps {
  attraction: AttractionDetail;
  onClose: () => void;
}

export default function DetailModal({ attraction, onClose }: DetailModalProps) {
  const details = attraction.details || {
    overview: attraction.description,
    activities: [],
    images: [],
    tips: ''
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <div className="relative h-64 md:h-80">
            <img
              src={attraction.image}
              alt={attraction.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{attraction.name}</h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {attraction.rating}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {attraction.location}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <Ticket className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-sm text-gray-500">门票</div>
                <div className="font-bold text-blue-600">{attraction.ticket}</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-sm text-gray-500">开放时间</div>
                <div className="font-bold text-green-600">{attraction.opening_hours}</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm text-gray-500">评分</div>
                <div className="font-bold text-yellow-600">{attraction.rating}</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                景点介绍
              </h3>
              <p className="text-gray-600 leading-relaxed">{details.overview}</p>
            </div>

            {details.activities && details.activities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">游玩项目</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {details.activities.map((activity, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors">
                      <h4 className="font-semibold text-gray-800 mb-1">{activity.name}</h4>
                      <p className="text-sm text-gray-500">{activity.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {details.images && details.images.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-500" />
                  更多图片
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {details.images.map((img, index) => (
                    <div key={index} className="rounded-xl overflow-hidden">
                      <img
                        src={img}
                        alt={`${attraction.name} ${index + 1}`}
                        className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {details.tips && (
              <div className="bg-orange-50 rounded-xl p-4">
                <h3 className="font-semibold text-orange-800 mb-2">游玩小贴士</h3>
                <p className="text-orange-700 text-sm">{details.tips}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}