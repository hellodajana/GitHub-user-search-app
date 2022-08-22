const theme = document.getElementById("theme");
const input = document.getElementById("github-username");
const btn = document.getElementById("submit-btn");

// color theme
theme.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  changeImageAndText();
});

function changeImageAndText() {
  const image = document.getElementById("icon-mode");
  const text = document.getElementById("theme-name");

  if (image.getAttribute("src") == "assets/icon-moon.svg") {
    image.src = "assets/icon-sun.svg";
    text.innerHTML = "Light";
  } else {
    image.src = "assets/icon-moon.svg";
    text.innerHTML = "Dark";
  }
}

// profile search
const getUser = async () => {
  const username = input.value;
  const api_link = `https://api.github.com/users/${username}`;
  const res = await fetch(api_link, { catche: "no-catche" });
  const data = await res.json();
  getProfile(data, res);
};

// show profile
function getProfile(profile, result) {
  const name = document.getElementById("github-name");
  const user = document.getElementById("github-user");
  const about = document.getElementById("bio");
  const repos = document.getElementById("repo");
  const follower = document.getElementById("follower");
  const following = document.getElementById("following");
  const location = document.getElementById("location");
  const page = document.getElementById("page");
  const twitter = document.getElementById("twitter");
  const company = document.getElementById("company");

  const error = document.getElementById("search-error");
  if (!result.ok) {
    error.style.display = "block";
    location.innerHTML = "Not Available";
    page.innerHTML = "Not Available";
    twitter.innerHTML = "Not Available";
    company.innerHTML = "Not Available";
    repos.innerHTML = "0";
    follower.innerHTML = "0";
    following.innerHTML = "0";
  } else {
    error.style.display = "none";
  }

  name.innerHTML = profile.name;
  user.innerHTML = `@${profile.login}`;

  const avatar = document.getElementById("avatar");
  avatar.innerHTML = `<img src=${profile.avatar_url}"/>`;

  // fix month
  const date = document.getElementById("date");
  const currentDate = profile.created_at;
  const formatedDate = currentDate.split("T").shift().split("-");
  date.innerHTML = `Joined ${formatedDate[2]} ${formatedDate[1]} ${formatedDate[0]} `;

  profile.bio === null
    ? (about.innerHTML = "This profile has no bio.")
    : (about.innerHTML = profile.bio);

  repos.innerHTML = profile.public_repos;
  follower.innerHTML = profile.followers;
  following.innerHTML = profile.following;

  profile.location === null
    ? (location.innerHTML = "Not Available")
    : (location.innerHTML = profile.location);

  profile.blog === ""
    ? (page.innerHTML = "Not Available")
    : (page.innerHTML = profile.blog);

  profile.twitter_username === null
    ? (twitter.innerHTML = "Not Available")
    : (twitter.innerHTML = profile.twitter_username);

  profile.company === null
    ? (company.innerHTML = "Not Available")
    : (company.innerHTML = profile.company);
}

// event listener for button
btn.addEventListener("click", getUser);

// event listener for enter
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btn.click();
  }
});
