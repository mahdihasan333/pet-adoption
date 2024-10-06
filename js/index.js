// categories
const showAllCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayAllCategories(data.categories); //
};

// show All pet
const showAllPets = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  displayAllPets(data.pets); //
};


// // Show Pet details
// const showPetDetails = async (id) => {
//   const response = await fetch(
//     `https://openapi.programming-hero.com/api/peddy/pet/${id}`
//   );
//   const data = await response.json();
//   console.log(data); 
// };






// categories
const displayAllCategories = (categories) => {
  const petCategoriesContainer = document.getElementById("pet-categories");

  categories.forEach((item) => {
    const categoriesDiv = document.createElement("div");
    categoriesDiv.innerHTML = `
      
      <button class="btn py-4 px-10 flex justify-center items-center border">
        <div>
          <img class="w-1/2 "
            src=${item.category_icon}
          />
        </div>
        <h2 class="text-2xl font-bold">${item.category}</h2>
      </button>
        
    `;
    petCategoriesContainer.appendChild(categoriesDiv);
  });
};

// show All pet
const displayAllPets = (pet) => {
  const allPetContainer = document.getElementById("all-pets");

  pet.forEach((item) => {
    const div = document.createElement("div");
    div.classList = "lg:grid-cols-3 gap-5 ";
    // const { brand, image, slug } = phone;
    const { petId, image, pet_name, breed, date_of_birth, gender, price } = item;
    div.innerHTML = `
    <div>
      <img src=${image}>
      <div>
        <h3 class="text-xl font-bold font-Inter text-bannerParagraph">${pet_name}</h3>
        <p class="text-base text-mainParagraph">Breed:${breed}</p>
        <p class="text-base text-mainParagraph"><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth}</p>
        <p class="text-base text-mainParagraph"><i class="fa-solid fa-venus"></i> Gender: ${gender}</p>
        <p class="text-base text-mainParagraph"><i class="fa-solid fa-dollar-sign"></i> Price:${price}</p>
      <div class="flex justify-between">
        <button class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
        <button class="btn">Adopt</button>
        <button class="btn" onclick="showModal('${petId}')">Details</button>
      </div>
    </div>
  </div>
    `;
    allPetContainer.appendChild(div);
  });
};






// modal function
const showModal = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();
  console.log(data); 
  const {image, pet_name, breed, date_of_birth, gender, price, vaccinated_status, pet_details} = data.petData;
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






// function call
showAllCategories();
showAllPets();
