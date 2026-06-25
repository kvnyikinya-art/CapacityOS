import { Truck, Package, Users, TrendingUp, BarChart3, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">CapacityOS</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition">Marketplace</a>
            <a href="#" className="hover:text-blue-600 transition">For Shippers</a>
            <a href="#" className="hover:text-blue-600 transition">For Transporters</a>
            <a href="#" className="hover:text-blue-600 transition">Recruitment</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">Sign In</button>
            <button className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Get Started</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Eliminate Empty Miles.<br />
            <span className="text-blue-600">Maximize Every Route.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl">
            CapacityOS is the intelligent capacity marketplace that transforms unused truck space into revenue. 
            Transporters sell spare capacity on scheduled routes — shippers book cost-effective partial loads. 
            No more profit leaks.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              List Your Capacity
            </button>
            <button className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition">
              Find Available Loads
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">How CapacityOS Works</h2>
          <p className="mt-4 text-slate-600 text-center max-w-2xl mx-auto">
            A simple three-sided marketplace connecting transport capacity with demand.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-8">
              <Truck className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">Transporters</h3>
              <p className="mt-2 text-slate-600">List your unused truck space on scheduled routes. Set your rate per kg or per m³. Turn empty miles into profit.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Package className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">Shippers</h3>
              <p className="mt-2 text-slate-600">Post partial loads and find economical transport on trucks already headed your way. Save up to 30% on shipping costs.</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <Users className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">Drivers</h3>
              <p className="mt-2 text-slate-600">Find driving employment opportunities through our recruitment module. Featured profiles get priority placement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">16%</div>
            <div className="mt-1 text-sm text-slate-500">Domestic Platform Fee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">17.5%</div>
            <div className="mt-1 text-sm text-slate-500">Cross-Border Fee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <div className="mt-1 text-sm text-slate-500">Bank-to-Bank EFT</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">Manual</div>
            <div className="mt-1 text-sm text-slate-500">Admin Payment Verification</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Platform Features</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
              <BarChart3 className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-slate-900">Smart Matching</h3>
              <p className="mt-2 text-sm text-slate-600">Our engine matches capacity listings with load postings automatically based on route, timing, and cargo type.</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
              <Shield className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-slate-900">Secure Payments</h3>
              <p className="mt-2 text-sm text-slate-600">All transactions processed via bank-to-bank EFT with manual admin verification. No third-party payment gateways.</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
              <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-slate-900">Capacity Analytics</h3>
              <p className="mt-2 text-sm text-slate-600">Track your fleet's capacity utilization rate and see exactly how much revenue you're recovering from unused space.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-slate-700">CapacityOS</span>
          </div>
          <p>&copy; {new Date().getFullYear()} CapacityOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}