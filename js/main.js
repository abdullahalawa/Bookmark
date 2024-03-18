var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var bookmarkListTable = document.getElementById("bookmarkListTable");

var addNewBookmarkButton = document.getElementById("addNewBookmark");
var updateBookmarkButton = document.getElementById("updateBookmark");

var validationModal = new bootstrap.Modal(document.getElementById("modal"), {});

const toastLiveExample = document.getElementById("liveToast");
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

// Our Variables
var urlList = []; // Main URL List Repository
var updatedProduct; // saved index for updated product
var nameRegex = /^[A-Za-z0-9_-]{2,}$/;
var urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

// Return all saved items in Local Storage When the App start working
if (localStorage.getItem("urlList") != null) {
  urlList = JSON.parse(localStorage.getItem("urlList"));
  displayBookmarks();
}

// Add New Bookmark
function addNewBookmark() {
  var newBookmark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value,
  };

  if (
    validation(nameRegex, siteNameInput) == true &&
    validation(urlRegex, siteUrlInput) == true
  ) {
    urlList.push(newBookmark);
    localStorage.setItem("urlList", JSON.stringify(urlList));
    displayBookmarks();
    clearInputs();
    toastBootstrap.show();
  } else {
    validationModal.show(); //trigger validation modal
  }
}

// Clear inputs after submission
function clearInputs() {
  siteNameInput.value = null;
  siteUrlInput.value = null;

  //clear validation signs in input feilds
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
  siteNameInput.classList.remove("is-invalid");
  siteUrlInput.classList.remove("is-invalid");
}

// Display Bookmarks in table
function displayBookmarks() {
  var bookmarkDisplay = "";

  for (var i = 0; i < urlList.length; i++) {
    bookmarkDisplay += `<tr class="text-center">
        <td scope="row" class="">${i + 1}</td>
        <td class="">${urlList[i].siteName}</td>
        <td class="">
        <a class="btn btn-success" href="${urlList[i].siteUrl}" target="_blank"
        ><i class="fa-solid fa-eye text-white pe-2"></i>Visit</a
      >
        </td>
        <td class="">
          <button onclick="moveDataToInputs(${i})" class="btn btn-info text-white">
            <i class="fa-regular fa-pen-to-square text-white pe-2"></i
            >Update
          </button>
        </td>

        <td class="">
        <button onclick="DeleteBookmark(${i})" class="btn btn-danger">
          <i class="fa-solid fa-trash-can text-white pe-2"></i
          >Delete
        </button>
      </td>
        </tr>`;
  }

  bookmarkListTable.innerHTML = bookmarkDisplay;
}

// Delete Bookmark
function DeleteBookmark(deletedIndex) {
  urlList.splice(deletedIndex, 1);
  localStorage.setItem("urlList", JSON.stringify(urlList));
  displayBookmarks();
}

//Move data to inputs
function moveDataToInputs(dataIndex) {
  siteNameInput.value = urlList[dataIndex].siteName;
  siteUrlInput.value = urlList[dataIndex].siteUrl;

  addNewBookmarkButton.classList.replace("d-block", "d-none");
  updateBookmarkButton.classList.replace("d-none", "d-block");

  updatedProduct = dataIndex;
}

// Update Bookmark
function updateBookmark() {
  if (
    validation(nameRegex, siteNameInput) == true &&
    validation(urlRegex, siteUrlInput) == true
  ) {
    urlList[updatedProduct].siteName = siteNameInput.value;
    urlList[updatedProduct].siteUrl = siteUrlInput.value;

    localStorage.setItem("urlList", JSON.stringify(urlList));
    displayBookmarks();

    addNewBookmarkButton.classList.replace("d-none", "d-block");
    updateBookmarkButton.classList.replace("d-block", "d-none");
    clearInputs();
    toastBootstrap.show();
  } else {
    validationModal.show(); //trigger validation modal
  }

  console.log(urlList);
}

// inputs validation function
function validation(regex, input) {
  if (regex.test(input.value) == true) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  }

  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  input.nextElementSibling.classList.replace("d-none", "d-block");
  return false;
}
