const loadPnone = async (searchText) => {
    toggleLoading(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phones = data.data
    // console.log(phones)
    displayPhones(phones)
}



const displayPhones = (phones) => {
    console.log(phones)
    // toggleLoading(flase)

    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.textContent = ''



    phones = phones.slice(0,5)


    phones.forEach((phone) => {
        // console.log(phone)
        const phoneCard = document.createElement('div')

        phoneCard.classList = 'card card-compact bg-base-100 shadow-xl p-3'

        phoneCard.innerHTML = ` 
        <figure><img class=" lg:w-72" src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class=" flex ">
            <button class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        phonesContainer.appendChild(phoneCard)
    })
    toggleLoading(false)
}



const handleSearch = () => {
    const searchInputField = document.getElementById('search-input-field')
    const searchText = searchInputField.value;

    loadPnone(searchText)
}


const toggleLoading = (isLoading) =>{
    const loading = document.getElementById('loading')
    if(isLoading){
        loading.classList.remove('hidden')
    }else{
        loading.classList.add('hidden')
    }
    
}

loadPnone('iphone')