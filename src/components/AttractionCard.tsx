import { Star, MapPin, Clock, Ticket } from 'lucide-react';

interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  ticket: string;
  opening_hours: string;
  rating: number;
}

interface AttractionCardProps {
  attraction: Attraction;
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium text-gray-700">{attraction.rating}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {attraction.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{attraction.description}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>{attraction.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{attraction.opening_hours}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Ticket className="w-4 h-4 text-orange-500" />
            <span>{attraction.ticket}</span>
          </div>
        </div>
      </div>
    </div>
  );
}