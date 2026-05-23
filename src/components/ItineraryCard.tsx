import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';

interface ItineraryStep {
  time: string;
  place: string;
  activity: string;
}

interface Itinerary {
  id: string;
  title: string;
  duration: string;
  description: string;
  steps: ItineraryStep[];
}

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{itinerary.title}</h3>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
            <Calendar className="w-4 h-4 inline mr-1" />
            {itinerary.duration}
          </span>
        </div>
        <p className="text-blue-100 text-sm">{itinerary.description}</p>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {itinerary.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                </div>
                {index < itinerary.steps.length - 1 && (
                  <div className="w-0.5 h-full bg-blue-200 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{step.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-600">{step.place}</span>
                </div>
                <p className="text-gray-500 text-sm flex items-start gap-1">
                  <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {step.activity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}