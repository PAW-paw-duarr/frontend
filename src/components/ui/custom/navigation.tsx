import { Avatar, AvatarImage } from "../avatar"
import { Input } from "../input"
import { Search } from "lucide-react"

function Navigation() {
  return (
    <nav className="px-[100px] py-6">
      <div className="w-full bg-white/35 backdrop-blur-sm flex items-center p-4 rounded-3xl shadow-lg justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 px-[14px] py-[12px]">
          <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
          <div className="font-bold text-xl">ReCapstone</div>
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Cari Capstone Project..." 
              className="pl-10 bg-gray-50 border-gray-200 rounded-[12px] focus:ring-2 focus:ring-blue-500 w-[700px] h-[50px]"
            />
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-3 px-4">
          <Avatar className="w-12 h-12 border-2 border-blue-500">
            <AvatarImage src="/logo.svg" alt="User Avatar" />
          </Avatar>
          <div>
            <div className="font-semibold text-sm">Nasihuy123</div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <span>Anggota</span>
              <span className="text-gray-400">•</span>
              <span>Nama_Kelompok</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation