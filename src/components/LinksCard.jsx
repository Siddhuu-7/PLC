export default function LinksCard({ title = "Link Title", href = "#" }) {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-gray-800">{title}</h4>
      </div>
      <a
        href={href}
        target="_self"
        rel="noopener noreferrer"
        className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        Open Link
      </a>
    </div>
  );
}