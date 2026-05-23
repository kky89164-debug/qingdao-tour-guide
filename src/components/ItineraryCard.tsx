import { Calendar, Clock, MapPin, ChevronRight, ArrowRight, Route } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ItineraryStep {
  time: string;
  place: string;
  activity: string;
  description?: string;
  link?: string;
}

interface Itinerary {
  id: string;
  title: string;
  duration: string;
  description: string;
  icon?: string;
  color?: string;
  steps: ItineraryStep[];
}

interface ItineraryCardProps {
  itinerary: Itinerary;
}

const colorClasses = {
  blue: {
    bg: 'bg-gradient-to-r from-blue-500 to-blue-700',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    dot: 'bg-blue-500',
    line: 'bg-blue-200'
  },
  green: {
    bg: 'bg-gradient-to-r from-green-500 to-teal-600',
    light: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    dot: 'bg-green-500',
    line: 'bg-green-200'
  },
  purple: {
    bg: 'bg-gradient-to-r from-purple-500 to-purple-700',
    light: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    dot: 'bg-purple-500',
    line: 'bg-purple-200'
  },
  pink: {
    bg: 'bg-gradient-to-r from-pink-500 to-rose-600',
    light: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-600',
    dot: 'bg-pink-500',
    line: 'bg-pink-200'
  }
};

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  const colors = colorClasses[itinerary.color as keyof typeof colorClasses] || colorClasses.blue;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className={`${colors.bg} px-6 py-5`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{itinerary.title}</h3>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {itinerary.duration}
          </span>
        </div>
        <p className="text-white/90 text-sm">{itinerary.description}</p>
      </div>
      
      <div className="p-6">
        <div className="relative">
          {itinerary.steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`flex gap-4 ${index < itinerary.steps.length - 1 ? 'pb-8' : ''}`}>
                <div className="flex flex-col items-center z-10">
                  <div className={`w-10 h-10 rounded-full ${colors.dot} flex items-center justify-center shadow-md`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  {index < itinerary.steps.length - 1 && (
                    <div className={`w-0.5 flex-1 ${colors.line} mt-3`} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className={`${colors.light} rounded-xl p-4 border ${colors.border} hover:shadow-md transition-all`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-700">{step.time}</span>
                      </div>
                      {step.link && (
                        <Link 
                          to={step.link}
                          className={`flex items-center gap-1 text-xs font-medium ${colors.text} hover:opacity-80 transition-opacity`}
                        >
                          查看详情
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className={`w-4 h-4 ${colors.text}`} />
                      <span className="font-bold text-gray-800">{step.place}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{step.activity}</p>
                    
                    {step.description && (
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {index < itinerary.steps.length - 1 && (
                <div className="absolute left-5 top-12 flex items-center justify-center w-5 h-5">
                  <div className={`${colors.line} rounded-full p-0.5`}>
                    <ChevronRight className={`w-3 h-3 ${colors.text}`} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={`mt-6 flex items-center justify-center gap-2 ${colors.light} rounded-lg py-3 border ${colors.border}`}>
          <Route className={`w-4 h-4 ${colors.text}`} />
          <span className={`text-sm font-medium ${colors.text}`}>
            路线总步数：{itinerary.steps.length}站
          </span>
        </div>
      </div>
    </div>
  );
}