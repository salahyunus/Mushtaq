// All pages
let goUp = document.querySelector(".goUp");
window.onscroll = function () {
  scrollFunction();
};
function setCookie(name, value, path, options = {}) {
  options = {
    path: path,
    ...options,
  };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}
function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goUp.classList.remove("off");
  } else {
    goUp.classList.add("off");
  }
}
goUp.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
if (!window.location.pathname.includes("QuranPlayer.html") && !window.location.pathname.includes("Terms.html")) {
  let contextMenu = document.querySelector(".RM");
  subMenu = contextMenu.querySelector(".sub-menu");

  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    let x = e.offsetX,
      y = e.offsetY,
      winWidth = window.innerWidth,
      winHeight = window.innerHeight,
      cmWidth = contextMenu.offsetWidth,
      cmHeight = contextMenu.offsetHeight;

    if (x > winWidth - cmWidth - subMenu.offsetWidth) {
      subMenu.style.left = "-200px";
    } else {
      subMenu.style.left = "";
      subMenu.style.right = "-200px";
    }

    x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;

    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.visibility = "visible";
  });
  document.addEventListener(
    "click",
    () => (contextMenu.style.visibility = "hidden")
  );
  let DL2M = document.querySelector(".DL2M");
  DL2M.onclick = function () {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "Light";
    if (currentTheme === "Light") {
      targetTheme = "Dark";
    }
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
  };
}
if (!window.location.pathname.includes("Terms.html")) {
  // Navigation and Theme Setup
  {
    let Navigation = document.querySelector(".Navigation");
    let NavToggle = document.querySelector(".NavToggle");
    let DLM = document.querySelector(".DLM");
    NavToggle.onclick = function () {
      Navigation.classList.toggle("Active");
      Navigation.scrollTo(0, 0);
    };
    let storedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "Dark"
        : "Light");
    if (storedTheme)
      document.documentElement.setAttribute("data-theme", storedTheme);
    DLM.onclick = function () {
      let currentTheme = document.documentElement.getAttribute("data-theme");
      let targetTheme = "Light";
      DLM.innerHTML = '<i class="fa-solid fa-moon"></i>';
      if (currentTheme === "Light") {
        targetTheme = "Dark";
        DLM.innerHTML = '<i class="fa-solid fa-sun"></i>';
      }
      document.documentElement.setAttribute("data-theme", targetTheme);
      localStorage.setItem("theme", targetTheme);
    };
  }
}
// Navigation and Theme Setup

