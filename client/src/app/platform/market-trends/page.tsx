"use client";

import { useEffect, useState } from "react";
import PricePerM2ByAlcaldiaChart from "@/components/platform/dashboard/PricePerM2ByAlcaldiaChart";
import { SimpleStatCard } from "@/components/platform/dashboard/StatCard";
import { LandPlot, House, Building } from "lucide-react";
import MexicoCityMap from "@/components/platform/dashboard/mexico-city-map/MexicoCityMap";
import { getNumApartments } from "./hooks/getNumApartments";
import { getNumHouses } from "./hooks/getNumHouses";

const tabs = [
  { name: "Precios de Casas por Alcaldia por m2" },
  { name: "Precios de Departamentos por Alcaldia por m2" },
  { name: "Mercado Inmobiliario en Ciudad de México" },
];

export default function MarketTrends() {
  const [activeTab, setActiveTab] = useState(
    "Precios de Casas por Alcaldia por m2"
  );
  const [numApartments, setNumApartments] = useState(0);
  const [numHouses, setNumHouses] = useState(0);

  useEffect(() => {
    getNumApartments().then((data) => {
      const value = data.num_apartments ?? data;
      setNumApartments(value);
    });
    getNumHouses().then((data) => {
      const value = data.num_houses ?? data;
      setNumHouses(value);
    });
  }, []);
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Tendencias del Mercado
          </h1>
          <div className="flex items-center gap-4"></div>
        </div>
        <p className="text-gray-600">
          Análisis del mercado inmobiliario mexicano actualizado al día de hoy
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SimpleStatCard
          title="Número de Casas"
          value={(numHouses ?? 0).toString()}
          Icon={House}
        />
        <SimpleStatCard
          title="Número de Departamentos"
          value={(numApartments ?? 0).toString()}
          Icon={Building}
        />
        <SimpleStatCard
          title="Número de Propiedades"
          value={((numHouses ?? 0) + (numApartments ?? 0)).toString()}
          Icon={LandPlot}
        />
      </section>

      {/* Tabs */}
      <section className="mb-8">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`py-3 px-6 text-sm font-medium focus:outline-none
                ${
                  activeTab === tab.name
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </section>

      {/* Regional Analysis Section */}
      {activeTab === "Precios de Casas por Alcaldia por m2" && (
        <PricePerM2ByAlcaldiaChart tipo="Casa" />
      )}
      {activeTab === "Precios de Departamentos por Alcaldia por m2" && (
        <PricePerM2ByAlcaldiaChart tipo="Departamento" />
      )}
      {activeTab === "Mercado Inmobiliario en Ciudad de México" && (
        <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Mapa Interactivo de Ciudad de México
          </h2>
          <p className="text-sm text-gray-500">
            Exploración detallada de precios y tendencias inmobiliarias
            segmentado por alcaldías.
          </p>
          <MexicoCityMap />
        </div>
      )}
    </div>
  );
}
