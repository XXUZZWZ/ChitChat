export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">个人中心</h1>
          <p className="text-white/70">管理你的账户信息</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">U</span>
            </div>
            <h3 className="text-white font-semibold text-lg">用户名</h3>
            <p className="text-white/70 text-sm">user@example.com</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">设置</h4>
            <div className="space-y-2 text-white/80 text-sm">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>通知设置</span>
                <span>开启</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>深色模式</span>
                <span>自动</span>
              </div>
              <div className="flex justify-between py-2">
                <span>隐私设置</span>
                <span>查看</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


