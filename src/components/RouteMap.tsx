import { useState, useEffect } from 'react';
import { MapPin, Navigation, Play, Pause, RotateCcw, Map as MapIcon } from 'lucide-react';

interface Point {
  name: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  points: Point[];
  title: string;
}

export default function RouteMap({ points, title }: MapProps) {
  const [currentPoint, setCurrentPoint] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentPoint < points.length - 1) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setCurrentPoint(prev => prev + 1);
            return 0;
          }
          return prev + 1.5;
        });
      }, 40);
    } else if (currentPoint >= points.length - 1) {
      setIsPlaying(false);
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentPoint, points.length]);

  const handleReset = () => {
    setCurrentPoint(0);
    setProgress(0);
    setIsPlaying(false);
  };

  const getCenterLatLng = () => {
    const lats = points.map(p => p.latitude);
    const lngs = points.map(p => p.longitude);
    return {
      lat: (Math.min(...lats) + Math.max(...lats)) / 2,
      lng: (Math.min(...lngs) + Math.max(...lngs)) / 2
    };
  };

  const center = getCenterLatLng();

  const getZoom = () => {
    const lats = points.map(p => p.latitude);
    const lngs = points.map(p => p.longitude);
    const latDiff = Math.max(...lats) - Math.min(...lats);
    const lngDiff = Math.max(...lngs) - Math.min(...lngs);
    const maxDiff = Math.max(latDiff, lngDiff);
    
    if (maxDiff < 0.1) return 15;
    if (maxDiff < 0.3) return 13;
    if (maxDiff < 0.5) return 12;
    if (maxDiff < 1) return 11;
    return 10;
  };

  const zoom = getZoom();

  const getMapImageUrl = () => {
    const width = 800;
    const height = 500;
    return `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
  };

  const getStaticMapUrl = () => {
    const width = 800;
    const height = 500;
    
    let markers = '';
    points.forEach((point, index) => {
      const color = index < currentPoint ? 'green' : index === currentPoint ? 'blue' : 'red';
      const size = index === currentPoint ? 'large' : 'medium';
      markers += `&markers=color:${color}|size:${size}|${point.latitude},${point.longitude}`;
    });

    return `https://static-maps.yandex.ru/1.x/?lang=zh-CN&ll=${center.lng},${center.lat}&z=${zoom}&size=${width},${height}&l=map${markers}`;
  };

  const getCurrentPosition = () => {
    if (points.length < 2) return points[0];
    const start = points[currentPoint];
    const end = points[Math.min(currentPoint + 1, points.length - 1)];
    return {
      name: '',
      latitude: start.latitude + (end.latitude - start.latitude) * (progress / 100),
      longitude: start.longitude + (end.longitude - start.longitude) * (progress / 100)
    };
  };

  const currentPos = currentPoint < points.length ? getCurrentPosition() : null;

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100">
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-lg">
              <MapIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full text-white text-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white hover:bg-blue-50 px-4 py-2 rounded-full text-blue-600 text-sm font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? '暂停' : '播放路线'}
            </button>
          </div>
        </div>
      </div>

      <div className="relative" style={{ width: '100%', paddingTop: '62.5%' }}>
        <img
          src={getStaticMapUrl()}
          alt="青岛旅游路线图"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 800 500" className="w-full h-full">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {currentPos && (
              <g>
                <circle cx={400} cy={250} r="20" fill="none" stroke="#06b6d4" strokeWidth="3" opacity="0.6">
                  <animate attributeName="r" from="15" to="35" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={400} cy={250} r="20" fill="none" stroke="#06b6d4" strokeWidth="3" opacity="0.4">
                  <animate attributeName="r" from="15" to="35" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx={400} cy={250} r="12" fill="#06b6d4" filter="url(#glow)">
                  <animate attributeName="r" values="10;14;10" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx={400} cy={250} r="6" fill="#ffffff" />
              </g>
            )}
          </svg>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-5 py-3 shadow-lg border border-blue-100">
          <div className="flex items-center gap-5 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600"></div>
              <span className="text-gray-600 font-medium">已到达</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-600 animate-pulse"></div>
              <span className="text-gray-600 font-medium">当前位置</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-600"></div>
              <span className="text-gray-600 font-medium">待访问</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-blue-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <span className="text-sm text-gray-500">当前位置</span>
              <span className="font-bold text-gray-800 ml-2">{points[currentPoint]?.name || '-'}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <span className="text-sm text-gray-500">进度</span>
              <span className="font-bold text-blue-600 ml-2">{currentPoint + 1} / {points.length}</span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2.5 bg-white rounded-full overflow-hidden border border-blue-100">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transition-all duration-100 relative"
              style={{ width: `${((currentPoint / (points.length - 1)) * 100) + ((progress / 100) * (100 / (points.length - 1)))}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-500">路线途经地点：</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {points.map((point, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                index < currentPoint
                  ? 'bg-green-100 text-green-700'
                  : index === currentPoint
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {index + 1}. {point.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
