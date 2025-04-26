export const drawTeamLogo = (seasonsLength, teamLogoPath, ctx, canvas) => {
    // const canvas = document.getElementById('single_chart');
    // const ctx = canvas.getContext('2d');



   

   

    const teamLogo = new Image();
    teamLogo.src = teamLogoPath;
    teamLogo.onload = () => {
        // Рисуем логотипы команды в цикле
        for (let i = 0; i < seasonsLength; i++) {
            // Горизонтальное расстояние между каждой картинкой
            const spacing = canvas.width / seasonsLength - 60
            // Координаты каждой картинки
            const x = 60 + (i * spacing);
            const y = canvas.height - 50;
            // Размер каждой картинки
            const size = 30;
            
            // Рисуем каждый логотип
            ctx.drawImage(teamLogo, x, y, size, size);
        }
    };
};
