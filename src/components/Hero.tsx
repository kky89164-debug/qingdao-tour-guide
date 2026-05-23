import { ChevronDown, Sun, Waves } from 'lucide-react';

export default function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20Qingdao%20coastal%20cityscape%20with%20blue%20sky%20and%20ocean%20panoramic%20view&image_size=landscape_16_9)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-800/40 to-blue-700/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-medium">魅力海滨城市</span>
            <Waves className="w-8 h-8 text-yellow-400" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span className="block">青岛</span>
            <span className="block text-yellow-400">红瓦绿树，碧海蓝天</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            一座充满欧陆风情的海滨城市，以其美丽的海岸线、德式建筑和啤酒文化闻名于世
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sun className="w-4 h-4 text-yellow-300" />
              <span className="text-sm">年均气温 12°C</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Waves className="w-4 h-4 text-blue-300" />
              <span className="text-sm">海岸线 730公里</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}