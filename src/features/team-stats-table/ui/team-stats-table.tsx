import React, { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../types/hooks'
import team_stats from '../../../localization/team_detail_info_section/team_stats/team_stats.json'
import { TeamStatParameter } from './team-stat-parameter'
import { RootState } from '../../../store/store'
import { EnhancedSelect } from '@shared/ui/select'
import { Separator } from '@shared/separator'
import {
	chooseSecondTeam,
	setGameFrame,
	setTimeFrame,
} from '@store/tournament-slice/tournament-slice'
import { TeamStatTableParametersSelector } from './team-stat-table-parameters-selector'
import { Switch } from '@shared/ui/switch'

const timeSelectors = [
	{ id: 1, name: '1 тайм', filterTag: 'time_1' },
	{ id: 2, name: '2 тайм', filterTag: 'time_2' },
	{ id: 3, name: 'Полный матч', filterTag: 'full_time' },
]

const gameSelectors = [
	{ id: 1, name: 'timeframe_1' },
	{ id: 2, name: 'timeframe_3' },
	{ id: 3, name: 'timeframe_5' },
	{ id: 4, name: 'timeframe_10' },
	{ id: 5, name: 'timeframe_15' },
	{ id: 6, name: 'timeframe_all' },
]

const TeamStatsTable = () => {
	const [activeSelector, setActiveSelector] = useState('Полный матч')
	const firstSelectedTeamMetrics = useAppSelector(
		state => state.tournamentSlice.filters.stat_metrics.firstTeamMetrics
	)
	const secondSelectedTeamMetrics = useAppSelector(
		state => state.tournamentSlice.filters.stat_metrics.secondTeamMetrics
	)
	const firstTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)

	const [activeMetrics, setActiveMetrics] = useState<string[]>(
		[
			'goals_scored', 
			'goals_conceded', 
			'delta_goals', 
			'xgSum', 
			'ball_possession', 
			'total_shots', 
		]
	)

	const teamStatisticsParamsList = [
		{
			id: 1,
			title: 'goals_scored',
			component: (
				<TeamStatParameter
					title={team_stats.goals_scored}
					first_selected_param={firstSelectedTeamMetrics?.goals_scored}
					second_selected_param={secondSelectedTeamMetrics?.goals_scored}
					type={1}
				/>
			),
		},
		{
			id: 2,
			title: 'goals_conceded',
			component: (
				<TeamStatParameter
					title={team_stats.goals_conceded}
					first_selected_param={firstSelectedTeamMetrics?.goals_conceded}
					second_selected_param={secondSelectedTeamMetrics?.goals_conceded}
					type={2}
				/>
			),
		},
		{
			id: 3,
			title: 'delta_goals',
			component: (
				<TeamStatParameter
					title={team_stats.delta_goals}
					first_selected_param={firstSelectedTeamMetrics?.delta_goals}
					second_selected_param={secondSelectedTeamMetrics?.delta_goals}
					type={1}
				/>
			),
		},
		{
			id: 4,
			title: 'xgSum',
			component: (
				<TeamStatParameter
					title={team_stats.xgSum}
					first_selected_param={firstSelectedTeamMetrics?.xG_sum}
					second_selected_param={secondSelectedTeamMetrics?.xG_sum}
					type={1}
				/>
			),
		},
		{
			id: 5,
			title: 'ball_possession',
			component: (
				<TeamStatParameter
					title={team_stats.ball_possession}
					first_selected_param={firstSelectedTeamMetrics?.ball_possession}
					second_selected_param={secondSelectedTeamMetrics?.ball_possession}
					type={1}
				/>
			),
		},
		{
			id: 6,
			title: 'total_shots',
			component: (
				<TeamStatParameter
					title={team_stats.total_shots}
					first_selected_param={firstSelectedTeamMetrics?.total_shots}
					second_selected_param={secondSelectedTeamMetrics?.total_shots}
					type={1}
				/>
			),
		},
		{
			id: 7,
			title: 'inaccurate_passes',
			component: (
				<TeamStatParameter
					title={team_stats.innaccurate_passes}
					first_selected_param={firstSelectedTeamMetrics?.inaccurate_passes}
					second_selected_param={secondSelectedTeamMetrics?.inaccurate_passes}
					type={1}
				/>
			),
		},
		{
			id: 8,
			title: 'accurate_passes',
			component: (
				<TeamStatParameter
					title={team_stats.accurate_passes}
					first_selected_param={firstSelectedTeamMetrics?.accurate_passes}
					second_selected_param={secondSelectedTeamMetrics?.accurate_passes}
					type={1}
				/>
			),
		},
		{
			id: 9,
			title: 'bch',
			component: (
				<TeamStatParameter
					title={team_stats.bch}
					first_selected_param={firstSelectedTeamMetrics?.bch}
					second_selected_param={secondSelectedTeamMetrics?.bch}
					type={1}
				/>
			),
		},
		{
			id: 10,
			title: 'bchm',
			component: (
				<TeamStatParameter
					title={team_stats.bchm}
					first_selected_param={firstSelectedTeamMetrics?.bchm}
					second_selected_param={secondSelectedTeamMetrics?.bchm}
					type={1}
				/>
			),
		},
		{
			id: 11,
			title: 'avg_coeff',
			component: (
				<TeamStatParameter
					title={team_stats.avg_coeff}
					first_selected_param={firstSelectedTeamMetrics?.avg_coeff}
					second_selected_param={secondSelectedTeamMetrics?.avg_coeff}
					type={1}
				/>
			),
		},
		{
			id: 12,
			title: 'offsides',
			component: (
				<TeamStatParameter
					title={team_stats.offsides}
					first_selected_param={firstSelectedTeamMetrics?.offsides}
					second_selected_param={secondSelectedTeamMetrics?.offsides}
					type={1}
				/>
			),
		},
		{
			id: 13,
			title: 'corners',
			component: (
				<TeamStatParameter
					title={team_stats.corners}
					first_selected_param={firstSelectedTeamMetrics?.corners}
					second_selected_param={secondSelectedTeamMetrics?.corners}
					type={1}
				/>
			),
		},
	]
	const paramsMetrics = Object.keys(team_stats).map(key => ({
		id: Number(window.crypto.randomUUID()),
		isActive: activeMetrics.includes(key),
		name: key,
	}))

	const teams = useAppSelector((state: RootState) => state.tournamentSlice.tournament?.teams)
	const firstSelectedTeam = useAppSelector(
		(state: RootState) => state.tournamentSlice.firstSelectedTeam
	)

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

	const dispatch = useAppDispatch()

	const onSelectSecondTeam = (team: string) => {
		const secondSelectedTeam = teams?.find(t => t.team_name === team)
		if (secondSelectedTeam) {
			dispatch(chooseSecondTeam(secondSelectedTeam))
		}
	}

	const handleMetricToggle = (metricName: string) => {
		setActiveMetrics(prev => 
			prev.includes(metricName) 
				? prev.filter(m => m !== metricName)
				: [...prev, metricName]
		)
	}

	return (
		<div className="w-full h-full flex flex-col">
			<div className="flex h-[80px] w-full">
				<div className="flex flex-col w-1/3 h-full">
					<div className="px-4 py-1.5 flex items-center h-full gap-2.5 font-normal text-sm leading-4 text-white w-full relative">
						<div className="w-[40px] h-[40px]">
							<img
								className="w-full h-full object-cover"
								src={`${firstTeam?.team_img}`}
								alt={firstTeam?.team_name}
							/>
						</div>
						<span>{firstTeam?.team_name}</span>
					</div>
					<Separator className="w-full h-[1px]" />
				</div>
				<Separator className="w-[1px] h-full" />
				<div className="w-[40%]">
					<div className="flex w-full h-1/2">
						<div className="w-1/3 h-full flex flex-col items-center justify-center">
							<EnhancedSelect
								triggerWidth="w-[99%] h-full px-4 py-1.5"
								defaultValue="timeframe_1"
								items={gameSelectors}
								onValueChange={e => {
									dispatch(
										setGameFrame(
											e as
											| 'timeframe_1'
											| 'timeframe_3'
											| 'timeframe_5'
											| 'timeframe_10'
											| 'timeframe_15'
											| 'timeframe_all'
										)
									)
								}}
							/>
							<Separator className="w-full h-[1px]" />
						</div>
						<Separator className="w-[1px] h-full" />
						<div className="w-full h-full flex flex-col items-center justify-center">
							<div className="w-full h-[99%] flex items-center justify-center">
								{timeSelectors.map((selector, index) => (
									<React.Fragment key={selector.id}>
										<div
											className={`h-full px-4 py-1.5 flex-1 flex items-center justify-center cursor-pointer font-normal text-sm leading-4 
											${activeSelector === selector.name ? 'text-white' : 'text-gray-500'}`}
											onClick={() => {
												dispatch(
													setTimeFrame(selector.filterTag as 'time_1' | 'time_2' | 'full_time')
												)
												setActiveSelector(selector.name)
											}}
										>
											{selector.name}
										</div>
										{index < timeSelectors.length - 1 && <Separator className="w-[1px] h-full" />}
									</React.Fragment>
								))}
							</div>
							<Separator className="w-full h-[1px]" />
						</div>
					</div>
					<div className="flex flex-col w-full h-1/2">
						<div className="px-1 py-1 h-[calc(100%-1px)] flex justify-between font-normal text-sm leading-4 text-white">
							<TeamStatTableParametersSelector 
							items={paramsMetrics} 
							onMetricToggle={handleMetricToggle}
							renderCustomSettings={
								<div className="w-full h-full flex items-center gap-2 justify-start px-4 py-1.5">
									<Switch/>
									<span className="text-white">H2H</span>
								</div>
							} 
							/>
						</div>
						<Separator className="w-full h-[1px]" />
					</div>
				</div>
				<Separator className="w-[1px] h-full" />
				<div className="w-1/3 h-[79px] flex items-center justify-center">
					<div className="w-full h-full">
						<EnhancedSelect
							placeholder="Выберите команду"
							items={teamsData}
							renderCustomItem={(team) => (
								<div className="flex items-center gap-2">
									<img src={team.img} alt={team.name} className="w-[30px] h-[30px] rounded-full" />
									<span>{team.name}</span>
								</div>
							)}
							onValueChange={e => onSelectSecondTeam(e)}
							triggerWidth="w-full h-full px-4 py-1.5 "
						/>
						<Separator className="w-full h-[1px]" />
					</div>
				</div>
			</div>
			<div className="overflow-y-auto">
				{teamStatisticsParamsList.filter(it => activeMetrics.includes(it.title)).map(it => (
					<div key={it.id}>{it.component}</div>
				))}
			</div>
		</div>
	)
}

export { TeamStatsTable }
