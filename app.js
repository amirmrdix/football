const allNTeame = document.querySelector('.all-national-teams');
const allTeame = document.querySelector('.all-teams');
const allLeagues = document.querySelector('.all-leagues');
const allPlayer = document.querySelector('.all-player');
const search = document.querySelector('.search');
const resultContainer = document.querySelector('.result-container');
const contentContainer = document.querySelector('.content-container');
const imgBackground = document.querySelector('.img-container');

let comparisonTeams = [];

document.addEventListener('DOMContentLoaded',getAllTeams);



function getAllTeams() {
    axios
    .get('teams.txt')
    .then(res => {
        const allData = res.data;
        countingNTeams(allData.Global.NationalTeams,10,allNTeame)
        countingTeams(allData.Global.Teams,50,allTeame)
        countingLeagues(allData.Global.Leagues,15,allLeagues)
        countingPlayer(allData.Global.Player,100,allPlayer)

        search.addEventListener('input',()=>{searchTeams(allData)});
    })
}


//! فانکشن های گرفتن تعداد تیم ها و اطلاعات دیگر
function countingNTeams(number,delay,element) {
    let count = number - delay;

    const intCount = setInterval(() => {
        if(count >= number) clearInterval(intCount)

        count++
        element.innerHTML = count
    }, 100);
}
function countingTeams(number,delay,element) {
    let count = number - delay;

    const intCount = setInterval(() => {
        if(count >= number) clearInterval(intCount)

        count++
        element.innerHTML = count
    }, 30);
}
function countingLeagues(number,delay,element) {
    let count = number - delay;

    const intCount = setInterval(() => {
        if(count >= number) clearInterval(intCount)

        count++
        element.innerHTML = count
    }, 100);
}
function countingPlayer(number,delay,element) {
    let count = number - delay;

    const intCount = setInterval(() => {
        if(count >= number) clearInterval(intCount)

        count++
        element.innerHTML = `+${numeral(count).format('0,0')}`
    }, 20);
}




//! سرچ کردن تیم
function searchTeams(allData) {
    const searchValue = search.value.toLowerCase()

    const searchResult = [];
    comparisonTeams.splice(0,2)

    for (const data in allData) {
        const teams = allData[data]

        if(teams.hasOwnProperty("club_name") && teams.club_name.toLowerCase().includes(searchValue)){
            searchResult.push(teams)
        }
    }

    createSearchResult(searchResult,searchValue,allData)
}






//! فانکشن ساخت نتیجه سرچ
function createSearchResult(searchResult,searchValue,allData) {
    if(searchValue.length <= 1) {
        resultContainer.innerHTML = '';
        return
    }
    resultContainer.innerHTML = '';


    searchResult.forEach(team => {
        const teamElement = document.createElement('div');
        teamElement.classList.add('search-result');

        teamElement.innerHTML = `
            <img src="${team.logo_url}">
            <p>${team.club_name}</p>
        `

        resultContainer.appendChild(teamElement);
        teamElement.addEventListener('click',()=>{createTeamCard(team,allData)})
    });
}




//! فانکشن ساخت کارت اطلاعات تیم
function createTeamCard(team,allData) {
    resultContainer.innerHTML = '';
    search.value = ''

    contentContainer.innerHTML = `
        <div class="team-card"  style='${teamFrequency(team.fans_count)}'>
            <header>
                <img src="${team.logo_url}">

                <div class="card-title">
                    <h3>${team.club_name}</h3>
                    <p>${team.country}</p>
                </div>

                <i class="fas fa-x exit"></i>
            </header>


            <main>
                <p>Club : <span>${team.club_name}</span></p>
                <p>Manager : <span>${team.manager_name}</span></p>
                <p>Stadium : <span>${team.stadium_name}</span></p>
                <p>League : <span>${team.league_name}</span></p>
                <p>Country : <span>${team.country}</span></p>
                <p>Fans count : <span>${team.fans_count}</span></p>
                <button class="Comparison">Comparison</button>
            </main>
        </div>
    `


    document.querySelector('.Comparison').addEventListener('click',()=>{getComparison(allData)});

    
    document.querySelector('.exit').addEventListener('click',()=>{
        window.location.reload();
    })

    
    comparisonTeams.push(team)
}




//! فانکشن سایه کارت تیم ها
function teamFrequency(fansCount) {
    const frequency = parseInt(fansCount)
    if (frequency >= 100) {
        return `box-shadow: 0 0 15px rgb(255, 255, 0);`
    }
    else if (frequency >= 80) {
        return `box-shadow: 0 0 15px rgb(195, 195, 0);`
    }
    else if (frequency >= 50) {
        return `box-shadow: 0 0 15px rgb(145, 145, 0);`
    }
    else if (frequency >= 30) {
        return `box-shadow: 0 0 15px rgb(120, 120, 0);`
    }
    else if (frequency >= 15) {
        return `box-shadow: 0 0 15px rgb(100, 100, 0);`
    }
    else if (frequency < 15) {
        return `box-shadow: 0 0 15px rgb(55, 55, 55);`
    }
}






