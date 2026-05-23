import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">青岛旅游攻略</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              带你探索青岛的美丽风光、特色美食和文化魅力，为你的旅行提供全方位的指南。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors text-sm">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/attractions" className="text-blue-100 hover:text-white transition-colors text-sm">
                  景点推荐
                </Link>
              </li>
              <li>
                <Link to="/food" className="text-blue-100 hover:text-white transition-colors text-sm">
                  美食推荐
                </Link>
              </li>
              <li>
                <Link to="/itinerary" className="text-blue-100 hover:text-white transition-colors text-sm">
                  行程规划
                </Link>
              </li>
              <li>
                <Link to="/transport" className="text-blue-100 hover:text-white transition-colors text-sm">
                  交通指南
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-blue-100 text-sm">
                <MapPin className="w-4 h-4" />
                <span>安徽省淮南市</span>
              </li>
              <li className="flex items-center gap-2 text-blue-100 text-sm">
                <Phone className="w-4 h-4" />
                <span>13275548783</span>
              </li>
              <li className="flex items-center gap-2 text-blue-100 text-sm">
                <Mail className="w-4 h-4" />
                <span>3174645047@qq.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-500 mt-8 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; 2024 青岛旅游攻略. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}