import { FC, useState } from 'react'
import styles from './UserSettings.module.scss'
import PersonalCabinetSelection from '../../ui/Selections/PersonalCabinetSelection/PersonalCabinetSelection'
import CustomCheckboxInput from '../../ui/CustomInputs/CustomCheckboxInput/CustomCheckboxInput'

interface UserSettingsProps {

}

const UserSettings:FC<UserSettingsProps> = () => {

    const themeSelections = [
        {id:1, title: 'Dark theme'},
        {id:2, title: 'Light theme'},
    ]

    const languageSelections = [
        {id: 1, title: "Русский"},
        {id: 2, title: "English"},
        {id: 3, title: "Chinessee"},
    ]

    const [notifications, setNotifications] = useState<boolean>(false)
    const [mailing, setMailing] = useState<boolean>(false)

    const notificationsChangeHandler = () => {
        setNotifications(!notifications);
    };

    const mailingChangeHadler = () => {
        setMailing(!mailing);
    };

    

    return (
        <div className={styles.user_settings}>
            <PersonalCabinetSelection selectors={themeSelections} defaultValue='Dark theme' onClose={() => null} type='Theme'/>
            <PersonalCabinetSelection selectors={languageSelections} defaultValue='English' onClose={() => null} type='Language'/>
            <div className={styles.additional_settings}>
                <CustomCheckboxInput 
                    type='Notifications'
                    isActive={notifications}
                    onChange={notificationsChangeHandler}
                />
                <CustomCheckboxInput 
                    type='Mailing'
                    isActive={mailing}
                    onChange={mailingChangeHadler}
                />
            </div>
        </div>
    )
}

export default UserSettings