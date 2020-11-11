(() => {
	let right = document.getElementsByClassName('rightAns');
	let thirdSubjectName = (function() {
		if(right.length == 150) {
			return 'Mathematics';
		} else {
			return 'Biology';
		}
	})();
	
	let counter = 0;
	let subjectMarks = {
		Physics : 0,
		Chemistry: 0,
	};
	subjectMarks[thirdSubjectName] = 0;
	
	let subjectMarksPer = {
		Physics : 1,
		Chemistry : 1,
		Biology: 1,
		Mathematics : 2
	};
	
	let currentSubjectName = 'Physics';
	
	for(let question of right) {
	  let rootelem = question.parentElement.parentElement.parentElement.parentElement;
	  ++counter;
	  
	  if(counter > 50) currentSubjectName = 'Chemistry';
	  if(counter > 100) currentSubjectName = thirdSubjectName;

	  if(parseInt(question.innerText) === parseInt(rootelem.children[1].children[0].children[7].children[1].innerText)) {
		subjectMarks[currentSubjectName]++;
        rootelem.style.backgroundColor = '#5cff33';
	  } else {
        rootelem.style.backgroundColor = '#ff432e';
	  }
	}
	let tableElement = document.getElementsByClassName('main-info-pnl')[0].children[0].children[1].children[0];
	if(thirdSubjectName === "Mathematics") {
		tableElement = document.getElementsByClassName('main-info-pnl')[0].children[1].children[0].children[0];
	}
	let additionalInfo = '';
	let totalMarks = 0;
	
	for(let [subjectName, subjectCorrectAnswers] of Object.entries(subjectMarks)) {
		const MARKS_EACH = subjectMarksPer[subjectName];
		const MARKS_OBTAINED = subjectCorrectAnswers * MARKS_EACH;
		totalMarks += MARKS_OBTAINED;
		
		additionalInfo += `<tr><td>${subjectName}</td><td>${subjectCorrectAnswers}  (${MARKS_EACH} marks each) | Total Marks Obtained = ${MARKS_OBTAINED}</td></tr>`;
	}
	additionalInfo += `<tr><td>Total</td><td>${totalMarks}</td>`;
	
	tableElement.innerHTML += additionalInfo;
})();