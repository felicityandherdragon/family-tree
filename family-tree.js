function randomImage() {
  const profileImg = ['img/profile_1.png','img/profile_3.png','img/profile_5.jpg','img/profile_7.jpg','img/profile_2.png','img/profile_4.jpg','img/profile_6.jpg']

  let randomIndex = Math.floor(Math.random()*profileImg.length);
  return profileImg[randomIndex];
}


class FamilyTree {
  constructor (parentName) {
    if (typeof(parentName) !== 'string' || parentName === undefined) {
      throw 'invalid input';
    }
    this.value = parentName;
    this.profile = randomImage();
    this.children = [];
  }

  insert(childName) {
    let child = new FamilyTree(childName);
    this.children.push(child);
  }

  familySize() {
    return this.children.length + 1;
  }
  
  findMember(searchName) {
    let match = this.children.filter(function(element) {
      return element.value === searchName;
    })

    if (match.length > 0) {
      return match[0];
    } else {
      return undefined;
    }
  }

  log() {
      document.getElementById('first-gen').innerHTML = `
      <h3>
        First generation
      </h3>
      <div class='profiles'>
        <div class='profile-name'>
          <span>${this.value}</span>
        </div>
        <div class='profile-img'>
          <img src=${this.profile}>
        </div>
      </div>
    `
      let secondGenHTML = this.children.map(function(element) {
        let thirdGenHTML = element.children.map(function(innerEle) {
          return `
          <div class='profiles'>
                <div class='profile-name'>
                  <span>${innerEle.value}</span>
                </div>
                <div class='profile-img'>
                  <img src=${innerEle.profile}>
                </div>
          </div>
          `
        })
        document.getElementById('third-gen').innerHTML = `
          <h3>
            Third generation
          </h3>
        ` + thirdGenHTML.join('');

        return `<div class='profiles'>
        <div class='profile-name'>
          <span>${element.value}</span>
        </div>
        <div class='profile-img'>
          <img src=${element.profile}>
        </div>
      </div>`;
      })

      document.getElementById('second-gen').innerHTML = `
      <h3>
        Second generation
      </h3>
    ` + secondGenHTML.join('');
  }
}

let submitButton = document.getElementById('submit');
let firstGen;
let secondGen;
let thirdGen;

function updateTree(parentInput,childInput) {
  if (parentInput.length < 1) {
    parentInput = childInput;
    firstGen = new FamilyTree(parentInput);
    return firstGen.log();
  } else {
    if (firstGen.findMember(childInput) === undefined && parentInput === firstGen.value) {
      firstGen.insert(childInput);
      return firstGen.log();
    } 
    if (firstGen.findMember(parentInput) !== undefined) {
      secondGen = firstGen.findMember(parentInput);
      secondGen.insert(childInput);
      return firstGen.log();
    }
  }
  
}

submitButton.addEventListener('click', function() {
  const treeBody = document.getElementById('tree-body');
  treeBody.innerHTML = `
  <div id='first-gen'>
    <h3>
      First generation
    </h3>
  </div>
  <div id='second-gen'>
    <h3>
      Second generation
    </h3>
  </div>
  <div id='third-gen'>
    <h3>
      Third generation
    </h3>
  </div>
  `;

  let parentInput = document.getElementById('parent-name').value;
  const childInput = document.getElementById('name').value;

  updateTree(parentInput,childInput);
  
});

module.exports = FamilyTree;
