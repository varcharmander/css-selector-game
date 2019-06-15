let inputSelector = document.getElementById('input-selector');
let levelTitle = document.getElementById('level-title');
let levelSubTitle = document.getElementById('level-sub-title');
let levelDescription = document.getElementById('level-description');

let searchParams = null;

let levelConfig = [
    {
        'level': 0,
        'type': 'Simple selectors',
        'description': 'select simple selector tag',
        'solutionIndex': [0],
        'solution': 'p',
        'options': ['<p>hola<p>', '<p class="jaja"> adios <p>']
    },
    {
        'level': 1,
        'type': 'Attribute selectors',
        'description': 'select simple selector class',
        'solutionIndex': [1],
        'solution': '.me',
        'options': ['<p id="hi"> hola <p>', '<p class="me"> cuando <p>']
    },
    {
        'level': 2,
        'type': 'Pseudo-classes',
        'description': 'select simple selector id',
        'solutionIndex': [1],
        'solution': '#see',
        'options': ['<p>hola<p>', '<p id="see"> cuando<p>']
    },
    {
        'level': 3,
        'type': 'Pseudo-elements',
        'description': 'Second level',
        'solutionIndex': [1],
        'solution': 'p',
        'options': ['<p>hola<p>', '<p>cuando<p>']
    },
    {
        'level': 4,
        'type': 'Combinators',
        'description': 'Second level',
        'solutionIndex': [1],
        'solution': 'p',
        'options': ['<p>hola<p>', '<p>cuando<p>']
    },
    {
        'level': 5,
        'type': 'Multiple selectors',
        'description': 'Second level',
        'solutionIndex': [1],
        'solution': 'p',
        'options': ['<p>hola<p>', '<p>cuando<p>']
    }
];

let level = 0;

function analyzeSelector() {
    console.log(inputSelector.value);
    let inputValue = inputSelector.value;
    let currentLevel = levelConfig[level];

    if (inputValue === currentLevel.solution) {
        this.addClassToElementById(currentLevel.solutionIndex, 'highlight');
    } else {
        this.removeClassToElementById(currentLevel.solutionIndex, 'highlight');
    }
}

function addClassToElementById(indexes, className) {
    indexes.forEach(index => {
        let option = document.getElementById(index.toString());
        option.classList.add(className);
    })
};

function removeClassToElementById(indexes, className) {
    indexes.forEach(index => {
        let option = document.getElementById(index.toString());
        option.classList.remove(className);
    })
};

function modifyQueryParam(name, value) {
    searchParams.set(name, value);
    window.location.search = searchParams.toString();
}

function setNewLevel(level) {
    level = parseInt(level);
    
    if (level > (levelConfig.length - 1) || isNaN(level)) {
        level = 0;
        this.modifyQueryParam('level', level.toString());
    }
    console.log(level, typeof(level));
    
    inputSelector.value = '';
    levelConfig[level].options.forEach((option, index) => {
        const optionsList = document.getElementById('options');
        const listItem = document.createElement('li');
        listItem.id = index.toString();
        listItem.innerText = option;
        optionsList.appendChild(listItem);
    });
    levelTitle.innerText = 'Level: ' + level;
    levelSubTitle.innerHTML = levelConfig[level].type;
    levelDescription.innerText = levelConfig[level].description;
}

function next() {
    let currentLevel = searchParams.get("level");
    this.modifyQueryParam('level', (parseInt(currentLevel) + 1).toString());
}

function back() {
    let currentLevel = searchParams.get("level");
    this.modifyQueryParam('level', (parseInt(currentLevel) - 1).toString());
}

//function set

(function () {
    let paramsString = location.search;
    searchParams = new URLSearchParams(paramsString);
    let level = searchParams.get("level");
    if (typeof(level) === 'string') {
        console.log('number');
    } else {
        console.log('other');
    }
    
    if (level) {
        this.setNewLevel(level);
    } else {
        searchParams.set("level", "0");
        window.location.search = searchParams.toString();
        this.setNewLevel(0);
    }
})();


