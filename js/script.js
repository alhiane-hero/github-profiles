const form = document.getElementById('form');
const searchUser = document.getElementById('search-user');
const apiUrl = `https://api.github.com/users/`;
const githubUser = document.querySelector('.github-user');

async function fetchGithubUsersApi(term) {
    fetch(apiUrl + term).then(resp => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error('No profile with this username');
        }
    }).then(respData => {
        addGithubUser(respData);
    }).catch(error => errorFunc(error));
}

function addGithubUser(data) {
    // clear container:
    githubUser.innerHTML = '';
    // create new user:
    let userBox = document.createElement('div');
    userBox.classList.add('user');
    let {avatar_url, followers, following, name, public_repos, bio} = data;
    let userInfo = `<div class="user-img">
        <img src="${avatar_url}" alt="${name}">
    </div>  
    <div class="user-info">
        <div class="personal-info">
            <h2 class="user-name">${name}</h2>
            <span class="user-bio">${bio}</span>
        </div>
        <div class="public-info">
            <p>${followers} Followers</p>
            <p>${following} Following</p>
            <p>${public_repos} Repos</p>
        </div>
    </div>
    <a href="#" class="btn follow-btn">Follow</a>`;
    userBox.innerHTML = userInfo;

    // follow - unfollow:
    let btn = userBox.querySelector('.btn');
    btn.addEventListener('click', event => {
        event.preventDefault();
        if (event.target.classList.contains('follow-btn')) {
            event.target.classList.remove('follow-btn');
            event.target.classList.add('unfollow-btn');
            event.target.innerHTML = 'Unfollow';
        } else {
            event.target.classList.add('follow-btn');
            event.target.classList.remove('unfollow-btn');
            event.target.innerHTML = 'Follow';
        }
    });

    githubUser.appendChild(userBox);
}

// when no user with name that input:
function errorFunc(error) {
    // clear container:
    githubUser.innerHTML = '';
    let userBox = document.createElement('div'); 
    userBox.classList.add('user');
    userBox.innerHTML = `<h3 class='error'>${error}</h3>`;
    githubUser.appendChild(userBox);
}

// submit form:
form.addEventListener('submit', e => {
    e.preventDefault();
    let term = searchUser.value;
    if (term !== '') fetchGithubUsersApi(term);
    else {
        errorFunc('Error: Empty input please enter user name!');
    };
    searchUser.value = '';
    searchUser.focus();
});