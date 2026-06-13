import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Activity, Users, MessageSquare, Building, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

const AdminAbout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');

  // Comprehensive state matching the live About page
  const [stats, setStats] = useState({
    est_year: '2018',
    on_time_dispatch: 95,
    order_accuracy: 99,
    repeat_customers: 92,
    avg_response_time: 30,
    rejection_rate: 1.2,
    total_customers: 1000,
    yearly_capacity: 300,
    cities_served: 450,
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchAboutSettings();
  }, []);

  async function fetchAboutSettings() {
    try {
      const { data, error } = await supabase.from('about_settings').select('*').single();
      if (error) throw error;
      
      if (data) {
        setStats({
          est_year: data.est_year || '2018',
          on_time_dispatch: data.on_time_dispatch || 95,
          order_accuracy: data.order_accuracy || 99,
          repeat_customers: data.repeat_customers || 92,
          avg_response_time: data.avg_response_time || 30,
          rejection_rate: data.rejection_rate || 1.2,
          total_customers: data.total_customers || 1000,
          yearly_capacity: data.yearly_capacity || 300,
          cities_served: data.cities_served || 450,
        });
        setTeamMembers(data.team_members || []);
        setTestimonials(data.testimonials || []);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      id: 1,
      ...stats,
      team_members: teamMembers,
      testimonials: testimonials
    };

    const { error } = await supabase.from('about_settings').upsert(payload);
    
    if (error) {
      alert("Error updating settings. Please verify database columns.");
      console.error(error);
    } else {
      alert("About Page updated successfully with 100% accuracy!");
    }
    setSaving(false);
  }

  // Helper functions for array management
  const addTeamMember = () => setTeamMembers([...teamMembers, { id: Date.now().toString(), name: '', role: '' }]);
  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, [field]: value } : m));
  };
  const removeTeamMember = (id: string) => setTeamMembers(teamMembers.filter(m => m.id !== id));

  const addTestimonial = () => setTestimonials([...testimonials, { id: Date.now().toString(), quote: '', author: '', role: '' }]);
  const updateTestimonial = (id: string, field: keyof Testimonial, value: string) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };
  const removeTestimonial = (id: string) => setTestimonials(testimonials.filter(t => t.id !== id));

  if (loading) return <div className="p-10 text-gray-500 font-bold">Loading System Settings...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <Link to="/dfpladmin access" className="text-gray-500 hover:text-amber-600 flex items-center gap-2 font-semibold transition-colors">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-amber-500 text-black px-8 py-2.5 rounded-lg font-black flex items-center gap-2 hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/30"
        >
          <Save size={20} /> {saving ? 'Synchronizing...' : 'Save Configuration'}
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2 text-gray-900 tracking-tight">About Page Configuration</h1>
        <p className="text-gray-500 text-base">Manage the live statistics, team members, and testimonials displayed on the frontend.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'metrics', label: 'Performance Metrics', icon: Activity },
          { id: 'general', label: 'General Info', icon: Building },
          { id: 'team', label: 'Execution Force', icon: Users },
          { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-amber-500 text-black shadow-md' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon size={18} /> {tab.label}
            </button>
          )
        })}
      </div>

      {/* TAB CONTENT: PERFORMANCE METRICS */}
      {activeTab === 'metrics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {[
            { key: 'on_time_dispatch', label: 'On-Time Dispatch (%)', type: 'number' },
            { key: 'order_accuracy', label: 'Order Accuracy (%)', type: 'number' },
            { key: 'repeat_customers', label: 'Repeat Customers (%)', type: 'number' },
            { key: 'avg_response_time', label: 'Avg Response Time (Min)', type: 'number' },
            { key: 'rejection_rate', label: 'Rejection Rate (%)', type: 'number', step: '0.1' },
            { key: 'total_customers', label: 'Total Customers Served', type: 'number' },
            { key: 'yearly_capacity', label: 'Yearly Capacity (Tons)', type: 'number' },
            { key: 'cities_served', label: 'Cities Served', type: 'number' },
          ].map((field) => (
            <div key={field.key} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-amber-500/30 transition-colors">
              <label className="block text-xs font-black uppercase text-gray-400 mb-3">{field.label}</label>
              <input 
                type={field.type} 
                step={field.step || '1'}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-semibold"
                value={stats[field.key as keyof typeof stats]}
                onChange={(e) => setStats({...stats, [field.key]: parseFloat(e.target.value)})}
              />
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: GENERAL INFO */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <label className="block text-xs font-black uppercase text-gray-400 mb-3">Establishment Year</label>
            <input 
              type="text" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all font-semibold"
              value={stats.est_year}
              onChange={(e) => setStats({...stats, est_year: e.target.value})}
            />
          </div>
        </div>
      )}

      {/* TAB CONTENT: TEAM MEMBERS */}
      {activeTab === 'team' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="font-bold text-gray-900">Execution Force List</h3>
              <p className="text-xs text-gray-500">Manage the team members displayed in the grid.</p>
            </div>
            <button onClick={addTeamMember} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800">
              <Plus size={16} /> Add Member
            </button>
          </div>
          
          {teamMembers.map((member) => (
            <div key={member.id} className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <input 
                type="text" placeholder="Full Name" 
                className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg font-semibold"
                value={member.name} onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
              />
              <input 
                type="text" placeholder="Role / Position" 
                className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg font-semibold"
                value={member.role} onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
              />
              <button onClick={() => removeTeamMember(member.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="font-bold text-gray-900">Client Feedback</h3>
              <p className="text-xs text-gray-500">Manage the quotes displayed in the Testimonials section.</p>
            </div>
            <button onClick={addTestimonial} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800">
              <Plus size={16} /> Add Testimonial
            </button>
          </div>

          {testimonials.map((test) => (
            <div key={test.id} className="flex flex-col gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
              <button onClick={() => removeTestimonial(test.id)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
              <textarea 
                placeholder="Client Quote" rows={2}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg font-semibold mt-6"
                value={test.quote} onChange={(e) => updateTestimonial(test.id, 'quote', e.target.value)}
              />
              <div className="flex gap-4">
                <input 
                  type="text" placeholder="Author Name" 
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg font-semibold"
                  value={test.author} onChange={(e) => updateTestimonial(test.id, 'author', e.target.value)}
                />
                <input 
                  type="text" placeholder="Company Role" 
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg font-semibold"
                  value={test.role} onChange={(e) => updateTestimonial(test.id, 'role', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAbout;