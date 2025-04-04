document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.scale-btn')) return;

    // Calculator Toggle
    const gpaBtn = document.getElementById('gpa-btn');
    const cgpaBtn = document.getElementById('cgpa-btn');
    const gpaCalculator = document.getElementById('gpa-calculator');
    const cgpaCalculator = document.getElementById('cgpa-calculator');

    if (gpaBtn && cgpaBtn) {
        [gpaBtn, cgpaBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                const isGPA = btn.id === 'gpa-btn';
                gpaCalculator.style.display = isGPA ? 'block' : 'none';
                cgpaCalculator.style.display = isGPA ? 'none' : 'block';
                gpaBtn.classList.toggle('active', isGPA);
                cgpaBtn.classList.toggle('active', !isGPA);
            });
        });
    }

    // GPA Calculator Logic
    const addSubject = () => {
        const template = document.querySelector('.subject');
        const clone = template.cloneNode(true);
        clone.querySelectorAll('input, select').forEach(field => field.value = '');
        clone.querySelector('.remove-btn').addEventListener('click', () => {
            if (document.querySelectorAll('.subject').length > 1) clone.remove();
        });
        document.getElementById('subjects-container').appendChild(clone);
    };

    const calculateGPA = () => {
        const subjects = Array.from(document.querySelectorAll('.subject'));
        let totalPoints = 0, totalCredits = 0;
        let isValid = true;

        subjects.forEach(subject => {
            const name = subject.querySelector('.subject-name').value;
            const grade = parseFloat(subject.querySelector('.grade').value);
            const credit = parseFloat(subject.querySelector('.credit').value);

            // Validation
            subject.querySelectorAll('input, select').forEach(field => {
                field.style.borderColor = '';
                if (!field.value) {
                    field.style.borderColor = 'red';
                    isValid = false;
                }
            });

            if (!isNaN(grade) && !isNaN(credit)) {
                totalPoints += grade * credit;
                totalCredits += credit;
            }
        });

        if (!isValid || totalCredits === 0) {
            showResult(document.getElementById('gpa-result'), 'Please fill all fields correctly', true);
            return;
        }

        const gpa = totalPoints / totalCredits;
        showResult(document.getElementById('gpa-result'), `GPA: ${gpa.toFixed(2)}`);
    };

    // CGPA Calculator Logic
    const addSemester = () => {
        const template = document.querySelector('.semester');
        const clone = template.cloneNode(true);
        clone.querySelectorAll('input').forEach(field => field.value = '');
        clone.querySelector('.remove-btn').addEventListener('click', () => {
            if (document.querySelectorAll('.semester').length > 1) clone.remove();
        });
        document.getElementById('semesters-container').appendChild(clone);
    };

    const calculateCGPA = () => {
        const semesters = Array.from(document.querySelectorAll('.semester'));
        let totalGPA = 0, validCount = 0;

        semesters.forEach(semester => {
            const name = semester.querySelector('.semester-name').value;
            const gpa = parseFloat(semester.querySelector('.gpa').value);

            semester.querySelectorAll('input').forEach(field => {
                field.style.borderColor = '';
                if (!field.value) field.style.borderColor = 'red';
            });

            if (!isNaN(gpa)) {
                totalGPA += gpa;
                validCount++;
            }
        });

        if (validCount === 0) {
            showResult(document.getElementById('cgpa-result'), 'Please add valid semesters', true);
            return;
        }

        const cgpa = totalGPA / validCount;
        showResult(document.getElementById('cgpa-result'), `CGPA: ${cgpa.toFixed(2)}`);
    };

    // Event Listeners
    if (document.getElementById('add-subject')) {
        document.getElementById('add-subject').addEventListener('click', addSubject);
        document.getElementById('calculate-gpa').addEventListener('click', calculateGPA);
    }

    if (document.getElementById('add-semester')) {
        document.getElementById('add-semester').addEventListener('click', addSemester);
        document.getElementById('calculate-cgpa').addEventListener('click', calculateCGPA);
    }

    // Helper Functions
    const showResult = (element, message, isError = false) => {
        element.innerHTML = message.replace(/(\d+\.\d\d)/, '<span class="grade-point">$1</span>');
        element.style.display = 'block';
        element.style.color = isError ? 'red' : 'inherit';
    };

    // Remove Button Handler
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const parent = e.target.closest('.subject, .semester');
            if (parent && parent.parentElement.children.length > 1) parent.remove();
        }
    });
});
