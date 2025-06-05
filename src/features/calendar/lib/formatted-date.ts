export function formattedDate(date: string) {
    const parts = date?.split("-");

    // Получаем год, месяц и день

    // const year = parts?.[0];

    const month = parts?.[1];

    const day = parts?.[2];

    // Форматируем дату в требуемый формат "дд.мм.гггг"
    const formattedDate = day + "." + month;

    return formattedDate;
}