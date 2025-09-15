export default function MessagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">消息中心</h1>
          <p className="text-white/70">查看你的对话记录</p>
        </div>
        
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold">AI角色 {i}</h3>
                  <p className="text-white/70 text-sm">最近的消息...</p>
                </div>
                <div className="text-white/50 text-xs">2小时前</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


