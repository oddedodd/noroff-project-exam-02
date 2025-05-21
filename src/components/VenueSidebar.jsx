import { CalendarDays } from 'lucide-react';

function VenueSidebar({ amenities }) {
  return (
    <aside className="bg-white p-6 rounded shadow space-y-6 self-start">
      <div>
        <h4 className="font-semibold mb-2">Check availability</h4>
        <div className="border rounded p-4 text-center text-gray-500">
          <CalendarDays className="mx-auto mb-2" />
          <p>[ calendar placeholder ]</p>
        </div>
      </div>
      <button className="w-full bg-[#ef665b] hover:bg-[#e4534a] text-white py-2 font-semibold rounded">
        BOOK NOW
      </button>
      <div>
        <h4 className="font-semibold mb-2">What this place offers</h4>
        <ul className="space-y-2">
          {amenities.map((a, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              {a.icon}
              {a.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default VenueSidebar;