const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    console.log(phones);
    const phonesContainer = document.getElementById("phone-container");
    phonesContainer.textContent = '';
    // Display 20 phones only
    const showMore = document.getElementById("showMore");
    if(dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        showMore.classList.remove("d-none");
    }
    else{
        showMore.classList.add("d-none");
    }
    // Display no phone found
    const notFound = document.getElementById("notFound");
    if(phones.length === 0){
        notFound.classList.remove("d-none");
    }
    else{
        notFound.classList.add("d-none");
    }
    // Display all phones
    phones.forEach(phone => {
        console.log(phone.slug);
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top w-50 m-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // ─── Stop Loader ────────────────────────────────────────────────────
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("searchField").value;
    searchText = searchField;
    loadPhone(searchText, dataLimit)
}

// ─── Handle Search Button Click ────────────────────────────────────────────────────
document.getElementById("btnSearch").addEventListener("click", function(){
    // ─── Start Loader ────────────────────────────────────────────────────
    processSearch(10);
})

// ─── Handle Search Input Field ────────────────────────────────────────────────────
document.getElementById("searchField").addEventListener("keypress", function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove("d-none");
    }
    else{
        loaderSection.classList.add("d-none");
    }
}

// ─── Not The Best Way To Show ALL ────────────────────────────────────────────────────
document.getElementById("btnShowMore").addEventListener("click", function(){
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById("phoneDetailsTitle");
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById("phoneDetails");
    phoneDetails.innerHTML = `
    <img src="${phone.image}" alt="">
    <h4>Brand: ${phone.brand}</h4>
    <h5>Released Date: ${phone.releaseDate ? phone.releaseDate: "Unknown"}</h5>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "Not Found"}</p>
    <p>Details: ${phone.others.Bluetooth}</p>
    `;
}

loadPhone('iphone');