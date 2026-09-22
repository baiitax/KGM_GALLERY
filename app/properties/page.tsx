'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, Plus, MapPin, BedDouble, Bath, Maximize2, 
  Film, Sparkles, Search, Filter, Phone, Mail, ArrowUpRight
} from 'lucide-react';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [propertyName, setPropertyName] = useState('');
  const [location, setLocation] = useState('Riyadh, Saudi Arabia');
  const [price, setPrice] = useState('45,000,000');
  const [bedrooms, setBedrooms] = useState(6);
  const [bathrooms, setBathrooms] = useState(7);
  const [size, setSize] = useState('16,500 sq ft');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      if (data.success) {
        setProperties(data.properties);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_name: propertyName,
          location,
          price: parseInt(price.replace(/[^0-9]/g, '')) || 30000000,
          bedrooms,
          bathrooms,
          property_size: size,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setPropertyName('');
        fetchProperties();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  };

  const filtered = properties.filter(p => 
    p.property_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07130E] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A3D2F]/60 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#C5A869] text-xs font-semibold tracking-wider uppercase">Portfolio CRM</span>
              <span className="text-[#1A3D2F]">•</span>
              <span className="text-zinc-400 text-xs">Curated Real Estate Catalog</span>
            </div>
            <h1 className="text-3xl font-serif text-[#F4EBD9]">Property Inventory</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage high-net-worth real estate listings, architectural photographs, and synchronized film projects.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#C5A869] to-[#DFCA95] text-[#0B2B20] px-5 py-2.5 rounded-lg font-medium text-sm hover:brightness-110 transition shadow-lg shadow-[#C5A869]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property Listing</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search property listings by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B2319] border border-[#1A3D2F] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A869]"
          />
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prop) => (
            <div
              key={prop.id}
              className="group bg-[#0B2319] border border-[#1A3D2F] hover:border-[#C5A869]/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#05100B] overflow-hidden">
                <img
                  src={prop.cover_image || '/sample-photos/villa_facade_dusk.jpg'}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-[#C5A869] border border-[#C5A869]/30">
                  {prop.price?.toLocaleString()} {prop.currency || 'SAR'}
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-serif text-lg text-[#F4EBD9] group-hover:text-[#C5A869] transition line-clamp-1">
                    {prop.property_name}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>{prop.location}</span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#1A3D2F]/60 text-center text-xs">
                  <div>
                    <div className="font-semibold text-white">{prop.bedrooms}</div>
                    <div className="text-[10px] text-zinc-400">Beds</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{prop.bathrooms}</div>
                    <div className="text-[10px] text-zinc-400">Baths</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{prop.property_size}</div>
                    <div className="text-[10px] text-zinc-400">Area</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-zinc-400">
                    {prop.project_count || 1} Master Film Project
                  </span>

                  <Link
                    href="/projects"
                    className="flex items-center gap-1 text-xs text-[#C5A869] hover:underline font-medium"
                  >
                    <span>View Film</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B2319] border border-[#C5A869]/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#1A3D2F] pb-3">
                <h3 className="font-serif text-lg text-[#F4EBD9]">New Property Listing</h3>
                <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-white text-sm">✕</button>
              </div>

              <form onSubmit={handleCreateProperty} className="space-y-3">
                <div>
                  <label className="block text-xs text-zinc-300 mb-1">Property Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., The Sapphire Horizon Estate"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(parseInt(e.target.value))}
                      className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(parseInt(e.target.value))}
                      className="w-full bg-[#071710] border border-[#1A3D2F] rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="bg-[#C5A869] text-[#0B2B20] px-4 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110"
                  >
                    {creating ? 'Saving...' : 'Save Property'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
