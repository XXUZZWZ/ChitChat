export default function PublishPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-blue-900/20 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">发布创作</h1>
          <p className="text-white/70">创建你的AI角色</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
          <div className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">角色名称</label>
              <input 
                type="text" 
                placeholder="给你的AI角色起个名字"
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="text-white text-sm font-medium mb-2 block">角色描述</label>
              <textarea 
                placeholder="描述你的AI角色的特点..."
                rows={3}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="text-white text-sm font-medium mb-2 block">上传头像</label>
              <div className="w-full h-32 bg-white/20 border border-white/30 rounded-lg flex items-center justify-center text-white/60 cursor-pointer hover:bg-white/30 transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              发布角色
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


