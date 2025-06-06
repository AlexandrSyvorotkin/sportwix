import { useState } from 'react'

// import icon_league1 from "../../assets/team-championships/IconLeague1.png";
import icon_league2 from '../../assets/team-championships/IconLeague2.png'
import icon_league3 from '../../assets/team-championships/IconLeague3.png'
import icon_league4 from '../../assets/team-championships/IconLeague4.png'
import icon_league5 from '../../assets/team-championships/IconLeague5.png'

interface Team {
  name: string
  image: string
}

interface League {
  name: string
  image: string
  teams: Team[]
}

interface Teams {
  [key: string]: League
}

const TEAMS: Teams = {
  // 'World cup': {
  //   'name': 'World Cup',
  //   'image': icon_league1,
  //   "teams": [
  //     {
  //       "name": "Team 1",
  //       "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  //     },
  //     {
  //       "name": "Team 2",
  //       "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  //     }
  //   ]
  // },
  EPL: {
    name: 'EPL',
    image: icon_league2,
    teams: [
      {
        name: 'Liverpool',
        image: 'https://images.fotmob.com/image_resources/logo/teamlogo/8650.png',
      },
      {
        name: 'Arsenal',
        image: 'https://images.fotmob.com/image_resources/logo/teamlogo/9825.png',
      },
    ],
  },
  'La liga': {
    name: 'La liga',
    image: icon_league3,
    teams: [
      {
        name: 'Team 1',
        image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      },
      {
        name: 'Team 2',
        image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      },
    ],
  },
  Bundesliga: {
    name: 'Bundesliga',
    image: icon_league4,
    teams: [
      {
        name: 'Team 1',
        image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      },
      {
        name: 'Team 2',
        image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      },
    ],
  },
  'Ligue 1': {
    name: 'Ligue 1',
    image: icon_league5,
    teams: [
      {
        name: 'Team 1',
        image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      },
      {
        name: 'Team 2',
        image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      },
    ],
  },
}

import teams from '../../mocks/teams-mock.json'
import { Separator } from '@shared/separator'

const teamsData = teams.teams.map(team => {
  return {
    name: team.team_name,
    image: team.team_img,
  }
})

const Teams = () => {
  const [isActive] = useState('EPL')
  console.log(teams)

  return (
    <div className="w-full h-full px-[45px] py-[33px] relative overflow-y-auto">
      <div className="flex items-center gap-3 w-full sticky top-0 z-10 bg-[#1A191D] pt-2 pb-2">
        {Object.keys(TEAMS).map(key => (
          <div key={key} className="flex items-center gap-2">
            <div className="w-[50px] h-[50px]">
              <img
                src={TEAMS[key].image}
                alt={key}
                className="w-full h-full object-cover"
                // onMouseEnter={() => setIsActive(key)}
              />
            </div>
            {isActive === key && (
              <span className="animate-expand-width overflow-hidden whitespace-nowrap font-medium text-lg">
                {key}
              </span>
            )}
          </div>
        ))}
      </div>
      <Separator className="bg-[#35353580] w-full h-[2px] mt-[23px]" />
      <div className="flex items-center gap-2 mt-[44px] ">
        <div className="flex items-left flex-col gap-[20px] w-full">
          {teamsData.map(team => (
            <div className="flex items-center flex-col gap-[8px] w-full">
              <div key={team.name} className="flex items-center gap-2 w-full">
                <div className="w-[40px] h-[40px]">
                  <img src={team.image} alt={team.name} className="w-full h-full object-cover" />
                </div>
                <span>{team.name}</span>
              </div>
              <div className="bg-[#35353580] w-full h-[2px]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Teams
