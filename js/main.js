function getTimeOfDay() {
    let wish = document.querySelector('.wish');
    let wrapper = document.querySelector('.wrapper');
    let timeIcon = document.querySelector('.time-icon');
    let spoilerBlock = document.querySelector('.spoiler-wrapper');
    let currentLocation = document.querySelector('.current-location');
    let spoilerItemName = document.querySelectorAll('.item-name');
    let spoilerItemValue = document.querySelectorAll('.item-value');

    datetoday = new Date();  
    let thehour = datetoday.getHours();

    if (thehour >= 6 && thehour < 10) {
        wrapper.style.backgroundImage = "url('../images/morning-bg.png')";
        timeIcon.style.backgroundImage = "url('../images/sun.svg')";
        spoilerBlock.style.background = "rgba(255, 255, 255, 0.75)";
        spoilerItemName.forEach((item)  => {
            item.style.color = "#303030";
        })
        spoilerItemValue.forEach((item)  => {
            item.style.color = "#303030";
        })
        if (window.innerWidth <= 650) {
            wish.innerHTML = 'GOOD MORNING';
        } else {
            wish.innerHTML = 'GOOD MORNING, IT’S CURRENTLY';
        }
    }
    if (thehour >= 10 && thehour < 16) {
        wrapper.style.backgroundImage = "url('../images/morning-bg.png')";
        timeIcon.style.backgroundImage = "url('../images/sun.svg')";
        spoilerBlock.style.background = "rgba(255, 255, 255, 0.75)";
        spoilerItemName.forEach((item)  => {
            item.style.color = "#303030";
        })
        spoilerItemValue.forEach((item)  => {
            item.style.color = "#303030";
        })
        if (window.innerWidth <= 650) {
            wish.innerHTML = 'GOOD AFTERNOON';
        } else {
            wish.innerHTML = 'GOOD AFTERNOON, IT’S CURRENTLY';
        }
    }
    if (thehour >= 16 && thehour < 22) {
        wrapper.style.backgroundImage = "url('../images/night-bg.png')";
        timeIcon.style.backgroundImage = "url('../images/moon.svg')";
        spoilerBlock.style.background = "rgba(0, 0, 0, 0.75)";
        if (window.innerWidth <= 650) {
            wish.innerHTML = 'GOOD EVENING';
        } else {
            wish.innerHTML = 'GOOD EVENING, IT’S CURRENTLY';
        }
    }
    if (thehour < 6 || thehour >= 22) {
        wrapper.style.backgroundImage = "url('../images/night-bg.png')";
        timeIcon.style.backgroundImage = "url('../images/moon.svg')";
        spoilerBlock.style.background = "rgba(0, 0, 0, 0.75)";
        if (window.innerWidth <= 650) {
            wish.innerHTML = 'GOOD NIGHT';
        } else {
            wish.innerHTML = 'GOOD NIGHT, IT’S CURRENTLY';
        }
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    currentLocation.innerHTML = 'In ' + timezone;
}

getTimeOfDay();

function zeroFormat(value) {
    if (value < 10) {
        value = '0' + value;
    }
    return value;
}

function dateTime() {
    let currentDateTime = new Date();
    let hours = zeroFormat(currentDateTime.getHours());
    let minutes = zeroFormat(currentDateTime.getMinutes());
    return hours + ":" + minutes;
}

setInterval(function () {
    let currentTime = document.querySelector('.current-time');
    currentTime.innerHTML = dateTime();
}, 500);

const getNewQuote = async () => {
    const text = document.querySelector('.quote-item');
    const author = document.querySelector('.quote-author');

    let url="https://type.fit/api/quotes";
    const response = await fetch(url); 
    const allQuotes = await response.json();

    const index = Math.floor(Math.random() * allQuotes.length);
    const quote = allQuotes[index].text;
    const auth = allQuotes[index].author;

    if (auth == null) {
        author = "Anonymous";
    }

    text.innerHTML = '"' + quote + '"';
    author.innerHTML = auth;
}

getNewQuote();

function clickMore () {
    let quoteGenerator = document.querySelector('.quote-generator');
    let btnText = document.querySelector('.btn-text');
    let btnIcon = document.querySelector('.btn-icon');
    let spoilerBlock = document.querySelector('.spoiler-wrapper');
    let timezoneValue = document.querySelector('.timezone-value');
    let dayWeekValue = document.querySelector('.dayweek-value');
    let dayYearValue = document.querySelector('.dayyear-value');
    let weekValue = document.querySelector('.week-value');
    
    let active = btnIcon.classList.contains('btn-active-icon');
    
    btnIcon.classList.toggle('btn-active-icon');

    quoteGenerator.style.display = 'none';
    btnText.innerHTML = 'less';
    spoilerBlock.style.display = 'block';

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneValue.innerHTML = timezone;
    let dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0) {
        dayOfWeek = 7;
    }
    dayWeekValue.innerHTML = dayOfWeek;
    const dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    dayYearValue.innerHTML = dayOfYear(new Date());
    let weekNumber = Math.ceil(dayOfYear(new Date()) / 7);
    weekValue.innerHTML = weekNumber;
    if (active) {
        quoteGenerator.style.display = 'block';
        btnText.innerHTML = 'more';
        spoilerBlock.style.display = 'none';
    }
}
