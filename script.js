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
const inputValue = document.querySelectorAll(".form__input-value");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
let map;
let mapEvent;

/*
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
      map = L.map("map").setView(coords, 13);
      console.log(map);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
      });
    },
    //модальное окно в случае отказа
    function () {
      alert("Вы не предоставили доступ к своей локации");
    }
  );


form.addEventListener("submit", function (event) {
  event.preventDefault();
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "mark-popup",
      })
    )
    .setPopupContent("Тренировка")
    .openPopup();
});
  */

inputType.addEventListener("change", function () {
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
});

/*---------------12.6 Рефакторинг в синтаксис классов -------------*/
class App {
  _map;
  _mapEvent;
  constructor() {
    this._getPosition();
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      inputDistance.value =
        inputDuration.value =
        inputCadence.value =
        inputElevation.value =
          "";
      console.log(mapEvent);
      const { lat, lng } = mapEvent.latlng;
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "mark-popup",
          })
        )
        .setPopupContent("Тренировка")
        .openPopup();
    });
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),

        //модальное окно в случае отказа
        function () {
          alert("Вы не предоставили доступ к своей локации");
        }
      );
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    console.log(this);
    this._map = L.map("map").setView(coords, 13);
    console.log(this._map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);

    console.log(this);
    this._map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this._mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _toogleField() {}
  _newWorkout() {}
}

const app = new App();
app._getPosition;
