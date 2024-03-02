const loadPnone = async (searchText, isShowAll) => {
    toggleLoading(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phones = data.data
    // console.log(phones)
    displayPhones(phones,isShowAll)
}



const displayPhones = (phones,isShowAll) => {
    // console.log(phones)

    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.textContent = ''

    // console.log(phones.length)


        // show all (btn display if there are moere then 12 phones and hide btn if less)
    const showALLBtn = document.getElementById('show-all-btn')
    if(phones.length> 10 && !isShowAll){
        showALLBtn.classList.remove('hidden')
    }else{
        showALLBtn.classList.add('hidden')
    }


    console.log('is show all', isShowAll)
    // display only 12 phones if not show all 
    if(!isShowAll){
        phones = phones.slice(0,12)
    }


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
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        phonesContainer.appendChild(phoneCard)
    })
    toggleLoading(false)
}



const handleSearch = (isShowAll) => {
    const searchInputField = document.getElementById('search-input-field')
    const searchText = searchInputField.value;

    loadPnone(searchText, isShowAll)
}


const toggleLoading = (isLoading) =>{
    const loading = document.getElementById('loading')
    if(isLoading){
        loading.classList.remove('hidden')
    }else{
        loading.classList.add('hidden')
    }  
}



const showDetails = async (id) => {
    const res =await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
    const datas = await res.json()
    const data = datas.data
    // console.log(data)
    // // console.log('show details button click',id)
    showsinglePhoneDetails(data)
}


const showsinglePhoneDetails =(phone) => {
    console.log(phone)

    const phoneDetailsContainer = document.getElementById('phone-details-container')
    phoneDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <h3 id="detail-phone-name" class="font-bold text-lg">${phone.name}</h3>
    <p><span class="font-bold">storage:</span>${phone.mainFeatures.storage}</p>
    <p><span class="font-bold">Display Size:</span>${phone.mainFeatures.displaySize}</p>
    <p><span class="font-bold">Memory:</span></p>
    <p><span class="font-bold">Release date:</span> ${phone.releaseDate}</p>
    <p><span class="font-bold">GPS:</span> ${phone.others?.GPS}</p>
    `;

    show_modal_by_click.showModal()
}

const showAllPhoneBtn = () =>{
    // console.log('show all btn click')
    handleSearch(true)
}



// showDetails()
loadPnone('iphone')