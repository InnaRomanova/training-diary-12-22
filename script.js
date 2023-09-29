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

/*---------------12.6 Рефакторинг в синтаксис классов -------------*/
class App {
  _map;
  _mapEvent;
  constructor() {
    //запуск логики приложения
    this._getPosition();

    //обработчик события, который вызывает метод _newWorkout
    form.addEventListener("submit", this._newWorkout.bind(this));

    //обработчик события, который вызывает метод _toggleField
    inputType.addEventListener("change", this._toogleField);
  }

  //метод запроса о местоположении от пользователя. Если true? запускаетс метод _loadMap
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

  //метод загрузки карты, если положительный ответ по координатам
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

    //обработчик события нажатия на карте. Запускает метод _showForm
    this._map.on("click", this._showForm.bind(this));
  }

  //метод отображает форму по клику на карте
  _showForm(mapE) {
    this._mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  //метод переключает типы тренировок
  _toogleField() {
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  }

  //метод отображает/устанавливает маркер на карте
  _newWorkout(event) {
    event.preventDefault();
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    console.log(this._mapEvent);
    const { lat, lng } = this._mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this._map)
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
  }
}

const app = new App();
app._getPosition;
