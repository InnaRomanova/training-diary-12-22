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

// let map;
// let mapEvent;

//уникальный идентификатор
console.log((Date.now() + "").slice(-10));
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(coords, distance, duration) {
    this.coords = this.coords;
    this.distance = this.distance;
    this.duration = this.duration;
  }
}

//класс пробежки
class Dunning extends Workout {
  constructor(coords, distance, duration, cadens) {
    super(coords, distance, duration);
    this.cadens = cadens;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Dunning {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
  }

  //вычисление скорости
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Dunning([-5, 5], 5, 10, 150);
const cycl1 = new Cycling([-5, 5], 15, 90, 150);

class App {
  _workouts;
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

    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    //функция проверки положитеьлного числа, чтобы не было отрицательных
    const allPositiv = (...inputs) => inputs.every((inp) => inp > 0);

    //данные из форм
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this._mapEvent.latlng;
    let workout;

    if (type === "running") {
      const cadence = +inputCadence.value;

      //проверяет, если оно число
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositiv(distance, duration, cadence)
      ) {
        return alert("необходимо ввести целое положительное число");
      }
      workout = new Dunning([lat, lng], distance, duration, cadence);
    }

    if (type === "cycling") {
      //подъем может как отрицательным, так и положительным числом
      const elevation = +inputElevation.value;

      //проверяет, если оно число
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(elevation)
        !validInputs(distance, duration, elevation) ||
        !allPositiv(distance, duration)
      ) {
        return alert("необходимо ввести целое положительное число");
      }
      //если это велосипед, создать велосипед
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    //добавить объект в массив workout
    this._workouts.push(workout);
    console.log(this.workouts);
    //проверить, что данные корректны

    //если это пробежка, создать объект пробежки

    //если это велосипед, создать объект велосипед

    //добавить объект в массив workout

    //рендер маркера тренировки на карте
    this.renderWorkMarket(workout);
  }
  renderWorkMarket(workout) {
    L.marker(workout.coords)
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
      .setPopupContent("workout.distance")
      .openPopup();
  }
}

//отчистить поля ввода и спрятать форму

inputDistance.value =
  inputDuration.value =
  inputCadence.value =
  inputElevation.value =
    "";

const app = new App();
app._getPosition;
