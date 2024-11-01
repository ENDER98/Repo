const APIRURL = "https://api.github.com/users/";


const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");


async function getUser(username) {

    try {

        const { data } = await axios(APIRURL + username);
        createCard(data);

        getRepos(username);

    } catch (error) {
        console.log(error);
    }

}

function createCard(user) {

    const cardHtml= `
    <div class="card">
        <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
    
        <div class="user-info">
            <h2>${user.login}</h2>
            <p>${user.bio}</p>

            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>

            <div id="repos"></div>
        </div>
    </div>
    `;

    main.innerHTML = cardHtml;

};

async function getRepos(username) {

    try {

        const { data } = await axios(APIRURL + username + "/repos?sort=created");
        addReposToCard(data);

    } catch (error) {
        console.log(error);
    }

}

function addReposToCard(repos) {

    const reposEl = document.getElementById("repos");

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement("a");

            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;

            repoEl.target = "_blank";

            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);

        });

}


form.addEventListener("submit", (e) => {

    e.preventDefault();

    const user = search.value;

    if (user) {

        getUser(user);

        search.value = "";
    }
});