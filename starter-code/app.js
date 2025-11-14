
/*Initializing the variables */
const form = document.querySelector('.search')
const input = document.querySelector('.search-input')
const searchButton = document.querySelector('.search-btn')
const card = document.querySelector ('.card')

const elName = document.querySelector('.name')
const elogin = document.querySelector('.login')
const eljoined = document.querySelector('.joined')
const elbio = document.querySelector('.bio')

const elrepos = document.querySelector('.repos')
const elfollowers = document.querySelector('.followers')
const elfollowing = document.querySelector('.following')
const image = document.querySelector('.image-icon img') 
const list = document.querySelector('.card > ul')

const elLocation = document.querySelector('.location-text');
const elWebsite = document.querySelector('.website-text');
const elTwitter = document.querySelector('.twitter-text');
const elCompany = document.querySelector('.company-text');

const themeBtn  = document.querySelector('.theme-toggle');
const themeLbl  = document.querySelector('.theme-label');
const root      = document.documentElement;

/*Form Functionality */
form.addEventListener('submit',async function (e)
{
    e.preventDefault();
    const username = input.value.trim();
    if (!username) return;
    console.log('Searching for .......', username);
    await getUser(username);
})

/*Getting the info from the API*/
async function getUser(username){
    try {
      console.log({username})
      const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
        const response  = await fetch(url);

        if(!response.ok){
            throw new  Error('User Not Found!');
        }

        const data = await response.json()
        showUser(data);
    }catch (err){
        console.error('Something went wrong!!!')
    }
}
/* DARK MODE */
function applyTheme(mode){
  if (mode === 'dark') {
    root.classList.add('dark');
    themeLbl.textContent = 'LIGHT';
  } else {
    root.classList.remove('dark');
    themeLbl.textContent = 'DARK';
  }
  localStorage.setItem('theme', mode);
}

applyTheme(localStorage.getItem('theme') || 'light');

themeBtn.addEventListener('click', () => {
  const next = root.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(next);
});


/*API to DOM */
function showUser(data) {
  image.src = data.avatar_url || '';
  image.alt = `${data.name || data.login} avatar`;

  elName.textContent = data.name || data.login || '';
  elogin.textContent = data.login ? `@${data.login}` : '';
  eljoined.textContent = formatDate(data.created_at);
  elbio.textContent = data.bio || "This user is God's child. ";

  elrepos.textContent = data.public_repos ?? 0;
  elfollowers.textContent = data.followers ?? 0;
  elfollowing.textContent = data.following ?? 0;

  elLocation.textContent = data.location || 'Not Available';

  if (data.blog) {
    const href = data.blog.startsWith('http') ? data.blog : `https://${data.blog}`;
    elWebsite.href = href;
    elWebsite.textContent = data.blog;
  } else {
    elWebsite.removeAttribute('href');
    elWebsite.textContent = 'Not Available';
  }

  elTwitter.textContent = data.twitter_username ? `@${data.twitter_username}` : 'Not Available';
  elCompany.textContent = data.company || 'Not Available';
}

/*Fixing the Date */
function formatDate(apidate) {
  if (!apidate) return '';
  const d = new Date(apidate);
  const day = d.getDate().toString().padStart(2, '0');
  const mon = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `Joined ${day} ${mon} ${year}`;
}

