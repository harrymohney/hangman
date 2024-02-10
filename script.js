const alpha = Array.from(Array(26)).map((e, i) => i + 65)
	const alphabet = alpha.map((x) => String.fromCharCode(x))
	const counter = document.querySelector('.count-container')
	let curentCount = Number()

	let word = ""
	let wordTemplate = []

	const main = () => {
		document.querySelector('#form').addEventListener('submit', createWord)
	}
	const createWord = (event) => {
		event.preventDefault()
		const input = document.querySelector('#newWord')
		word = input.value.trim().toUpperCase()
		input.value = ""
		if (!word) {
			return
		}
		createAlphaBetButtons()
		createWordTemplate()
	}

	const createAlphaBetButtons = () => {
    const alphabetWrapper = document.querySelector('#alphabet')
    alphabetWrapper.innerHTML = ""
    alphabet.forEach((letter) => {
        const button = document.createElement('button')
        button.id = letter
        button.textContent = letter
        button.addEventListener('click', (event) => {
            event.preventDefault()
            checkLetter(event.target.id)
            event.target.classList.add('hide')
        })
        alphabetWrapper.appendChild(button)
    })
}

	const createWordTemplate = () => {
		wordTemplate.length = word.length
		wordTemplate.fill(null)
		renderWord()
	}
	const renderWord = () => {
		let output = ""
		for (let i = 0; i < wordTemplate.length; i++) {
			if (wordTemplate[i]) {
				output += wordTemplate[i]
			}
			else {
				output += "_"
			}
		}
		document.querySelector('#word').innerHTML = ""
		document.querySelector('#word').innerHTML = output
	}
	let curnum = document.querySelector('.count-container')
	const checkLetter = (letter) => {
		console.log(letter)
		console.log(wordTemplate)
		if (wordTemplate.join('') !== word) {
			for (let i = 0; i < word.length; i++) {
				if (word[i] === (letter)) {
					wordTemplate[i] = letter
					curentCount += 10
				}
			}
			if (!wordTemplate.join('').includes(letter)) {
				curentCount -= 2
			}
		}

		else if (wordTemplate.join('') === word) {
			document.querySelector('#alphabet').classList.add('hide')
			alert(`Ты угадал, это ${word}`)
		}
		gsap.to(curnum, .2, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function () {
				gsap.to(curnum, 0.1, {
					force3D: true,
					y: 10
				})
				curnum.innerHTML = curentCount
			}
		})
		gsap.to(curnum, .2, {
			force3D: true,
			y: 0,
			delay: 0.3,
			opacity: 1,
			ease: Power2.easeOut
		})
		renderWord()
	}
	main()