export const API_ENDPOINT = "https://api.weatherapi.com/v1"; //домен источника информации о погоде

export const errorMap = new Map([ [1006, "Не удалось найти город"] ]); // словарь возможных ошибок на русском

export const cityProvide = Symbol("city"); // уникальный идентификатор для города, который провадится в удалённый компонент SelectCity