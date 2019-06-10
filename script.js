const listButton = document.querySelector('.change-button.right')
const listSection = document.querySelector('.section.list')
const addButton = document.querySelector('.change-button.left')
const addSection = document.querySelector('.section.add')
const addSectionForm = addSection.querySelector('form') 

addButton.addEventListener('click', () => {
  if (addSection.classList.contains('hide-section')) {
    addSection.classList.remove('hide-section')
    listSection.classList.add('hide-section')
  }
})

listButton.addEventListener('click', () => {
  if (listSection.classList.contains('hide-section')) {
    listSection.classList.remove('hide-section')
    addSection.classList.add('hide-section')
  }
})

if (localStorage['student-list']) {
  createStudentList()
}

addSectionForm.addEventListener('submit', event => {
  event.preventDefault()
  let studentList = localStorage['student-list'] ? JSON.parse(localStorage['student-list']) : null
  if (!studentList) {
    localStorage['student-list'] = []
    studentList = []
  }

  let id = null
  if (studentList.length === 0) {
    id = 0
  } else {
    id = studentList[studentList.length - 1].id + 1
  }

  const formData = new FormData(event.target)
  let student = {
    id,
    name: formData.get('name'),
    email: formData.get('email'),
    age: formData.get('age'),
    phone: formData.get('phone'),
    communication: formData.get('communication'),
    englishLevel: formData.get('english-level'),
    toStart: formData.get('to-start'),
    skills: formData.get('skills'),
    presentation: formData.get('presentation'),
    fromHome: formData.get('from-home')
  }
  studentList.push(student)
  localStorage['student-list'] = JSON.stringify(studentList)
  listSection.innerHTML = ''
  alert('Application successfully created')
  createStudentList()

  addSection.querySelector('[name="name"]').value = ''
  addSection.querySelector('[name="email"]').value = ''
  addSection.querySelector('[name="age"]').value = ''
  addSection.querySelector('[name="phone"]').value = ''
  addSection.querySelector('[type="radio"][value="Email"]').checked = null
  addSection.querySelector('[type="radio"][value="Phone"]').checked = null
  addSection.querySelector('[name="english-level"]').selectedIndex = 0
  addSection.querySelector('[name="to-start"]').value = ''
  addSection.querySelector('[name="skills"]').value = ''
  addSection.querySelector('[name="presentation"]').innerHTML = ''
  addSection.querySelector('[name="from-home"]').checked = null
})

function createStudentList () {
  let listItems = ''
  const studentList = localStorage['student-list'] ? JSON.parse(localStorage['student-list']) : null
  if (studentList && studentList.length > 0) {
    studentList.forEach(student => {
      listItems += `
        <div class="list-item list-item-${student.id}">
          <div class="list-item-title">
            <strong>${student.name} (${student.email})</strong>
            <span class="delete-item" style="color: red"><strong>X</strong></span>
          </div>
          <form class="hide-section">
            <div class="input-container">
              <label for="name">Name:</label>
              <input class="input" name="name" value="${student.name}" type="text" required>
            </div>
            <div class="input-container">
              <label for="email">Email:</label>
              <input class="input" name="email" value="${student.email}" type="email" required>
            </div>
            <div class="input-container">
              <label for="age">Age:</label>
              <input class="input" name="age" value="${student.age}" type="number" required>
            </div>
            <div class="input-container">
              <label for="phone">Phone:</label>
              <input class="input" name="phone" value="${student.phone}" type="tel" required>
              <em><label class="input-format">Format: 060-000-0000</label></em>
            </div>
            <div class="input-container">
              <label for="communication">Preferred Way of Communication:</label>
              <div>
                <input
                  class="input"
                  type="radio"
                  value="Email"
                  name="communication"
                  ${student.communication === 'Email' ? 'checked' : ''}
                  required
                >
                <label>Email</label>
              </div>
              <div>
                <input
                  class="input"
                  type="radio"
                  value="Phone"
                  name="communication"
                  ${student.communication === 'Phone' ? 'checked' : ''}
                  required
                >
                <label>Phone</label>
              </div>
            </div>
            <div class="input-container">
              <label for="english-level">English Level:</label>
              <select class="input" name="english-level" required>
                <option ${student.englishLevel === 'A2' ? 'selected' : ''}>A2</option>
                <option ${student.englishLevel === 'B1' ? 'selected' : ''}>B1</option>
                <option ${student.englishLevel === 'B2' ? 'selected' : ''}>B2</option>
                <option ${student.englishLevel === 'C1' ? 'selected' : ''}>C1</option>
                <option ${student.englishLevel === 'C2' ? 'selected' : ''}>C2</option>
              </select>
            </div>
            <div class="input-container">
              <label for="to-start">Available to Start:</label>
              <input class="input" type="text" name="to-start" value="${student.toStart}" placeholder="DD-MM-YYYY" required>
              <em><label class="input-format">Format: DD-MM-YYYY</label></em>
            </div>
            <div class="input-container">
              <label for="skills">Technical Skills and Courses:</label>
              <input class="input" name="skills" value="${student.skills}" type="text">
            </div>
            <div class="input-container">
              <label for="presentation">Short Personal Presentation:</label>
              <textarea class="input" name="presentation" rows="4" wrap>${student.presentation}</textarea>
            </div>
            <div class="input-container">
              <div>
                <input type="checkbox" name="from-home" ${student.fromHome === 'on' ? 'checked' : ''}>
                <label for="from-home">Study from home?</label>
              </div>
            </div>
            <div id="submit-button">
              <button class="input">Edit</button>
            </div>
          </form>
        </div>
      `
    })
  } else {
    listItems = `There are currently no student applications`
  }
  listSection.innerHTML = listItems
  
  studentList.forEach(student => {
    const listItem = document.querySelector(`.list-item-${student.id}`)
    const listItemTitle = listItem.querySelector('.list-item-title')
    const deleteItemButton = listItem.querySelector('.delete-item')
    const listItemForm = listItem.querySelector('form')

    listItemTitle.addEventListener('click', () => {
      listItemForm.classList.toggle('hide-section')
    })

    deleteItemButton.addEventListener('click', event => {
      event.stopPropagation()
      const toDelete = confirm(`Are you sure you want to delete ${student.name} (${student.email})`)
      if (toDelete) {
        let studentList = JSON.parse(localStorage.getItem('student-list'))
        studentList = studentList.filter(el => {
          if (el.id === student.id) {
            return false
          } else {
            return true
          }
        })
        localStorage['student-list'] = JSON.stringify(studentList)
        document.querySelector(`.list-item-${student.id}`).remove()
        alert('Application successfully deleted')
      }
    })

    listItemForm.addEventListener('submit', event => {
      event.preventDefault()
      const formData = new FormData(event.target)
      let editedStudent = {
        id: student.id,
        name: formData.get('name'),
        email: formData.get('email'),
        age: formData.get('age'),
        phone: formData.get('phone'),
        communication: formData.get('communication'),
        englishLevel: formData.get('english-level'),
        toStart: formData.get('to-start'),
        skills: formData.get('skills'),
        presentation: formData.get('presentation'),
        fromHome: formData.get('from-home')
      }
      let studentList = JSON.parse(localStorage.getItem('student-list'))
      studentList = studentList.map(el => {
        if (el.id === student.id) {
          return editedStudent
        } else {
          return el
        }
      })
      localStorage['student-list'] = JSON.stringify(studentList)
      alert('Application successfully edited')
    })
  })
}
