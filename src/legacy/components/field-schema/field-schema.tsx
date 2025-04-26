import { FC, useState } from "react";
import styles from './field-schema.module.scss'
import squad from '../../real_madrid_squad.json'

const FieldSchema: FC = () => {

    let lines = [];

    for (let i = 0; i < 8; i++) {
        let top = i * 100; // Увеличиваем значение top на 100 пикселей для каждой линии
        lines.push(<div key={i} className={styles.line} style={{ top: `${top}px` }}></div>);
    }

    const [schema, setSchema] = useState(squad)

    console.log(squad)

    const getPlayerPosition = (playerPosition: string) => {
        const position: any = {
            'GL': {
                bottom: '0',
                left: '50%'
            },
            'LB': {
                bottom: '15%',
                left: '20%'
            },
            'LCB': {
                bottom: '15%',
                left: '40%'
            },
            'RCB': {
                bottom: '15%',
                left: '60%'
            },
            'RB': {
                bottom: '15%',
                left: '80%'
            },
            'DM': {
                bottom: '30%',
                left: '50%'
            },
            'RCM': {
                bottom: '40%',
                left: '30%'
            },
            'LCM': {
                bottom: '40%',
                left: '70%'
            },
            'RW': {
                bottom: '55%',
                left: '20%'
            },
            'LW': {
                bottom: '55%',
                left: '80%'
            },
            'CF': {
                bottom: '70%',
                left: '50%'
            }
        }
        return position[playerPosition]
    }

    const short_schemas = [
        {
            short: '4-4-2',
            positions: ['GL', 'LB', 'LCB', 'RCB', 'RB', 'LM', 'CM', 'CM', 'RM', 'CF', 'CF']
        },
        {
            short: '4-3-3',
            positions: ['GL', 'LB', 'LCB', 'RCB', 'RB', 'DM', 'DM', 'DM', 'LW', 'RW', 'CF']
        },
        {
            short: '4-2-3-1',
            positions: ['GL', 'LB', 'LCB', 'RCB', 'RB', 'DM', 'DM', 'LW', 'CAM', 'RW', 'CF']
        },
        {
            short: '4-1-2-1-2',
            positions: ['GL', 'LB', 'LCB', 'RCB', 'RB', 'DM', 'LCM', 'RCM', 'CAM', 'CF', 'CF']
        }
    ];

    // Хендлер для смены схемы
    const changeSchemaHandler = (positions: string[]) => {
        // Обновляем массив схемы с новыми позициями
        const updatedSchema = schema.map((player, index) => ({
            ...player,
            short_position: positions[index] // Присваиваем новую позицию игроку
        }));
        setSchema(updatedSchema); // Обновляем состояние
    }

    console.log(schema)

    return (
        <div className={styles.wrapper}>
            <div className={styles.field}>
                <div className={styles.field_top}>
                    <div className={styles.corner} style={{ borderBottom: "2px solid white", borderRight: "2px solid white", borderRadius: '0 0 100%' }} />
                    <div className={styles.penalty_area}>
                        <div className={styles.penalty_area_dop} />
                    </div>
                    <div className={styles.corner} style={{ borderBottom: "2px solid white", borderLeft: "2px solid white", borderRadius: '0 100% 0' }} />
                </div>
                <div className={styles.field_bottom}>
                    <div className={styles.corner} style={{ borderBottom: "2px solid white", borderRight: "2px solid white", borderRadius: '0 0 100%' }} />
                    <div className={styles.penalty_area}>
                        <div className={styles.penalty_area_dop} />
                    </div>
                    <div className={styles.corner} style={{ borderBottom: "2px solid white", borderLeft: "2px solid white", borderRadius: '0 100% 0' }} />
                </div>
                {lines}
                <div className={styles.team_schema}>
                    {schema.map(it => <div className={styles.player_ball} style={getPlayerPosition(it.short_position)}></div>)}
                </div>
            </div>
            <div className={styles.schemas_selection}>
                {short_schemas.map(it => <div onClick={() => changeSchemaHandler(it.positions)} className={styles.item}>{it.short}</div>)}
            </div>
        </div>
    )
}

export default FieldSchema