//! فانکشن ساخت باکس مقایسه
function getComparison(allData) {
    imgBackground.innerHTML = `
        <div class="search-container-c" style="display: block;">
            <div class="search-sec-c">
                <input type="text" class="search-c" placeholder="Search Team...">
                <i class="fa fa-search"></i>
            </div>

            <div class="result-container-c"></div>
        </div>
    `
    document.querySelector('.search-container-c .search-sec-c input').addEventListener('input',()=>{searchTeamsC(allData)})
}


//! فانکشن سرچ کردن مقایسه
function searchTeamsC(allData) {
    const searchValue = document.querySelector('.search-container-c .search-sec-c input').value.toLowerCase()

    const searchResult = [];

    for (const data in allData) {
        const teams = allData[data]

        if(teams.hasOwnProperty("club_name") && teams.club_name.toLowerCase().includes(searchValue)){
            searchResult.push(teams)
        }
    }

    createSearchResultC(searchResult,searchValue,allData)
}



//! ساخت نتیجه سرچ باکس مقایسه
function createSearchResultC(searchResult,searchValue,allData) {
    if(searchValue.length <= 1) {
        document.querySelector('.result-container-c').innerHTML = '';
        return
    }
    document.querySelector('.result-container-c').innerHTML = '';


    searchResult.forEach(team => {
        const teamElement = document.createElement('div');
        teamElement.classList.add('search-result-c');

        teamElement.innerHTML = `
            <img src="${team.logo_url}">
            <p>${team.club_name}</p>
        `

        document.querySelector('.result-container-c').appendChild(teamElement);
        teamElement.addEventListener('click',()=>{createTeamCardC(team,allData)})
    });
}





//! فامکشن ساخت کارت تیم مقایسه شده
function createTeamCardC(team,allData){
    document.querySelector('.result-container-c').innerHTML = '';
    document.querySelector('.search-container-c .search-sec-c input').value = ''
    document.querySelector('header nav').innerHTML = ''
    document.querySelector('main').style.marginTop = '8rem'



    imgBackground.innerHTML = `
        <div class="team-card"  style='${teamFrequency(team.fans_count)}'>
            <header>
                <img src="${team.logo_url}">

                <div class="card-title">
                    <h3>${team.club_name}</h3>
                    <p>${team.country}</p>
                </div>

            </header>


            <main>
                <p>Club : <span>${team.club_name}</span></p>
                <p>Manager : <span>${team.manager_name}</span></p>
                <p>Stadium : <span>${team.stadium_name}</span></p>
                <p>League : <span>${team.league_name}</span></p>
                <p>Country : <span>${team.country}</span></p>
                <p>Fans count : <span>${team.fans_count}</span></p>
                <button class="back">Back</button>
            </main>
        </div>
    `


    
    document.querySelector('.exit').addEventListener('click',()=>{
        window.location.reload();
    })

    document.querySelector('.back').addEventListener('click',()=>{
        imgBackground.innerHTML = '<img src="assets/bg.gif">'
        
        comparisonTeams.pop()
        
        document.querySelector('.comResult').innerHTML = ''

        document.querySelector('header nav').innerHTML = `
            <div class="search-container">
                <div class="search-sec">
                    <input type="text" class="search" placeholder="Search Team...">
                    <i class="fa fa-search"></i>
                </div>

                <div class="result-container"></div>
            </div>


            <div class="logo-container">
                <img src="assets/logo.png">
            </div>
        `

        document.querySelector('main').style.marginTop = '0'
    })

    comparisonTeams.push(team)
    

    




    if(parseInt(comparisonTeams[0].fans_count) > parseInt(comparisonTeams[1].fans_count)){
        document.querySelector('.comResult').innerHTML = `
            <span>${comparisonTeams[0].club_name}</span> is a better team than <span>${comparisonTeams[1].club_name}</span>
        `
    }

    else if(parseInt(comparisonTeams[0].fans_count) < parseInt(comparisonTeams[1].fans_count)){
        document.querySelector('.comResult').innerHTML = `
            <span>${comparisonTeams[1].club_name}</span> is a better team than <span>${comparisonTeams[0].club_name}</span>
        `
    }

    else if(parseInt(comparisonTeams[0].fans_count) === parseInt(comparisonTeams[1].fans_count)){
        document.querySelector('.comResult').innerHTML = 'The teams are tied'
    }
}