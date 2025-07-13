import { FiMic, FiBook, FiUsers, FiGlobe } from 'react-icons/fi';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';

const CommunicationSkillsCard = ({ communicationSkills }) => {
  const skillsData = [
    {
      key: 'speechTherapy',
      name: 'Speech Therapy',
      icon: FiMic,
      color: 'blue'
    },
    {
      key: 'signLanguage',
      name: 'Sign Language',
      icon: FiGlobe,
      color: 'purple'
    },
    {
      key: 'literacy',
      name: 'Literacy',
      icon: FiBook,
      color: 'green'
    },
    {
      key: 'socialSkills',
      name: 'Social Skills',
      icon: FiUsers,
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        progress: 'bg-blue-600'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        progress: 'bg-purple-600'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        progress: 'bg-green-600'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        progress: 'bg-orange-600'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Communication Skills</h3>
        <HiChatBubbleLeftRight className="w-5 h-5 text-blue-600" />
      </div>
      <div className="space-y-6">
        {skillsData.map((skill) => {
          const skillData = communicationSkills[skill.key];
          const colors = getColorClasses(skill.color);
          const Icon = skill.icon;
          
          return (
            <div key={skill.key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                  <div className="text-xs text-gray-500">Level {skillData.level}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className={`${colors.progress} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${skillData.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700 w-10">{skillData.progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunicationSkillsCard;
