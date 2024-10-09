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
  document.getElementById("spinner2").classList.remove("hidden");
  document.getElementById("pet-categories").classList.add("hidden");

  const petCategoriesContainer = document.getElementById("pet-categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <div onclick="categoryName('${item.category}',this)" class="active-btn flex justify-center items-center cursor-pointer border-[2px] rounded-xl lg:px-14 px-7 py-3 lg:space-x-4">
        <img src="${item.category_icon}"/>
        <span class="font-bold text-2xl">${item.category}</span>
    </div>
          `;
    petCategoriesContainer.appendChild(buttonContainer);
  });

  setTimeout(() => {
    document.getElementById("spinner2").classList.add("hidden");
    document.getElementById("pet-categories").classList.remove("hidden");
  }, 2000);
};

// active button

// catatory by catagory name
const categoryName = (name, btn) => {
  activeButton(btn);
  document.getElementById("all-pets-container").innerHTML = "";
  const allPetContainer = document.getElementById("all-pets-container");
  document.getElementById("pet-section").classList.remove("hidden");
  document.getElementById("error-container").classList.add("hidden");

  // spinner
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("pet-section").classList.add("hidden");
  document.getElementById("all-pets-container").classList.remove("hidden");

  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${name.toLowerCase()}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.data.length === 0) {
        document.getElementById("pet-section").classList.add("hidden");
        document.getElementById("error-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("all-pets-container").classList.add("hidden");
        return;
      }

      data.data.forEach((item) => {
        const { petId, image, pet_name, breed, date_of_birth, gender, price } =
          item;
        const div = document.createElement("div");
        div.innerHTML = `
    <div>
      <div class="p-5 shadow-lg rounded-lg space-y-3 mb-3">
        <figure class="w-full h-64 lg:p-5">
          <img class="rounded-xl object-cover w-full h-full" src=${image}>
        </figure>
        
        <div class="space-y-3">
          <h3 class="text-xl font-bold font-Inter text-bannerParagraph">${pet_name ?? "Not Available"}</h3>
          <p class="text-base text-mainParagraph">Breed:${breed ?? "Not Available"}</p>
          <p class="text-base text-mainParagraph"><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth ?? "Not Available"}</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-venus"></i> Gender: ${gender ?? "Not Available"}</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-dollar-sign"></i> Price:${price ?? "Not Available"}</p>
        </div>  
        <div class="divider"></div>
        <div class="flex justify-between">
          <button onclick="collectImage('${petId ?? "Not Available"}')" class="btn text-buttonColor"><i class="fa-solid fa-thumbs-up"></i></button>
          <button id="disabled-adopt" onclick="adoptPet(this)" class="btn text-buttonColor">Adopt</button>
          <button class="btn text-buttonColor" onclick="showModal('${petId ?? "Not Available"}')">Details</button>
        </div>
      </div>
    </div>
    `;
        allPetContainer.appendChild(div);
      });
    })
    .catch((error) => console.log(error));

  setTimeout(() => {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("pet-section").classList.remove("hidden");
  }, 2000);
};

// active button
let buttonActive = null;
const activeButton = (active) => {
  if (buttonActive) {
    buttonActive.classList.remove(
      "rounded-full",
      "bg-slate-100",
      "border-green-500"
    );
    buttonActive.classList.add("rounded-xl");
  }
  active.classList.add("rounded-full", "bg-slate-100", "border-green-500");
  active.classList.remove("rounded-xl");
  buttonActive = active;
};

// show All pet
const displayAllPets = (pet) => {
  const allPetContainer = document.getElementById("all-pets-container");

  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("all-pets-container").classList.add("hidden");

  pet.forEach((item) => {
    const { petId, image, pet_name, breed, date_of_birth, gender, price } =
      item;
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
      <div class="p-5 shadow-lg rounded-lg space-y-3 mb-3">
        <figure class="w-full h-64 lg:p-2">
          <img class="rounded-xl object-cover w-full h-full" src=${image}>
        </figure>
        <div class="space-y-3">
          <h3 class="text-xl font-bold font-Inter text-bannerParagraph">${
            pet_name ?? "Not Available"
          }</h3>
          <p class="text-base text-mainParagraph"><i class="fa-regular fa-square"></i> Breed: ${
            breed ?? "Not Available"
          }</p>
          <p class="text-base text-mainParagraph"><i class="fa-regular fa-calendar"></i> Birth: ${
            date_of_birth ?? "Not Available"
          }</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-venus"></i> Gender: ${
            gender ?? "Not Available"
          }</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-dollar-sign"></i> Price:${
            price ?? "Not Available"
          }</p>
        </div>  
        <div class="divider"></div>
        <div class="flex justify-between">
          <button onclick="collectImage('${petId}')" class="btn text-buttonColor"><i class="fa-solid fa-thumbs-up"></i></button>
          <button id="disabled-adopt" onclick="adoptPet(this)" class="btn text-buttonColor">Adopt</button>
          <button class="btn text-buttonColor" onclick="showModal('${petId}')">Details</button>
        </div>
      </div>
    </div>
    `;
    allPetContainer.appendChild(div);
  });

  setTimeout(() => {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("all-pets-container").classList.remove("hidden");
  }, 2000);
};

