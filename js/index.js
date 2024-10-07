// categories
const showAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((response) => response.json())
    .then((data) => displayAllCategories(data.categories))
    .catch((error) => console.log(error));
};

// show All pet
const showAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((response) => response.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
};

// categorys show categoryname

const showByCategory = (id) => {
  alert(id);
  // fetch
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((response) => response.json())
    .then((data) => console.log(data.categories))
    .catch((error) => console.log(error));
};

// categories
const displayAllCategories = (categories) => {
  const petCategoriesContainer = document.getElementById("pet-categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <div onclick="categoryName('${item.category}')" class="flex justify-center items-center cursor-pointer border-[2px] rounded-xl lg:px-14 px-7 py-3 lg:space-x-4">
        <img src="${item.category_icon}"/>
        <span class="font-bold text-2xl">${item.category}</span>
    </div>
          `;
    petCategoriesContainer.appendChild(buttonContainer);
  });
};

// catatory by catagory name
const categoryName = (name) => {
  document.getElementById("all-pets-container").innerHTML = "";
  const allPetContainer = document.getElementById("all-pets-container");
  document.getElementById("pet-section").classList.remove("hidden");
  document.getElementById("error-container").classList.add("hidden");
  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${name.toLowerCase()}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.data.length === 0) {
        document.getElementById("pet-section").classList.add("hidden");
        document.getElementById("error-container").classList.remove("hidden");
        return;
      }

      data.data.forEach((item) => {
        const { petId, image, pet_name, breed, date_of_birth, gender, price } =
          item;
        const div = document.createElement("div");
        div.innerHTML = `
    <div>
      <div class="p-5 shadow-lg rounded-lg space-y-3 mb-3">
        <img src=${image}>
        <div class="space-y-3">
          <h3 class="text-xl font-bold font-Inter text-bannerParagraph">${pet_name}</h3>
          <p class="text-base text-mainParagraph">Breed:${breed}</p>
          <p class="text-base text-mainParagraph"><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth}</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-venus"></i> Gender: ${gender}</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-dollar-sign"></i> Price:${price}</p>
        </div>  
        <div class="divider"></div>
        <div class="flex justify-between">
          <button onclick="collectImage()" class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
          <button onclick="adoptPet()" class="btn">Adopt</button>
          <button class="btn" onclick="showModal('${petId}')">Details</button>
        </div>
      </div>
    </div>
    `;
        allPetContainer.appendChild(div);
      });
    })
    .catch((error) => console.log(error));

  // const allPet = document.getElementById('all-pets-container')
};

// show All pet
const displayAllPets = (pet) => {
  const allPetContainer = document.getElementById("all-pets-container");

  // -- categoryte data na thakle

  // if(pet.length === 0) {
  //   allPetContainer.innerHTML `
  //   <div>
  //     <img src="images/error.webp">
  //     <h2 class="text-4xl font-bold font-Inter">No Information Available</h2>
  //     <p class="font-Lato text-base text-mainParagraph">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
  //   </div>
  //   `
  //   return;
  // }

  pet.forEach((item) => {
    const { petId, image, pet_name, breed, date_of_birth, gender, price } =
      item;
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
      <div class="p-5 shadow-lg rounded-lg space-y-3 mb-3">
        <img src=${image}>
        <div class="space-y-3">
          <h3 class="text-xl font-bold font-Inter text-bannerParagraph">${pet_name}</h3>
          <p class="text-base text-mainParagraph">Breed:${breed}</p>
          <p class="text-base text-mainParagraph"><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth}</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-venus"></i> Gender: ${gender}</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-dollar-sign"></i> Price:${price}</p>
        </div>  
        <div class="divider"></div>
        <div class="flex justify-between">
          <button onclick="collectImage()" class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
          <button onclick="adoptPet()" class="btn">Adopt</button>
          <button class="btn" onclick="showModal('${petId}')">Details</button>
        </div>
      </div>
    </div>
    `;
    allPetContainer.appendChild(div);
  });
};

// collect image
const collectImage = async (id) => {
  const collect = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await collect.json();
  imageCollect(data.pets);
  console.log(data)
};

// Image collect
const imageCollect = (id) => {
  console.log(id)
  const petImageContainer = document.getElementById("noImageSection");
  const div = document.createElement("div");
  div.classList = 'flex';
  div.innerHTML = `
    <div class="mr-28">${id}</div>
    <div class="mr-3">${id}</div>
  `;
  petImageContainer.append(div);
};

// modal function
const showModal = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();
  console.log(data);
  const {
    image,
    pet_name,
    breed,
    date_of_birth,
    gender,
    price,
    vaccinated_status,
    pet_details,
  } = data.petData;
  const showModal = document.getElementById("show-modal");
  showModal.innerHTML = `
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box ">
      <img class="w-full" src=${image}/> 
      <h3 class="text-2xl text-bannerParagraph font-bold mt-3">${pet_name}</h3>
      <div class="grid grid-cols-2 space-y-2">
        <p>Breed:${breed} </p>
        <p>Birth: ${date_of_birth}</p>
        <p>Gender: ${gender} </p>
        <p>Price: ${price} </p>
        <p>Vaccinated Status: ${vaccinated_status} </p>
      </div>
      <h5>Details Information</h5>
      <p>${pet_details}</p>
      <div class="modal-action">
        <form method="dialog" class="w-full">
          <button class="btn w-full">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>
  `;
  my_modal_5.showModal();
};

// Adopt Pet
const adoptPet = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();
  console.log(data);
  const showModal = document.getElementById("adopt-pet");
  showModal.innerHTML = `
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box ">
      <h3 class="text-2xl text-bannerParagraph font-bold mt-3"></h3>
      <div class="grid grid-cols-2 space-y-2">
        <p>Breed: </p>
        <p>Birth: money</p>
        <p>Gender: </p>
        <p>Price:  </p>
        <p>Vaccinated Status:  </p>
      </div>
      <h5>Details Information</h5>
      <p>$</p>
      <div class="modal-action">
        <form method="dialog" class="w-full">
          <button class="btn w-full">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>
  `;
  my_modal_5.showModal();
};

// spinner
// const spinner = () => {
//   // document.getElementById("spinner").style.display = "block";

//   setTimeout(function () {
//     showAllCategories();
//   }, 4000);
// };

// function call
showAllCategories();
showAllPets();
