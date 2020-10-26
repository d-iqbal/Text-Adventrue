const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-butoons');

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNode.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.test;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.array.forEach(oprion => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }        
    });
}

function showOption (option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText

    if (nextTextNodeId <= 0) {
        return startGame()
    }

    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you a jar of blue goo near you.',

        option: [
            {
                text: 'Take goo',
                setState: {blueGoo: true},
                nextText: 2
            },
            
            {
                text: 'Leave the goo',
                nextText: 2,
            }
        ] 
    },

    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        option: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText4: 3
            },

            {
                text: 'Trade the goo for a gun',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, gun: true},
                nextText4: 3,  
            },

            {
                text: 'Ignore the merchant',
                nextText4: 3,  
            }

        ]
    },

    {
        id: 3,
        text: '',

        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText4: 3
            },

            {
                text: 'Trade the goo for a gun',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, gun: true},
                nextText4: 3,  
            },

            {
                text: 'Ignore the merchant',
                nextText4: 3,  
            }


        ]
    }
] 

startGame()