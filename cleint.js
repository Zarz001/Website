async function show() {
  const reply = await fetch('/api');
  const data = await reply.json();
  const dataDiv = document.getElementById('data');
  dataDiv.innerHTML = '';
  data.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('data1');
    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    const otherDiv = document.createElement('div');
    otherDiv.classList.add('other');
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    textDiv.textContent = item.text;
    otherDiv.textContent = item.other;
    priceDiv.textContent = item.price;
    if (item.imageUrl) {
      const img = document.createElement('img');
      img.src = item.imageUrl;
      imageDiv.appendChild(img);
    }
    infoDiv.appendChild(textDiv);
    infoDiv.appendChild(otherDiv);
    infoDiv.appendChild(priceDiv);
    infoDiv.appendChild(imageDiv);
    itemDiv.appendChild(infoDiv);
    dataDiv.appendChild(itemDiv);
  });
}

show();

const postAdButton = document.getElementById('post-ad-button');
const post = document.getElementById('post');
const post2 = document.getElementById('post2');
const closeBtn = document.getElementsByClassName('close')[0];
const carPartAdButton = document.getElementById('partad');
const carAdButton = document.getElementById('carad');

postAdButton.onclick = function show3() {
  post.style.display = 'block';
};

closeBtn.addEventListener('click', () => {
  post.style.display = 'none';
  post2.style.display = 'none';
});

carPartAdButton.onclick = function set1(e) {
  e.preventDefault();
  post2.style.display = 'block';
  post.style.display = 'none';
};

carAdButton.onclick = function set2(f) {
  f.preventDefault();
  post2.style.display = 'none';
  post.style.display = 'block';
};

const searchButton = document.getElementById('search-btn');

function search() {
  const input = document.getElementById('search-in').value.toLowerCase();
  const items = document.querySelectorAll('.data1');
  items.forEach((item) => {
    const text = item.querySelector('.text').textContent.toLowerCase();
    const other = item.querySelector('.other').textContent.toLowerCase();
    const price = item.querySelector('.price').textContent.toLowerCase();
    if (text.includes(input) || other.includes(input) || price.includes(input)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  items.forEach((itempart) => {
    const text1 = itempart.querySelector('.text1').textContent.toLowerCase();
    const other1 = itempart.querySelector('.other1').textContent.toLowerCase();
    const price1 = itempart.querySelector('.price1').textContent.toLowerCase();
    if (text1.includes(input) || other1.includes(input) || price1.includes(input)) {
      itempart.style.display = 'block';
    } else {
      itempart.style.display = 'none';
    }
  });
}
searchButton.addEventListener('click', search);

const adForm = document.getElementById('adbox');
adForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = document.getElementById('text').value;
  const other = document.getElementById('other').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').files[0];
  const formData = new FormData();
  formData.append('text', text);
  formData.append('other', other);
  formData.append('price', price);
  formData.append('image', image);
  const options = {
    method: 'POST',
    body: formData,
  };
  const res = await fetch('/api', options);
  const json = await res.json();
  console.log(json);
  show();
  post.style.display = 'none';
  event.preventDefault();
  adForm.reset();
});

function photo(event) {
  const photo = document.getElementById('preview-image');
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = function khan() {
    photo.src = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    photo.src = '';
  }
}

const imageInput = document.getElementById('image');
imageInput.addEventListener('change', photo);

const form = document.querySelector('#reviews-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const review = document.querySelector('#review').value;

  fetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify({
      name,
      review,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    });
  post.style.display = 'none';
  e.preventDefault();
  form.reset();
});

const reviewsButton = document.querySelector('#post-review-button');

reviewsButton.addEventListener('click', () => {
  fetch('/api/reviews')
    .then((response) => response.json())
    .then((data) => {
      const reviews = data.map((review) => `
          <div class= "popup-display"
            <h4>${review.name}</h4>
            <p>${review.review}</p>
          </div>
        `).join('');

      const popup = document.createElement('div');
      popup.classList.add('popup');
      popup.innerHTML = `
        <div class="popup-content">
          <span class="close">&times;</span>
          ${reviews}
        </div>
      `;
      document.body.appendChild(popup);

      const closeBtn1 = popup.querySelector('.close');
      closeBtn1.addEventListener('click', () => {
        popup.remove();
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

async function show1() {
  const reply = await fetch('/api/part');
  const data = await reply.json();
  const dataDiv = document.getElementById('data5');
  dataDiv.innerHTML = '';
  data.forEach((part) => {
    const partDiv = document.createElement('div');
    partDiv.classList.add('part');
    const textDiv = document.createElement('div');
    textDiv.classList.add('text1');
    const otherDiv = document.createElement('div');
    otherDiv.classList.add('other1');
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price1');
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image1');
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info1');
    textDiv.textContent = part.text1;
    otherDiv.textContent = part.other1;
    priceDiv.textContent = part.price1;
    if (part.imageUrl) {
      const img = document.createElement('img');
      img.src = part.imageUrl;
      imageDiv.appendChild(img);
    }
    infoDiv.appendChild(textDiv);
    infoDiv.appendChild(otherDiv);
    infoDiv.appendChild(priceDiv);
    infoDiv.appendChild(imageDiv);
    partDiv.appendChild(infoDiv);
    dataDiv.appendChild(partDiv);
  });
}

show1();

const form1 = document.querySelector('#car-part-ad-form');

form1.addEventListener('submit', async (event) => {
  event.preventDefault();

  const text1 = document.querySelector('#text1').value;
  const other1 = document.querySelector('#other1').value;
  const price1 = document.querySelector('#price1').value;
  const image1 = document.querySelector('#image1').files[0];

  const formData = new FormData();
  formData.append('text1', text1);
  formData.append('other1', other1);
  formData.append('price1', price1);
  formData.append('image1', image1);

  const options = {
    method: 'POST',
    body: formData,
  };

  const res = await fetch('/api/part', options);
  const json = await res.json();
  console.log(json);
  show1();
  post2.style.display = 'none';
  event.preventDefault();
  form1.reset();
});

window.onload = function yoo() {
  const showpart = document.getElementById('showpartsad');
  const car = document.getElementById('showcarsad');

  function showparts() {
    const items22 = document.querySelectorAll('.part');
    const itms11 = document.querySelectorAll('.data1');
    items22.forEach((item00) => {
      item00.style.display = 'block';
    });
    itms11.forEach((item1) => {
      item1.style.display = 'none';
    });
  }
  function showcars() {
    const value = document.querySelectorAll('.data1');
    const nonval = document.querySelectorAll('.part');
    value.forEach((val1) => {
      val1.style.display = 'block';
    });
    nonval.forEach((val2) => {
      val2.style.display = 'none';
    });
  }
  car.addEventListener('click', showcars);
  showpart.addEventListener('click', showparts);
};
