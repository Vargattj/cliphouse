function getRFCDates() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);

    const rfcToday = today.toISOString();
    const rfcLastDay = lastDay.toISOString();

    return {
        today: rfcToday,
        lastDay: rfcLastDay,
    };
}

const { today, lastDay } = getRFCDates();

export {
    today,
    lastDay
}