// collect image
const collectImage = async (id) => {
  const collect = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await collect.json();
  console.log(data);
  const petImageContainer = document.getElementById("noImageSection");
  petImageContainer.innerHTML += `
    
      <div class="rounded-xl w-full border p-2">
        <img class="w-full h-full object-cover rounded-xl" src="${data.petData.image}"/>
      </div>
    
  `;
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
          <button class="btn w-full text-buttonColor">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>
  `;
  my_modal_5.showModal();
};

// Adopt Pet modal
const adoptPet = async (id) => {
  adoptBtn.showModal();
  const count = document.getElementById("count");
  const count2 = count.innerText

  let countValue = parseInt(count2);
  const setTime = setInterval(() => {
    countValue--;
    count.innerText = countValue;
    if (countValue <= 0) {
      
      clearInterval(setTime);
      count.innerText = count2;
      adoptBtn.close();
      id.disabled = true;
      id.innerText = "Adopted";
    }
  }, 1000);
};

// SortPrice
document
  .getElementById("sortPrice")
  .addEventListener("click", async function () {
    const allPetContainer = document.getElementById("all-pets-container");

    document.getElementById("all-pets-container").innerHTML = "";
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("pet-section").classList.add("hidden");

    const data = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const response = await data.json();
    response.pets.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    for (let post of response.pets) {
      const { petId, image, pet_name, breed, date_of_birth, gender, price } =
        post;
      const div = document.createElement("div");
      div.innerHTML = `
    <div>
      <div class="p-5 shadow-lg rounded-lg space-y-3 mb-3">
        <figure class="w-full h-64 lg:p-5">
          <img class="rounded-xl object-cover w-full h-full" src=${image}>
        </figure>
        <div class="space-y-3">
          <h3 class="text-xl font-bold font-Inter text-bannerParagraph">${
            pet_name ?? "Not Available"
          }</h3>
          <p class="text-base text-mainParagraph"><i class="fa-regular fa-square"></i> Breed: ${
            breed ?? "Not Available"
          }</p>
          <p class="text-base text-mainParagraph"><i class="fa-regular fa-calendar"></i> Birth: ${
            date_of_birth ?? "Not Available"
          }</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-venus"></i> Gender: ${
            gender ?? "Not Available"
          }</p>
          <p class="text-base text-mainParagraph"><i class="fa-solid fa-dollar-sign"></i> Price:${
            price ?? "Not Available"
          }</p>
        </div>  
        <div class="divider"></div>
        <div class="flex justify-between">
          <button onclick="collectImage('${petId}')" class="btn text-buttonColor"><i class="fa-solid fa-thumbs-up"></i></button>
          <button id="disabled-adopt" onclick="adoptPet(this)" class="btn text-buttonColor">Adopt</button>
          <button class="btn text-buttonColor" onclick="showModal('${petId}')">Details</button>
        </div>
      </div>
    </div>
    `;
      allPetContainer.appendChild(div);
    }
    setTimeout(() => {
      document.getElementById("spinner").classList.add("hidden");
      document.getElementById("pet-section").classList.remove("hidden");
    }, 2000);
  });

// function call
showAllCategories();
showAllPets();
