import { Defence } from './defence';
import { FieildControls } from './field-controls';
import { Separator } from '@shared/separator';
import { Attack } from './attack';
import { useAppSelector } from '@hooks/hooks';
import Arrow from '@assets/icons/arrow.svg?react'
import { useMemo } from 'react';
import { RootState } from '@store/store';
import { EnhancedSelect } from '@shared/ui/select';
import { ProgressCircle } from '@shared/progress-circle';
import DefenceIcon from '@assets/icons/defence.svg?react';
import AttackIcon from '@assets/icons/attack.svg?react';
import MidfieldIcon from '@assets/icons/midfield.svg?react';

const FootballField = () => {
	const firstSelectedTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)
	const firstSelectedTeamImg = useAppSelector(state => state.tournamentSlice.firstSelectedTeam?.team_img)
	const teams = useAppSelector((state: RootState) => state.tournamentSlice.tournament?.teams)

	const teamsData = useMemo(() => {
		return teams
			?.map(team => ({
				id: Number(team.team_uuid),
				name: team.team_name,
				img: team.team_img,
				isInProgress: !(team.team_name === 'Arsenal' || team.team_name === 'Liverpool'),
			}))
			.filter(team => team.name !== firstSelectedTeam?.team_name)
	}, [teams, firstSelectedTeam])

	const FirstSelectedTeam = () => {
		return (
			<div className="flex items-center gap-1 absolute top-[10px] left-[18px]">
				<div className="w-8 h-8">
					<img src={`${firstSelectedTeamImg}`} alt="" className="w-full h-full object-cover" />
				</div>
				<Arrow />
			</div>
		)
	}

	const SecondSelectedTeam = () => {
		return (
			<div className="flex items-center gap-1 absolute bottom-[10px] left-[5px]">
				<EnhancedSelect
					placeholder=""
					items={teamsData}
					renderCustomItem={(team) => (
						<div className="flex items-center gap-2">
							<img src={team.img} alt={team.name} className="w-[30px] h-[30px] rounded-full" />
							<span>{team.name}</span>
						</div>
					)}
					onValueChange={() => null}
					triggerWidth="w-full h-full px-4 py-1.5"
				/>
				<Arrow />
			</div>
		)
	}

	return (
		<div className='w-full h-full flex flex-col'>
			<FieildControls />
			<div className='flex w-full h-4/5'>
				<Defence
					firstSelectedTeam={<FirstSelectedTeam />}
					secondSelectedTeam={<SecondSelectedTeam />}
					goalkeeperParameters={
						<ProgressCircle
							percent={20}
							type='small'
							icon={<DefenceIcon className='w-4 h-4 absolute left-1/2 transform -translate-x-1/2 z-10'/>}
						/>
					}
					defenceParameters={
						<ProgressCircle
							percent={40}
							type='big'
							icon={<DefenceIcon className='w-8 h-8 absolute left-1/2 transform -translate-x-1/2 z-10'/>}
						/>
					}
				/>
				<Separator className='w-[1px] h-full' />
				<div className='w-1/3 h-full flex items-center justify-center'>
					<ProgressCircle
						percent={40}
						type='big'
						icon={<MidfieldIcon className='w-8 h-8 absolute left-1/2 transform -translate-x-1/2 z-10'/>}
					/>
				</div>
				<Separator className='w-[1px] h-full' />
				<Attack
					attackParameters={
						<ProgressCircle
							percent={40}
							type='big'
							icon={<AttackIcon className='w-8 h-8 absolute left-1/2 transform -translate-x-1/2 z-10'/>}
						/>
					}
					attackGateParameters={
						<ProgressCircle
							percent={40}
							type='small'
							icon={<AttackIcon className='w-4 h-4 absolute left-1/2 transform -translate-x-1/2 z-10'/>}
						/>
					}
				/>
			</div>
		</div>
	);
};

export { FootballField }