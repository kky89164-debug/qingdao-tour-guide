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

// 将经纬度转换为SVG坐标（简化的墨卡托投影）
const latLngToXY = (lat: number, lng: number, width: number, height: number) => {
  // 青岛及周边区域的经纬度范围
  const minLat = 35.9;
  const maxLat = 36.3;
  const minLng = 120.0;
  const maxLng = 120.8;

  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const y = ((maxLat - lat) / (maxLat - minLat)) * height;
  return { x, y };
};

export default function RouteMap({ points, title }: MapProps) {
  const [currentPoint, setCurrentPoint] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mapSize, setMapSize] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth - 48, 1000);
      const height = Math.max(Math.min(width * 0.625, 500), 300);
      setMapSize({ width, height });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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

  const { width, height } = mapSize;

  const pathPoints = points.map(p => latLngToXY(p.latitude, p.longitude, width, height));

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

      <div className="relative" style={{ width: '100%', paddingTop: `${(height / width) * 100}%` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-50 overflow-hidden">
          {/* 地图背景 */}
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* 陆地/岛屿 */}
              <ellipse cx="200" cy="150" rx="150" ry="100" fill="#d1fae5" opacity="0.5"/>
              <ellipse cx="600" cy="350" rx="180" ry="120" fill="#d1fae5" opacity="0.4"/>
              <ellipse cx="400" cy="250" rx="100" ry="60" fill="#a7f3d0" opacity="0.3"/>
              <ellipse cx="150" cy="400" rx="120" ry="80" fill="#d1fae5" opacity="0.4"/>
              
              {/* 海岸线/山脉 */}
              <path d="M0,200 Q100,180 200,200 T400,180 T600,200 T800,180" fill="none" stroke="#065f46" strokeWidth="2" opacity="0.2"/>
              <path d="M0,300 Q150,280 300,300 T600,280 T800,300" fill="none" stroke="#059669" strokeWidth="1.5" opacity="0.15"/>
            </svg>
          </div>

          {/* 网格线 */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              {Array.from({ length: 10 }).map((_, i) => (
                <g key={i}>
                  <line x1={i * (width / 9)} y1="0" x2={i * (width / 9)} y2={height} stroke="#3b82f6" strokeWidth="0.5" />
                  <line x1="0" y1={i * (height / 9)} x2={width} y2={i * (height / 9)} stroke="#3b82f6" strokeWidth="0.5" />
                </g>
              ))}
            </svg>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <defs>
              {/* 渐变路径 */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              
              {/* 发光效果 */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* 动画虚线 */}
              <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#bfdbfe" />
              </linearGradient>
            </defs>

            {/* 背景路径（未完成部分） */}
            {pathPoints.length > 1 && (
              <path
                d={getPathD()}
                fill="none"
                stroke="url(#dashGradient)"
                strokeWidth="6"
                strokeDasharray="12 8"
                strokeLinecap="round"
                opacity="0.4"
              />
            )}

            {/* 已完成路径 */}
            {currentPoint > 0 && (
              <path
                d={pathPoints.slice(0, currentPoint + 1).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
            )}

            {/* 当前正在绘制的线段 */}
            {currentPoint < points.length - 1 && currentPos && (
              <line
                x1={pathPoints[currentPoint].x}
                y1={pathPoints[currentPoint].y}
                x2={currentPos.x}
                y2={currentPos.y}
                stroke="#06b6d4"
                strokeWidth="8"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            )}

            {/* 路径点 */}
            {pathPoints.map((point, index) => (
              <g key={index}>
                {/* 外圈 */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={index === currentPoint ? 16 : index < currentPoint ? 14 : 12}
                  fill={index < currentPoint ? '#10b981' : index === currentPoint ? '#3b82f6' : '#ffffff'}
                  stroke={index < currentPoint ? '#059669' : index === currentPoint ? '#2563eb' : '#93c5fd'}
                  strokeWidth="3"
                  filter={index === currentPoint ? 'url(#glow)' : ''}
                />
                {/* 内圈 */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={index === currentPoint ? 8 : index < currentPoint ? 7 : 6}
                  fill={index < currentPoint ? '#34d399' : index === currentPoint ? '#60a5fa' : '#dbeafe'}
                />
                {/* 序号 */}
                <text
                  x={point.x}
                  y={point.y + 4}
                  textAnchor="middle"
                  fontSize={index === currentPoint ? 12 : 11}
                  fontWeight="bold"
                  fill={index < currentPoint ? '#ffffff' : index === currentPoint ? '#ffffff' : '#3b82f6'}
                >
                  {index + 1}
                </text>
                {/* 标签 */}
                <g transform={`translate(${point.x}, ${point.y - (index % 2 === 0 ? 40 : -30)})`}>
                  <rect
                    x="-80"
                    y="-15"
                    width="160"
                    height="28"
                    rx="6"
                    fill="white"
                    stroke={index === currentPoint ? '#3b82f6' : '#e5e7eb'}
                    strokeWidth="1.5"
                    filter="url(#glow)"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="600"
                    fill="#374151"
                  >
                    {points[index].name}
                  </text>
                </g>
              </g>
            ))}

            {/* 当前位置标记 */}
            {currentPos && (
              <g>
                {/* 扩散波纹 */}
                <circle
                  cx={currentPos.x}
                  cy={currentPos.y}
                  r="12"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  opacity="0.6"
                >
                  <animate attributeName="r" from="12" to="28" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle
                  cx={currentPos.x}
                  cy={currentPos.y}
                  r="12"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  opacity="0.4"
                >
                  <animate attributeName="r" from="12" to="28" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                
                {/* 中心标记 */}
                <circle cx={currentPos.x} cy={currentPos.y} r="10" fill="#06b6d4" filter="url(#glow)">
                  <animate attributeName="r" values="10;12;10" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx={currentPos.x} cy={currentPos.y} r="5" fill="#ffffff" />
                
                {/* 方向指示器 */}
                {currentPoint < points.length - 1 && (
                  <g>
                    {(() => {
                      const next = pathPoints[currentPoint + 1];
                      const angle = Math.atan2(next.y - currentPos.y, next.x - currentPos.x) * 180 / Math.PI;
                      return (
                        <g transform={`translate(${currentPos.x + Math.cos(angle * Math.PI / 180) * 18}, ${currentPos.y + Math.sin(angle * Math.PI / 180) * 18}) rotate(${angle})`}>
                          <polygon points="8,0 -4,-5 -4,5" fill="#06b6d4" />
                        </g>
                      );
                    })()}
                  </g>
                )}
              </g>
            )}
          </svg>

          {/* 图例 */}
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
                <div className="w-4 h-4 rounded-full bg-gray-100 border-2 border-blue-300"></div>
                <span className="text-gray-600 font-medium">待访问</span>
              </div>
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
    </div>
  );
}
