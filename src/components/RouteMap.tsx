import { useState, useEffect } from 'react';
import { MapPin, Navigation, Play, Pause, RotateCcw } from 'lucide-react';

interface Point {
  name: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  points: Point[];
  title: string;
}

const mapWidth = 800;
const mapHeight = 500;
const minLat = 35.95;
const maxLat = 36.2;
const minLng = 120.15;
const maxLng = 120.7;

function latLngToXY(lat: number, lng: number) {
  const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
  const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
  return { x, y };
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
          return prev + 2;
        });
      }, 50);
    } else if (currentPoint >= points.length - 1) {
      setIsPlaying(false);
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentPoint, points.length]);

  const pathPoints = points.map(p => latLngToXY(p.latitude, p.longitude));

  const getPathD = () => {
    if (pathPoints.length < 2) return '';
    return pathPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  const getCurrentPosition = () => {
    if (points.length < 2) return pathPoints[0];
    const start = pathPoints[currentPoint];
    const end = pathPoints[Math.min(currentPoint + 1, pathPoints.length - 1)];
    return {
      x: start.x + (end.x - start.x) * (progress / 100),
      y: start.y + (end.y - start.y) * (progress / 100)
    };
  };

  const currentPos = currentPoint < points.length ? getCurrentPosition() : null;

  const handleReset = () => {
    setCurrentPoint(0);
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Navigation className="w-5 h-5" />
            <h3 className="font-bold">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-white text-sm flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white hover:bg-blue-50 px-4 py-1 rounded-full text-blue-600 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? '暂停' : '播放'}
            </button>
          </div>
        </div>
      </div>

      <div className="relative" style={{ width: '100%', paddingTop: '62.5%' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
          <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} className="w-full h-full">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width={mapWidth} height={mapHeight} fill="url(#routeGradient)" opacity="0.1" />
            
            <path
              d={getPathD()}
              fill="none"
              stroke="#dbeafe"
              strokeWidth="4"
              strokeDasharray="8 4"
            />
            
            {currentPoint > 0 && (
              <path
                d={pathPoints.slice(0, currentPoint + 1).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                filter="url(#glow)"
              />
            )}
            
            {currentPoint < points.length - 1 && currentPos && (
              <line
                x1={pathPoints[currentPoint].x}
                y1={pathPoints[currentPoint].y}
                x2={currentPos.x}
                y2={currentPos.y}
                stroke="#06b6d4"
                strokeWidth="3"
                filter="url(#glow)"
              />
            )}

            {pathPoints.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={index === currentPoint ? 12 : 10}
                  fill={index < currentPoint ? '#22c55e' : index === currentPoint ? '#3b82f6' : '#ffffff'}
                  stroke={index < currentPoint ? '#16a34a' : index === currentPoint ? '#2563eb' : '#94a3b8'}
                  strokeWidth={2}
                  filter={index === currentPoint ? 'url(#glow)' : ''}
                />
                <text
                  x={point.x}
                  y={point.y - 20}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="500"
                  fill="#374151"
                >
                  {points[index].name}
                </text>
                <text
                  x={point.x}
                  y={point.y + 25}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {index + 1}
                </text>
              </g>
            ))}

            {currentPos && (
              <g>
                <circle
                  cx={currentPos.x}
                  cy={currentPos.y}
                  r={8}
                  fill="#06b6d4"
                  filter="url(#glow)"
                >
                  <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle
                  cx={currentPos.x}
                  cy={currentPos.y}
                  r={4}
                  fill="#ffffff"
                />
              </g>
            )}
          </svg>

          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-600">已到达</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-gray-600">当前位置</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-gray-600">待访问</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">
              当前位置: <span className="font-medium text-gray-800">{points[currentPoint]?.name || '-'}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              进度: <span className="font-medium text-blue-600">{currentPoint + 1} / {points.length}</span>
            </span>
          </div>
        </div>
        <div className="mt-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-100"
              style={{ width: `${((currentPoint / (points.length - 1)) * 100) + ((progress / 100) * (100 / (points.length - 1)))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}