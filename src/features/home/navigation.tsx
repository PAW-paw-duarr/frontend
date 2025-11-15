import { Avatar, AvatarImage } from "../../components/ui/avatar"
import { Input } from "~/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "~/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { getUserQueryOptions } from "~/lib/auth"


export function Navigation({ className }: React.ComponentProps<'input'>) {
  const user = useQuery(getUserQueryOptions())

  return (
    <nav className={cn("px-[100px] py-6 bg-transparent", className)}>
      <div className="w-full bg-white/40 backdrop-blur-sm flex items-center p-4 rounded-3xl shadow-lg">
        {/* Logo Section - Fixed Width */}
        <div className="flex items-center space-x-4 px-3.5 py-3 w-[250px]">
          <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
          <div className="font-bold text-xl">ReCapstone</div>
        </div>

        {/* Search Section - Centered */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-[850px]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Cari Capstone Project..." 
              className="pl-12 bg-gray-50/50 rounded-[12px] focus:ring-2 focus:ring-blue-500 w-full h-[50px] border-white"
            />
          </div>
        </div>

        {/* User Profile Section - Fixed Width */}
        <div className="flex items-center justify-end space-x-3 px-4 w-[250px]">
          <Avatar className="w-12 h-12 border-2 border-blue-500">
            <AvatarImage src="/logo.svg" alt="User Avatar" />
          </Avatar>
          <div>
            <div className="font-semibold text-sm">{user?.data?.name}</div>
            <div className="flex items-center space-x-2 text-xs text-primary">
              <span>Anggota</span>
              <span className="text-primary">•</span>
              <span>Nama_Kelompok</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}