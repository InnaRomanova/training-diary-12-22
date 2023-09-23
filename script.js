"use strict";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //const latitude = position.coords.latitude;
      //29 стоку переписываем при помощи деструктуризации
      // Метод загрузки карты на страницу, в случае положительного ответа о предоставлении своих координат
      // _loadMap(position) {

      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude];
      const map = L.map("map").setView(coords, 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
    },
    //модальное окно в случае отказа
    function () {
      alert("Вы не предоставили доступ к своей локации");
    }
  );
