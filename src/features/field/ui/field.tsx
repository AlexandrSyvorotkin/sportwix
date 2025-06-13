import {FootballField} from './football-field';
import { FieldTimes } from './field-times';
import { FieldGames } from './field-games';
import { useState } from 'react';
import { Time } from '../../../legacy/types/gameFrameTimeTypes';


const Field = () => {


  const [selectedGamesTimeFrame, setSelectedGamesTimeFrame] = useState(1)

  const [activeTimeFrame, setActiveTimeFrame] = useState({
    gametimeframe_1: Time.FT,
    gametimeframe_3: Time.FT,
    gametimeframe_5: Time.FT,
    gametimeframe_10: Time.FT,
    gametimeframe_15: Time.FT,
    gametimeframe_all: Time.FT
  })

  // const dispatch = useAppDispatch()

  // const [loading, setLoading] = useState<boolean>(false)

  // const teams = useAppSelector(state => state.tournamentSlice)


  return (
    <div className='w-full h-full'>
      <div className='flex text-white w-full overflow-y-auto h-full'>
        <FieldTimes activeTimeFrame={activeTimeFrame} setActiveTimeFrame={setActiveTimeFrame} />
        <FieldGames
          selectedGamesCount={selectedGamesTimeFrame}
          setSelectedGamesCount={setSelectedGamesTimeFrame}
        // filterMidfieldByTimeFrame={() => null}
        />
        <FootballField/>
      </div>
    </div>
  );
};

export {Field};


