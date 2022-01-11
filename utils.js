export const formatData = (date)  => Intl.DateTimeFormat(navigator.language, {dateStyle: "short", timeStyle: "short"})
    .format(date);