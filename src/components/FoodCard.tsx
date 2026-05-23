import { DollarSign, MapPin, Utensils } from 'lucide-react';

interface Food {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
  location?: string;
}

interface FoodCardProps {
  food: Food;
}

export default function FoodCard({ food }: FoodCardProps) {
  const categoryColors: Record<string, string> = {
    海鲜: 'bg-blue-100 text-blue-700',
    饮品: 'bg-green-100 text-green-700',
    小吃: 'bg-orange-100 text-orange-700',
    主食: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[food.category] || 'bg-gray-100 text-gray-700'}`}>
            {food.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {food.name}
          </h3>
          <Utensils className="w-5 h-5 text-orange-500" />
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{food.description}</p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
            <DollarSign className="w-3.5 h-3.5 text-green-500" />
            <span className="text-xs text-gray-600">{food.price}</span>
          </div>
          {food.location && (
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs text-gray-600">{food.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}