export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">探索发现</h1>
          <p className="text-white/70">发现更多有趣的AI角色</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="w-full h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-3" />
              <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">AI角色 {i}</h3>
              <p className="text-white/70 text-xs sm:text-sm">智能对话伙伴</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


