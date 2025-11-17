import { Users, FileText, UserCheck } from 'lucide-react';

interface CardData {
  id: string;
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
}

const cardsData: CardData[] = [
  {
    id: '1',
    title: 'Total Tim Capstone',
    value: 64,
    icon: <Users className="h-8 w-8" />,
    bgColor: 'bg-blue-50 border-2 border-blue-100',
    iconBgColor: 'bg-blue-100 text-blue-600 border border-blue-200',
  },
  {
    id: '2',
    title: 'Pengajuan Capstone',
    value: 34,
    icon: <FileText className="h-8 w-8" />,
    bgColor: 'bg-yellow-50 border-2 border-yellow-100',
    iconBgColor: 'bg-yellow-100 text-yellow-600 border border-yellow-200',
  },
  {
    id: '3',
    title: 'Total Pengguna Aktif',
    value: 120,
    icon: <UserCheck className="h-8 w-8" />,
    bgColor: 'bg-green-50 border-2 border-green-100',
    iconBgColor: 'bg-green-100 text-green-600 border border-green-200',
  },
];

export function InformationCard() {
  return (
    <div className="grid gap-8 px-12 md:grid-cols-3">
      {cardsData.map((card) => (
        <div key={card.id} className={`flex items-center gap-4 rounded-2xl ${card.bgColor} px-9 py-12 transition-all`}>
          {/* Icon */}
          <div className={`flex shrink-0 items-center justify-center rounded-full p-4 ${card.iconBgColor}`}>
            {card.icon}
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-gray-900">{card.value}</span>
            <span className="text-lg text-gray-600">{card.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
