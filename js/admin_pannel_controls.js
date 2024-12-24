var firebaseConfig = {
    apiKey: "AIzaSyAz2p9B9D1akmzj-CP5QdyiWs3Qkxrfvxs",
    authDomain: "takeoff-45765.firebaseapp.com",
    databaseURL: "https://takeoff-45765-default-rtdb.firebaseio.com",
    projectId: "takeoff-45765",
    storageBucket: "takeoff-45765.appspot.com",
    messagingSenderId: "774098979346",
    appId: "1:774098979346:web:89b1e58f4fb0c1c25526cb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);















var country, place, rating, url;

function uploadItem() {
    country = document.getElementById("country").value;
    place = document.getElementById("place").value;
    rating = document.getElementById("rating").value;
    url = document.getElementById("url").value;
    console.log(country, place, rating, url);
}

document.getElementById("insert").onclick = function () {
    uploadItem();

    if (country, place, rating, url) {
        var newImageRef = firebase.database().ref("gallery").push();
        newImageRef.set({
            img_url: url,
            img_country: country,
            img_place: place,
            img_rating: rating,
        });
        alert("New image added");
    }

    document.getElementById("country").value = "";
    document.getElementById("place").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("url").value = "";
};


















const galleryRef = firebase.database().ref('gallery');

function displayGallery() {
    galleryRef.once('value')
        .then(snapshot => {
            const data = snapshot.val();
            populateTable(data);
        })
        .catch(error => console.error('Error fetching gallery data:', error));
}


function createDeleteButton(country) {
    const button = document.createElement('button');
    button.classList.add('button'); // Add the 'button' class
    button.innerHTML = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 14"
    class="svgIcon bin-top"
  >
    <g clip-path="url(#clip0_35_24)">
      <path
        fill="black"
        d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_24">
        <rect fill="white" height="14" width="69"></rect>
      </clipPath>
    </defs>
  </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 57"
    class="svgIcon bin-bottom"
  >
    <g clip-path="url(#clip0_35_22)">
      <path
        fill="black"
        d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_22">
        <rect fill="white" height="57" width="69"></rect>
      </clipPath>
    </defs>
  </svg>
    `;

    button.addEventListener('click', () => {
        deleteGalleryItem(country);
    });

    return button;
}

function deleteGalleryItem(country) {
    const countryRef = galleryRef.child(country);

    countryRef.remove()
        .then(() => {
            console.log(`Data for ${country} deleted successfully.`);
            displayGallery(); // Refresh the table after deletion
        })
        .catch(error => console.error(`Error deleting data for ${country}:`, error));
}


function populateTable(data) {
    const galleryTable = document.getElementById('galleryTable');
    const tbody = galleryTable.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing table rows

    for (const country in data) {
        if (data.hasOwnProperty(country)) {
            const galleryItem = data[country];

            const row = tbody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4); // New cell for delete button

            cell1.textContent = galleryItem.img_country;
            cell2.textContent = galleryItem.img_place;
            cell3.textContent = galleryItem.img_rating;

            const img = document.createElement('img');
            img.src = galleryItem.img_url;
            img.alt = galleryItem.img_place;
            img.style.width = '50px'; // Set the width as needed
            cell4.appendChild(img);

            const deleteButton = createDeleteButton(country);
            cell5.appendChild(deleteButton);
        }
    }
}

// Call displayGallery to initially populate the table
displayGallery();

