// Account Page
if (window.location.pathname.includes("Account.html")) {
  // Favourite Color update
  {
    var cwrap = document.querySelector(".cp_wrapper");
    cwrap.addEventListener("input", function (e) {
      var favcolor = document.getElementById("CL").value;
      cwrap.style.backgroundColor = favcolor;
    });
  }
  // Favourite Color updated
  let loginform = document.querySelector("#LoginBox");
  let regisform = document.querySelector("#Register");
  let resetps = document.querySelector("#Reset");
  let res = document.querySelector(".res");
  function LoginSwitch() {
    regisform.style.display = "none";
    loginform.style.display = "flex";
    resetps.style.display = "none";
    res.style.display = "none";
  }
  function RegiSwitch() {
    regisform.style.display = "flex";
    loginform.style.display = "none";
    resetps.style.display = "none";
    res.style.display = "none";
  }
  function resetp() {
    resetps.style.display = "flex";
    loginform.style.display = "none";
    regisform.style.display = "none";
    res.style.display = "block";
  }
  window.onload = function () {
    LoginSwitch();
  };

  var prev_handler = window.onload;
  window.onload = function () {
    if (prev_handler) {
      prev_handler();
    }
    if (
      getCookie("remail") == null &&
      getCookie("rpass") == null &&
      getCookie("user") == null
    ) {
      console.log("No cookies");
    } else if (getCookie("remail") != null) {
      window.open("Profile.html", "_self");
    }
  };
  document.querySelector("#RegisForm").addEventListener("submit", () => {
    setCookie("user", document.querySelector("#R-User").value, "/");
    setCookie("remail", document.querySelector("#R-Email").value, "/");
    setCookie("rpass", document.querySelector("#R-Pass").value, "/");
  });

  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modalbox");
  const closebtn = document.querySelector(".closebtn");
  function showModal() {
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = "auto";
    modal.style.display = "flex";
    resetps.style.display = "none";
    loginform.style.display = "none";
    regisform.style.display = "none";
    res.style.display = "none";
  }
  function hideModal() {
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = "none";
    modal.style.display = "none";
  }
  function validateForm() {
    if (
      document.querySelector("#L-Email").value != getCookie("remail") ||
      document.querySelector("#L-Password").value != getCookie("rpass")
    ) {
      showModal();
      document.querySelector("#msg").textContent = "Account not found";
      document.querySelector(".confirmbtn").textContent = "Create One";
      document
        .querySelector(".confirmbtn")
        .addEventListener("click", function () {
          hideModal();
          RegiSwitch();
        });
      return false;
    }
  }
  function validateMyForm() {
    if (
      document.querySelector("#frst_re").value !=
        document.querySelector("#scnd_re").value ||
      document.querySelector("#frst_re").value == ""
    ) {
      showModal();
      document.querySelector("#msg").textContent = "Passwords should match!";
      document.querySelector(".confirmbtn").textContent = "Retry";
      document
        .querySelector(".confirmbtn")
        .addEventListener("click", function () {
          hideModal();
          resetp();
        });
    } else {
      showModal();
      document.querySelector("#msg").textContent = "Password reset";
      document.querySelector(".confirmbtn").textContent = "Login!";
      document
        .querySelector(".confirmbtn")
        .addEventListener("click", function () {
          hideModal();
          LoginSwitch();
        });
    }
  }
  document.cookie = "cookieBy= Mushtaq; max-age=" + 60 * 60 * 24 * 30;
}
if (window.location.pathname.includes("index.html")) {
  let loader = document.querySelector("loader");
  const cookieBox = document.querySelector(".cookieWrapper"),
    cookiebuttons = document.querySelectorAll(".cookiebtn");
  const body = document.querySelector("body");
  const executeCodes = () => {
    if (document.cookie.includes("Mushtaq")) return;
    cookieBox.classList.add("show");

    cookiebuttons.forEach((button) => {
      button.addEventListener("click", () => {
        cookieBox.classList.remove("show");

        if (button.id == "acceptBtn") {
          document.cookie = "cookieBy= Mushtaq; max-age=" + 60 * 60 * 24 * 30;
        }
      });
    });
  };
  var btnText = document.getElementById("readMore");
  btnText.addEventListener("click", loadmoreAbt);
  function loadmoreAbt() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readMore");
    var aboutImg = document.querySelector(".aboutImg");
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
      aboutImg.style.display = "block";
      setTimeout(function () {
        aboutImg.classList.remove("offscreen");
      }, 100);
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      aboutImg.classList.add("offscreen");
      setTimeout(function () {
        aboutImg.style.display = "none";
        moreText.style.display = "inline";
      }, 500);
    }
  }
  window.setTimeout(function () {
    loader.remove();
    body.style.animation = "fadein 2s 1";
    ScrollReveal().reveal(".homeContent, h1", { origin: "bottom" });
    body.style.overflow = "visible";
    executeCodes();
  }, 2000);
  const tiltEls = document.querySelectorAll(".tilt");

  const tiltMove = (x, y) =>
    `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;

  tiltEls.forEach((tilt) => {
    const height = tilt.clientHeight;
    const width = tilt.clientWidth;

    tilt.addEventListener("mousemove", (e) => {
      const x = e.layerX;
      const y = e.layerY;
      const multiplier = 50;

      const xRotate = multiplier * ((x - width / 2) / width);
      const yRotate = -multiplier * ((y - height / 2) / height);

      tilt.style.transform = tiltMove(xRotate, yRotate);
    });

    tilt.addEventListener(
      "mouseout",
      () => (tilt.style.transform = tiltMove(0, 0))
    );
  });
  ScrollReveal({
    duration: 3000,
    distance: "120px",
    delay: 200,
  });
  const t = new Typed(".MultipleText", {
    strings: [
      "Holy Journeys",
      "Holy Makkah",
      "Madinah",
      "Al-Rawdah",
      "Umrah",
      "Hajj",
      "Sacred Voyage",
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
  });

  const container = document.querySelector(".Vcontainer"),
    mainVideo = container.querySelector("video"),
    videoTimeline = container.querySelector(".video-timeline"),
    progressBar = container.querySelector(".progress-bar"),
    volumeBtn = container.querySelector(".volume i"),
    volumeSlider = container.querySelector(".left input");
  (currentVidTime = container.querySelector(".current-time")),
    (videoDuration = container.querySelector(".video-duration")),
    (skipBackward = container.querySelector(".skip-backward i")),
    (skipForward = container.querySelector(".skip-forward i")),
    (playPauseBtn = container.querySelector(".play-pause i")),
    (speedBtn = container.querySelector(".playback-speed span")),
    (speedOptions = container.querySelector(".speed-options")),
    (pipBtn = container.querySelector(".pic-in-pic span")),
    (fullScreenBtn = container.querySelector(".fullscreen i"));
  let timer;
  const hideControls = () => {
    if (mainVideo.paused) return;
    timer = setTimeout(() => {
      container.classList.remove("show-controls");
    }, 3000);
  };
  hideControls();
  container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();
  });
  const formatTime = (time) => {
    let seconds = Math.floor(time % 60),
      minutes = Math.floor(time / 60) % 60,
      hours = Math.floor(time / 3600);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    if (hours == 0) {
      return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  };
  videoTimeline.addEventListener("mousemove", (e) => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX =
      offsetX < 20
        ? 20
        : offsetX > timelineWidth - 20
        ? timelineWidth - 20
        : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
  });
  videoTimeline.addEventListener("click", (e) => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  });
  mainVideo.addEventListener("timeupdate", (e) => {
    let { currentTime, duration } = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
  });
  mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
  });
  const draggableProgressBar = (e) => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
  };
  volumeBtn.addEventListener("click", () => {
    if (!volumeBtn.classList.contains("fa-volume-high")) {
      mainVideo.volume = 0.5;
      volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
      mainVideo.volume = 0.0;
      volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
  });
  volumeSlider.addEventListener("input", (e) => {
    mainVideo.volume = e.target.value;
    if (e.target.value == 0) {
      return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  });
  speedOptions.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      mainVideo.playbackRate = option.dataset.speed;
      speedOptions.querySelector(".active").classList.remove("active");
      option.classList.add("active");
    });
  });
  document.addEventListener("click", (e) => {
    if (
      e.target.tagName !== "SPAN" ||
      e.target.className !== "material-symbols-outlined"
    ) {
      speedOptions.classList.remove("show");
    }
  });
  fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if (document.fullscreenElement) {
      fullScreenBtn.classList.replace("fa-compress", "fa-expand");
      return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
  });
  speedBtn.addEventListener("click", () =>
    speedOptions.classList.toggle("show")
  );
  pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
  skipBackward.addEventListener("click", () => (mainVideo.currentTime -= 5));
  skipForward.addEventListener("click", () => (mainVideo.currentTime += 5));
  mainVideo.addEventListener("play", () =>
    playPauseBtn.classList.replace("fa-play", "fa-pause")
  );
  mainVideo.addEventListener("pause", () =>
    playPauseBtn.classList.replace("fa-pause", "fa-play")
  );
  playPauseBtn.addEventListener("click", () =>
    mainVideo.paused ? mainVideo.play() : mainVideo.pause()
  );
  videoTimeline.addEventListener("mousedown", () =>
    videoTimeline.addEventListener("mousemove", draggableProgressBar)
  );
  document.addEventListener("mouseup", () =>
    videoTimeline.removeEventListener("mousemove", draggableProgressBar)
  );
}
if (window.location.pathname.includes("Profile.html")) {
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modalbox");
  const closebtn = document.querySelector(".closebtn");
  const card = document.querySelector(".card");
  window.addEventListener("load", (event) => {
    showModal();
  });
  function showModal() {
    card.style.display = "none";
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = "auto";
    modal.style.display = "flex";
  }
  function hideModal() {
    card.style.display = "block";
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = "none";
    modal.style.display = "none";
  }
  function setAbout() {
    let aboutUser = document.querySelector("#aboutm").value;
    hideModal();
    AboutID.textContent = aboutUser;
    name.textContent = getCookie("user");
  }
  const AboutID = document.getElementById("Aboutext");
  AboutID.addEventListener(
    "input",
    (e) => (textarea.value = e.target.innerHTML)
  );
  const name = document.getElementsByClassName("input")[0];
  name.addEventListener("input", (e) => (textarea.value = e.target.innerHTML));
  document.getElementById("bioe").addEventListener("click", () => {
    AboutID.focus();
    AboutID.textContent += " Type here...";
  });
  document.getElementById("uplload").onchange = function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        // e.target.result is a base64-encoded url that contains the image data
        document
          .getElementById("profile-pic")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(this.files[0]);
    }
  };
  const upl = document.getElementById("uplload");
  const dpl = document.querySelector(".upl");
  upl.addEventListener("change", function () {
    if (upl.files && upl.files[0]) {
      let img = document.querySelector("#profile-pic");
      img.onload = () => {
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(upl.files[0]);
      dpl.style.opacity = 0;
      dpl.style.backgroundPosition = "center";
      dpl.style.backgroundSize = "cover";
    }
  });
} else if (window.location.pathname.includes("Signout.html")) {
  const showSO = document.querySelector("#SObtn");
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modalbox");
  const closebtn = document.querySelector(".closebtn");
  const SOcard = document.querySelector("#SOcard");
  const name = document.querySelector("#name");
  name.textContent = getCookie("user");
  window.onload = function () {
    if (getCookie("remail") == null && getCookie("rpass") == null) {
      window.open("Account.html", "_self");
    } else if (getCookie("remail") != null) {
      console.log("Yes cookies");
    }
  };
  showSO.addEventListener("click", function () {
    SOcard.style.display = "none";
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = "auto";
    modal.style.display = "flex";
    overlay.addEventListener("click", function () {
      SOcard.style.display = "block";
      overlay.style.opacity = 0;
      overlay.style.pointerEvents = "none";
      modal.style.display = "none";
    });

    closebtn.addEventListener("click", function () {
      SOcard.style.display = "block";
      overlay.style.opacity = 0;
      overlay.style.pointerEvents = "none";
      modal.style.display = "none";
    });
  });
}

if (window.location.pathname.includes("Wered.html")) {
  const todoInput = document.querySelector(".todo-input");
  const todoButton = document.querySelector(".todo-button");
  const todoList = document.querySelector(".todo-list");
  const filterOption = document.querySelector(".filter-todo");

  document.addEventListener("DOMContentLoaded", getLocalTodos);
  todoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", deleteCheck);
  filterOption.addEventListener("change", filterTodo);

  function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADDING TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }

  function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      todo.classList.add("slide");

      removeLocalTodos(todo);
      todo.addEventListener("transitionend", function () {
        todo.remove();
      });
    }

    if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
    }
  }

  function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "incomplete":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
  }

  function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);

      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></li>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      todoList.appendChild(todoDiv);
    });
  }

  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

if (window.location.pathname.includes("QuranPlayer.html")) {
  fetchSurahs();
  let audio = document.querySelector(".QuranPlayer");
  let surahContainer = document.querySelector(".surahs");
  let ayah = document.querySelector(".ayah");
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  let play = document.querySelector(".play");
  function fetchSurahs() {
    fetch("http://api.alquran.cloud/v1/surah")
      .then((response) => response.json())
      .then((data) => {
        for (let name = 0; name < 114; name++) {
          surahContainer.innerHTML += `
                <div>
                    <p>${Object.values(data)[2][name].englishName}</p>
                </div>
            `;
        }

        let allSurahs = document.querySelectorAll(".surahs div"),
          AyahAudios,
          Ayahtext;
        allSurahs.forEach((surah, index) => {
          surah.addEventListener("click", () => {
            fetch("http://api.alquran.cloud/v1/quran/ar.alafasy")
              .then((response) => response.json())
              .then((data) => {
                AyahAudios = [];
                Ayahtext = [];
                let verses = Object.values(data)[2].surahs[index].ayahs;
                verses.forEach((verse) => {
                  AyahAudios.push(verse.audio);
                  Ayahtext.push(verse.text);
                });
                let ayahIndex = 0;
                changeAyah();
                audio.addEventListener("ended", () => {
                  ayahIndex++;
                  if (ayahIndex < AyahAudios.length) {
                    changeAyah(ayahIndex);
                  } else if (ayahIndex >= AyahAudios.length) {
                    ayahIndex = 0;
                    changeAyah(ayahIndex);
                    audio.pause();
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Surah Read!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    isPlaying = true;
                    togglePlay();
                    audio.play();
                  }
                });
                next.addEventListener("click", () => {
                  ayahIndex < AyahAudios.length - 1
                    ? ayahIndex++
                    : (ayahIndex = 0);
                  changeAyah(ayahIndex);
                });
                prev.addEventListener("click", () => {
                  ayahIndex == 0
                    ? (ayahIndex = AyahAudios.length - 1)
                    : ayahIndex--;
                  changeAyah(ayahIndex);
                });

                let isPlaying = false;
                function togglePlay() {
                  if (isPlaying) {
                    audio.pause();
                    play.innerHTML = `<i class="fa-solid fa-pause fa-beat"></i>`;
                    isPlaying = false;
                  } else {
                    audio.play();
                    play.innerHTML = `<i class="fa-solid fa-play fa-beat"></i>`;
                    isPlaying = true;
                  }
                }
                play.addEventListener("click", togglePlay);
                function changeAyah() {
                  audio.src = AyahAudios[ayahIndex];
                  ayah.textContent = Ayahtext[ayahIndex];
                }
              });
          });
        });
      });
  }
}
