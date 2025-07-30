export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      {/* الحاوية الرئيسية */}
      <div className="relative w-20 h-20">
        {/* الدف الكبير */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>

        {/* الدف الصغير */}
        <div className="absolute top-4 left-4 w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
}
