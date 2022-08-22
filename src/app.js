// color theme
const theme = document.getElementById("theme");

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
const btn = document.getElementById("submit-btn");

const getUser = async () => {
  const username = document.getElementById("github-username").value;
  const api_link = `https://api.github.com/users/${username}`;
  const res = await fetch(api_link, { catche: "no-catche" });
  const data = await res.json();

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
  if (!res.ok) {
    error.style.display = "block";
    location.innerHTML = "No results";
    page.innerHTML = "No results";
    twitter.innerHTML = "No results";
    company.innerHTML = "No results";
    repos.innerHTML = "0";
    follower.innerHTML = "0";
    following.innerHTML = "0";
  } else {
    error.style.display = "none";
  }

  name.innerHTML = data.name;
  user.innerHTML = `@${data.login}`;

  // fix image
  const avatar = document.getElementById("avatar");
  const profilePic = document.createElement("img");
  profilePic.src = data.avatar_url;
  avatar.appendChild(profilePic);

  // fix month
  const date = document.getElementById("date");
  const currentDate = data.created_at;
  const formatedDate = currentDate.split("T").shift().split("-");
  date.innerHTML = `Joined ${formatedDate[2]} ${formatedDate[1]} ${formatedDate[0]} `;

  data.bio === null
    ? (about.innerHTML = "This profile has no bio.")
    : (about.innerHTML = data.bio);

  repos.innerHTML = data.public_repos;
  follower.innerHTML = data.followers;
  following.innerHTML = data.following;

  data.location === null
    ? (location.innerHTML = "Not Available")
    : (location.innerHTML = data.location);

  data.blog === ""
    ? (page.innerHTML = "Not Available")
    : (page.innerHTML = data.blog);

  data.twitter_username === null
    ? (twitter.innerHTML = "Not Available")
    : (twitter.innerHTML = data.twitter_username);

  data.company === null
    ? (company.innerHTML = "Not Available")
    : (company.innerHTML = data.company);
};

btn.addEventListener("click", getUser);
// add event listener for enter