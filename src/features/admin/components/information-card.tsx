import { useQuery } from '@tanstack/react-query';
import { Users, FileText, UserCheck } from 'lucide-react';
import { getCurrentPeriod } from '~/lib/api/config';
import { getAllSubmissionQuery } from '~/lib/api/submission';
import { getAllTeamQuery } from '~/lib/api/team';
import { getAllTitlesQuery } from '~/lib/api/title';
import { getAllUsersQuery } from '~/lib/api/user';

export function InformationCard() {
  const { data: submissionsData } = useQuery(getAllSubmissionQuery());
  const { data: teamsData } = useQuery(getAllTeamQuery());
  const { data: titlesData } = useQuery(getAllTitlesQuery());
  const { data: usersData } = useQuery(getAllUsersQuery());
  const { data: periodData } = useQuery(getCurrentPeriod());
  const currentPeriod = periodData?.current_period;

  const submissionsCount = Array.isArray(submissionsData) ? submissionsData.length : 0;
  const teamsCount = Array.isArray(teamsData) ? teamsData.length : 0;
  const titlesCount = Array.isArray(titlesData) ? titlesData.length : 0;
  const usersCount = Array.isArray(usersData) ? usersData.length : 0;

  const cardsData = [
    {
      id: 'submissions',
      title: 'Total Submissions',
      value: submissionsCount,
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      bgColor: 'bg-blue-50',
      iconBgColor: 'bg-blue-100',
    },
    {
      id: 'teams',
      title: 'Total Teams',
      value: teamsCount,
      icon: <Users className="h-8 w-8 text-green-600" />,
      bgColor: 'bg-green-50',
      iconBgColor: 'bg-green-100',
    },
    {
      id: 'titles',
      title: 'Total Titles',
      value: titlesCount,
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      bgColor: 'bg-purple-50',
      iconBgColor: 'bg-purple-100',
    },
    {
      id: 'users',
      title: 'Total Users',
      value: usersCount,
      icon: <UserCheck className="h-8 w-8 text-orange-600" />,
      bgColor: 'bg-orange-50',
      iconBgColor: 'bg-orange-100',
    },
    {
      id: 'period',
      title: 'Current Period',
      value: currentPeriod ?? '-',
      icon: <FileText className="h-8 w-8 text-indigo-600" />,
      bgColor: 'bg-indigo-50',
      iconBgColor: 'bg-indigo-100',
    },
  ];

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
