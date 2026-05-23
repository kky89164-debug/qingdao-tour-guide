import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Attractions from "@/pages/Attractions";
import Food from "@/pages/Food";
import Itinerary from "@/pages/Itinerary";
import Transport from "@/pages/Transport";

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/food" element={<Food />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/transport" element={<Transport />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}