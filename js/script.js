"use strict";
// Selecting Inputs
let titleInput = document.getElementById("titleInput");
let postInput = document.getElementById("postTextArea");
let userInput = document.getElementById("userNme");
let passwordInput = document.getElementById("userPassword");

// Selecting Post Items
let addImg = document.getElementById("addImg");
let addLink = document.getElementById("addLink");
let addLine = document.getElementById("addLine");

// Selecting Buttons
let postBtn = document.getElementById("postBtn");
let resetBtn = document.getElementById("resetBtn");
let loginBtn = document.getElementById("signIn");
let deletBtn;

// Element
let loginEl = document.getElementById("loginForm");
let loginDisplay = document.getElementById("loginDisplay");
let logOutEl = document.getElementById("logOut");
let newPostEl = document.getElementById("newPost");

// Select Output
let postsContainer = document.querySelector(".posts-container");

// declaring posts Array of objects
let myPosts = [];
if (localStorage.myPosts) {
  myPosts = JSON.parse(localStorage.myPosts);
} else {
  myPosts = [
    {
      title: "Defult Post 1",
      post: "This is a defult post\n<img src='./imgs/tempimg.png'>",
    },
    {
      title: "Defult Post 2",
      post: "This is a defult post\n<br><img src='./imgs/tempimg.png'>",
    },
  ];
}
let currentlyIn = localStorage.currentlyIn
  ? JSON.parse(localStorage.currentlyIn)
  : false;

let adminDetails = {
  userName: "admin",
  password: "admin",
};

// clear inputs
function clearInputs() {
  titleInput.value = "";
  postInput.value = "";
  titleInput.blur();
  postInput.blur();
}

// create post element
let creatPost = function (postObj) {
  let post = document.createElement("article");
  let currentPostTitle = document.createElement("h3");
  let currentPostContent = document.createElement("p");
  let deletBtn = document.createElement("button");
  deletBtn.classList.add("delet-btn");
  deletBtn.textContent = "×";
  currentPostTitle.textContent = postObj.title;
  currentPostContent.innerHTML = postObj.post.replaceAll("\n", "<br>");
  post.append(currentPostTitle);
  post.append(currentPostContent);
  post.append(deletBtn);
  postsContainer.prepend(post);
};

// display Posts
let displayPosts = function () {
  if (myPosts.length > 0) {
    postsContainer.innerHTML = "";
    myPosts.forEach((obj) => creatPost(obj));
  }
};
displayPosts();

// Post Button to push post to array
postBtn.addEventListener("click", (e) => {
  if (titleInput.value.trim() && postInput.value.trim()) {
    myPosts.push({
      title: titleInput.value,
      post: postInput.value,
    });
    localStorage.myPosts = JSON.stringify(myPosts);
  }
  clearInputs();
  displayPosts();
  deletePostBtn();
});

// delete post
function deletePostBtn() {
  deletBtn = [...document.querySelectorAll(".delet-btn")].reverse();
  deletBtn.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      console.log(i);
      myPosts.splice(i, 1);
      localStorage.myPosts = JSON.stringify(myPosts);
      btn.parentElement.remove();
    });
  });
}
deletePostBtn();

// Reset Button
resetBtn.addEventListener("click", (e) => {
  clearInputs();
});

// make post Items work
addImg.addEventListener("click", () => {
  postInput.value = postInput.value + `<img src='./imgs/tempimg.png'>`;
});
addLink.addEventListener("click", () => {
  postInput.value = postInput.value + `<a href='#'>Link</a>`;
});
addLine.addEventListener("click", () => {
  postInput.value = postInput.value + `<br>`;
});

// Loging to post

let displayLog = false;
loginDisplay.addEventListener("click", () => {
  check(!displayLog);
  displayLog = !displayLog;
});

let check = function (current) {
  if (current) loginEl.style.display = "flex";
  if (!current) loginEl.style.display = "none";
};

// check user Details and login
loginBtn.addEventListener("click", () => {
  if (
    userInput.value === adminDetails.userName &&
    passwordInput.value === adminDetails.password
  ) {
    check(!displayLog);
    displayLog = !displayLog;
    currentlyIn = true;
    localStorage.currentlyIn = JSON.stringify(currentlyIn);
    checkUserState();
  }
  userInput.value = passwordInput.value = "";
  passwordInput.blur();
});

// Logout
logOutEl.addEventListener("click", () => {
  if (currentlyIn) {
    currentlyIn = false;
    localStorage.currentlyIn = JSON.stringify(currentlyIn);
    checkUserState();
  }
});

// check if currently loged in

let checkUserState = function () {
  if (currentlyIn) {
    logOutEl.style.display = "initial";
    loginDisplay.style.display = "none";
    newPostEl.style.display = "block";
    deletBtn.forEach((btn) => {
      btn.style.display = "initial";
      btn.disabled = false;
    });
  } else {
    logOutEl.style.display = "none";
    loginDisplay.style.display = "initial";
    newPostEl.style.display = "none";
    deletBtn.forEach((btn) => {
      btn.style.display = "none";
      btn.disabled = true;
    });
  }
};

checkUserState();
